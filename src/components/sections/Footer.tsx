'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '@/lib/content/contact';
import { siteConfig } from '@/lib/content/site-config';
import { cn } from '@/lib/utils';

export default function Footer() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any
      }
    },
  };

  const formatPhoneNumber = (num: string) => {
    return `${num.slice(0, 5)} ${num.slice(5)}`;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-bg-primary,#0A0A0A)] text-text-secondary"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Logo + Tagline */}
          <div className="flex flex-col space-y-2">
            <p className="font-display text-text-primary uppercase tracking-tight">
              PARAS ENTERPRISES
            </p>
            <p className="text-body leading-relaxed">
              {t('common.brandTagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary mb-4">
              {t('footer.quickLinksHeading')}
            </h3>
            <nav className="flex flex-col space-y-2">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info (Address + Phones) */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary mb-4">
              {t('footer.contactUsHeading')}
            </h3>
            <p className="text-text-secondary">
              {contactInfo.address}
            </p>
            <div className="mt-4 space-y-3">
              {/* Inquiry Numbers */}
              <div className="space-y-2">
                <p className="font-medium text-text-primary">
                  {t('contact.inquiryLabel')}
                </p>
                <div className="space-y-1">
                  <a
                    href={`tel:${contactInfo.phoneInquiry1}`}
                    className="flex items-center space-x-2"
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
                  <a
                    href={`tel:${contactInfo.phoneInquiry2}`}
                    className="flex items-center space-x-2"
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

              {/* Service Number */}
              <div className="space-y-2">
                <p className="font-medium text-text-primary">
                  {t('contact.serviceLabel')}
                </p>
                <a
                  href={`tel:${contactInfo.phoneService}`}
                  className="flex items-center space-x-2"
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
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border/20 text-center text-text-muted">
          {t('footer.copyrightTemplate', { year: currentYear })}
        </div>
      </motion.div>
    </footer>
  );
}