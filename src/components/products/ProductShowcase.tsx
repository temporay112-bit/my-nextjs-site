import React from "react";
import { PRODUCT_CATEGORIES, PRODUCTS_SHOWCASE_CONTENT } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface ProductShowcaseProps {
  className?: string;
}

export function ProductShowcase({ className }: ProductShowcaseProps) {
  return (
    <section
      id="products"
      aria-label="SLOTS SPORTSWEAR Product Categories"
      className={cn(
        "relative w-full bg-slots-black text-slots-white py-16 sm:py-20 lg:py-28 border-b border-carbon-grey/40 overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={PRODUCTS_SHOWCASE_CONTENT.eyebrow}
          headline={PRODUCTS_SHOWCASE_CONTENT.headline}
          supportingText={PRODUCTS_SHOWCASE_CONTENT.supportingText}
          align="center"
          theme="dark"
        />

        {/* Product Editorial Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mt-12 sm:mt-16">
          {PRODUCT_CATEGORIES.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section CTA Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            href={PRODUCTS_SHOWCASE_CONTENT.cta.href}
            className="border-light-grey/30 text-slots-white hover:bg-electric-lime hover:text-slots-black hover:border-electric-lime transition-all duration-300 shadow-md font-extrabold"
          >
            {PRODUCTS_SHOWCASE_CONTENT.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
