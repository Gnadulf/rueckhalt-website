// Main Application Entry Point - ULTRATHINK: Perfect initialization
import { initLanguageSwitcher } from './dropdown.js';
import { initQuickExit } from './quickexit.js';

// Wait for DOM and translations
function initializeApp() {
    // Critical safety features first
    initQuickExit();
    
    // Language system
    initLanguageSwitcher();
    
    // Dark mode
    initDarkMode();
    
    // Initialize translations if available
    if (window.RueckhaltTranslations) {
        const currentLang = window.RueckhaltTranslations.detectLanguage();
        window.RueckhaltTranslations.applyTranslations(currentLang);
        updateLanguageDisplay(currentLang);
    }
}

function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const body = document.body;
    const sunIcon = darkModeToggle.querySelector('.sun-icon');
    const moonIcon = darkModeToggle.querySelector('.moon-icon');
    
    // Check saved preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
        
        localStorage.setItem('darkMode', isDark);
    });
}

function updateLanguageDisplay(lang) {
    const langCurrent = document.querySelector('.lang-current');
    if (!langCurrent) return;
    
    const langCodes = {
        'de': 'DE', 'en': 'EN', 'pl': 'PL', 'uk': 'UK',
        'ru': 'RU', 'ro': 'RO', 'ar': 'AR', 'sy': 'SY',
        'fr': 'FR', 'nl': 'NL', 'tr': 'TR'
    };
    
    langCurrent.innerHTML = `${langCodes[lang] || 'DE'} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Also initialize when everything is loaded (fallback)
window.addEventListener('load', () => {
    // Re-init if needed
    if (!document.querySelector('.quick-exit-initialized')) {
        initializeApp();
    }
});