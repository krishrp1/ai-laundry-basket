import "server-only";
import { db } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
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

export const DUPLICATE_WINDOW_MS = 60_000;

/**
 * Runs `fn` in a transaction holding a Postgres advisory lock keyed on the
 * submission's content, so two near-simultaneous identical submissions
 * (double-click, retry) execute one after the other instead of both passing
 * their "already exists?" lookup and both inserting. The lookup and the
 * insert live inside `fn`, against the real table: a failed insert leaves no
 * trace, so a retry is never mistaken for a duplicate of a row that was never
 * saved, and a genuine duplicate can return the existing row's request ID.
 * The lock is transaction-scoped, so it is safe behind pgbouncer.
 */
export function withSubmissionLock<T>(
  parts: string[],
  fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  const key = `submission:${parts.join("|")}`;
  return db.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${key}))`;
    return fn(tx);
  });
}
