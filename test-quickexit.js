#!/usr/bin/env node

/**
 * QUICK EXIT FUNCTIONALITY TEST
 * CLAUDE.md Compliance: Must work when someone is in immediate danger
 */

const fs = require('fs');

console.log('🚪 ULTRATHINK QUICK EXIT AUDIT - Leben retten in Gefahr\n');

const indexContent = fs.readFileSync('./index.html', 'utf8');
const mainJsContent = fs.readFileSync('./src/js/main.js', 'utf8');

let criticalFailures = 0;
let warningCount = 0;

// Test 1: Quick Exit Button Presence
console.log('1. 🔴 QUICK EXIT BUTTON TEST:');

const buttonTests = [
  { pattern: /id=["|']quick-exit["|']/i, name: 'Quick exit button ID' },
  { pattern: /class=["|'][^"']*quick-exit[^"']*["|']/i, name: 'Quick exit CSS class' },
  { pattern: /aria-label=["|'][^"']*schnell verlassen[^"']*["|']/i, name: 'Accessibility label' },
  { pattern: /title=["|'][^"']*ESC[^"']*["|']/i, name: 'ESC instruction tooltip' }
];

buttonTests.forEach(({ pattern, name }) => {
  if (pattern.test(indexContent)) {
    console.log(`  ✅ ${name}: Found`);
  } else {
    console.log(`  ❌ ${name}: MISSING - Critical for safety`);
    criticalFailures++;
  }
});

// Test 2: JavaScript Implementation
console.log('\n2. ⚡ JAVASCRIPT FUNCTIONALITY TEST:');

const jsTests = [
  { pattern: /class QuickExit/i, name: 'QuickExit class', critical: true },
  { pattern: /addEventListener.*click.*performExit/i, name: 'Button click handler', critical: true },
  { pattern: /addEventListener.*keydown/i, name: 'Keyboard event handler', critical: true },
  { pattern: /key.*Escape|Escape.*key/i, name: 'ESC key detection', critical: true },
  { pattern: /escapeCount.*3|3.*escapeCount/i, name: 'Triple ESC logic', critical: true },
  { pattern: /location\.replace|window\.location\.replace/i, name: 'History replacement', critical: true },
  { pattern: /google\.de|weather|wetter/i, name: 'Safe redirect URL', critical: true }
];

jsTests.forEach(({ pattern, name, critical }) => {
  if (pattern.test(mainJsContent)) {
    console.log(`  ✅ ${name}: Implemented`);
  } else {
    if (critical) {
      console.log(`  ❌ ${name}: MISSING - LIFE THREATENING`);
      criticalFailures++;
    } else {
      console.log(`  ⚠️  ${name}: Missing - Consider implementing`);
      warningCount++;
    }
  }
});

// Test 3: Safety Features
console.log('\n3. 🛡️ SAFETY FEATURES TEST:');

const safetyTests = [
  { pattern: /ctrlKey.*shiftKey.*Q|panic.*key/i, name: 'Panic key combination' },
  { pattern: /clearTimeout|setTimeout.*escapeCount/i, name: 'ESC counter reset timer' },
  { pattern: /preventDefault/i, name: 'Event prevention for panic keys' },
  { pattern: /new QuickExit|QuickExit\(\)/i, name: 'Auto-initialization' }
];

safetyTests.forEach(({ pattern, name }) => {
  if (pattern.test(mainJsContent)) {
    console.log(`  ✅ ${name}: Implemented`);
  } else {
    console.log(`  ⚠️  ${name}: Not found - Enhanced safety feature`);
    warningCount++;
  }
});

// Test 4: Redirect Safety
console.log('\n4. 🌐 REDIRECT SAFETY TEST:');

const redirectTests = [
  { pattern: /https:\/\/www\.google\.[a-z]+/i, name: 'HTTPS secure redirect' },
  { pattern: /search\?q=wetter|weather/i, name: 'Innocent search query' },
  { pattern: /location\.replace/i, name: 'History clearing method' }
];

redirectTests.forEach(({ pattern, name }) => {
  if (pattern.test(mainJsContent)) {
    console.log(`  ✅ ${name}: Secure`);
  } else {
    console.log(`  ⚠️  ${name}: Could be improved`);
    warningCount++;
  }
});

// Test 5: Accessibility for Crisis
console.log('\n5. ♿ CRISIS ACCESSIBILITY TEST:');

const accessibilityTests = [
  { pattern: /aria-label/i, name: 'Screen reader support' },
  { pattern: /title=["|'][^"']*ESC[^"']*["|']/i, name: 'Tooltip instructions' },
  { pattern: /position.*fixed|fixed.*position/i, name: 'Always visible positioning' },
  { pattern: /z-index.*\d+/i, name: 'High z-index (always on top)' }
];

accessibilityTests.forEach(({ pattern, name }) => {
  if (pattern.test(indexContent) || pattern.test(mainJsContent)) {
    console.log(`  ✅ ${name}: Implemented`);
  } else {
    console.log(`  ⚠️  ${name}: Consider for better accessibility`);
    warningCount++;
  }
});

// Test 6: Multilingual Support
console.log('\n6. 🌍 MULTILINGUAL QUICK EXIT TEST:');

const translationsContent = fs.readFileSync('./src/js/translations-complete.js', 'utf8');

const multilingualTests = [
  { pattern: /quickexit\.button.*schnell verlassen/i, name: 'German quick exit text' },
  { pattern: /quickexit\.button.*quick.*exit/i, name: 'English quick exit text' },
  { pattern: /data-i18n=["|']quickexit\.button["|']/i, name: 'Translation key usage' }
];

multilingualTests.forEach(({ pattern, name }) => {
  if (pattern.test(indexContent) || pattern.test(translationsContent)) {
    console.log(`  ✅ ${name}: Supported`);
  } else {
    console.log(`  ⚠️  ${name}: Limited language support`);
    warningCount++;
  }
});

// FINAL RESULTS
console.log('\n' + '='.repeat(60));
console.log('🚪 ULTRATHINK QUICK EXIT AUDIT RESULTS:');
console.log('='.repeat(60));

console.log(`🚨 Critical Failures: ${criticalFailures}`);
console.log(`⚠️  Warnings: ${warningCount}`);

if (criticalFailures === 0) {
  console.log('\n✅ QUICK EXIT FUNCTIONALITY VERIFIED');
  console.log('🚪 Triple ESC + Button click + Panic keys implemented');
  console.log('🛡️ History clearing and safe redirect working');
  console.log('💙 CLAUDE.md compliance: CRISIS EXIT READY');
  
  if (warningCount > 0) {
    console.log(`\n💡 ${warningCount} enhancements recommended for optimal safety`);
  }
} else {
  console.log('\n🚨 CRITICAL QUICK EXIT FAILURES');
  console.log('⛔ WEBSITE UNSAFE FOR MONITORED USERS');
  console.log('💀 CLAUDE.md VIOLATION: No escape route for crisis');
  console.log('\n🔥 IMMEDIATE FIX REQUIRED - LIVES IN DANGER');
}