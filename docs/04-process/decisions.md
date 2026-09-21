# Architecture & Process Decisions

## Session 02: Product Grid & Card Primitive Architecture
- **Decision:** Product Grid ships as a flat 9-card grid (no filter tabs, no `tag` field).
- **Card Architecture Fix:** Corrected architectural contradiction where `Card.tsx` had been merged into `ProductCard`. Rebuilt `src/components/ui/Card.tsx` as the shared base primitive (handling Pattern 3 hover states, reduced-motion, design tokens) and `src/components/ui/ProductCard.tsx` as a composition layer on top of `Card.tsx`.

## Session 03: Process Incident & Verification Resolution
- **Incident:** Session 03 implementation (`ProcessTimeline.tsx`, `ServiceApproach.tsx`, and wiring into `app/page.tsx`) was executed prematurely without explicit user approval of a plan revision or Session 03 plan.
- **Review & Resolution:** The implementation was halted, inspected, and verified against `session-03.md`'s Phase 4 checklist. All 5 checklist items passed (exact copy matching, ordering, responsive layouts, visual differentiation, and reduced motion). The user reviewed the verification results and confirmed keeping the work rather than rolling it back.
- **Process Rule Reaffirmed:** After presenting any Plan in Phase 2, the assistant must stop completely and take no implementation action (no file creation, editing, or wiring) until the user explicitly types the word "approved". Silence, peripheral fixes, or related questions never constitute approval.

## Session 03: Visual Refinement Pass
- **Request:** User identified five specific visual execution issues needing correction before considering Session 03 genuinely complete: (1) Card resting state lacked visual weight, (2) Product images clashed with dark theme, (3) No visual rhythm between sections, (4) ProcessTimeline and ServiceApproach lacked sufficient differentiation, (5) Numbered badge anchors were too weak.
- **Execution:** Applied fixes across five areas while strictly respecting copy and B2BSection: enhanced Card resting state with border/bg-elevated/shadow; added dark vignette overlay to ProductCard images; implemented alternating section background rhythm; differentiated ServiceApproach with icon-first cards and updated typography; strengthened numbered badges with larger size/glow in both sections.
- **Verification:** Confirmed all fixes executed per design-system.md and motion-guide.md, dev server running cleanly at http://localhost:3000, and visual execution now meets the bar set by B2BSection as reference.

## Session 03: Three-Item Refinement (Content + Height + Image Legibility)
- **Item 1 — Use Cases (new copy):** Added "Use cases" to `docs/01-content/copy-products.md` for the 5 categories lacking them (CCTV, PTZ, WiFi, Video Door, Burglar Alarms). Synced to `src/lib/content/products.ts` and `ProductCard`. Not sourced from original booklet; recorded here. See copy-products.md note.
- **Item 2 — Card Height Consistency:** Added `items-stretch` to ProductGrid and `className="h-full"` to `StaggerItem` + `ProductCard` so all cards in a row stretch to equal height regardless of content.
- **Item 3 — Image Legibility (Option C approved):** Increased `ProductCard` image container from `h-40` to `h-48`; added `ImageModal` (shared lightbox, accessible focus trap + Escape/close, returns focus to trigger) applied to all 9 cards. Component spec updated; reusable for CaseStudyCard (Session 04). Focus trap confirmed accessible (Escape and backdrop close); focus returns to card button on close.
- **Visual result:** Cards now display consistent height rows, all 9 show Use Cases sections, and embedded diagram text is readable at rest with click-to-expand available.

## Session 03: Image Lightbox + Hover-Peek Pattern (New Scope Beyond component-spec.md)
- **Pattern:** A shared image-interaction pattern was introduced that is not defined in the original `component-spec.md`. It consists of: (a) a click-to-expand lightbox (`ImageModal`) with accessible focus trap (returns focus to trigger on close, Escape + backdrop close supported), and (b) a hover-scale peek effect (`hover:scale-[1.15]`) with a `motion-reduce:` fallback (`motion-reduce:hover:scale-100`) so reduced-motion users see no animation.
- **Scope Note:** This is new UI scope beyond the original component spec. It was approved in the refinement pass (not deferred to Session 04). The `ImageModal` component spec was added to `docs/03-technical/component-spec.md` (line 86) so it is documented before any reuse.
- **Reuse Path for Session 04:** The same `ImageModal` component can be reused for `CaseStudyCard` images if the case study images benefit from the same full-resolution inspection pattern. No extra component is needed; `CaseStudyCard` only needs to import `ImageModal` and wire it to its image button (same pattern as `ProductCard`).

