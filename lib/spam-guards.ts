import "server-only";
import { createHash } from "node:crypto";
import { db } from "@/lib/prisma";
import { HONEYPOT_FIELD, FORM_TIMESTAMP_FIELD } from "@/lib/spam-guard-constants";

const MIN_FILL_TIME_MS = 1200;
const MAX_FILL_TIME_MS = 6 * 60 * 60 * 1000;

export type SpamCheckResult = { isSpam: true; reason: string } | { isSpam: false };

/**
 * Cheap, dependency-free bot signals: a filled honeypot, or a submission that
 * arrived faster than a human could plausibly fill the form.
 */
export function checkFormSpamSignals(formData: FormData): SpamCheckResult {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { isSpam: true, reason: "honeypot" };
  }

  // The real form component always sets this on mount, so it's only ever
  // missing/malformed when something is POSTing to the action directly
  // (bypassing the client component) — fail closed rather than skipping the
  // check in that case, instead of treating an absent timestamp as human.
  const renderedAtRaw = formData.get(FORM_TIMESTAMP_FIELD);
  const renderedAt = typeof renderedAtRaw === "string" ? Number(renderedAtRaw) : NaN;
  if (!Number.isFinite(renderedAt)) {
    return { isSpam: true, reason: "missing-timestamp" };
  }
  const elapsed = Date.now() - renderedAt;
  if (elapsed < MIN_FILL_TIME_MS) {
    return { isSpam: true, reason: "too-fast" };
  }
  // A forged, implausibly-old timestamp (a bot trying to dodge the "too
  // fast" check above) will never fall within a real fill duration either.
  if (elapsed < 0 || elapsed > MAX_FILL_TIME_MS) {
    return { isSpam: true, reason: "implausible-timestamp" };
  }

  return { isSpam: false };
}

function hashContent(parts: string[]) {
  return createHash("sha256").update(parts.join("|")).digest("hex");
}

/**
 * Guards against accidental double-submits (double-click, browser retry) by
 * rejecting an identical email+message combination submitted in the last
 * `windowSeconds`. Not a security control — just avoids duplicate rows.
 */
export async function isDuplicateSubmission(
  table: "contactMessage" | "quoteRequest",
  parts: string[],
  windowSeconds = 60
): Promise<boolean> {
  const contentHash = hashContent(parts);
  const since = new Date(Date.now() - windowSeconds * 1000);

  const recentHits = await db.rateLimitHit.count({
    where: { key: `dupe:${table}:${contentHash}`, createdAt: { gte: since } },
  });

  await db.rateLimitHit.create({
    data: { key: `dupe:${table}:${contentHash}` },
  });

  return recentHits > 0;
}
