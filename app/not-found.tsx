import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex flex-1 flex-col justify-center py-24">
      <p className="font-heading text-xl font-semibold text-primary">404</p>
      <h1 className="mt-2">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This page does not exist, may have moved, or the link might be out of
        date.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/" />}>
          Back to home
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/contact" />}>
          Contact support
        </Button>
      </div>
    </section>
  );
}
