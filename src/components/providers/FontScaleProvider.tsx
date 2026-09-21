'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const FONT_SCALE_STEPS = ['85', '92.5', '100', '107.5', '115'];
const DEFAULT_STEP_INDEX = 2;

interface FontScaleContextValue {
  isMin: boolean;
  isMax: boolean;
  isAtDefault: boolean;
  decrease: () => void;
  increase: () => void;
  reset: () => void;
}

const FontScaleContext = createContext<FontScaleContextValue | null>(null);

export function FontScaleProvider({ children }: { children: React.ReactNode }) {
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

  const value: FontScaleContextValue = {
    isMin: scaleIndex === 0,
    isMax: scaleIndex === FONT_SCALE_STEPS.length - 1,
    isAtDefault: scaleIndex === DEFAULT_STEP_INDEX,
    decrease,
    increase,
    reset,
  };

  return <FontScaleContext.Provider value={value}>{children}</FontScaleContext.Provider>;
}

export function useFontScale() {
  const ctx = useContext(FontScaleContext);
  if (!ctx) throw new Error('useFontScale must be used within FontScaleProvider');
  return ctx;
}
