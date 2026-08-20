"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Desktop Navigation"
      className={cn("hidden md:flex items-center", className)}
    >
      <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "relative py-2 font-inter text-[14.5px] lg:text-[15.5px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:ring-offset-2 rounded-sm",
                  isActive
                    ? "font-semibold text-slots-black"
                    : "font-medium text-graphite/90 hover:text-slots-black"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {/* Active / Hover subtle indicator */}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-electric-lime rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
