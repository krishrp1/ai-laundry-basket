"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const loads = [
  { label: "Darks - Cotton", meta: "40°C - Normal", icon: Sparkles },
  { label: "Delicates - Silk", meta: "Cold - Gentle", icon: Droplets },
  { label: "Towels - Cotton", meta: "60°C - Heavy", icon: Zap },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div className="size-[32rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute size-[24rem] translate-x-32 translate-y-20 rounded-full bg-[var(--chart-2)]/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-28 lg:pb-32">
        <div>
          {/* Rendered eagerly, not scroll/JS-gated: this is the LCP-critical
              above-the-fold content, so it must not start at opacity:0
              waiting on hydration + an IntersectionObserver. */}
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" />
            Doorstep Laundry & Dry Cleaning in South Bengaluru
          </Badge>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Laundry day,{" "}
            <span className="bg-gradient-to-r from-primary to-[var(--chart-2)] bg-clip-text text-transparent">
              solved by A&I.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Book a pickup in minutes. We collect, clean, and deliver back to
            your door, anywhere across South Bengaluru.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href="/quote" />}
              className="gap-1.5"
            >
              Get Instant Quote
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
          <Card className="relative z-10 shadow-xl ring-1 ring-foreground/10">
            <div className="flex items-center justify-between px-(--card-spacing)">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s plan</p>
                <p className="font-heading text-lg font-semibold">
                  3 loads scheduled
                </p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Zap className="size-3" />
                Optimized
              </Badge>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 px-(--card-spacing)">
              {loads.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-background text-primary">
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
              <span className="text-muted-foreground">Best pickup slot</span>
              <span className="font-medium">2:30 PM today</span>
            </div>
          </Card>

          <m.div
            className="absolute -top-6 -left-6 z-20 hidden sm:block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="flex-row items-center gap-2 px-3 py-2 shadow-lg">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-xs font-medium">Fabric-safe wash</span>
            </Card>
          </m.div>

          <m.div
            className="absolute -right-4 -bottom-6 z-20 hidden sm:block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="flex-row items-center gap-2 px-3 py-2 shadow-lg">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-medium">Same-day pickup</span>
            </Card>
          </m.div>
        </div>
      </div>
    </section>
  );
}
