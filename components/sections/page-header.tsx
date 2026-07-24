import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <div className="size-[24rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Badge variant="secondary">{eyebrow}</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{description}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
