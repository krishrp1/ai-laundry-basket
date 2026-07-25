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
 *
 * Redirects to a dedicated 403 page rather than throwing — an uncaught throw
 * here would fall through to the generic error.tsx boundary (a "something
 * went wrong" page), which is the wrong message for "you're not allowed to
 * do this" and doesn't tell the admin what actually happened.
 */
export async function requireSuperAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (admin.role !== "SUPER_ADMIN") {
    redirect("/admin/forbidden");
  }
  return admin;
}
