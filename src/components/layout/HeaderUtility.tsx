"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderUtilityProps {
  className?: string;
}

export function HeaderUtility({ className }: HeaderUtilityProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      {/* Utility Container matching visual reference */}
      <div className="flex items-center gap-1 bg-light-grey/40 rounded-full px-2.5 py-1.5 border border-light-grey/80">
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-1.5 text-graphite hover:text-slots-black transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:outline-none"
          aria-label={isSearchOpen ? "Close Search" : "Open Search"}
          aria-expanded={isSearchOpen}
        >
          {isSearchOpen ? (
            <X className="w-4 h-4 stroke-[2]" />
          ) : (
            <Search className="w-4 h-4 stroke-[2]" />
          )}
        </button>

        <span className="w-px h-3.5 bg-technical-grey/30" aria-hidden="true" />

        <Link
          href="/contact"
          className="p-1.5 text-graphite hover:text-slots-black transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:outline-none"
          aria-label="Client Portal / Inquire"
        >
          <User className="w-4 h-4 stroke-[2]" />
        </Link>
      </div>

      {/* Expandable Search Overlay */}
      {isSearchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-slots-white border border-light-grey rounded-xl shadow-header-scrolled p-3 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <Search className="w-4 h-4 text-technical-grey flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, OEM, golfwear..."
            className="w-full text-xs font-inter text-slots-black placeholder:text-technical-grey bg-transparent outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="text-[10px] font-sora font-bold bg-slots-black text-slots-white px-2.5 py-1 rounded-md hover:bg-carbon-grey transition-colors uppercase tracking-wider"
          >
            Go
          </button>
        </form>
      )}
    </div>
  );
}
