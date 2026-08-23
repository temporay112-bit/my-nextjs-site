"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { Product, Category } from "@/lib/db/types";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Search,
  Upload,
  Star,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [specificationsText, setSpecificationsText] = useState("");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState("1");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products?limit=100"),
        fetch("/api/admin/categories"),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.products) setProducts(prodData.products);
      if (catData.categories) setCategories(catData.categories);
    } catch {
      setErrorMessage("Failed to load products and categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setSlug("");
    setCategoryId(categories[0]?.id || "");
    setSubcategoryId("");
    setDescription("");
    setImage("/images/products/Polo/1.png");
    setSpecificationsText(
      "OEM / ODM Custom Manufacturing\nTechnical Dry-Fit Breathable Fabrics\nCustom Neck Labels & Hangtags"
    );
    setPublished(true);
    setFeatured(false);
    setSortOrder((products.length + 1).toString());
    setErrorMessage("");
    setModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setSlug(prod.slug);
    setCategoryId(prod.categoryId);
    setSubcategoryId(prod.subcategoryId || "");
    setDescription(prod.description || "");
    setImage(prod.image);
    setSpecificationsText((prod.specifications || []).join("\n"));
    setPublished(prod.published);
    setFeatured(prod.featured);
    setSortOrder(prod.sortOrder.toString());
    setErrorMessage("");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Image upload failed.");
        setUploadingImage(false);
        return;
      }

      setImage(data.url);
      setSuccessMessage("Product image uploaded successfully.");
    } catch {
      setErrorMessage("Network error uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    const specs = specificationsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const payload = {
        name,
        slug,
        categoryId,
        subcategoryId: subcategoryId || null,
        description,
        image,
        specifications: specs,
        published,
        featured,
        sortOrder: Number(sortOrder) || 0,
      };

      const url = "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct ? { ...payload, id: editingProduct.id } : payload;

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

      setSuccessMessage(editingProduct ? "Product updated." : "Product created.");
      setModalOpen(false);
      fetchData();
    } catch {
      setErrorMessage("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (!confirm(`Are you sure you want to delete product "${prodName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Cannot delete product.");
        return;
      }

      setSuccessMessage("Product deleted.");
      fetchData();
    } catch {
      alert("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter ? p.categoryId === selectedCategoryFilter : true;
    return matchesSearch && matchesCat;
  });

  const getCategoryName = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name : catId;
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Product Catalogue CMS
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Manage live B2B products, upload images, update specifications, and toggle visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Product</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-inter text-xs flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage("")} className="text-emerald-400 font-bold">×</button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-[#141721] border border-[#1F2430] p-4 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or slug..."
            className="w-full pl-9 pr-4 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-inter text-xs rounded-none focus:outline-none focus:border-[#B7FF00]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-inter text-xs rounded-none focus:outline-none focus:border-[#B7FF00]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchData}
            className="p-2 text-[#6B7280] hover:text-[#FFFFFF] transition-colors border border-[#1F2430]"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#141721] border border-[#1F2430] rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs text-[#E5E7EB]">
            <thead className="bg-[#0E1015] border-b border-[#1F2430] font-barlow uppercase text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2430]">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#1A1F2C] transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 bg-[#0E1015] border border-[#1F2430] rounded-none overflow-hidden flex items-center justify-center p-1">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-sora font-semibold text-[#FFFFFF] block">
                      {prod.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#6B7280]">
                      /products/{prod.slug}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-[#0E1015] border border-[#1F2430] text-[#B7FF00] font-barlow text-[10px] font-bold uppercase">
                      {getCategoryName(prod.categoryId)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {prod.featured && (
                      <span className="inline-flex items-center gap-1 text-[#B7FF00] text-[11px]">
                        <Star className="w-3.5 h-3.5 fill-[#B7FF00]" />
                        <span>Featured</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {prod.published ? (
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
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-[#9CA3AF] hover:text-[#B7FF00] transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="p-1.5 text-[#9CA3AF] hover:text-red-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141721] border border-[#1F2430] w-full max-w-2xl p-6 sm:p-8 rounded-none shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1F2430] pb-4">
              <h2 className="font-sora text-base font-bold uppercase text-[#FFFFFF]">
                {editingProduct ? "Edit Product" : "New B2B Product"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Tour Pro Golf Polo"
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
                    placeholder="tour-pro-golf-polo"
                    className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-mono rounded-none focus:outline-none focus:border-[#B7FF00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

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
              </div>

              {/* Product Image Uploader & Preview */}
              <div className="p-4 bg-[#0E1015] border border-[#1F2430] space-y-3">
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Main Product Image *
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-[#141721] border border-[#1F2430] p-1 flex-shrink-0">
                    {image && (
                      <Image
                        src={image}
                        alt="Product preview"
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/images/products/Polo/1.png or Blob URL"
                      className="w-full px-3 py-1.5 bg-[#141721] border border-[#1F2430] text-[#FFFFFF] text-xs font-mono rounded-none"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1F2430] hover:bg-[#2A3347] text-[#FFFFFF] font-sora text-[11px] font-bold uppercase cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#B7FF00]" />
                      <span>{uploadingImage ? "Uploading..." : "Upload New Image"}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageFileUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Manufacturing and fabric details..."
                  className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div>
                <label className="block font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                  Technical Specifications (One per line)
                </label>
                <textarea
                  rows={3}
                  value={specificationsText}
                  onChange={(e) => setSpecificationsText(e.target.value)}
                  placeholder="92% Polyester / 8% Elastane&#10;Anti-curl collar&#10;Custom neck labels"
                  className="w-full px-3.5 py-2 bg-[#0E1015] border border-[#1F2430] text-[#FFFFFF] font-mono text-[11px] rounded-none focus:outline-none focus:border-[#B7FF00]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded-none border-[#1F2430] text-[#B7FF00] focus:ring-[#B7FF00]"
                  />
                  <span className="font-sora font-semibold text-[#FFFFFF]">Published in Catalog</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded-none border-[#1F2430] text-[#B7FF00] focus:ring-[#B7FF00]"
                  />
                  <span className="font-sora font-semibold text-[#FFFFFF]">Featured Item</span>
                </label>
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
                  disabled={submitting || uploadingImage}
                  className="px-5 py-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
