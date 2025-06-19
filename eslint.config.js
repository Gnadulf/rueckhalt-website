export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                navigator: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                history: "readonly",
                FormData: "readonly",
                translations: "readonly",
                netlify: "readonly"
            }
        },
        rules: {
            // Trauma-Informed Code Standards (CLAUDE.md compliance)
            
            // Accessibility Rules (WCAG AAA mandatory)
            "no-console": "warn",
            
            // Safety Rules (Crisis Response)
            "no-eval": "error",
            "no-implied-eval": "error", 
            
            // Cultural Sensitivity (Multilingual support)
            "quotes": ["error", "single"],
            "no-unused-vars": "error",
            
            // Performance Rules (Must work in crisis)
            "no-unreachable": "error",
            
            // Privacy Rules
            "no-debugger": "error",
            
            // Code Quality (Lives depend on this)
            "no-undef": "error",
            "prefer-const": "error",
            
            // Trauma-Informed Specific Rules
            "no-alert": "warn"
        }
    }
];