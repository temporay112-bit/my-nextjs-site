import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Precision Sportswear Manufacturer",
  description: "Learn about SLOTS SPORTSWEAR — Sialkot's trusted custom apparel manufacturer and global export partner.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black">About SLOTS SPORTSWEAR</h1>
      <p className="font-inter text-technical-grey mt-4 max-w-2xl leading-relaxed">
        Precision custom sportswear manufacturer and exporter based in Sialkot, Pakistan, dedicated to engineering premium athletic apparel for international sportswear brands, fitness labels, and sports teams.
      </p>
    </div>
  );
}
