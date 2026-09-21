# Session 14 — Global Site-Wide Theming

**Status:** Detailed, palette finalized via prototyping — ready for Explore phase.

**Role:** Builder — significant architectural change (global state, CSS variable
restructuring across the entire color system). Full Explore → Plan → Implement → Verify
discipline.

**Blocked by:** Session 13 complete.

## Session goal

Lift the LightBurst theme selector's control from "affects only its own canvas" to
"controls the entire site's color scheme" — buttons, links, text, backgrounds, borders,
the Carousel's dot indicators, everything. Selecting "Sunset" in the interactive visual
re-skins the whole page, live.

## Confirmed decisions

- **Scope of recolor:** FULL — not accent-only. Backgrounds, text, buttons, links, borders
  all shift per theme, not just the accent color.
- **Persistence:** NONE. Resets to Daytime (the current site's default look) on every new
  visit, matching the existing no-persistence convention for language and font-size.
  Daytime = the site's current, unchanged colors.
- **Design constraint (critical):** the LightBurst canvas's own decorative palette
  (bgTop/bgBottom/line/dot hex values, already tuned and locked in Session 13) is NOT the
  same thing as the sitewide UI palette. The canvas colors were tuned for a decorative
  animated visual with no text sitting on them; the sitewide palette needs its own
  properly contrast-checked values (background/text/accent/border) per theme, inspired by
  each theme's mood but independently designed for real UI legibility.

## Finalized site-wide palette (from prototyping — do not redesign)

| Theme | bgPrimary | bgSecondary | bgElevated | textPrimary | textSecondary | accent | accentText | border |
|---|---|---|---|---|---|---|---|---|
| Daytime (unchanged) | #0A0A0A | #141414 | #1C1C1C | #FFFFFF | #A3A3A3 | #2DD4E8 | #04211E | #2A2A2A |
| Pre-dawn | #0D0A1F | #161029 | #201936 | #F1EEFB | #B3A8DE | #9D7FEA | #16102B | #2E2450 |
| Sunrise | #2B120A | #3A1810 | #4A2014 | #FFF6E9 | #E8B98F | #FF9142 | #2B120A | #5A2C18 |
| Dusk | #1F0F1E | #2C1730 | #3A1F40 | #FCEEF7 | #D9A6C9 | #E667B8 | #1F0F1E | #4A2650 |
| Sunset | #210A1C | #331128 | #451936 | #FFEFE3 | #E8A98C | #FF7A4D | #210A1C | #4D1E3A |
| Night | #050A14 | #0A1424 | #0F1E33 | #EAF6FF | #8FB4D6 | #4FD8FF | #03222E | #1A3350 |

Still needed (not yet specified — resolve in Plan phase): `accentHover`, `accentMuted`,
and `borderAccent` per theme (existing tokens beyond the 8 prototyped above) — derive
these consistently with each theme's accent color, following whatever mathematical
relationship the current Daytime values have to `--color-accent` (e.g. if `accent-hover`
is currently a lightened version of `accent`, apply the same lightening amount to each
new theme's accent).

## To detail before implementation (resolve in Plan phase)

- **State architecture:** lift theme selection out of LightBurst's local state into a
  small global Context (mirroring I18nProvider's established pattern) — LightBurst reads/
  writes this shared state instead of owning it locally. LightBurst's own canvas palette
  table stays exactly as-is (Session 13's work, untouched) — only the *selection index*
  becomes global, driving both LightBurst's canvas AND the sitewide CSS override.
- **CSS architecture:** move the color tokens (currently in `@theme inline`, confirmed via
  Session 08's exploration to be there specifically because "no runtime override existed"
  at the time) to the same `:root` custom-property + non-inline `@theme` pattern already
  proven for type-scale (Session 08) and Hindi font-family (Session 10). Add
  `:root[data-site-theme="..."]` override blocks for the 5 non-Daytime themes.
- **Audit for hardcoded colors:** before assuming "most of the site updates for free,"
  actually grep/verify no component uses a literal hex value that bypasses the token
  system (Session 08 already found exactly this bug once for type-scale — check colors
  the same way, don't assume it's clean).
- **Explicitly named target:** the Carousel's dot indicators (specifically called out by
  Kewal — "dot color everything") need to be confirmed as using the token system, not a
  hardcoded color.
- **Transition smoothness:** should sitewide color changes cross-fade smoothly like
  LightBurst's own 450ms transition (Session 13), or switch instantly like the Hindi font
  override does today? Propose an approach and justify it — a global CSS transition on
  every color property everywhere carries real risk of unintended side effects on hover/
  interaction states, so this needs real research, not just "yes let's animate it."
- **SSR safety:** same established, already-proven pattern (I18nProvider) — 'use client'
  provider, DOM/attribute writes only inside useEffect, default state always matches
  server-rendered output (Daytime) so there's no hydration mismatch risk from this new
  state, mirroring exactly why the no-persistence decision keeps this safe.

## Phase: Explore

- Read the full current color-token setup in globals.css and confirm the exact current
  `@theme inline` structure for colors.
- Grep every component file for literal hex values that might bypass the token system —
  produce a complete list of any hardcoded colors found, especially checking Carousel.tsx's
  dot indicators specifically.
- Confirm LightBurst.tsx's exact current internal state structure, to plan the lift-to-
  global-Context change precisely.
- Research the existing I18nProvider pattern in full, to replicate its exact SSR-safety
  approach for this new theme Context.

## Phase: Plan

- Present the exact Context architecture, the CSS restructuring diff, the derived
  accentHover/accentMuted/borderAccent values per theme, the transition-smoothness
  decision with reasoning, and results of the hardcoded-color audit with fixes for
  anything found.
- Wait for explicit "approved" before implementing.

## Phase: Implement

- Reviewable increments (e.g., CSS restructuring + Context scaffolding first — verify
  Daytime renders byte-identical to before — then wire LightBurst to the global state,
  then verify all 5 other themes render correctly sitewide) — each committed once
  verified.

## Phase: Verify

- Real screenshot verification of the FULL page (not just LightBurst's section) under
  each of the 6 themes, both desktop and mobile.
- Confirm Daytime is pixel-identical to the pre-Session-14 site (critical regression
  check, given how much of the color system is being restructured).
- Confirm no hydration mismatch/console errors from the new Context.
- Confirm Hindi mode + font-scale feature both still work correctly layered under every
  theme (three independent systems now composing: language, font-scale, site-theme).
- Confirm the Carousel dots and every other explicitly-named element actually change
  color correctly.
- Lighthouse sanity check — this touches core CSS sitewide, worth confirming no
  performance regression from Session 08/13's established baselines.

## On completion

- Log final architecture and all real decisions in `docs/04-process/decisions.md`.
- Update `docs/status.md`.