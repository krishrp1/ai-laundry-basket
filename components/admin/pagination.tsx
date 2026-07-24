import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageMeta } from "@/lib/data/list-params";

export function AdminPagination({
  meta,
  buildHref,
}: {
  meta: PageMeta;
  buildHref: (page: number) => string;
}) {
  if (meta.totalPages <= 1) return null;

  const prevDisabled = meta.currentPage <= 1;
  const nextDisabled = meta.currentPage >= meta.totalPages;

  return (
    <div className="flex items-center justify-between border-t border-border px-2 py-3">
      <p className="text-sm text-muted-foreground">
        Page {meta.currentPage} of {meta.totalPages} &middot; {meta.total} total
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={prevDisabled}
          render={
            prevDisabled ? undefined : (
              <Link href={buildHref(meta.currentPage - 1)} />
            )
          }
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={nextDisabled}
          render={
            nextDisabled ? undefined : (
              <Link href={buildHref(meta.currentPage + 1)} />
            )
          }
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
