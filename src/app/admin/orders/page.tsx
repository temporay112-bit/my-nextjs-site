"use client";

import React, { useState, useEffect } from "react";
import type { Order, OrderStatus } from "@/lib/db/types";
import {
  ShoppingCart,
  CheckCircle2,
  Clock,
  Edit2,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  FileText,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("NEW");
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch {
      setErrorMessage("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openEditModal = (ord: Order) => {
    setEditingOrder(ord);
    setStatus(ord.status);
    setNotes(ord.notes || "");
    setCustomerName(ord.customerName || "");
    setCustomerEmail(ord.customerEmail || "");
    setCustomerPhone(ord.customerPhone || "");
    setCompanyName(ord.companyName || "");
    setErrorMessage("");
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingOrder(null);
    setStatus("NEW");
    setNotes("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCompanyName("");
    setErrorMessage("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (editingOrder) {
        const res = await fetch("/api/admin/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingOrder.id, status, notes }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.error || "Update failed.");
          return;
        }
        setSuccessMessage("Order updated successfully.");
      } else {
        const res = await fetch("/api/admin/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            customerEmail,
            customerPhone,
            companyName,
            status,
            notes,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.error || "Creation failed.");
          return;
        }
        setSuccessMessage("Order created successfully.");
      }

      setModalOpen(false);
      fetchOrders();
    } catch {
      setErrorMessage("Network error.");
    }
  };

  const statusColors: Record<OrderStatus, string> = {
    NEW: "bg-blue-950/60 text-blue-400 border-blue-800",
    REVIEWING: "bg-purple-950/60 text-purple-400 border-purple-800",
    CONTACTED: "bg-amber-950/60 text-amber-400 border-amber-800",
    QUOTED: "bg-indigo-950/60 text-indigo-400 border-indigo-800",
    IN_PROGRESS: "bg-cyan-950/60 text-cyan-400 border-cyan-800",
    COMPLETED: "bg-emerald-950/60 text-emerald-400 border-emerald-800",
    CANCELLED: "bg-red-950/60 text-red-400 border-red-800",
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
      (o.companyName && o.companyName.toLowerCase().includes(q)) ||
      o.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Orders & RFQs Manager
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Track customer quote inquiries, production statuses, and commercial milestone notes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Order Entry</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-inter text-xs flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-400 font-bold">×</button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#141721] border border-[#1F2430] p-4 rounded-none flex items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by buyer name, email, or order ID..."
            className="w-full pl-9 pr-4 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-inter text-xs rounded-none focus:outline-none focus:border-[#B7FF00]"
          />
        </div>

        <button
          onClick={fetchOrders}
          className="p-2 text-[#6B7280] hover:text-[#FFFFFF] transition-colors border border-[#1F2430]"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141721] border border-[#1F2430] rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs text-[#E5E7EB]">
            <thead className="bg-[#0E1015] border-b border-[#1F2430] font-barlow uppercase text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Buyer / Company</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2430]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B7280]">
                    No orders or inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#1A1F2C] transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-[#B7FF00]">
                      #{ord.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-sora font-semibold text-[#FFFFFF] block">
                        {ord.customerName || "B2B Buyer"}
                      </span>
                      {ord.companyName && (
                        <span className="text-[#9CA3AF] text-[11px] block">
                          {ord.companyName}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#9CA3AF]">
                      {ord.customerEmail && <div>{ord.customerEmail}</div>}
                      {ord.customerPhone && <div className="text-[11px] text-[#6B7280]">{ord.customerPhone}</div>}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-barlow font-bold uppercase tracking-wider border rounded-none ${
                          statusColors[ord.status] || "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#6B7280] text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-[#9CA3AF] max-w-xs truncate">
                      {ord.notes || "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openEditModal(ord)}
                        className="p-1.5 text-[#9CA3AF] hover:text-[#B7FF00] transition-colors"
                        title="Edit Order / Status"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Order Status & Notes */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#141721] border border-[#1F2430] w-full max-w-md p-6 rounded-none shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F2430] pb-4">
              <h2 className="font-sora text-base font-bold uppercase text-[#FFFFFF]">
                {editingOrder ? `Update Order #${editingOrder.id}` : "Create New Order"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF] text-lg font-bold">
                ×
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 font-inter text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-inter text-xs">
              {!editingOrder && (
                <>
                  <div>
                    <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Apex Sports Club"
                      className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="buyer@brand.com"
                        className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                      />
                    </div>
                    <div>
                      <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 555 1234"
                        className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Order Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                >
                  <option value="NEW">NEW (Awaiting review)</option>
                  <option value="REVIEWING">REVIEWING (Under evaluation)</option>
                  <option value="CONTACTED">CONTACTED (Buyer contacted)</option>
                  <option value="QUOTED">QUOTED (Quotation sent)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Sampling / In Production)</option>
                  <option value="COMPLETED">COMPLETED (Dispatched / Complete)</option>
                  <option value="CANCELLED">CANCELLED (Closed)</option>
                </select>
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Internal Production Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sent sample fabric swatches via DHL tracking #12345678"
                  className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div className="pt-4 border-t border-[#1F2430] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-transparent text-[#9CA3AF] hover:text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none transition-colors"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
