import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Login | SLOTS SPORTSWEAR",
  description: "Sign in to your SLOTS SPORTSWEAR customer portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
