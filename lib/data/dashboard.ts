import "server-only";
import { db } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    newQuotes,
    activeOrders,
    unreadMessages,
    totalCustomers,
    recentQuotes,
    recentOrders,
  ] = await Promise.all([
    db.quoteRequest.count({ where: { status: "NEW" } }),
    db.laundryOrder.count({
      where: { status: { notIn: ["DELIVERED", "CANCELLED"] } },
    }),
    db.contactMessage.count({ where: { status: "NEW" } }),
    db.customer.count(),
    db.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.laundryOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { customer: true },
    }),
  ]);

  return {
    newQuotes,
    activeOrders,
    unreadMessages,
    totalCustomers,
    recentQuotes,
    recentOrders,
  };
}
