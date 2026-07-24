import "server-only";
import { db } from "@/lib/prisma";
import { QuoteStatus, Prisma } from "@/generated/prisma/client";
import { skipTake, buildPageMeta, type ListParams } from "@/lib/data/list-params";

function isQuoteStatus(value: string): value is QuoteStatus {
  return (Object.values(QuoteStatus) as string[]).includes(value);
}

export async function listQuoteRequests({ search, status, sort, page }: ListParams) {
  const where: Prisma.QuoteRequestWhereInput = {
    ...(status && isQuoteStatus(status) ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { requestId: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [total, items] = await Promise.all([
    db.quoteRequest.count({ where }),
    db.quoteRequest.findMany({
      where,
      orderBy: { createdAt: sort },
      ...skipTake(page),
    }),
  ]);

  return { items, meta: buildPageMeta(total, page) };
}

export async function getQuoteRequestById(id: string) {
  return db.quoteRequest.findUnique({
    where: { id },
    include: { customer: true, order: true },
  });
}
