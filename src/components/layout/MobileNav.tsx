"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_NAV_ITEMS, PRIMARY_CTA } from "@/data/navigation";
import { Button } from "@/components/shared/Button";
import { X, ArrowRight, ShieldCheck, Globe, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden flex flex-col justify-between bg-slots-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm ml-auto h-full bg-slots-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-light-grey">
          <div className="flex items-center gap-2">
            <span className="font-sora font-extrabold text-lg tracking-tight uppercase text-slots-black">
              SLOTS
            </span>
            <span className="font-inter text-[9px] font-bold tracking-[0.2em] uppercase text-technical-grey">
              SPORTSWEAR
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-graphite hover:text-slots-black hover:bg-light-grey/60 transition-colors focus-visible:ring-2 focus-visible:ring-slots-black"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 px-5 py-6 space-y-6">
          {/* Quick Search */}
          <form
            action="/products"
            method="GET"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("search") as HTMLInputElement;
              if (input && input.value.trim()) {
                window.location.href = `/products?search=${encodeURIComponent(input.value.trim())}`;
              }
            }}
            className="relative flex items-center"
          >
            <Search className="w-4 h-4 absolute left-3.5 text-technical-grey" />
            <input
              type="text"
              name="search"
              placeholder="Search products or OEM..."
              className="w-full pl-10 pr-4 py-2.5 bg-light-grey/40 border border-light-grey rounded-full text-xs font-inter text-slots-black placeholder:text-technical-grey focus:outline-none focus:border-slots-black transition-colors"
            />
          </form>

          {/* Navigation Links */}
          <nav aria-label="Mobile Menu Links">
            <ul className="space-y-1 list-none p-0 m-0">
              {ALL_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-xl font-inter text-base transition-all duration-150",
                        isActive
                          ? "bg-light-grey/80 font-bold text-slots-black"
                          : "text-graphite hover:bg-light-grey/40 hover:text-slots-black font-medium"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isActive ? "text-slots-black translate-x-1" : "text-technical-grey"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
              {/* Client Portal / Sign In Link */}
              <li>
                <Link
                  href="/login"
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl font-inter text-base transition-all duration-150",
                    pathname === "/login" || pathname === "/account"
                      ? "bg-light-grey/80 font-bold text-slots-black"
                      : "text-graphite hover:bg-light-grey/40 hover:text-slots-black font-medium"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-slots-black" />
                    <span>Client Portal / Sign In</span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      pathname === "/login" || pathname === "/account" ? "text-slots-black translate-x-1" : "text-technical-grey"
                    )}
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Trust Highlights */}
          <div className="pt-4 border-t border-light-grey/80 space-y-2.5 text-xs text-technical-grey">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slots-black flex-shrink-0" />
              <span>Sialkot, Pakistan · Exporting Worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slots-black flex-shrink-0" />
              <span>OEM / ODM · Private Label · Custom Sportswear</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-light-grey bg-light-grey/20">
          <Button
            variant="primary"
            size="md"
            href={PRIMARY_CTA.href}
            fullWidth
            onClick={onClose}
            className="shadow-md"
          >
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
