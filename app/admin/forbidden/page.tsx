import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Forbidden",
  robots: { index: false, follow: false },
};

export default function AdminForbiddenPage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-heading text-xl font-semibold text-primary">403</p>
      <h1 className="mt-2">
        You do not have access to that
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This action is restricted to super admins. If you need it done, ask a
        super admin on your team, or contact them if you believe this is a
        mistake.
      </p>
      <Button render={<Link href="/admin" />} className="mt-8">
        Back to dashboard
      </Button>
    </div>
  );
}
