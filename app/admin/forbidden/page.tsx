import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Forbidden",
  robots: { index: false, follow: false },
};

export default function AdminForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-muted/30 px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </span>
      <Badge variant="secondary" className="mt-6">
        403
      </Badge>
      <h1 className="mt-5 text-3xl sm:text-4xl">
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
