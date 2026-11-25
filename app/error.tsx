"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

// Next.js already logs the full error server-side (with a matching `digest`)
// whenever it crosses this boundary — logging `error` again here would only
// print to the visitor's own browser console, not anywhere we can see it.
export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <section className="container-page flex flex-1 flex-col justify-center py-24">
      <h1>Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page failed to load. Try again, and if it keeps happening, contact
        us.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => unstable_retry()}>
          Try again
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/contact" />}>
          Contact support
        </Button>
      </div>
    </section>
  );
}
