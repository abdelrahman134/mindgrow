import { useState, useEffect, ReactNode } from 'react';
import { LanguageContext, Language, translations } from '@/lib/i18n';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('ar');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('mindgrow-language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage and update document direction
  useEffect(() => {
    localStorage.setItem('mindgrow-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language as 'ar' | 'en'][key as keyof typeof translations['ar']] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    dir: language === 'ar' ? 'rtl' as const : 'ltr' as const,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};