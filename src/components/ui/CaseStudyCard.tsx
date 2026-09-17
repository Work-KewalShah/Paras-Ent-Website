'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CaseStudy } from '@/types/content';

export interface CaseStudyCardProps {
  study: CaseStudy;
  className?: string;
}

export const CaseStudyCard = ({ study, className }: CaseStudyCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className={cn('overflow-hidden flex flex-col h-full', className)}>
      {/* Image — plain, well-cropped, no lightbox per Session 04 decision */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg mb-4">
        <div className="h-full w-full overflow-hidden">
          <Image
            src={`/images/${study.image}`}
            alt={study.clientName}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-h2 uppercase tracking-tight text-[var(--color-accent,#00E599)] mb-3">
          {study.clientName}
        </h3>

        <div className="space-y-3 text-text-secondary text-small leading-relaxed">
          <div>
            <strong className="text-text-primary font-medium">Pain Point:</strong>{' '}
            {study.painPoint}
          </div>
          <div>
            <strong className="text-text-primary font-medium">Our Solution:</strong>{' '}
            {study.solution}
          </div>
          <div>
            <strong className="text-text-primary font-medium">Results:</strong>{' '}
            {study.result}
          </div>
        </div>

        <blockquote className="mt-4 pt-4 border-t border-[var(--color-border-subtle,#1a1a1a)] text-text-primary text-small italic leading-relaxed">
          “{study.testimonial}”
          <cite className="block mt-2 not-italic text-text-muted text-xs">— {study.testimonialAuthor}</cite>
        </blockquote>
      </div>
    </Card>
  );
};
