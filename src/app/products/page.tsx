import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Sportswear Products | Golfwear, Activewear, Teamwear",
  description: "Browse our custom sportswear manufacturing catalogue: Golfwear, Performance Activewear, Teamwear, Tracksuits, and Everyday Basics.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">Sportswear Products</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        Explore our full range of customizable apparel manufactured to international export standards for global athletics brands.
      </p>
    </div>
  );
}
