import "server-only";
import { randomBytes } from "node:crypto";

const ALPHABET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I/O to avoid ambiguity

function randomToken(length: number) {
  const bytes = randomBytes(length);
  let token = "";
  for (let i = 0; i < length; i++) {
    token += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return token;
}

/**
 * Human-friendly, unique-enough public identifier, e.g. "QR-7F3K9A2C".
 * Uniqueness is still enforced by a DB unique constraint on the caller's side.
 */
export function generateRequestId(prefix: "QR" | "ORD" | "CM") {
  return `${prefix}-${randomToken(8)}`;
}
