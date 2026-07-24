import "server-only";
import { db } from "@/lib/prisma";
import { ContactStatus, Prisma } from "@/generated/prisma/client";
import { skipTake, buildPageMeta, type ListParams } from "@/lib/data/list-params";

function isContactStatus(value: string): value is ContactStatus {
  return (Object.values(ContactStatus) as string[]).includes(value);
}

export async function listContactMessages({ search, status, sort, page }: ListParams) {
  const where: Prisma.ContactMessageWhereInput = {
    ...(status && isContactStatus(status) ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { message: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [total, items] = await Promise.all([
    db.contactMessage.count({ where }),
    db.contactMessage.findMany({
      where,
      orderBy: { createdAt: sort },
      ...skipTake(page),
    }),
  ]);

  return { items, meta: buildPageMeta(total, page) };
}

export async function getContactMessageById(id: string) {
  return db.contactMessage.findUnique({ where: { id } });
}
