"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, SlidersHorizontal, X, Layers } from "lucide-react";
import type { Category } from "@/lib/db/types";

interface ProductsCatalogSidebarProps {
  categories: Category[];
  totalProductsCount: number;
}

export function ProductsCatalogSidebar({ categories, totalProductsCount }: ProductsCatalogSidebarProps) {
  const searchParams = useSearchParams();
  const currentCategorySlug = searchParams.get("category") || "";
  const currentSubcategoryId = searchParams.get("subcategory") || "";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Group into parent categories & subcategories
  const parentCategories = categories.filter((c) => !c.parentId);
  const getSubcategories = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  // Track expanded categories (default expand active parent)
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    parentCategories.forEach((p) => {
      if (p.slug === currentCategorySlug) {
        initial[p.id] = true;
      }
    });
    return initial;
  });

  const toggleParent = (id: string) => {
    setExpandedParents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const SidebarContent = (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#171717]" />
          <h2 className="font-sora text-sm font-bold uppercase tracking-wider text-[#171717]">
            Categories
          </h2>
        </div>
        <span className="font-barlow text-[11px] font-bold text-[#6B7280]">
          {categories.length} ITEMS
        </span>
      </div>

      <nav aria-label="Product Categories Navigation" className="space-y-1">
        {/* All Products Link */}
        <Link
          href="/products"
          onClick={() => setIsMobileOpen(false)}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sora font-bold uppercase tracking-wider transition-colors rounded-none ${
            !currentCategorySlug
              ? "bg-[#050505] text-[#B7FF00]"
              : "text-[#171717] hover:bg-[#F3F4F6]"
          }`}
        >
          <span>ALL PRODUCTS</span>
          <span className="font-barlow text-[11px] opacity-75">{totalProductsCount}</span>
        </Link>

        {/* Parent Categories */}
        {parentCategories.map((parent) => {
          const subs = getSubcategories(parent.id);
          const isSelected = currentCategorySlug === parent.slug;
          const isExpanded = expandedParents[parent.id] ?? isSelected;

          return (
            <div key={parent.id} className="pt-1">
              <div className="flex items-center justify-between">
                <Link
                  href={`/products?category=${parent.slug}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex-1 flex items-center justify-between px-3 py-2 text-xs font-sora font-bold uppercase tracking-wider transition-colors rounded-none ${
                    isSelected && !currentSubcategoryId
                      ? "bg-[#050505] text-[#B7FF00]"
                      : "text-[#171717] hover:bg-[#F3F4F6]"
                  }`}
                >
                  <span>{parent.name}</span>
                </Link>

                {subs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleParent(parent.id)}
                    aria-label={`Toggle ${parent.name} Subcategories`}
                    className="p-2 text-[#6B7280] hover:text-[#171717] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories Accordion */}
              {subs.length > 0 && isExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-[#E5E7EB] ml-3 my-1">
                  {subs.map((sub) => {
                    const isSubSelected = currentSubcategoryId === sub.id;
                    return (
                      <Link
                        key={sub.id}
                        href={`/products?category=${parent.slug}&subcategory=${sub.id}`}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block px-2.5 py-1.5 font-inter text-xs transition-colors rounded-none ${
                          isSubSelected
                            ? "font-bold text-[#050505] bg-[#E5E7EB]"
                            : "text-[#4B5563] hover:text-[#171717] hover:bg-[#F9FAFB]"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6 flex items-center justify-between bg-[#FFFFFF] border border-[#E5E7EB] p-3 rounded-none">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 font-sora text-xs font-bold uppercase tracking-wider text-[#171717]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#B7FF00] bg-[#050505] p-0.5" />
          <span>Filter by Category</span>
        </button>
        <span className="font-inter text-xs text-[#6B7280]">
          {currentCategorySlug ? currentCategorySlug.toUpperCase() : "ALL PRODUCTS"}
        </span>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-[260px] flex-shrink-0">
        <div className="sticky top-28 bg-[#FFFFFF] border border-[#E5E7EB] p-5 rounded-none shadow-sm">
          {SidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FFFFFF] h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
                <span className="font-sora text-sm font-bold uppercase text-[#171717]">
                  Categories
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1 text-[#6B7280] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {SidebarContent}
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] mt-8">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 bg-[#050505] text-[#FFFFFF] font-sora text-xs font-bold uppercase tracking-wider text-center"
              >
                Close Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
