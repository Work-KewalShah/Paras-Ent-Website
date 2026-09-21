import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
} else if (process.env.NODE_ENV === 'development') {
  // Dev-only: the `i18next` package itself is a long-lived singleton from
  // node_modules, which Next.js dev-mode HMR does not reset — only this
  // project's own source files (including en.json/hi.json) get invalidated
  // and re-imported fresh on each edit. That means `isInitialized` stays
  // true across HMR passes within the same dev server process, so the
  // `!isInitialized` branch above only ever runs once per process — any
  // translation key added or changed after that first run would otherwise
  // never reach the live instance until a full dev-server restart (this is
  // the exact root cause logged in decisions.md for the "themes" nav-link
  // hydration bug). addResourceBundle with deep+overwrite syncs the live
  // instance to the current en/hi content on every HMR pass instead.
  // Production is unaffected: a fresh process always takes the
  // !isInitialized branch above exactly once, so this branch never runs.
  i18next.addResourceBundle('en', 'translation', en, true, true);
  i18next.addResourceBundle('hi', 'translation', hi, true, true);
}

export default i18next;
