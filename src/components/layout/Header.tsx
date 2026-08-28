"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/layout/Logo";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { HeaderCTA } from "@/components/layout/HeaderCTA";
import { HeaderUtility } from "@/components/layout/HeaderUtility";
import { MobileNav } from "@/components/layout/MobileNav";
import { TopAnnouncementBar } from "@/components/layout/TopAnnouncementBar";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Announcement Bar in normal document flow */}
      <TopAnnouncementBar />

      {/* Main Sticky Navbar */}
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-40 w-full transition-colors duration-200 bg-slots-white",
          isScrolled
            ? "border-b border-light-grey/80 shadow-header-scrolled bg-slots-white/95 backdrop-blur-md"
            : "border-b border-light-grey/50 shadow-header",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            {/* Center Navigation Links for Desktop */}
            <div className="hidden md:flex md:items-center md:justify-center flex-1 px-4 lg:px-8">
              <DesktopNav />
            </div>

            {/* Right Area: Utilities & CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
              {/* Utility Icons (Search + Login/Account) */}
              <HeaderUtility className="flex" />

              {/* Primary Action Button (Desktop & Tablet) */}
              <div className="hidden sm:block">
                <HeaderCTA size="md" />
              </div>

              {/* Mobile / Tablet Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-slots-black hover:bg-light-grey/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slots-black"
                aria-label="Open Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer — rendered outside sticky header to avoid backdrop-blur fixed positioning trap */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
