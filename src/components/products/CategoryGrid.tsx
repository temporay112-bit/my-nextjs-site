"use client";

import React, { useState } from "react";
import { PRODUCT_CATALOGUE_ITEMS, PRODUCT_FILTERS } from "@/data/products-catalogue";
import { CategoryCard } from "./CategoryCard";
import { SlidersHorizontal } from "lucide-react";

export function CategoryGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? PRODUCT_CATALOGUE_ITEMS
      : PRODUCT_CATALOGUE_ITEMS.filter((item) => item.categorySlug === activeFilter);

  return (
    <section
      id="catalogue-grid"
      className="w-full bg-[#F5F5F3] py-14 sm:py-18 lg:py-20 border-b border-light-grey"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Navigation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 sm:mb-12 pb-6 border-b border-light-grey">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slots-black" />
            <span className="font-sora text-xs sm:text-sm font-bold uppercase tracking-wider text-slots-black">
              Filter by Category
            </span>
            <span className="text-xs font-inter text-technical-grey">
              ({filteredProducts.length} verified styles)
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {PRODUCT_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.slug;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.slug)}
                  className={`px-4 py-2 rounded-full font-sora text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-slots-black text-electric-lime shadow-sm"
                      : "bg-slots-white text-carbon-grey hover:text-slots-black hover:bg-light-grey border border-light-grey"
                  }`}
                >
                  {filter.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Responsive Product Grid: 4 cols on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <CategoryCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
