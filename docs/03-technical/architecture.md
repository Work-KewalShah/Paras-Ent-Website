# Architecture

## Stack Summary

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, using tokens from `design-system.md`
- **Animation:** Framer Motion, per `motion-guide.md`
- **UI primitives:** shadcn/ui for form components (contact form) — mention to the user when used, per shadcn convention
- **Routing:** single page, no multi-route navigation (confirmed decision — see earlier planning)
- **State management:** none globally needed. Local component state only (mobile menu open/closed, active product filter tab, form input state)
- **Images:** Next.js `<Image>` component throughout — no separate manual optimization pipeline needed beyond sourcing reasonably sized originals per `assets-manifest.md`

## Folder Structure (inside `src/`)

```
src/
├── app/
│   ├── layout.tsx          — root layout: fonts, metadata, global providers
│   ├── page.tsx            — the single page; imports and orders all section components
│   └── globals.css         — design tokens from design-system.md, base/reset styles
│
│   (no api/ folder needed — contact form uses a third-party service, see below)
│
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TrustPillars.tsx
│   │   ├── StatsRow.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── ServiceApproach.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Partnerships.tsx
│   │   ├── B2BSection.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   └── ui/                 — shared primitives (Button, Card, Badge) + shadcn/ui components
│
├── lib/
│   ├── content/
│   │   ├── products.ts      — typed data mirroring copy-products.md
│   │   ├── case-studies.ts  — typed data mirroring copy-case-studies.md
│   │   └── site-config.ts   — contact info, nav links, mirroring content-brief.md
│   ├── utils.ts             — shared helpers (e.g. `cn()` for class merging)
│   └── hooks/
│       └── useScrollPosition.ts  — powers the shrinking navbar (motion-guide.md Pattern 5)
│
└── types/
    └── content.ts           — TypeScript interfaces for Product, CaseStudy, etc.
```

## Routing

Single page (`app/page.tsx`). Navigation is anchor-based (`id` attributes + native `scroll-behavior: smooth`), not separate routes. No plans for additional pages (e.g. `/privacy`, `/terms`) unless requested later.

## Content Sync Rule

`src/lib/content/*.ts` files are the **code representation** of what's already finalized in `docs/01-content/copy-*.md`. Claude Code should treat the `.md` files as the single source of truth: when writing the `.ts` content files, transcribe from the `.md` files exactly — do not invent, reword, or "improve" copy while converting it to code. If a copy file needs to change, the `.md` file gets updated first, then the `.ts` file is updated to match — never the reverse.

## Contact Form Backend (resolved — see `decisions.md`)

No backend/database is planned for this project. The contact form (`ContactForm.tsx`) submits via a **third-party form backend service** (e.g. Web3Forms, Formspree) — no custom `api/contact/route.ts` needed. The `app/api/` folder shown above is not required for this decision; remove it from the structure if nothing else ends up needing it. The specific provider is chosen at the start of Session 05.
