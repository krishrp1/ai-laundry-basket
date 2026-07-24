import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black_10%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div className="size-[30rem] animate-blob-float rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" />
            About AI Laundry Basket
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Laundry, run by intelligence instead of guesswork
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            AI Laundry Basket pairs computer vision and smart scheduling with
            a real operations team, so every load, from a single hamper to a
            hotel&apos;s daily linens, gets sorted, cleaned, and delivered
            with the right care and on time.
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
          <Button
            size="lg"
            variant="outline"
            render={<Link href="#our-story" />}
          >
            Read our story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
