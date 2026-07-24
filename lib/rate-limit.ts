import "server-only";
import { db } from "@/lib/prisma";

type RateLimitOptions = {
  limit: number;
  windowSeconds: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

/**
 * Fixed-window rate limiter backed by Postgres (no external cache needed for
 * an MVP's traffic volume). `key` should already include the action name,
 * e.g. `contact:203.0.113.4`.
 */
export async function checkRateLimit(
  key: string,
  { limit, windowSeconds }: RateLimitOptions
): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - windowSeconds * 1000);

  const count = await db.rateLimitHit.count({
    where: { key, createdAt: { gte: windowStart } },
  });

  if (count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await db.rateLimitHit.create({ data: { key } });

  // Opportunistically prune old rows so the table doesn't grow unbounded.
  if (Math.random() < 0.02) {
    const cutoff = new Date(Date.now() - 60 * 60 * 1000);
    void db.rateLimitHit.deleteMany({ where: { createdAt: { lt: cutoff } } });
  }

  return { allowed: true, remaining: Math.max(0, limit - count - 1) };
}

export function rateLimitKey(action: string, identifier: string) {
  return `${action}:${identifier}`;
}