## Status: Session 03 Complete (All Visual Refinement Verified)

## Session 04: StatsRow Hooks Violation & Fix
- **Bug:** `StatsRow.tsx` called `useMotionValue()` inside `.map()` inside `useMemo()` — a React Hooks Rules violation. Hooks must be called at the top level of a component body, not inside loops, conditions, or nested callbacks. This caused a runtime crash ("object is not iterable") in the browser console, which `tsc --noEmit` does not catch.
- **Fix (approach a — standard pattern):** Split StatsRow into a parent `StatsRow` component (maps over data) and an `AnimatedStat` child component. Each `AnimatedStat` calls `useMotionValue`, `useInView`, `useTransform`, and `useEffect` exactly once at its own top level. The parent only maps data to children. This maintains hook order consistency across renders.
- **Verification (new standard applied):** `tsc --noEmit` passes with 0 errors + `npm run build` completes cleanly + dev server console shows 0 errors / 0 warnings when scrolled to StatsRow section.

## Session 04: Verification Standard Updated
- **Previous standard (incomplete):** `tsc --noEmit` clean OR visual check sufficient.
- **Updated standard (effective immediately):** Verified requires ALL THREE: (1) `npx tsc --noEmit` = 0 errors, (2) `npm run build` clean, (3) Dev server console shows zero errors and zero warnings when the component's hooks trigger (e.g., scroll-triggered animation for StatsRow Pattern 4, hover interactions for CaseStudyCard Pattern 3).
- **Justification:** The StatsRow React Hooks violation passed `tsc` but crashed at runtime. TypeScript does not verify React hook execution order. Browser console must be checked.

## Session 04: Case Study Image Filename Standardization
- **Observation:** Three spelling variants appeared across sources for the hospital case study:
  - "Sanjivani Hospital" in `content-brief.md` (Case Studies summary) and case-study body
  - "Sanjeevni Hospital" in the client list of `copy-case-studies.md`
  - Actual image filename: `Sanjeevani_Hospital.jpg` in `assets/site/images/`
- **Decision:** Standardized on "Sanjeevani Hospital" everywhere (case-study body and client list) based on the actual supplied image filename being the most likely accurate source. Updated:
  - `docs/01-content/copy-case-studies.md`: changed case-study heading from "Sanjivani Hospital" to "Sanjeevani Hospital"
  - `docs/01-content/copy-case-studies.md`: changed client list entry from "Sanjeevni Hospital" to "Sanjeevani Hospital"
- **Logging:** This decision resolves the Known Open Item regarding inconsistent spelling (see `AGENTS.md` item 5) by using the filename as the authoritative source.
- **Image Treatment Confirmed (user direct inspection):** Both case study photos (Chouksey Engineering College, Sanjeevani Hospital) show building exterior/facade with no visible security equipment. Per the conditional logic approved: NO ImageModal enabled for either CaseStudyCard. Images display plain, well-cropped.

## Session 04: StatsRow Content Correction
- **Issue:** The "600+ Cameras" stat was incorrectly included in StatsRow as a company-wide figure
- **Correction:** Removed the stat as it belongs exclusively to the Chouksey Engineering College case study
- **Reasoning:** StatsRow should represent company-wide statistics only; case-study-specific metrics belong in their respective case study content
- **Files updated:**
  - src/lib/content/stats.ts (new file with 3 company-wide stats)
  - app/page.tsx (import stats from content file instead of inline array)
  - src/components/sections/StatsRow.tsx (styling and layout updates)
  - docs/04-process/decisions.md (this entry)

## Session 04: StatsRow Section Spacing Correction
- **Issue:** The StatsRow outer container had no section-level vertical padding after the first spacing pass, causing its content block to sit too close to the top of its background band.
- **Diagnosis:** B2BSection and CaseStudies use `py-24` (96px top and bottom). StatsRow's outer container must carry its own section padding; internal `pt-4` on each stat does not create spacing from the background-band boundary.
- **Correction:** Added `py-12` to StatsRow's outer container after testing `py-24` (96px combined gap with adjacent sections) and `py-16` (80px combined gap). Final `py-12` produces a 96px combined gap on both sides (48px StatsRow + 48px adjacent section).
- **Verification:** The user visually confirmed the final `py-12` spacing looks good; no further spacing changes are needed.

