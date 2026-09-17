'use client';

import { ProductCard } from '@/components/ui/ProductCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { products } from '@/lib/content/products';

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-20">
          <h2 className="font-display text-h1 uppercase tracking-tight text-center mb-6">
            A Complete Range of Security & Automation Solutions
          </h2>
          <p className="text-text-secondary text-body leading-relaxed text-center max-w-3xl mx-auto">
            Complete Security. Smart Living.
          </p>
        </div>

        {/* Product Grid */}
        <StaggerContainer>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 items-stretch">
            {products.map((product) => (
              <StaggerItem key={product.title} className="h-full">
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
    </section>
  );
}