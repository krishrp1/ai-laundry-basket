import "server-only";
import { db } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@/generated/prisma/client";
import { skipTake, buildPageMeta, type ListParams } from "@/lib/data/list-params";

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PICKUP_SCHEDULED",
  "PICKED_UP",
  "CLEANING",
  "QUALITY_CHECK",
  "READY_FOR_DELIVERY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

function isOrderStatus(value: string): value is OrderStatus {
  return (Object.values(OrderStatus) as string[]).includes(value);
}

export async function listOrders({ search, status, sort, page }: ListParams) {
  const where: Prisma.LaundryOrderWhereInput = {
    ...(status && isOrderStatus(status) ? { status } : {}),
    ...(search
      ? {
          OR: [
            { orderId: { contains: search, mode: "insensitive" } },
            { customer: { name: { contains: search, mode: "insensitive" } } },
            { customer: { email: { contains: search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [total, items] = await Promise.all([
    db.laundryOrder.count({ where }),
    db.laundryOrder.findMany({
      where,
      orderBy: { createdAt: sort },
      include: { customer: true },
      ...skipTake(page),
    }),
  ]);

  return { items, meta: buildPageMeta(total, page) };
}

export async function getOrderById(id: string) {
  return db.laundryOrder.findUnique({
    where: { id },
    include: {
      customer: true,
      pickupAddress: true,
      quoteRequest: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
    },
  });
}
