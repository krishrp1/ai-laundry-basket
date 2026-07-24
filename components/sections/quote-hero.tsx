import { Clock, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const trustPoints = [
  { icon: Clock, label: "Reply within one business day" },
  { icon: ShieldCheck, label: "No obligation to book" },
  { icon: Sparkles, label: "Custom pricing for your needs" },
];

export function QuoteHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <div className="size-[26rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Badge variant="secondary">Request a Quote</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            Get a custom laundry quote in minutes
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about your home or business laundry needs and we will
            put together pricing and a schedule that fits, no commitment
            required.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {trustPoints.map((point) => (
            <Badge key={point.label} variant="outline" className="gap-1.5">
              <point.icon className="size-3" />
              {point.label}
            </Badge>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
