'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const FONT_SCALE_STEPS = ['85', '92.5', '100', '107.5', '115'];
const DEFAULT_STEP_INDEX = 2;

const TRACK_CLASSES =
  'flex items-center gap-1 rounded-radius-sm bg-[var(--color-bg-secondary,#141414)] p-1';

const INACTIVE_BUTTON_CLASSES =
  'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-sm bg-transparent text-text-muted hover:text-text-secondary transition-colors';

const ACTIVE_BUTTON_CLASSES =
  'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-sm bg-accent text-bg-primary font-semibold transition-colors';

const DISABLED_BUTTON_CLASSES =
  'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-radius-sm bg-transparent text-text-muted/40 cursor-not-allowed';

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
          className={cn(isMin ? DISABLED_BUTTON_CLASSES : INACTIVE_BUTTON_CLASSES, 'text-[10px]')}
          aria-label="Decrease font size"
        >
          A-
        </button>
        <button
          type="button"
          onClick={reset}
          className={cn(isAtDefault ? ACTIVE_BUTTON_CLASSES : INACTIVE_BUTTON_CLASSES, 'text-xs')}
          aria-label="Reset font size to normal"
        >
          A
        </button>
        <button
          type="button"
          onClick={increase}
          disabled={isMax}
          className={cn(isMax ? DISABLED_BUTTON_CLASSES : INACTIVE_BUTTON_CLASSES, 'text-sm')}
          aria-label="Increase font size"
        >
          A+
        </button>
      </div>

      {/* Language track */}
      <div className={TRACK_CLASSES}>
        <button
          type="button"
          onClick={() => i18n.changeLanguage('en')}
          className={i18n.language === 'en' ? ACTIVE_BUTTON_CLASSES : INACTIVE_BUTTON_CLASSES}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => i18n.changeLanguage('hi')}
          className={i18n.language === 'hi' ? ACTIVE_BUTTON_CLASSES : INACTIVE_BUTTON_CLASSES}
        >
          Hindi
        </button>
      </div>
    </div>
  );
}
