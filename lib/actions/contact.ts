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

  try {
    const duplicate = await isDuplicateSubmission("contactMessage", [
      data.email,
      data.message,
    ]);
    if (duplicate) {
      // Likely a double-click or a retry after the first attempt's email
      // failed to send — don't create a duplicate row, but do resend the
      // acknowledgement so a transient Resend outage doesn't lose it.
      const requestId = generateRequestId("CM");
      await sendContactAcknowledgement({
        to: data.email,
        name: data.name,
        requestId,
        phone: data.phone || null,
        message: data.message,
      });
      return { status: "success", requestId };
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
  } catch (error) {
    // An unexpected DB error (e.g. connection pool exhaustion under a
    // traffic spike) should surface as a normal retryable form error, not
    // crash to the generic error boundary.
    console.error("[contact] submission failed:", error);
    return {
      status: "error",
      errors: {},
      formError: "Something went wrong on our end. Please try again in a moment.",
    };
  }
}
