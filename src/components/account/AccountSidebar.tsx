"use client";

import React from "react";
import Link from "next/link";
import {
  User as UserIcon,
  ShoppingBag,
  Package,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { AccountLogoutButton } from "./AccountLogoutButton";

interface AccountSidebarProps {
  activeTab: "profile" | "orders" | "inquiries";
  isAdmin?: boolean;
}

export function AccountSidebar({ activeTab, isAdmin }: AccountSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Navigation Card */}
      <div className="bg-[#171717] border border-[#2A2A2A] p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

        <h2 className="font-sora text-xs font-bold uppercase tracking-widest text-[#777777] mb-4">
          ACCOUNT NAVIGATION
        </h2>

        <nav className="space-y-2">
          {/* Shop Collection */}
          <Link
            href="/products"
            className="flex items-center justify-between px-4 py-3 bg-[#050505] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-xs font-sora font-bold text-[#E9E9E9] hover:text-[#FFFFFF] uppercase tracking-wider transition-all group"
          >
            <span className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#777777] group-hover:text-[#B7FF00]" />
              <span>SHOP COLLECTION</span>
            </span>
            <span className="text-[#777777] group-hover:text-[#B7FF00] text-[10px]">&rarr;</span>
          </Link>

          {/* Edit Profile */}
          <Link
            href="/account"
            className={`flex items-center justify-between px-4 py-3 border text-xs font-sora font-bold uppercase tracking-wider transition-all ${
              activeTab === "profile"
                ? "bg-[#2A2A2A] border-[#B7FF00]/40 text-[#B7FF00]"
                : "bg-[#050505] hover:bg-[#2A2A2A] border-[#2A2A2A] text-[#E9E9E9] hover:text-[#FFFFFF] group"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <UserIcon className={`w-4 h-4 ${activeTab === "profile" ? "text-[#B7FF00]" : "text-[#777777] group-hover:text-[#B7FF00]"}`} />
              <span>EDIT PROFILE</span>
            </span>
            {activeTab === "profile" ? (
              <span className="text-[#B7FF00] text-[10px]">&bull; Active</span>
            ) : (
              <span className="text-[#777777] group-hover:text-[#B7FF00] text-[10px]">&rarr;</span>
            )}
          </Link>

          {/* Orders */}
          <Link
            href="/account/orders"
            className={`flex items-center justify-between px-4 py-3 border text-xs font-sora font-bold uppercase tracking-wider transition-all ${
              activeTab === "orders"
                ? "bg-[#2A2A2A] border-[#B7FF00]/40 text-[#B7FF00]"
                : "bg-[#050505] hover:bg-[#2A2A2A] border-[#2A2A2A] text-[#E9E9E9] hover:text-[#FFFFFF] group"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className={`w-4 h-4 ${activeTab === "orders" ? "text-[#B7FF00]" : "text-[#777777] group-hover:text-[#B7FF00]"}`} />
              <span>ORDERS</span>
            </span>
            {activeTab === "orders" ? (
              <span className="text-[#B7FF00] text-[10px]">&bull; Active</span>
            ) : (
              <span className="text-[#777777] group-hover:text-[#B7FF00] text-[10px]">&rarr;</span>
            )}
          </Link>

          {/* Inquiries */}
          <Link
            href="/account/inquiries"
            className={`flex items-center justify-between px-4 py-3 border text-xs font-sora font-bold uppercase tracking-wider transition-all ${
              activeTab === "inquiries"
                ? "bg-[#2A2A2A] border-[#B7FF00]/40 text-[#B7FF00]"
                : "bg-[#050505] hover:bg-[#2A2A2A] border-[#2A2A2A] text-[#E9E9E9] hover:text-[#FFFFFF] group"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${activeTab === "inquiries" ? "text-[#B7FF00]" : "text-[#777777] group-hover:text-[#B7FF00]"}`} />
              <span>INQUIRIES</span>
            </span>
            {activeTab === "inquiries" ? (
              <span className="text-[#B7FF00] text-[10px]">&bull; Active</span>
            ) : (
              <span className="text-[#777777] group-hover:text-[#B7FF00] text-[10px]">&rarr;</span>
            )}
          </Link>

          {/* Admin Dashboard */}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center justify-between px-4 py-3 bg-[#050505] hover:bg-[#2A2A2A] border border-[#B7FF00] text-xs font-sora font-bold text-[#B7FF00] uppercase tracking-wider transition-all group"
            >
              <span className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#B7FF00]" />
                <span>ADMIN DASHBOARD</span>
              </span>
              <span className="text-[#B7FF00] text-[10px]">&rarr;</span>
            </Link>
          )}

          <div className="pt-2">
            <AccountLogoutButton />
          </div>
        </nav>
      </div>

      {/* Quick Factory Support Badge */}
      <div className="bg-[#171717] border border-[#2A2A2A] p-6 space-y-3">
        <h3 className="font-sora text-xs font-bold uppercase tracking-widest text-[#B7FF00]">
          FACTORY ASSISTANCE
        </h3>
        <p className="font-inter text-xs text-[#9CA3AF] leading-relaxed">
          Need customized tech pack development or custom fabric sampling? Our export team is available via WhatsApp &amp; Email.
        </p>
        <div className="pt-2 text-xs font-inter text-[#D1D5DB]">
          <p className="font-semibold text-[#FFFFFF]">Email: info@slotssportswear.com</p>
          <p className="text-[#777777]">Sialkot 51310, Punjab, Pakistan</p>
        </div>
      </div>
    </aside>
  );
}
