# Start Here

If you are reading this, you are a new session (or a new model) beginning work on this project with no memory of any prior conversation. This file orients you. `AGENTS.md` (in the project root) contains the full rules — read that first if you haven't. This file is the map, not the rulebook.

## What This Project Is

A single-page marketing website for **Paras Enterprises** — a family-owned security systems and automation business in Bilaspur, Chhattisgarh, India, operating since 1999. It replaces an existing basic website. The build uses Next.js, TypeScript, Tailwind CSS, and Framer Motion, and is being built incrementally across a series of scoped sessions using Claude Code.

Every piece of content, every design decision, and every technical choice needed to build this site has already been made and written down. Nothing here requires creative judgment from a fresh session — it requires careful, faithful execution of what's documented.

## Where Everything Is

```
docs/
├── 00-start-here.md      ← you are here
├── status.md             ← READ THIS NEXT — current progress, what's done, what's not
├── 01-content/           ← all final copy and business facts
├── 02-design/            ← colors, type, spacing, animation, responsive rules
├── 03-technical/         ← architecture, component specs, conventions, SEO
└── 04-process/
    ├── roadmap.md        ← index of all sessions
    ├── session-XX.md     ← the specific work plan for each session
    ├── agents.md         ← sub-role definitions, if used
    ├── skills.md         ← reusable code patterns
    └── decisions.md      ← log of judgment calls made during past sessions
```

## What To Do Next

1. Read `docs/status.md` to see what's already built and what the next session is.
2. Read `docs/04-process/roadmap.md` to confirm which session you're picking up.
3. Open that specific `session-XX.md` file — it will tell you exactly which other docs to read for that session's work.
4. Follow the Explore → Plan → Implement → Verify workflow defined in `AGENTS.md`.

## The One Thing to Never Do

**Do not infer, assume, or invent anything not written in these docs.** Not copy, not design choices, not scope. If something seems missing or ambiguous, check `AGENTS.md`'s "Known Open Items" list first — it may already be a flagged, known gap. If it isn't listed there either, stop and ask rather than filling the gap yourself.
