'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ImageModal } from './ImageModal';
import { cn } from '@/lib/utils';

export interface ProductShowcaseImageProps {
  title: string;
  image: string;
  className?: string;
}

export const ProductShowcaseImage = React.forwardRef<HTMLDivElement, ProductShowcaseImageProps>(
  ({ title, image, className }, ref) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    }, []);

    return (
      <div ref={ref} className={cn('w-full flex items-center justify-center', className)}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative w-full max-w-md aspect-square overflow-hidden rounded-md border border-[var(--color-border,#2A2A2A)] bg-[var(--color-bg-elevated,#1C1C1C)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-accent,rgba(45,212,232,0.4))] focus:ring-offset-2 focus:ring-offset-bg-primary"
          aria-label={t('products.viewFullImageAriaLabel', { title })}
        >
          <Image
            src={`/images/${image}`}
            alt={title}
            fill
            className="object-contain p-8"
          />
        </button>

        <ImageModal src={image} alt={title} isOpen={isOpen} onClose={handleClose} />
      </div>
    );
  }
);

ProductShowcaseImage.displayName = 'ProductShowcaseImage';
