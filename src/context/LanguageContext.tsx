import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, LanguageOption, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'miiro_app_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === 'en' || saved === 'de' || saved === 'es' || saved === 'fr')) {
        return saved;
      }
      // If browser language starts with de, es, fr
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === 'de' || browserLang === 'es' || browserLang === 'fr') {
        return browserLang as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentLanguageOption =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
