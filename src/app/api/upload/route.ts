import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/validations";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Enforce private/secure token generation with restricted content types & size
        return {
          allowedContentTypes: ALLOWED_MIME_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_BYTES, // 25 MB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            uploadedAt: new Date().toISOString(),
            pathname,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Safe logging of upload completion metadata without private tokens
        try {
          console.log("[Blob Upload Completed]:", {
            pathname: blob.pathname,
            contentType: blob.contentType,
            url: blob.url,
            payload: tokenPayload,
          });
        } catch (error) {
          console.error("[Blob onUploadCompleted Error]:", error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[Vercel Blob Upload Error]:", error);
    return NextResponse.json(
      { error: (error as Error).message || "An error occurred generating upload authorization." },
      { status: 400 }
    );
  }
}