## Session 04: Resource Preload Warnings (Non-Blocking)
- **Observation:** DevTools console shows multiple yellow "resource preloaded but not used" warnings for product images (wifi-camera, burglar-alarms, audio) and a Next.js static chunk.
- **Root Cause Analysis:** These warnings originate from Session 02's Product Grid implementation where `<Image>` components may have `priority` set or preload links added for images that are below the initial viewport.
- **Decision:** Flag as a known non-blocking item explicitly reserved for Session 08 (performance audit). Do not attempt piecemeal fixes now, as addressing image loading strategy requires a project-wide audit in Session 08 to avoid scope creep into already-closed sessions.
- **Verification:** Confirmed these warnings are pre-existing and not introduced by Session 04's own components (StatsRow, CaseStudies, Partnerships), which show zero red errors and zero React Hooks warnings in DevTools console.

## Session 04: B2B Section Visual Decision
- **Decision:** Keep B2BSection as text-only at all breakpoints (no supporting visual).
- **Reasoning:** During Session 03, the user approved a text-only B2B section after confirming no suitable image was sourced for it. The two-column desktop layout in `responsive-rules.md` and `component-spec.md` is stale and reflects an earlier assumption. The component is intentionally single-column to match the approved content.
- **Files updated:** 
  - docs/02-design/responsive-rules.md (updated to reflect single-column at all breakpoints)
  - docs/03-technical/component-spec.md (should be updated to remove two-column expectation)

## Session 06: Pattern 6 (Scroll-Linked Showcase) In Scope
- **Decision:** Pattern 6 (scroll-linked showcase) — optional per `motion-guide.md` line 38 — is in scope for Session 06, to be built for the Product Suite section.
- **Justification:** Confirmed with user before defining full Session 06 scope (skeleton file `session-06.md` depends on Sessions 01-05 being complete; Pattern 6 is the single optional moment to be added, not applied broadly).
- **Note:** Implementation approach (single visual property mapped to scroll progress 0→1 via `useScroll` + `useTransform`) to be defined with user (Kewal) before Phase 2 Plan is finalized.

## Session 05: Contact + Footer — No Form Decision
- **Decision:** No contact form — phone is the primary and only contact channel, based on real customer behavior (customers call directly; form submissions would go unread).
- **Justification:** Aligns with actual user behavior and reduces complexity; contact section now displays phone numbers with tel: and WhatsApp links, retains embedded Google Map, and adds Google Business Profile link.
- **Files updated:**
  - docs/01-content/content-brief.md (added Service phone line)
  - docs/01-content/contact.md (new file with finalized contact copy and layout)
  - docs/04-process/decisions.md (this entry)
  - src/components/sections/ContactSection.tsx (new component replacing ContactForm)
  - src/components/sections/Footer.tsx (verified address+phones only)
  - app/page.tsx (wired new ContactSection)


## Session 08 — Scope Decision (before planning)
- **Decision:** Session 08 scoped as a full SEO/performance pass — Lighthouse audit, image optimization, sitemap.xml/robots.txt, Core Web Vitals — not just closing the narrow flagged gaps in `seo-meta.md`. Both the flagged gaps (Part 1) and the broader audit (Part 2) are in scope.

## Session 08 — Pincode Resolution (before structured data finalization)
- Pincode: 495001 (Bilaspur, Chhattisgarh) — confirmed for structured data.

## Session 09: Mobile Nav Dropdown Decision
- **Decision:** Mobile nav menu changed from full-screen overlay to a smaller dropdown panel — full-screen was the original spec but Kewal found it too heavy-handed after seeing it live.
## Session 08/09: Pattern 6 (ScrollShowcase) Removed
- Decision: Pattern 6 (ScrollShowcase) removed entirely — decided it didn't fit the site's current content, and the Product Grid cards already serve the intended visual purpose. Built in Session 06/07, removed in Session 08/09.

## Retroactive Log — Motion Consistency Audit (work done 2026-09-12, logged 2026-09-17)
- **Context:** This work was performed in an unlogged, non-session-numbered pass on
  2026-09-12 (~15:44–16:03), documented at the time only in now-deleted root-level
  `PHASE_2_PLAN.md` / `PHASE_2_COMPLETION_SUMMARY.md`. It never went through the normal
  Explore → Plan → Implement → Verify session process and was never logged here. It is
  being reconstructed and logged now, after the fact, so the decision history is accurate.
- **StaggerContainer.tsx:** Added the `[0.16, 1, 0.3, 1]` easing curve to
  `itemVariants.show.transition` (previously missing), bringing all `StaggerContainer`
  consumers (e.g. `ProductGrid.tsx`) in line with `motion-guide.md`'s Section Reveal spec.
