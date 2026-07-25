"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { verifySession, requireSuperAdmin } from "@/lib/auth/dal";
import { QuoteStatus } from "@/generated/prisma/client";
import { generateRequestId } from "@/lib/ids";
import { sendBookingConfirmation } from "@/lib/email/send";
import { isRecordNotFoundError } from "@/lib/prisma-errors";

function isQuoteStatus(value: string): value is QuoteStatus {
  return (Object.values(QuoteStatus) as string[]).includes(value);
}

export async function updateQuoteStatusAction(id: string, formData: FormData) {
  await verifySession();

  const status = formData.get("status");
  if (typeof status !== "string" || !isQuoteStatus(status)) {
    throw new Error("Invalid status");
  }

  try {
    await db.quoteRequest.update({ where: { id }, data: { status } });
  } catch (error) {
    // Someone else already deleted this quote (e.g. another admin tab) —
    // there's nothing left to update, so just fall back to the list instead
    // of crashing to the generic error boundary.
    if (isRecordNotFoundError(error)) {
      revalidatePath("/admin/quotes");
      redirect("/admin/quotes");
    }
    console.error(`[admin/quotes] updateQuoteStatusAction failed for ${id}:`, error);
    throw error;
  }

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${id}`);
}

export async function deleteQuoteRequestAction(id: string) {
  await requireSuperAdmin();

  await db.quoteRequest.delete({ where: { id } }).catch(() => null);

  revalidatePath("/admin/quotes");
  redirect("/admin/quotes");
}

export async function convertQuoteToOrderAction(id: string) {
  const session = await verifySession();

  const quote = await db.quoteRequest.findUnique({ where: { id } });
  if (!quote) {
    throw new Error("Quote request not found");
  }
  const customerId = quote.customerId;
  if (!customerId) {
    throw new Error("Quote request has no linked customer");
  }

  const orderId = generateRequestId("ORD");

  let order;
  try {
    order = await db.$transaction(async (tx) => {
      const created = await tx.laundryOrder.create({
        data: {
          orderId,
          quoteRequestId: quote.id,
          customerId,
          serviceType: quote.serviceType,
          pickupDate: quote.pickupDate,
          pickupTime: quote.pickupTime,
          deliveryDate: quote.deliveryDate,
          status: "PENDING",
          statusHistory: {
            create: { status: "PENDING", changedBy: session.email },
          },
        },
      });

      await tx.quoteRequest.update({
        where: { id: quote.id },
        data: { status: "CONVERTED" },
      });

      return created;
    });
  } catch (error) {
    console.error(`[admin/quotes] convertQuoteToOrderAction failed for ${id}:`, error);
    throw error;
  }

  await sendBookingConfirmation({
    to: quote.email,
    name: quote.name,
    orderId: order.orderId,
    serviceType: order.serviceType,
    pickupDate: quote.pickupDate.toISOString().split("T")[0],
    pickupTime: quote.pickupTime,
  });

  revalidatePath("/admin/quotes");
  revalidatePath("/admin/orders");
  redirect(`/admin/orders/${order.id}`);
}
