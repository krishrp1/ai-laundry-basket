import { Receipt, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const trustPoints = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: Sparkles, label: "AI-optimized scheduling" },
  { icon: Receipt, label: "Clear pricing before you book" },
];

export function PricingHero() {
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
          <Badge variant="secondary">Pricing</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            Transparent pricing, powered by AI
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            See exactly what you will pay before you book. AI Laundry Basket
            uses smart sorting and routing to keep costs predictable, whether
            you need a single order or a plan for your whole household.
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
