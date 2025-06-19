module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // Trauma-Informed Code Standards (CLAUDE.md compliance)
        
        // Accessibility Rules (WCAG AAA mandatory)
        'no-console': 'warn', // Console statements might interfere with screen readers
        
        // Safety Rules (Crisis Response)
        'no-eval': 'error', // Security vulnerability
        'no-implied-eval': 'error', // Security vulnerability
        'no-new-func': 'error', // Security vulnerability
        
        // Cultural Sensitivity (Multilingual support)
        'quotes': ['error', 'single'], // Consistent string handling
        'no-unused-vars': 'error', // Clean code for clarity
        
        // Performance Rules (Must work in crisis)
        'no-unreachable': 'error', // Dead code affects performance
        'no-duplicate-imports': 'error', // Bundle size optimization
        
        // Privacy Rules
        'no-debugger': 'error', // Remove debug statements in production
        
        // Code Quality (Lives depend on this)
        'no-undef': 'error', // Prevent runtime errors
        'no-unused-expressions': 'error', // Clear intent required
        'prefer-const': 'error', // Immutability where possible
        
        // Trauma-Informed Specific Rules
        'no-alert': 'warn', // Alerts can be jarring for trauma survivors
        'no-confirm': 'warn', // Unexpected popups can trigger
        
        // Crisis Response Rules
        'complexity': ['error', 10], // Code must be maintainable under pressure
        'max-depth': ['error', 4], // Reduce cognitive load
        'max-lines-per-function': ['error', 50] // Functions must be understandable quickly
    },
    globals: {
        // Global variables that should be allowed
        'gtag': 'readonly', // Google Analytics (if used)
        'netlify': 'readonly', // Netlify functions
        'translations': 'readonly' // Our translation system
    }
};