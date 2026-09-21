'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightBurstThemes, DEFAULT_THEME_INDEX } from '@/lib/content/light-burst-themes';

interface SiteThemeContextValue {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
}

const SiteThemeContext = createContext<SiteThemeContextValue | null>(null);

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(DEFAULT_THEME_INDEX);

  useEffect(() => {
    document.documentElement.setAttribute('data-site-theme', lightBurstThemes[themeIndex].key);
  }, [themeIndex]);

  return (
    <SiteThemeContext.Provider value={{ themeIndex, setThemeIndex }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) throw new Error('useSiteTheme must be used within SiteThemeProvider');
  return ctx;
}
