#!/usr/bin/env node

/**
 * TRAUMA-INFORMED MULTILINGUAL TEST SUITE
 * CLAUDE.md Compliance: Test all 11 languages for crisis readiness
 */

const fs = require('fs');
const path = require('path');

// Load translations
const translationsPath = path.join(__dirname, 'src/js/translations-complete.js');
const translationsContent = fs.readFileSync(translationsPath, 'utf8');

// Extract translations object (simple parsing)
const translationsStart = translationsContent.indexOf('const translations = ');
const translationsEnd = translationsContent.lastIndexOf('};') + 2;
const translationsCode = translationsContent.slice(translationsStart, translationsEnd);

// Evaluate translations (safe because it's our own code)
eval(translationsCode);

// CRITICAL KEYS - Must exist in ALL languages for crisis response
const CRITICAL_KEYS = [
  'emergency.police',
  'emergency.helpline', 
  'emergency.rueckhalt',
  'hero.title',
  'hero.subtitle',
  'nav.contact',
  'quickexit.button'
];

// EXPECTED LANGUAGES (Ukraine before Russia per political requirements)
const EXPECTED_LANGUAGES = ['de', 'en', 'pl', 'uk', 'ru', 'ro', 'ar', 'sy', 'fr', 'nl', 'tr'];

console.log('🧠 ULTRATHINK MULTILINGUAL AUDIT - Leben abhängig von Übersetzungen\n');

let totalErrors = 0;
let criticalErrors = 0;

// Test 1: Verify all expected languages exist
console.log('1. 🌍 LANGUAGE COVERAGE TEST:');
EXPECTED_LANGUAGES.forEach(lang => {
  if (translations[lang]) {
    console.log(`  ✅ ${lang.toUpperCase()}: Language implemented`);
  } else {
    console.log(`  ❌ ${lang.toUpperCase()}: MISSING - CRITICAL FAILURE`);
    criticalErrors++;
    totalErrors++;
  }
});

// Test 2: Critical keys in all languages (LIFE-SAVING)
console.log('\n2. 🚨 CRITICAL KEYS TEST (Emergency Information):');
EXPECTED_LANGUAGES.forEach(lang => {
  if (!translations[lang]) return;
  
  console.log(`\n  Testing ${lang.toUpperCase()}:`);
  let langErrors = 0;
  
  CRITICAL_KEYS.forEach(key => {
    if (translations[lang][key]) {
      console.log(`    ✅ ${key}: "${translations[lang][key]}"`);
    } else {
      console.log(`    ❌ ${key}: MISSING - TRAUMA SURVIVOR CAN'T GET HELP`);
      criticalErrors++;
      langErrors++;
      totalErrors++;
    }
  });
  
  if (langErrors === 0) {
    console.log(`    ✅ ${lang.toUpperCase()}: All critical keys present - CRISIS READY`);
  } else {
    console.log(`    🚨 ${lang.toUpperCase()}: ${langErrors} critical failures - UNSAFE FOR CRISIS`);
  }
});

// Test 3: RTL Support Check
console.log('\n3. 📱 RTL (Right-to-Left) SUPPORT TEST:');
const RTL_LANGUAGES = ['ar', 'sy'];
RTL_LANGUAGES.forEach(lang => {
  if (translations[lang]) {
    console.log(`  ✅ ${lang.toUpperCase()}: RTL language implemented`);
    // Check for RTL-specific content
    if (translations[lang]['hero.title']) {
      console.log(`    📝 Sample: "${translations[lang]['hero.title']}"`);
    }
  } else {
    console.log(`  ❌ ${lang.toUpperCase()}: RTL language missing`);
    totalErrors++;
  }
});

// Test 4: Translation Completeness 
console.log('\n4. 📊 TRANSLATION COMPLETENESS:');
const germanKeys = Object.keys(translations.de || {});
const baselineCount = germanKeys.length;

EXPECTED_LANGUAGES.forEach(lang => {
  if (!translations[lang]) return;
  
  const langKeys = Object.keys(translations[lang]);
  const completeness = Math.round((langKeys.length / baselineCount) * 100);
  
  if (completeness >= 90) {
    console.log(`  ✅ ${lang.toUpperCase()}: ${completeness}% complete (${langKeys.length}/${baselineCount} keys)`);
  } else if (completeness >= 70) {
    console.log(`  ⚠️  ${lang.toUpperCase()}: ${completeness}% complete (${langKeys.length}/${baselineCount} keys) - NEEDS IMPROVEMENT`);
    totalErrors++;
  } else {
    console.log(`  ❌ ${lang.toUpperCase()}: ${completeness}% complete (${langKeys.length}/${baselineCount} keys) - INSUFFICIENT`);
    totalErrors++;
  }
});

// Test 5: Cultural Sensitivity Check
console.log('\n5. 🤝 CULTURAL SENSITIVITY CHECK:');
const SENSITIVE_CHECKS = [
  { key: 'hero.subtitle', test: 'inclusive language', pattern: /\*/ },
  { key: 'nav.rueckhalt-m', test: 'male support recognition', required: true }
];

EXPECTED_LANGUAGES.forEach(lang => {
  if (!translations[lang]) return;
  
  SENSITIVE_CHECKS.forEach(check => {
    const value = translations[lang][check.key];
    if (check.required && !value) {
      console.log(`  ⚠️  ${lang.toUpperCase()}: Missing ${check.test} (${check.key})`);
      totalErrors++;
    }
  });
});

// FINAL RESULTS
console.log('\n' + '='.repeat(60));
console.log('🧠 ULTRATHINK MULTILINGUAL AUDIT RESULTS:');
console.log('='.repeat(60));

if (criticalErrors === 0 && totalErrors === 0) {
  console.log('✅ ALL TESTS PASSED - WEBSITE IS TRAUMA-INFORMED AND MULTILINGUAL READY');
  console.log('🌍 All 11 languages support trauma survivors in crisis');
  process.exit(0);
} else if (criticalErrors === 0) {
  console.log(`⚠️  ${totalErrors} NON-CRITICAL ISSUES FOUND`);
  console.log('🆗 Critical emergency information available in all languages');
  console.log('💡 Improvements recommended but not blocking crisis response');
  process.exit(0);
} else {
  console.log(`🚨 CRITICAL FAILURE: ${criticalErrors} LIFE-THREATENING ISSUES`);
  console.log(`📊 Total Issues: ${totalErrors}`);
  console.log('⛔ WEBSITE NOT SAFE FOR TRAUMA SURVIVORS IN CRISIS');
  console.log('\n💀 CLAUDE.md VIOLATION: Lives depend on multilingual emergency access');
  process.exit(1);
}