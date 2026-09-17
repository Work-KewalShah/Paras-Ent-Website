# Session 02 — Product Grid

**Role:** Builder (see `04-process/agents.md`)
**Blocked by:** Session 01 complete

---

## Resolved: No Filter Tabs

**Confirmed decision (see `decisions.md`):** the product suite ships as a flat 11-card grid in v1. No filter tabs, no `tag` field on the `Product` type. Do not add filtering logic.

---

## Session Goal

Build the complete product suite section — all 9 categories as cards in a responsive grid, with scroll-reveal stagger and hover states. Home Automation and Nurse/PA Calling are **not part of scope** — see `decisions.md`.

## Prerequisite Check

Confirm from `docs/status.md` that Session 01 is complete and that `Button`, `Reveal` primitives exist in `components/ui/`.

---

## Phase 1 — Explore

Read, in this order:
1. `docs/01-content/copy-products.md` — all 11 categories, verbatim
2. `docs/03-technical/component-spec.md` — ProductGrid + ProductCard specs
3. `docs/02-design/motion-guide.md` — Patterns 2 and 3
4. `docs/02-design/responsive-rules.md` — product suite grid behavior
5. `docs/04-process/skills.md` — Patterns 3 (stagger grid), 4 (data-driven rendering), 5 (card hover)
6. `docs/01-content/assets-manifest.md` — product image status

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- The `Product` TypeScript interface for `types/content.ts` — no `tag` field (flat grid confirmed)
- The structure of `lib/content/products.ts`
- Whether `components/ui/Card.tsx` and `StaggerContainer.tsx` get created now (they should — both are needed here and reused in Session 04)
- How product images will be handled given the asset gap (see Notes)

**Wait for user approval before implementing.**

## Phase 3 — Implement

1. `types/content.ts` — the `Product` interface
2. `lib/content/products.ts` — all 11 categories transcribed **exactly** from `copy-products.md`. Every tagline, feature list, and use-case list must match word for word.
3. `components/ui/Card.tsx` — base card with hover pattern (Pattern 3), used by `ProductCard` and later `CaseStudyCard`
4. `components/ui/StaggerContainer.tsx` — per `skills.md`
5. `components/sections/ProductGrid.tsx` — maps over the products array, never hardcodes cards individually
6. Wire into `app/page.tsx` after `TrustPillars`

## Phase 4 — Verify

Session is done when:
- All 9 categories render, in the order listed in `copy-products.md` — no Home Automation or Nurse/PA Calling card exists anywhere
- Every tagline and feature list matches the copy file **exactly** — spot-check at least 3 categories word-for-word
- All 9 product images render correctly using their exact stored filename+extension (see `assets-manifest.md` / `conventions.md`) — no broken images from an assumed wrong extension
- Grid is 3-column (desktop), 2-column (tablet), 1-column (mobile)
- Cards stagger in on scroll and lift/glow on hover
- Cards are never hardcoded individually — the section maps over the data array
- Reduced motion respected

## On Completion

Update `docs/status.md`. Log the filter tabs decision and any other judgment calls in `docs/04-process/decisions.md`.

---

## Notes

- **9 of 9 product images are now supplied and confirmed** (from the old site's original Product Showcase graphics — see `assets-manifest.md` for exact filenames, all `.png`). Use these directly via their exact stored filename — do not assume a `.jpg` extension.
- **Icons are still fully unsourced** — no source files exist for any icon needed here. Use a simple placeholder shape or a generic icon library placeholder, flagged in `status.md`, rather than inventing final iconography.
- This is the largest single content section on the site. If the 11-card grid feels visually overwhelming once rendered, that's a real design observation worth raising — but raise it, don't unilaterally redesign the section.
