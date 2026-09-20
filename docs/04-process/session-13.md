# Session 13 — Interactive Scattering Light Burst

**Status:** Detailed, visual design finalized via prototyping — ready for Explore phase.

**Role:** Builder — new, fairly involved feature (canvas animation, real-time pointer
interaction, theming). Full Explore → Plan → Implement → Verify discipline.

**Blocked by:** Session 12 complete.

## Session goal

Add a purely decorative, playful interactive canvas visual — a radiating "light burst"
of lines from a base point that bend/scatter away from the user's cursor or finger, with
a small dot at the tip of every line, and a 6-option theme picker that swaps the
background gradient and line/dot colors. No business meaning, no real data — pure
delight, inspired by (not copied from) stripe.com/in's homepage hero visual.

**Placement:** inside the same content block as the B2B section ("Designed for Builders,
Architects & Interior Designers") and the StatsRow, positioned after both and before the
Case Studies section.

## Confirmed design (finalized via interactive prototyping — do not redesign)

**Line/burst mechanics** (from the locked prototype):
- ~160 lines, each starting from a shared base point (bottom-center of the canvas),
  radiating outward within roughly a 1.1×π angular spread centered on straight-up.
- Each line's base length randomized between ~90 and ~250px (90 + random×160).
- Idle sway: each line's length oscillates slightly via `sin(time × 0.0009 + per-line
  phase) × 6`, giving gentle constant motion even with no pointer present — MUST be
  disabled entirely under reduced motion (see Accessibility below).
- Scatter physics: when a line's tip comes within 140px of the pointer, it's pushed away
  from the pointer with force `((140 - distance) / 140) × 4.4`, applied as velocity,
  damped each frame by ×0.88 (velocity) and ×0.94 (position offset decay) — creates a
  springy, organic flee-and-settle motion, not an instant snap.
- Each line renders as a quadratic curve (not a straight line) from base to tip, with the
  curve's midpoint offset scaled to the line's current displacement, giving a bent/bowed
  look proportional to how far it's been pushed.
- Line opacity: `min(0.85, 0.3 + displacement × 0.045)`. Line width: `1 + min(1.4,
  displacement × 0.05)`.
- Every line ends in a small filled dot at its tip: radius `1.5 + min(2, displacement ×
  0.06)`, opacity `min(0.9, 0.45 + displacement × 0.06)`.

**Six themes** (background gradient top/bottom stops + line color + dot color):
| Theme | Icon | bg top | bg bottom | line | dot |
|---|---|---|---|---|---|
| Pre-dawn | cloud-moon | #26215C | #042C53 | #AFA9EC | #CECBF6 |
| Sunrise | sunrise | #D85A30 | #4A1B0C | #FAC775 | #FAEEDA |
| Daytime | sun | #85B7EB | #0C447C | #E6F1FB | #FFFFFF |
| Dusk | sunset-2 | #712B13 | #26215C | #ED93B1 | #F4C0D1 |
| Sunset | sunset | #993C1D | #4B1528 | #FAC775 | #F0997B |
| Night | moon | #042C53 | #04342C | #5DCAA5 | #9FE1CB |

Default theme on load: Daytime.

**Theme picker UI:** a row of pill buttons, one per theme, each with an icon + label,
positioned above the canvas. Selecting one instantly swaps the canvas's gradient and line/
dot colors (no transition/crossfade needed — instant swap, matching the prototype).

## Confirmed technical/UX decisions

- **Touch behavior:** the canvas must NEVER block page scrolling. Track touch position via
  `touchmove` for the reactive effect, but do NOT call `preventDefault()` and do NOT set
  `touch-action: none` — the page must scroll completely normally even while a finger is
  moving across the canvas.
- **Reduced motion:** for `prefers-reduced-motion: reduce`, render a static frame (lines at
  their base, unshifted positions, no idle sway, no RAF loop running at all) — no
  continuous animation of any kind for users who've opted out of motion, consistent with
  this project's established reduced-motion convention (Hero, CaseStudies, Footer, etc.).
  Pointer-reactivity should also be disabled in this mode — a static decorative illustration
  is the correct reduced-motion fallback here, not a partially-animated version.
- **Performance:** pause the RAF loop entirely when the section is scrolled out of the
  viewport, using the same IntersectionObserver technique already established in
  ProductShowcase.tsx (Session 11) — this decorative animation must not silently burn CPU/
  battery off-screen, and must not regress Session 08's hard-won mobile Lighthouse score.
- **Responsive sizing:** canvas must resize correctly on window resize/orientation change
  (the prototype only sized once on mount — production needs a real resize listener,
  recalculating canvas dimensions and DPR-scaled context).
- **SSR safety:** canvas/window/document access must be properly client-side only,
  following this project's established pattern (e.g. LanguageProvider's "use client" +
  effect-only DOM access) — no repeat of Session 10's SSR crash class of bug.
- **i18n:** the six theme labels ("Pre-dawn," "Sunrise," etc.) must go through
  translation per Session 10's convention — add a new key group (e.g.
  `interactiveBurst.themes.*`) to both en.json and hi.json. This is a decorative feature
  name, not a proper noun — it should translate.
- **Colors:** the theme gradient/line/dot hex values above are intentionally NOT mapped to
  the site's semantic design tokens (--color-accent, etc.) — this is a deliberately
  separate, multi-themed decorative palette. Store these as a plain constants object, not
  as new global CSS custom properties.

## Phase: Explore

- Read the current B2B section and StatsRow components to confirm exact placement point.
- Confirm current IntersectionObserver usage pattern from ProductShowcase.tsx for reuse.
- Confirm current reduced-motion pattern (useReducedMotion hook usage) for reuse.
- Research canvas + React best practices for this project's Next.js App Router setup
  (client component boundaries, avoiding unnecessary re-renders during the RAF loop —
  the loop should mutate canvas directly, not trigger React re-renders per frame).

## Phase: Plan

- Present the component architecture (new component name/location), exact integration
  point in the page composition, and how all the "confirmed technical/UX decisions" above
  get implemented concretely.
- Wait for explicit "approved" before implementing.

## Phase: Implement

- Reviewable increments (e.g., static canvas + theme picker UI first, then pointer
  reactivity, then IntersectionObserver pause + reduced-motion handling, then resize
  handling + i18n) — each committed once verified.

## Phase: Verify

- Real interaction testing (not just visual screenshots): confirm pointer/touch reactivity
  actually works smoothly on both desktop and a real mobile viewport.
- Confirm page scrolls freely on mobile even while touching the canvas.
- Confirm reduced-motion mode genuinely shows zero animation (RAF loop confirmed not
  running, via real inspection, not assumption).
- Confirm RAF loop actually pauses when scrolled out of view (real measurement).
- Confirm no Lighthouse mobile performance regression from Session 08's baseline.
- Confirm all 6 themes render correctly, and theme labels translate correctly in Hindi.

## On completion

- Log final architecture and decisions in `docs/04-process/decisions.md`.
- Update `docs/status.md`.