import "server-only";
import { headers } from "next/headers";

/**
 * Best-effort client IP for rate limiting / spam signals inside Server Actions,
 * which (unlike Route Handlers) don't receive a Request object directly.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") ?? "unknown";
}
