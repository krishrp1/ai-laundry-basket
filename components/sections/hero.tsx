"use client";

import Link from "next/link";
import { ArrowRight, Droplets, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const loads = [
  { label: "Darks - Cotton", meta: "40°C - Normal", icon: Sparkles },
  { label: "Delicates - Silk", meta: "Cold - Gentle", icon: Droplets },
  { label: "Towels - Cotton", meta: "60°C - Heavy", icon: Zap },
];

/** Simple hand-drawn-feel line illustration: a clothesline with a shirt and sock. */
function ClotheslineIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 12 Q110 34 216 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M60 20v8M150 24v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M42 28h36l-6 8v34a4 4 0 0 1-4 4H52a4 4 0 0 1-4-4V36l-6-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M138 32c8-6 20-6 24 4 2 5 0 10-4 12v18a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3V44c-4-2-5-8-2-12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div className="bg-amber/10 size-[36rem] rounded-full blur-3xl" />
      </div>
      <ClotheslineIllustration
        className="text-muted-foreground/25 pointer-events-none absolute top-6 right-4 -z-10 hidden w-56 sm:block lg:top-2 lg:right-10 lg:w-72"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-28 lg:pb-32">
        <div>
          {/* Rendered eagerly, not scroll/JS-gated: this is the LCP-critical
              above-the-fold content, so it must not start at opacity:0
              waiting on hydration + an IntersectionObserver. */}
          <Badge variant="outline" className="gap-1.5 border-none bg-accent text-primary">
            <Sparkles className="size-3" />
            Doorstep Laundry & Dry Cleaning in South Bengaluru
          </Badge>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Laundry & dry cleaning,{" "}
            <span className="text-amber">delivered</span> to your doorstep.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Request a pickup in minutes. We collect, clean, and deliver back to
            your door across South Bengaluru, with prices shown before you
            book.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/quote" />}
              className="gap-1.5"
            >
              Request a Quote
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#how-it-works" />}>
              See how it works
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Not sure what it costs?{" "}
            <Link
              href="/pricing#price-estimator"
              className="font-medium text-primary hover:underline"
            >
              Try our quick price calculator
            </Link>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="bg-amber/12 absolute -top-8 -right-8 -z-10 size-40 rounded-full blur-2xl"
          />
          <Card className="relative z-10 gap-5 rounded-[2rem] shadow-lg ring-1 ring-foreground/8">
            <div className="flex items-center justify-between px-(--card-spacing)">
              <div>
                <p className="text-sm text-muted-foreground">Sample order</p>
                <p className="font-heading text-lg font-semibold">
                  Three loads
                </p>
              </div>
              <Badge variant="outline" className="gap-1 border-none bg-accent text-primary">
                <Zap className="size-3" />
                Illustration only
              </Badge>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 px-(--card-spacing)">
              {loads.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <row.icon className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{row.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {row.meta}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between px-(--card-spacing) text-sm">
              <span className="text-muted-foreground">Pickup time</span>
              <span className="font-medium">You choose the window</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
