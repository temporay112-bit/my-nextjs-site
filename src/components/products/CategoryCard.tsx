import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CatalogueProduct } from "@/data/products-catalogue";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  product: CatalogueProduct;
  className?: string;
}

export function CategoryCard({ product, className }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-xl bg-slots-white border border-light-grey hover:border-slots-black hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div>
        {/* Real Product Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA] flex items-center justify-center p-4 border-b border-light-grey">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Optional Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-slots-black text-[10px] font-sora font-bold text-electric-lime uppercase tracking-wider shadow-xs">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Category Tag */}
          <span className="font-barlow text-xs font-bold uppercase tracking-widest text-technical-grey block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <h3 className="font-sora text-base sm:text-lg font-bold text-slots-black group-hover:text-slots-black transition-colors leading-snug mb-2.5">
            {product.title}
          </h3>

          {/* Product Description */}
          <p className="font-inter text-xs text-carbon-grey leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Key Specs Pills */}
          <div className="space-y-1.5 mb-2">
            {product.specifications.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] font-inter text-carbon-grey">
                <Check className="w-3.5 h-3.5 text-slots-black shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="p-5 pt-0 sm:p-6 sm:pt-0">
        <Link
          href="/contact#quote"
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-[#F5F5F3] hover:bg-electric-lime text-slots-black font-sora text-xs font-bold uppercase tracking-wider transition-colors duration-200 group-hover:shadow-xs"
        >
          <span>VIEW CATEGORY</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
