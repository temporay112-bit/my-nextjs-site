import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "slots_auth_session";
const SESSION_SECRET =
  process.env.AUTH_SECRET || "slots_sportswear_master_session_secret_2026";

async function parseSessionToken(token: string) {
  try {
    const dotIdx = token.indexOf(".");
    if (dotIdx === -1) return null;
    const data = token.slice(0, dotIdx);
    const signature = token.slice(dotIdx + 1);
    if (!data || !signature) return null;

    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", keyMaterial, encoder.encode(data));
    const expectedSig = btoa(String.fromCharCode(...new Uint8Array(mac)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    if (signature !== expectedSig) return null;

    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = atob(base64);
    const payload = JSON.parse(jsonStr);
    if (!payload || !payload.expiresAt || Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionCookie ? await parseSessionToken(sessionCookie) : null;

  // Admin route protection:
  // CUSTOMER trying to access /admin redirect to /account.
  // Unauthenticated trying to access /admin redirect to /login.
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "ADMIN" && session.email !== "shahrangujjar00@gmail.com") {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  // Customer account protection: Unauthenticated accessing /account redirect to /login
  if (pathname.startsWith("/account")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Public auth pages (if already logged in, redirect to appropriate portal)
  if (pathname === "/login" || pathname === "/signup") {
    if (session) {
      if (session.role === "ADMIN" || session.email === "shahrangujjar00@gmail.com") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/login",
    "/signup",
  ],
};
