# Session 12 — Full-Bleed Hero Carousel with Text Overlay

**Status:** Detailed, decisions confirmed with Kewal — ready for Explore phase.

**Role:** Builder — significant visual redesign of the site's most prominent, most
heavily-iterated section. Full Explore → Plan → Implement → Verify discipline.

**Blocked by:** Session 11 complete.

## Session goal

Redesign the Hero section from its current two-column layout (text left, bordered
carousel box right) into a full-bleed background image carousel with the text content
overlaid directly on top of the image, in a readable dark-gradient area.

## Reference / intent (from Kewal's sketch)

- The carousel image expands to fill the ENTIRE hero width, edge-to-edge horizontally.
- A dark gradient sits over the LEFT portion of the image, where the existing text
  content (eyebrow, headline, subheadline, CTAs, supporting line) sits — readable against
  the darkened area.
- The gradient transitions/blends into the image's actual visible content toward the
  right side — not a hard edge, a smooth blend (matching the "green lines" transition
  zone in Kewal's sketch).
- Keep: the exact same slide/crossfade transition effect already built, and the same
  clickable dot indicators (redesigned in an earlier session — outline circles, active
  one fills).

## Confirmed decisions

- **Header clearance:** the full-bleed image starts BELOW the fixed header stack
  (Navbar + LanguageBar, 104px), not behind/underneath it. This avoids needing a
  dynamically-transparent navbar and the contrast risk that comes with it. (Kewal
  delegated this call; flagged here as a judgment call, not a hard requirement — can
  revisit if the result doesn't look striking enough.)
- **Full-bleed scope:** applies on BOTH desktop and mobile — this replaces mobile's
  current separate stacked layout (text block on top, boxed carousel below) entirely.
  This is a bigger structural change than it sounds; see open item below.
- **Dots:** must remain clickable and legible regardless of what's visually under them
  (image content varies) — likely needs their own subtle backing/vignette for contrast,
  not just floating raw over any image content.

## To detail before implementation (resolve in Plan phase)

- **Gradient orientation on mobile:** the desktop sketch shows a LEFT-side dark gradient
  transitioning to visible image on the right. On mobile's much narrower viewport, this
  same ratio may not leave enough readable width for the text block. Propose whether
  mobile should use the same left-right split, a top-bottom split (gradient at top or
  bottom, image visible in the other region), or a different treatment entirely — and
  justify the choice based on actual text length/wrapping at real mobile widths, not
  just visually guessing.
- **Gradient exact values:** propose specific CSS gradient stops (colors, opacity,
  percentage positions) rather than a vague "dark fading to clear" — should reuse the
  site's existing color tokens (--color-bg-primary, etc.) for the dark end.
- **Text readability across different slide images:** since each slide has a different
  image, the gradient must guarantee text readability regardless of which slide is
  active — confirm the gradient is strong/opaque enough at the text's exact position to
  guarantee this, not just "usually work."
- **Dot indicator placement and legibility fix:** propose the specific treatment (e.g. a
  small bottom vignette, a semi-opaque pill background behind the dot row) to keep dots
  visible over any image content.
- **Existing carousel logic preservation:** confirm the crossfade/slide transition
  mechanism itself (already built, previously debugged extensively across Sessions 01/07)
  is being reused as-is, with only the visual container/sizing changing — not rebuilt
  from scratch.

## Phase: Explore

- Read the current Hero.tsx and Carousel.tsx in full.
- Confirm current header-offset values (104px) still apply correctly as the clearance
  point for the full-bleed image.
- Research standard patterns for "full-bleed background carousel with readable text
  overlay" (this is an extremely common hero pattern — confirm implementation approach
  using next/image's `fill` prop or an absolutely-positioned background image technique).
- Check current placeholder slide content (still "Slide N — Pending" per the long-standing
  open item) — confirm this redesign works correctly with placeholder content and will
  automatically look right once real photos are added later.

## Phase: Plan

- Present the exact layout structure, gradient CSS values, mobile-specific treatment,
  and dot-legibility fix.
- Wait for explicit "approved" before implementing.

## Phase: Implement

- Reviewable increments, each committed once verified.

## Phase: Verify

- Real screenshot verification at multiple viewport widths (desktop, tablet, mobile).
- Confirm text remains readable against the gradient on every slide.
- Confirm dots remain clickable and legible.
- Confirm existing carousel behavior (auto-advance, click-to-jump, pause-on-hover,
  reduced-motion) all still work correctly — this is a visual/layout change, not a
  logic change, so nothing here should regress.
- Hindi-mode check (text overlay must work correctly with Hindi text too, which may wrap
  differently).

## On completion

- Log final decisions in `docs/04-process/decisions.md`, update `docs/status.md`.