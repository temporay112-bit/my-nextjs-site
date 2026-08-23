"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsCatalogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductsCatalogPagination({
  currentPage,
  totalPages,
}: ProductsCatalogPaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Products Pagination"
      className="mt-12 pt-8 border-t border-[#E5E7EB] flex items-center justify-between gap-4"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FFFFFF] border border-[#D1D5DB] text-[#171717] hover:border-[#171717] font-sora text-xs font-bold uppercase tracking-wider transition-colors rounded-none shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Link>
      ) : (
        <button
          disabled
          aria-disabled="true"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#9CA3AF] font-sora text-xs font-bold uppercase tracking-wider rounded-none opacity-60 cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((pageNum) => {
          const isCurrent = pageNum === currentPage;
          return isCurrent ? (
            <span
              key={pageNum}
              aria-current="page"
              className="w-9 h-9 flex items-center justify-center bg-[#050505] text-[#B7FF00] font-sora text-xs font-bold rounded-none"
            >
              {pageNum}
            </span>
          ) : (
            <Link
              key={pageNum}
              href={createPageUrl(pageNum)}
              className="w-9 h-9 flex items-center justify-center bg-[#FFFFFF] border border-[#D1D5DB] text-[#171717] hover:border-[#171717] font-sora text-xs font-bold rounded-none transition-colors shadow-sm"
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FFFFFF] border border-[#D1D5DB] text-[#171717] hover:border-[#171717] font-sora text-xs font-bold uppercase tracking-wider transition-colors rounded-none shadow-sm"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          disabled
          aria-disabled="true"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] text-[#9CA3AF] font-sora text-xs font-bold uppercase tracking-wider rounded-none opacity-60 cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}
