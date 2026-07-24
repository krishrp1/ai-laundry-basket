import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialsHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <div className="size-[28rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Badge variant="secondary">Customer Stories</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            Real laundry days, solved by real customers
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            From single households to busy hotels, here is what people say
            after putting AI Laundry Basket to work on their laundry day.
          </p>

          <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
            <div
              className="flex items-center gap-1 text-primary"
              role="img"
              aria-label="Rated 4.9 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <p className="font-heading text-2xl font-semibold">4.9 out of 5</p>
            <p className="text-sm text-muted-foreground">
              Average rating from AI Laundry Basket customers
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