- **CaseStudies.tsx:** Converted from a mount-triggered animation to scroll-triggered
  (`whileInView`, `viewport={{ once: true, margin: '-100px' }}`); added `useReducedMotion`
  with reduced-motion variants; moved the per-card stagger into the transition `delay`
  (`index * 0.08`) so it degrades correctly under reduced motion.
- **ContactSection.tsx:** Added the missing `y: 20 → 0` translate to `containerVariants`
  (previously opacity-only), matching the Section Reveal pattern.
- **Footer.tsx:** Added `useReducedMotion` with reduced-motion variants, the
  `[0.16, 1, 0.3, 1]` easing curve, and scroll-triggered `whileInView`/`viewport`
  (matching `CaseStudies.tsx`). Note: the `whileInView`/`viewport` portion was lost at
  some point between 2026-09-12 and 2026-09-13 — likely collateral damage from the
  Session 10 language-toggle rollback, which bulk-touched `Footer.tsx`, `CaseStudies.tsx`,
  and `ContactSection.tsx` simultaneously on 2026-09-13 20:14:32 without an accompanying
  decisions.md update. It was restored on 2026-09-17 as part of this reconciliation.
- **ScrollShowcase.tsx:** Was also rebuilt during this same 2026-09-12 pass, but was
  subsequently removed entirely — already accurately logged under "Session 08/09: Pattern 6
  (ScrollShowcase) Removed" above. No further action needed for it here.

## Session 10: Discovered Bug (Out of Scope) — Mobile Type-Scale Override Never Applies
- **Discovery context:** Found while verifying the `text-size-adjust` fix on a real mobile
  viewport (Session 10, language-toggle work) — unrelated to i18n, pre-existing since
  whenever `design-system.md`'s mobile type scale was implemented (Session 01/02 era).
- **Bug:** `app/globals.css` defines `--text-hero`, `--text-h1`, `--text-h2`, `--text-h3`,
  `--text-body`, `--text-small` inside a `@theme inline { ... }` block, with a separate
  `@media (max-width: 767px) { :root { --text-hero: 40px; ... } }` block intended to shrink
  these for mobile. Because the tokens are declared `@theme inline` (not plain `@theme`),
  Tailwind v4 inlines the literal desktop value directly into each generated utility class
  (confirmed in compiled output: `.text-hero{font-size:72px}` — a hardcoded number, not
  `font-size:var(--text-hero)`). The mobile media query still correctly redefines the CSS
  custom property on `:root`, but nothing reads that property anymore, so the override has
  no effect. Confirmed via `getComputedStyle` on a real 390px-wide mobile viewport: `h1`
  renders at 72px (the desktop value) instead of the intended 40px.
- **Scope:** Every utility built from these six tokens (`text-hero`, `text-h1`, `text-h2`,
  `text-h3`, `text-body`, `text-small`) is affected site-wide — this is not limited to the
  Hero section. The mobile type scale documented in `design-system.md` has likely never
  actually applied since it was written.
- **Not fixed here:** Out of scope for the Session 10 language-toggle work. Fixing requires
  restructuring the `@theme` block (or an equivalent mechanism that preserves a `var()`
  reference through to the generated utilities) and re-verifying every affected component's
  mobile layout — a separate, dedicated session's worth of work, not a one-line change.

## Session 10: Intentional Hindi Array-Length Mismatch (Not a Bug)
- **Decision:** The Hindi translations for `products.items.cctv.features` and
  `products.items.burglarAlarms.features` intentionally have fewer/differently-grouped
  items than the English versions — Kewal reviewed and decided not to translate "IP, HD,
  PTZ, WiFi cameras" (CCTV) or "GSM, IP, Fire panels" (Burglar Alarms) into the Hindi
  feature list. This is not a bug or incomplete translation — it's a deliberate content
  choice. Do not "fix" this to match English array length in any future session without
  checking with Kewal first.

## Session 11: Discovered Bug (Out of Scope, Confirmed) — Sitewide Hydration Mismatch for `prefers-reduced-motion` Users
- **Discovery context:** Found while verifying Increment 3's Framer Motion crossfade
  (`ProductShowcase.tsx`) under a real emulated `prefers-reduced-motion: reduce` browser
  setting. Reproduced against the dev server with full (non-minified) React error output
  to confirm scope before writing this entry — this is not speculation, it's a captured
  stack trace.
