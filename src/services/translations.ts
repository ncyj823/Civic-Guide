export type LanguageCode = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'pa';

export interface Translations {
  appTitle: string;
  tabTimeline: string;
  tabHowItWorks: string;
  tabAskAnything: string;
  tabGlossary: string;
  tabQuiz: string;
  boothPlaceholder: string;
  registrationCTA: string;
  welcomeMsg1: string;
  welcomeMsg2: string;
  eciFooter: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appTitle: "CivicGuide",
    tabTimeline: "Timeline",
    tabHowItWorks: "How it works",
    tabAskAnything: "Ask anything",
    tabGlossary: "Glossary",
    tabQuiz: "Quiz",
    boothPlaceholder: "Enter 6-digit Pincode",
    registrationCTA: "Register to Vote",
    welcomeMsg1: "Empowering every citizen with electoral literacy.",
    welcomeMsg2: "Your non-partisan companion for navigating democracy.",
    eciFooter: "Content powered by Election Commission of India (ECI)"
  },
  hi: {
    appTitle: "सिविक गाइड",
    tabTimeline: "समयरेखा",
    tabHowItWorks: "यह कैसे काम करता है",
    tabAskAnything: "कुछ भी पूछें",
    tabGlossary: "शब्दावली",
    tabQuiz: "प्रश्नोत्तरी",
    boothPlaceholder: "6-अंकों का पिनकोड दर्ज करें",
    registrationCTA: "वोट के लिए पंजीकरण करें",
    welcomeMsg1: "हर नागरिक को चुनावी साक्षरता के साथ सशक्त बनाना।",
    welcomeMsg2: "लोकतंत्र को नेविगेट करने के लिए आपका गैर-पक्षपाती साथी।",
    eciFooter: "भारत निर्वाचन आयोग (ECI) द्वारा संचालित सामग्री"
  },
  bn: {
    appTitle: "সিভিক গাইড",
    tabTimeline: "টাইমলাইন",
    tabHowItWorks: "কিভাবে এটা কাজ করে",
    tabAskAnything: "যেকোনো কিছু জিজ্ঞাসা করুন",
    tabGlossary: "শব্দকোষ",
    tabQuiz: "কুইজ",
    boothPlaceholder: "৬-সংখ্যার পিনকোড দিন",
    registrationCTA: "ভোটের জন্য নিবন্ধন করুন",
    welcomeMsg1: "প্রতিটি নাগরিককে নির্বাচনী সাক্ষরতার সাথে ক্ষমতায়িত করা।",
    welcomeMsg2: "গণতন্ত্র পরিচালনার জন্য আপনার নির্দলীয় সঙ্গী।",
    eciFooter: "ভারতের নির্বাচন কমিশন (ECI) দ্বারা চালিত কন্টেন্ট"
  },
  te: {
    appTitle: "సివిక్ గైడ్",
    tabTimeline: "కాలక్రమం",
    tabHowItWorks: "ఇది ఎలా పనిచేస్తుంది",
    tabAskAnything: "ఏదైనా అడగండి",
    tabGlossary: "పదకోశం",
    tabQuiz: "క్విజ్",
    boothPlaceholder: "6-అంకెల పిన్‌కోడ్‌ను నమోదు చేయండి",
    registrationCTA: "ఓటు కోసం నమోదు చేసుకోండి",
    welcomeMsg1: "ప్రతి పౌరుడిని ఎన్నికల అక్షరాస్యతతో శక్తివంతం చేయడం.",
    welcomeMsg2: "ప్రజాస్వామ్యాన్ని నావిగేట్ చేయడానికి మీ నిష్పక్షపాత సహచరుడు.",
    eciFooter: "భారత ఎన్నికల సంఘం (ECI) ద్వారా అందించబడిన కంటెంట్"
  },
  mr: {
    appTitle: "सिव्हिक गाईड",
    tabTimeline: "वेळापत्रक",
    tabHowItWorks: "हे कसे कार्य करते",
    tabAskAnything: "काहीही विचारा",
    tabGlossary: "शब्दकोश",
    tabQuiz: "चाचणी",
    boothPlaceholder: "६-अंकी पिनकोड प्रविष्ट करा",
    registrationCTA: "मतदानासाठी नोंदणी करा",
    welcomeMsg1: "प्रत्येक नागरिकाला निवडणूक साक्षरतेने सक्षम करणे।",
    welcomeMsg2: "लोकशाही नेव्हिगेट करण्यासाठी आपला निपक्षपाती सोबती।",
    eciFooter: "भारतीय निवडणूक आयोग (ECI) द्वारे समर्थित सामग्री"
  },
  ta: {
    appTitle: "சிவிக் கைடு",
    tabTimeline: "காலவரிசை",
    tabHowItWorks: "இது எப்படி இயங்குகிறது",
    tabAskAnything: "எதுவும் கேளுங்கள்",
    tabGlossary: "சொற்களஞ்சியம்",
    tabQuiz: "வினாடி வினா",
    boothPlaceholder: "6 இலக்க பின்கோடை உள்ளிடவும்",
    registrationCTA: "வாக்களிக்க பதிவு செய்யுங்கள்",
    welcomeMsg1: "தேர்தல் அறிவாற்றல் மூலம் ஒவ்வொரு குடிமகனையும் மேம்படுத்துதல்.",
    welcomeMsg2: "ஜனநாயகத்தை வழிநடத்த உங்கள் கட்சி சார்பற்ற துணை.",
    eciFooter: "இந்திய தேர்தல் ஆணையத்தால் (ECI) வழங்கப்பட்ட உள்ளடக்கம்"
  },
  gu: {
    appTitle: "સિવિક ગાઇડ",
    tabTimeline: "સમયરેખા",
    tabHowItWorks: "તે કેવી રીતે કાર્ય કરે છે",
    tabAskAnything: "કંઈ પણ પૂછો",
    tabGlossary: "શબ્દાવલી",
    tabQuiz: "ક્વિઝ",
    boothPlaceholder: "6-અંકનો પિનકોડ દાખલ કરો",
    registrationCTA: "વોટ માટે નોંધણી કરો",
    welcomeMsg1: "દરેક નાગરિકને ચૂંટણી સાક્ષરતા સાથે સશક્ત બનાવવું.",
    welcomeMsg2: "લોકશાહીને નેવિગેટ કરવા માટે તમારો બિન-પક્ષપાતી સાથી.",
    eciFooter: "ભારતના ચૂંટણી પંચ (ECI) દ્વારા સંચાલિત સામગ્રી"
  },
  pa: {
    appTitle: "ਸਿਵਿਕ ਗਾਈਡ",
    tabTimeline: "ਸਮਾਂਰੇਖਾ",
    tabHowItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    tabAskAnything: "ਕੁਝ ਵੀ ਪੁੱਛੋ",
    tabGlossary: "ਸ਼ਬਦਾਵਲੀ",
    tabQuiz: "ਕੁਇਜ਼",
    boothPlaceholder: "6-ਅੰਕਾਂ ਦਾ ਪਿਨਕੋਡ ਦਰਜ ਕਰੋ",
    registrationCTA: "ਵੋਟ ਲਈ ਰਜਿਸਟਰ ਕਰੋ",
    welcomeMsg1: "ਹਰ ਨਾਗਰਿਕ ਨੂੰ ਚੋਣ ਸਾਖਰਤਾ ਨਾਲ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ।",
    welcomeMsg2: "ਲੋਕਤੰਤਰ ਨੂੰ ਨੇਵੀਗੇਟ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਗੈਰ-ਪੱਖਪਾਤੀ ਸਾਥੀ।",
    eciFooter: "ਭਾਰਤੀ ਚੋਣ ਕਮਿਸ਼ਨ (ECI) ਦੁਆਰਾ ਸੰਚਾਲਿਤ ਸਮੱਗਰੀ"
  }
};

export const LANGUAGES = [
  { code: 'en', label: 'English', font: 'font-sans' },
  { code: 'hi', label: 'हिंदी', font: 'font-["Noto_Sans_Devanagari"]' },
  { code: 'bn', label: 'বাংলা', font: 'font-["Noto_Sans_Bengali"]' },
  { code: 'te', label: 'తెలుగు', font: 'font-["Noto_Sans_Telugu"]' },
  { code: 'mr', label: 'मराठी', font: 'font-["Noto_Sans_Devanagari"]' },
  { code: 'ta', label: 'தமிழ்', font: 'font-["Noto_Sans_Tamil"]' },
  { code: 'gu', label: 'ગુજરાતી', font: 'font-["Noto_Sans_Gujarati"]' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', font: 'font-["Noto_Sans_Gurmukhi"]' }
];
