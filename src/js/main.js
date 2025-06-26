// Main JavaScript - RückHalt e.V.

// Quick Exit Functionality
class QuickExit {
  constructor() {
    this.exitButton = document.getElementById('quick-exit');
    this.escapeCount = 0;
    this.escapeTimer = null;
    this.safeUrl = 'https://www.google.de/search?q=wetter';
    
    this.init();
  }
  
  init() {
    // Button click
    this.exitButton?.addEventListener('click', () => this.performExit());
    
    // ESC key detection (3x quick press)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
    });
    
    // Panic key combination (Ctrl+Shift+Q)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
        e.preventDefault();
        this.performExit();
      }
    });
  }
  
  handleEscapeKey() {
    this.escapeCount++;
    
    if (this.escapeCount === 3) {
      this.performExit();
    }
    
    // Reset counter after 2 seconds
    clearTimeout(this.escapeTimer);
    this.escapeTimer = setTimeout(() => {
      this.escapeCount = 0;
    }, 2000);
  }
  
  performExit() {
    try {
      // Replace current page in history
      window.location.replace(this.safeUrl);
      
      // Try to close tab (works in some browsers)
      window.close();
      
      // Clear sensitive data from sessionStorage/localStorage
      sessionStorage.clear();
      localStorage.clear();
    } catch (error) {
      // Failsafe: At least perform the redirect
      window.location.href = this.safeUrl;
    }
  }
}

// Mood Adjustment
class MoodAdjustment {
  constructor() {
    this.buttons = document.querySelectorAll('.mood-btn');
    this.root = document.documentElement;
    this.currentMood = localStorage.getItem('userMood') || 'neutral';
    
    this.init();
  }
  
  init() {
    // Apply saved mood
    this.applyMood(this.currentMood);
    
    // Add click handlers
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        this.setMood(mood);
      });
    });
  }
  
  setMood(mood) {
    // Validate mood value
    const validMoods = ['calm', 'neutral', 'energetic'];
    if (!validMoods.includes(mood)) {
      return;
    }
    
    // Remove active class from all buttons
    this.buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    const activeButton = document.querySelector(`[data-mood="${mood}"]`);
    activeButton?.classList.add('active');
    
    // Apply mood
    this.applyMood(mood);
    
    // Save preference
    try {
      localStorage.setItem('userMood', mood);
      this.currentMood = mood;
    } catch (error) {
      // Handle localStorage errors (e.g., quota exceeded)
      this.currentMood = mood;
    }
  }
  
  applyMood(mood) {
    this.root.setAttribute('data-mood', mood);
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.nav = document.querySelector('.main-nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.toggle?.addEventListener('click', () => this.toggleMenu());
    
    // Close on link click
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.nav?.contains(e.target) === false && 
          this.toggle?.contains(e.target) === false) {
        this.closeMenu();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.nav.classList.toggle('active');
    this.toggle.setAttribute('aria-expanded', this.isOpen);
    
    // Trap focus when open
    if (this.isOpen) {
      this.trapFocus();
    }
  }
  
  closeMenu() {
    this.isOpen = false;
    this.nav.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.focus();
  }
  
  trapFocus() {
    const focusableElements = this.nav.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    firstElement.focus();
    
    this.nav.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }
}

// Language Switcher
class LanguageSwitcher {
  constructor() {
    this.current = document.querySelector('.lang-current');
    this.options = document.querySelector('.lang-options');
    this.buttons = document.querySelectorAll('[data-lang]');
    
    this.init();
  }
  
