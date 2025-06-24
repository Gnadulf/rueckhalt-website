// Main JavaScript - RückHalt e.V.

// Quick Exit Functionality
class QuickExit {
  constructor() {
    this.exitButton = document.getElementById('quick-exit');
    this.escapeCount = 0;
    this.escapeTimer = null;
    this.safeUrl = 'https://www.google.de/search?q=wetter';
    this.escapeIndicator = null;
    
    this.init();
    this.createEscapeIndicator();
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
    this.showEscapeIndicator();
    
    if (this.escapeCount === 3) {
      this.performExit();
    }
    
    // Reset counter after 2 seconds
    clearTimeout(this.escapeTimer);
    this.escapeTimer = setTimeout(() => {
      this.escapeCount = 0;
      this.hideEscapeIndicator();
    }, 2000);
  }
  
  performExit() {
    // Replace current page in history
    window.location.replace(this.safeUrl);
    
    // Try to close tab (works in some browsers)
    window.close();
    
    // Clear sensitive data from sessionStorage/localStorage
    sessionStorage.clear();
    localStorage.clear();
  }
  
  createEscapeIndicator() {
    this.escapeIndicator = document.createElement('div');
    this.escapeIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-emergency);
      color: white;
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-lg);
      font-weight: bold;
      z-index: var(--z-emergency);
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    `;
    document.body.appendChild(this.escapeIndicator);
  }
  
  showEscapeIndicator() {
    this.escapeIndicator.textContent = `ESC: ${this.escapeCount}/3`;
    this.escapeIndicator.style.opacity = '1';
  }
  
  hideEscapeIndicator() {
    this.escapeIndicator.style.opacity = '0';
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
    // Remove active class from all buttons
    this.buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    const activeButton = document.querySelector(`[data-mood="${mood}"]`);
    activeButton?.classList.add('active');
    
    // Apply mood
    this.applyMood(mood);
    
    // Save preference
    localStorage.setItem('userMood', mood);
    this.currentMood = mood;
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
      if (this.isOpen && !this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
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
    this.current?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleOptions();
    });
    
    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        this.setLanguage(lang);
      });
    });
    
    // Close on outside click - ULTRATHINK: Delay to prevent hover conflicts
    document.addEventListener('click', (e) => {
      if (!this.current?.contains(e.target) && !this.options?.contains(e.target)) {
        // Delay closing to allow CSS hover to work
        setTimeout(() => {
          if (!this.options?.matches(':hover') && !this.current?.matches(':hover')) {
            this.closeOptions();
          }
        }, 100);
      }
    });
    
    // Close when mouse leaves entirely - ULTRATHINK: Better UX
    document.querySelector('.language-switcher')?.addEventListener('mouseleave', () => {
      setTimeout(() => {
        this.closeOptions();
      }, 200);
    });
  }
  
  toggleOptions() {
    const isOpen = this.options?.hidden === false;
    if (this.options) {
      this.options.hidden = !isOpen;
    }
    this.current?.setAttribute('aria-expanded', !isOpen);
  }
  
  closeOptions() {
    if (this.options) {
      this.options.hidden = true;
    }
    this.current?.setAttribute('aria-expanded', 'false');
  }
  
  setLanguage(lang) {
    // Update active state
    this.buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
    
    // Update current display
    this.current.innerHTML = `${lang.toUpperCase()} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;
    
    // Close dropdown
    this.closeOptions();
    
    // Apply translations
    if (window.RueckhaltTranslations) {
      window.RueckhaltTranslations.applyTranslations(lang);
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
    } catch (submissionError) {
      // Show error - Log for debugging but don't expose sensitive data
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Form submission failed:', submissionError);
      }
      this.showError();
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
  
  simulateSubmit(formData) {
    // In production, this would send to your secure endpoint
    // Log sanitized data for debugging (never log sensitive info)
    if (process.env.NODE_ENV !== 'production') {
      console.info('Form submission initiated');
    }
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

// Translations are loaded via translations-complete.js in HTML
import { initLanguageRouter } from './language-router.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  // ULTRATHINK: Language Routing MUSS zuerst kommen
  initLanguageRouter();
  
  // Core features
  new QuickExit();
  new MoodAdjustment();
  new MobileNav();
  new LanguageSwitcher();
  new SmoothScroll();
  new ContactForm();
  new HeaderScroll();
  
  // Initialize translations
  if (window.RueckhaltTranslations) {
    const currentLang = window.RueckhaltTranslations.detectLanguage();
    window.RueckhaltTranslations.applyTranslations(currentLang);
  }
  
  // Accessibility: Announce page changes for screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  // Service Worker for offline support (if supported)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail for Service Worker - don't overwhelm users
    });
  }
  
  // Security warning for development only
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '%cSicherheitshinweis:',
      'color: red; font-size: 20px; font-weight: bold;'
    );
    console.warn(
      '%cDiese Website kann Spuren in Ihrem Browserverlauf hinterlassen. ' +
      'Nutzen Sie den Inkognito-/Privatmodus oder löschen Sie Ihren Verlauf nach dem Besuch.',
      'color: red; font-size: 14px;'
    );
  }
});

// Export for module compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}