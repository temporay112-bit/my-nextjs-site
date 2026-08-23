"use client";

import React, { useState, useEffect } from "react";
import type { AuditLog } from "@/lib/db/types";
import { ShieldAlert, ShieldCheck, RefreshCw, Key, Lock, EyeOff } from "lucide-react";

export default function AdminLoginDataPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      if (data.logs) setLogs(data.logs);
    } catch {
      console.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Login Data & Security Audit Trail
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Real-time security logs, authentication records, and administrative mutations.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-4 py-2 bg-[#171717] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-[#FFFFFF] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Security Policies Box */}
      <div className="p-4 bg-[#141721] border border-[#1F2430] rounded-none grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#B7FF00] flex-shrink-0 mt-0.5" />
          <div className="font-inter text-xs">
            <span className="font-bold text-[#FFFFFF] block">Scrypt Password Hashing:</span>
            <span className="text-[#9CA3AF]">
              All client & admin passwords are salt-hashed. Plaintext passwords are never stored.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <EyeOff className="w-5 h-5 text-[#B7FF00] flex-shrink-0 mt-0.5" />
          <div className="font-inter text-xs">
            <span className="font-bold text-[#FFFFFF] block">Zero Token Exposure:</span>
            <span className="text-[#9CA3AF]">
              JWT/HMAC cookies, database credentials, and Vercel Blob tokens are strictly masked.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B7FF00] flex-shrink-0 mt-0.5" />
          <div className="font-inter text-xs">
            <span className="font-bold text-[#FFFFFF] block">Server-Side RBAC:</span>
            <span className="text-[#9CA3AF]">
              Every admin query and mutation is verified server-side against the authenticated role.
            </span>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#141721] border border-[#1F2430] rounded-none overflow-hidden">
        <div className="p-4 border-b border-[#1F2430]">
          <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
            Activity Records ({logs.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs text-[#E5E7EB]">
            <thead className="bg-[#0E1015] border-b border-[#1F2430] font-barlow uppercase text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2430]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1A1F2C] transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#6B7280]">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-[#0E1015] border border-[#1F2430] text-[#B7FF00] font-barlow text-[10px] font-bold uppercase">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#FFFFFF]">
                    {log.userName || log.userId || "System"}
                  </td>
                  <td className="py-3 px-4 text-[#9CA3AF]">
                    {log.entity}
                  </td>
                  <td className="py-3 px-4 text-[#D1D5DB]">
                    {log.details || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
