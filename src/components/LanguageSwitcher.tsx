import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, TRANSLATIONS, Translations, LANGUAGES } from '../services/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  currentFont: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = TRANSLATIONS[language];
  const currentFont = LANGUAGES.find(l => l.code === language)?.font || 'font-sans';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentFont }}>
      <div className={currentFont}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="w-full bg-slate-900 border-b border-white/10 py-3 overflow-x-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as LanguageCode)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              language === lang.code 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            } ${lang.font}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};
