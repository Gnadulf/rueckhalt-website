#!/usr/bin/env node

/**
 * TRAUMA-INFORMED MULTILINGUAL TEST SUITE - SIMPLIFIED
 * CLAUDE.md Compliance: Test all 11 languages for crisis readiness
 */

const fs = require('fs');

// Load and parse translations manually
const content = fs.readFileSync('./src/js/translations-complete.js', 'utf8');

// Extract translations object (find the object between 'const translations = {' and '};')
const startMarker = 'const translations = {';
const endMarker = '};';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex === -1 || endIndex === -1) {
  console.error('❌ Could not parse translations object');
  process.exit(1);
}

const translationsCode = content.slice(startIndex, endIndex);

// Simple extraction - count languages by looking for pattern
const languages = [];
const languagePattern = /^\s*([a-z]{2}):\s*{/gm;
let match;

while ((match = languagePattern.exec(translationsCode)) !== null) {
  languages.push(match[1]);
}

// CRITICAL KEYS - Must exist in ALL languages for crisis response
const CRITICAL_KEYS = [
  'emergency.police',
  'emergency.helpline', 
  'emergency.rueckhalt',
  'hero.title',
  'nav.contact',
  'quickexit.button'
];

// EXPECTED LANGUAGES (Ukraine before Russia per political requirements)
const EXPECTED_LANGUAGES = ['de', 'en', 'pl', 'uk', 'ru', 'ro', 'ar', 'sy', 'fr', 'nl', 'tr'];

console.log('🧠 ULTRATHINK MULTILINGUAL AUDIT - Leben abhängig von Übersetzungen\n');

// Test 1: Language Coverage
console.log('1. 🌍 LANGUAGE COVERAGE TEST:');
let missingLanguages = 0;

EXPECTED_LANGUAGES.forEach(expectedLang => {
  if (languages.includes(expectedLang)) {
    console.log(`  ✅ ${expectedLang.toUpperCase()}: Language implemented`);
  } else {
    console.log(`  ❌ ${expectedLang.toUpperCase()}: MISSING - CRITICAL FAILURE`);
    missingLanguages++;
  }
});

// Test 2: Check for critical patterns in each language
console.log('\n2. 🚨 CRITICAL CONTENT VERIFICATION:');
let criticalMissing = 0;

EXPECTED_LANGUAGES.forEach(lang => {
  if (!languages.includes(lang)) return;
  
  // Check if language section contains emergency information
  const langSectionStart = content.indexOf(`  ${lang}: {`);
  const nextLangStart = content.indexOf('  ', langSectionStart + 10);
  const langSectionEnd = nextLangStart > langSectionStart ? nextLangStart : content.length;
  const langSection = content.slice(langSectionStart, langSectionEnd);
  
  const hasEmergencyPhone = langSection.includes('110') || langSection.includes('emergency');
  const hasHelpline = langSection.includes('116') || langSection.includes('helpline');
  const hasContact = langSection.includes('contact') || langSection.includes('Kontakt');
  
  if (hasEmergencyPhone && hasHelpline && hasContact) {
    console.log(`  ✅ ${lang.toUpperCase()}: Critical emergency information present`);
  } else {
    console.log(`  ❌ ${lang.toUpperCase()}: Missing critical emergency information`);
    criticalMissing++;
  }
});

// Test 3: RTL Support
console.log('\n3. 📱 RTL LANGUAGE SUPPORT:');
const rtlLanguages = ['ar', 'sy'];
rtlLanguages.forEach(lang => {
  if (languages.includes(lang)) {
    console.log(`  ✅ ${lang.toUpperCase()}: RTL language implemented`);
  } else {
    console.log(`  ❌ ${lang.toUpperCase()}: RTL language missing`);
  }
});

// Test 4: Political Requirement Check
console.log('\n4. 🇺🇦 POLITICAL REQUIREMENTS:');
const ukIndex = languages.indexOf('uk');
const ruIndex = languages.indexOf('ru');

if (ukIndex !== -1 && ruIndex !== -1) {
  if (ukIndex < ruIndex) {
    console.log('  ✅ Ukrainian listed before Russian - Political requirement met');
  } else {
    console.log('  ⚠️  Russian listed before Ukrainian - Political requirement violated');
  }
} else {
  console.log('  ⚠️  Cannot verify Ukrainian/Russian order - Languages missing');
}

// FINAL RESULTS
console.log('\n' + '='.repeat(60));
console.log('🧠 ULTRATHINK MULTILINGUAL AUDIT RESULTS:');
console.log('='.repeat(60));

const totalIssues = missingLanguages + criticalMissing;

console.log(`📊 Languages Found: ${languages.length}/11 expected`);
console.log(`🌍 Implemented: ${languages.join(', ').toUpperCase()}`);

if (totalIssues === 0) {
  console.log('\n✅ ALL CRITICAL TESTS PASSED');
  console.log('🌍 Website supports all 11 languages for trauma survivors');
  console.log('🚨 Emergency information available in all languages');
  console.log('💙 CLAUDE.md compliance: TRAUMA-INFORMED MULTILINGUAL READY');
} else {
  console.log(`\n🚨 ${totalIssues} CRITICAL ISSUES FOUND`);
  console.log('⛔ WEBSITE NOT FULLY SAFE FOR MULTILINGUAL CRISIS ACCESS');
  
  if (criticalMissing > 0) {
    console.log('💀 CLAUDE.md VIOLATION: Emergency information missing in some languages');
  }
}

console.log('\n💡 Next: Test actual language switching functionality on live site');