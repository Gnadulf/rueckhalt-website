// ULTRATHINK: Critical quick exit functionality for user safety

interface QuickExitState {
  escapeCount: number;
  lastEscapeTime: number;
  isExiting: boolean;
}

class QuickExitManager {
  private state: QuickExitState = {
    escapeCount: 0,
    lastEscapeTime: 0,
    isExiting: false
  };
  
  private readonly ESCAPE_THRESHOLD = 3;
  private readonly RESET_DELAY = 1000; // 1 second
  private readonly EXIT_URL = 'https://www.google.com/search?q=weather';
  private escapeTimer: ReturnType<typeof setTimeout> | null = null;
  
  constructor() {
    this.init();
  }
  
  private init(): void {
    // Keyboard event listener
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Quick exit button click
    const quickExitButton = document.getElementById('quick-exit-button');
    if (quickExitButton) {
      quickExitButton.addEventListener('click', this.performExit.bind(this));
    }
    
    // Additional panic key combination (Ctrl+Shift+Q)
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
        e.preventDefault();
        this.performExit();
      }
    });
    
    // Store state in window for debugging (only in development)
    if (import.meta.env.DEV) {
      (window as any).__quickExitState = this.state;
    }
  }
  
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.state.isExiting) {
      event.preventDefault();
      this.handleEscapeKey();
    }
  }
  
  private handleEscapeKey(): void {
    const now = Date.now();
    
    // Reset counter if too much time has passed
    if (now - this.state.lastEscapeTime > this.RESET_DELAY) {
      this.state.escapeCount = 0;
    }
    
    this.state.escapeCount++;
    this.state.lastEscapeTime = now;
    
    // Show visual feedback
    this.showEscapeIndicator();
    
    // Check if threshold is reached
    if (this.state.escapeCount >= this.ESCAPE_THRESHOLD) {
      this.performExit();
    }
    
    // Reset counter after delay
    if (this.escapeTimer) {
      clearTimeout(this.escapeTimer);
    }
    
    this.escapeTimer = setTimeout(() => {
      this.state.escapeCount = 0;
      this.hideEscapeIndicator();
    }, this.RESET_DELAY);
  }
  
  private performExit(): void {
    if (this.state.isExiting) return;
    
    this.state.isExiting = true;
    
    // Clear sensitive data
    try {
      // Clear session storage
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      
      // Clear specific localStorage items (keep language preference)
      if (typeof localStorage !== 'undefined') {
        const language = localStorage.getItem('language');
        const keysToKeep = ['language', 'analytics-consent'];
        const allKeys = Object.keys(localStorage);
        
        allKeys.forEach(key => {
          if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
          }
        });
      }
      
      // Clear form data
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        if (form instanceof HTMLFormElement) {
          form.reset();
        }
      });
      
      // Clear any text inputs
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
      inputs.forEach(input => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          input.value = '';
        }
      });
      
    } catch (error) {
      // Silent fail - exit is more important than cleanup
      console.error('Cleanup error:', error);
    }
    
    // Replace current page in history
    window.location.replace(this.EXIT_URL);
    
    // Try to close tab (works in some browsers)
    try {
      window.close();
    } catch {
      // Silent fail - not all browsers allow this
    }
  }
  
  private showEscapeIndicator(): void {
    let indicator = document.getElementById('escape-indicator');
    
    if (!indicator) {
      indicator = this.createEscapeIndicator();
    }
    
    indicator.textContent = `ESC: ${this.state.escapeCount}/${this.ESCAPE_THRESHOLD}`;
    indicator.style.opacity = '1';
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-atomic', 'true');
  }
  
  private hideEscapeIndicator(): void {
    const indicator = document.getElementById('escape-indicator');
    if (indicator) {
      indicator.style.opacity = '0';
    }
  }
  
  private createEscapeIndicator(): HTMLElement {
    const indicator = document.createElement('div');
    indicator.id = 'escape-indicator';
    indicator.className = 'escape-indicator';
    indicator.setAttribute('role', 'status');
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-danger, #DC2626);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(indicator);
    return indicator;
  }
}

// Initialize quick exit functionality
if (typeof window !== 'undefined') {
  // Check if already initialized
  if (!(window as any).__quickExitManager) {
    (window as any).__quickExitManager = new QuickExitManager();
  }
}

// Export for testing
export { QuickExitManager };