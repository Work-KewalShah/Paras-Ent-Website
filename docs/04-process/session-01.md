# Session 01 — Navbar + Hero + Trust Bar

**Role:** Builder (see `04-process/agents.md`)
**Blocked by:** Session 00 must be complete

---

## Session Goal

Build the first three visible sections of the site — the sticky navbar, the hero, and the trust pillars/badges strip — including their animations. At the end of this session, the top of the page should look and feel finished, at both desktop and mobile widths.

## Prerequisite Check

Confirm from `docs/status.md` that Session 00 is complete: the project runs, design tokens are wired, fonts load.

---

## Phase 1 — Explore

Read, in this order:
1. `docs/01-content/copy-hero.md` — exact hero copy
2. `docs/01-content/content-brief.md` — trust pillars, trust badges, confirmed phone number
3. `docs/02-design/design-system.md` — tokens
4. `docs/02-design/motion-guide.md` — Patterns 1, 2, 3, 5, 7, 8
5. `docs/02-design/responsive-rules.md` — navbar, hero, trust pillars sections
6. `docs/03-technical/component-spec.md` — Navbar, Hero, TrustPillars specs
7. `docs/04-process/skills.md` — the shared patterns to implement here

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- Which shared `components/ui/` primitives get created this session (at minimum: `Button`, `Reveal` — both are needed now and reused in every later session)
- The structure of `lib/content/site-config.ts` (nav links, phone, anchors)
- How the scan-line effect (Pattern 8) will be implemented and sequenced after the hero text stagger
- How the sticky navbar scroll detection will work (`useScrollPosition` hook per `architecture.md`)

**Wait for user approval before implementing.**

## Phase 3 — Implement

Build in this order:

1. **Shared primitives first** — `components/ui/Button.tsx` and `components/ui/Reveal.tsx`, exactly as specified in `skills.md`. These are reused by every later session, so get them right here.
2. **`lib/content/site-config.ts`** — nav links, phone numbers, section anchor IDs, transcribed from `content-brief.md`
3. **`components/sections/Navbar.tsx`** — sticky, shrink-on-scroll (Pattern 5), hamburger on mobile with phone pinned outside the menu (`responsive-rules.md`)
4. **`components/sections/Hero.tsx`** — all elements from `copy-hero.md`, with the staggered load sequence (Pattern 1) and scan-line effect (Pattern 8)
5. **`components/sections/TrustPillars.tsx`** — 3 pillars + 4 trust badges strip, scroll reveal (Pattern 2), horizontal scroll-snap on mobile
6. Wire all three into `app/page.tsx` in order

## Phase 4 — Verify

Session is done when:
- Hero copy matches `copy-hero.md` **word for word** — no rewording, no added taglines
- Hero load sequence plays in the correct order with the scan-line following the text stagger
- Navbar shrinks correctly past 80px scroll; phone number remains visible at all breakpoints
- Mobile: hero CTAs are visible without scrolling; hamburger menu opens/closes correctly
- All three sections respect `prefers-reduced-motion` (test by enabling it in OS/browser settings)
- No hardcoded colors — everything references design-system tokens
- Touch targets on mobile are at least 44x44px

## On Completion

Update `docs/status.md`. Log any judgment calls in `docs/04-process/decisions.md`.

---

## Notes

- **Logo files are now available** (`assets/reference/logo-source/`, including a .cdr source) — export to web-ready SVG/PNG as part of this session or Session 00, whichever hasn't happened yet.
- **The hero visual is still genuinely unsourced** — check `assets-manifest.md` before assuming nothing exists; if still no suitable image by the time this session runs, build the hero layout with the image slot in place and a solid token-colored placeholder block — **do not** substitute a stock photo or generated image without asking, and note the placeholder in `status.md` so it isn't forgotten.
- The scan-line effect is a signature brand moment, not generic polish. If it reads as gimmicky once rendered, flag it for discussion rather than quietly removing it.
