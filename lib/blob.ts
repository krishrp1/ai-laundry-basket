import "server-only";
import { put } from "@vercel/blob";
import { env } from "@/lib/env";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export type UploadedAttachment = {
  url: string;
  name: string;
};

/**
 * Re-validates and uploads a quote-request photo attachment to Vercel Blob.
 * Never trust the client-side checks already done in the form component.
 */
export async function uploadQuoteAttachment(
  file: File
): Promise<UploadedAttachment | null> {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    console.warn("BLOB_READ_WRITE_TOKEN not configured; skipping attachment upload.");
    return null;
  }

  if (file.size === 0) return null;

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Attachment must be a JPEG, PNG, WEBP, or GIF image.");
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Attachment must be smaller than 10 MB.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
  const blob = await put(`quote-attachments/${Date.now()}-${safeName}`, file, {
    access: "public",
    token: env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: true,
  });

  return { url: blob.url, name: file.name };
}
