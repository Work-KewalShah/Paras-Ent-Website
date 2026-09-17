# Component Spec

Every component in `src/components/`, its props, content source, and motion/design references. Build order follows the session files in `04-process/`.

---

## Navbar
- **Props:** none (self-contained; reads nav links + phone from `lib/content/site-config.ts`)
- **Behavior:** sticky, shrinks on scroll (`motion-guide.md` Pattern 5); collapses to hamburger menu on mobile, phone number stays pinned (`responsive-rules.md`)
- **Content source:** `content-brief.md` (confirmed phone), `copy-contact-footer.md` (nav anchor labels)

## Hero
- **Props:** none (static content from `copy-hero.md`)
- **Elements:** eyebrow, headline, subheadline, primary CTA (scroll-to-contact), secondary CTA (`tel:` link), supporting stat line, hero visual
- **Motion:** Pattern 1 (load sequence) + Pattern 8 (scan effect)
- **Content source:** `copy-hero.md`

## TrustPillars
- **Props:** none
- **Displays:** 3 pillars (Security/Innovation/Service) + the 4 trust badges as a secondary strip
- **Content source:** `content-brief.md`
- **Responsive:** horizontal scroll-snap on mobile (`responsive-rules.md`)

## StatsRow
- **Props:** `stats: { value: string; label: string }[]`
- **Data:** 25+ Years (Since 1999), 8,000+ Installations, 600+ Cameras (Chouksey flagship), 20+ Year Client Relationship
- **Motion:** Pattern 4 (animated counters)
- **Content source:** `content-brief.md`

## ProductGrid + ProductCard
- **ProductGrid props:** none (reads `lib/content/products.ts`)
- **ProductCard props:** `{ title: string; tagline: string; features: string[]; useCases?: string[]; icon: string; image: string }` — `image` stores the **exact filename including extension** (e.g. `'product-cctv.png'`), never assumed/constructed from the title. See `assets-manifest.md`'s extension note.
- **Filter tabs:** CONFIRMED — no filter tabs for v1. `ProductGrid` renders as a flat grid; the `tag` field does not exist on the `Product` type at all.
- **Category count:** 9 categories (Home Automation and Nurse/PA Calling dropped from scope — see `decisions.md`)
- **Motion:** Pattern 2 (staggered scroll reveal), Pattern 3 (card hover)
- **Content source:** `copy-products.md`

## ProcessTimeline
*(Block B from `copy-process-service.md` — "Designed for You, Guaranteed by Us")*
- **Props:** none
- **Displays:** headline, subheadline, 3 numbered steps, closing line
- **Motion:** Pattern 2
- **Content source:** `copy-process-service.md`
- **Placement:** appears before `ServiceApproach` (confirmed ordering from `copy-process-service.md`'s placement note)

## ServiceApproach
*(Block A from `copy-process-service.md` — "End-to-End Service Approach")*
- **Props:** none
- **Displays:** headline, 4-item grid, closing guarantee line
- **Motion:** Pattern 2
- **Content source:** `copy-process-service.md`

## CaseStudies + CaseStudyCard
- **CaseStudies props:** none (reads `lib/content/case-studies.ts`)
- **CaseStudyCard props:** `{ clientName: string; painPoint: string; solution: string; result: string; testimonial: string; testimonialAuthor: string; image: string }`
- **Layout:** 2-column desktop, stacked mobile (`responsive-rules.md`, confirmed)
- **Motion:** Pattern 2, Pattern 3 (hover)
- **Content source:** `copy-case-studies.md`

## Partnerships
- **Props:** `clients: string[]`
- **Layout:** horizontal marquee, identical at all breakpoints (`responsive-rules.md`)
- **Content source:** `copy-case-studies.md` client list

## B2BSection
- **Props:** `{ headline: string; body: string; ctaText: string }`
- **Content source:** `copy-b2b.md` — currently in DRAFT status, needs the user's approval before Session 03 treats it as final. Check the file's status line before building.
- **Motion:** Pattern 2

## ContactForm
- **Props:** none
- **Fields:** Name, Phone Number, Location, Product/Service Interest (dropdown, populated from `lib/content/products.ts`), Message
- **Submit:** posts to `api/contact/route.ts` — backend mechanism is an open item in `architecture.md`, decide before this component is built
- **Content source:** `copy-contact-footer.md`

## Footer
- **Props:** none
- **Content source:** `copy-contact-footer.md` (address + phone only, no email, no social — confirmed)

---

## Shared UI Primitives (`components/ui/`)

- **Button** — `{ variant: 'primary' | 'secondary'; href?: string; onClick?: () => void; children: ReactNode }` — primary/secondary styles per `design-system.md`, hover/click states per `motion-guide.md` Pattern 7
- **Card** — base wrapper applying `--radius-md`/`--radius-lg` and `--shadow-card` tokens
- **ImageModal** — `{ src: string; alt: string; onClose: () => void }`; accessible lightbox with focus trap, Escape/backdrop close, returns focus to trigger; used by `ProductCard` (all 9 cards, Option C) and reusable for `CaseStudyCard` images in Session 04 if needed
- **Badge** — small pill component for trust badges and product tags

---

## Build order note

This spec should be read alongside the `04-process/` session files, which assign these components to specific sessions. Do not build components out of the session order without checking `roadmap.md` first.
