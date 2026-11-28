import "server-only";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { db } from "@/lib/prisma";
import type { ListParams } from "@/lib/data/list-params";
import { orderWhere } from "@/lib/data/orders";
import { quoteWhere } from "@/lib/data/quotes";
import { customerWhere } from "@/lib/data/customers";

/** Upper bound per file, so one export cannot load an unbounded table into a serverless function. */
export const EXPORT_LIMIT = 5000;

type Table = { header: string[]; rows: unknown[][] };

const exporters: Record<string, (params: ListParams) => Promise<Table>> = {
  orders: async (params) => {
    const items = await db.laundryOrder.findMany({
      where: orderWhere(params), orderBy: { createdAt: params.sort }, take: EXPORT_LIMIT,
      select: { orderId: true, serviceType: true, status: true, createdAt: true,
                customer: { select: { name: true, email: true } } },
    });
    return {
      header: ["Order ID", "Customer", "Email", "Service", "Status", "Created"],
      rows: items.map((o) => [o.orderId, o.customer.name, o.customer.email, o.serviceType, o.status, o.createdAt]),
    };
  },
  quotes: async (params) => {
    const items = await db.quoteRequest.findMany({
      where: quoteWhere(params), orderBy: { createdAt: params.sort }, take: EXPORT_LIMIT,
      select: { requestId: true, name: true, email: true, phone: true, serviceType: true, pickupDate: true,
                pickupTime: true, status: true, createdAt: true },
    });
    return {
      header: ["Request ID", "Name", "Email", "Phone", "Service", "Pickup date", "Pickup time", "Status", "Received"],
      rows: items.map((q) => [q.requestId, q.name, q.email, q.phone, q.serviceType, q.pickupDate, q.pickupTime,
                              q.status, q.createdAt]),
    };
  },
  customers: async (params) => {
    const items = await db.customer.findMany({
      where: customerWhere(params), orderBy: { createdAt: params.sort }, take: EXPORT_LIMIT,
      include: { _count: { select: { quoteRequests: true, orders: true } } },
    });
    return {
      header: ["Name", "Email", "Phone", "Quotes", "Orders", "Since"],
      rows: items.map((c) => [c.name, c.email, c.phone, c._count.quoteRequests, c._count.orders, c.createdAt]),
    };
  },
};

/** One CSV table, or null for an unknown resource. Bulk customer data, so super admins only. */
export async function exportTable(resource: string, params: ListParams): Promise<Table | null> {
  await requireSuperAdmin();
  return Object.hasOwn(exporters, resource) ? exporters[resource]!(params) : null;
}
