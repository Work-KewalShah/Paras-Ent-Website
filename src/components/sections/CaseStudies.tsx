'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { caseStudies } from '@/lib/content/case-studies';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';

export const CaseStudies = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="case-studies" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-secondary,#141414)]">
      <div className="max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="text-center mb-16">
          <h2 className="font-display text-h1 uppercase tracking-tight mb-4">
            Case Studies
          </h2>
          <p className="text-text-secondary text-body leading-relaxed max-w-2xl mx-auto">
            Experience the success with our dedicated approach
          </p>
        </div>

        {/* Case study cards — 2-col desktop, stacked mobile */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.clientName}
              initial={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;