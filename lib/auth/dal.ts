import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/session";
import { db } from "@/lib/prisma";

/**
 * Optimistic + secure session check, memoized per request.
 * Redirects to /admin/login when there's no valid session.
 */
export const verifySession = cache(async () => {
  const session = await getSessionPayload();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
});

export type CurrentAdmin = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "SUPER_ADMIN";
};

/**
 * Secure check: re-reads the admin row from the database rather than trusting
 * the JWT payload alone, and returns only the fields the UI needs.
 */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin> => {
  const session = await verifySession();

  const admin = await db.adminUser.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
});

/**
 * Gate for destructive/irreversible actions (deletes). Regular ADMINs can
 * manage day-to-day quotes/orders/messages; only SUPER_ADMIN can delete
 * records outright.
 */
export async function requireSuperAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (admin.role !== "SUPER_ADMIN") {
    throw new Error("Only a super admin can perform this action.");
  }
  return admin;
}
