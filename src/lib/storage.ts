import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export interface StoredFileRecord {
  fileReference: string;
  originalName: string;
  sanitizedName: string;
  sizeBytes: number;
  mimeType: string;
  storagePath: string;
  uploadedAt: string;
}

const STORAGE_DIR = path.join(process.cwd(), "storage", "uploads");
const METADATA_FILE = path.join(STORAGE_DIR, "uploads-metadata.json");

async function ensureStorageDir(): Promise<void> {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // Directory already exists or can't be created
  }
}

export function sanitizeFilename(filename: string): string {
  // Remove non-alphanumeric characters except dot, dash, underscore
  const base = path.basename(filename);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function saveUploadedFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<StoredFileRecord> {
  await ensureStorageDir();

  const fileReference = "tp-" + crypto.randomBytes(8).toString("hex") + "-" + Date.now();
  const safeName = sanitizeFilename(originalFilename);
  const ext = path.extname(safeName);
  const uniqueStorageName = `${fileReference}${ext}`;
  const targetFilePath = path.join(STORAGE_DIR, uniqueStorageName);

  // Write file buffer to disk outside public/
  await fs.writeFile(targetFilePath, fileBuffer);

  const record: StoredFileRecord = {
    fileReference,
    originalName: originalFilename,
    sanitizedName: safeName,
    sizeBytes: fileBuffer.length,
    mimeType,
    storagePath: targetFilePath,
    uploadedAt: new Date().toISOString(),
  };

  // Update metadata file
  try {
    let metadataList: StoredFileRecord[] = [];
    try {
      const data = await fs.readFile(METADATA_FILE, "utf-8");
      metadataList = JSON.parse(data);
    } catch {
      metadataList = [];
    }

    metadataList.push(record);
    await fs.writeFile(METADATA_FILE, JSON.stringify(metadataList, null, 2), "utf-8");
  } catch (err) {
    console.error("[Storage] Failed to write upload metadata:", err);
  }

  return record;
}

export async function getStoredFileMetadata(fileReference: string): Promise<StoredFileRecord | null> {
  try {
    const data = await fs.readFile(METADATA_FILE, "utf-8");
    const list: StoredFileRecord[] = JSON.parse(data);
    return list.find((item) => item.fileReference === fileReference) || null;
  } catch {
    return null;
  }
}
