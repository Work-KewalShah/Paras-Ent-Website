import dynamic from 'next/dynamic';
import { LanguageBar } from '@/components/ui/LanguageBar';
import LightBurstDynamic from '@/components/sections/LightBurstLoader';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustPillars from '@/components/sections/TrustPillars';
import ProductGrid from '@/components/sections/ProductGrid';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import ServiceApproach from '@/components/sections/ServiceApproach';
import B2BSection from '@/components/sections/B2BSection';
import { StatsRow } from '@/components/sections/StatsRow';
import { Partnerships } from '@/components/sections/Partnerships';
import { statsRowData } from '@/lib/content/stats';
import ContactSection from '@/components/sections/ContactSection';

const CaseStudiesDynamic = dynamic(() => import('@/components/sections/CaseStudies'));
const FooterDynamic = dynamic(() => import('@/components/sections/Footer'));

export default function Home() {
  return (
    <main>
      <LanguageBar />
      <Navbar />
      <div className="bg-[var(--color-bg-secondary,#141414)]">
        <Hero />
      </div>
      <div className="bg-[var(--color-bg-primary,#0A0A0A)]">
        <TrustPillars />
      </div>
      <div className="bg-[var(--color-bg-secondary,#141414)]">
        <ProductGrid />
      </div>
      <div className="bg-[var(--color-bg-primary,#0A0A0A)]">
        <ProcessTimeline />
      </div>
      <div className="bg-[var(--color-bg-secondary,#141414)]">
        <ServiceApproach />
      </div>
      <B2BSection />
      <div className="bg-[var(--color-bg-primary,#0A0A0A)]">
        <StatsRow stats={statsRowData} />
      </div>
      <LightBurstDynamic />
      <div className="bg-[var(--color-bg-secondary,#141414)]">
        <CaseStudiesDynamic />
      </div>
      <div className="bg-[var(--color-bg-primary,#0A0A0A)]">
        <Partnerships />
      </div>
      <ContactSection />
      <FooterDynamic />
    </main>
  );
}