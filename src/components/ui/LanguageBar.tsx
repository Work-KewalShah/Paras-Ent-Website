'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function LanguageBar() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-8 flex items-center justify-center gap-2 bg-[var(--color-bg-elevated,#1C1C1C)] border-b border-border text-xs">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors',
          i18n.language === 'en' ? 'text-accent font-semibold' : 'text-text-muted hover:text-text-secondary'
        )}
      >
        English
      </button>
      <span className="text-text-muted" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('hi')}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors',
          i18n.language === 'hi' ? 'text-accent font-semibold' : 'text-text-muted hover:text-text-secondary'
        )}
      >
        Hindi
      </button>
    </div>
  );
}
