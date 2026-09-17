# Session 07 — Responsive Audit

**Status:** Detailed scope defined; not yet executed (awaiting audit results before fixes).
**Blocked by:** None — Session 06 complete (Pattern 6 rebuilt, motion fixes applied, open item logged).
**Role:** Reviewer (see `04-process/agents.md`)

---

## Scope

Full pass across every section at every breakpoint defined in `responsive-rules.md`, with targeted focus on new/changed items since Session 04 mobile audit (375px check). Real-device spot-check available this session (actual phone, not emulator-only).

---

## Part A — Targeted Audit (new/changed since Session 04 mobile audit, never checked against responsive-rules.md)

These items were either created or substantially changed after the Session 04 audit (post-Session-04 polish at 375px) and have not been verified at any breakpoint:

### 1. Carousel Indicators (Carousel.tsx) — dot/outline redesign
- Check at sm/md/lg: outline ring (inactive), solid inner fill (active), fill-sync with timer state
- Verify active dot distinguishes from inactive at narrow widths (outline ring visible on dark bg)
- Touch target on each dot button (must maintain ≥44px; check button's visual size + hit area)

### 2. ContactSection — two-card layout, WhatsApp button, "View on Google" button, "Visit Us" block
- Check all breakpoints (sm/md/lg/xl):
  - Two Card components (Inquiry / Service) — side-by-side on lg+, stacked on mobile
  - Phone links inside cards (`tel:` hrefs) — touch targets ≥44px; format displays cleanly when narrow
  - WhatsApp button (`min-h-[44px]`) — visible, tappable, label readable at sm width
  - "View on Google" button (pin icon + text) — icon renders with `currentColor`, button height maintained
  - "Visit Us" heading + subparagraph + button — centered block, no overflow on narrow screens
- Note: Contact section has NO map embed (form dropped Session 05); only address + phone + buttons + Google link

### 3. Footer — scroll-trigger + motion (Session 06 changes)
- Check at all breakpoints: multi-column desktop (logo/tagline / quick links / contact info), stacked single-column mobile
- Verify reduced-motion branch does not break layout (no translateY motion = static position; should render identically)
- Address + 3 formatted phone numbers readable; quick links tappable with spacing

### 4. ScrollShowcase (Pattern 6) — scroll-linked showcase
- **Layout/mechanics only (content still placeholder text — do not judge visual polish):**
  - Height: `h-64 lg:h-96` — confirm no overflow or clipping at sm/md; check at 375px specifically
  - Scroll behavior (`useScroll` with `offset: ['start end', 'end start']`):
    - At narrow widths with little scroll distance: does `useTransform` map sanely (0→1 over short viewport)?
    - Reduced-motion branch (`shouldReduceMotion`): static content (`x: 0%`, `opacity: 1`) should render identically — verify layout does not shift when motion disabled
  - Content is placeholder ("Scroll-Linked Showcase" heading + subparagraph) — judge whether container/gradient/background renders correctly at all breakpoints, not whether text should change

### 5. Touch-Target Violations — specifically on new Contact buttons
- WhatsApp button (`min-h-[44px]`) — confirm hit area at 375px
- "View on Google" button (`min-h-[44px]`) — confirm hit area at 375px
- Individual phone links inside cards — verify ≥44px visually (text might wrap; check spacing between flex items)
- Any button/link inside ContactSection cards that might fall below 44px due to font-size reduction or padding compression at narrow widths

---

## Part B — Real-Device Spot-Check (fast sanity pass, not exhaustive)
- **Available:** Actual phone (real device, not emulator) — first time this session.
- **Sections to check (Kewal's choice for sanity; not a full re-audit):**
  1. Navbar — phone number + hamburger menu (already confirmed working; quick sanity only)
  2. Hero carousel — slide transition + dot indicators visible and tappable
  3. Product grid — 1-column mobile layout, card heights consistent
  4. One other section — either ProcessTimeline or CaseStudies (previously verified)
- **Not a full audit:** Sections already confirmed at 375px (Hero, TrustPillars, StatsRow) do not need re-checking unless spot-check reveals a break.
- **Method:** Load `http://localhost:3000` on phone, scroll through sections, observe layout breaks, overflow, or touch-target failures. Document only findings — do not attempt full audit of un-changed sections.

---

## Verification Standard
From this point forward, any claim that a component is "verified" or "complete" requires both:
1) `npx tsc --noEmit` passes with zero errors
2) Dev server console (`npm run dev`) shows zero errors and zero warnings when the page is loaded and the component's hooks trigger

For this session specifically: real-device spot-check findings must be noted explicitly as "verified on device" or "not verified on device" — never implied.

---

## To Detail Before This Session Starts (now filled)
- **Viewport widths to test:** 375px (primary mobile target), 640px (sm), 768px (md), 1024px (lg), plus real-phone width (approx 390–414px depending on device)
- **Responsive issues already noted in status.md:** Post-Session-04 mobile audit (375px visual check); B2BSection updated to single-column; touch targets preserved (`min-h-[44px]`); Carousel indicator redesign completed; Contact + Footer rebuilt Session 05/06 with new motion and layout patterns
- **Device testing available:** Yes — actual phone available now (was emulator-only in Sessions 04–06). Use for Part B spot-check; Part A can use browser devtools at defined breakpoints.
- **Not in scope:** Full re-audit of Hero, TrustPillars, StatsRow, ProcessTimeline, ServiceApproach, B2BSection, Partnerships (already verified; only check if spot-check reveals a break).
