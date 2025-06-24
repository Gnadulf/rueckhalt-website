// ULTRATHINK: Minimal i18n system for Rückhalt
// This integrates with existing Vite architecture without changing anything

class I18n {
  constructor() {
    this.supportedLangs = ['de', 'en', 'pl', 'uk', 'ru', 'ro', 'ar', 'sy', 'fr', 'nl', 'tr'];
    this.currentLang = this.detectLanguage();
    this.translations = {};
  }

  detectLanguage() {
    // Check URL first
    const urlLang = window.location.pathname.split('/')[1];
    if (this.supportedLangs.includes(urlLang)) {
      return urlLang;
    }
    
    // Check localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.supportedLangs.includes(savedLang)) {
      return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.supportedLangs.includes(browserLang)) {
      return browserLang;
    }
    
    // Default to German
    return 'de';
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`/translations/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}`);
      this.translations[lang] = await response.json();
      return this.translations[lang];
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to German
      if (lang !== 'de') {
        return this.loadTranslations('de');
      }
    }
  }

  async init() {
    await this.loadTranslations(this.currentLang);
    this.updatePageContent();
    this.setupLanguageSwitcher();
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  updatePageContent() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        element.textContent = translation;
      }
    });

    // Update page attributes
    document.documentElement.lang = this.currentLang;
    if (['ar', 'sy'].includes(this.currentLang)) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-options button[data-lang]');
    const currentButton = document.querySelector('.lang-current');
    
    if (!langButtons.length || !currentButton) return;

    // Update current button text
    currentButton.innerHTML = `${this.currentLang.toUpperCase()} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;

    // Handle language button clicks
    langButtons.forEach(button => {
      const lang = button.getAttribute('data-lang');
      
      // Update active state
      if (lang === this.currentLang) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
      
      // Add click handler
      button.addEventListener('click', async () => {
        await this.changeLanguage(lang);
        
        // Hide dropdown
        const langOptions = document.querySelector('.lang-options');
        if (langOptions) langOptions.hidden = true;
        currentButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  async changeLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) return;
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    await this.loadTranslations(lang);
    this.updatePageContent();
    
    // Update URL without reload
    const newPath = `/${lang}${window.location.pathname.substring(3)}`;
    window.history.pushState({}, '', newPath);
  }

  getLanguageName(code) {
    const names = {
      de: 'Deutsch',
      en: 'English',
      pl: 'Polski',
      uk: 'Українська',
      ru: 'Русский',
      ro: 'Română',
      ar: 'العربية',
      sy: 'العربية السورية',
      fr: 'Français',
      nl: 'Nederlands',
      tr: 'Türkçe'
    };
    return names[code] || code;
  }
}

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
  window.i18n.init();
});

// Export for use in other modules
export default I18n;