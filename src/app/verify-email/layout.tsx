import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | SLOTS SPORTSWEAR",
  description: "Verify your email address for your SLOTS SPORTSWEAR account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
