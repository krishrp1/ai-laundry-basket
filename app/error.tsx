"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <TriangleAlert className="size-7" />
      </span>
      <Badge variant="secondary" className="mt-6">
        Something went wrong
      </Badge>
      <h1 className="mt-5 text-3xl sm:text-4xl">
        A wire got crossed on our end
      </h1>
      <p className="mt-4 text-muted-foreground">
        This was not supposed to happen. Trying again usually clears it up,
        and if it keeps happening, our support team can help.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => unstable_retry()} className="gap-1.5">
          Try again
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" render={<Link href="/contact" />}>
          Contact support
        </Button>
      </div>
    </section>
  );
}
