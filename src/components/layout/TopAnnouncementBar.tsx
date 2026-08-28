"use client";

import React from "react";
import { Phone, Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopAnnouncementBarProps {
  className?: string;
}

export function TopAnnouncementBar({ className }: TopAnnouncementBarProps) {
  return (
    <div
      className={cn(
        "w-full bg-[#050505] border-b border-[#2A2A2A] text-[#E9E9E9] text-xs font-inter select-none z-50",
        className
      )}
      role="complementary"
      aria-label="Factory direct contact and manufacturing credentials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left Side: Contact Information (Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+923001234567"
            className="inline-flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#B7FF00] transition-colors"
            title="Call SLOTS SPORTSWEAR Factory"
          >
            <Phone className="w-3 h-3 text-[#B7FF00]" />
            <span className="font-mono text-xs">+92 300 123 4567</span>
          </a>
          <a
            href="mailto:info@slotssportswear.com"
            className="inline-flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#B7FF00] transition-colors"
            title="Email SLOTS SPORTSWEAR Sales Team"
          >
            <Mail className="w-3 h-3 text-[#B7FF00]" />
            <span className="text-xs">info@slotssportswear.com</span>
          </a>
        </div>

        {/* Center: Manufacturing Hub & Global Exporter Tag */}
        <div className="flex items-center justify-center flex-1 md:flex-initial text-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse flex-shrink-0" />
          <span className="font-sora font-semibold text-xs text-[#FFFFFF] truncate">
            Sialkot, Pakistan <span className="text-[#B7FF00]">&bull;</span> Worldwide B2B Bulk Exporter
          </span>
        </div>

        {/* Right Side: Trust / Security Credentials (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-[#9CA3AF]">
          <div className="flex items-center gap-1 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span className="font-semibold text-[#E5E7EB]">NDA Protected</span>
          </div>
          <span className="text-[#333333]">|</span>
          <span className="text-xs text-[#9CA3AF]">Direct OEM / ODM Factory</span>
        </div>
      </div>
    </div>
  );
}
