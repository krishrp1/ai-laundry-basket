import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { LinkListItem } from "@/components/admin/link-list-item";
import { getCustomerById } from "@/lib/data/customers";
import { quoteStatusLabels, orderStatusLabels } from "@/lib/order-status-labels";

export const metadata: Metadata = { title: "Customer" };

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/customers"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to customers
        </Link>
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
        <p className="text-sm text-muted-foreground">
          {customer.email}
          {customer.phone ? ` · ${customer.phone}` : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="mb-4 font-semibold">Quote requests</h2>
            <ul className="flex flex-col gap-3">
              {customer.quoteRequests.length === 0 && (
                <li className="text-sm text-muted-foreground">No quote requests.</li>
              )}
              {customer.quoteRequests.map((quote) => (
                <LinkListItem
                  key={quote.id}
                  href={`/admin/quotes/${quote.id}`}
                  title={quote.requestId}
                  badge={<StatusBadge status={quote.status} label={quoteStatusLabels[quote.status]} />}
                />
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="mb-4 font-semibold">Orders</h2>
            <ul className="flex flex-col gap-3">
              {customer.orders.length === 0 && (
                <li className="text-sm text-muted-foreground">No orders.</li>
              )}
              {customer.orders.map((order) => (
                <LinkListItem
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  title={order.orderId}
                  badge={<StatusBadge status={order.status} label={orderStatusLabels[order.status]} />}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
