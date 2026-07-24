"use server";

import { db } from "@/lib/prisma";
import { contactFormSchema, type ContactFormState } from "@/lib/validations/contact";
import { contactMethodMap } from "@/lib/enum-maps";
import { generateRequestId } from "@/lib/ids";
import { checkRateLimit, rateLimitKey } from "@/lib/rate-limit";
import { checkFormSpamSignals, isDuplicateSubmission } from "@/lib/spam-guards";
import { getClientIp } from "@/lib/request-ip";
import { sendContactAcknowledgement } from "@/lib/email/send";

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const spamCheck = checkFormSpamSignals(formData);
  if (spamCheck.isSpam) {
    // Pretend success so bots don't learn their submission was rejected.
    return { status: "success", requestId: generateRequestId("CM") };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    contactMethod: formData.get("contactMethod"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  const ip = await getClientIp();
  const rateLimit = await checkRateLimit(rateLimitKey("contact", ip), {
    limit: 5,
    windowSeconds: 10 * 60,
  });
  if (!rateLimit.allowed) {
    return {
      status: "error",
      errors: {},
      formError: "Too many submissions. Please try again in a few minutes.",
    };
  }

  const data = parsed.data;

  const duplicate = await isDuplicateSubmission("contactMessage", [
    data.email,
    data.message,
  ]);
  if (duplicate) {
    // Likely a double-click; treat as success without creating a duplicate row.
    return { status: "success", requestId: generateRequestId("CM") };
  }

  const requestId = generateRequestId("CM");

  await db.contactMessage.create({
    data: {
      requestId,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      location: data.location || null,
      contactMethod: contactMethodMap[data.contactMethod],
      message: data.message,
      ipAddress: ip,
    },
  });

  await sendContactAcknowledgement({
    to: data.email,
    name: data.name,
    requestId,
    phone: data.phone || null,
    message: data.message,
  });

  return { status: "success", requestId };
}
