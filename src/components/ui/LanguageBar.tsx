'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const FONT_SCALE_STEPS = ['85', '92.5', '100', '107.5', '115'];
const DEFAULT_STEP_INDEX = 2;

const TRACK_CLASSES =
  'flex items-center gap-1 rounded-sm bg-[var(--color-bg-primary,#0A0A0A)] p-1';

// Outer wrapper is the real tap target — always transparent, regardless of
// active state, so its 44x44 box never visibly paints. Only the inner pill
// (sized to the compact track) shows on screen.
const OUTER_CLASSES = 'group min-h-[44px] min-w-[44px] flex items-center justify-center bg-transparent';

const INNER_BASE = 'flex items-center justify-center rounded-sm px-2 py-1 transition-colors';

const INNER_ACTIVE = cn(INNER_BASE, 'bg-accent text-bg-primary font-semibold');
const INNER_INACTIVE = cn(INNER_BASE, 'bg-transparent text-text-muted group-hover:text-text-secondary');
const INNER_DISABLED = cn(INNER_BASE, 'bg-transparent text-text-muted/40');

export function LanguageBar() {
  const { i18n } = useTranslation();
  const [scaleIndex, setScaleIndex] = useState(DEFAULT_STEP_INDEX);

  useEffect(() => {
    const step = FONT_SCALE_STEPS[scaleIndex];
    if (step === '100') {
      document.documentElement.removeAttribute('data-font-scale');
    } else {
      document.documentElement.setAttribute('data-font-scale', step);
    }
  }, [scaleIndex]);

  const decrease = () => setScaleIndex((i) => Math.max(0, i - 1));
  const increase = () => setScaleIndex((i) => Math.min(FONT_SCALE_STEPS.length - 1, i + 1));
  const reset = () => setScaleIndex(DEFAULT_STEP_INDEX);

  const isMin = scaleIndex === 0;
  const isMax = scaleIndex === FONT_SCALE_STEPS.length - 1;
  const isAtDefault = scaleIndex === DEFAULT_STEP_INDEX;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-8 flex items-center justify-center gap-4 bg-[var(--color-bg-elevated,#1C1C1C)] border-b border-border text-xs shadow-[var(--shadow-card,0_4px_24px_rgba(0,0,0,0.4))]">
      {/* Font-size track */}
      <div className={TRACK_CLASSES}>
        <button
          type="button"
          onClick={decrease}
          disabled={isMin}
          className={cn(OUTER_CLASSES, isMin && 'cursor-not-allowed')}
          aria-label="Decrease font size"
        >
          <span className={cn(isMin ? INNER_DISABLED : INNER_INACTIVE, 'text-[10px]')}>A-</span>
        </button>
        <button
          type="button"
          onClick={reset}
          className={OUTER_CLASSES}
          aria-label="Reset font size to normal"
        >
          <span className={cn(isAtDefault ? INNER_ACTIVE : INNER_INACTIVE, 'text-xs')}>A</span>
        </button>
        <button
          type="button"
          onClick={increase}
          disabled={isMax}
          className={cn(OUTER_CLASSES, isMax && 'cursor-not-allowed')}
          aria-label="Increase font size"
        >
          <span className={cn(isMax ? INNER_DISABLED : INNER_INACTIVE, 'text-sm')}>A+</span>
        </button>
      </div>

      {/* Language track */}
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
          <span className={i18n.language === 'hi' ? INNER_ACTIVE : INNER_INACTIVE}>Hindi</span>
        </button>
      </div>
    </div>
  );
}
