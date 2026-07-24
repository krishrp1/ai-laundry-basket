import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/session";
import { AdminLoginForm } from "@/components/admin/login-form";

// Reads the session cookie on every request; never prerender at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSessionPayload();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <AdminLoginForm />
    </div>
  );
}
