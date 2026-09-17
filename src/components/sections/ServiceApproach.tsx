'use client';

import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/ui/Reveal';

export default function ServiceApproach() {
  const { t } = useTranslation();

  return (
    <section id="service" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-h1 uppercase tracking-tight mb-6">
            {t('service.headline')}
          </h2>
        </div>

        {/* Service Grid */}
        <Reveal>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* System Installation */}
            <div className="bg-[var(--color-bg-elevated,#1C1C1C)] rounded-lg border border-[var(--color-border,#2A2A2A)] p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-accent,#00E59910)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                  1
                </div>
                <div>
                  <h3 className="font-display text-h3 uppercase tracking-tight mb-2">
                    {t('service.items.installation.title')}
                  </h3>
                  <p className="text-text-secondary text-body">
                    {t('service.items.installation.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Maintenance & Support */}
            <div className="bg-[var(--color-bg-elevated,#1C1C1C)] rounded-lg border border-[var(--color-border,#2A2A2A)] p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-accent,#00E59910)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                  2
                </div>
                <div>
                  <h3 className="font-display text-h3 uppercase tracking-tight mb-2">
                    {t('service.items.maintenance.title')}
                  </h3>
                  <p className="text-text-secondary text-body">
                    {t('service.items.maintenance.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Upgrades & Expansions */}
            <div className="bg-[var(--color-bg-elevated,#1C1C1C)] rounded-lg border border-[var(--color-border,#2A2A2A)] p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-accent,#00E59910)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                  3
                </div>
                <div>
                  <h3 className="font-display text-h3 uppercase tracking-tight mb-2">
                    {t('service.items.upgrades.title')}
                  </h3>
                  <p className="text-text-secondary text-body">
                    {t('service.items.upgrades.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Consultation */}
            <div className="bg-[var(--color-bg-elevated,#1C1C1C)] rounded-lg border border-[var(--color-border,#2A2A2A)] p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-bg-accent,#00E59920)] text-[var(--color-accent,#00E599)] font-display text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-display text-h3 uppercase tracking-tight mb-2">
                    {t('service.items.consultation.title')}
                  </h3>
                  <p className="text-text-secondary text-body">
                    {t('service.items.consultation.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing Guarantee */}
        <Reveal>
          <p className="mt-16 text-text-secondary text-center text-sm leading-relaxed max-w-2xl mx-auto">
            {t('service.closingLine')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}