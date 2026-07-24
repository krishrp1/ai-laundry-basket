"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Check, Crown, Sparkles, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";

type BillingMode = "one-time" | "subscription";

type Plan = {
  key: string;
  name: string;
  icon: LucideIcon;
  description: string;
  popular?: boolean;
  oneTimePrice: string;
  oneTimeUnit: string;
  subscriptionPrice: string;
  subscriptionUnit: string;
  subscriptionNote?: string;
  custom?: boolean;
  includedServices: string[];
  pickupDelivery: string;
  turnaround: string;
  aiScheduling: string;
  support: string;
  ctaLabel: string;
};

const plans: Plan[] = [
  {
    key: "essential",
    name: "Essential",
    icon: Sparkles,
    description: "Light laundry needs for individuals who want the basics handled well.",
    oneTimePrice: "$19",
    oneTimeUnit: "per order",
    subscriptionPrice: "$49",
    subscriptionUnit: "per month",
    subscriptionNote: "1 pickup / month, up to 20 lbs",
    includedServices: ["Wash & Fold", "Fabric-safe sorting", "Basic stain flagging"],
    pickupDelivery: "Weekly pickup windows",
    turnaround: "48 hours",
    aiScheduling: "Basic auto-suggested windows",
    support: "Email support",
    ctaLabel: "Get Started",
  },
  {
    key: "premium",
    name: "Premium",
    icon: Crown,
    popular: true,
    description: "The full experience for busy individuals and couples.",
    oneTimePrice: "$34",
    oneTimeUnit: "per order",
    subscriptionPrice: "$89",
    subscriptionUnit: "per month",
    subscriptionNote: "Weekly pickup, up to 30 lbs, 2 dry clean items included",
    includedServices: [
      "Wash & Fold",
      "Dry Cleaning (2 items/mo included)",
      "Stain treatment",
      "Discounted ironing add-on",
    ],
    pickupDelivery: "Priority scheduling windows",
    turnaround: "24-48 hours, same-day available",
    aiScheduling: "Smart, auto-optimized scheduling",
    support: "Priority email & phone",
    ctaLabel: "Get Started",
  },
  {
    key: "family",
    name: "Family",
    icon: Users,
    description: "Higher volume plan for households with more laundry to manage.",
    oneTimePrice: "$54",
    oneTimeUnit: "per order",
    subscriptionPrice: "$149",
    subscriptionUnit: "per month",
    subscriptionNote: "2x weekly pickup, up to 60 lbs, ironing included",
    includedServices: [
      "Wash & Fold",
      "Dry Cleaning",
      "Ironing & Pressing included",
      "Multiple saved addresses",
    ],
    pickupDelivery: "Flexible multi-window scheduling",
    turnaround: "24 hours, same-day available",
    aiScheduling: "Smart scheduling with household preference learning",
    support: "Priority phone & chat",
    ctaLabel: "Get Started",
  },
  {
    key: "business",
    name: "Business",
    icon: Briefcase,
    description: "Commercial accounts for hotels, gyms, offices, and rental properties.",
    oneTimePrice: "Custom",
    oneTimeUnit: "volume-based",
    subscriptionPrice: "From $399",
    subscriptionUnit: "per month",
    subscriptionNote: "Custom volume, dedicated route",
    custom: true,
    includedServices: [
      "Commercial Laundry (linens, towels, uniforms)",
      "Dedicated account management",
      "Consolidated invoicing",
    ],
    pickupDelivery: "Daily or custom schedule",
    turnaround: "Custom SLA, same-day available",
    aiScheduling: "Enterprise route optimization",
    support: "Dedicated account manager, 24/7 priority line",
    ctaLabel: "Request a Quote",
  },
];

export function PricingPlans() {
  const [billing, setBilling] = React.useState<BillingMode>("subscription");

  return (
    <section id="plans" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">Plans</span>
        <h2 className="mt-3">Choose how you want to pay</h2>
        <p className="mt-4 text-muted-foreground">
          Pay per order when you need it, or subscribe and save on recurring
          pickups.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-8 flex justify-center">
        <div className="relative inline-flex items-center rounded-full border border-border bg-muted p-1">
          {(
            [
              { value: "one-time" as const, label: "One-Time Service" },
              { value: "subscription" as const, label: "Subscription Plans" },
            ]
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setBilling(option.value)}
              className={cn(
                "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5",
                billing === option.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {billing === option.value && (
                <motion.span
                  layoutId="pricing-toggle-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {plans.map((plan, i) => (
          <Reveal key={plan.key} delay={i * 0.06}>
            <Card
              className={cn(
                "relative h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                plan.popular
                  ? "shadow-lg ring-2 ring-primary"
                  : "hover:ring-primary/30"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Crown className="size-3" />
                  Most Popular
                </Badge>
              )}

              <CardContent className="flex h-full flex-col gap-4">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <plan.icon className="size-5" />
                </span>

                <div>
                  <p className="font-heading text-lg font-semibold">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading text-3xl font-semibold">
                      {plan.custom
                        ? plan.subscriptionPrice
                        : billing === "one-time"
                          ? plan.oneTimePrice
                          : plan.subscriptionPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.custom
                        ? plan.subscriptionUnit
                        : billing === "one-time"
                          ? plan.oneTimeUnit
                          : plan.subscriptionUnit}
                    </span>
                  </div>
                  {billing === "subscription" && plan.subscriptionNote && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {plan.subscriptionNote}
                    </p>
                  )}
                </div>

                <Separator />

                <ul className="flex flex-col gap-2.5">
                  {plan.includedServices.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <Separator />

                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Pickup & delivery</dt>
                    <dd className="text-right font-medium">
                      {plan.pickupDelivery}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Turnaround</dt>
                    <dd className="text-right font-medium">
                      {plan.turnaround}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">AI scheduling</dt>
                    <dd className="text-right font-medium">
                      {plan.aiScheduling}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Support</dt>
                    <dd className="text-right font-medium">{plan.support}</dd>
                  </div>
                </dl>

                <Button
                  render={<Link href="/quote" />}
                  variant={plan.popular ? "default" : "outline"}
                  className="mt-auto w-full"
                >
                  {plan.ctaLabel}
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
