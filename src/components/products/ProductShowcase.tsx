import React from "react";
import { PRODUCT_CATEGORIES, PRODUCTS_SHOWCASE_CONTENT } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductShowcaseProps {
  className?: string;
}

/**
 * ProductShowcase — BUILT FOR PERFORMANCE / EXPLORE OUR COLLECTION
 * Background: Solid White (#FFFFFF) matching New Arrivals.
 * Standard Spacing: py-14 sm:py-16 lg:py-16.
 */
export function ProductShowcase({ className }: ProductShowcaseProps) {
  return (
    <section
      id="products"
      aria-label="SLOTS SPORTSWEAR Product Categories"
      className={cn(
        "relative w-full bg-[#FFFFFF] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
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
          theme="light"
        />

        {/* Product Editorial Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6 mt-10 sm:mt-12">
          {PRODUCT_CATEGORIES.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section CTA Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            variant="outline"
            size="md"
            href={PRODUCTS_SHOWCASE_CONTENT.cta.href}
            className="border-[#171717] text-[#171717] hover:bg-electric-lime hover:text-slots-black hover:border-electric-lime transition-all duration-300 shadow-sm font-extrabold"
          >
            <span>{PRODUCTS_SHOWCASE_CONTENT.cta.label}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
