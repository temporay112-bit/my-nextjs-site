"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export function AccountLogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={
        className ||
        "w-full flex items-center justify-between px-4 py-3 bg-[#050505] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-xs font-sora font-bold text-[#E9E9E9] hover:text-[#FFFFFF] uppercase tracking-wider transition-all disabled:opacity-50"
      }
    >
      <span className="flex items-center gap-2.5">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-[#B7FF00]" />
        ) : (
          <LogOut className="w-4 h-4 text-[#777777] group-hover:text-[#B7FF00]" />
        )}
        <span>{loading ? "LOGGING OUT..." : "LOGOUT"}</span>
      </span>
      <span className="text-[#777777] text-[10px]">&rarr;</span>
    </button>
  );
}
