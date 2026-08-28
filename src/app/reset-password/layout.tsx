import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | SLOTS SPORTSWEAR",
  description: "Reset your SLOTS SPORTSWEAR account password.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
