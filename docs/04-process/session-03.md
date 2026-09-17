# Session 03 — Process + Service Approach + B2B

**Role:** Builder (see `04-process/agents.md`)
**Blocked by:** Session 02 complete + **one unresolved content gap (see below)**

---

## ⚠ Blocking Gap — Resolve Before Building the B2B Section

**The B2B section has no body copy.**

Only the headline is confirmed ("Designed for Builders, Architects & Interior Designers" — sourced from the old site). Body copy was discussed during planning but **never written into a copy file**. This is a Known Open Item in `AGENTS.md`.

Before building `B2BSection.tsx`:
- Ask the user to supply or approve 2-3 sentences of body copy and a CTA label
- That copy must be added to a content file (`copy-b2b.md`, or a new section in `content-brief.md`) **first** — docs before code, per `AGENTS.md`
- **Do not write placeholder or invented body copy**, not even temporarily

Sessions 03's other two sections (Process, Service Approach) are fully unblocked — build those regardless, and build B2B only once copy exists.

---

## Session Goal

Build the customer-journey and service-credibility sections: the 3-step process timeline, the 4-pillar service approach grid, and (copy permitting) the B2B/professionals section.

## Prerequisite Check

Confirm from `docs/status.md` that Session 02 is complete and `Card`, `StaggerContainer` primitives exist.

---

## Phase 1 — Explore

Read, in this order:
1. `docs/01-content/copy-process-service.md` — both Block A and Block B, verbatim, including the placement note
2. `docs/03-technical/component-spec.md` — ProcessTimeline, ServiceApproach, B2BSection specs
3. `docs/02-design/motion-guide.md` — Pattern 2
4. `docs/02-design/responsive-rules.md` — process/service section behavior
5. `docs/04-process/skills.md` — section template, stagger pattern

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- How the 3-step process renders — the booklet treats it as a cyclical loop; decide whether to reproduce that visually or use a simpler numbered sequence, and say which and why
- How the two sections are visually differentiated so they don't read as repetitive (they cover related themes — see the placement note in `copy-process-service.md`)
- Whether B2B is in scope this session, based on the blocking gap above

**Wait for user approval before implementing.**

## Phase 3 — Implement

1. **`components/sections/ProcessTimeline.tsx`** (Block B — "Designed for You, Guaranteed by Us") — headline, subheadline, 3 numbered steps, closing line. Appears **before** ServiceApproach.
2. **`components/sections/ServiceApproach.tsx`** (Block A — "End-to-End Service Approach") — headline, 4-item grid, closing guarantee line
3. **`components/sections/B2BSection.tsx`** — **only if copy has been supplied and added to a content file.** Otherwise skip and note it in `status.md`.
4. Wire into `app/page.tsx` after `ProductGrid`

## Phase 4 — Verify

Session is done when:
- Both process/service sections render with copy matching `copy-process-service.md` exactly
- ProcessTimeline appears before ServiceApproach (confirmed ordering)
- The two sections are visually distinct enough that they don't feel like the same section twice
- Desktop: horizontal layouts; Mobile: process becomes a vertical timeline, service grid becomes 2x2 (not 1-column)
- Reduced motion respected
- B2B is either fully built from real approved copy, or cleanly skipped and flagged — never half-built with placeholder text

## On Completion

Update `docs/status.md`, explicitly noting B2B status. Log judgment calls in `docs/04-process/decisions.md`.

---

## Notes

- These two sections carry genuine repetition risk: both talk about installation, support, and expertise. The copy is final and shouldn't change, so the differentiation has to come from **layout and visual treatment** — e.g. numbered timeline vs. icon grid, different background treatment, different section width. Raise it if it still feels redundant once rendered.
- The B2B section's supporting visual is also unsourced (`assets-manifest.md`) — same placeholder rule as earlier sessions applies if it does get built.
