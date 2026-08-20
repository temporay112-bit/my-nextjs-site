import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import type { InquiryInput } from "@/lib/validations";

export type InquiryStatus = "NEW" | "REVIEWING" | "CONTACTED" | "QUOTED" | "CLOSED";

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  companyName: string;
  productCategory: string;
  message: string;
  fileReference: string | null;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory exists or created
  }
}

export async function getInquiries(): Promise<InquiryRecord[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(INQUIRIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function createInquiry(input: InquiryInput): Promise<InquiryRecord> {
  await ensureDataDir();

  const id = "inq-" + crypto.randomBytes(6).toString("hex") + "-" + Date.now();
  const now = new Date().toISOString();

  const record: InquiryRecord = {
    id,
    name: input.name,
    email: input.email,
    companyName: input.company,
    productCategory: input.productCategory,
    message: input.message,
    fileReference: input.fileReference || null,
    status: "NEW",
    createdAt: now,
    updatedAt: now,
  };

  const existing = await getInquiries();
  existing.unshift(record);

  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf-8");

  return record;
}

export async function getInquiryById(id: string): Promise<InquiryRecord | null> {
  const existing = await getInquiries();
  return existing.find((item) => item.id === id) || null;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<InquiryRecord | null> {
  const existing = await getInquiries();
  const index = existing.findIndex((item) => item.id === id);

  if (index === -1) return null;

  existing[index].status = status;
  existing[index].updatedAt = new Date().toISOString();

  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf-8");

  return existing[index];
}
