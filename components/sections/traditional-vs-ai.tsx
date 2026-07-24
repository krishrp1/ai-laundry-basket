import { Check, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const rows = [
  {
    traditional: "Guessing wash settings for every load",
    modern: "AI-matched care for every garment",
  },
  {
    traditional: "Manual scheduling around machine availability",
    modern: "Automatic, AI-optimized scheduling",
  },
  {
    traditional: "No visibility once you drop off an order",
    modern: "Live order tracking with real-time updates",
  },
  {
    traditional: "Paper receipts that are easy to lose",
    modern: "Digital receipts saved to your account",
  },
  {
    traditional: "One-size-fits-all turnaround time",
    modern: "Same-day express available when you need it",
  },
  {
    traditional: "Calling to check on an order",
    modern: "Real-time notifications at every step",
  },
  {
    traditional: "Little accountability for damaged items",
    modern: "Quality inspection and a satisfaction guarantee",
  },
  {
    traditional: "Fixed hours and limited flexibility",
    modern: "Book anytime, from your phone",
  },
];

export function TraditionalVsAi() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          The difference
        </span>
        <h2 className="mt-3">Traditional laundry vs AI Laundry Basket</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full transition-shadow duration-200 hover:shadow-md">
            <CardContent className="flex h-full flex-col gap-4">
              <p className="font-medium text-muted-foreground">
                Traditional Laundry
              </p>
              <ul className="flex flex-col gap-3">
                {rows.map((row) => (
                  <li
                    key={row.traditional}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    <span>{row.traditional}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full ring-2 ring-primary transition-shadow duration-200 hover:shadow-lg">
            <CardContent className="flex h-full flex-col gap-4">
              <p className="font-medium text-primary">AI Laundry Basket</p>
              <ul className="flex flex-col gap-3">
                {rows.map((row) => (
                  <li
                    key={row.modern}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{row.modern}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
