"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  FileText 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    trackEvent("email_click", { method: "footer_mailto" });
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { method: "footer_whatsapp" });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="SLOTS SPORTSWEAR Corporate Footer"
      className="w-full bg-[#050505] text-[#FFFFFF] border-t border-[#2A2A2A] relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#2A2A2A]">
          
          {/* Column 01: Brand Identity & Verified Mission */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF00] rounded-sm"
              aria-label="SLOTS SPORTSWEAR Home"
            >
              <div className="relative flex items-center justify-center w-11 h-11 flex-shrink-0 bg-[#171717] rounded-lg p-1.5 border border-[#2A2A2A]">
                <Image
                  src="/images/logo.png"
                  alt="SLOTS SPORTSWEAR Official Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-center select-none">
                <span className="font-sora text-xl font-extrabold tracking-tight text-[#FFFFFF] uppercase leading-none">
                  SLOTS
                </span>
                <span className="font-inter text-[9px] font-bold tracking-[0.28em] text-[#B7FF00] uppercase mt-1">
                  SPORTSWEAR
                </span>
              </div>
            </Link>

            <p className="font-inter text-sm text-[#777777] leading-relaxed">
              Precision custom sportswear manufacturing partner specializing in OEM/ODM, golfwear, teamwear, and private label apparel exported globally from Sialkot, Pakistan.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#171717] border border-[#2A2A2A] text-xs font-inter text-[#777777] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#B7FF00]" />
              <span>Verified SCCI & FBR Tax Registered</span>
            </div>
          </div>

          {/* Column 02: Main Site Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora text-xs font-bold uppercase tracking-widest-brand text-[#FFFFFF]">
              NAVIGATION
            </h3>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0 font-inter text-sm text-[#777777]">
              <li>
                <Link href="/" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/manufacturing" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/customization" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Customization
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 03: Business & Technical Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora text-xs font-bold uppercase tracking-widest-brand text-[#FFFFFF]">
              BUSINESS & TRUST
            </h3>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0 font-inter text-sm text-[#777777]">
              <li>
                <Link href="/#certificates" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Certificates & Compliance
                </Link>
              </li>
              <li>
                <Link href="/#shipping" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Shipping Methods
                </Link>
              </li>
              <li>
                <Link href="/#payment" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="/#catalogue" className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]">
                  Product Catalogue (PDF)
                </Link>
              </li>
              <li>
                <Link href="/contact#quote" className="text-[#B7FF00] hover:underline transition-all font-medium inline-flex items-center gap-1 focus-visible:outline-none">
                  <span>Get a Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 04: Verified Company Contact Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sora text-xs font-bold uppercase tracking-widest-brand text-[#FFFFFF]">
              CONTACT & FACILITY
            </h3>
            <div className="flex flex-col gap-3 font-inter text-sm text-[#777777]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B7FF00] shrink-0 mt-1" />
                <span className="text-[#E9E9E9] leading-snug">
                  Manufacturing Facility & Export Division<br />
                  Sialkot 51310, Punjab, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <a
                  href="mailto:shahrangujjar00@gmail.com"
                  onClick={handleEmailClick}
                  className="text-[#FFFFFF] hover:text-[#B7FF00] transition-colors break-all focus-visible:outline-none"
                >
                  shahrangujjar00@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <a
                  href="tel:+923000000000"
                  className="text-[#FFFFFF] hover:text-[#B7FF00] transition-colors focus-visible:outline-none"
                >
                  +92 (300) 0000000
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="text-[#B7FF00] hover:underline transition-colors font-medium focus-visible:outline-none"
                >
                  WhatsApp Direct Inquiry
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer: Legal, Compliance, & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-xs text-[#777777]">
          <p className="m-0 text-center sm:text-left">
            &copy; {currentYear} SLOTS SPORTSWEAR. All rights reserved. Precision Sports Apparel Manufacturer.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]"
            >
              Privacy Policy
            </Link>
            <span className="text-[#2A2A2A]" aria-hidden="true">•</span>
            <Link
              href="/terms"
              className="hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:text-[#B7FF00]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
