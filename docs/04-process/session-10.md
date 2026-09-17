# Session 10 — Hindi/English Language Toggle

**Status:** Not yet detailed. Written after Session 09 (Final QA) completed.

**Role:** Builder (see `04-process/agents.md`) — this touches content architecture,
components, and possibly technical/routing setup, so treat it as spanning Builder
and Reviewer roles per the "combined must-not-touch" rule.

**Blocked by:** Session 09 complete (confirmed — Sessions 00-09 all done).

## Session goal

Add a Hindi/English language toggle button to the top-right of the Navbar, allowing
visitors to switch the entire site's visible text between English and Hindi.

## Known decisions already made

- Toggle button location: top-right of Navbar (alongside or near the existing
  phone number / hamburger menu).
- Hindi copy will be written and provided by Kewal himself — not machine-translated,
  not drafted by Claude/Claude Code.
- This is a genuinely new feature, not a quick addition — treat it with the same
  Explore → Plan → Implement → Verify discipline as prior build sessions, not as a
  Session 09-style audit.

## To detail before this session starts

These are real open decisions, not implementation details — resolve with Kewal
before writing a Phase 2 Plan:

- **Technical approach**: a proper i18n library (e.g. `next-intl`, `next-i18next`)
  vs. a simpler client-side-only toggle (React Context + local content objects,
  no routing changes). Given this is a single-page site, the simpler approach may
  be sufficient — but this needs an explicit decision, not a default.
- **SEO/URL strategy**: does Hindi content live at a separate route (e.g. `/hi/`)
  for Google to index separately with proper `hreflang` tags, or is it a pure
  client-side toggle with no separate SEO benefit for Hindi searchers? This
  materially changes the technical approach above.
- **Font**: the current display font (Anton) does not support Devanagari script.
  A Hindi-compatible font needs to be chosen (e.g. Noto Sans Devanagari, Baloo) and
  matched as closely as possible to the site's existing bold/condensed visual style.
  Needs a decision + addition to `docs/02-design/design-system.md`.
- **Content architecture**: every `lib/content/*.ts` file needs restructuring to
  hold both language versions. Decide the data shape (e.g. `{ en: {...}, hi: {...} }`
  per file) before implementation starts, so every component change follows one
  consistent pattern.
- **Persistence**: should the selected language persist across visits (localStorage)
  or reset to a default (English, or browser-language-detected) on every new visit?
- **Translation delivery format**: how will Kewal hand off the Hindi text — inline
  in chat, as a filled-out copy of each `copy-*.md` file, or some other format? Needs
  a clear per-file structure so nothing gets missed or mismatched with its English
  counterpart.

## Phase: Explore

- Read every `docs/01-content/copy-*.md` file to produce the complete list of
  strings that need Hindi equivalents (don't rely on memory — go file by file).
- Check current Navbar.tsx structure to confirm where the toggle button fits
  without breaking existing layout (desktop + mobile dropdown, from Session 08's
  fix).
- Research the chosen i18n approach's setup requirements once decided above.

## Phase: Plan

- Present the exact toggle UI (icon/label, e.g. "EN / हिं" or a flag-free text
  toggle — avoid flag icons, since Hindi isn't tied to a single national flag in a
  culturally simple way), placement, and interaction (click toggles state instantly
  vs. requires reload).
- Present the content architecture change file-by-file.
- Present how the font swap works when Hindi is active (font-family switch tied to
  language state).
- Wait for explicit "approved" before implementing, per this project's standing rule.

## Phase: Implement

- Build in the smallest reviewable increments possible — likely per-section
  (Navbar toggle first and confirmed working, then content sections one at a time)
  rather than one giant change touching every file at once.

## Phase: Verify

- Confirm every section's Hindi text actually renders correctly (no missing
  strings falling back silently to English, no broken font rendering/tofu boxes).
- Confirm toggle state persists (or resets) per the decision above.
- Confirm no layout breakage from Hindi text length differences (re-check overflow
  the same way Session 09 did for English).
- Confirm the toggle works correctly in the mobile dropdown menu too, not just
  desktop.

## On completion

- Update `docs/status.md` with what was built and any open items (e.g. if only
  partial content was translated by launch, log exactly which sections still need
  Hindi copy).
- Log all real decisions (i18n approach chosen, SEO/URL strategy, font choice) in
  `docs/04-process/decisions.md` with the reasoning and rejected alternatives, per
  this project's established convention.