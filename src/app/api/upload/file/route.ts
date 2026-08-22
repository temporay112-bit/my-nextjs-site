import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Private Blob Retrieval Endpoint
 * Securely serves private Tech Pack documents and design files stored in Vercel Blob.
 */
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname parameter." }, { status: 400 });
  }

  try {
    const result = await get(pathname, {
      access: "private",
    });

    if (result === null) {
      return new NextResponse("File not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "private, no-cache",
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[Private Blob Retrieval Error]:", error);
    return NextResponse.json(
      { error: "An error occurred retrieving the requested file." },
      { status: 500 }
    );
  }
}
