'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';

const clients = [
  'Moasaji Restaurant',
  'Dream Point',
  'Grand Lotus',
  'Jai Durga Group',
  'JD Foods',
  'Sanjeevani Hospital',
  'Chouksey Group of Colleges',
  'Bachpan Play School',
  'Maharshi School',
  'Achievers Public School',
  'Juneja Eye Hospital',
  'Saharsh Hospital',
  'Umang Hospital',
  'Meghani Hospital',
  'Grand Gulmohar Hotel',
  'Phil Coal and Steel Plant',
  'Hanumant Alloys',
  'Moasaji KIA / Honda',
  'Arpa River Valley International School',
  'Meenakshi Group',
];

export const Partnerships = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="partnerships" className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2 className="font-display text-h1 uppercase tracking-tight text-center mb-4">
          {t('partnerships.headline')}
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
            animation: marquee 48s linear infinite;
          }
          @media (max-width: 767px) {
            .animate-marquee {
              animation-duration: 12s;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
};
