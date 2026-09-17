# AGENTS.md

Full instruction set for any AI coding agent working on this project (Claude Code, or any other tool that reads `AGENTS.md`). Read this file completely before taking any action.

---

## Project Summary

Building a single-page marketing website for **Paras Enterprises**, a family-owned security systems and automation business based in Bilaspur, Chhattisgarh, India, operating since 1999. The site replaces an existing basic Google Sites page. It must be fully responsive, richly animated, and visually communicate the company's security focus.

This is a **greenfield build** — no legacy code to preserve.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui (form components only)

Full detail in `docs/03-technical/architecture.md`.

---

## The Core Rule

**Never infer intent from anything outside these docs.** Everything needed to build this site has been decided and written down. If something is not specified in the docs, do not guess, do not invent placeholder content, and do not "improve" on what's written. Flag the gap and ask.

This applies especially to copy. All marketing copy is final and client-approved. Transcribe it exactly — never reword, expand, shorten, or polish it.

---

## Reading Order

At the start of **every** session:

1. `docs/00-start-here.md` — orientation
2. `docs/status.md` — what's already built, what's next, what not to touch
3. `docs/04-process/roadmap.md` — the session index
4. `docs/04-process/session-XX.md` — the specific session you're on
5. Whatever docs that session file tells you to read

Do not read every doc every session — the session file specifies what's relevant.

## Document Map

| Folder | Contains |
|---|---|
| `docs/01-content/` | All final copy, business facts, asset mapping |
| `docs/02-design/` | Design tokens, animation specs, responsive rules |
| `docs/03-technical/` | Architecture, component specs, conventions, SEO |
| `docs/04-process/` | Session plans, agent roles, reusable patterns, decision log |
| `docs/status.md` | Live cross-session state — read first, update last |

## Single Source of Truth

Each fact lives in exactly one place. Never duplicate, never contradict:

- **Copy** → `01-content/copy-*.md`
- **Business facts, contact info** → `01-content/content-brief.md`
- **Colors, type, spacing** → `02-design/design-system.md`
- **Animation timings** → `02-design/motion-guide.md`
- **Breakpoint behavior** → `02-design/responsive-rules.md`
- **Component props/structure** → `03-technical/component-spec.md`

Content flows **docs → code**, never the reverse. If copy needs changing, the `.md` file is updated first, then the code.

---

## Session Workflow

Every session follows four phases, in order:

1. **Explore** — read the docs the session file specifies. Make no changes.
2. **Plan** — propose the approach. **Wait for user approval before implementing.**
3. **Implement** — build only what's in this session's scope.
4. **Verify** — the user reviews in-browser. Then update `status.md` (and `decisions.md` if any judgment calls were made).

Use plan mode (Shift+Tab in Claude Code) for phases 1-2.

## Scope Discipline

Build only what the current session covers. If you discover something needing change outside the session's scope — log it in `docs/04-process/decisions.md` and continue; do not fix it inline. This keeps each session reviewable as a discrete unit.

Animation is **not** a separate late phase. Each section's animations are built in the same session as the section itself, per `02-design/motion-guide.md`.

---

## Hard Rules

1. **Never invent copy.** If a copy file doesn't cover something, stop and ask.
2. **Never hardcode design values.** Use tokens from `design-system.md`.
3. **Never skip the Plan phase.** Always propose before implementing.
4. **Never work outside the current session's scope.**
5. **Always update `status.md` before ending a session.** A session that doesn't update status is an incomplete session.
6. **Never assume prior conversation context.** These docs are the only context that exists.
7. **Respect `prefers-reduced-motion`** in every animation, in the same session it's built.

---

## Known Open Items

These are unresolved and must not be silently guessed at:

1. **B2B section body copy** — a draft now exists in `01-content/copy-b2b.md`, but it is marked DRAFT and needs the user's explicit approval before Session 03 treats it as final. Check the file's status line.
2. **Address pincode** — not in the confirmed address; affects SEO structured data. See `03-technical/seo-meta.md`.
3. **Hero visual** — no suitable image identified yet among supplied assets. See `01-content/assets-manifest.md`.
4. **All icons** — still fully unsourced; no source files exist for any icon needed on the site.
5. **"Sanjivani" vs "Sanjeevni" spelling** — inconsistent in source material. See `01-content/copy-case-studies.md`.

Resolved: product filter tabs, contact form backend, PE logo source, 9 of 9 product category images (CCTV uses the IP Camera photo), both case study photos, and the decision to drop Home Automation and Nurse/PA Calling from scope entirely (see `04-process/decisions.md`). The product suite is now 9 categories, not 11 — this count has been updated everywhere it appeared.

When a session reaches a blocked item, stop and ask rather than proceeding with a placeholder.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
