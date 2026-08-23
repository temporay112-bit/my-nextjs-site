"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Copy, Check, Image as ImageIcon, Loader2 } from "lucide-react";

export default function AdminMediaPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedList, setUploadedList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const existingAssets = [
    "/images/products/Polo/2.png",
    "/images/products/Polo/1.png",
    "/images/products/Polo/10.png",
    "/images/products/Polo/3.png",
    "/images/products/Shirts/1.png",
    "/images/products/Shirts/5.png",
    "/images/products/Shirts/20.png",
    "/images/products/Tank Top/1.png",
    "/images/products/Sleeves/1.png",
    "/images/products/Short/1.png",
    "/images/products/Short/7.png",
    "/images/products/Short/15.png",
    "/images/products/Gloves/1.png",
    "/images/products/Gloves/2.png",
    "/images/products/Women Shirt/1.png",
    "/images/products/Women Shirt/6.png",
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
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
        setErrorMessage(data.error || "Upload failed.");
        setUploading(false);
        return;
      }

      setUploadedList((prev) => [data.url, ...prev]);
    } catch {
      setErrorMessage("Network error.");
    } finally {
      setUploading(false);
    }
  };

  const allAssets = [...uploadedList, ...existingAssets];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2430]">
        <div>
          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF]">
            Media & Product Asset Manager
          </h1>
          <p className="font-inter text-xs text-[#9CA3AF] mt-1">
            Upload new high-resolution product imagery to Vercel Blob / local storage, or copy existing asset paths.
          </p>
        </div>

        <label className="px-4 py-2.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 cursor-pointer transition-colors">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 stroke-[3]" />
          )}
          <span>{uploading ? "Uploading Image..." : "Upload New Image"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 font-inter text-xs">
          {errorMessage}
        </div>
      )}

      {/* Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {allAssets.map((asset, index) => (
          <div
            key={index}
            className="bg-[#141721] border border-[#1F2430] rounded-none p-3 flex flex-col justify-between group hover:border-[#2A3347] transition-all"
          >
            <div className="relative aspect-square w-full bg-[#0E1015] border border-[#1F2430] mb-2 p-2">
              <Image
                src={asset}
                alt={`Media asset ${index + 1}`}
                fill
                sizes="180px"
                className="object-contain p-1"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[10px] text-[#9CA3AF] block truncate" title={asset}>
                {asset}
              </span>
              <button
                onClick={() => handleCopy(asset)}
                className="w-full py-1 bg-[#0E1015] hover:bg-[#1F2430] border border-[#1F2430] text-[#FFFFFF] font-sora text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedUrl === asset ? (
                  <>
                    <Check className="w-3 h-3 text-[#B7FF00]" />
                    <span className="text-[#B7FF00]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#9CA3AF]" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
