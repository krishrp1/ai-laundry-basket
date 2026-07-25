"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { verifySession } from "@/lib/auth/dal";
import { ContactStatus } from "@/generated/prisma/client";
import { isRecordNotFoundError } from "@/lib/prisma-errors";

function isContactStatus(value: string): value is ContactStatus {
  return (Object.values(ContactStatus) as string[]).includes(value);
}

export async function updateMessageStatusAction(id: string, formData: FormData) {
  await verifySession();

  const status = formData.get("status");
  if (typeof status !== "string" || !isContactStatus(status)) {
    throw new Error("Invalid status");
  }

  try {
    await db.contactMessage.update({ where: { id }, data: { status } });
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      revalidatePath("/admin/messages");
      redirect("/admin/messages");
    }
    throw error;
  }

  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: string) {
  await verifySession();

  await db.contactMessage.delete({ where: { id } }).catch(() => null);

  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}
