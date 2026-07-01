'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from '@/lib/i18n';
import { t as translate } from '@/lib/i18n';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'th',
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('th');

  useEffect(() => {
    const saved = localStorage.getItem('sivili_locale') as Locale | null;
    if (saved && ['th', 'en', 'zh', 'ja', 'la'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('sivili_locale', newLocale);
  };

  const t = (key: string) => translate(locale, key);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
