'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyLangAttributes = (lng: string) => {
      document.documentElement.setAttribute('lang', lng);
      document.documentElement.setAttribute('data-lang', lng);
    };

    applyLangAttributes(i18n.language);
    i18n.on('languageChanged', applyLangAttributes);

    return () => {
      i18n.off('languageChanged', applyLangAttributes);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
