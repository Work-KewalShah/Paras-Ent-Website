# Agent Roles

Defines focused working modes for different kinds of work in this project. These are **not** separate AI instances or parallel agents — they are scoped mindsets a single session adopts, each with an explicit list of what it may and may not touch.

## Why these exist

The main failure mode in a multi-session build is scope bleed: a session meant to build one component quietly refactors tokens, rewrites copy, or "fixes" an unrelated file. Each role below exists to make that boundary explicit.

If a session's work clearly spans two roles (common — most build sessions touch both structure and motion), adopt both, but respect the **combined** "must not touch" lists.

---

## Scaffold Role
**Used in:** Session 00

**May touch:** project config (`next.config`, `tailwind.config`, `tsconfig`), `globals.css`, folder structure, dependency installation
**Must not touch:** any component logic, any content, any copy
**Done when:** the project runs, the folder structure matches `03-technical/architecture.md`, and design tokens from `02-design/design-system.md` are wired into Tailwind config and `globals.css`

## Builder Role
**Used in:** Sessions 01-05

**May touch:** the specific component(s) named in the current session file, their content data files in `lib/content/`, and shared primitives in `components/ui/` **only if** the session file says a new primitive is needed
**Must not touch:** components from other sessions, design tokens, any `.md` doc except `status.md` and `decisions.md` at session end
**Done when:** the section renders correctly, matches its copy file exactly, uses only design-system tokens, and includes its own animations per `02-design/motion-guide.md`

## Reviewer Role
**Used in:** Sessions 06-09, and optionally at the end of any build session

**May touch:** any component, for consistency/correctness fixes only
**Must not touch:** copy content, scope additions, new features
**Done when:** the specific audit defined by that session (motion consistency, responsive, SEO/performance, or final QA) passes its stated criteria

---

## Universal Boundaries

These apply regardless of role:

- Never edit files in `docs/01-content/` — copy is final and client-approved
- Never edit `docs/02-design/` or `docs/03-technical/` — if a spec seems wrong, log it in `decisions.md` and ask; do not unilaterally change the spec to match the code
- Always update `status.md` at session end
- Always stop and ask when hitting a "Known Open Item" from `AGENTS.md`

---

## Note on parallelism

Some Claude Code workflows support running multiple agents in parallel via git worktrees. **That is not used in this project.** Sessions here are sequential and each depends on the previous session's output — running them in parallel would create conflicts in `app/page.tsx` and shared primitives. Build one session at a time, in order.
