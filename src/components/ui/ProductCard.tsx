'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from './Card';
import { ImageModal } from './ImageModal';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface ProductCardProps {
  title: string;
  tagline: string;
  features: string[];
  useCases?: string[];
  image: string;
  className?: string;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ title, tagline, features, useCases, image, className }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      // Return focus to triggering card button after close
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    }, []);

    return (
      <Card ref={ref} className={cn('overflow-hidden group flex flex-col', className)}>
        {/* Product Image - clickable for lightbox */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
            className={cn(
              "relative h-48 mb-4 overflow-hidden rounded-md border border-[var(--color-border,#2A2A2A)] bg-[var(--color-bg-elevated,#1C1C1C)] text-left w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-border-accent,rgba(45,212,232,0.4))] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-card,#141414)] focus-visible:ring-2",
              "transition-transform duration-300 ease-[0.16,1,0.3,1]",
              "hover:scale-[1.15]",
              "motion-reduce:hover:scale-100"
            )}
          aria-label={`View full image of ${title}`}
        >
          <Image
            src={`/images/${image}`}
            alt={title}
            width={238}
            height={238}
            className="w-full h-full object-contain transition-transform duration-400 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          <span className="absolute bottom-2 right-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">Click to expand</span>
        </button>

        {/* Content */}
        <div>
          <h3 className="font-display text-h2 uppercase tracking-tight text-[var(--color-accent,#00E599)] mb-2">
            {title}
          </h3>
          <p className="text-text-secondary text-small mb-4">{tagline}</p>

          <ul className="list-disc list-inside text-text-secondary text-small space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {useCases && useCases.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle,#1a1a1a)]">
              <h4 className="font-medium text-text-primary text-small mb-2">Use cases:</h4>
              <ul className="list-disc list-inside text-text-secondary text-small space-y-1">
                {useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <ImageModal
          src={image}
          alt={title}
          isOpen={isOpen}
          onClose={handleClose}
        />
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';
