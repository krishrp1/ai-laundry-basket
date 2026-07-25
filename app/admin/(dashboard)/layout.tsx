import type { Metadata } from "next";
import { getCurrentAdmin } from "@/lib/auth/dal";
import { AdminSidebar, AdminMobileNav } from "@/components/admin/admin-sidebar";

// This whole segment reads cookies() and hits the database on every request;
// never attempt to statically prerender it at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  const adminName = admin.name ?? admin.email;

  return (
    <div className="flex min-h-screen flex-1 flex-col sm:flex-row">
      <AdminSidebar adminName={adminName} />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <AdminMobileNav adminName={adminName} />
        <div className="flex-1 p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
