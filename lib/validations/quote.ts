import { z } from "zod";
import { contactMethodValues } from "./contact";

export const customerTypeValues = ["residential", "commercial"] as const;
export const urgencyValues = ["standard", "rush", "same-day"] as const;
export const recurringValues = ["one-time", "weekly", "biweekly", "monthly"] as const;

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

function trimmed(max: number, min = 1) {
  return z
    .string()
    .trim()
    .min(min)
    .max(max)
    .transform((value) => value.replace(CONTROL_CHARS, "").trim());
}

const isoDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Use a valid date." });

export const quoteFormSchema = z
  .object({
    name: trimmed(120, 1),
    email: z.email().trim().toLowerCase().max(200),
    phone: trimmed(30, 3),
    address: trimmed(200, 1),
    city: trimmed(100, 1),
    zip: z
      .string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, { error: "Enter a valid ZIP code." }),
    customerType: z.enum(customerTypeValues),
    serviceType: trimmed(100, 1),
    estimatedWeight: trimmed(100, 1),
    recurring: z.enum(recurringValues),
    pickupDate: isoDate,
    pickupTime: trimmed(100, 1),
    deliveryDate: isoDate.optional().or(z.literal("")),
    urgency: z.enum(urgencyValues),
    specialInstructions: z.string().trim().max(2000).optional().or(z.literal("")),
    contactMethod: z.enum(contactMethodValues),
    consent: z
      .string()
      .refine((value) => value === "on" || value === "true", {
        error: "Please agree before submitting your request.",
      }),
  })
  .refine(
    (data) => !data.deliveryDate || data.deliveryDate >= data.pickupDate,
    { error: "Delivery date cannot be before pickup date.", path: ["deliveryDate"] }
  );

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export type QuoteFormFieldErrors = Partial<Record<keyof QuoteFormValues, string[]>>;

export type QuoteFormState =
  | { status: "idle" }
  | { status: "error"; errors: QuoteFormFieldErrors; formError?: string }
  | { status: "success"; requestId: string };
