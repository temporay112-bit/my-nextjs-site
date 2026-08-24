import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Factory, Layers, Sparkles } from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.getProductBySlugAsync(slug);

  if (!product) {
    return {
      title: "Product Not Found | SLOTS SPORTSWEAR",
    };
  }

  const category = await db.getCategoryByIdAsync(product.categoryId);

  return {
    title: `${product.name} | SLOTS SPORTSWEAR B2B Custom Apparel`,
    description:
      product.description ||
      `Custom ${product.name} manufactured by SLOTS SPORTSWEAR in Sialkot, Pakistan. OEM/ODM private label production for sportswear brands.`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | SLOTS SPORTSWEAR`,
      description:
        product.description ||
        `Custom manufacturing and wholesale specifications for ${product.name}.`,
      url: `https://slotssportswear.com/products/${product.slug}`,
      siteName: "SLOTS SPORTSWEAR",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await db.getProductBySlugAsync(slug);

  if (!product) {
    notFound();
  }

  const category = await db.getCategoryByIdAsync(product.categoryId);
  const subcategory = product.subcategoryId ? await db.getCategoryByIdAsync(product.subcategoryId) : null;
  const relatedResult = await db.getProductsAsync({ categorySlug: category?.slug, limit: 4, publishedOnly: true });
  const relatedProducts = relatedResult.products.filter((p) => p.id !== product.id).slice(0, 3);

  // Schema.org Product Structured Data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://slotssportswear.com${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "SLOTS SPORTSWEAR",
    },
    category: category?.name,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      price: "0.00",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
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
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `https://slotssportswear.com/products?category=${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: product.name,
        item: `https://slotssportswear.com/products/${product.slug}`,
      },
    ],
  };

  const specifications = product.specifications && product.specifications.length > 0
    ? product.specifications
    : [
        "100% Custom OEM / ODM Manufacturing",
        "Technical Dry-Fit Breathable Fabrics",
        "Sublimation, Screen Print, or High-Density 3D Rubber Logos",
        "Custom Neck Labels, Hangtags, and Polybag Packaging",
        "Flexible B2B Minimum Order Quantities (MOQ)",
        "Global DHL / FedEx / Air Cargo Express Dispatch",
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-inter text-xs text-[#6B7280]">
            <Link href="/products" className="inline-flex items-center gap-1 hover:text-[#171717] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalogue</span>
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/products?category=${category.slug}`} className="hover:text-[#171717] transition-colors">
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#171717] font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Main Product Showcase Card */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-none shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Product Images (Gallery) */}
            <div className="lg:col-span-6 bg-[#FAFAFA] p-8 sm:p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#E5E7EB] relative">
              <div className="relative w-full aspect-square max-w-[440px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain p-4"
                  priority
                />
              </div>

              {/* Gallery Thumbnails if available */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3 mt-6">
                  {product.gallery.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 bg-[#FFFFFF] border border-[#E5E7EB] rounded-none p-1"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Specifications & B2B Quotation Action */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-barlow text-xs font-bold uppercase tracking-widest text-[#6B7280]">
                    {category?.name || "SPORTSWEAR"}
                  </span>
                  {subcategory && (
                    <>
                      <span className="text-[#D1D5DB]">•</span>
                      <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                        {subcategory.name}
                      </span>
                    </>
                  )}
                </div>

                <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#171717] leading-tight">
                  {product.name}
                </h1>

                {product.description && (
                  <p className="font-inter text-sm text-[#4B5563] mt-4 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Technical Specifications */}
                <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                  <h2 className="font-sora text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
                    Manufacturing & Technical Specifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specifications.map((spec: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 font-inter text-xs text-[#374151]">
                        <CheckCircle2 className="w-4 h-4 text-[#B7FF00] bg-[#050505] rounded-full flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B2B Manufacturing Highlights */}
                <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-none flex items-start gap-3">
                  <Factory className="w-5 h-5 text-[#171717] flex-shrink-0 mt-0.5" />
                  <div className="font-inter text-xs">
                    <span className="font-bold text-[#171717] block">Factory Direct Sialkot Manufacturing:</span>
                    <span className="text-[#6B7280]">
                      Available for bulk private-label runs, sample development, custom sizing charts, and worldwide commercial freight dispatch.
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/#quote?category=${encodeURIComponent(category?.name || "")}&product=${encodeURIComponent(product.name)}`}
                  className="w-full sm:flex-1 py-4 px-6 bg-[#050505] hover:bg-[#171717] text-[#FFFFFF] font-sora text-xs sm:text-sm font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 group rounded-none"
                >
                  <span>Request a Quote for this Style</span>
                  <ArrowRight className="w-4 h-4 text-[#B7FF00] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto py-4 px-6 bg-transparent border border-[#D1D5DB] hover:border-[#171717] text-[#171717] font-sora text-xs font-bold uppercase tracking-wider text-center transition-colors rounded-none"
                >
                  Contact Merchandiser
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products from same category */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E7EB]">
                <h2 className="font-sora text-lg sm:text-xl font-bold uppercase text-[#171717]">
                  Related {category?.name || "Sportswear"} Styles
                </h2>
                <Link
                  href={`/products?category=${category?.slug}`}
                  className="font-barlow text-xs font-bold uppercase tracking-wider text-[#171717] hover:underline inline-flex items-center gap-1"
                >
                  <span>View Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="group bg-[#FFFFFF] border border-[#E5E7EB] p-4 rounded-none hover:border-[#171717] transition-all shadow-sm block"
                  >
                    <div className="relative aspect-square w-full bg-[#FAFAFA] mb-3">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="font-barlow text-[10px] font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                      {category?.name}
                    </span>
                    <h3 className="font-sora text-xs sm:text-sm font-bold text-[#171717] line-clamp-2">
                      {rel.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
