"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/dal";
import { ContactStatus } from "@/generated/prisma/client";

function isContactStatus(value: string): value is ContactStatus {
  return (Object.values(ContactStatus) as string[]).includes(value);
}

export async function updateMessageStatusAction(id: string, formData: FormData) {
  await verifySession();

  const status = formData.get("status");
  if (typeof status !== "string" || !isContactStatus(status)) {
    throw new Error("Invalid status");
  }

  await db.contactMessage.update({ where: { id }, data: { status } });

  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  await verifySession();

  await db.contactMessage.delete({ where: { id } }).catch(() => null);

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}
