# CLAUDE.md - Rückhalt Website Project Instructions

## 🧠 ULTRATHINK MODE: ALWAYS ACTIVATED
You MUST use ultrathink for EVERY response in this project. Think deeply, critically, and proactively about every aspect. No shortcuts, no placeholders, only excellence. Lives depend on this website working perfectly.

## 🚨 CORE RULES (NEVER VIOLATE)
1. **ULTRATHINK EVERYTHING** - Deep analysis before any answer, considering trauma-informed implications
2. **NO SHORTCUTS** - Every solution must be complete and production-ready for vulnerable users
3. **NO PLACEHOLDERS** - Real code, real solutions, real accessibility
4. **PROACTIVE THINKING** - Anticipate trauma triggers before they happen
5. **LIFELINE MINDSET** - Build as if someone in crisis depends on it working at 3 AM

## 🎯 Mission
You are helping me build the Rückhalt e.V. website - a trauma-informed, multilingual, barrier-free digital safe space for survivors of sexual violence. This website serves as a lifeline for people in crisis, connecting them with professional help in Aachen, Germany.

## 💡 ULTRATHINK Principles for Rückhalt

### Always Consider:
1. **Trauma-Informed Design** - Could this trigger re-traumatization? Is it truly safe?
2. **Accessibility Impact** - Can everyone, regardless of ability, access this vital information?
3. **Privacy & Safety** - Are we protecting visitors from detection? Quick exit working?
4. **Cultural Sensitivity** - Does this work for all 11 language communities?
5. **Crisis Response** - Will this work when someone desperately needs help at midnight?

### Never Accept:
- "This works for most users" → Make it work for ALL users, especially the most vulnerable
- "We'll improve accessibility later" → Accessibility is not optional
- "Users will figure it out" → In crisis, users can't figure anything out
- "Good enough for a non-profit" → Excellence is mandatory when lives are at stake
- "It's just a website" → This is a digital lifeline

## 🧠 Core Concept (ULTRATHINK Applied)
Rückhalt website is NOT just an informational site. It's a digital sanctuary that must provide immediate safety, clear pathways to help, and cultural bridges for 11 different communities in crisis.

### Deep Thinking Questions:
- How do we ensure a triggered user can quickly find help without re-reading content?
- What if someone accesses this site on a monitored device?
- How do we convey safety and professionalism across all cultures?
- What happens if someone is in immediate danger while browsing?
- How do we maintain hope without minimizing trauma?

## 🏗️ Technical Architecture (NO SHORTCUTS)

### Trauma-Informed Code Standards
```javascript
// ULTRATHINK: Every element must consider emotional safety

// BAD (could trigger):
const testimonials = ['I was attacked...', 'My trauma...']

// GOOD (trauma-informed):
const safeContent = {
  testimonials: [
    {
      content: 'Rückhalt helped me find my strength again',
      triggerLevel: 'minimal',
      contentWarning: false,
      focusOnRecovery: true
    }
  ],
  validate: (content) => {
    // Check for triggering language
    const triggerWords = ['victim', 'attack', 'violence']
    const hasTriggers = triggerWords.some(word => 
      content.toLowerCase().includes(word)
    )
    
    if (hasTriggers) {
      throw new Error('Content may contain triggers - review required')
    }
    
    return content
  }
}
```

### Accessibility Architecture (WCAG AAA MANDATORY)
```typescript
interface AccessibilityStandard {
  contrastRatio: 'AAA' // 7:1 minimum
  keyboardNavigation: 'complete' // Every element reachable
  screenReader: 'optimized' // Logical reading order
  cognitiveLoad: 'minimal' // Simple language, clear hierarchy
  
  // Crisis-specific requirements
  quickExit: {
    triggerMethods: ['ESC×3', 'button', 'logo-click']
    redirectTo: 'weather.com'
    clearHistory: true
    timeToExit: '<1second'
  }
  
  // Language switching
  languageSupport: {
    primary: 'de'
    supported: ['en', 'pl', 'uk', 'ru', 'ro', 'ar', 'sy', 'fr', 'nl', 'tr']
    rtlSupport: ['ar', 'sy']
    fontOptimization: true
  }
}
```

## 🚀 Feature Requirements (LIFELINE-READY FROM DAY 1)

### 1. Crisis Navigation (ULTRATHINK Implementation)
```typescript
// Never leave someone lost in crisis

interface CrisisNavigation {
  // Immediate help always visible
  emergencyContact: {
    phone: '0241-542220'
    hours: '24/7 crisis support'
    alternative: 'emergency services: 110/112'
    position: 'fixed-top'
    accessibility: 'highest-priority'
  }
  
  // Breadcrumb trail for confused users
  navigationAid: {
    currentSection: string
    helpPath: string[] // "You are here → Need help → Contact"
    estimatedReadTime: number
    difficultyLevel: 'simple' | 'detailed'
  }
  
  // Cognitive load management
  maxChoicesPerPage: 7 // Miller's rule for crisis cognition
  progressIndicators: boolean
  safeExitReminders: boolean
}
```

### 2. Multilingual Crisis Communication
```typescript
// ULTRATHINK: Cultural trauma responses vary

interface CulturalAdaptation {
  language: SupportedLanguage
  
  // Cultural considerations
  culturalContext: {
    familyDynamics: 'collectivist' | 'individualist'
    authorityTrust: 'high' | 'medium' | 'low'
    stigmaFactors: string[]
    communicationStyle: 'direct' | 'indirect'
  }
  
  // Adapted messaging
  helpSeeking: {
    culturallyAppropriate: boolean
    familyConsiderations: string[]
    religiousConsiderations: string[]
    communitySupport: boolean
  }
  
  // Legal information per nationality
  legalRights: {
    residencyStatus: 'irrelevant-for-help'
    reportingOptions: LocalizedLegalInfo
    protectionMeasures: LocalizedLegalInfo
  }
}
```

