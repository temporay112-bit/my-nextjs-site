"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
import type { Product, Category } from "@/lib/db/types";
import { ProductQuickViewModal } from "@/components/products/ProductQuickViewModal";

interface ProductCatalogGridProps {
  products: Product[];
  categories: Category[];
}

export function ProductCatalogGrid({ products, categories }: ProductCatalogGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "SPORT APPAREL";
  };

  if (products.length === 0) {
    return (
      <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] p-12 text-center rounded-none shadow-sm">
        <p className="font-sora text-base font-bold uppercase text-[#171717]">
          No products found in this category
        </p>
        <p className="font-inter text-xs text-[#6B7280] mt-2 max-w-md mx-auto">
          Try selecting another category or view all verified B2B apparel styles in our manufacturing portfolio.
        </p>
        <Link
          href="/products"
          className="inline-block mt-6 px-6 py-3 bg-[#050505] text-[#FFFFFF] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#171717] transition-colors rounded-none"
        >
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
        {products.map((product) => {
          const categoryName = getCategoryName(product.categoryId);

          return (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FFFFFF] border border-[#E5E7EB] rounded-none overflow-hidden hover:border-[#171717] transition-all duration-300 relative shadow-sm hover:shadow-md"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 ease-in-out motion-reduce:transition-none"
                  loading="lazy"
                />

                {/* Desktop Quick View Overlay */}
                <div className="hidden lg:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-in-out items-center justify-center p-4">
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(product)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFFFFF] text-[#050505] font-sora text-[11px] font-bold uppercase tracking-widest rounded-none shadow-lg hover:bg-[#B7FF00] hover:text-[#050505] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>QUICK VIEW</span>
                  </button>
                </div>
              </div>

              {/* Text Info Container below image */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-[#E5E7EB]">
                <div>
                  <span className="font-barlow text-[11px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                    {categoryName}
                  </span>

                  <Link href={`/products/${product.slug}`} className="group/title block">
                    <h3 className="font-sora text-sm sm:text-[15px] font-bold text-[#171717] group-hover/title:text-[#050505] transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                {/* Mobile Quick Action Link */}
                <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 font-barlow text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#000000] group/link"
                  >
                    <span>Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6B7280] group-hover/link:text-[#171717] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(product)}
                    className="lg:hidden p-1.5 text-[#6B7280] hover:text-[#171717] transition-colors"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          categoryName={getCategoryName(quickViewProduct.categoryId)}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
