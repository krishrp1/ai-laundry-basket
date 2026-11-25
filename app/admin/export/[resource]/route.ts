import type { NextRequest } from "next/server";

import { requireSuperAdmin } from "@/lib/auth/dal";
import { toCsv } from "@/lib/csv";
import { exporters } from "@/lib/data/export";
import { parseListParams } from "@/lib/data/list-params";
import { todayIST } from "@/lib/format";

/** CSV of every row matching the list page's filters. Bulk customer data, so super admins only. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  await requireSuperAdmin();

  const { resource } = await params;
  if (!Object.hasOwn(exporters, resource)) return new Response("Not found", { status: 404 });

  const filters = parseListParams(Object.fromEntries(request.nextUrl.searchParams));
  const { header, rows } = await exporters[resource]!(filters);

  return new Response(toCsv(header, rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${resource}-${todayIST()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
