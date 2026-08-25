import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";
import path from "path";

/**
 * Known MIME types for safe preview/download handling
 */
const MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ai": "application/postscript",
  ".psd": "image/vnd.adobe.photoshop",
  ".zip": "application/zip",
};

/**
 * File extensions that modern browsers can render directly (inline viewing)
 */
const PREVIEWABLE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".svg"];

/**
 * Resolves and validates a raw input reference (URL or pathname) into a safe Blob pathname.
 */
function resolveSafePathname(rawParam: string): { pathname: string; filename: string } | null {
  const trimmed = rawParam.trim();
  if (!trimmed) return null;

  // Prevent path traversal and malicious sequences
  if (trimmed.includes("..") || trimmed.includes("\\") || /[\x00-\x1f]/.test(trimmed)) {
    return null;
  }

  let cleanPath = trimmed;

  // If a full URL is provided (e.g. legacy stored URLs)
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    try {
      const parsed = new URL(cleanPath);
      const host = parsed.hostname.toLowerCase();

      // SSRF Protection: Only allow official Vercel Blob storage domains
      if (!host.endsWith(".blob.vercel-storage.com") && !host.includes("blob.vercel-storage.com")) {
        return null;
      }

      cleanPath = parsed.pathname;
    } catch {
      return null;
    }
  }

  // Remove leading slashes and query strings
  cleanPath = cleanPath.replace(/^\/+/, "").split("?")[0].trim();

  // Validate namespace prefix
  const isAllowedPrefix =
    cleanPath.startsWith("techpacks/") ||
    cleanPath.startsWith("products/") ||
    cleanPath.startsWith("uploads/");

  if (!isAllowedPrefix) {
    return null;
  }

  const filename = path.basename(cleanPath) || "TechPack-Attachment";

  return { pathname: cleanPath, filename };
}

/**
 * GET Handler — Securely proxies/streams private Blob files to authorized client requests
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const rawParam =
    request.nextUrl.searchParams.get("file") ||
    request.nextUrl.searchParams.get("pathname") ||
    request.nextUrl.searchParams.get("url") ||
    request.nextUrl.searchParams.get("path") ||
    request.nextUrl.searchParams.get("ref");

  if (!rawParam) {
    return NextResponse.json({ error: "Missing file parameter." }, { status: 400 });
  }

  const resolved = resolveSafePathname(rawParam);
  if (!resolved) {
    return NextResponse.json(
      { error: "Invalid or unauthorized file reference." },
      { status: 400 }
    );
  }

  const { pathname, filename } = resolved;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    // 1. Attempt retrieval from private Blob store
    let result = await get(pathname, {
      access: "private",
      token,
    });

    // 2. Fallback attempt for public-configured store if private returned null
    if (!result) {
      try {
        result = await get(pathname, {
          access: "public",
          token,
        });
      } catch {}
    }

    if (!result || result.statusCode !== 200 || !result.stream) {
      return new NextResponse("File not found or no longer available.", { status: 404 });
    }

    // 3. Resolve Content-Type
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      MIME_MAP[ext] ||
      (result.blob.contentType && result.blob.contentType !== "application/octet-stream"
        ? result.blob.contentType
        : "application/octet-stream");

    // 4. Resolve Content-Disposition (inline for previewable images/PDFs, attachment for others)
    const forceDownload = request.nextUrl.searchParams.get("download") === "1";
    const isPreviewable = PREVIEWABLE_EXTENSIONS.includes(ext);
    const dispositionType = !forceDownload && isPreviewable ? "inline" : "attachment";
    const safeHeaderFilename = filename.replace(/["\r\n]/g, "_");
    const contentDisposition = `${dispositionType}; filename="${safeHeaderFilename}"`;

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", contentDisposition);
    headers.set("Cache-Control", "private, no-transform, max-age=86400");
    headers.set("X-Content-Type-Options", "nosniff");
    if (result.blob.size) {
      headers.set("Content-Length", result.blob.size.toString());
    }

    return new NextResponse(result.stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[Private Blob Retrieval Error]:", error);
    return NextResponse.json(
      { error: "An error occurred retrieving the requested file." },
      { status: 500 }
    );
  }
}

/**
 * HEAD Handler — Returns headers without stream payload for status/content checking
 */
export async function HEAD(request: NextRequest): Promise<NextResponse> {
  const rawParam =
    request.nextUrl.searchParams.get("file") ||
    request.nextUrl.searchParams.get("pathname") ||
    request.nextUrl.searchParams.get("url") ||
    request.nextUrl.searchParams.get("path") ||
    request.nextUrl.searchParams.get("ref");

  if (!rawParam) {
    return new NextResponse(null, { status: 400 });
  }

  const resolved = resolveSafePathname(rawParam);
  if (!resolved) {
    return new NextResponse(null, { status: 400 });
  }

  const { pathname, filename } = resolved;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    let result = await get(pathname, { access: "private", token });
    if (!result) {
      result = await get(pathname, { access: "public", token });
    }

    if (!result || result.statusCode !== 200) {
      return new NextResponse(null, { status: 404 });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentType =
      MIME_MAP[ext] || result.blob.contentType || "application/octet-stream";
    const forceDownload = request.nextUrl.searchParams.get("download") === "1";
    const isPreviewable = PREVIEWABLE_EXTENSIONS.includes(ext);
    const dispositionType = !forceDownload && isPreviewable ? "inline" : "attachment";
    const safeHeaderFilename = filename.replace(/["\r\n]/g, "_");

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `${dispositionType}; filename="${safeHeaderFilename}"`);
    headers.set("Cache-Control", "private, no-transform, max-age=86400");
    headers.set("X-Content-Type-Options", "nosniff");
    if (result.blob.size) {
      headers.set("Content-Length", result.blob.size.toString());
    }

    return new NextResponse(null, { status: 200, headers });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
