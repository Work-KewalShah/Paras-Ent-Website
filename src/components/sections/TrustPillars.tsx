'use client';

import { Reveal } from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';

export default function TrustPillars() {
  const pillars = [
    { title: 'Security', description: 'Protecting people, property, and spaces' },
    { title: 'Innovation', description: 'Staying current with the latest technology' },
    { title: 'Service', description: 'Long-term, reliable customer relationships' },
  ];

  const trustBadges = [
    { title: '2-Year Replacement Guarantee', tagline: 'Peace of mind, always' },
    { title: 'Custom Solutions for Every Space', tagline: 'Made for your space' },
    { title: 'Brilliant After-Sales Service', tagline: 'Support that stays' },
    { title: 'Fast, Effective Installations', tagline: 'Fast. Neat. Professional' },
  ];

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="font-display text-h1 uppercase tracking-tight text-center mb-12">
            25+ Years of Trust and Expertise
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1}>
              <div className="text-center p-8 rounded-radius-lg border border-border bg-bg-secondary/50">
                <h3 className="font-display text-h2 uppercase tracking-tight text-accent mb-4">{pillar.title}</h3>
                <p className="text-text-secondary text-body">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <StaggerContainer>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory lg:snap-none lg:overflow-visible lg:mx-0 lg:px-0">
            {trustBadges.map((badge) => (
              <StaggerItem key={badge.title}>
                <div className="flex-shrink-0 w-[280px] lg:w-auto snap-center text-center p-6 rounded-radius-md border border-border-accent/30 bg-bg-elevated/30">
                  <h4 className="font-medium text-text-primary text-small mb-1">{badge.title}</h4>
                  <p className="text-text-muted text-small">{badge.tagline}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
