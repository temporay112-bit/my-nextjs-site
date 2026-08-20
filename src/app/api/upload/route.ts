import { NextRequest, NextResponse } from "next/server";
import { validateFileMetadata } from "@/lib/validations";
import { saveUploadedFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file was provided in the upload request." },
        { status: 400 }
      );
    }

    const validation = validateFileMetadata(file.name, file.size, file.type);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error || "File validation failed." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const storedRecord = await saveUploadedFile(buffer, file.name, file.type || "application/octet-stream");

    return NextResponse.json(
      {
        success: true,
        fileReference: storedRecord.fileReference,
        filename: storedRecord.sanitizedName,
        sizeBytes: storedRecord.sizeBytes,
        uploadedAt: storedRecord.uploadedAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[API Upload Error]:", err);
    return NextResponse.json(
      { success: false, error: "We couldn't upload this file. Please try again." },
      { status: 500 }
    );
  }
}
