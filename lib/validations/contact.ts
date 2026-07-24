import { z } from "zod";

export const contactMethodValues = ["email", "phone", "text"] as const;

// Strips control characters (keeps tab/newline/CR) without touching normal
// punctuation or unicode text.
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

function trimmed(max: number, min = 1) {
  return z
    .string()
    .trim()
    .min(min)
    .max(max)
    .transform((value) => value.replace(CONTROL_CHARS, "").trim());
}

export const contactFormSchema = z.object({
  name: trimmed(120, 1),
  email: z.email().trim().toLowerCase().max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  contactMethod: z.enum(contactMethodValues),
  message: trimmed(4000, 5),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string[]>>;

export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; errors: ContactFormFieldErrors; formError?: string }
  | { status: "success"; requestId: string };
