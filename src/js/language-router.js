// ULTRATHINK: Language Routing System für Rückhalt
export function initLanguageRouter() {
    // Prüfe URL-Parameter für Sprache
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && isValidLanguage(langParam)) {
        console.log('🌍 ULTRATHINK: Sprache aus URL erkannt:', langParam);
        
        // Setze Sprache
        localStorage.setItem('preferredLanguage', langParam);
        
        // Wende Übersetzungen an
        if (window.RueckhaltTranslations) {
            window.RueckhaltTranslations.applyTranslations(langParam);
        }
        
        // Update Dropdown
        updateDropdownDisplay(langParam);
        
        // Entferne Parameter aus URL für saubere Anzeige
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

function isValidLanguage(lang) {
    const validLanguages = ['de', 'en', 'pl', 'uk', 'ru', 'ro', 'ar', 'sy', 'fr', 'nl', 'tr'];
    return validLanguages.includes(lang);
}

function updateDropdownDisplay(lang) {
    const langCurrent = document.querySelector('.lang-current');
    const langOptions = document.querySelector('.lang-options');
    
    if (!langCurrent || !langOptions) return;
    
    // Update Button Text
    const langCodes = {
        'de': 'DE', 'en': 'EN', 'pl': 'PL', 'uk': 'UK',
        'ru': 'RU', 'ro': 'RO', 'ar': 'AR', 'sy': 'SY',
        'fr': 'FR', 'nl': 'NL', 'tr': 'TR'
    };
    
    langCurrent.innerHTML = `${langCodes[lang]} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;
    
    // Update Active State
    langOptions.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}