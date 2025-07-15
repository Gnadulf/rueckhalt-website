// Main JavaScript - RückHalt e.V.

// Import all CSS files for Vite
import '../css/reset.css';
import '../css/variables.css';
import '../css/main.css';
import '../css/unified-components.css';
import '../css/components.css';
import '../css/bauhaus.css';
import '../css/modern.css';
import '../css/responsive.css';
import '../css/pentagram.css';
import '../css/utilities.css';
import '../css/dark-mode.css';
import '../css/modal.css';

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

// Modal System - Data-driven Architecture
class ModalSystem {
  constructor() {
    this.modal = document.getElementById('service-modal');
    this.modalBody = document.getElementById('modal-body');
    this.modalClose = this.modal?.querySelector('.modal-close');
    this.serviceData = null;
    this.activeServiceLink = null;
    
    this.init();
  }
  
  async init() {
    if (!this.modal) return;
    
    try {
      // Load modal content from JSON
      const response = await fetch('/modal-content.json');
      const data = await response.json();
      
      // Transform array to object for easy lookup
      this.serviceData = data.services.reduce((acc, service) => {
        acc[service.id] = service;
        return acc;
      }, {});
      
      this.attachEventListeners();
      this.attachServiceLinks();
    } catch (error) {
      console.error('Failed to load modal content:', error);
    }
  }
  
  attachEventListeners() {
    // Close button
    this.modalClose?.addEventListener('click', () => this.close());
    
    // Click outside modal
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
  }
  
  attachServiceLinks() {
    // Attach click handlers to all service links
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = link.dataset.service;
        if (serviceId) {
          this.activeServiceLink = link;
          this.open(serviceId);
        }
      });
    });
    
    // Special handler for Notfall-Toolkit button
    const notfallButton = document.querySelector('.btn--emergency');
    if (notfallButton) {
      notfallButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.activeServiceLink = notfallButton;
        this.open('notfall');
      });
    }
  }
  
  generateModalHTML(service) {
    const featuresHTML = service.features.map(feature => `
      <div class="modal-feature">
        <svg class="modal-feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${feature.iconPath}"></path>
        </svg>
        <div>
          <strong>${feature.title}</strong>
          <p>${feature.description}</p>
        </div>
      </div>
    `).join('');
    
    return `
      <div class="modal-header">
        <h2 id="modal-title" class="modal-title">${service.title}</h2>
        <p id="modal-description" class="modal-subtitle">${service.subtitle}</p>
      </div>
      <div class="modal-features">${featuresHTML}</div>
      <div class="modal-cta">
        <a href="#kontakt" class="btn btn--modern" onclick="window.modalSystem.close()">
          ${service.cta}
        </a>
        <button class="btn btn--secondary" onclick="window.modalSystem.close()">
          Schließen
        </button>
      </div>
    `;
  }
  
  open(serviceId) {
    const service = this.serviceData?.[serviceId];
    if (!service || !this.modalBody) return;
    
    this.modalBody.innerHTML = this.generateModalHTML(service);
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    this.modalClose?.focus();
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modal?.classList.remove('active');
    this.modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Return focus to trigger element
    if (this.activeServiceLink) {
      this.activeServiceLink.focus();
    }
  }
}

// FAQ System - Trauma-informed Interactive Design
class FAQSystem {
  constructor() {
    this.filters = document.querySelectorAll('.faq-filter');
    this.items = document.querySelectorAll('.faq-item');
    this.questions = document.querySelectorAll('.faq-question');
    this.searchInput = document.getElementById('faq-search');
    this.activeCategory = 'all';
    
    this.init();
  }
  
  init() {
    // Filter functionality
    this.filters.forEach(filter => {
      filter.addEventListener('click', () => this.handleFilter(filter));
    });
    
    // Accordion functionality
    this.questions.forEach(question => {
      question.addEventListener('click', () => this.toggleAccordion(question));
    });
    
    // Search functionality
    this.searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    
    // Keyboard navigation
    this.setupKeyboardNav();
  }
  
  handleFilter(clickedFilter) {
    const category = clickedFilter.dataset.category;
    
    // Update active state
    this.filters.forEach(filter => {
      filter.classList.remove('active');
      // Reset styles for non-active filters
      if (filter !== clickedFilter) {
        filter.style.background = 'white';
        filter.style.color = 'var(--color-gray-700)';
        filter.style.borderColor = 'var(--color-gray-300)';
      }
    });
    
    clickedFilter.classList.add('active');
    clickedFilter.style.background = 'var(--color-primary)';
    clickedFilter.style.color = 'white';
    clickedFilter.style.borderColor = 'var(--color-primary)';
    
    // Show/hide items
    this.activeCategory = category;
    this.filterItems();
  }
  
