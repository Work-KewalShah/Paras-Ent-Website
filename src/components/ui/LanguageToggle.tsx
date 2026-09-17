'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'min-h-[44px] min-w-[44px] flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors text-small font-medium',
        className
      )}
      aria-label="Toggle language"
    >
      EN / हिं
    </button>
  );
}
