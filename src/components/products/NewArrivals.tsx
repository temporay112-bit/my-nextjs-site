import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NEW_ARRIVALS_PRODUCTS, NEW_ARRIVALS_CONTENT } from "@/data/products";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewArrivalsProps {
  className?: string;
}

/**
 * NewArrivals — TASK 18: NEW ARRIVALS PRODUCT SECTION
 *
 * Location: Directly under BUILT FOR PERFORMANCE (ProductShowcase).
 * Background: Solid White (#FFFFFF).
 * Design: Sharp edges (0px border-radius), professional B2B cards.
 * Card Content: Category & Product Name ONLY below image.
 * Hover Behavior: Smooth "QUICK VIEW" overlay animation on desktop.
 * Layout: 4 columns x 2 rows (desktop), 2 columns (tablet), 1 column (mobile).
 */
export function NewArrivals({ className }: NewArrivalsProps) {
  const products = NEW_ARRIVALS_PRODUCTS.filter((p) => p.published);

  if (products.length === 0) return null;

  return (
    <section
      id="new-arrivals"
      aria-label="SLOTS SPORTSWEAR New Arrivals"
      className={cn(
        "relative w-full bg-[#FFFFFF] text-[#171717] py-14 sm:py-16 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={NEW_ARRIVALS_CONTENT.eyebrow}
          headline={NEW_ARRIVALS_CONTENT.headline}
          supportingText={NEW_ARRIVALS_CONTENT.supportingText}
          align="center"
          theme="light"
        />

        {/* 8-Product Grid: 4 cols on desktop (2 rows), 2 cols on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {products.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-none bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#171717] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105 motion-reduce:transform-none"
                />

                {/* Quick View Hover Overlay on Desktop */}
                <div
                  className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-in-out hidden sm:flex items-center justify-center motion-reduce:transition-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] text-[#171717] text-xs font-sora font-bold uppercase tracking-wider shadow-md rounded-none">
                    <Eye className="w-3.5 h-3.5 text-[#171717]" />
                    <span>QUICK VIEW</span>
                  </div>
                </div>
              </div>

              {/* Product Text Area: ONLY Category & Product Name */}
              <div className="p-4 sm:p-5 flex flex-col gap-1 border-t border-[#E5E7EB] bg-[#FFFFFF]">
                {/* Category Label */}
                <span className="font-barlow text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
                  {item.category}
                </span>

                {/* Product Name */}
                <h3 className="font-sora text-sm sm:text-[15px] font-bold text-[#171717] group-hover:text-electric-lime transition-colors duration-200 line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            variant="outline"
            size="md"
            href={NEW_ARRIVALS_CONTENT.cta.href}
            className="rounded-none border-[#171717] text-[#171717] hover:bg-electric-lime hover:border-electric-lime hover:text-[#050505] transition-all duration-300 font-extrabold shadow-sm"
          >
            <span>{NEW_ARRIVALS_CONTENT.cta.label}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
