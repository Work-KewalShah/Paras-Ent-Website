'use client';

import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { b2bContent } from '@/lib/content/b2b';

export default function B2BSection() {
  return (
    <section id="b2b" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="bg-[var(--color-bg-card,#141414)] rounded-lg border border-[var(--color-border-card,#222)] p-8">
            <h2 className="font-display text-h2 sm:text-h1 uppercase tracking-tight mb-6 text-text-primary">
              {b2bContent.headline}
            </h2>
            <p className="max-w-3xl text-text-secondary text-body leading-relaxed mb-8">
              {b2bContent.body}
            </p>
            <Button variant="primary" href={b2bContent.ctaHref}>
              {b2bContent.ctaText}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}