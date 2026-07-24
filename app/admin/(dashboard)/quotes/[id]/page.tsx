import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Paperclip, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusSelectForm } from "@/components/admin/status-select-form";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { getQuoteRequestById } from "@/lib/data/quotes";
import { quoteStatusLabels } from "@/lib/order-status-labels";
import {
  updateQuoteStatusAction,
  deleteQuoteRequestAction,
  convertQuoteToOrderAction,
} from "@/lib/actions/admin/quotes";

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
  const quote = await getQuoteRequestById(id);
  if (!quote) notFound();

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
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-semibold">Request details</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Customer" value={quote.name} />
              <Field label="Email" value={quote.email} />
              <Field label="Phone" value={quote.phone} />
              <Field label="Preferred contact" value={quote.contactMethod} />
              <Field label="Customer type" value={quote.customerType} />
              <Field label="Service" value={quote.serviceType} />
              <Field label="Estimated weight" value={quote.estimatedWeight} />
              <Field label="Recurring" value={quote.recurring} />
              <Field
                label="Pickup"
                value={`${quote.pickupDate.toISOString().split("T")[0]} · ${quote.pickupTime}`}
              />
              <Field
                label="Delivery"
                value={quote.deliveryDate ? quote.deliveryDate.toISOString().split("T")[0] : "—"}
              />
              <Field label="Urgency" value={quote.urgency} />
              <Field label="Address" value={`${quote.address}, ${quote.city} ${quote.zip}`} />
            </dl>
            {quote.specialInstructions && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Special instructions</p>
                <p className="mt-1 text-sm whitespace-pre-wrap">{quote.specialInstructions}</p>
              </div>
            )}
            {quote.attachmentUrl && (
              <a
                href={quote.attachmentUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-fit items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <Paperclip className="size-4" />
                {quote.attachmentName ?? "View attachment"}
              </a>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <h2 className="font-semibold">Actions</h2>
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
              <form action={deleteQuoteRequestAction.bind(null, quote.id)}>
                <ConfirmSubmitButton
                  variant="destructive"
                  confirmMessage="Delete this quote request? This cannot be undone."
                  className="w-full"
                >
                  Delete as spam
                </ConfirmSubmitButton>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-2 text-sm">
              <h2 className="font-semibold">Metadata</h2>
              <Field label="Received" value={quote.createdAt.toISOString()} />
              <Field label="IP address" value={quote.ipAddress ?? "—"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}
