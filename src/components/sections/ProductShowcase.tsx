'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ProductShowcaseImage } from '@/components/ui/ProductShowcaseImage';

export interface ResolvedProduct {
  slug: string;
  image: string;
  title: string;
  tagline: string;
  features: string[];
  useCases?: string[];
}

export interface ProductShowcaseProps {
  products: ResolvedProduct[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Rows are tall (min-h-[70vh]) relative to a typical viewport, so more
    // than one can satisfy the center-band check at once — most commonly
    // right at initial mount, before any real scrolling has happened.
    // Track the full set of currently-intersecting rows and deterministically
    // pick the lowest index among them, rather than whichever observer
    // callback happens to fire last.
    const intersecting = new Set<number>();

    const observers = products.map((_, i) => {
      const el = rowRefs.current[i];
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            intersecting.add(i);
          } else {
            intersecting.delete(i);
          }
          if (intersecting.size > 0) {
            setActiveIndex(Math.min(...intersecting));
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [products.length]);

  const activeProduct = products[activeIndex];

  return (
    <div className="grid grid-cols-2 gap-16 items-start">
      {/* Left column: scrolling images */}
      <div className="flex flex-col gap-8">
        {products.map((product, i) => (
          <div
            key={product.slug}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="min-h-[70vh] flex items-center justify-center"
          >
            <ProductShowcaseImage title={product.title} image={product.image} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

      {/* Right column: sticky detail panel */}
      <div className="sticky top-1/2 -translate-y-1/2 self-start">
        <div className="bg-[var(--color-bg-card,#141414)] rounded-lg border border-[var(--color-border-card,#222)] p-8 overflow-hidden min-h-[540px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.slug}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-h2 uppercase tracking-tight text-accent mb-2">
                {activeProduct.title}
              </h3>
              <p className="text-text-secondary text-body mb-6">{activeProduct.tagline}</p>

              <ul className="list-disc list-inside text-text-secondary text-small space-y-1 mb-6">
                {activeProduct.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              {activeProduct.useCases && activeProduct.useCases.length > 0 && (
                <div className="pt-4 border-t border-[var(--color-border-subtle,#1a1a1a)]">
                  <h4 className="font-medium text-text-primary text-small mb-2">
                    {t('products.useCasesHeading')}
                  </h4>
                  <ul className="list-disc list-inside text-text-secondary text-small space-y-1">
                    {activeProduct.useCases.map((useCase, i) => (
                      <li key={i}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
