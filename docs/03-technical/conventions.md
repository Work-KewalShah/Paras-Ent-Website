# Conventions

## Asset File Extensions

Supplied image assets are **not uniformly one file type** (a mix of `.png`, `.jpg`, `.jpeg` across different sources — see `assets-manifest.md`). Content data files (`lib/content/products.ts`, `case-studies.ts`) must store each image's **exact filename including its real extension** as a plain string field. Never construct a file path by assuming a fixed extension (e.g. never do `` `/images/${slug}.jpg` `` when the actual file might be `.png`). This is a common source of silent broken-image bugs and is treated as a hard rule, not a style preference.

## File Naming

- **Components** (`components/sections/`, `components/ui/`): PascalCase — `Hero.tsx`, `ProductCard.tsx`
- **Utilities, hooks** (`lib/`): camelCase — `useScrollPosition.ts`, `utils.ts`
- **Content data files** (`lib/content/`): kebab-case — `case-studies.ts`, `site-config.ts`
- **Docs** (`docs/`): kebab-case, already established — `content-brief.md`, `session-00.md`

## Component Structure

- One component per file, default export matches the filename
- Props typed via a local `interface` at the top of the file for component-specific props; shared/reused types (e.g. `Product`, `CaseStudy`) live in `types/content.ts` and are imported
- Section components (`components/sections/`) are self-contained — they import their own content from `lib/content/`, so `app/page.tsx` stays a simple list of `<ComponentName />` tags in session order with no prop-drilling

## Tailwind Usage

- Use the CSS custom properties from `design-system.md` (via `var(--color-accent)` etc. in a Tailwind config extension) — never hardcode hex values directly in a `className`
- Prefer Tailwind utility classes over custom CSS files; `globals.css` is limited to token definitions, resets, and the few effects that don't map to utilities cleanly (e.g. the scan-line animation keyframes)
- Arbitrary values (e.g. `w-[123px]`) are a last resort — if a value recurs more than once, it should become a token in `design-system.md` instead
- No inline `style` props except for genuinely dynamic values (e.g. a Framer Motion computed transform)

## Imports

- Use the `@/` absolute import alias (Next.js default) for anything outside the current folder — no `../../../` relative chains

## Accessibility

- Semantic HTML per section: `<nav>`, `<header>`, `<section>`, `<footer>` — not generic `<div>` soup
- All images require meaningful `alt` text (not filenames or "image of...")
- Icon-only interactive elements (hamburger menu, close button) require `aria-label`
- All motion patterns respect `prefers-reduced-motion` per `motion-guide.md`

## Comments

- Code should be self-documenting through clear naming — avoid narrating obvious logic
- Comment only genuinely non-obvious logic (e.g. the scroll-linked transform math in the Product Showcase pattern)

## Commit Messages

Conventional Commits format, tagged with the session number for traceability:
```
feat(hero): implement hero load animation (session-01)
fix(navbar): correct mobile menu z-index (session-01)
docs: update status.md after session-02
```

## Session Discipline

Code changes in a given session should stay within that session's defined scope (see `04-process/session-XX.md`). If a session surfaces a change needed outside its scope, note it in `decisions.md` rather than making the change inline — this keeps sessions reviewable as discrete units.
