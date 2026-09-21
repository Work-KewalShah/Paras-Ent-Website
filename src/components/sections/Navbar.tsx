'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/lib/content/site-config';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { NavbarLanguageControls } from './NavbarLanguageControls';

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const shouldReduceMotion = useReducedMotion();
  const isScrolled = scrollY > 80;

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navbarVariants = shouldReduceMotion
    ? {}
    : {
        initial: false,
        animate: {
          paddingTop: isScrolled ? '0.75rem' : '1.5rem',
          paddingBottom: isScrolled ? '0.75rem' : '1.5rem',
          backgroundColor: isScrolled
            ? 'rgba(10, 10, 10, 0.85)'
            : 'rgba(10, 10, 10, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          boxShadow: isScrolled
            ? '0 4px 24px rgba(0, 0, 0, 0.4)'
            : '0 0 0 rgba(0, 0, 0, 0)',
        },
        transition: { duration: 0.3 },
      };

  return (
    <>
    <motion.header
      className="fixed top-8 lg:top-0 left-0 right-0 z-50 border-b border-border/0 min-h-[72px] lg:min-h-[84px]"
      {...navbarVariants}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-text-primary font-display text-2xl tracking-tight flex-shrink">
          Paras Enterprises
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 navbar-links-gap-fix">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors text-small"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>

        {/* Phone + CTA + Language/Font controls (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex-shrink-0 text-accent hover:text-accent-hover transition-colors text-small font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span className="whitespace-nowrap">{siteConfig.phoneFormatted}</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-radius-sm bg-accent text-bg-primary font-medium text-small hover:bg-accent-hover transition-colors"
          >
            {t('common.ctaSiteSurvey')}
          </a>
          <NavbarLanguageControls />
        </div>

        {/* Mobile: Phone + Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex-shrink-0 text-accent hover:text-accent-hover transition-colors text-small font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`${t('common.callAriaLabelPrefix')} ${siteConfig.phoneFormatted}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span className="whitespace-nowrap">{siteConfig.phoneFormatted}</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-primary"
            aria-label={mobileMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

</motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed left-0 right-0 top-[104px] z-[60] bg-[var(--color-bg-primary,#0A0A0A)] rounded-b-lg shadow-lg max-h-[calc(100vh-104px)] overflow-y-auto"
          >
            <nav className="flex flex-col items-center justify-center gap-8">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary text-h1 font-display tracking-tight min-h-[44px] flex items-center justify-center"
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-radius-sm bg-accent text-bg-primary font-medium min-h-[44px]"
              >
                {t('common.ctaSiteSurvey')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
