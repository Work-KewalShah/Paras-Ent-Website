'use client';

import { Reveal } from '@/components/ui/Reveal';

export default function ProcessTimeline() {
  const sectionIntro = {
    title: 'Designed for You, Guaranteed by Us',
    subheadline: "We're with you from day one — offering support and crafting the perfect solution for your needs."
  };
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-h1 uppercase tracking-tight mb-6">
            {sectionIntro.title}
          </h2>
          <p className="text-text-secondary text-body leading-relaxed max-w-2xl mx-auto">
            {sectionIntro.subheadline}
          </p>
        </div>

        {/* Process Steps */}
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-3 items-start">
            {/* Step 1 */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-elevated,#1C1C1C)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                1
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2">
                  Design & Consultation
                </h3>
                <p className="text-text-secondary">
                  Collaborating with you to craft tailored security and automation solutions from the ground up
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-elevated,#1C1C1C)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                2
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2">
                  Seamless Installation
                </h3>
                <p className="text-text-secondary">
                  Expert installation that integrates seamlessly with your project, ensuring precision and efficiency
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg-elevated,#1C1C1C)] border-[var(--color-border-accent,rgba(45,212,232,0.4))] shadow-[0_0_24px_rgba(45,212,232,0.1)] text-[var(--color-accent,#00E599)] font-display text-2xl">
                3
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2">
                  Long-Term Support
                </h3>
                <p className="text-text-secondary">
                  Our 2-year replacement guarantee is backed by 25+ years of learning and expertise. Count on our top-notch service for reliable support beyond the installation
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing line */}
        <Reveal>
          <p className="mt-16 text-text-secondary text-center text-small leading-relaxed max-w-2xl mx-auto">
            Excited to secure your vision and bring it to life with seamless, trusted solutions!
          </p>
        </Reveal>
      </div>
    </section>
  );
}
