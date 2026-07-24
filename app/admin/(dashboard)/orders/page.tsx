import Link from "next/link";
import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminFiltersBar } from "@/components/admin/filters-bar";
import { AdminPagination } from "@/components/admin/pagination";
import { StatusSelectForm } from "@/components/admin/status-select-form";
import { listOrders } from "@/lib/data/orders";
import { parseListParams, type RawSearchParams } from "@/lib/data/list-params";
import { orderStatusLabels } from "@/lib/order-status-labels";
import { updateOrderStatusAction } from "@/lib/actions/admin/orders";

export const metadata: Metadata = { title: "Orders" };

const statusOptions = Object.entries(orderStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseListParams(await searchParams);
  const { items, meta } = await listOrders(params);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meta.total} order{meta.total === 1 ? "" : "s"}
        </p>
      </div>

      <AdminFiltersBar statusOptions={statusOptions} searchPlaceholder="Search order ID, customer..." />

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
            {items.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline">
                    {order.orderId}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customer.name}</span>
                    <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                  </div>
                </TableCell>
                <TableCell>{order.serviceType}</TableCell>
                <TableCell>
                  <StatusSelectForm
                    action={updateOrderStatusAction.bind(null, order.id)}
                    currentStatus={order.status}
                    options={statusOptions}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.createdAt.toISOString().split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AdminPagination
          meta={meta}
          buildHref={(page) => {
            const query = new URLSearchParams();
            if (params.search) query.set("search", params.search);
            if (params.status) query.set("status", params.status);
            if (params.sort !== "desc") query.set("sort", params.sort);
            query.set("page", String(page));
            return `/admin/orders?${query.toString()}`;
          }}
        />
      </div>
    </div>
  );
}
