# Session 11 — Scroll-Synced Product Showcase (Scrollytelling Layout)

**Status:** Detailed, decisions confirmed with Kewal — ready for Explore phase.

**Role:** Builder — new feature, full Explore → Plan → Implement → Verify discipline.

**Blocked by:** Session 10 complete.

## Session goal

Replace the current desktop Product Grid with a scroll-synced two-column layout
(inspired by Framer's own marketing site pattern), matching Stripe/Linear-style
"scrollytelling" sections. Mobile keeps its existing grid layout unchanged.

## Confirmed decisions

- **Layout:** LEFT column = scrolling stack of product images (one per product, 9
  total). RIGHT column = a static/sticky details card (title, tagline, features,
  use cases) that stays fixed in the viewport while the page scrolls.
- **Interaction:** as the user scrolls and a different product image becomes the
  "active" one on the left (centered/in view), the right-side details card updates
  to match that product — a real scroll-driven sync, not independent scrolling.
- **Scope:** this REPLACES the current ProductGrid layout entirely, but ONLY at
  desktop widths. Mobile keeps the current grid exactly as it is today — no changes
  to mobile layout at all.
- **Existing capability to preserve:** the current click-to-expand image lightbox
  (ImageModal, built in Session 03) must keep working on the scrolling images in
  the new layout.

## To detail before implementation (resolve in Plan phase)

- **Active-image detection mechanism:** IntersectionObserver (checking which image
  is most centered/visible) is the standard, well-established approach for this
  pattern — confirm this is what gets used, not a heavier scroll-library dependency.
- **Detail card transition:** how does the right-side card change when the active
  product changes — instant swap, crossfade, or slide? Propose using the project's
  existing Framer Motion conventions (motion-guide.md) rather than inventing new
  timing/easing values.
- **Image visual treatment:** should the non-active images in the left-side stack
  look visually different from the active one (e.g. dimmed/scaled down) to
  reinforce which one is "selected," similar to how Framer's own example
  highlights the active card? Propose a specific, subtle treatment.
- **Scroll height/pacing:** how much vertical scroll distance should each product
  "own" before transitioning to the next? Needs to feel deliberate, not rushed or
  sluggish.
- **Note on prior related work:** Session 06 built and then fully removed a
  simpler scroll-linked component (ScrollShowcase / "Pattern 6") because it had no
  real content and didn't fit. This is a different, more substantial feature with
  real content behind it — it's fine to reuse the underlying scroll-tracking
  technique (useScroll/useTransform or IntersectionObserver) but this should be
  built fresh, not by resurrecting the deleted component.

## Phase: Explore

- Read the current ProductGrid.tsx/ProductCard.tsx implementation in full.
- Research the standard IntersectionObserver-based "scroll-synced sticky panel"
  pattern in a Next.js/React context (this is a well-established pattern — several
  reference implementations exist).
- Confirm how this interacts with the existing i18n wiring (product data now flows
  through translation keys per Session 10 — the new layout must keep using
  useTranslation()/t() correctly, not regress to hardcoded strings).
- Confirm how this interacts with the existing next/image usage and ImageModal
  lightbox from Session 03/08.

## Phase: Plan

- Present the exact component architecture (new component(s), how the sticky
  positioning and scroll-detection work together).
- Present the four "to detail" items above with specific proposed values/behavior.
- Present exactly how mobile is preserved unchanged (e.g. a breakpoint-based
  conditional render of old grid vs. new layout, confirm no shared-but-modified
  component risks the mobile view).
- Wait for explicit "approved" before implementing, per project standard.

## Phase: Implement

- Build in reviewable increments (e.g., static two-column layout first without
  scroll-sync, then add the IntersectionObserver logic, then add transitions/
  polish) — each increment committed to git separately once verified.

## Phase: Verify

- Real browser verification of the scroll-sync actually working smoothly, not
  just compiling — confirm active image ↔ detail card sync is accurate and
  responsive at real scroll speeds.
- Confirm ImageModal lightbox still works on images in the new layout.
- Confirm mobile is completely unaffected (real device/emulation check).
- Confirm Hindi language mode works correctly in the new layout too (details card
  text, image alt text, etc.).
- Confirm no layout shift / performance issues introduced (quick Lighthouse
  sanity check given Session 08's hard-won mobile performance gains).

## On completion

- Log the final architecture and any real decisions in `docs/04-process/decisions.md`.
- Update `docs/status.md`.