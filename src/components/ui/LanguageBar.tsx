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
    <div className="fixed top-0 left-0 right-0 z-[70] h-8 flex items-center justify-center gap-4 bg-[var(--color-bg-elevated,#1C1C1C)] border-b border-border text-xs shadow-[var(--shadow-card,0_4px_24px_rgba(0,0,0,0.4))]">
      {/* Font-size controls */}
      <button
        type="button"
        onClick={decrease}
        disabled={isMin}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center text-[10px] rounded-radius-sm border border-transparent transition-colors',
          isMin
            ? 'text-text-muted/40 cursor-not-allowed'
            : 'text-text-muted hover:text-text-secondary hover:bg-[var(--color-border,#2A2A2A)] hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
        )}
        aria-label="Decrease font size"
      >
        A-
      </button>
      <button
        type="button"
        onClick={reset}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs rounded-radius-sm border border-transparent text-text-secondary hover:text-text-primary hover:bg-[var(--color-border,#2A2A2A)] hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))] transition-colors"
        aria-label="Reset font size to normal"
      >
        A
      </button>
      <button
        type="button"
        onClick={increase}
        disabled={isMax}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center text-sm rounded-radius-sm border border-transparent transition-colors',
          isMax
            ? 'text-text-muted/40 cursor-not-allowed'
            : 'text-text-muted hover:text-text-secondary hover:bg-[var(--color-border,#2A2A2A)] hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
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
          'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-sm border transition-colors',
          i18n.language === 'en'
            ? 'text-accent font-semibold bg-accent/15 border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
            : 'text-text-muted border-transparent hover:text-text-secondary hover:bg-[var(--color-border,#2A2A2A)] hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
        )}
      >
        English
      </button>
      <span className="text-text-muted" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('hi')}
        className={cn(
          'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-sm border transition-colors',
          i18n.language === 'hi'
            ? 'text-accent font-semibold bg-accent/15 border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
            : 'text-text-muted border-transparent hover:text-text-secondary hover:bg-[var(--color-border,#2A2A2A)] hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))]'
        )}
      >
        Hindi
      </button>
    </div>
  );
}