  init() {
    this.current?.addEventListener('click', () => this.toggleOptions());
    
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        this.setLanguage(lang);
      });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.current?.contains(e.target) === false && 
          this.options?.contains(e.target) === false) {
        this.closeOptions();
      }
    });
  }
  
  toggleOptions() {
    const isOpen = this.options.hidden === false;
    this.options.hidden = !isOpen;
    this.current.setAttribute('aria-expanded', !isOpen);
  }
  
  closeOptions() {
    this.options.hidden = true;
    this.current.setAttribute('aria-expanded', 'false');
  }
  
  setLanguage(lang) {
    // Update active state
    this.buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
    
    // Update current display
    this.current.innerHTML = `${lang.toUpperCase()} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;
    
    // Close dropdown
    this.closeOptions();
    
    // Toggle Leichte Sprache button visibility
    this.toggleLeichteSpracheButton(lang);
    
    // Apply translations
    translations.applyTranslations(lang);
  }
  
  toggleLeichteSpracheButton(lang) {
    const leichteSpracheButton = document.querySelector('.nav-link-special[href="/leichte-sprache.html"]');
    if (leichteSpracheButton) {
      const listItem = leichteSpracheButton.closest('li');
      if (listItem) {
        // Show button only for German language
        listItem.style.display = lang === 'de' ? '' : 'none';
      }
    }
  }
}

// Smooth Scroll
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const offset = 100; // Header height + buffer
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
        
        // Focus target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      });
    });
  }
}

// Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Wird gesendet...';
    
    try {
      // Simulate form submission
      await this.simulateSubmit(data);
      
      // Show success
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      // Show error
      this.showError();
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
  
  simulateSubmit(data) {
    // In production, this would send to your secure endpoint
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }
  
  showSuccess() {
    const alert = this.createAlert('success', 
      'Nachricht gesendet', 
      'Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.'
    );
    this.form.parentElement.insertBefore(alert, this.form);
    
    setTimeout(() => alert.remove(), 5000);
  }
  
  showError() {
    const alert = this.createAlert('error',
      'Fehler beim Senden',
      'Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.'
    );
    this.form.parentElement.insertBefore(alert, this.form);
    
    setTimeout(() => alert.remove(), 5000);
  }
  
  createAlert(type, title, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <svg class="alert-icon" fill="currentColor" viewBox="0 0 20 20">
        ${type === 'success' 
          ? '<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>'
          : '<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>'
        }
      </svg>
      <div class="alert-content">
        <div class="alert-title">${title}</div>
        <p>${message}</p>
      </div>
    `;
    return alert;
  }
}

// Header Hide on Scroll
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScroll = 0;
    this.scrollThreshold = 5;
    
    this.init();
  }
  
  init() {
    if (!this.header) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Skip if scroll difference is too small
    if (Math.abs(currentScroll - this.lastScroll) < this.scrollThreshold) {
      return;
    }
    
    if (currentScroll > this.lastScroll && currentScroll > 100) {
      // Scrolling down & past header
      this.header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up or at top
      this.header.style.transform = 'translateY(0)';
    }
    
    this.lastScroll = currentScroll;
  }
}

// Import translations
import translations from './translations.js';

// Logo Fade on Scroll
class LogoFade {
  constructor() {
    this.logo = document.getElementById('hero-logo');
    this.isScrolling = false;
    this.init();
  }
  
  init() {
    if (!this.logo) {
      return;
    }
    
    // Initial opacity setzen (startet im Vordergrund)
    this.logo.style.opacity = '1';
    
    // Scroll-Event mit RequestAnimationFrame für bessere Performance
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        window.requestAnimationFrame(() => {
          this.updateOpacity();
          this.isScrolling = false;
        });
        this.isScrolling = true;
      }
    });
    
    // Initial update
    this.updateOpacity();
  }
  
  updateOpacity() {
    const scrollY = window.pageYOffset;
    const fadeStart = 0;      // Startet sofort beim Scrollen
    const fadeEnd = 300;      // Komplett transparent bei 300px
    const minOpacity = 0.15;  // Bleibt bei 15% sichtbar
    
    let opacity;
    
    if (scrollY <= fadeStart) {
      opacity = 1;  // Voll sichtbar am Anfang
    } else if (scrollY >= fadeEnd) {
      opacity = minOpacity;  // Minimal sichtbar
    } else {
      // Lineare Interpolation zwischen 1 und minOpacity
      const fadeRange = fadeEnd - fadeStart;
      const scrollInRange = scrollY - fadeStart;
      opacity = 1 - (scrollInRange / fadeRange) * (1 - minOpacity);
    }
    
    this.logo.style.opacity = opacity.toString();
  }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  // Core features
  new QuickExit();
  new MoodAdjustment();
  new MobileNav();
  const languageSwitcher = new LanguageSwitcher();
  new SmoothScroll();
  new ContactForm();
  new HeaderScroll();
  new LogoFade();
  
  // Initialize translations
  const currentLang = translations.detectLanguage();
  translations.applyTranslations(currentLang);
  
  // Set initial visibility of Leichte Sprache button
  languageSwitcher.toggleLeichteSpracheButton(currentLang);
  
  // Accessibility: Announce page changes for screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  // Service Worker for offline support (if supported)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      console.log('Service Worker registration failed');
    });
  }
  
  // Print warning about browser history
  console.log(
    '%cSicherheitshinweis:',
    'color: red; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cDiese Website kann Spuren in Ihrem Browserverlauf hinterlassen. ' +
    'Nutzen Sie den Inkognito-/Privatmodus oder löschen Sie Ihren Verlauf nach dem Besuch.',
    'color: red; font-size: 14px;'
  );
});