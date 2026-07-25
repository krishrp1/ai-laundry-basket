import { Prisma } from "@/generated/prisma/client";

/** True for Prisma's "record to update/delete not found" error (P2025) — e.g. a race where the row was deleted in another tab. */
export function isRecordNotFoundError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}