  filterItems() {
    this.items.forEach(item => {
      const itemCategory = item.dataset.category;
      const matchesCategory = this.activeCategory === 'all' || itemCategory === this.activeCategory;
      const searchQuery = this.searchInput?.value.toLowerCase() || '';
      const itemText = item.textContent.toLowerCase();
      const matchesSearch = !searchQuery || itemText.includes(searchQuery);
      
      // Show only if matches both category and search
      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show message if no results
    const visibleItems = Array.from(this.items).filter(item => 
      item.style.display !== 'none'
    );
    
    this.updateNoResultsMessage(visibleItems.length === 0);
  }
  
  toggleAccordion(question) {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other accordions for better UX
    this.questions.forEach(q => {
      if (q !== question) {
        const a = q.nextElementSibling;
        const i = q.querySelector('.faq-icon');
        q.setAttribute('aria-expanded', 'false');
        a.hidden = true;
        if (i) i.style.transform = 'rotate(0deg)';
      }
    });
    
    // Toggle clicked accordion
    question.setAttribute('aria-expanded', !isExpanded);
    answer.hidden = isExpanded;
    
    // Animate icon
    if (icon) {
      icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      icon.style.transition = 'transform 0.3s ease';
    }
    
    // Smooth height animation
    if (!isExpanded) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.transition = 'max-height 0.3s ease';
    } else {
      answer.style.maxHeight = '0';
    }
  }
  
  handleSearch(query) {
    this.filterItems();
  }
  
  updateNoResultsMessage(show) {
    let message = document.getElementById('faq-no-results');
    
    if (show && !message) {
      message = document.createElement('div');
      message.id = 'faq-no-results';
      message.className = 'text-center py-8';
      message.innerHTML = `
        <p class="text-gray-600 text-lg">Keine passenden Fragen gefunden.</p>
        <p class="text-gray-500 mt-2">Versuchen Sie es mit anderen Suchbegriffen oder 
          <a href="#kontakt" class="text-primary hover:underline">kontaktieren Sie uns direkt</a>.
        </p>
      `;
      
      const accordion = document.querySelector('.faq-accordion');
      accordion?.appendChild(message);
    } else if (!show && message) {
      message.remove();
    }
  }
  
  setupKeyboardNav() {
    // Allow keyboard navigation between questions
    this.questions.forEach((question, index) => {
      question.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && index < this.questions.length - 1) {
          e.preventDefault();
          this.questions[index + 1].focus();
        } else if (e.key === 'ArrowUp' && index > 0) {
          e.preventDefault();
          this.questions[index - 1].focus();
        }
      });
    });
  }
}

// Logo Fade on Scroll - Advanced Animation
class LogoFade {
  constructor() {
    this.logoWrapper = document.getElementById('hero-logo-wrapper');
    this.logo = document.getElementById('hero-logo');
    this.heroSection = document.querySelector('.hero');
    this.isScrolling = false;
    this.isAnimating = false;
    this.init();
  }
  
  init() {
    if (!this.logo || !this.logoWrapper) {
      return;
    }
    
    // Get initial position
    this.initialRect = this.logoWrapper.getBoundingClientRect();
    this.heroRect = this.heroSection.getBoundingClientRect();
    
    // Create clone for animation
    this.createAnimatedClone();
    
    // Scroll-Event mit RequestAnimationFrame
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        window.requestAnimationFrame(() => {
          this.updateAnimation();
          this.isScrolling = false;
        });
        this.isScrolling = true;
      }
    });
    
    // Initial update
    this.updateAnimation();
  }
  
  createAnimatedClone() {
    // Create a fixed position clone for smooth animation
    this.animatedLogo = this.logo.cloneNode(true);
    this.animatedLogo.id = 'hero-logo-animated';
    this.animatedLogo.style.position = 'fixed';
    this.animatedLogo.style.top = `${this.initialRect.top}px`;
    this.animatedLogo.style.left = '50%';
    this.animatedLogo.style.transform = 'translateX(-50%)';
    this.animatedLogo.style.zIndex = '5';
    this.animatedLogo.style.opacity = '0';
    this.animatedLogo.style.transition = 'none'; // No transition for instant switch
    this.animatedLogo.style.mixBlendMode = 'multiply'; // Keep same blend mode
    this.animatedLogo.style.filter = 'contrast(1.1)'; // Keep same filter
    document.body.appendChild(this.animatedLogo);
  }
  
  updateAnimation() {
    const scrollY = window.pageYOffset;
    const animationStart = 50;
    const animationEnd = 400;
    const minOpacity = 0.15;
    
    // Calculate progress
    let progress = 0;
    if (scrollY <= animationStart) {
      progress = 0;
    } else if (scrollY >= animationEnd) {
      progress = 1;
    } else {
      progress = (scrollY - animationStart) / (animationEnd - animationStart);
    }
    
    // Easing function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    if (progress > 0 && !this.isAnimating) {
      // Start animation - instant switch
      this.isAnimating = true;
      this.logo.style.visibility = 'hidden';
      this.animatedLogo.style.opacity = '1';
    } else if (progress === 0 && this.isAnimating) {
      // Reset - instant switch back
      this.isAnimating = false;
      this.logo.style.visibility = 'visible';
      this.animatedLogo.style.opacity = '0';
    }
    
    if (this.isAnimating) {
      // Animate the clone
      const opacity = 1 - (easedProgress * (1 - minOpacity));
      const scale = 1 + (easedProgress * 0.2);
      const translateY = this.initialRect.top - scrollY + (easedProgress * 100);
      const blur = easedProgress * 2;
      
      this.animatedLogo.style.opacity = opacity.toString();
      this.animatedLogo.style.top = `${translateY}px`;
      this.animatedLogo.style.transform = `translateX(-50%) scale(${scale})`;
      
      if (blur > 0) {
        this.animatedLogo.style.filter = `blur(${blur}px) contrast(1.1)`;
      } else {
        this.animatedLogo.style.filter = 'contrast(1.1)';
      }
    }
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
  new FAQSystem();
  
  // Initialize Modal System
  window.modalSystem = new ModalSystem();
  
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
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Silent fail - no console output
    });
  }
});