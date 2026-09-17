# Design System

## Important source note

The booklet PDF (`PE_Booklet_1.pdf`) includes a few trailing pages titled "About Us," "Apex Adventure Co.," and generic Canva placeholder content (revenue charts, "the team" bios, hiking-company copy). **These are leftover Canva template pages, not part of Paras Enterprises' actual brand or content** — they should be ignored entirely as a design or content source. The real brand material is everything on the black/white-themed cover pages, the case studies, the product range pages, and the "Let's Talk" back cover.

## Color Palette

The booklet's actual cover pages (labeled "BLACK THEME" and "WHITE THEME") confirm the direction already planned during earlier design discussion: a dark base with a single cyan/blue accent — this is genuine brand signal, not just a stylistic guess.

```css
:root {
  /* Base */
  --color-bg-primary: #0A0A0A;        /* near-black, primary background */
  --color-bg-secondary: #141414;      /* slightly lifted panels/cards */
  --color-bg-elevated: #1C1C1C;       /* hover/elevated card state */

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A3A3A3;    /* supporting/body text on dark bg */
  --color-text-muted: #8A8A8A;

  /* Accent — matches booklet's cyan highlight ("SINCE 1999", vision keywords) */
  --color-accent: #2DD4E8;
  --color-accent-hover: #5CE1F0;
  --color-accent-muted: #1A6E7A;      /* for subtle borders/glows */

  /* Light theme variant (booklet's alternate "WHITE THEME" cover) */
  --color-bg-light: #FFFFFF;
  --color-text-on-light: #0A0A0A;

  /* Borders */
  --color-border: #2A2A2A;
  --color-border-accent: rgba(45, 212, 232, 0.4);
}
```

**Usage rule:** one accent color only (cyan). No red, no orange, no secondary accent — matches the `motion-guide.md` principle of restraint and avoids the site feeling like a generic "security = red alert" cliché.

## Typography

The booklet's headline style is a bold, condensed, poster-style display font (all-caps, tightly tracked) paired with a clean sans-serif for body copy.

```css
:root {
  --font-display: 'Anton', sans-serif;   /* condensed, bold — headlines only */
  --font-body: 'Inter', sans-serif;      /* body copy, UI text, form labels */
}
```

**Type scale:**

| Token | Size (desktop) | Size (mobile) | Use |
|---|---|---|---|
| `--text-hero` | 72px | 40px | Hero headline |
| `--text-h1` | 48px | 32px | Section headlines |
| `--text-h2` | 32px | 24px | Card/subsection headlines |
| `--text-h3` | 20px | 18px | Card taglines |
| `--text-body` | 16px | 15px | Paragraph/feature text |
| `--text-small` | 14px | 13px | Captions, labels, badges |

Headlines (`--font-display`) are typically set in uppercase per the booklet's style; body text stays in normal sentence case for readability.

## Spacing Scale

Standard 4px base unit, consistent with Tailwind's default scale — no custom overrides needed:
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
```

## Border Radius

```css
:root {
  --radius-sm: 8px;    /* buttons, badges, form inputs */
  --radius-md: 16px;   /* product cards */
  --radius-lg: 24px;   /* case study cards, large panels — matches booklet's rounded-corner card treatment */
}
```

## Shadows & Glow

Dark theme calls for glow rather than harsh drop shadows:
```css
:root {
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --glow-accent: 0 0 24px rgba(45, 212, 232, 0.25);   /* used on hover per motion-guide.md */
}
```

## Notes for other docs

- `motion-guide.md`'s card hover-state glow should reference `--glow-accent` and `--color-border-accent`.
- `component-spec.md` should default all components to the dark theme (`--color-bg-primary`); the light theme tokens exist for future flexibility but aren't part of the initial build scope unless requested.
- Confirm font licensing/availability for `Anton` via Google Fonts before locking — it's freely available, but verify it renders the same condensed weight seen in the booklet.
