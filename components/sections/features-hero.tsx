import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FeaturesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div className="size-[30rem] animate-blob-float rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute size-[22rem] translate-x-40 translate-y-16 animate-blob-float-slow rounded-full bg-[var(--chart-2)]/35 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" />
            Platform Features
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Every feature behind an effortless laundry day
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            AI Laundry Basket combines computer vision, smart scheduling, and
            a real operations team into one platform, from the moment you
            book a pickup to the moment fresh laundry lands back on your
            doorstep.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" render={<Link href="/quote" />} className="gap-1.5">
            Request a Quote
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="#all-features" />}>
            Explore every feature
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
