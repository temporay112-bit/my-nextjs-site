"use client";

import React, { useState, useEffect } from "react";
import type { Category } from "@/lib/db/types";
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("1");
  const [published, setPublished] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch {
      setErrorMessage("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setParentId("");
    setDescription("");
    setImage("");
    setSortOrder((categories.length + 1).toString());
    setPublished(true);
    setErrorMessage("");
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setParentId(cat.parentId || "");
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setSortOrder(cat.sortOrder.toString());
    setPublished(cat.published);
    setErrorMessage("");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const payload = {
        name,
        slug,
        parentId: parentId || null,
        description,
        image,
        sortOrder: Number(sortOrder) || 0,
        published,
      };

      const url = "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory ? { ...payload, id: editingCategory.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Operation failed.");
        setSubmitting(false);
        return;
      }

      setSuccessMessage(editingCategory ? "Category updated successfully." : "Category created successfully.");
      setModalOpen(false);
      fetchCategories();
    } catch {
      setErrorMessage("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete "${catName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Cannot delete category.");
        return;
      }

      setSuccessMessage("Category deleted.");
      fetchCategories();
    } catch {
      alert("Failed to delete category.");
    }
  };

  const parentCategories = categories.filter((c) => !c.parentId);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Category Management
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Organize B2B product hierarchy, primary sports categories, and subcategories.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Category</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-inter text-xs flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-400 font-bold">×</button>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-[#141721] border border-[#1F2430] rounded-none overflow-hidden">
        <div className="p-4 border-b border-[#1F2430] flex items-center justify-between">
          <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
            All Categories ({categories.length})
          </span>
          <button
            onClick={fetchCategories}
            className="p-1.5 text-[#6B7280] hover:text-[#FFFFFF] transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs text-[#E5E7EB]">
            <thead className="bg-[#0E1015] border-b border-[#1F2430] font-barlow uppercase text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2430]">
              {categories.map((cat) => {
                const isSub = Boolean(cat.parentId);
                const parent = isSub ? categories.find((c) => c.id === cat.parentId) : null;

                return (
                  <tr key={cat.id} className="hover:bg-[#1A1F2C] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#6B7280]">{cat.sortOrder}</td>
                    <td className="py-3 px-4 font-sora font-semibold text-[#FFFFFF]">
                      {isSub && <span className="text-[#6B7280] mr-2">↳</span>}
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#9CA3AF]">{cat.slug}</td>
                    <td className="py-3 px-4">
                      {isSub ? (
                        <span className="px-2 py-0.5 bg-[#1F2430] text-[#9CA3AF] font-barlow text-[10px] font-bold uppercase">
                          Sub of {parent?.name || "Parent"}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#171717] text-[#B7FF00] border border-[#2A2A2A] font-barlow text-[10px] font-bold uppercase">
                          Primary
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {cat.published ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400 text-[11px]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-[#9CA3AF] hover:text-[#B7FF00] transition-colors"
                        title="Edit Category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-1.5 text-[#9CA3AF] hover:text-red-400 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#141721] border border-[#1F2430] w-full max-w-lg p-6 rounded-none shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F2430] pb-4">
              <h2 className="font-sora text-base font-bold uppercase text-[#FFFFFF]">
                {editingCategory ? "Edit Category" : "New Category"}
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
              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. GOLFWEAR"
                  className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. golfwear"
                  className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-mono rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Parent Category (Leave empty for Primary Category)
                </label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                >
                  <option value="">None (Primary Category)</option>
                  {parentCategories
                    .filter((p) => !editingCategory || p.id !== editingCategory.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category manufacturing capabilities..."
                  className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="w-4 h-4 rounded-none border-[#1F2430] text-[#B7FF00] focus:ring-[#B7FF00]"
                    />
                    <span className="font-sora font-semibold text-[#FFFFFF]">Published</span>
                  </label>
                </div>
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
                  disabled={submitting}
                  className="px-5 py-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingCategory ? "Save Changes" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
