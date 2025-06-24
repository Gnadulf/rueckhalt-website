// Quick Exit Functionality - ULTRATHINK: Lives depend on this
export class QuickExit {
    constructor() {
        this.escapeCount = 0;
        this.escapeTimer = null;
        this.exitUrl = 'https://www.wetter.com'; // Innocuous German weather site
        this.init();
    }
    
    init() {
        // Quick exit button
        const quickExitBtn = document.getElementById('quick-exit');
        if (quickExitBtn) {
            quickExitBtn.addEventListener('click', () => this.performExit());
        }
        
        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                this.handleEscape();
            }
        });
        
        // Visual indicator
        this.createEscapeIndicator();
    }
    
    handleEscape() {
        this.escapeCount++;
        this.showEscapeIndicator(this.escapeCount);
        
        if (this.escapeCount >= 3) {
            this.performExit();
            return;
        }
        
        // Reset counter after 1 second
        clearTimeout(this.escapeTimer);
        this.escapeTimer = setTimeout(() => {
            this.escapeCount = 0;
            this.hideEscapeIndicator();
        }, 1000);
    }
    
    performExit() {
        // Clear browser history
        const newPage = window.open(this.exitUrl, '_self');
        window.close();
        
        // Fallback
        window.location.replace(this.exitUrl);
        
        // Try to manipulate history
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, '', this.exitUrl);
        }
    }
    
    createEscapeIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-emergency);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
        `;
        document.body.appendChild(this.indicator);
    }
    
    showEscapeIndicator(count) {
        this.indicator.textContent = `ESC ${count}/3`;
        this.indicator.style.opacity = '1';
    }
    
    hideEscapeIndicator() {
        this.indicator.style.opacity = '0';
    }
}

// Auto-initialize
export function initQuickExit() {
    return new QuickExit();
}