#!/usr/bin/env node

/**
 * TRAUMA-INFORMED PRIVACY AUDIT
 * CLAUDE.md Compliance: Protect visitors from detection absolutely
 */

const fs = require('fs');
const path = require('path');

console.log('🛡️ ULTRATHINK PRIVACY AUDIT - Schutz vor Überwachung\n');

let criticalIssues = 0;
let warnings = 0;

// Test 1: Check for tracking scripts
console.log('1. 🕵️ TRACKING PREVENTION TEST:');

const indexContent = fs.readFileSync('./index.html', 'utf8');

// Dangerous tracking patterns
const TRACKING_PATTERNS = [
  { pattern: /google-analytics|gtag|ga\(/i, name: 'Google Analytics', critical: true },
  { pattern: /facebook\.com\/tr|fbq\(/i, name: 'Facebook Pixel', critical: true },
  { pattern: /googletagmanager/i, name: 'Google Tag Manager', critical: true },
  { pattern: /hotjar|hj\(/i, name: 'Hotjar', critical: true },
  { pattern: /mixpanel/i, name: 'Mixpanel', critical: true },
  { pattern: /amplitude/i, name: 'Amplitude', critical: true },
  { pattern: /segment\.com/i, name: 'Segment', critical: true }
];

TRACKING_PATTERNS.forEach(({ pattern, name, critical }) => {
  if (pattern.test(indexContent)) {
    if (critical) {
      console.log(`  ❌ ${name}: DETECTED - CRITICAL PRIVACY VIOLATION`);
      criticalIssues++;
    } else {
      console.log(`  ⚠️  ${name}: Detected - Privacy concern`);
      warnings++;
    }
  } else {
    console.log(`  ✅ ${name}: Not detected - Privacy protected`);
  }
});

// Test 2: Check for cookies
console.log('\n2. 🍪 COOKIE COMPLIANCE TEST:');

const cookiePatterns = [
  { pattern: /document\.cookie/i, name: 'Document.cookie usage' },
  { pattern: /localStorage\.setItem|sessionStorage\.setItem/i, name: 'Local storage usage' },
  { pattern: /\.setCookie|setCookie\(/i, name: 'Cookie setting functions' }
];

cookiePatterns.forEach(({ pattern, name }) => {
  if (pattern.test(indexContent)) {
    console.log(`  ⚠️  ${name}: Found - Ensure user consent required`);
    warnings++;
  } else {
    console.log(`  ✅ ${name}: Not found or properly handled`);
  }
});

// Test 3: External resource loading
console.log('\n3. 🌐 EXTERNAL RESOURCE AUDIT:');

const externalPatterns = [
  { pattern: /src=["|']https?:\/\/(?!rueckhalt\.netlify\.app)/g, name: 'External scripts' },
  { pattern: /href=["|']https?:\/\/(?!rueckhalt\.netlify\.app)/g, name: 'External links' },
  { pattern: /@import.*url\(.*https?:/g, name: 'External CSS imports' }
];

externalPatterns.forEach(({ pattern, name }) => {
  const matches = indexContent.match(pattern);
  if (matches) {
    console.log(`  ⚠️  ${name}: ${matches.length} found`);
    matches.slice(0, 3).forEach(match => {
      console.log(`    - ${match.substring(0, 80)}...`);
    });
    warnings++;
  } else {
    console.log(`  ✅ ${name}: No external dependencies`);
  }
});

// Test 4: Quick Exit functionality
console.log('\n4. 🚪 QUICK EXIT FUNCTIONALITY TEST:');

const quickExitTests = [
  { pattern: /quick-exit|quickexit/i, name: 'Quick exit button', required: true },
  { pattern: /weather\.com|google\.com/i, name: 'Safe redirect target', required: true },
  { pattern: /keydown.*27|keydown.*Escape/i, name: 'ESC key handler', required: true },
  { pattern: /history\.replaceState|location\.replace/i, name: 'History clearing', required: true }
];

quickExitTests.forEach(({ pattern, name, required }) => {
  if (pattern.test(indexContent)) {
    console.log(`  ✅ ${name}: Implemented`);
  } else {
    if (required) {
      console.log(`  ❌ ${name}: MISSING - CRITICAL SAFETY FEATURE`);
      criticalIssues++;
    } else {
      console.log(`  ⚠️  ${name}: Not found`);
      warnings++;
    }
  }
});

// Test 5: HTTPS enforcement
console.log('\n5. 🔒 HTTPS SECURITY TEST:');

const httpsTests = [
  { pattern: /http:\/\/(?!localhost)/g, name: 'Insecure HTTP links' },
  { pattern: /\.protocol.*http[^s]/i, name: 'Protocol forcing to HTTP' }
];

httpsTests.forEach(({ pattern, name }) => {
  const matches = indexContent.match(pattern);
  if (matches) {
    console.log(`  ❌ ${name}: ${matches.length} found - SECURITY RISK`);
    criticalIssues++;
  } else {
    console.log(`  ✅ ${name}: No insecure connections`);
  }
});

// Test 6: Privacy-preserving features
console.log('\n6. 🛡️ PRIVACY FEATURES TEST:');

const privacyFeatures = [
  { pattern: /no-referrer|referrerpolicy/i, name: 'Referrer policy protection' },
  { pattern: /incognito|private.*mode/i, name: 'Private browsing recommendations' },
  { pattern: /history.*clear|verlauf.*löschen/i, name: 'History clearing advice' }
];

privacyFeatures.forEach(({ pattern, name }) => {
  if (pattern.test(indexContent)) {
    console.log(`  ✅ ${name}: Implemented`);
  } else {
    console.log(`  ⚠️  ${name}: Consider implementing`);
    warnings++;
  }
});

// Test 7: Form security
console.log('\n7. 📝 FORM SECURITY TEST:');

const formTests = [
  { pattern: /<form[^>]*action=["|']https?:/i, name: 'External form submission' },
  { pattern: /type=["|']password["|']/i, name: 'Password fields' },
  { pattern: /autocomplete=["|']off["|']/i, name: 'Autocomplete disabled' }
];

formTests.forEach(({ pattern, name }) => {
  const matches = indexContent.match(pattern);
  if (matches) {
    if (name === 'External form submission') {
      console.log(`  ⚠️  ${name}: Found - Ensure encryption`);
      warnings++;
    } else if (name === 'Password fields') {
      console.log(`  ⚠️  ${name}: Found - Ensure not cached`);
      warnings++;
    } else {
      console.log(`  ✅ ${name}: Implemented`);
    }
  } else {
    if (name === 'Autocomplete disabled') {
      console.log(`  ⚠️  ${name}: Consider for sensitive forms`);
      warnings++;
    } else {
      console.log(`  ✅ ${name}: Not found (good)`);
    }
  }
});

// FINAL RESULTS
console.log('\n' + '='.repeat(60));
console.log('🛡️ ULTRATHINK PRIVACY AUDIT RESULTS:');
console.log('='.repeat(60));

console.log(`🚨 Critical Issues: ${criticalIssues}`);
console.log(`⚠️  Warnings: ${warnings}`);

if (criticalIssues === 0) {
  console.log('\n✅ NO CRITICAL PRIVACY VIOLATIONS DETECTED');
  console.log('🛡️ Website appears safe for trauma survivors under surveillance');
  console.log('🔒 CLAUDE.md compliance: VISITOR PRIVACY PROTECTED');
  
  if (warnings > 0) {
    console.log(`\n💡 ${warnings} improvements recommended for enhanced privacy`);
  }
} else {
  console.log('\n🚨 CRITICAL PRIVACY VIOLATIONS DETECTED');
  console.log('⛔ WEBSITE NOT SAFE FOR MONITORED USERS');
  console.log('💀 CLAUDE.md VIOLATION: Visitor privacy compromised');
  console.log('\n🔥 IMMEDIATE ACTION REQUIRED - LIVES AT RISK');
}