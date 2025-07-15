# Dead CSS Analysis Report - RückHalt Website

## Executive Summary

**Analysis Date:** 2025-07-05

**Key Findings:**
- Total CSS selectors found: **516**
- Actually used selectors: **282**
- Potentially dead selectors: **308** (~60% of all CSS)
- High confidence dead code: **34 selectors**
- Files analyzed: 12 CSS, 8 HTML, 6 JS files

## High Confidence Dead Selectors

These selectors have a high probability of being dead code and can likely be removed safely:

### 1. Old Button System (components.css)
The website has migrated to a BEM-style button system using `btn--` modifiers, but the old classes remain:
- `.btn-primary` → Now using `.btn--primary`
- `.btn-secondary` → Now using `.btn--secondary`
- `.btn-emergency` → Now using `.btn--emergency`
- `.btn-small` → Now using `.btn--small`
- `.btn-large` → Now using `.btn--large`

**Action:** Remove old button classes from components.css (lines 50-98)

### 2. Unused Card Components
- `.card-systematic` (bauhaus.css) - Bauhaus-specific card never used
- `.card-header`, `.card-body`, `.card-footer` (components.css) - Old card system replaced by unified components

**Action:** These appear to be from deprecated component system

### 3. Complete Component Systems Never Used
- **Badge System:** `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-emergency`
- **Alert System:** `.alert-icon`, `.alert-content`, `.alert-title`, `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-emergency`
- **Tooltip System:** `.tooltip`, `.tooltip-content`
- **Spinner:** `.spinner`
- **Modal System:** Most modal classes appear unused (`.modal-backdrop`, `.modal`, `.modal-header`, etc.)

**Action:** Consider removing these entire component systems if not planned for future use

### 4. CSS Architecture Issues

#### Duplicate Systems:
- **components.css** contains deprecated button/card systems (commented out but CSS still active)
- **unified-components.css** contains the new BEM-style system
- Both files are loaded, causing redundancy

#### Design System Fragmentation:
- Three design philosophies implemented: Bauhaus, Modern, Pentagram
- Many design-specific classes unused (e.g., `.pentagram-grid`, `.bauhaus-heading-1`)

## Medium Confidence Dead Selectors

These might be used conditionally or dynamically:

### 1. Dark Mode Classes
- `.dark-mode-toggle`, `.moon-icon`, `.dark-mode` - Check if dark mode feature is implemented

### 2. Utility Classes
Large number of unused utility classes:
- Spacing: `.m-1` through `.m-10`, `.p-1` through `.p-10`
- Display: Many flex/grid utilities
- Colors: Various `.bg-*` and `.text-*` classes

### 3. Responsive/State Classes
- `.mobile-only`, `.desktop-only`
- Various hover/focus states

## Recommendations

### Immediate Actions (High Priority):
1. **Remove deprecated button classes** from components.css
2. **Delete unused component systems** (badges, alerts, tooltips, spinner)
3. **Consolidate modal CSS** - check if modal system is actually used
4. **Remove `.card-systematic`** and other unused Bauhaus components

### Architecture Improvements:
1. **Consolidate CSS files:**
   - Merge components.css relevant parts into unified-components.css
   - Remove commented-out deprecated code
   
2. **Audit design systems:**
   - Decide on primary design system (Modern/Bauhaus/Pentagram)
   - Remove unused design-specific components

3. **Utility class strategy:**
   - Consider if utility-first approach is needed
   - If not, remove bulk of unused utility classes

### Estimated Impact:
- **File size reduction:** ~40-50% of CSS could be removed
- **Maintenance improvement:** Clearer component architecture
- **Performance:** Faster CSS parsing and smaller download

## Files Requiring Attention

1. **src/css/components.css** - Contains mostly deprecated code
2. **src/css/bauhaus.css** - Many unused Bauhaus-specific classes
3. **src/css/utilities.css** - Vast majority of utility classes unused
4. **src/css/modal.css** - Entire modal system appears unused

## Verification Steps

Before removing any CSS:
1. Search for dynamic class construction in JavaScript
2. Check for classes added by third-party libraries
3. Test all interactive features (modals, toggles, etc.)
4. Verify responsive behavior at all breakpoints
5. Check browser dev tools for runtime-added classes

## Notes on Analysis Method

This analysis used:
- Static analysis of CSS class definitions
- Pattern matching in HTML class attributes
- JavaScript parsing for common class manipulation patterns
- Did NOT catch:
  - Classes added by frameworks/libraries
  - Classes in template strings with variables
  - Server-side rendered classes
  - Classes in external JavaScript files