# Session 00 — Setup & Scaffold

**Role:** Scaffold (see `04-process/agents.md`)
**Blocked by:** nothing — this is the first build session

---

## Session Goal

Stand up the Next.js project, create the `src/` folder structure, install dependencies, and wire the design tokens into Tailwind and `globals.css`. At the end of this session the project should run locally and show a blank (or near-blank) page — **no sections are built in this session.**

## Prerequisite Check

- The `paras-website/` folder exists with `assets/`, `docs/`, `public/`, `src/` already created
- All docs in `docs/01-content/`, `docs/02-design/`, `docs/03-technical/` are present
- `status.md` is empty (this is the first session)

---

## Phase 1 — Explore

Read, in this order:
1. `docs/03-technical/architecture.md` — the full `src/` structure and stack
2. `docs/02-design/design-system.md` — the tokens to wire in
3. `docs/03-technical/conventions.md` — naming and Tailwind usage rules

Make no changes during this phase.

## Phase 2 — Plan

Propose:
- The exact `create-next-app` command and flags to use
- The full list of dependencies to install (Framer Motion, shadcn/ui setup, any others)
- How design tokens will be wired — specifically, which tokens go into `tailwind.config.ts` as theme extensions vs. which live as CSS custom properties in `globals.css`
- The complete list of files/folders to be created

**Wait for user approval before implementing.**

## Phase 3 — Implement

1. Scaffold the Next.js app (App Router, TypeScript, Tailwind) into the existing `paras-website/` folder — do not create a nested project folder
2. Install dependencies
3. Create the full `src/` folder structure exactly as specified in `architecture.md`, including empty placeholder folders for `components/sections/`, `components/ui/`, `lib/content/`, `lib/hooks/`, `types/`
4. Write design tokens from `design-system.md` into `globals.css` as CSS custom properties
5. Extend `tailwind.config.ts` to reference those tokens so utilities like `bg-bg-primary` / `text-accent` work
6. Set up fonts (`Anton` for display, `Inter` for body) via `next/font`
7. Reduce `app/page.tsx` to a minimal empty shell — no content, no placeholder text
8. Verify the dev server runs without errors

**Do not build any section components in this session.** Do not add placeholder copy anywhere.

## Phase 4 — Verify

Session is done when:
- `npm run dev` starts with no errors or warnings
- The page loads with the correct dark background color from `design-system.md` tokens
- Both fonts load correctly (verify in browser dev tools)
- The `src/` folder structure matches `architecture.md` exactly
- No placeholder/lorem content exists anywhere in the project

## On Completion

1. Create `docs/status.md` using the template below and fill it in
2. Log any judgment calls in `docs/04-process/decisions.md`

### `status.md` template for first entry

```markdown
## Last updated: [date] by [model/session]
## Current session: 00 — Setup & Scaffold (complete)
## Next session: 01 — Navbar + Hero + Trust Bar

## Completed this session:
- ...

## Files touched:
- ...

## Next immediate action:
- Begin session-01.md

## Open questions / blockers:
- ...

## Do NOT touch / in-progress:
- (none)
```

---

## Notes

- The `Anton` display font choice is provisional — it was selected as a close match to the booklet's condensed poster-style headlines but has not been visually compared side-by-side. If it looks noticeably off once rendered, flag it in `decisions.md` and propose an alternative (e.g. Bebas Neue) rather than silently swapping it.
- Do not scaffold the `api/contact/route.ts` file in this session — the contact form backend mechanism is an unresolved open item (see `AGENTS.md`) and gets decided before Session 05.
