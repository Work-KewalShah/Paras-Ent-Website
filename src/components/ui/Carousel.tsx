'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CarouselSlide {
  id: string;
  label: string;
  backgroundClass?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  intervalMs?: number;
  transitionDurationMs?: number;
  easing?: [number, number, number, number];
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  intervalMs = 4000,
  transitionDurationMs = 600,
  easing = [0.16, 1, 0.3, 1],
  ariaLabel = 'Hero image carousel',
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartRef = useRef<number>(0);
  const fillAnimationRef = useRef<Animation | null>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerStartRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (!hovering) {
        timerStartRef.current = Date.now();
        nextSlide();
      }
    }, intervalMs);
  }, [hovering, nextSlide, intervalMs]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    setHovering(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    startTimer();
  };

  const handleDotClick = (index: number) => {
    goToSlide(index);
    setHovering(false);
    startTimer();
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative overflow-hidden rounded-radius-lg"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slide container */}
      <div className="relative w-full h-full aspect-[4/3] lg:aspect-square">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.02 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0, scale: 1 }
                : { opacity: 0, scale: 1.02 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : transitionDurationMs / 1000,
              ease: shouldReduceMotion ? 'easeOut' : easing,
            }}
            className={cn(
              'absolute inset-0 w-full h-full',
              currentSlide.backgroundClass || 'bg-gradient-to-br from-bg-elevated to-bg-secondary'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-text-muted text-body font-display tracking-widest uppercase">
                {currentSlide.label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 z-20"
        role="tablist"
        aria-label={t('carousel.dotsAriaLabel')}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              ref={(el) => {
                dotRefs.current[index] = el;
              }}
              onClick={() => handleDotClick(index)}
              className={cn(
                'relative w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent,#00E599)] transition-colors',
                isActive ? 'bg-transparent' : 'bg-transparent'
              )}
              aria-label={t('carousel.goToSlideAriaLabel', { number: index + 1 })}
              aria-selected={isActive}
              role="tab"
            >
              {/* Always-visible outline ring */}
              <span className="absolute inset-0 rounded-full border-2 border-[var(--color-accent,#00E599)]" />
              {/* Active: solid inner fill; inactive: none */}
              {isActive && (
                <span className="absolute inset-[2px] rounded-full bg-[var(--color-accent,#00E599)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
