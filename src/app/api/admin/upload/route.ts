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

    // If Vercel Blob token exists, use Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(safeFilename, file, {
          access: "public",
          addRandomSuffix: false,
        });

        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: safeFilename,
        });
      } catch (blobErr: any) {
        console.warn("Vercel Blob upload fallback to local storage:", blobErr.message);
      }
    }

    // Fallback: save to public/images/products/uploads/
    const uploadDir = path.join(process.cwd(), "public", "images", "products", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const localFilePath = path.join(uploadDir, localFileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(localFilePath, buffer);

    const publicUrl = `/images/products/uploads/${localFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: localFileName,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 401 });
  }
}
