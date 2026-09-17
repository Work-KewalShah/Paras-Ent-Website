'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/lib/content/site-config';
import { heroSlides } from '@/lib/content/hero';
import { Carousel } from '@/components/ui/Carousel';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55 },
        },
      };

  const visualVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.8 },
        },
      };

  const scanLineVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 0 } }
    : {
        hidden: { left: '-10%', opacity: 0.6 },
        show: {
          left: '110%',
          opacity: 0.6,
          transition: {
            duration: 1.2,
            delay: 0.55 * 5 + 0.1,
          },
        },
      };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 lg:pt-0 overflow-hidden">
      {/* Scan Line Effect */}
      <motion.div
        variants={scanLineVariants}
        initial="hidden"
        animate="show"
        className="absolute top-1/3 left-0 w-full h-[2px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(90deg, transparent, var(--color-accent), transparent)`,
          boxShadow: `0 0 20px var(--color-accent), 0 0 40px var(--color-accent)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="text-accent text-small uppercase tracking-widest mb-2"
            >
              SINCE 1999
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-hero uppercase tracking-tight leading-none mb-6"
            >
              Protect What Matters
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-body leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              25+ years of trusted security and service — protecting homes,
              businesses, and institutions across Bilaspur.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-radius-sm bg-accent text-bg-primary font-medium text-small hover:bg-accent-hover transition-colors min-h-[44px]"
              >
                Get Free Site Survey
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-radius-sm border-2 border-accent text-accent font-medium text-small hover:bg-accent hover:text-bg-primary transition-colors min-h-[44px]"
              >
                Call Now: {siteConfig.phoneFormatted}
              </a>
            </motion.div>

            {/* Supporting Line */}
            <motion.p
              variants={itemVariants}
              className="text-text-muted text-small"
            >
              8,000+ installations across Bilaspur and nearby areas
            </motion.p>
          </div>

          {/* Hero Visual Carousel */}
          <div className="relative aspect-[4/3] lg:aspect-square rounded-radius-lg overflow-hidden bg-bg-secondary border border-border">
            <Carousel slides={heroSlides} ariaLabel="Hero visual carousel" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
