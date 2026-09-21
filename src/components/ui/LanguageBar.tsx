'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useFontScale } from '@/components/providers/FontScaleProvider';

const TRACK_CLASSES =
  'flex items-center gap-1 rounded-sm bg-[var(--color-bg-primary,#0A0A0A)] p-1';

// Outer wrapper sizes naturally to its content (the small visible pill) so
// it never forces the bar's own h-8 (32px) track taller. The real 44x44 tap
// target is an absolutely-positioned ::after overlay — out of normal flow
// entirely, so it extends the clickable area without affecting layout
// height anywhere. inset-[-12px] is calculated from the smallest rendered
// pill (A-, ~27x21px) so every button reaches at least 44x44.
const OUTER_CLASSES =
  "group relative flex items-center justify-center bg-transparent after:content-[''] after:absolute after:inset-[-12px]";

const INNER_BASE = 'flex items-center justify-center rounded-sm px-2 py-1 transition-colors';

const INNER_ACTIVE = cn(INNER_BASE, 'bg-accent text-bg-primary font-semibold');
const INNER_INACTIVE = cn(INNER_BASE, 'bg-transparent text-text-muted group-hover:text-text-secondary');
const INNER_DISABLED = cn(INNER_BASE, 'bg-transparent text-text-muted/40');

export function LanguageBar() {
  const { t, i18n } = useTranslation();
  const { isMin, isMax, isAtDefault, decrease, increase, reset } = useFontScale();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-[70] h-8 flex items-center justify-center gap-4 bg-[var(--color-bg-primary,#0A0A0A)] border-b border-border text-xs">
      {/* Font-size track */}
      <div className={TRACK_CLASSES}>
        <button
          type="button"
          onClick={decrease}
          disabled={isMin}
          className={cn(OUTER_CLASSES, isMin && 'cursor-not-allowed')}
          aria-label={t('languageBar.decreaseAriaLabel')}
        >
          <span className={cn(isMin ? INNER_DISABLED : INNER_INACTIVE, 'text-[10px]')}>A-</span>
        </button>
        <button
          type="button"
          onClick={reset}
          className={OUTER_CLASSES}
          aria-label={t('languageBar.resetAriaLabel')}
        >
          <span className={cn(isAtDefault ? INNER_ACTIVE : INNER_INACTIVE, 'text-xs')}>A</span>
        </button>
        <button
          type="button"
          onClick={increase}
          disabled={isMax}
          className={cn(OUTER_CLASSES, isMax && 'cursor-not-allowed')}
          aria-label={t('languageBar.increaseAriaLabel')}
        >
          <span className={cn(isMax ? INNER_DISABLED : INNER_INACTIVE, 'text-sm')}>A+</span>
        </button>
      </div>

      {/* Language track — each language's own native name, regardless of
          current UI language (standard language-switcher convention). */}
      <div className={TRACK_CLASSES}>
        <button
          type="button"
          onClick={() => i18n.changeLanguage('en')}
          className={OUTER_CLASSES}
        >
          <span className={i18n.language === 'en' ? INNER_ACTIVE : INNER_INACTIVE}>English</span>
        </button>
        <button
          type="button"
          onClick={() => i18n.changeLanguage('hi')}
          className={OUTER_CLASSES}
        >
          <span className={i18n.language === 'hi' ? INNER_ACTIVE : INNER_INACTIVE}>हिन्दी</span>
        </button>
      </div>
    </div>
  );
}
