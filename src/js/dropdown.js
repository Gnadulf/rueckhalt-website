// ULTRATHINK: Perfekter Language Switcher mit URL-Weiterleitung für Rückhalt
export function initLanguageSwitcher() {
    console.log('🌐 ULTRATHINK: Initialisiere barrierefreien Language Switcher...');
    
    // ULTRATHINK: Warte auf vollständiges DOM für maximale Zuverlässigkeit
    const setupSwitcher = () => {
        const langCurrent = document.querySelector('.lang-current');
        const langOptions = document.querySelector('.lang-options');
        
        if (!langCurrent || !langOptions) {
            console.error('❌ KRITISCH: Language Switcher nicht gefunden!');
            // Retry nach 100ms für langsame Verbindungen
            setTimeout(setupSwitcher, 100);
            return;
        }
        
        console.log('✅ Language Switcher Elemente gefunden');
        
        // ULTRATHINK: Entferne alte Event Listener sauber
        const newLangCurrent = langCurrent.cloneNode(true);
        langCurrent.parentNode.replaceChild(newLangCurrent, langCurrent);
        
        // ULTRATHINK: Toggle Dropdown mit perfekter Accessibility
        newLangCurrent.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const isOpen = langOptions.classList.contains('show');
            console.log('📋 Dropdown Status:', isOpen ? 'OFFEN' : 'GESCHLOSSEN');
            
            if (!isOpen) {
                // ULTRATHINK: Sofortige visuelle Rückmeldung für User in Krise
                langOptions.style.display = 'block';
                langOptions.style.opacity = '0';
                langOptions.style.visibility = 'hidden';
                langOptions.style.pointerEvents = 'none';
                
                // Force Browser Reflow für smooth animation
                void langOptions.offsetHeight;
                
                // Aktiviere Dropdown mit Transition
                langOptions.classList.add('show');
                langOptions.style.opacity = '1';
                langOptions.style.visibility = 'visible';
                langOptions.style.pointerEvents = 'auto';
                
                // Fokus auf erste Option für Keyboard Navigation
                const firstOption = langOptions.querySelector('button');
                if (firstOption) {
                    firstOption.focus();
                }
            } else {
                // Sanftes Schließen
                langOptions.classList.remove('show');
                langOptions.style.opacity = '0';
                langOptions.style.visibility = 'hidden';
                langOptions.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    if (!langOptions.classList.contains('show')) {
                        langOptions.style.display = 'none';
                    }
                }, 300);
            }
            
            // ARIA für Screen Reader
            newLangCurrent.setAttribute('aria-expanded', !isOpen);
        });
        
        // ULTRATHINK: Sprachwahl mit URL-Weiterleitung
        langOptions.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault();
                const selectedLang = e.target.getAttribute('data-lang');
                
                if (selectedLang) {
                    console.log('🌍 Sprache gewählt:', selectedLang);
                    
                    // ULTRATHINK: Visuelles Feedback sofort
                    langOptions.querySelectorAll('button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    // Update Anzeige
                    const langCodes = {
                        'de': 'DE', 'en': 'EN', 'pl': 'PL', 'uk': 'UK',
                        'ru': 'RU', 'ro': 'RO', 'ar': 'AR', 'sy': 'SY',
                        'fr': 'FR', 'nl': 'NL', 'tr': 'TR'
                    };
                    newLangCurrent.innerHTML = `${langCodes[selectedLang]} <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" fill="none"/></svg>`;
                    
                    // Dropdown schließen
                    langOptions.classList.remove('show');
                    langOptions.style.display = 'none';
                    newLangCurrent.setAttribute('aria-expanded', 'false');
                    
                    // ULTRATHINK: KRITISCH - Weiterleitung zur Sprachversion
                    // Speichere Sprachwahl für nächsten Besuch
                    localStorage.setItem('preferredLanguage', selectedLang);
                    
                    // Baue URL für Sprachversion
                    const currentPath = window.location.pathname;
                    const currentLangMatch = currentPath.match(/^\/(de|en|pl|uk|ru|ro|ar|sy|fr|nl|tr)(\/|$)/);
                    
                    let newPath;
                    if (currentLangMatch) {
                        // Ersetze existierende Sprache
                        newPath = currentPath.replace(currentLangMatch[0], `/${selectedLang}/`);
                    } else if (currentPath === '/' || currentPath === '/index.html') {
                        // Hauptseite -> Sprachversion
                        newPath = `/${selectedLang}/`;
                    } else {
                        // Füge Sprache am Anfang hinzu
                        newPath = `/${selectedLang}${currentPath}`;
                    }
                    
                    console.log('🚀 Weiterleitung zu:', newPath);
                    
                    // ULTRATHINK: Sanfte Weiterleitung mit visueller Rückmeldung
                    document.body.style.opacity = '0.8';
                    
                    // Kurze Verzögerung für visuelle Rückmeldung
                    setTimeout(() => {
                        window.location.href = newPath;
                    }, 150);
                }
            }
        });
        
        // ULTRATHINK: Keyboard Navigation Support
        langOptions.addEventListener('keydown', function(e) {
            const buttons = Array.from(langOptions.querySelectorAll('button'));
            const currentIndex = buttons.indexOf(document.activeElement);
            
            if (e.key === 'ArrowDown' && currentIndex < buttons.length - 1) {
                e.preventDefault();
                buttons[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                buttons[currentIndex - 1].focus();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                langOptions.classList.remove('show');
                langOptions.style.display = 'none';
                newLangCurrent.setAttribute('aria-expanded', 'false');
                newLangCurrent.focus();
            }
        });
        
        // ULTRATHINK: Schließe bei Klick außerhalb
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                langOptions.classList.remove('show');
                langOptions.style.display = 'none';
                newLangCurrent.setAttribute('aria-expanded', 'false');
            }
        });
        
        // ULTRATHINK: Setze aktive Sprache beim Laden
        const currentLang = detectCurrentLanguage();
        const activeButton = langOptions.querySelector(`[data-lang="${currentLang}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        console.log('✅ Language Switcher vollständig initialisiert!');
    };
    
    // ULTRATHINK: Hilfsfunktion zur Spracherkennung
    function detectCurrentLanguage() {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/(de|en|pl|uk|ru|ro|ar|sy|fr|nl|tr)(\/|$)/);
        
        if (langMatch) {
            return langMatch[1];
        }
        
        // Fallback auf gespeicherte Präferenz oder Deutsch
        return localStorage.getItem('preferredLanguage') || 'de';
    }
    
    // Starte Setup
    setupSwitcher();
}