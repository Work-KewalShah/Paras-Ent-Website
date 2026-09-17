'use client';

import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/ui/ProductCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { products } from '@/lib/content/products';
import { ProductShowcase } from './ProductShowcase';

export default function ProductGrid() {
  const { t } = useTranslation();

  // Resolved once here — both the mobile grid and the desktop showcase
  // consume this same array as plain props, so there's a single t() call
  // per product/key, not duplicated lookups across two layouts.
  const resolvedProducts = products.map((product) => ({
    slug: product.slug,
    image: product.image,
    title: t(`products.items.${product.slug}.title`),
    tagline: t(`products.items.${product.slug}.tagline`),
    features: t(`products.items.${product.slug}.features`, { returnObjects: true }) as string[],
    useCases: product.useCases
      ? (t(`products.items.${product.slug}.useCases`, { returnObjects: true }) as string[])
      : undefined,
  }));

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-20">
          <h2 className="font-display text-h1 uppercase tracking-tight text-center mb-6">
            {t('products.headline')}
          </h2>
          <p className="text-text-secondary text-body leading-relaxed text-center max-w-3xl mx-auto">
            {t('products.subheadline')}
          </p>
        </div>

        {/* Mobile: existing grid, unchanged */}
        <div className="lg:hidden">
          <StaggerContainer>
            <div className="grid gap-6 sm:grid-cols-2 items-stretch">
              {resolvedProducts.map((product) => (
                <StaggerItem key={product.slug} className="h-full">
                  <ProductCard
                    title={product.title}
                    tagline={product.tagline}
                    features={product.features}
                    useCases={product.useCases}
                    image={product.image}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Desktop: scroll-synced showcase */}
        <div className="hidden lg:block">
          <ProductShowcase products={resolvedProducts} />
        </div>
      </div>
    </section>
  );
}