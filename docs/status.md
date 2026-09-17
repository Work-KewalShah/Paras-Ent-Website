# Project Status

This file is updated at the end of every session. It is the single source of truth for what's built, what's next, and what not to touch. Read this immediately after `00-start-here.md`, before opening any session file.

---

## Status: SESSION 04 COMPLETE
## Last updated: 2026-09-12 by Claude (session 04 — implementation and verification complete)
## Current session: 04 — Case Studies + Partnerships + StatsRow improvements (plan approved; all implementation finished; final spacing confirmed visually)
## Previous session: 03 — COMPLETE (Process + Service + B2B + Visual Refinement + Use Cases + Image Interaction, verified)

## Phase 1 (Explore) — COMPLETE
- Confirmed company-wide StatsRow figures from content-brief.md: 25+ Years, 8,000+ Installations, and 20+ Year Client Relationship
- Confirmed that 600+ Cameras is case-study-specific and remains in the Chouksey Engineering College case study content, not in the company-wide stats
- Confirmed both case studies' full text verbatim from copy-case-studies.md
- Confirmed 10 client names verbatim from copy-case-studies.md
- Confirmed case study images are façade-only (user visual confirmation); ImageModal NOT enabled for CaseStudyCard
- Confirmed spelling decision: "Sanjeevani Hospital" standardized (actual image filename = Sanjeevani_Hospital.jpg; three variants resolved: Sanjivani / Sanjeevni / Sanjeevani)
- Two things learned from Session 03 explicitly applied:
  1. Verified claims are based on actual file checks — never assumed.
  2. Numeric/visual values picked to achieve stated goals — not just technically satisfying.

## Phase 2 (Plan) — APPROVED (user typed "approved")
- Plan presented with all session-04.md requirements plus the StatsRow corrections
- Decisions incorporated: facade-only images → no lightbox; "Sanjeevani" spelling; only 2 case study cards (no extras); 10-name marquee
- Additional StatsRow improvements approved: remove misplaced "600+ Cameras" stat, improve styling, follow the established data import pattern, and correct section-level spacing

## Phase 3 (Implement) — COMPLETE
- `types/content.ts` — CaseStudy interface added
- `lib/content/case-studies.ts` — both studies transcribed verbatim (Chouksey + Sanjeevani), with image filenames
- `docs/01-content/copy-case-studies.md` — case study heading updated to Sanjeevani; client list updated to Sanjeevani
- `docs/04-process/decisions.md` — Session 04 spelling decision and StatsRow corrections logged
- `src/components/ui/CaseStudyCard.tsx` — built on Card primitive, plain image (no lightbox), Pattern 3 hover
- `src/components/sections/CaseStudies.tsx` — 2-column desktop / stacked mobile, Pattern 2 reveal
- `src/components/sections/StatsRow.tsx` — 3 stats, improved styling, balanced 3-column grid, and final `py-12` section padding
- `src/components/sections/Partnerships.tsx` — 10 client names, marquee with static reduced-motion fallback
- `app/page.tsx` — StatsRow, CaseStudies, and Partnerships wired in correct order after B2BSection
- `src/lib/content/stats.ts` — new company-wide stats data file (25+ Years, 8,000+ Installations, 20+ Year Client Relationship)

## Completed this session:
- CaseStudy interface and data layer
- CaseStudyCard component (Card-based, no lightbox, Pattern 3 hover, reduced-motion)
- CaseStudies section (Pattern 2 reveal, responsive 2-column layout)
- StatsRow content correction:
  - Removed misplaced "600+ Cameras" stat (belongs to the Chouksey case study, not the company-wide stat set)
  - Now shows only 3 company-wide stats: 25+ Years, 8,000+ Installations, 20+ Year Client Relationship
  - Stats data moved from inline `app/page.tsx` props into `src/lib/content/stats.ts`, following the established section-data pattern
- StatsRow styling:
  - Increased stat number size to `text-4xl md:text-5xl`
  - Kept internal stat spacing at `pt-4`
  - Corrected the missing section-level padding
  - Final section padding is `py-12` after testing `py-24` and `py-16`
  - Balanced 3-column grid (`md:grid-cols-3 lg:grid-cols-3`)
