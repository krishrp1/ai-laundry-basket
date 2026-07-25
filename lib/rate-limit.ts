import "server-only";
import { db } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

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
 *
 * Count-then-insert is wrapped in a Serializable transaction so two
 * concurrent requests can't both read the same under-limit count and both
 * insert, which would let the limit be exceeded (a real risk for
 * brute-forcing admin login with a handful of parallel requests). Postgres
 * aborts one side of any conflicting pair with a serialization failure; we
 * treat that as "not allowed" rather than retrying, since failing closed is
 * the safe choice for a rate limiter.
 */
export async function checkRateLimit(
  key: string,
  { limit, windowSeconds }: RateLimitOptions
): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - windowSeconds * 1000);

  try {
    return await db.$transaction(
      async (tx) => {
        const count = await tx.rateLimitHit.count({
          where: { key, createdAt: { gte: windowStart } },
        });

        if (count >= limit) {
          return { allowed: false, remaining: 0 };
        }

        await tx.rateLimitHit.create({ data: { key } });
        return { allowed: true, remaining: Math.max(0, limit - count - 1) };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );
  } catch {
    // Any DB error here (serialization conflict, pool exhaustion, transient
    // outage, ...) fails closed rather than re-throwing — the caller's whole
    // request shouldn't crash just because the rate limiter couldn't run,
    // and "temporarily unavailable" is the safe default for a rate limiter.
    return { allowed: false, remaining: 0 };
  } finally {
    // Opportunistically prune old rows so the table doesn't grow unbounded.
    // Fire-and-forget, but never unhandled: a rejection here (e.g. the same
    // DB hiccup) must not become an unhandled promise rejection, which would
    // crash the whole Node process rather than just this one prune attempt.
    if (Math.random() < 0.02) {
      const cutoff = new Date(Date.now() - 60 * 60 * 1000);
      db.rateLimitHit.deleteMany({ where: { createdAt: { lt: cutoff } } }).catch(() => {});
    }
  }
}

export function rateLimitKey(action: string, identifier: string) {
  return `${action}:${identifier}`;
}
