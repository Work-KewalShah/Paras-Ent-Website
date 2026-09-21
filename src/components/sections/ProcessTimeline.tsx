'use client';

import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';

export default function ProcessTimeline() {
  const { t } = useTranslation();
  const steps = ['design', 'installation', 'support'];

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-h1 uppercase tracking-tight mb-6">
            {t('process.headline')}
          </h2>
          <p className="text-text-secondary text-body leading-relaxed max-w-2xl mx-auto">
            {t('process.subheadline')}
          </p>
        </div>

        {/* Process Steps */}
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-3 items-start">
            {steps.map((key, index) => (
              <div key={key} className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-elevated,#1C1C1C)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[var(--shadow-glow-accent-soft,0_0_24px_rgba(45,212,232,0.1))] text-[var(--color-accent,#2DD4E8)] font-display text-2xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-2">
                    {t(`process.steps.${key}.title`)}
                  </h3>
                  <p className="text-text-secondary">
                    {t(`process.steps.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Closing line */}
        <Reveal>
          <p className="mt-16 text-text-secondary text-center text-small leading-relaxed max-w-2xl mx-auto">
            {t('process.closingLine')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