- **Bug:** Every component that calls Framer Motion's `useReducedMotion()` and branches
  its animation props on the result (`shouldReduceMotion ? {...} : {...}`) hydration-
  mismatches for any visitor who already has OS-level "reduce motion" enabled *before*
  the page loads. Root cause: `useReducedMotion()` reads `window.matchMedia` synchronously
  on the very first client render; Next.js SSR has no `window` at all and always renders
  assuming no preference (the non-reduced, animated variant). A real visitor whose browser
  already reports `true` on first paint gets a client render that disagrees with the
  server-rendered HTML, and React logs "Hydration failed... this tree will be regenerated
  on the client" and discards/re-renders the affected subtree.
- **Confirmed scope (from an actual captured hydration diff, not inference)**: `Navbar.tsx`
  (`motion.header`'s scroll-based padding/background/blur styles), `Hero.tsx` (the scan-line
  effect and the entire hero-load stagger sequence — eyebrow/headline/subheadline/CTAs/
  supporting line), `Reveal.tsx` (used by TrustPillars, CaseStudies, B2BSection, ProductGrid
  section intros), `StaggerContainer`/`StaggerItem` (TrustPillars badges, ProductGrid cards),
  and `Partnerships.tsx`'s marquee-vs-static-fallback branch. This is not a short list — it's
  effectively every scroll/load animation on the page. `ProductShowcase.tsx`'s new crossfade
  (built this session) exhibits the identical pattern and appeared in the same diff, but it
  *inherited* the site's existing approach rather than introducing a new failure mode.
- **Practical impact**: end state is still functionally correct after React's automatic
  recovery (the "tree will be regenerated" — verified: `ProductShowcase`'s reduced-motion
  transition settles to the correct instant/no-translate state), but every affected visitor
  gets a console error and a wasted extra client-side render pass on first load, sitewide.
  This is a real, user-facing correctness gap for an actual accessibility-conscious user
  segment (anyone with OS-level reduce-motion on), not just console noise.
- **Not fixed here:** Confirmed sitewide and pre-existing (predates Session 11 entirely —
  Navbar/Hero/Reveal were never touched this session). Fixing requires either gating every
  `useReducedMotion()`-branched animation so its *initial* render always matches what SSR
  produces (e.g. only applying the reduced-motion branch after a mount-gated flag flips, or
  switching to a CSS-`@media (prefers-reduced-motion)`-driven approach for static states),
  or auditing and updating every one of the affected components individually — a dedicated
  session's worth of work across many files, not an Increment 3 fix.
- **What Increment 3 did fix, within its own scope:** `ProductShowcase.tsx`'s crossfade now
  uses `duration: shouldReduceMotion ? 0.01 : 0.3` (matching `Hero.tsx`'s exact existing
  `0.01`-for-reduced-motion convention, not just omitting the y-translate), and
  `ProductShowcaseImage.tsx`'s active/inactive scale treatment gained
  `motion-reduce:scale-100` (matching `ProductCard.tsx`'s existing
  `motion-reduce:hover:scale-100` convention) so only opacity changes under reduced motion,
  never scale.

## Session 11: Scroll-Synced Product Showcase — Final Architecture
- **Decision:** Replaced desktop's Product Grid with a two-column "scrollytelling" layout
  (left column: 9 scrolling product images; right column: a sticky detail panel that
  crossfades as the active product changes). Mobile keeps the original grid completely
  unchanged, split via the site's existing `lg:` (1024px) breakpoint convention.
- **Component architecture:** `ProductGrid.tsx` now resolves all product text via `t()`
  exactly once into a single `resolvedProducts` array, then renders `lg:hidden` (the
  untouched original grid, via the untouched `ProductCard.tsx`) and `hidden lg:block`
  (the new `ProductShowcase.tsx`) from that same array — no duplicated translation
  lookups between the two layouts. New files: `src/components/sections/ProductShowcase.tsx`
  (scroll-sync state + sticky panel) and `src/components/ui/ProductShowcaseImage.tsx`
  (per-image click-to-expand button, mirroring `ProductCard`'s existing `ImageModal` trio
  exactly).
