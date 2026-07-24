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
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { listQuoteRequests } from "@/lib/data/quotes";
import { parseListParams, type RawSearchParams } from "@/lib/data/list-params";
import { quoteStatusLabels } from "@/lib/order-status-labels";
import { updateQuoteStatusAction, deleteQuoteRequestAction } from "@/lib/actions/admin/quotes";

export const metadata: Metadata = { title: "Quote Requests" };

const statusOptions = Object.entries(quoteStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseListParams(await searchParams);
  const { items, meta } = await listQuoteRequests(params);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Quote Requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meta.total} request{meta.total === 1 ? "" : "s"}
        </p>
      </div>

      <AdminFiltersBar statusOptions={statusOptions} searchPlaceholder="Search name, email, phone, ID..." />

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No quote requests found.
                </TableCell>
              </TableRow>
            )}
            {items.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>
                  <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-primary hover:underline">
                    {quote.requestId}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{quote.name}</span>
                    <span className="text-xs text-muted-foreground">{quote.email}</span>
                  </div>
                </TableCell>
                <TableCell>{quote.serviceType}</TableCell>
                <TableCell>
                  {quote.pickupDate.toISOString().split("T")[0]} &middot; {quote.pickupTime}
                </TableCell>
                <TableCell>
                  <StatusSelectForm
                    action={updateQuoteStatusAction.bind(null, quote.id)}
                    currentStatus={quote.status}
                    options={statusOptions}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {quote.createdAt.toISOString().split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <form action={deleteQuoteRequestAction.bind(null, quote.id)} className="inline">
                    <ConfirmSubmitButton
                      variant="ghost"
                      size="sm"
                      confirmMessage="Delete this quote request? This cannot be undone."
                      className="text-destructive"
                    >
                      Delete
                    </ConfirmSubmitButton>
                  </form>
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
            return `/admin/quotes?${query.toString()}`;
          }}
        />
      </div>
    </div>
  );
}
