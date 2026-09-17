'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

const clients = [
  'Chouksey Group',
  'Mosaji Group',
  'Sanjeevani Hospital',
  'Mount Litra Zee School',
  'Mahavir Coal Washiery',
  'Phil Coal and Steel',
  'Jai Durga Agro',
  'Jai Durga Oil Mill',
  "Achiever's Public School",
  'Maharshi Vidya Mandir',
];

export const Partnerships = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="partnerships" className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2 className="font-display text-h1 uppercase tracking-tight text-center mb-4">
          Built on Trusted Partnerships
        </h2>

        {/* Marquee row */}
        <div className="relative w-full overflow-hidden">
          {shouldReduceMotion ? (
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {clients.map((client) => (
                <span
                  key={client}
                  className="text-text-secondary text-small md:text-body font-medium whitespace-nowrap"
                >
                  {client}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex whitespace-nowrap animate-marquee gap-10 md:gap-16">
              {/* Double set for seamless loop */}
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={`${client}-${i}`}
                  className="text-text-secondary text-small md:text-body font-medium whitespace-nowrap"
                >
                  {client}
                  <span className="mx-10 md:mx-16 text-[var(--color-border-subtle,#1a1a1a)]">|</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CSS keyframes for marquee — add to global CSS or use inline style via <style> tag */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
};
