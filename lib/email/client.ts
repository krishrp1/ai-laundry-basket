import "server-only";
import { Resend } from "resend";
import { env } from "@/lib/env";

let resendClient: Resend | null = null;

/** Returns null (instead of throwing) when Resend isn't configured yet, so
 * form submissions still succeed and save to the database during setup. */
export function getResendClient(): Resend | null {
  if (!env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient;
}

export const EMAIL_FROM = env.EMAIL_FROM ?? "A&I Laundry Basket <no-reply@ailaundrybasket.com>";
export const BUSINESS_NOTIFICATION_EMAIL = env.BUSINESS_NOTIFICATION_EMAIL;
