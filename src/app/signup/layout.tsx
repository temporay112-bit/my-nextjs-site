import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create B2B Account | SLOTS SPORTSWEAR",
  description: "Register for a B2B customer account with SLOTS SPORTSWEAR.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
