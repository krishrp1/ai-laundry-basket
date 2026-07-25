"use server";

import { db } from "@/lib/prisma";
import { quoteFormSchema, type QuoteFormState } from "@/lib/validations/quote";
import {
  contactMethodMap,
  customerTypeMap,
  urgencyMap,
  recurringMap,
} from "@/lib/enum-maps";
import { generateRequestId } from "@/lib/ids";
import { checkRateLimit, rateLimitKey } from "@/lib/rate-limit";
import { checkFormSpamSignals, isDuplicateSubmission } from "@/lib/spam-guards";
import { getClientIp } from "@/lib/request-ip";
import { sendQuoteConfirmation } from "@/lib/email/send";

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const spamCheck = checkFormSpamSignals(formData);
  if (spamCheck.isSpam) {
    return { status: "success", requestId: generateRequestId("QR") };
  }

  const parsed = quoteFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    zip: formData.get("zip"),
    customerType: formData.get("customerType"),
    serviceType: formData.get("serviceType"),
    estimatedWeight: formData.get("estimatedWeight"),
    recurring: formData.get("recurring"),
    pickupDate: formData.get("pickupDate"),
    pickupTime: formData.get("pickupTime"),
    deliveryDate: formData.get("deliveryDate"),
    urgency: formData.get("urgency"),
    specialInstructions: formData.get("specialInstructions"),
    contactMethod: formData.get("contactMethod"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  const ip = await getClientIp();
  const rateLimit = await checkRateLimit(rateLimitKey("quote", ip), {
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
    const duplicate = await isDuplicateSubmission("quoteRequest", [
      data.email,
      data.serviceType,
      data.pickupDate,
    ]);
    if (duplicate) {
      // The row from the first attempt already exists — but that attempt may
      // have failed to email the customer (e.g. a transient Resend outage),
      // so resend the confirmation on retry instead of silently no-oping.
      const requestId = generateRequestId("QR");
      await sendQuoteConfirmation({
        to: data.email,
        name: data.name,
        requestId,
        serviceType: data.serviceType,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
      });
      return { status: "success", requestId };
    }

    const requestId = generateRequestId("QR");

    const customer = await db.customer.upsert({
      where: { email: data.email },
      update: { name: data.name, phone: data.phone },
      create: { name: data.name, email: data.email, phone: data.phone },
    });

    await db.quoteRequest.create({
      data: {
        requestId,
        customerId: customer.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.zip,
        customerType: customerTypeMap[data.customerType],
        serviceType: data.serviceType,
        estimatedWeight: data.estimatedWeight,
        recurring: recurringMap[data.recurring],
        pickupDate: new Date(`${data.pickupDate}T00:00:00Z`),
        pickupTime: data.pickupTime,
        deliveryDate: data.deliveryDate
          ? new Date(`${data.deliveryDate}T00:00:00Z`)
          : null,
        urgency: urgencyMap[data.urgency],
        specialInstructions: data.specialInstructions || null,
        contactMethod: contactMethodMap[data.contactMethod],
        ipAddress: ip,
      },
    });

    await sendQuoteConfirmation({
      to: data.email,
      name: data.name,
      requestId,
      serviceType: data.serviceType,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
    });

    return { status: "success", requestId };
  } catch (error) {
    // An unexpected DB error (e.g. connection pool exhaustion under a
    // traffic spike) should surface as a normal retryable form error, not
    // crash to the generic error boundary.
    console.error("[quote] submission failed:", error);
    return {
      status: "error",
      errors: {},
      formError: "Something went wrong on our end. Please try again in a moment.",
    };
  }
}
