import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductCategory;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const isFeatured = product.featured;

  return (
    <Link
      href={product.href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-graphite border border-carbon-grey/60 hover:border-light-grey/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime",
        isFeatured ? "md:col-span-2 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]" : "col-span-1 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px]",
        className
      )}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes={isFeatured ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
        {/* Editorial gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slots-black via-slots-black/60 to-slots-black/25" />
        <div className="absolute inset-0 bg-slots-black/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Top Meta: Number + Optional Featured Badge */}
      <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between pointer-events-none">
        <span className="font-sora text-xs font-bold text-electric-lime tracking-widest-brand px-2.5 py-1 rounded-full bg-slots-black/60 border border-light-grey/10 backdrop-blur-md">
          {product.number}
        </span>

        {product.badge && (
          <span className="font-sora text-[10px] sm:text-xs font-bold text-slots-black bg-electric-lime uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 sm:p-6 sm:pb-7 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slots-white group-hover:text-electric-lime transition-colors duration-200">
              {product.title}
            </h3>
            <p className="font-inter text-xs sm:text-sm text-light-grey/80 line-clamp-2 max-w-xl mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action indicator arrow */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slots-black/70 border border-light-grey/20 group-hover:border-electric-lime group-hover:bg-electric-lime text-slots-white group-hover:text-slots-black flex items-center justify-center transition-all duration-300 shadow-md">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </div>
        </div>

        {/* View Category text label */}
        <div className="pt-2 flex items-center gap-1.5 text-xs font-sora font-semibold uppercase tracking-wider text-technical-grey group-hover:text-light-grey transition-colors">
          <span>View Category</span>
        </div>
      </div>
    </Link>
  );
}
