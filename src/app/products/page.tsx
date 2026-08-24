import React, { Suspense } from "react";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductsCatalogSidebar } from "@/components/products/ProductsCatalogSidebar";
import { ProductCatalogGrid } from "@/components/products/ProductCatalogGrid";
import { ProductsCatalogPagination } from "@/components/products/ProductsCatalogPagination";
import { ProductsCatalogueBanner } from "@/components/products/ProductsCatalogueBanner";
import { ProductsCta } from "@/components/products/ProductsCta";
import { Layers, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "B2B Custom Sportswear Products Catalogue | SLOTS SPORTSWEAR",
  description:
    "Explore SLOTS SPORTSWEAR's verified B2B custom sportswear catalogue: Performance golf polos, athletic shirts, training shorts, golf gloves, tank tops, compression sleeves, and women's activewear.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Custom Sportswear Products Catalogue | SLOTS SPORTSWEAR",
    description:
      "Full B2B custom sportswear catalogue: Golfwear, Activewear, Shorts, Gloves, Tank Tops, and Compression Sleeves manufactured in Sialkot, Pakistan.",
    url: "https://slotssportswear.com/products",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/products/Polo/2.png",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR Custom Sportswear & Golfwear Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sportswear Products Catalogue | SLOTS SPORTSWEAR",
    description:
      "B2B custom sportswear and golfwear manufacturing catalogue from Sialkot, Pakistan.",
    images: ["/images/products/Polo/2.png"],
  },
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const subcategoryId = params.subcategory;
  const search = params.search;
  const page = parseInt(params.page || "1", 10);
  const limit = 20;

  const categories = await db.getCategoriesAsync(true);
  const totalAllProducts = (await db.getProductsAsync({ publishedOnly: true })).total;

  const { products, total, page: currentPage, totalPages } = await db.getProductsAsync({
    categorySlug,
    subcategoryId,
    search,
    page,
    limit,
    publishedOnly: true,
  });

  const currentCategory = categorySlug ? await db.getCategoryBySlugAsync(categorySlug) : null;
  const pageTitle = currentCategory ? currentCategory.name : "ALL SPORTSWEAR PRODUCTS";
  const pageDescription = currentCategory?.description ||
    "Explore our verified manufacturing capabilities across performance golfwear, activewear, team kits, and athletic accessories.";

  // Schema.org Structured Data
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `SLOTS SPORTSWEAR — ${pageTitle}`,
    url: "https://slotssportswear.com/products",
    description: pageDescription,
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotssportswear.com",
      logo: "https://slotssportswear.com/images/logo.png",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((item, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * limit + index + 1,
        name: item.name,
        description: item.description,
        image: `https://slotssportswear.com${item.image}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://slotssportswear.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://slotssportswear.com/products",
      },
      ...(currentCategory
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: currentCategory.name,
              item: `https://slotssportswear.com/products?category=${currentCategory.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full bg-[#FAFAFA] min-h-screen">
        {/* Page Top Header Banner */}
        <section className="bg-[#050505] text-[#FFFFFF] border-b border-[#2A2A2A] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] rounded-none mb-4">
                  <Layers className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
                    B2B MANUFACTURING PORTFOLIO
                  </span>
                </div>

                <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#FFFFFF]">
                  {pageTitle}
                </h1>

                <p className="font-inter text-sm sm:text-base text-[#9CA3AF] mt-3 max-w-2xl leading-relaxed">
                  {pageDescription}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="bg-[#171717] border border-[#2A2A2A] px-4 py-3 rounded-none">
                  <span className="font-barlow text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
                    MANUFACTURING HUB
                  </span>
                  <span className="font-sora text-xs font-bold text-[#FFFFFF] uppercase">
                    Sialkot, Pakistan
                  </span>
                </div>
                <div className="bg-[#171717] border border-[#2A2A2A] px-4 py-3 rounded-none">
                  <span className="font-barlow text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
                    TOTAL PRODUCTS
                  </span>
                  <span className="font-sora text-xs font-bold text-[#B7FF00]">
                    {totalAllProducts} STYLES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Catalogue Layout: Sidebar + Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Left Category Navigation Sidebar */}
            <Suspense fallback={<div className="w-[260px] h-96 bg-[#FFFFFF] border border-[#E5E7EB]" />}>
              <ProductsCatalogSidebar
                categories={categories}
                totalProductsCount={totalAllProducts}
              />
            </Suspense>

            {/* Right Product Grid & Pagination Area */}
            <main className="flex-1 w-full">
              {/* Context Bar */}
              <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-4 sm:p-5 rounded-none mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#171717]">
                    {categorySlug ? `CATEGORY: ${pageTitle}` : "ALL PRODUCTS"}
                  </span>
                  <span className="font-inter text-xs text-[#6B7280] block sm:inline sm:ml-2">
                    (Showing {products.length} of {total} products)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-inter text-[#6B7280]">
                  <ShieldCheck className="w-4 h-4 text-[#B7FF00] bg-[#050505] p-0.5" />
                  <span>Verified B2B Technical Specifications</span>
                </div>
              </div>

              {/* Product Grid */}
              <ProductCatalogGrid
                products={products}
                categories={categories}
              />

              {/* Pagination Controls */}
              <Suspense fallback={null}>
                <ProductsCatalogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </Suspense>
            </main>
          </div>
        </div>

        {/* PDF Catalogue Callout Banner */}
        <ProductsCatalogueBanner />

        {/* Final Conversion CTA */}
        <ProductsCta />
      </div>
    </>
  );
}
