'use client';

import React from 'react';
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect && !shouldReduceMotion
            ? {
                y: -5,
                scale: 1.02,
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              }
            : undefined
        }
        className={cn(
          'relative rounded-lg border border-[var(--color-border,#2A2A2A)] bg-[var(--color-bg-secondary,#141414)] p-6 shadow-[var(--shadow-card,0_4px_24px_rgba(0,0,0,0.4))] transition-colors duration-250',
          hoverEffect && 'hover:border-[var(--color-border-accent,rgba(45,212,232,0.4))] hover:shadow-[var(--glow-accent,0_0_24px_rgba(45,212,232,0.25))]',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
