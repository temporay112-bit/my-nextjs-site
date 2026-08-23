"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/db/types";

interface ProductQuickViewModalProps {
  product: Product | null;
  categoryName?: string;
  onClose: () => void;
}

export function ProductQuickViewModal({ product, categoryName, onClose }: ProductQuickViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#E5E7EB] rounded-none shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-10 p-2 bg-[#FFFFFF]/80 hover:bg-[#F3F4F6] text-[#171717] rounded-none transition-colors border border-[#E5E7EB]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-[#FAFAFA] p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E5E7EB] relative">
          <div className="relative w-full aspect-square max-w-[320px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        {/* Right: Technical Details & Quote Action */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="font-barlow text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">
              {categoryName || "B2B CUSTOM APPAREL"}
            </span>

            <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase text-[#171717] mt-1 leading-tight">
              {product.name}
            </h3>

            {product.description && (
              <p className="font-inter text-xs text-[#6B7280] mt-3 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-5 pt-4 border-t border-[#E5E7EB] space-y-2">
              <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#171717] block">
                Manufacturing Specifications:
              </span>
              <div className="space-y-1.5">
                {(product.specifications && product.specifications.length > 0
                  ? product.specifications
                  : [
                      "OEM / ODM Private Label Customization",
                      "Custom dyeing, printing, or embroidery",
                      "Custom neck labels & export hangtags",
                      "Standard B2B production from Sialkot",
                    ]
                ).map((spec: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 font-inter text-xs text-[#374151]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF00] bg-[#050505] rounded-full flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <Link
              href={`/#quote?category=${encodeURIComponent(categoryName || "")}&product=${encodeURIComponent(product.name)}`}
              onClick={onClose}
              className="w-full py-3 px-4 bg-[#050505] hover:bg-[#171717] text-[#FFFFFF] font-sora text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 group rounded-none"
            >
              <span>Request Quote for This Item</span>
              <ArrowRight className="w-4 h-4 text-[#B7FF00] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-transparent border border-[#D1D5DB] hover:border-[#171717] text-[#171717] font-sora text-xs font-bold uppercase tracking-wider text-center transition-colors rounded-none"
            >
              View Full Product Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
