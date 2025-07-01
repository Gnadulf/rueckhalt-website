// Pitch JavaScript - RückHalt e.V. Präsentation

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

// Import main functionality for shared components
import './main.js';

// Pitch-specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Auto-play for feature cards animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all feature cards and metric boxes
  document.querySelectorAll('.feature-card, .metric-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    animateOnScroll.observe(el);
  });
});