# Reusable Skills / Patterns

Concrete, copy-pasteable patterns every session should follow, so components stay consistent without each session reinventing the same logic.

## 1. Section Component Template

Every file in `components/sections/` follows this shape:

```tsx
// components/sections/ExampleSection.tsx
import { Reveal } from '@/components/ui/Reveal';
import { exampleContent } from '@/lib/content/example';

export default function ExampleSection() {
  return (
    <section id="example" className="py-24 px-6">
      <Reveal>
        {/* section content, sourced from lib/content, never hardcoded inline */}
      </Reveal>
    </section>
  );
}
```

- `id` matches the anchor used in the navbar (see `content-brief.md` nav links)
- Content is always imported from `lib/content/`, never written directly in the component

## 2. The `Reveal` Wrapper (Pattern 2 from motion-guide.md)

One shared component implements the scroll-triggered fade+rise so it's never reimplemented per-section:

```tsx
// components/ui/Reveal.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Every scroll-reveal in the site uses this component — do not write a second version.

## 3. Stagger Grid Pattern

For grids (Product Suite, Case Studies) — a `StaggerContainer` wraps mapped items:

```tsx
// components/ui/StaggerContainer.tsx
'use client';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function StaggerContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}
```

## 4. Data-Driven Rendering

Never hardcode repeated items as individual JSX blocks — always map over the content array:

```tsx
// Correct
{products.map((product) => (
  <StaggerItem key={product.title}>
    <ProductCard {...product} />
  </StaggerItem>
))}

// Incorrect — do not do this
<ProductCard title="CCTV Cameras" ... />
<ProductCard title="PTZ Camera" ... />
// ...11 times
```

## 5. Card Hover Pattern (Pattern 3 from motion-guide.md)

Applied via a shared class/variant on the `Card` primitive — see `design-system.md` for the exact token values (`--glow-accent`, `--color-border-accent`). Implement once on `components/ui/Card.tsx`, compose `ProductCard` and `CaseStudyCard` on top of it rather than duplicating the hover logic.

## 6. Button Pattern (Pattern 7 from motion-guide.md)

One `Button` component in `components/ui/Button.tsx` handles both hover and click micro-interactions per `motion-guide.md`. Every CTA in the site — hero, product cards, contact form, footer — uses this component. No section should implement its own button styling.

## 7. Reduced Motion

Already baked into the `Reveal` pattern above via `useReducedMotion()`. Any additional custom animation (e.g. the scan-line effect, stat counters) must check this hook the same way — never assume motion is always wanted.
