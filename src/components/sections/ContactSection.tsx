'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '@/lib/content/contact';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function ContactSection() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    },
  };

  // Reduced-motion branch handled via motion.div directly below

  const formatPhoneNumber = (num: string) => {
    // Format: first 5 digits, space, rest
    return `${num.slice(0, 5)} ${num.slice(5)}`;
  };

  return (
    <section
      id="contact"
      className="relative bg-[var(--color-bg-secondary,#141414)] py-20"
    >
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? "show" : "hidden"}
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Eyebrow and Headline */}
        <div className="text-center mb-12">
          <p className="text-accent text-small uppercase tracking-widest mb-4">
            {t('contact.eyebrow')}
          </p>
          <h2 className="font-display text-hero uppercase tracking-tight leading-none">
            {t('common.brandTagline')}
          </h2>
        </div>

        {/* Contact Numbers - two cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inquiry Card */}
          <Card className="h-full">
            <h3 className="font-semibold text-text-primary text-lg mb-4">
              {t('contact.inquiryLabel')}
            </h3>
            <div className="space-y-4">
              {/* Numbers side by side */}
              <div className="flex flex-wrap gap-6">
                {/* First Inquiry Number */}
                <a
                  href={`tel:${contactInfo.phoneInquiry1}`}
                  className="flex items-center space-x-3 min-h-[44px] min-w-[44px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-accent flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span className="whitespace-nowrap">
                    {formatPhoneNumber(contactInfo.phoneInquiry1)}
                  </span>
                </a>
                {/* Second Inquiry Number */}
                <a
                  href={`tel:${contactInfo.phoneInquiry2}`}
                  className="flex items-center space-x-3 min-h-[44px] min-w-[44px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-accent flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span className="whitespace-nowrap">
                    {formatPhoneNumber(contactInfo.phoneInquiry2)}
                  </span>
                </a>
              </div>
            </div>
          </Card>

          {/* Service Card */}
          <Card className="h-full">
            <h3 className="font-semibold text-text-primary text-lg mb-4">
              {t('contact.serviceLabel')}
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <a
                  href={`tel:${contactInfo.phoneService}`}
                  className="flex items-center space-x-3 min-h-[44px] min-w-[44px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-accent flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span className="whitespace-nowrap">
                    {formatPhoneNumber(contactInfo.phoneService)}
                  </span>
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* WhatsApp Button (single, below cards) */}
        <div className="mt-8 flex justify-center">
          <a
            href={`https://wa.me/91${contactInfo.phoneInquiry1}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center px-6 py-3 rounded-radius-sm bg-accent text-bg-primary font-medium text-small hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0 mr-2"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.508 3.583 1.393 5.065L2 22l5.062-1.365A9.955 9.955 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.16c-1.657 0-3.213-.457-4.548-1.25l-.326-.194-3.005.811.804-2.939-.213-.336A8.147 8.147 0 013.84 12c0-4.508 3.653-8.16 8.161-8.16 4.508 0 8.161 3.652 8.161 8.16 0 4.508-3.653 8.16-8.161 8.16z"/>
            </svg>
            {t('contact.whatsappButton')}
          </a>
        </div>

        {/* Visit Us block (map replacement) - now a button */}
        <div className="mt-12 text-center">
          <h3 className="font-bold text-xl tracking-tight text-text-primary mb-4">
            {t('contact.visitUsHeading')}
          </h3>
          <p className="mb-2 text-text-secondary">{t('contact.visitUsSubtext')}</p>
          <div className="flex justify-center">
            <a
              href={contactInfo.googleBusinessLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center px-6 py-3 rounded-radius-sm bg-accent text-bg-primary font-medium text-small hover:bg-accent-hover transition-colors min-h-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0 mr-2"
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
              </svg>
              {t('contact.viewOnGoogleButton')}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}