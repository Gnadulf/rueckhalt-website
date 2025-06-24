// ULTRATHINK: Centralized content management for all languages
import type { SupportedLanguage, CounselingService } from '@/env.d.ts';

export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
}

export interface HomePageContent {
  meta: PageMeta;
  hero: {
    title: string;
    subtitle: string;
    trust: string[];
    primaryCTA: string;
    secondaryCTA: string;
  };
  infoCards: Array<{
    title: string;
    description: string;
    color: 'primary' | 'secondary' | 'accent';
  }>;
}

// Home page content for all languages
export const homePageContent: Record<SupportedLanguage, HomePageContent> = {
  de: {
    meta: {
      title: 'Startseite',
      description: 'Rückhalt - Beratungsstelle gegen sexuelle Gewalt in Aachen. Kostenlose und vertrauliche Hilfe für Betroffene jeden Alters.',
      keywords: 'Beratungsstelle, sexuelle Gewalt, Aachen, Hilfe, Rückhalt, kostenlos, vertraulich, Trauma, Unterstützung'
    },
    hero: {
      title: 'Wir sind für Sie da',
      subtitle: 'Hilfe bei sexueller Gewalt. Sie sind nicht allein.',
      trust: ['Vertraulich', 'Kostenlos', 'In Ihrem Tempo'],
      primaryCTA: 'Erstgespräch vereinbaren',
      secondaryCTA: 'Unsere Angebote'
    },
    infoCards: [
      {
        title: 'Für Betroffene',
        description: 'Unterstützung für Menschen jeden Alters und Geschlechts',
        color: 'primary'
      },
      {
        title: 'Für Angehörige',
        description: 'Begleitung für Bezugspersonen und Unterstützende',
        color: 'secondary'
      },
      {
        title: 'Flexible Termine',
        description: 'Online, telefonisch oder vor Ort - Sie entscheiden',
        color: 'accent'
      }
    ]
  },
  en: {
    meta: {
      title: 'Home',
      description: 'Rückhalt - Counseling center against sexual violence in Aachen. Free and confidential help for affected persons of all ages.',
      keywords: 'counseling center, sexual violence, Aachen, help, support, free, confidential, trauma'
    },
    hero: {
      title: 'We are here for you',
      subtitle: 'Help with sexual violence. You are not alone.',
      trust: ['Confidential', 'Free of charge', 'At your pace'],
      primaryCTA: 'Schedule initial consultation',
      secondaryCTA: 'Our services'
    },
    infoCards: [
      {
        title: 'For affected persons',
        description: 'Support for people of all ages and genders',
        color: 'primary'
      },
      {
        title: 'For relatives',
        description: 'Support for family and friends',
        color: 'secondary'
      },
      {
        title: 'Flexible appointments',
        description: 'Online, by phone or in person - you decide',
        color: 'accent'
      }
    ]
  },
  pl: {
    meta: {
      title: 'Strona główna',
      description: 'Rückhalt - Poradnia przeciwko przemocy seksualnej w Aachen. Bezpłatna i poufna pomoc dla poszkodowanych w każdym wieku.',
      keywords: 'poradnia, przemoc seksualna, Aachen, pomoc, wsparcie, bezpłatnie, poufnie, trauma'
    },
    hero: {
      title: 'Jesteśmy tu dla Ciebie',
      subtitle: 'Pomoc w przypadku przemocy seksualnej. Nie jesteś sam/a.',
      trust: ['Poufnie', 'Bezpłatnie', 'W Twoim tempie'],
      primaryCTA: 'Umów pierwsze spotkanie',
      secondaryCTA: 'Nasze usługi'
    },
    infoCards: [
      {
        title: 'Dla poszkodowanych',
        description: 'Wsparcie dla osób w każdym wieku i każdej płci',
        color: 'primary'
      },
      {
        title: 'Dla bliskich',
        description: 'Wsparcie dla rodziny i przyjaciół',
        color: 'secondary'
      },
      {
        title: 'Elastyczne terminy',
        description: 'Online, telefonicznie lub osobiście - Ty decydujesz',
        color: 'accent'
      }
    ]
  },
  uk: {
    meta: {
      title: 'Головна',
      description: 'Rückhalt - Консультаційний центр проти сексуального насильства в Аахені. Безкоштовна та конфіденційна допомога для постраждалих будь-якого віку.',
      keywords: 'консультаційний центр, сексуальне насильство, Аахен, допомога, підтримка, безкоштовно, конфіденційно, травма'
    },
    hero: {
      title: 'Ми тут для вас',
      subtitle: 'Допомога при сексуальному насильстві. Ви не самотні.',
      trust: ['Конфіденційно', 'Безкоштовно', 'У вашому темпі'],
      primaryCTA: 'Записатися на першу консультацію',
      secondaryCTA: 'Наші послуги'
    },
    infoCards: [
      {
        title: 'Для постраждалих',
        description: 'Підтримка для людей будь-якого віку та статі',
        color: 'primary'
      },
      {
        title: 'Для близьких',
        description: 'Підтримка для родини та друзів',
        color: 'secondary'
      },
      {
        title: 'Гнучкий графік',
        description: 'Онлайн, по телефону або особисто - ви вирішуєте',
        color: 'accent'
      }
    ]
  },
  ru: {
    meta: {
      title: 'Главная',
      description: 'Rückhalt - Консультационный центр против сексуального насилия в Аахене. Бесплатная и конфиденциальная помощь для пострадавших любого возраста.',
      keywords: 'консультационный центр, сексуальное насилие, Аахен, помощь, поддержка, бесплатно, конфиденциально, травма'
    },
    hero: {
      title: 'Мы здесь для вас',
      subtitle: 'Помощь при сексуальном насилии. Вы не одиноки.',
      trust: ['Конфиденциально', 'Бесплатно', 'В вашем темпе'],
      primaryCTA: 'Записаться на первую консультацию',
      secondaryCTA: 'Наши услуги'
    },
    infoCards: [
      {
        title: 'Для пострадавших',
        description: 'Поддержка для людей любого возраста и пола',
        color: 'primary'
      },
      {
        title: 'Для близких',
        description: 'Поддержка для семьи и друзей',
        color: 'secondary'
      },
      {
        title: 'Гибкий график',
        description: 'Онлайн, по телефону или лично - вы решаете',
        color: 'accent'
      }
    ]
  },
  ro: {
    meta: {
      title: 'Acasă',
      description: 'Rückhalt - Centru de consiliere împotriva violenței sexuale în Aachen. Ajutor gratuit și confidențial pentru persoanele afectate de toate vârstele.',
      keywords: 'centru de consiliere, violență sexuală, Aachen, ajutor, sprijin, gratuit, confidențial, traumă'
    },
    hero: {
      title: 'Suntem aici pentru tine',
      subtitle: 'Ajutor în caz de violență sexuală. Nu ești singur/ă.',
      trust: ['Confidențial', 'Gratuit', 'În ritmul tău'],
      primaryCTA: 'Programează prima consultație',
      secondaryCTA: 'Serviciile noastre'
    },
    infoCards: [
      {
        title: 'Pentru persoane afectate',
        description: 'Sprijin pentru persoane de toate vârstele și genurile',
        color: 'primary'
      },
      {
        title: 'Pentru apropiați',
        description: 'Sprijin pentru familie și prieteni',
        color: 'secondary'
      },
      {
        title: 'Program flexibil',
        description: 'Online, telefonic sau personal - tu decizi',
        color: 'accent'
      }
    ]
  },
  ar: {
    meta: {
      title: 'الصفحة الرئيسية',
      description: 'Rückhalt - مركز استشارات ضد العنف الجنسي في آخن. مساعدة مجانية وسرية للمتضررين من جميع الأعمار.',
      keywords: 'مركز استشارات، عنف جنسي، آخن، مساعدة، دعم، مجاني، سري، صدمة'
    },
    hero: {
      title: 'نحن هنا من أجلك',
      subtitle: 'المساعدة في حالات العنف الجنسي. أنت لست وحدك.',
      trust: ['سري', 'مجاني', 'بالوتيرة التي تناسبك'],
      primaryCTA: 'احجز الاستشارة الأولى',
      secondaryCTA: 'خدماتنا'
    },
    infoCards: [
      {
        title: 'للمتضررين',
        description: 'دعم للأشخاص من جميع الأعمار والأجناس',
        color: 'primary'
      },
      {
        title: 'للأقارب',
        description: 'دعم للعائلة والأصدقاء',
        color: 'secondary'
      },
      {
        title: 'مواعيد مرنة',
        description: 'عبر الإنترنت أو الهاتف أو شخصيًا - أنت تقرر',
        color: 'accent'
      }
    ]
  },
  sy: {
    meta: {
      title: 'ܦܐܬܐ ܪܝܫܝܬܐ',
      description: 'Rückhalt - ܡܪܟܙܐ ܕܡܠܟܐ ܠܘܩܒܠ ܛܠܘܡܝܐ ܓܢܣܝܐ ܒܐܟܢ. ܥܘܕܪܢܐ ܡܓܢ ܘܣܘܬܪܝܐ ܠܟܠ ܕܡܬܢܟܐ.',
      keywords: 'ܡܪܟܙܐ ܕܡܠܟܐ، ܛܠܘܡܝܐ ܓܢܣܝܐ، ܐܟܢ، ܥܘܕܪܢܐ، ܣܡܟܐ، ܡܓܢ، ܣܘܬܪܝܐ'
    },
    hero: {
      title: 'ܚܢܢ ܗܪܟܐ ܡܛܠܬܟ',
      subtitle: 'ܥܘܕܪܢܐ ܒܛܠܘܡܝܐ ܓܢܣܝܐ. ܠܐ ܐܢܬ ܒܠܚܘܕܝܟ.',
      trust: ['ܒܣܘܬܪܐ', 'ܡܓܢ', 'ܒܪܗܛܐ ܕܝܠܟ'],
      primaryCTA: 'ܣܝܡ ܙܒܢܐ ܠܡܠܟܐ ܩܕܡܝܐ',
      secondaryCTA: 'ܬܫܡܫܬܢ'
    },
    infoCards: [
      {
        title: 'ܠܕܡܬܢܟܐ',
        description: 'ܣܡܟܐ ܠܟܠ ܐܢܫ ܒܟܠ ܥܘܡܪܐ ܘܓܢܣܐ',
        color: 'primary'
      },
      {
        title: 'ܠܩܪ̈ܝܒܐ',
        description: 'ܣܡܟܐ ܠܒܝܬܝܘܬܐ ܘܪ̈ܚܡܐ',
        color: 'secondary'
      },
      {
        title: 'ܙܒܢ̈ܐ ܦܟܝܟ̈ܐ',
        description: 'ܒܐܢܛܪܢܛ، ܒܛܠܦܘܢ ܐܘ ܒܦܪܨܘܦܐ - ܐܢܬ ܦܣܩ',
        color: 'accent'
      }
    ]
  },
  fr: {
    meta: {
      title: 'Accueil',
      description: 'Rückhalt - Centre de conseil contre la violence sexuelle à Aix-la-Chapelle. Aide gratuite et confidentielle pour les personnes concernées de tout âge.',
      keywords: 'centre de conseil, violence sexuelle, Aix-la-Chapelle, aide, soutien, gratuit, confidentiel, traumatisme'
    },
    hero: {
      title: 'Nous sommes là pour vous',
      subtitle: 'Aide en cas de violence sexuelle. Vous n\'êtes pas seul(e).',
      trust: ['Confidentiel', 'Gratuit', 'À votre rythme'],
      primaryCTA: 'Prendre rendez-vous',
      secondaryCTA: 'Nos services'
    },
    infoCards: [
      {
        title: 'Pour les personnes concernées',
        description: 'Soutien pour les personnes de tout âge et de tout genre',
        color: 'primary'
      },
      {
        title: 'Pour les proches',
        description: 'Accompagnement pour la famille et les amis',
        color: 'secondary'
      },
      {
        title: 'Rendez-vous flexibles',
        description: 'En ligne, par téléphone ou en personne - vous décidez',
        color: 'accent'
      }
    ]
  },
  nl: {
    meta: {
      title: 'Home',
      description: 'Rückhalt - Adviescentrum tegen seksueel geweld in Aken. Gratis en vertrouwelijke hulp voor getroffenen van alle leeftijden.',
      keywords: 'adviescentrum, seksueel geweld, Aken, hulp, ondersteuning, gratis, vertrouwelijk, trauma'
    },
    hero: {
      title: 'Wij zijn er voor je',
      subtitle: 'Hulp bij seksueel geweld. Je bent niet alleen.',
      trust: ['Vertrouwelijk', 'Gratis', 'In jouw tempo'],
      primaryCTA: 'Eerste gesprek plannen',
      secondaryCTA: 'Onze diensten'
    },
    infoCards: [
      {
        title: 'Voor getroffenen',
        description: 'Ondersteuning voor mensen van alle leeftijden en geslachten',
        color: 'primary'
      },
      {
        title: 'Voor naasten',
        description: 'Begeleiding voor familie en vrienden',
        color: 'secondary'
      },
      {
        title: 'Flexibele afspraken',
        description: 'Online, telefonisch of persoonlijk - jij beslist',
        color: 'accent'
      }
    ]
  },
  tr: {
    meta: {
      title: 'Ana Sayfa',
      description: 'Rückhalt - Aachen\'da cinsel şiddete karşı danışma merkezi. Her yaştan mağdur için ücretsiz ve gizli yardım.',
      keywords: 'danışma merkezi, cinsel şiddet, Aachen, yardım, destek, ücretsiz, gizli, travma'
    },
    hero: {
      title: 'Sizin için buradayız',
      subtitle: 'Cinsel şiddet durumunda yardım. Yalnız değilsiniz.',
      trust: ['Gizli', 'Ücretsiz', 'Sizin hızınızda'],
      primaryCTA: 'İlk görüşme randevusu',
      secondaryCTA: 'Hizmetlerimiz'
    },
    infoCards: [
      {
        title: 'Mağdurlar için',
        description: 'Her yaş ve cinsiyetten insanlar için destek',
        color: 'primary'
      },
      {
        title: 'Yakınlar için',
        description: 'Aile ve arkadaşlar için destek',
        color: 'secondary'
      },
      {
        title: 'Esnek randevular',
        description: 'Online, telefonla veya yüz yüze - siz karar verin',
        color: 'accent'
      }
    ]
  }
};

