# Motion Guide

All animations use Framer Motion. Every pattern below references tokens from `design-system.md` — durations and colors should not be hardcoded separately.

**Build note:** animation is NOT a separate late-stage phase. Each pattern below is implemented as part of the session that builds its section (see `04-process/` session files) — e.g. the hero load sequence is built in the same session as the hero itself, not deferred. Only cross-section consistency checking happens as a later pass.

---

## 1. Hero Load Sequence

Elements stagger in on page load, in this order: eyebrow → headline → subheadline → CTAs → hero visual.

- Each element: `opacity: 0 → 1`, `translateY: 20px → 0`
- Duration: 0.55s per element
- Easing: `[0.16, 1, 0.3, 1]` (strong ease-out)
- Stagger delay: 0.1s between elements
- Hero visual: duration 0.8s, `scale: 0.95 → 1`, starts after text elements
- Immediately follows: the scan-line effect (see Pattern 8)

## 2. Scroll-Triggered Section Reveals

Sections and card grids fade+rise into view once, on first scroll into viewport.

- Trigger: `whileInView`, `viewport={{ once: true, margin: "-100px" }}`
- Same treatment as hero elements: `opacity 0→1`, `translateY 20px→0`, duration 0.5s
- Grids (Product Suite, Case Studies): stagger children 0.08s apart, left-to-right/top-to-bottom

## 3. Card Hover States

Applies to: product cards, case study cards.

- Lift: `translateY(-5px)`, 0.25s ease
- Border: shifts to `var(--color-border-accent)`
- Glow: `box-shadow: var(--glow-accent)` fades in over 0.25s
- Inner icon/image: `scale: 1 → 1.05`, 0.4s (slower than card, layered feel)

## 4. Stat Counters

Applies to: the "25+ Years," "8,000+ Installations" stats row.

- Trigger: `whileInView`, once
- Animate numeric value via `useMotionValue` + `animate()`, duration 1.6s, `easeOut`
- Pair with a thin progress bar in `var(--color-accent)` filling alongside the count

## 5. Sticky/Shrinking Navbar

- Trigger: scroll position > 80px
- Padding reduces, `backdrop-filter: blur(12px)`, background fades to `rgba(10,10,10,0.85)`
- `box-shadow: var(--shadow-card)` fades in
- Duration: 0.3s

## 6. [REMOVED — attempted and removed in Session 08/09]

- Note: This scroll-linked visual effect was built but removed. The Product Grid cards serve the intended visual purpose; this pattern no longer applies.

Optional "wow" moment for the Product Suite section intro, if a suitable hero visual exists.

- Use `useScroll` + `useTransform` to map scroll progress (0→1) within the section to a visual property (image pan, crossfade between camera angles)
- Reserve for one moment only — do not apply this pattern broadly, or it undercuts its own impact

## 7. Button/CTA Micro-interactions

- Hover: background/border shifts to `var(--color-accent-hover)`, `scale: 1.02`
- Click: `scale: 0.97`, spring easing (`type: "spring", stiffness: 400, damping: 17`)
- Primary CTA ("Get Free Site Survey") and call button get the most confident hover treatment on the page — these are the conversion actions

## 8. Page-Load Scan Effect

Security-specific brand moment, plays once on hero load, after the text stagger completes.

- A thin horizontal bar in `var(--color-accent)`, `opacity: 0.6`, with a soft blur trail
- Animates `left: -10% → 110%` across the hero, over 1.2s, `ease-in-out`
- Single absolutely-positioned div — cheap to build, reinforces "surveillance/monitoring" without being gimmicky

---

## Reduced Motion

All patterns above should respect `prefers-reduced-motion: reduce` — fall back to instant `opacity` transitions with no translate/scale/scan effects for users with that preference set. This is a hard requirement, not optional polish — add it in the same session as each pattern, not as a separate accessibility pass.
