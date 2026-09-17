# Session 04 — Stats + Case Studies + Partnerships

**Role:** Builder (see `04-process/agents.md`)
**Blocked by:** Session 03 complete

---

## Session Goal

Build the credibility block of the site: the animated stats row, both case studies, and the client partnerships list. This is the strongest trust content on the page — it should feel substantial.

## Prerequisite Check

Confirm from `docs/status.md` that Session 03 is complete and `Card`, `StaggerContainer`, `Reveal` primitives exist.

---

## Phase 1 — Explore

Read, in this order:
1. `docs/01-content/copy-case-studies.md` — both case studies, testimonials, client list, verbatim
2. `docs/01-content/content-brief.md` — the stats figures
3. `docs/03-technical/component-spec.md` — StatsRow, CaseStudies, CaseStudyCard, Partnerships specs
4. `docs/02-design/motion-guide.md` — Patterns 2, 3, and **4 (stat counters)**
5. `docs/02-design/responsive-rules.md` — stats, case studies, partnerships behavior
6. `docs/04-process/skills.md` — data-driven rendering, card hover

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- The `CaseStudy` TypeScript interface
- How the counter animation parses values like "8,000+" and "25+" — these aren't plain integers, so the component needs a numeric value plus a prefix/suffix, not a naive string parse
- How the partnerships marquee is implemented (CSS animation vs. Framer Motion) and how it handles reduced motion — a continuously scrolling marquee needs a static fallback

**Wait for user approval before implementing.**

## Phase 3 — Implement

1. **`types/content.ts`** — add the `CaseStudy` interface
2. **`lib/content/case-studies.ts`** — both case studies transcribed **exactly** from `copy-case-studies.md`, including testimonials and attributions
3. **`components/sections/StatsRow.tsx`** — 4 stats with count-up animation (Pattern 4): 25+ Years, 8,000+ Installations, 600+ Cameras, 20+ Year Client Relationship
4. **`components/sections/CaseStudies.tsx`** + **`components/ui/CaseStudyCard.tsx`** — built on the existing `Card` primitive, not a separate hover implementation
5. **`components/sections/Partnerships.tsx`** — the 10-name client list as a horizontal marquee
6. Wire into `app/page.tsx` after the Session 03 sections

## Phase 4 — Verify

Session is done when:
- Stats count up on scroll into view, once, and land on the correct final values with correct suffixes
- Both case studies render with pain point, solution, result, testimonial, and attribution — matching `copy-case-studies.md` **exactly**
- The Chouksey figure reads **80%** (not 60% — see `decisions.md`)
- Testimonial attributions are correct: Ashish Jaiswal (Director, CEC) and Dr. Vinod Tiwari (Director)
- All 10 client names appear in the partnerships list
- Desktop: case studies side-by-side; Mobile: stacked, stats as 2x2
- Reduced motion respected — including a static (non-scrolling) partnerships fallback
- Case study cards reuse the `Card` primitive rather than duplicating hover logic

## On Completion

Update `docs/status.md`. Log judgment calls in `docs/04-process/decisions.md`.

---

## Notes

- **Client name spelling inconsistency:** the source material spells it "Sanjivani Hospital" in the case study and "Sanjeevni Hospital" in the client list. This is an unresolved Known Open Item in `AGENTS.md`. Ask the user which spelling is correct and use it consistently in both places — do not silently standardize on one.
- **Case study images are now supplied** — real client photos for both Chouksey Engineering College and Sanjivani Hospital exist in `assets/site/images/` (see `assets-manifest.md`). Use these directly; no placeholder needed for this session.
- The stats figures are real client claims (8,000+ installations, 80% incident reduction). Transcribe them exactly as written — never round, adjust, or "improve" a real business metric.
