import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { put } from "@vercel/blob";
import path from "path";
import fs from "fs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds maximum limit of 10MB." },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || ".png";
    const safeFilename = `products/${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

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
      filename: safeFilename,
    });
  } catch (err: any) {
    console.error("[Admin Upload Error]:", err);
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 500 });
  }
}
