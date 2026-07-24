import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SearchX className="size-7" />
      </span>
      <Badge variant="secondary" className="mt-6">
        404
      </Badge>
      <h1 className="mt-5 text-3xl sm:text-4xl">
        This page took a wrong turn in the wash
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you are looking for does not exist, may have moved, or the
        link might be out of date.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/" />} className="gap-1.5">
          Back to home
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" render={<Link href="/contact" />}>
          Contact support
        </Button>
      </div>
    </section>
  );
}
