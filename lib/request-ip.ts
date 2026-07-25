import "server-only";
import { headers } from "next/headers";

/**
 * Best-effort client IP for rate limiting / spam signals inside Server Actions,
 * which (unlike Route Handlers) don't receive a Request object directly.
 *
 * X-Forwarded-For is a comma-separated hop chain where each proxy APPENDS the
 * address it saw the request come from. The first entry is whatever the
 * original client sent (attacker-controlled — anyone can set
 * `X-Forwarded-For: 1.2.3.4` on their request), while the LAST entry is the
 * address our own edge/reverse proxy observed directly, which cannot be
 * forged by the client. Using the first entry lets an attacker mint an
 * unlimited number of distinct rate-limit buckets and defeat login
 * brute-force / spam throttling entirely — so we take the last hop instead.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor.split(",").map((hop) => hop.trim()).filter(Boolean);
    if (hops.length > 0) return hops[hops.length - 1];
  }
  return headerList.get("x-real-ip") ?? "unknown";
}
