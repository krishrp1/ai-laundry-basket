"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Leaf, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";

const loads = [
  { label: "Darks - Cotton", meta: "40C - Normal", icon: Sparkles },
  { label: "Delicates - Silk", meta: "Cold - Gentle", icon: Droplets },
  { label: "Towels - Cotton", meta: "60C - Heavy", icon: Zap },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div className="size-[32rem] animate-blob-float rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute size-[24rem] translate-x-32 translate-y-20 animate-blob-float-slow rounded-full bg-[var(--chart-2)]/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-28 lg:pb-32">
        <div>
          <Reveal>
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="size-3" />
              AI-Powered Laundry Care
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
              Laundry day,{" "}
              <span className="bg-gradient-to-r from-primary to-[var(--chart-2)] bg-clip-text text-transparent">
                solved by AI.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Snap a photo of your hamper and let AI Laundry Basket sort
              fabrics, pick the right settings, and schedule the perfect
              wash, every single time.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
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
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 sm:max-w-md">
              <div>
                <dt className="font-heading text-2xl font-semibold">4.9/5</dt>
                <dd className="text-sm text-muted-foreground">Customer rating</dd>
              </div>
              <div>
                <dt className="font-heading text-2xl font-semibold">10,000+</dt>
                <dd className="text-sm text-muted-foreground">Orders completed</dd>
              </div>
              <div>
                <dt className="font-heading text-2xl font-semibold">Same-Day</dt>
                <dd className="text-sm text-muted-foreground">Pickup available</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal
          delay={0.2}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
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
              <span className="text-muted-foreground">Best start time</span>
              <span className="font-medium">2:30 PM - off-peak</span>
            </div>
          </Card>

          <motion.div
            className="absolute -top-6 -left-6 z-20 hidden sm:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Card className="flex-row items-center gap-2 px-3 py-2 shadow-lg">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-xs font-medium">Fabric-safe wash</span>
            </Card>
          </motion.div>

          <motion.div
            className="absolute -right-4 -bottom-6 z-20 hidden sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Card className="flex-row items-center gap-2 px-3 py-2 shadow-lg">
              <Leaf className="size-4 text-primary" />
              <span className="text-xs font-medium">18% less energy</span>
            </Card>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