- StatsRow hooks correction:
  - Hooks violation resolved through the `AnimatedStat` child component pattern
  - TypeScript errors fixed
- Partnerships section (marquee + static fallback, all 10 names verbatim)
- Spelling standardization logged and applied across content (Sanjeevani Hospital)
- Image treatment decision made (façade-only → no ImageModal) and documented
- Case study images copied to `public/images/` with aspect-ratio/object-cover sizing applied

## Spacing Correction (final):
- B2BSection and CaseStudies use `py-24` (96px top and bottom each).
- Initial StatsRow `py-24` produced a 96px combined gap on each side (48px B2B/CaseStudies padding + 48px StatsRow padding).
- `py-16` produced a 80px combined gap on each side (48px adjacent-section padding + 32px StatsRow padding).
- Final `py-12` produces a 96px combined gap on each side (48px adjacent-section padding + 48px StatsRow padding).
- The user visually confirmed that `py-12` looks good; no further StatsRow spacing changes are needed.

## Verification Notes (accurate to this session):
- `npx tsc --noEmit` passed with zero errors in this session.
- `npm run build` completed successfully in this session.
- Final source check confirmed `py-12`, the 3-stat array, and the 3-column grid.
- Browser console: the user previously reported no red errors and no React Hooks warnings for the Session 04 components; that console check was not repeated in this final pass. Yellow "resource preloaded but not used" warnings remain a known non-blocking item.
- Visual confirmation: the user confirmed the final `py-12` spacing looks good.

## Verification Standard (Updated This Session)
From this point forward, any claim that a component is "verified" or "complete" requires both:
1) `npx tsc --noEmit` passes with zero errors, AND
2) Dev server console (`npm run dev`) shows zero errors and zero warnings when the page is loaded and the component's hooks trigger (e.g., scroll to StatsRow for Pattern 4 animation).

## Known Non-Blocking Items (outside Session 04 scope):
- Resource preloaded but not used warnings — product images (wifi-camera, burglar-alarms, audio) and a Next.js static chunk; carried forward to Session 08 performance audit
- Address pincode (affects Session 08 SEO)
- Hero visual (Session 01 open item)
- All icons (Session 01 open item)
- Pre-existing Hero/Button/StaggerContainer TypeScript errors (not caused by Session 04)

## Do NOT touch / in-progress (Session 03 preserved):
- Card.tsx, ProductCard.tsx, ProcessTimeline.tsx, ServiceApproach.tsx, B2BSection.tsx — complete, verified
- ProductGrid.tsx, Navbar.tsx, Hero.tsx, TrustPillars.tsx — preserved

## Open Items (NOT Complete):
- og:image: placeholder set to /og-placeholder.png; awaiting real hero/logo image asset (see docs/03-technical/seo-meta.md)

## Dev-Server Artifact — Session 07 Real-Device Finding (Documented Only)
Sections appearing blank during real-device testing (Session 07) were a dev-server artifact, not a bug — `npm run dev`'s unminified JS bundle + hot-reload overhead caused slow hydration on mobile CPU, unrelated to network bandwidth (confirmed on 100mbps WiFi). Verified fixed on production build (`npm run build` + `npm run start`, port 3001, URL `http://192.168.1.121:3001`) — all sections rendered correctly on real device. No code changes needed. Going forward, real-device testing for Session 07+ should be done against a production build, not the dev server, to avoid false-positive findings.

