# Responsive Rules

Mobile-first. Breakpoints match Tailwind's defaults — no custom breakpoint scale needed.

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Type scale for hero/h1/h2 mobile vs. desktop sizes is already defined in `design-system.md` — this file covers layout behavior, not font sizing.

---

## Navbar
- **Desktop (lg+):** full anchor link row visible, phone number + CTA button on the right
- **Mobile/tablet (<lg):** anchor links collapse into a dropdown panel; phone number stays visible and pinned (never hidden inside the menu) since click-to-call is a primary mobile conversion path

## Hero
- **Desktop:** headline/subheadline/CTAs on one side, hero visual alongside or as a full-bleed background
- **Mobile:** stacks vertically — text first, then CTAs, then hero visual (as a smaller supporting image, not full-bleed, to avoid pushing content below the fold)

## Trust Pillars (Security/Innovation/Service) + Trust Badges
- **Desktop:** horizontal row, all items visible at once
- **Mobile:** horizontal scroll-snap row (not a vertical stack) — keeps the "row of trust markers" feeling intact rather than turning into a long list

## Stats Row (25+ Years, 8,000+ Installations, etc.)
- **Desktop:** single row, 3-4 columns
- **Mobile:** 2x2 grid

## Product Suite (9 categories)
- **Desktop (lg+):** 3-column grid
- **Tablet (md):** 2-column grid
- **Mobile (<md):** single column, full-width cards
- If filter tabs (Home/Business/Institutional) are implemented: horizontal scroll-snap row on mobile, never wrapped or collapsed into a dropdown

## Process & Service Sections (3-step process, 4-pillar service grid)
- **Desktop:** horizontal layout — numbered steps side-by-side, 4-pillar grid as 2x2 or 4-across
- **Mobile:** vertical stack — numbered steps become a top-to-bottom timeline; 4-pillar grid becomes 2x2 (not a single column, to avoid excessive scroll length)

## Case Studies
- **Desktop:** 2-column side-by-side (matches the booklet's original layout)
- **Mobile:** stacked, single column, one case study fully visible before the next

## Partnerships / Client List
- **All breakpoints:** horizontal marquee/scroll — this pattern works identically on mobile and desktop, no layout change needed

## For Professionals (B2B) Section
- **Desktop:** stacked, text only
- **Mobile:** stacked, text only

## Contact Section (Session 05 — no form)
- **Desktop:** two number cards side-by-side (Inquiry / Service), WhatsApp button, "View on Google" button, "Visit Us" block with address
- **Mobile:** cards stack single column; WhatsApp + Visit Us buttons remain tappable; phone links within cards maintain ≥44px touch targets

## Footer
- **Desktop:** multi-column layout (logo/tagline, links, contact)
- **Mobile:** single column, stacked, links remain tappable with adequate spacing

---

## Touch Target Rule (applies everywhere on mobile)

All interactive elements — nav links, buttons, filter tabs, form inputs — maintain a minimum 44x44px touch target, per standard mobile accessibility guidelines. This overrides any visual sizing from `design-system.md` if the two ever conflict on small screens.
