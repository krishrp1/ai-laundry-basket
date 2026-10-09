import { z } from "zod";

/**
 * The value a ticked consent checkbox posts. Required on every public form so
 * the server never stores personal data without an explicit agreement, even
 * if the client-side check is bypassed.
 */
export const consentSchema = z
  .string()
  .refine((value) => value === "on" || value === "true", {
    error: "Please tick the box to agree before sending.",
  });
