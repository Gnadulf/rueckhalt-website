// Translation system for RückHalt e.V.

const translations = {
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.counseling': 'Beratung',
    'nav.services': 'Angebote',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    
    // Emergency
    'emergency.police': 'Notruf: 110',
    'emergency.helpline': 'Hilfetelefon',
    'emergency.counseling': 'Beratung',
    
    // Hero
    'hero.title': 'Wir sind für Sie da',
    'hero.subtitle': 'Jeder sexuelle Angriff stellt eine schwere Persönlichkeitsverletzung dar und kann eine emotionale Krise auslösen. Sie sind nicht allein.',
    
    // rückhalt-M
    'rueckhalt-m.title': 'Rückhalt-M',
    'rueckhalt-m.subtitle': 'Beratungsangebot speziell für männlich gelesene Personen ab 18 Jahren, die von sexualisierter Gewalt betroffen sind.',
    'rueckhalt-m.feature1': 'Geschützter Rahmen',
    'rueckhalt-m.feature2': 'Erfahrene männlich gelesene Berater*innen',
    'rueckhalt-m.feature3': 'Individuelle Unterstützung',
    'hero.cta.primary': 'Erstgespräch vereinbaren',
    'hero.cta.secondary': 'Wie wir helfen',
    'hero.trust.confidential': 'Vertraulich',
    'hero.trust.free': 'Kostenlos',
    'hero.trust.anonymous': 'Anonym möglich',
    
    // Quick Exit
    'quickexit.button': 'Schnell verlassen',
    'quickexit.tooltip': 'Drücken Sie 3x schnell ESC',
    
    // Services
    'services.title': 'Unsere Beratung',
    'services.subtitle': 'Sie bestimmen das Tempo. Wir begleiten Sie auf Ihrem Weg.',
    'services.individual.title': 'Einzelberatung',
    'services.individual.desc': 'Persönliche Gespräche in geschütztem Rahmen. Online, telefonisch oder vor Ort – Sie entscheiden.',
    'services.relatives.title': 'Für Angehörige',
    'services.relatives.desc': 'Unterstützung für Familie und Freunde. Wie Sie helfen können, ohne sich zu überfordern.',
    'services.legal.title': 'Prozessbegleitung',
    'services.legal.desc': 'Psychosoziale Unterstützung bei rechtlichen Schritten. Wir sind an Ihrer Seite.',
    'services.group.title': 'Gruppenangebote',
    'services.group.desc': 'Gemeinsam stark. Austausch mit anderen Betroffenen in sicherem Rahmen.',
    'services.link': 'Mehr erfahren →',
    
    // Process
    'process.title': 'So läuft es ab',
    'process.subtitle': 'Transparenz schafft Sicherheit',
    'process.step1.title': 'Erste Kontaktaufnahme',
    'process.step1.desc': 'Sie melden sich bei uns – per Telefon, E-Mail oder Kontaktformular. Ganz wie Sie möchten.',
    'process.step2.title': 'Erstgespräch',
    'process.step2.desc': 'Wir hören zu und besprechen gemeinsam, wie wir Sie unterstützen können.',
    'process.step3.title': 'Ihr Weg',
    'process.step3.desc': 'Sie entscheiden über Tempo und Richtung. Wir begleiten Sie dabei.',
    
    // Contact
    'contact.title': 'Wir sind für Sie da',
    'contact.subtitle': 'Vertraulich. Kostenlos. In Ihrem Tempo.',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.location': 'Vor Ort',
    'contact.hours': 'Mo-Fr: 9-17 Uhr',
    'contact.encrypted': 'Verschlüsselt möglich',
    'contact.appointment': 'Terminvereinbarung erforderlich',
    'contact.form.title': 'Nachricht senden',
    'contact.form.info': 'Alle Felder sind optional. Ihre Daten werden verschlüsselt übertragen.',
    'contact.form.name': 'Name (kann Pseudonym sein)',
    'contact.form.contact': 'Wie können wir antworten?',
    'contact.form.message': 'Ihre Nachricht',
    'contact.form.submit': 'Sicher senden',
    'contact.form.encrypted': 'Verschlüsselte Übertragung'
  },
  
  en: {
    // Header
    'nav.home': 'Home',
    'nav.counseling': 'Counseling',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Emergency
    'emergency.police': 'Emergency: 110',
    'emergency.helpline': 'Helpline',
    'emergency.counseling': 'Counseling',
    
    // Hero
    'hero.title': 'We are here for you',
    'hero.subtitle': 'Every sexual assault is a serious violation of personality and can trigger an emotional crisis. You are not alone.',
    
    // rückhalt-M
    'rueckhalt-m.title': 'Rückhalt-M',
    'rueckhalt-m.subtitle': 'Counseling service specifically for male-read persons aged 18 and above who are affected by sexual violence.',
    'rueckhalt-m.feature1': 'Protected space',
    'rueckhalt-m.feature2': 'Experienced male counselors',
    'rueckhalt-m.feature3': 'Individual support',
    'hero.cta.primary': 'Schedule initial consultation',
    'hero.cta.secondary': 'How we help',
    'hero.trust.confidential': 'Confidential',
    'hero.trust.free': 'Free of charge',
    'hero.trust.anonymous': 'Anonymous possible',
    
    // Quick Exit
    'quickexit.button': 'Quick Exit',
    'quickexit.tooltip': 'Press ESC 3x quickly',
    
    // Services
    'services.title': 'Our Counseling',
    'services.subtitle': 'You set the pace. We accompany you on your journey.',
    'services.individual.title': 'Individual Counseling',
    'services.individual.desc': 'Personal conversations in a protected setting. Online, by phone, or in person – you decide.',
    'services.relatives.title': 'For Relatives',
    'services.relatives.desc': 'Support for family and friends. How to help without overwhelming yourself.',
    'services.legal.title': 'Legal Support',
    'services.legal.desc': 'Psychosocial support during legal proceedings. We are by your side.',
    'services.group.title': 'Group Offerings',
    'services.group.desc': 'Stronger together. Exchange with other affected persons in a safe environment.',
    'services.link': 'Learn more →'
  },
  
  ar: {
    // RTL language - basic structure
    'nav.home': 'الصفحة الرئيسية',
    'nav.counseling': 'الاستشارة',
    'nav.services': 'الخدمات',
    'nav.about': 'معلومات عنا',
    'nav.contact': 'اتصل بنا',
    
    'hero.title': 'نحن هنا من أجلك',
    'hero.subtitle': 'كل اعتداء جنسي هو انتهاك خطير للشخصية ويمكن أن يؤدي إلى أزمة عاطفية. لست وحدك.',
    'hero.cta.primary': 'احجز موعد للاستشارة',
    'hero.cta.secondary': 'كيف نساعد',
    
    'emergency.police': 'الطوارئ: 110',
    'quickexit.button': 'خروج سريع'
  },
  
  tr: {
    // Turkish translations
    'nav.home': 'Ana Sayfa',
    'nav.counseling': 'Danışmanlık',
    'nav.services': 'Hizmetler',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    
    'hero.title': 'Sizin için buradayız',
    'hero.subtitle': 'Her cinsel saldırı ciddi bir kişilik ihlalidir ve duygusal bir krize yol açabilir. Yalnız değilsiniz.',
    'hero.cta.primary': 'İlk görüşme randevusu',
    'hero.cta.secondary': 'Nasıl yardım ediyoruz',
    
    'emergency.police': 'Acil: 110',
    'quickexit.button': 'Hızlı Çıkış'
  }
};

// Translation helper
export function t(key, lang = 'de') {
  return translations[lang]?.[key] || translations.de[key] || key;
}

// Language detection
export function detectLanguage() {
  const saved = localStorage.getItem('language');
  if (saved && translations[saved]) return saved;
  
  const browserLang = navigator.language.split('-')[0];
  if (translations[browserLang]) return browserLang;
  
  return 'de';
}

// Apply translations to DOM
export function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key, lang);
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Add RTL support for Arabic
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  // Save preference
  localStorage.setItem('language', lang);
}

export default { t, detectLanguage, applyTranslations };