// Services offered by Rückhalt
export const services: CounselingService[] = [
  {
    id: 'individual-counseling',
    name: {
      de: 'Einzelberatung',
      en: 'Individual Counseling',
      pl: 'Doradztwo indywidualne',
      uk: 'Індивідуальне консультування',
      ru: 'Индивидуальное консультирование',
      ro: 'Consiliere individuală',
      ar: 'الاستشارة الفردية',
      sy: 'ܡܠܟܐ ܦܪܨܘܦܝܐ',
      fr: 'Conseil individuel',
      nl: 'Individuele begeleiding',
      tr: 'Bireysel danışmanlık'
    },
    description: {
      de: 'Vertrauliche Einzelgespräche für Betroffene sexueller Gewalt',
      en: 'Confidential one-on-one sessions for survivors of sexual violence',
      pl: 'Poufne rozmowy indywidualne dla osób dotkniętych przemocą seksualną',
      uk: 'Конфіденційні індивідуальні сесії для постраждалих від сексуального насильства',
      ru: 'Конфиденциальные индивидуальные беседы для пострадавших от сексуального насилия',
      ro: 'Sesiuni individuale confidențiale pentru supraviețuitorii violenței sexuale',
      ar: 'جلسات فردية سرية للناجين من العنف الجنسي',
      sy: 'ܦܓܫ̈ܐ ܦܪܨܘܦܝ̈ܐ ܣܘܬܪܝ̈ܐ ܠܕܚܫܝ ܛܠܘܡܝܐ ܓܢܣܝܐ',
      fr: 'Séances individuelles confidentielles pour les survivants de violence sexuelle',
      nl: 'Vertrouwelijke individuele gesprekken voor slachtoffers van seksueel geweld',
      tr: 'Cinsel şiddet mağdurları için gizli bireysel görüşmeler'
    },
    icon: 'heart',
    priority: 1,
    isEmergency: false
  },
  {
    id: 'crisis-intervention',
    name: {
      de: 'Krisenintervention',
      en: 'Crisis Intervention',
      pl: 'Interwencja kryzysowa',
      uk: 'Кризова інтервенція',
      ru: 'Кризисная интервенция',
      ro: 'Intervenție în criză',
      ar: 'التدخل في الأزمات',
      sy: 'ܦܘܪܩܢܐ ܒܥܕܢܐ ܕܟܪܝܣܝܣ',
      fr: 'Intervention de crise',
      nl: 'Crisisinterventie',
      tr: 'Kriz müdahalesi'
    },
    description: {
      de: 'Sofortige Unterstützung in akuten Krisensituationen',
      en: 'Immediate support in acute crisis situations',
      pl: 'Natychmiastowe wsparcie w ostrych sytuacjach kryzysowych',
      uk: 'Негайна підтримка в гострих кризових ситуаціях',
      ru: 'Немедленная поддержка в острых кризисных ситуациях',
      ro: 'Sprijin imediat în situații de criză acută',
      ar: 'الدعم الفوري في حالات الأزمات الحادة',
      sy: 'ܣܡܟܐ ܥܓܠܐ ܒܥܕܢ̈ܐ ܕܟܪܝܣܝܣ ܚܪܝܦܐ',
      fr: 'Soutien immédiat dans les situations de crise aiguë',
      nl: 'Onmiddellijke ondersteuning in acute crisissituaties',
      tr: 'Akut kriz durumlarında acil destek'
    },
    icon: 'shield',
    priority: 1,
    isEmergency: true
  },
  {
    id: 'group-therapy',
    name: {
      de: 'Gruppenangebote',
      en: 'Group Therapy',
      pl: 'Terapia grupowa',
      uk: 'Групова терапія',
      ru: 'Групповая терапия',
      ro: 'Terapie de grup',
      ar: 'العلاج الجماعي',
      sy: 'ܐܣܝܘܬܐ ܕܓܘܕܐ',
      fr: 'Thérapie de groupe',
      nl: 'Groepstherapie',
      tr: 'Grup terapisi'
    },
    description: {
      de: 'Angeleitete Gruppen zum Austausch und zur gegenseitigen Unterstützung',
      en: 'Facilitated groups for sharing and mutual support',
      pl: 'Prowadzone grupy do dzielenia się i wzajemnego wsparcia',
      uk: 'Керовані групи для обміну досвідом та взаємної підтримки',
      ru: 'Группы под руководством для обмена опытом и взаимной поддержки',
      ro: 'Grupuri facilitate pentru schimb de experiențe și sprijin reciproc',
      ar: 'مجموعات ميسرة للمشاركة والدعم المتبادل',
      sy: 'ܓܘܕ̈ܐ ܡܕܒܪ̈ܢܐ ܠܫܘܬܦܘܬܐ ܘܣܡܟܐ ܗܕܕܝܐ',
      fr: 'Groupes facilités pour le partage et le soutien mutuel',
      nl: 'Begeleide groepen voor delen en wederzijdse steun',
      tr: 'Paylaşım ve karşılıklı destek için kolaylaştırılmış gruplar'
    },
    icon: 'users',
    priority: 2,
    isEmergency: false
  },
  {
    id: 'prevention',
    name: {
      de: 'Prävention & Fortbildung',
      en: 'Prevention & Training',
      pl: 'Prewencja i szkolenia',
      uk: 'Профілактика та навчання',
      ru: 'Профилактика и обучение',
      ro: 'Prevenire și formare',
      ar: 'الوقاية والتدريب',
      sy: 'ܢܛܘܪܬܐ ܘܝܘܠܦܢܐ',
      fr: 'Prévention et formation',
      nl: 'Preventie en training',
      tr: 'Önleme ve eğitim'
    },
    description: {
      de: 'Schulungen und Workshops für Fachkräfte und Interessierte',
      en: 'Training and workshops for professionals and interested parties',
      pl: 'Szkolenia i warsztaty dla profesjonalistów i zainteresowanych',
      uk: 'Тренінги та семінари для професіоналів та зацікавлених осіб',
      ru: 'Тренинги и семинары для профессионалов и заинтересованных лиц',
      ro: 'Instruire și ateliere pentru profesioniști și persoane interesate',
      ar: 'التدريب وورش العمل للمهنيين والأطراف المهتمة',
      sy: 'ܝܘܠܦܢܐ ܘܒܝܬ ܦܘܠܚܢܐ ܠܡܗܝܪ̈ܐ ܘܠܐܝܠܝܢ ܕܒܥܝܢ',
      fr: 'Formation et ateliers pour professionnels et personnes intéressées',
      nl: 'Training en workshops voor professionals en geïnteresseerden',
      tr: 'Profesyoneller ve ilgililer için eğitim ve atölye çalışmaları'
    },
    icon: 'book',
    priority: 3,
    isEmergency: false
  }
];