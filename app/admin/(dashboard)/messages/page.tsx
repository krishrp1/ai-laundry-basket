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
import { listContactMessages } from "@/lib/data/messages";
import { parseListParams, type RawSearchParams } from "@/lib/data/list-params";
import { contactStatusLabels } from "@/lib/order-status-labels";
import { updateMessageStatusAction, deleteMessageAction } from "@/lib/actions/admin/messages";
import { formatDateIN } from "@/lib/format";

export const metadata: Metadata = { title: "Contact Messages" };

const statusOptions = Object.entries(contactStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseListParams(await searchParams);
  const { items, meta } = await listContactMessages(params);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Contact Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meta.total} message{meta.total === 1 ? "" : "s"}
        </p>
      </div>

      <AdminFiltersBar statusOptions={statusOptions} searchPlaceholder="Search name, email, message..." />

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No messages found.
                </TableCell>
              </TableRow>
            )}
            {items.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{message.name}</span>
                    <span className="text-xs text-muted-foreground">{message.email}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={message.message}>
                  {message.message}
                </TableCell>
                <TableCell>
                  <StatusSelectForm
                    action={updateMessageStatusAction.bind(null, message.id)}
                    currentStatus={message.status}
                    options={statusOptions}
                    label={`Status for ${message.requestId}`}
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateIN(message.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <form action={deleteMessageAction.bind(null, message.id)} className="inline">
                    <ConfirmSubmitButton
                      variant="ghost"
                      size="sm"
                      confirmMessage="Delete this message? This cannot be undone."
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
            return `/admin/messages?${query.toString()}`;
          }}
        />
      </div>
    </div>
  );
}
