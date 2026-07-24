import "server-only";

export const PAGE_SIZE = 20;

export type SortDirection = "asc" | "desc";

export type ListParams = {
  search: string;
  status: string | undefined;
  sort: SortDirection;
  page: number;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Parses and clamps admin table searchParams (search/status/sort/page) safely. */
export function parseListParams(searchParams: RawSearchParams): ListParams {
  const search = (firstValue(searchParams.search) ?? "").trim().slice(0, 200);
  const status = firstValue(searchParams.status)?.trim() || undefined;
  const sort = firstValue(searchParams.sort) === "asc" ? "asc" : "desc";
  const pageRaw = Number(firstValue(searchParams.page));
  const page = Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1;

  return { search, status, sort, page };
}

export function skipTake(page: number) {
  return { skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE };
}

export type PageMeta = {
  total: number;
  totalPages: number;
  currentPage: number;
};

export function buildPageMeta(total: number, page: number): PageMeta {
  return {
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    currentPage: page,
  };
}
