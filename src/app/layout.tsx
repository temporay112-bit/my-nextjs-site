import type { Metadata, Viewport } from "next";
import { Sora, Inter, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SLOTS SPORTSWEAR | Custom Sportswear Manufacturer & Exporter",
  description:
    "Premium B2B custom sportswear manufacturing partner specializing in OEM/ODM, golfwear, teamwear, private label, and bulk apparel production exported from Sialkot worldwide.",
  keywords: [
    "custom sportswear manufacturer",
    "golfwear manufacturer",
    "private label sportswear",
    "OEM apparel manufacturer",
    "ODM sportswear supplier",
    "bulk sportswear manufacturing",
    "Sialkot sportswear exporter",
  ],
  authors: [{ name: "SLOTS SPORTSWEAR" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${barlow.variable}`}>
      <body className="bg-slots-white text-slots-black antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
