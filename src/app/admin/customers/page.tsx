"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, RefreshCw, ShieldCheck, Mail, Phone, Calendar, Building2 } from "lucide-react";

interface CustomerView {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  companyName?: string;
  country?: string;
  role: string;
  status: string;
  emailVerified: boolean;
  ordersCount: number;
  inquiriesCount: number;
  createdAt: string;
  lastLoginAt?: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerView[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      if (data.users) setCustomers(data.users);
    } catch {
      console.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)) ||
      (c.companyName && c.companyName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Client &amp; Customer Accounts
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Registered B2B buyers, apparel brand representatives, and active client profiles.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#141721] border border-[#1F2430] p-4 rounded-none flex items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, brand..."
            className="w-full pl-9 pr-4 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-inter text-xs rounded-none focus:outline-none focus:border-[#B7FF00]"
          />
        </div>

        <button
          onClick={fetchCustomers}
          className="p-2 text-[#6B7280] hover:text-[#FFFFFF] transition-colors border border-[#1F2430]"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-[#141721] border border-[#1F2430] rounded-none overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs text-[#E5E7EB]">
            <thead className="bg-[#0E1015] border-b border-[#1F2430] font-barlow uppercase text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Customer / Brand</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role / Verification</th>
                <th className="py-3 px-4">Orders / Inquiries</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2430]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#6B7280]">
                    No client accounts found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#1A1F2C] transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-[#6B7280]">
                      {c.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-sora font-semibold text-[#FFFFFF] block">
                        {c.name}
                      </span>
                      {c.companyName && c.companyName !== "—" && (
                        <span className="text-[11px] text-[#777777] block">
                          {c.companyName}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#9CA3AF]">
                      {c.email || "—"}
                    </td>
                    <td className="py-3 px-4 text-[#9CA3AF]">
                      {c.phone || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-block px-2 py-0.5 font-barlow text-[10px] font-bold uppercase rounded-none border ${
                            c.role === "ADMIN"
                              ? "bg-[#171717] border-[#2A2A2A] text-[#B7FF00]"
                              : "bg-[#1F2430] border-[#2A3347] text-[#9CA3AF]"
                          }`}
                        >
                          {c.role}
                        </span>
                        {c.emailVerified && (
                          <span className="px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-barlow text-[9px] font-bold uppercase">
                            VERIFIED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#9CA3AF]">
                      <span className="text-[#FFFFFF] font-semibold">{c.ordersCount || 0}</span> orders &bull;{" "}
                      <span className="text-[#FFFFFF] font-semibold">{c.inquiriesCount || 0}</span> inq
                    </td>
                    <td className="py-3 px-4 text-[#6B7280] text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-[#6B7280] text-[11px]">
                      {c.lastLoginAt ? new Date(c.lastLoginAt).toLocaleString() : "Never"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