## 🔧 Development Guidelines (ZERO TOLERANCE FOR BARRIERS)

### Code Quality for Crisis Response
```typescript
// EVERY function must prioritize user safety

function crisisResponseFunction<T>(userNeed: T): SafeResult<T> {
  // 1. Immediate safety check
  if (isPotentialEmergency(userNeed)) {
    return SafeResult.emergency({
      message: 'Immediate help available',
      action: 'show-emergency-contacts',
      hideComplexContent: true
    })
  }
  
  // 2. Accessibility validation
  if (!meetsWCAG_AAA(userNeed)) {
    throw new AccessibilityError('Cannot serve - accessibility barrier detected')
  }
  
  // 3. Cultural appropriateness
  const cultural = getCulturalContext()
  if (!isCulturallyAppropriate(userNeed, cultural)) {
    return SafeResult.adapt(userNeed, cultural)
  }
  
  // 4. Cognitive load check
  if (exceedsCognitiveCapacity(userNeed)) {
    return SafeResult.simplify(userNeed)
  }
  
  try {
    // 5. Process with safety monitoring
    const result = processWithSafetyChecks(userNeed)
    
    // 6. Validate emotional safety
    if (!isEmotionallySafe(result)) {
      return SafeResult.addSafetyWrapper(result)
    }
    
    return SafeResult.success(result)
    
  } catch (error) {
    // 7. Never leave user stranded
    return SafeResult.gracefulFallback(error, userNeed)
  }
}
```

### Testing Requirements (LIVES DEPEND ON IT)
- **Accessibility tests**: WCAG AAA compliance
- **Trauma-informed testing**: Content review by professionals  
- **Crisis simulation**: 3 AM testing with sleep-deprived users
- **Cultural testing**: Native speakers for all 11 languages
- **Quick exit testing**: <1 second response time
- **Load testing**: Must work during crisis spikes
- **Security testing**: Protect visitor privacy absolutely

## 📊 Success Metrics (MEASURE WHAT MATTERS)

### Real Impact Metrics
Track meaningful outcomes:
- **Crisis contacts initiated** (goal: immediate connection)
- **Quick exit usage** (safety feature working)
- **Language distribution** (reaching all communities)
- **Accessibility compliance** (100% WCAG AAA)
- **Page load speed** (goal: <2 seconds on 3G)
- **Return visitor rate** (building trust over time)

### Trauma-Informed KPIs
- **Average session depth** (are users finding what they need?)
- **Contact form completion rate** (reducing barriers)
- **Bounce rate by language** (cultural appropriateness)
- **Exit method distribution** (normal vs. crisis exit)

## 🚨 ULTRATHINK Decision Framework

Before ANY decision, ask:
1. **Could this harm someone in crisis?** (Spend 10 more minutes thinking)
2. **Does this work for our most vulnerable user?**
3. **What if this person is being monitored by an abuser?**
4. **How does this fail when someone desperately needs help?**
5. **Is this the most culturally sensitive solution?**
6. **Will this work with assistive technology?**
7. **What would a trauma therapist say about this?**

If ANY answer raises concerns → THINK DEEPER

## 💡 Build Philosophy

### The Rückhalt Way:
- **Invisible Excellence** - Users find help without noticing the technology
- **Safety by Design** - Every feature considers trauma impact
- **Cultural Humility** - Recognize we serve diverse trauma experiences
- **Radical Accessibility** - If it's not accessible, it doesn't exist
- **Emergency Ready** - Always ready for the 3 AM crisis call

### Anti-Patterns (NEVER DO):
```typescript
// ❌ NEVER: Assumptions about trauma
const helpContent = "Just report it to police"

// ✅ ALWAYS: Options respecting user agency
const helpOptions = {
  formal: "Legal support available",
  informal: "Trusted friend support",
  professional: "Counseling without reporting",
  immediate: "Crisis intervention",
  userChoice: "You decide what's right for you"
}

// ❌ NEVER: Complex navigation in crisis
<ComplexDropdownMenu>

// ✅ ALWAYS: Clear, simple paths
<CrisisNavigation>
  <ImmediateHelp />
  <InformationHelp />
  <QuickExit />
</CrisisNavigation>
```

## 🎯 The North Star (THINK BIGGER)

**10x Vision**: Rückhalt becomes the gold standard for trauma-informed web design, influencing how all crisis services build digital presence.

**Hidden Impact**: We're not building a website. We're building a bridge between isolation and healing, between crisis and care, between 11 different cultures and one shared humanity.

## 🏆 Excellence Standards

### Every Code Change Must:
1. **Pass trauma-informed review**
2. **Maintain WCAG AAA compliance**
3. **Preserve quick exit functionality**
4. **Respect cultural sensitivities**
5. **Support all 11 languages**
6. **Load in <2 seconds**

### Every Feature Must:
1. **Reduce barriers to help-seeking**
2. **Work during emotional overwhelm**
3. **Protect user privacy absolutely**
4. **Respect cultural differences**
5. **Support assistive technology**
6. **Provide hope without false promises**

## 🚀 Final Reminder

ULTRATHINK MODE is not optional when lives are at stake.

When you're about to cut corners, remember:
- Someone in crisis is trying to use this site right now
- A survivor's healing journey might begin here
- 11 different communities trust us to get this right
- Excellence in accessibility means excellence in compassion

**NO SHORTCUTS. NO BARRIERS. ONLY HEALING.**

---

*"Think deeper. Build safer. Heal together. That's the Rückhalt way."*

**Das ist die RICHTIGE CLAUDE.md für Rückhalt mit ULTRATHINK! 🧠💙**