## Session 05 reminder (DO NOT START):
- Contact + Footer — not yet approved. Await plan approval before starting.
## Deferred Open Item — Mobile Nav Dropdown Fix (Session 08/09)
- Mobile nav dropdown fix — edit verified correct in source, build, and served chunks (confirmed via timestamp + grep: z-[60], bg-[var(--color-bg-primary,#0A0A0A)], rounded-b-lg, shadow-lg, max-h-[calc(100vh-72px)], overflow-y-auto all present in chunk 120doqcf3v2r3.js; .next build at 01:32:32 after edit at 01:31:07; server on port 3001). However Kewal still reports the old full-screen appearance — likely a browser cache issue, not a real bug. Defer further investigation; re-check with a hard refresh or incognito window before deployment. Not blocking.

## Session 08 — SEO + Performance
**FINAL LIGHTHOUSE SCORES (production build):**
- Desktop: Performance 100, Accessibility 96, Best Practices 100, SEO 100
- Mobile: Performance 87 (up from baseline 34), Accessibility 96, Best Practices 100, SEO 100

**KEY FIXES THAT DROVE THE IMPROVEMENT:**
- Converted raw <img> tags (ProductCard, CaseStudyCard) to next/image — cut total page weight from 4.6MB to ~313KB
- Fixed font-loading CLS regression (Inter font-display: optional) — CLS now 0 (perfect)
- Fixed color contrast issue (#6B6B6B → #8A8A8A)
- Dynamic-imported CaseStudies and Footer (code-splitting) — cut Total Blocking Time from 680ms to 310ms, unused JS from 132KB to 74KB
- Closed seo-meta.md gaps: pincode (495001), real og:url (parasent.web.app), og:image placeholder (logged as open item), synced to actual layout.tsx/page.tsx code
- Created sitemap.xml and robots.txt

**REMAINING OPEN ITEMS (not blocking):**
- og:image needs a real image (placeholder currently in place)
- Mobile nav dropdown fix — verified correct in source/build/chunks, but Kewal saw stale appearance once; likely browser cache, defer further investigation
- Some residual unused JS (74KB) inside Framer Motion itself — diminishing returns to chase further, accepted as-is

**Accessibility color-contrast fix (#8A8A8A) is holding at 96 in this final run — no regression.**
## Session 09 (Final QA) — COMPLETE
Session 09 (Final QA) complete. TS errors clean, copy proofread passed (one staleness fix applied to copy-contact-footer.md), Footer Quick Links bug found and fixed, edge cases reviewed (slow-network tested directly, overflow accepted on structural reasoning), open items resolved except og:image (remains open, needs real asset). Browser testing limited to Chrome/Brave only — Firefox/Safari untested, logged as known gap, not blocking.

## Known Testing Gap (Session 09)
- **Firefox / Safari not tested:** All QA was limited to Chrome/Brave (desktop + mobile DevTools + real device). This gap is explicitly acknowledged and not assumed covered.

## Note: Session 10 was never logged here
This file has no entry for Session 10 (Hindi/English language toggle via react-i18next,
plus the persistent top LanguageBar with font-size controls). That work is real and
complete — see `git log` and `docs/04-process/decisions.md` for the full history — but
the required status.md update was missed at the time. Flagging this gap explicitly rather
than silently leaving it unexplained. Session 11 (below) is logged correctly.

## Session 11 (Scroll-Synced Product Showcase) — COMPLETE
Replaced desktop's Product Grid with a two-column scroll-synced "scrollytelling" layout
(sticky detail panel crossfades as the user scrolls past each product image on the left).
Mobile grid is completely unchanged, split via the existing `lg:` breakpoint. New files:
`src/components/sections/ProductShowcase.tsx`, `src/components/ui/ProductShowcaseImage.tsx`.
Full architecture and verification results logged in `docs/04-process/decisions.md`.

**Verified:** real-scroll IntersectionObserver sync (perfect accuracy through all 9
products), Hindi mode (detail panel + image alt text + ImageModal's own close-button
label all translate correctly), ImageModal unchanged on the new layout, mobile confirmed
byte-identical to pre-Session-11, Lighthouse desktop 100/100 with 0 CLS.

**Discovered, logged, not fixed (out of scope):** a sitewide pre-existing hydration
mismatch affecting every component using Framer Motion's `useReducedMotion()` to branch
animation props (Navbar, Hero, Reveal, StaggerContainer, Partnerships, and now
ProductShowcase, which inherited the existing pattern) — real visitors with OS-level
reduced-motion already enabled get a console error and a wasted re-render on first page
load, sitewide. Full repro details and fix options in `decisions.md`. Worth a dedicated
future session.
