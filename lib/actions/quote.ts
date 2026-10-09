"use server";

import { after } from "next/server";
import { quoteFormSchema, type QuoteFormState } from "@/lib/validations/quote";
import {
  contactMethodMap,
  customerTypeMap,
  urgencyMap,
  recurringMap,
} from "@/lib/enum-maps";
import { generateRequestId } from "@/lib/ids";
import { checkRateLimit, rateLimitKey } from "@/lib/rate-limit";
import {
  checkFormSpamSignals,
  DUPLICATE_WINDOW_MS,
  withSubmissionLock,
} from "@/lib/spam-guards";
import { getClientIp } from "@/lib/request-ip";
import { sendQuoteConfirmation } from "@/lib/email/send";
import { siteConfig } from "@/config/site";

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
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
    const pickupDate = new Date(`${data.pickupDate}T00:00:00Z`);

    const requestId = await withSubmissionLock(
      [data.email, data.serviceType, data.pickupDate],
      async (tx) => {
        // Likely a double-click or a retry after the first attempt's email
        // failed to send — don't create a duplicate row, but do resend the
        // confirmation (below) so a transient Resend outage doesn't lose it.
        const existing = await tx.quoteRequest.findFirst({
          where: {
            email: data.email,
            serviceType: data.serviceType,
            pickupDate,
            createdAt: { gte: since },
          },
          select: { requestId: true },
        });
        if (existing) return existing.requestId;

        const requestId = generateRequestId("QR");

        // The submitter is unauthenticated, so they must not be able to
        // rewrite an existing customer's identity: keep the stored name and
        // phone, and let this quote carry the details they just submitted.
        const customer = await tx.customer.upsert({
          where: { email: data.email },
          update: {},
          create: { name: data.name, email: data.email, phone: data.phone },
        });

        await tx.quoteRequest.create({
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
            pickupDate,
            pickupTime: data.pickupTime,
            deliveryDate: data.deliveryDate
              ? new Date(`${data.deliveryDate}T00:00:00Z`)
              : null,
            urgency: urgencyMap[data.urgency],
            specialInstructions: data.specialInstructions || null,
            contactMethod: contactMethodMap[data.contactMethod],
            consentAt: new Date(),
            consentVersion: siteConfig.legal.policyVersion,
          },
        });

        return requestId;
      }
    );

    after(() =>
      sendQuoteConfirmation({
        to: data.email,
        name: data.name,
        requestId,
        serviceType: data.serviceType,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
      })
    );

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
