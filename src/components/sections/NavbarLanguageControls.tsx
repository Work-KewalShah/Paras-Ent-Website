'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useFontScale } from '@/components/providers/FontScaleProvider';

const TRACK_CLASSES =
  'flex items-center justify-center gap-1 rounded-sm bg-[var(--color-bg-primary,#0A0A0A)] p-0.5';

// Compact desktop-only equivalent of LanguageBar's 44x44 tap-target overlay.
// -6px inset + gap-1.5 (6px) between the two stacked tracks means each
// overlay reaches exactly to the midpoint of that gap, never overlapping
// the neighboring track's hit zone.
const OUTER_CLASSES =
  "group relative flex items-center justify-center bg-transparent after:content-[''] after:absolute after:inset-[-6px]";

// Font-scale buttons only ("A-"/"A"/"A+") get a fixed equal width so the
// group's visual center (the "A" pill) lands at the row's true midpoint —
// their natural content widths differ enough (A+ is ~46% wider than A) that
// centering the group's bounding box alone still looks lopsided. Not applied
// to the language track: "English"/"Hindi" need their own natural width.
const FONT_BUTTON_CLASSES = cn(OUTER_CLASSES, 'w-8');

const INNER_BASE = 'flex items-center justify-center rounded-sm px-1.5 py-0.5 text-xs transition-colors';

const INNER_ACTIVE = cn(INNER_BASE, 'bg-accent text-bg-primary font-semibold');
const INNER_INACTIVE = cn(INNER_BASE, 'bg-transparent text-text-muted group-hover:text-text-secondary');
const INNER_DISABLED = cn(INNER_BASE, 'bg-transparent text-text-muted/40');

export function NavbarLanguageControls() {
  const { i18n } = useTranslation();
  const { isMin, isMax, isAtDefault, decrease, increase, reset } = useFontScale();

  return (
    <div className="hidden lg:flex flex-col gap-1.5">
      {/* Language track (top) */}
      <div className={TRACK_CLASSES}>
        <button type="button" onClick={() => i18n.changeLanguage('en')} className={OUTER_CLASSES}>
          <span className={i18n.language === 'en' ? INNER_ACTIVE : INNER_INACTIVE}>English</span>
        </button>
        <button type="button" onClick={() => i18n.changeLanguage('hi')} className={OUTER_CLASSES}>
          <span className={i18n.language === 'hi' ? INNER_ACTIVE : INNER_INACTIVE}>Hindi</span>
        </button>
      </div>

      {/* Font-size track (bottom) */}
      <div className={TRACK_CLASSES}>
        <button
          type="button"
          onClick={decrease}
          disabled={isMin}
          className={cn(FONT_BUTTON_CLASSES, isMin && 'cursor-not-allowed')}
          aria-label="Decrease font size"
        >
          <span className={cn(isMin ? INNER_DISABLED : INNER_INACTIVE, 'text-[10px]')}>A-</span>
        </button>
        <button type="button" onClick={reset} className={FONT_BUTTON_CLASSES} aria-label="Reset font size to normal">
          <span className={isAtDefault ? INNER_ACTIVE : INNER_INACTIVE}>A</span>
        </button>
        <button
          type="button"
          onClick={increase}
          disabled={isMax}
          className={cn(FONT_BUTTON_CLASSES, isMax && 'cursor-not-allowed')}
          aria-label="Increase font size"
        >
          <span className={cn(isMax ? INNER_DISABLED : INNER_INACTIVE, 'text-sm')}>A+</span>
        </button>
      </div>
    </div>
  );
}

export default NavbarLanguageControls;
