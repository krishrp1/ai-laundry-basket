import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ListParams } from "@/lib/data/list-params";

/** Downloads every row matching the current search, status and sort (not only the visible page). */
export function ExportLink({ resource, params }: { resource: "orders" | "quotes" | "customers"; params: ListParams }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.sort !== "desc") query.set("sort", params.sort);
  const suffix = query.size ? `?${query}` : "";

  return (
    <Button variant="outline" size="sm" nativeButton={false}
            render={<a href={`/admin/export/${resource}${suffix}`} download />}>
      <Download className="size-4" aria-hidden="true" />
      Download CSV
    </Button>
  );
}
