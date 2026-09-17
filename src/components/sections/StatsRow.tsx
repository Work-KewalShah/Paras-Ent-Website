'use client';

import React, { useEffect } from 'react';
import { motion, useInView, useMotionValue, animate, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatData {
  value: string;
  label: string;
}

interface AnimatedStatProps {
  stat: StatData;
}

const AnimatedStat = ({ stat }: AnimatedStatProps) => {
  const motionVal = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  // Parse numeric target
  const numMatch = stat.value.match(/^([0-9,]+)([^0-9,]*)$/);
  const targetNum = numMatch ? parseInt(numMatch[1].replace(/,/g, ''), 10) : parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = numMatch ? numMatch[2] : '';

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    if (!shouldReduceMotion) {
      animate(motionVal, targetNum, { duration: 1.6, ease: 'easeOut' });
    } else {
      motionVal.set(targetNum);
    }
  }, [inView, shouldReduceMotion, motionVal, targetNum]);

  const formatted = useTransform(motionVal, (v) =>
    v.toLocaleString(undefined, { minimumFractionDigits: 0 }) + suffix
  );

  const progress = useTransform(motionVal, [0, targetNum || 1], [0, 1]);

  return (
    <div ref={containerRef} className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center w-full pt-4">
        <span className="text-[var(--color-accent,#00E599)] font-display text-4xl md:text-5xl">
          <motion.span>{formatted}</motion.span>
        </span>
        <div className="w-24 h-0.5 bg-[var(--color-accent,#00E599)]/20 rounded mt-3 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-accent,#00E599)] rounded"
            style={{ width: progress }}
          />
        </div>
      </div>
      <p className="text-text-secondary text-small">{stat.label}</p>
    </div>
  );
};

interface StatsRowProps {
  stats: StatData[];
}

export const StatsRow = ({ stats }: StatsRowProps) => {
  return (
    <div className="py-12 grid gap-6 grid-cols-3">
      {stats.map((stat, index) => (
        <AnimatedStat key={index} stat={stat} />
      ))}
    </div>
  );
};
