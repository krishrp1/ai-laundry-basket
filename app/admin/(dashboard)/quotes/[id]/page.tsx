import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusSelectForm } from "@/components/admin/status-select-form";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { DetailField as Field } from "@/components/admin/detail-field";
import { getQuoteRequestById } from "@/lib/data/quotes";
import {
  quoteStatusLabels,
  customerTypeLabels,
  contactMethodLabels,
  urgencyLabels,
  recurringLabels,
} from "@/lib/order-status-labels";
import {
  updateQuoteStatusAction,
  deleteQuoteRequestAction,
  convertQuoteToOrderAction,
} from "@/lib/actions/admin/quotes";
import { formatDateIN, formatDateTimeIN } from "@/lib/format";
import { getCurrentAdmin } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Quote Request" };

const statusOptions = Object.entries(quoteStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [quote, admin] = await Promise.all([getQuoteRequestById(id), getCurrentAdmin()]);
  if (!quote) notFound();
  const canDelete = admin.role === "SUPER_ADMIN";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/quotes"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to quotes
          </Link>
          <h1 className="text-2xl font-semibold">{quote.requestId}</h1>
        </div>
        <StatusSelectForm
          action={updateQuoteStatusAction.bind(null, quote.id)}
          currentStatus={quote.status}
          options={statusOptions}
          label={`Update status for ${quote.requestId}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex flex-col gap-4">
            <h2 className="text-base font-semibold">Request details</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Customer" value={quote.name} />
              <Field label="Email" value={quote.email} />
              <Field label="Phone" value={quote.phone} />
              <Field label="Preferred contact" value={contactMethodLabels[quote.contactMethod]} />
              <Field label="Customer type" value={customerTypeLabels[quote.customerType]} />
              <Field label="Service" value={quote.serviceType} />
              <Field label="Estimated weight" value={quote.estimatedWeight} />
              <Field label="Recurring" value={recurringLabels[quote.recurring]} />
              <Field
                label="Pickup"
                value={`${formatDateIN(quote.pickupDate)} · ${quote.pickupTime}`}
              />
              <Field
                label="Delivery"
                value={quote.deliveryDate ? formatDateIN(quote.deliveryDate) : "—"}
              />
              <Field label="Urgency" value={urgencyLabels[quote.urgency]} />
              <Field label="Address" value={`${quote.address}, ${quote.city} ${quote.zip}`} />
            </dl>
            {quote.specialInstructions && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Special instructions</p>
                <p className="mt-1 text-sm whitespace-pre-wrap">{quote.specialInstructions}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <h2 className="text-base font-semibold">Actions</h2>
              {quote.order ? (
                <Button variant="outline" render={<Link href={`/admin/orders/${quote.order.id}`} />}>
                  View linked order
                </Button>
              ) : (
                <form action={convertQuoteToOrderAction.bind(null, quote.id)}>
                  <Button type="submit" className="w-full gap-1.5">
                    <RefreshCw className="size-4" />
                    Convert to order
                  </Button>
                </form>
              )}
              {canDelete && (
                <form action={deleteQuoteRequestAction.bind(null, quote.id)}>
                  <ConfirmSubmitButton
                    variant="destructive"
                    confirmMessage="Delete this quote request? This cannot be undone."
                    className="w-full"
                  >
                    Delete as spam
                  </ConfirmSubmitButton>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-2 text-sm">
              <h2 className="text-base font-semibold">Metadata</h2>
              <Field label="Received" value={formatDateTimeIN(quote.createdAt)} />
              <Field label="IP address" value={quote.ipAddress ?? "—"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
