import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { DetailField as Field } from "@/components/admin/detail-field";
import { getOrderById } from "@/lib/data/orders";
import { orderStatusLabels } from "@/lib/order-status-labels";
import { updateOrderStatusAction } from "@/lib/actions/admin/orders";
import { formatDateIN, formatDateTimeIN, formatINR } from "@/lib/format";

export const metadata: Metadata = { title: "Order" };

const statusOptions = Object.entries(orderStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to orders
          </Link>
          <h1 className="text-2xl font-semibold">{order.orderId}</h1>
        </div>
        <StatusBadge status={order.status} label={orderStatusLabels[order.status]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-semibold">Order details</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Customer" value={order.customer.name} />
              <Field label="Email" value={order.customer.email} />
              <Field label="Service" value={order.serviceType} />
              <Field
                label="Pickup"
                value={
                  order.pickupDate
                    ? `${formatDateIN(order.pickupDate)}${order.pickupTime ? ` · ${order.pickupTime}` : ""}`
                    : "—"
                }
              />
              <Field
                label="Delivery"
                value={order.deliveryDate ? formatDateIN(order.deliveryDate) : "—"}
              />
              <Field
                label="Address"
                value={
                  order.pickupAddress
                    ? `${order.pickupAddress.line1}, ${order.pickupAddress.city} ${order.pickupAddress.zip}`
                    : "—"
                }
              />
              <Field label="Quoted price" value={order.quotedPrice ? formatINR(order.quotedPrice.toString()) : "—"} />
              <Field label="Final price" value={order.finalPrice ? formatINR(order.finalPrice.toString()) : "—"} />
            </dl>
            {order.quoteRequest && (
              <Link
                href={`/admin/quotes/${order.quoteRequest.id}`}
                className="text-sm text-primary hover:underline"
              >
                View original quote request ({order.quoteRequest.requestId})
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <OrderStatusForm
              action={updateOrderStatusAction.bind(null, order.id)}
              currentStatus={order.status}
              options={statusOptions}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h2 className="mb-4 font-semibold">Status history</h2>
          <ol className="flex flex-col gap-4">
            {order.statusHistory.map((entry) => (
              <li key={entry.id} className="flex gap-3 border-l-2 border-border pl-4">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={entry.status} label={orderStatusLabels[entry.status]} />
                    <span className="text-xs text-muted-foreground">
                      {formatDateTimeIN(entry.createdAt)}
                    </span>
                  </div>
                  {entry.note && <p className="mt-1 text-sm">{entry.note}</p>}
                  {entry.changedBy && (
                    <p className="mt-0.5 text-xs text-muted-foreground">by {entry.changedBy}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
