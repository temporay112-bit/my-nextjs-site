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
        "relative w-full bg-[#FFFFFF] text-[#171717] py-12 sm:py-14 lg:py-16 border-b border-[#E5E7EB] overflow-hidden",
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

        {/* 12-Product Grid: 4 cols on desktop (3 rows), 2 cols on mobile (6 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-10 sm:mt-12">
          {products.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#FFFFFF] shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E7EB] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
            >
              {/* Product Image Covering Card */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />

              {/* Floating Bottom Info Overlay Box */}
              <div className="absolute left-2.5 right-2.5 bottom-2.5 sm:left-3 sm:right-3 sm:bottom-3 bg-[#FFFFFF] rounded-xl p-2.5 sm:p-3.5 shadow-md border border-black/5 flex flex-col gap-1 sm:gap-1.5 pointer-events-auto">
                {/* Product Name */}
                <h3 className="font-sora text-xs sm:text-sm font-bold text-black line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                {/* GET QUOTE with Elongated Horizontal Arrow Line */}
                <div className="flex items-center justify-between font-inter text-xs font-semibold text-black uppercase tracking-wider group-hover:text-electric-lime transition-colors mt-0.5">
                  <span className="shrink-0 font-sora font-extrabold text-xs">GET QUOTE</span>
                  <span className="flex-1 mx-2 sm:mx-2.5 h-[1.5px] bg-black/60 group-hover:bg-electric-lime transition-colors" />
                  <ArrowRight className="w-4 h-4 text-black group-hover:text-electric-lime transition-transform group-hover:translate-x-1 shrink-0 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Button
            variant="outline"
            size="md"
            href={NEW_ARRIVALS_CONTENT.cta.href || "/products"}
            className="rounded-none border-[#171717] text-[#171717] hover:bg-electric-lime hover:border-electric-lime hover:text-[#050505] transition-all duration-300 font-extrabold shadow-sm"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