- **Active-image detection:** one `IntersectionObserver` per row (`rootMargin: '-45% 0px
  -45% 0px', threshold: 0`), tracking the full set of currently-intersecting rows and
  deterministically choosing the lowest index among them (rather than "whichever observer
  fires last") — rows are tall (`min-h-[70vh]`) enough that more than one can intersect
  the center band simultaneously in edge cases.
- **Detail panel transition:** `AnimatePresence` (`mode="wait"`) crossfade reusing
  motion-guide.md's existing opacity+translateY vocabulary (0.3s, `[0.16,1,0.3,1]`),
  dropping to `0.01s` and no translate under reduced motion (matching `Hero.tsx`'s
  existing convention).
- **Active/inactive image treatment:** `opacity-100 scale-100` active, `opacity-40
  scale-95` inactive, `motion-reduce:scale-100` (matching `ProductCard.tsx`'s existing
  hover-scale reduced-motion pattern).
- **Verification results:** real natural-scroll test confirms the detail panel and active
  image stay in perfect sync through all 9 products in order, correctly clamping at the
  last product past the end of the section. Hindi mode confirmed working throughout
  (detail panel text, image alt text, and `ImageModal`'s own close-button label all
  translate correctly). `ImageModal` confirmed working unchanged on the new layout.
  Mobile confirmed byte-identical to the pre-Session-11 grid. Lighthouse desktop
  performance: 100/100, CLS 0 — the new `min-h-[70vh]` rows and sticky panel introduce
  no layout shift.
- **Discovered but out of scope:** a sitewide pre-existing hydration mismatch for
  `prefers-reduced-motion` users, logged in detail immediately above this entry.

## Session 12: Full-Bleed Hero Carousel with Text Overlay
- **Decision:** Redesigned Hero from a two-column layout (text left, bordered carousel box
  right) into a full-bleed background carousel with text overlaid on a readable gradient,
  on both desktop and mobile — replacing mobile's separate stacked layout entirely.
- **Layout mechanism:** `Carousel` now renders as an `absolute inset-0` background layer.
  The text column keeps its existing width by leaving `grid lg:grid-cols-2` in place and
  simply deleting the second grid child — CSS Grid still allocates two 50% column tracks
  from the container's own `grid-cols-2` regardless of child count, so the text column's
  width is measurably identical to before (verified: text's right edge sits at a constant
  47-48% of viewport width across 1024-1920px, since `max-w-7xl` caps the two-column split
  once the container hits its cap).
- **Header offset:** `Hero.tsx`'s `pt-36 lg:pt-[104px]` (144px mobile / 104px desktop) was
  leftover spacing from the old stacked mobile layout, not a real requirement — Navbar +
  LanguageBar measure 104px on both breakpoints (`top-8` + `min-h-[72px]` + no `lg:`
  variant). Flattened to a single `pt-[104px]`.
- **Gradient values, desktop** (`linear-gradient(to right, rgba(10,10,10,.90) 0%,
  rgba(10,10,10,.90) 50%, rgba(10,10,10,0) 78%)`): solid through 50% covers the measured
  worst-case text-right-edge (48.3%) with margin at every desktop width; fades to clear by
  78% for a smooth ~28-percentage-point blend, not a hard edge.
- **Gradient values, mobile** — NOT a top/bottom split (real measurement showed text
  already spans the full available width at mobile sizes, with Hindi wrapping to more
  lines than English, ruling out a left-right split; and the text block is vertically
  *centered*, not edge-anchored, ruling out a one-directional top-or-bottom split too).
  Used a symmetric vertical vignette instead: `linear-gradient(to bottom,
  rgba(10,10,10,0) 0%, rgba(10,10,10,.90) 15%, rgba(10,10,10,.90) 85%,
  rgba(10,10,10,0) 100%)`. Measured full text-block height at mobile widths (43% of
  viewport in English, 48% in Hindi worst-case) centered in the section places the text's
  real occupied range at 26-74% of viewport height — fully inside the gradient's 15-85%
  solid zone, with margin on both sides.
- **Dot legibility:** wrapped the existing dot row in a `bg-[rgba(10,10,10,0.55)]
  backdrop-blur-md` pill, self-contained so it doesn't interact with either gradient's
  orientation.
- **Placeholder images:** no real photography exists yet, and no placeholder asset existed
  anywhere in the repo either. Generated 4 neutral images (`public/images/hero-placeholder-
  {1-4}.jpg`) via `sharp` (already a transitive dependency, no new package added): abstract
  diagonal/radial gradients using the site's existing dark palette tokens plus a
  low-opacity accent-teal glow, with no baked-in placeholder text. Radial gradients
  rendered with visible banding at these very subtle opacity ranges; `resvg` (sharp's SVG
  renderer) has incomplete `<filter>`/`feTurbulence` support, so dithering was done as a
  raw-buffer pixel-noise post-process instead of an SVG filter, then saved as JPEG (the
  noise defeats PNG compression — ~1.2MB PNG vs ~80KB JPEG per image).
  `CarouselSlide` dropped `label`/`backgroundClass` for a required `image` field, and
  `Carousel.tsx` always renders via `next/image fill object-cover` unconditionally — no
  gradient-div fallback path — so swapping in real photos later is a pure `hero.ts` path
  edit with zero component changes.
- **i18n:** image `alt` text uses a new `hero.carouselImageAlt` key (translated, generic,
  reused across all slides since they're interchangeable imagery) passed as a prop from
  `Hero.tsx` into `Carousel.tsx`, following the same pattern already established for
  `ariaLabel` — not hardcoded English, not left undefined.
- **Regression found and fixed during verification:** the text column's wrapper is `w-full`
  and stacked at `z-10` above the carousel — even though most of its box is visually empty
  (no second grid child anymore), that empty space still captured pointer events by
  default, silently breaking the carousel's hover-to-pause behavior everywhere except
  directly over the `z-20` dots. Caught via a Playwright hover test that timed out with
  "subtree intercepts pointer events." Fixed with `pointer-events-none` on the text
  wrapper and `pointer-events-auto` on the two CTA links.
- **Verified:** real screenshots at desktop (1440px)/tablet (820px)/mobile (390px), both
  languages; all 4 slides individually checked for text readability against their actual
  gradient blob position; auto-advance, click-to-jump, pause-on-hover (including hovering
  empty space with no visible text), and CTA/phone-link clickability all confirmed working
  post-restructure. `tsc --noEmit` and `npm run build` clean throughout all 3 increments.
- **Known pre-existing, not introduced here:** the sitewide `useReducedMotion()` hydration
  mismatch (logged in the Session 11 entry above) also surfaces in `Hero.tsx`/`Carousel.tsx`
  now, since they use the same hook — confirmed via a `reducedMotion: 'reduce'` Playwright
  context, same React error #418 as already documented, not a new failure mode.

## Session 13: Interactive Scattering Light Burst
- **Decision:** Added a purely decorative canvas visual — ~160 lines radiating from
  bottom-center, bending/scattering away from the pointer or finger, six selectable
  themes swapping the background gradient and line/dot colors. Placed between `StatsRow`
  and `CaseStudies` in `page.tsx`, with no wrapping `bg-primary`/`bg-secondary` div — the
  canvas's own theme gradient replaces the alternating-background convention entirely for
  this one section.
- **Component:** `src/components/sections/LightBurst.tsx` (named + default export,
  matching `CaseStudies.tsx`'s pattern), theme data in
  `src/lib/content/light-burst-themes.ts` as a plain constants array — deliberately not
  mapped to the site's semantic design tokens, since this is a separate decorative
  palette per the confirmed design.
- **Dynamic import with `ssr: false`:** Next's App Router refuses `ssr: false` inside a
  Server Component, and `page.tsx` has no `'use client'`. Rather than making the whole
  page a client component, added a small `LightBurstLoader.tsx` client wrapper that holds
  the `dynamic(() => import('./LightBurst'), { ssr: false })` call, imported directly (no
  further `dynamic()` needed) from `page.tsx`. This is a deliberate departure from the
  `CaseStudies`/`Footer` dynamic-import precedent (neither sets `ssr: false` — they're
  code-split but still SSR'd); justified here because canvas/RAF/IntersectionObserver
  setup is entirely client-only with zero server-renderable output.
- **Refs-only RAF architecture:** line state (angle, base length, phase, offset,
  velocity), pointer position, and the active theme are all mutable refs, never React
  state — the RAF loop never triggers a re-render. Only the active theme *index* is React
  state (drives which pill button shows selected); the long-lived RAF loop reads the
  current theme via a ref (`themeIndexRef`) kept in sync by a separate one-line effect,
  so clicking a theme button doesn't tear down and recreate the canvas/context/observer —
  confirmed via a wrapped `requestAnimationFrame` call counter (continuous native
  scheduling, not React-render-driven) and confirming the canvas DOM node's identity
  survives a theme click (no remount).
- **IntersectionObserver:** single element (the section root), single
  `entry.isIntersecting` boolean, `rootMargin: '200px'` — not `ProductShowcase.tsx`'s
  multi-row center-band pattern, which solves a different problem (which of many rows is
  active) that doesn't apply to a single always-either-visible-or-not decorative section.
  Going off-screen doesn't just skip drawing a frame: the loop's next scheduled call
  checks the in-view flag and returns without calling `requestAnimationFrame` again,
  actually stopping the chain; the observer callback restarts it. Verified via
  `canvas.toDataURL()` byte-identity checks: static while scrolled away, changing again
  once scrolled back.
- **Reduced motion:** `useReducedMotion()` (framer-motion, matching Hero/CaseStudies/
  Footer's existing convention) is checked before any pointer listener, observer, or
  `requestAnimationFrame` call is made — the static branch draws exactly one frame (no
  sway) and never starts the loop, rather than starting and immediately stopping it. The
  effect depends on `[shouldReduceMotion]` so a live OS-preference toggle mid-visit
  correctly rebuilds into the right branch. Verified via `canvas.toDataURL()`:
  byte-identical across a 1.5s window under `reducedMotion: 'reduce'` — genuinely zero
  animation, not just slow. The React error #418 seen in this mode is the same
  pre-existing sitewide hydration mismatch already logged above, not a new failure mode.
- **Touch handling:** pointer tracked via the unified Pointer Events API
  (`pointermove`/`pointerleave`/`pointercancel`) rather than separate `mousemove`+
  `touchmove` listeners — confirmed with the user as the modern equivalent, since
  `pointermove` fires identically to `touchmove` on touch devices. No `preventDefault()`
  anywhere in the handlers and no `touch-action` override, verified two ways: computed
  `touch-action` on the canvas is `"auto"`, and a dispatched cancelable `PointerEvent`'s
  `defaultPrevented` is `false` after the handler runs.
- **Icons:** no icon library exists anywhere in this project (checked). The six theme
  icons are hand-drawn inline SVGs matching every other icon's existing stroke convention
  (24x24 viewBox, `stroke="currentColor"`, `strokeWidth="2"`, round caps/joins) rather
  than adding a new dependency for six static icons.
- **Theme picker UI:** reuses `Button`'s existing `primary`/`secondary` variants directly
  for selected/unselected state — no new button styling introduced. `cn()`'s
  `tailwind-merge` usage lets a `className="px-4 py-2"` override reliably win over
  `Button`'s default `px-6 py-3` padding, confirmed before relying on it.
- **Performance:** a controlled before/after Lighthouse mobile comparison (same machine,
  same Lighthouse invocation, `LightBurst` temporarily removed from `page.tsx` for the
  "without" run) isolated its actual cost: −3 performance points, +110ms Total Blocking
  Time, CLS unchanged at 0 in both runs. The full session (with LightBurst) scored 80 vs.
  Session 08's documented baseline of 87, but the isolated "without LightBurst" run on
  this same environment scored 83 — meaning roughly 4 of those 7 points are pre-existing
  environment/Lighthouse-version variance unrelated to this session, and about 3 points
  are LightBurst's genuine, modest cost. Not optimized further here (e.g. deferring the
  dynamic import itself until scroll-proximity, not just pausing the RAF post-mount) since
  that wasn't part of the agreed plan — flagged as a possible future increment if tighter
  performance is wanted.
- **i18n:** six theme labels under `interactiveBurst.themes.*` in both `en.json`/
  `hi.json`, resolved via `t()` — confirmed no raw/unresolved key strings visible in
  either language.
- **Verified:** all 6 themes render with correct colors on both desktop/tablet/mobile;
  real pointer-move interaction shows lines bending away from the cursor with
  proportionally larger tip dots, then springing back once the pointer leaves; the same
  scatter behavior confirmed via a dispatched `PointerEvent` with `pointerType: 'touch'`
  on a mobile viewport; canvas resizes correctly (buffer width recalculated as
  `clientWidth * dpr`) after a real viewport resize, no stretching/distortion.

## Post-Session 13 note: LightBurst theme palette redesign
LightBurst theme palette redesigned for 5 of 6 themes (Pre-dawn, Sunrise, Dusk, Sunset,
Night) — original palette had too much overlap (Sunrise/Sunset shared near-identical gold
line color, Pre-dawn/Dusk/Night all leaned on similar dark purple-blue). New palette gives
each theme a distinct hue family and brightness range. Daytime kept unchanged as the
default. Iterated and approved via visual prototyping before implementation.

Verified via direct canvas pixel sampling (`ctx.getImageData()` at the gradient's top and
bottom, not just visual inspection) that all 6 themes render the exact specified hex
values, and that Daytime is pixel-identical to its pre-existing values. Confirmed no
leftover old hex values anywhere in the codebase via grep.
