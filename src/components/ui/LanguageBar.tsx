'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const FONT_SCALE_STEPS = ['85', '92.5', '100', '107.5', '115'];
const DEFAULT_STEP_INDEX = 2;

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

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-8 flex items-center justify-center gap-2 bg-[var(--color-bg-elevated,#1C1C1C)] border-b border-border text-xs">
      {/* Font-size controls */}
      <button
        type="button"
        onClick={decrease}
        disabled={isMin}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center text-[10px] transition-colors',
          isMin ? 'text-text-muted/40 cursor-not-allowed' : 'text-text-muted hover:text-text-secondary'
        )}
        aria-label="Decrease font size"
      >
        A-
      </button>
      <button
        type="button"
        onClick={reset}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Reset font size to normal"
      >
        A
      </button>
      <button
        type="button"
        onClick={increase}
        disabled={isMax}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center text-sm transition-colors',
          isMax ? 'text-text-muted/40 cursor-not-allowed' : 'text-text-muted hover:text-text-secondary'
        )}
        aria-label="Increase font size"
      >
        A+
      </button>

      <span className="text-text-muted" aria-hidden="true">|</span>

      {/* Language controls */}
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
