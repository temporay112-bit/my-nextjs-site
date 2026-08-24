import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { ALLOWED_MIME_TYPES, ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/lib/validations";
import { randomBytes } from "crypto";
import path from "path";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const contentType = request.headers.get("content-type") || "";

  // 1. Multipart Form Data Direct Upload (Standard and primary method)
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "File size exceeds the 25MB maximum limit." },
          { status: 400 }
        );
      }

      const originalExt = path.extname(file.name).toLowerCase();
      const isValidExt = ALLOWED_FILE_EXTENSIONS.includes(originalExt as any);
      const isValidMime =
        ALLOWED_MIME_TYPES.includes(file.type as any) || file.type === "application/octet-stream";

      if (!isValidExt && !isValidMime) {
        return NextResponse.json(
          {
            error: "This file type is not supported. Please upload a PDF, AI, PSD, PNG, JPG, or ZIP.",
          },
          { status: 400 }
        );
      }

      const safeExt = originalExt || ".pdf";
      const safeFilename = `techpacks/tp_${Date.now()}_${randomBytes(4).toString("hex")}${safeExt}`;

      // Upload directly to Vercel Blob storage (Supports both public and private configured stores)
      let blob;
      try {
        blob = await put(safeFilename, file, {
          access: "public",
          addRandomSuffix: false,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (accessErr: any) {
        if (accessErr?.message && accessErr.message.toLowerCase().includes("private store")) {
          blob = await put(safeFilename, file, {
            access: "private",
            addRandomSuffix: false,
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
        } else {
          throw accessErr;
        }
      }

      return NextResponse.json({
        success: true,
        url: blob.url || blob.downloadUrl,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        filename: file.name,
        size: file.size,
      });
    } catch (err: any) {
      console.error("[Upload API Error]:", err);
      return NextResponse.json(
        { error: err.message || "File upload failed. Please try again." },
        { status: 500 }
      );
    }
  }

  // 2. Client-Side @vercel/blob/client handleUpload handler
  try {
    const body = (await request.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ALLOWED_MIME_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            uploadedAt: new Date().toISOString(),
            pathname,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
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
