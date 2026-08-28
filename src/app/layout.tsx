import type { Metadata, Viewport } from "next";
import { Sora, Inter, Barlow_Condensed } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://slotsdesign.vercel.app"),
  title: {
    default: "Custom Sportswear Manufacturer & Exporter | SLOTS SPORTSWEAR",
    template: "%s | SLOTS SPORTSWEAR",
  },
  description:
    "SLOTS SPORTSWEAR is a B2B custom sportswear manufacturer and exporter from Sialkot, Pakistan, specializing in OEM, ODM, private label, golfwear, teamwear and bulk apparel production.",
  keywords: [
    "sportswear manufacturer USA",
    "custom sportswear manufacturer",
    "sportswear manufacturer Pakistan",
    "Sialkot sportswear manufacturer",
    "custom sportswear supplier",
    "OEM sportswear manufacturer",
    "ODM sportswear manufacturer",
    "private label sportswear manufacturer",
    "golfwear manufacturer",
    "custom golf apparel manufacturer",
    "teamwear manufacturer",
    "bulk sportswear manufacturer",
    "sportswear exporter Pakistan",
  ],
  authors: [{ name: "SLOTS SPORTSWEAR" }],
  creator: "SLOTS SPORTSWEAR",
  publisher: "SLOTS SPORTSWEAR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Custom Sportswear Manufacturer & Exporter | SLOTS SPORTSWEAR",
    description:
      "SLOTS SPORTSWEAR is a B2B custom sportswear manufacturer and exporter from Sialkot, Pakistan, specializing in OEM, ODM, private label, golfwear, teamwear and bulk apparel production.",
    url: "https://slotsdesign.vercel.app",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/new hero images/new hero-01.jpg",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR High Performance Custom Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sportswear Manufacturer & Exporter | SLOTS SPORTSWEAR",
    description:
      "SLOTS SPORTSWEAR is a B2B custom sportswear manufacturer and exporter from Sialkot, Pakistan, specializing in OEM, ODM, private label, golfwear, teamwear and bulk apparel production.",
    images: ["/images/hero/new hero images/new hero-01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  // Schema.org Structured Data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SLOTS SPORTSWEAR",
    url: "https://slotsdesign.vercel.app",
    logo: "https://slotsdesign.vercel.app/images/logo.png",
    description:
      "B2B custom sportswear manufacturer and exporter based in Sialkot, Pakistan, offering OEM, ODM, and Private Label apparel solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sialkot",
      postalCode: "51310",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "shahrangujjar00@gmail.com",
      contactType: "customer support / sales",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SLOTS SPORTSWEAR",
    url: "https://slotsdesign.vercel.app",
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="bg-slots-white text-slots-black antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
