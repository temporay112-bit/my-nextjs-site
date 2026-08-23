/**
 * SLOTS SPORTSWEAR — Canonical Public Origin & URL Resolver
 *
 * Single source of truth for constructing public application URLs (verification links,
 * password reset links, and transactional email callbacks).
 *
 * Rules:
 * 1. Local development (localhost / 127.0.0.1) MUST ALWAYS use HTTP (http://localhost:3000).
 *    Never generates https://localhost:3000 unless explicit TLS certificate dev server is active.
 * 2. Production deployments (Vercel / custom domain) MUST ALWAYS use HTTPS (https://slotsdesign.vercel.app).
 * 3. All constructed URLs are normalized to prevent duplicate/trailing slashes (e.g. //reset-password).
 * 4. Tokens are always encoded via encodeURIComponent and never logged in plain text.
 */

import { NextRequest } from "next/server";

export const DEFAULT_DEV_ORIGIN = "http://localhost:3000";
export const DEFAULT_PROD_ORIGIN = "https://slotsdesign.vercel.app";

type HeaderSource =
  | NextRequest
  | Request
  | Headers
  | { headers?: Headers | Record<string, string | string[] | undefined> }
  | null
  | undefined;

/**
 * Extracts a specific header value safely from diverse request/header types.
 */
function getHeaderValue(source: HeaderSource, name: string): string | null {
  if (!source) return null;

  const lowerName = name.toLowerCase();

  // If source has a Headers object (NextRequest, Request, or object with headers.get)
  if ("headers" in source && source.headers && typeof (source.headers as Headers).get === "function") {
    return (source.headers as Headers).get(lowerName);
  }

  // If source itself is a Headers instance
  if (typeof (source as Headers).get === "function") {
    return (source as Headers).get(lowerName);
  }

  // If source has a plain object dictionary for headers
  if ("headers" in source && source.headers && typeof source.headers === "object") {
    const val =
      (source.headers as Record<string, any>)[lowerName] ||
      (source.headers as Record<string, any>)[name];
    if (typeof val === "string") return val;
    if (Array.isArray(val) && val.length > 0) return val[0];
  }

  return null;
}

/**
 * Resolves the canonical public origin for the current execution context.
 *
 * @param request Optional request or headers instance to derive dynamic origin
 * @returns Clean normalized origin without trailing slashes (e.g. "http://localhost:3000" or "https://slotsdesign.vercel.app")
 */
export function getPublicOrigin(request?: HeaderSource): string {
  // 1. Inspect request headers if provided (request-aware resolution)
  if (request) {
    const forwardedHost = getHeaderValue(request, "x-forwarded-host");
    const rawHost = forwardedHost || getHeaderValue(request, "host");

    if (rawHost) {
      const host = rawHost.split(",")[0].trim();
      const isLocal =
        host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.startsWith("192.168.") ||
        host.startsWith("10.");

      if (isLocal) {
        // Local dev always uses http
        return `http://${host}`;
      }

      // External / deployed host
      const proto = getHeaderValue(request, "x-forwarded-proto") || "https";
      return `${proto}://${host}`.replace(/\/+$/, "");
    }
  }

  // 2. Check environment variables
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl && envUrl.trim()) {
    let cleanEnv = envUrl.trim().replace(/\/+$/, "");

    // Safety guard: If envUrl specifies localhost with https, force http for dev server
    if (cleanEnv.startsWith("https://localhost") || cleanEnv.startsWith("https://127.0.0.1")) {
      cleanEnv = cleanEnv.replace(/^https:\/\//i, "http://");
    }

    // In local development mode without explicit production host, ensure http://localhost
    if (process.env.NODE_ENV !== "production") {
      if (cleanEnv.includes("localhost") || cleanEnv.includes("127.0.0.1")) {
        return cleanEnv;
      }
    }

    return cleanEnv;
  }

  // 3. Fallback based on NODE_ENV
  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PROD_ORIGIN;
  }

  return DEFAULT_DEV_ORIGIN;
}

/**
 * Normalizes any path and appends it to the public origin without duplicate slashes.
 */
export function buildAbsoluteUrl(path: string, request?: HeaderSource): string {
  const origin = getPublicOrigin(request);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}

/**
 * Constructs a single-slash, fully-qualified Password Reset URL.
 */
export function buildResetPasswordUrl(rawToken: string, request?: HeaderSource): string {
  const cleanToken = rawToken.trim();
  const origin = getPublicOrigin(request);
  return `${origin}/reset-password?token=${encodeURIComponent(cleanToken)}`;
}

/**
 * Constructs a single-slash, fully-qualified Email Verification URL.
 */
export function buildVerifyEmailUrl(rawToken: string, request?: HeaderSource): string {
  const cleanToken = rawToken.trim();
  const origin = getPublicOrigin(request);
  return `${origin}/verify-email?token=${encodeURIComponent(cleanToken)}`;
}
