import { MetadataRoute } from "next";
import { getPublicOrigin } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPublicOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/admin",
          "/account/",
          "/account",
          "/reset-password",
          "/verify-email",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
