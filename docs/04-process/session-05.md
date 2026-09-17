# Session 05 — Contact + Footer

**Role:** Builder (see `04-process/agents.md`)
**Blocked by:** Session 04 complete

---

## Resolved: Form Backend

**Confirmed decision (see `decisions.md`):** the contact form uses a third-party form backend service (e.g. Web3Forms or Formspree), not a custom Next.js API route. The specific provider and account/endpoint setup should be confirmed with the user at the start of this session's Plan phase, since no specific provider has been chosen yet — only the category of solution.

---

## Session Goal

Build the conversion section — contact form, embedded map, contact details — and the site footer. This is the last section of the page; after this session, the full page exists end to end.

## Prerequisite Check

Confirm from `docs/status.md` that Session 04 is complete.

---

## Phase 1 — Explore

Read, in this order:
1. `docs/01-content/copy-contact-footer.md` — headlines, form fields, footer content, verbatim
2. `docs/01-content/content-brief.md` — confirmed address, phones, emails
3. `docs/03-technical/component-spec.md` — ContactForm, Footer specs
4. `docs/03-technical/architecture.md` — the contact backend open item
5. `docs/02-design/responsive-rules.md` — contact and footer behavior
6. `docs/02-design/motion-guide.md` — Patterns 2 and 7

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- Which specific form service to use (e.g. Web3Forms, Formspree) and what account/endpoint setup it requires
- Client-side validation rules — specifically, Indian phone number format (10 digits) for the phone field
- Form state handling: loading, success, and error states — what the user sees in each
- How the Google Map is embedded (iframe vs. a maps library) and its performance impact, since an eager iframe embed can meaningfully hurt Lighthouse scores

**Wait for user approval before implementing.**

## Phase 3 — Implement

1. **`components/sections/ContactForm.tsx`** — fields per `copy-contact-footer.md`: Name, Phone, Location, Product/Service Interest (dropdown populated from `lib/content/products.ts`), Message. Uses shadcn/ui form primitives per `architecture.md`.
2. Both headlines per the confirmed decision: brand statement as section headline, "Contact Now for a Free Site Survey!" as the CTA subheadline above the form
3. Contact details block — confirmed address, both phones (click-to-call), both emails
4. Embedded Google Map pinned to the confirmed address
5. **`components/sections/Footer.tsx`** — logo, tagline, quick links, **address and phone only** (no email, no social — confirmed in `decisions.md`)
6. Wire both into `app/page.tsx`
7. Submission logic — only once the blocking decision is resolved

## Phase 4 — Verify

Session is done when:
- All form fields render, are labeled, and are keyboard-accessible
- Validation gives clear inline errors; phone accepts a valid 10-digit Indian number
- Form shows distinct loading, success, and error states — and a real submission actually arrives at its destination (test it end to end, don't assume)
- Contact details exactly match `content-brief.md`; phone numbers are `tel:` links
- Map loads and points to the correct address
- Footer contains address + phone only — no email, no social icons
- Mobile: form appears above the map; all touch targets ≥44x44px
- Reduced motion respected

## On Completion

Update `docs/status.md` — this completes the main build; note that Sessions 06-09 are still skeletons needing detail. Log decisions in `docs/04-process/decisions.md`.

---

## Notes

- **Test a real submission before calling this done.** A form that renders perfectly but silently drops leads is worse than no form at all for a business whose primary conversion is contact.
- **The map embed is a performance risk.** Consider lazy-loading it or deferring until scrolled into view — flag the approach in the Plan phase rather than deciding silently, since Session 08 will audit performance.
- The form dropdown pulls from the products content file rather than a hardcoded list, so it stays in sync automatically if product categories ever change.
