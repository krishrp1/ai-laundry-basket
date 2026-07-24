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
import { listCustomers } from "@/lib/data/customers";
import { parseListParams, type RawSearchParams } from "@/lib/data/list-params";

export const metadata: Metadata = { title: "Customers" };

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseListParams(await searchParams);
  const { items, meta } = await listCustomers(params);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {meta.total} customer{meta.total === 1 ? "" : "s"}
        </p>
      </div>

      <AdminFiltersBar statusOptions={[]} searchPlaceholder="Search name, email, phone..." />

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Quotes</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
            {items.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {customer.name}
                  </Link>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone ?? "—"}</TableCell>
                <TableCell>{customer._count.quoteRequests}</TableCell>
                <TableCell>{customer._count.orders}</TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.createdAt.toISOString().split("T")[0]}
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
            if (params.sort !== "desc") query.set("sort", params.sort);
            query.set("page", String(page));
            return `/admin/customers?${query.toString()}`;
          }}
        />
      </div>
    </div>
  );
}
