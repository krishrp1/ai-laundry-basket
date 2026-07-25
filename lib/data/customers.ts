import "server-only";
import { db } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { skipTake, buildPageMeta, type ListParams } from "@/lib/data/list-params";
import { isValidUuid } from "@/lib/uuid";

export async function listCustomers({ search, sort, page }: Omit<ListParams, "status">) {
  const where: Prisma.CustomerWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [total, items] = await Promise.all([
    db.customer.count({ where }),
    db.customer.findMany({
      where,
      orderBy: { createdAt: sort },
      include: {
        _count: { select: { quoteRequests: true, orders: true } },
      },
      ...skipTake(page),
    }),
  ]);

  return { items, meta: buildPageMeta(total, page) };
}

export async function getCustomerById(id: string) {
  if (!isValidUuid(id)) return null;
  return db.customer.findUnique({
    where: { id },
    include: {
      pickupAddresses: true,
      quoteRequests: { orderBy: { createdAt: "desc" }, take: 50 },
      orders: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });
}
