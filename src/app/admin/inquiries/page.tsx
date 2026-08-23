"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, ExternalLink, Filter, Loader2, CheckCircle2, Clock } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  companyName?: string;
  company?: string;
  productCategory?: string;
  message: string;
  fileReference?: string;
  status?: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesQuery =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.productCategory && inq.productCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || (inq.status || "NEW") === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-bold uppercase tracking-tight text-[#FFFFFF]">
            Quote Inquiries & RFQs
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Manage incoming custom sportswear quote requests, review tech packs, and update inquiry statuses.
          </p>
        </div>
      </div>

      {/* Controls: Search & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#12161F] border border-[#1F2430] p-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by buyer name, email, phone, company, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#050505] border border-[#1F2430] text-[#E5E7EB] font-inter text-xs placeholder:text-[#6B7280] focus:outline-none focus:border-[#B7FF00]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6B7280]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#050505] border border-[#1F2430] text-[#E5E7EB] font-inter text-xs focus:outline-none focus:border-[#B7FF00]"
          >
            <option value="ALL">All Statuses ({inquiries.length})</option>
            <option value="NEW">NEW</option>
            <option value="REVIEWING">REVIEWING</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="QUOTED">QUOTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#12161F] border border-[#1F2430] overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#9CA3AF]">
            <Loader2 className="w-6 h-6 animate-spin text-[#B7FF00]" />
            <span className="font-inter text-xs">Loading quote inquiries...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#9CA3AF] px-4">
            <FileText className="w-10 h-10 text-[#4B5563] mx-auto mb-3" />
            <p className="font-sora text-sm font-bold uppercase text-[#E5E7EB]">No Inquiries Found</p>
            <p className="font-inter text-xs text-[#6B7280] mt-1">No RFQs match your current search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter text-xs">
              <thead className="bg-[#0A0D14] border-b border-[#1F2430] text-[#9CA3AF] uppercase font-barlow text-[11px] font-bold">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Buyer & Contact</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Message / Requirements</th>
                  <th className="p-4">Tech Pack</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2430] text-[#D1D5DB]">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#161B26] transition-colors">
                    <td className="p-4 whitespace-nowrap text-[#9CA3AF]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#FFFFFF]">{inq.name}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{inq.email || "No Email"}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{inq.phone || "No Phone"}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-[#E5E7EB]">
                      {inq.companyName || inq.company || "—"}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-[#1F2430] text-[#B7FF00] font-barlow font-bold uppercase text-[10px]">
                        {inq.productCategory || "General RFQ"}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-[#9CA3AF] text-[11px] leading-relaxed">{inq.message}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {inq.fileReference ? (
                        <a
                          href={inq.fileReference}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#60A5FA] hover:text-[#93C5FD] underline text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Artwork</span>
                        </a>
                      ) : (
                        <span className="text-[#6B7280] text-[11px]">None</span>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={inq.status || "NEW"}
                        disabled={updatingId === inq.id}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="px-2 py-1 bg-[#050505] border border-[#2A2A2A] text-[#E5E7EB] font-barlow text-xs font-bold uppercase focus:outline-none focus:border-[#B7FF00]"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
