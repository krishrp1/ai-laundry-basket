"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/dal";
import { OrderStatus } from "@/generated/prisma/client";
import { orderStatusLabels } from "@/lib/order-status-labels";
import { sendOrderStatusUpdate } from "@/lib/email/send";
import { isRecordNotFoundError } from "@/lib/prisma-errors";

function isOrderStatus(value: string): value is OrderStatus {
  return (Object.values(OrderStatus) as string[]).includes(value);
}

export async function updateOrderStatusAction(id: string, formData: FormData) {
  const session = await verifySession();

  const status = formData.get("status");
  const noteRaw = formData.get("note");
  const note = typeof noteRaw === "string" && noteRaw.trim() ? noteRaw.trim().slice(0, 500) : null;

  if (typeof status !== "string" || !isOrderStatus(status)) {
    throw new Error("Invalid status");
  }

  let order;
  try {
    order = await db.laundryOrder.update({
      where: { id },
      data: {
        status,
        statusHistory: {
          create: { status, note, changedBy: session.email },
        },
      },
      include: { customer: true },
    });
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      revalidatePath("/admin/orders");
      redirect("/admin/orders");
    }
    throw error;
  }

  await sendOrderStatusUpdate({
    to: order.customer.email,
    name: order.customer.name,
    orderId: order.orderId,
    statusLabel: orderStatusLabels[status],
    note,
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
