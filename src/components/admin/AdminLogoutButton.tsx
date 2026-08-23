"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      document.cookie = "slots_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      router.push("/");
      router.refresh();
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2.5 bg-transparent border border-[#4B5563] text-[#D1D5DB] hover:text-[#FFFFFF] hover:border-[#9CA3AF] font-sora text-xs font-bold uppercase tracking-wider transition-colors rounded-none inline-flex items-center gap-2 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B7FF00]" />
      ) : (
        <LogOut className="w-3.5 h-3.5" />
      )}
      <span>Sign Out</span>
    </button>
  );
}
