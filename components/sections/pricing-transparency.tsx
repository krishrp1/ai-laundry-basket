import {
  BadgePercent,
  Building2,
  Calculator,
  Gift,
  Repeat,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: Calculator,
    title: "How estimates work",
    description:
      "Our calculator uses your item count, weight, and add-ons to estimate cost the same way our team prices your order. The confirmed price is always shown before you check out.",
  },
  {
    icon: BadgePercent,
    title: "Bulk discounts",
    description:
      "Larger orders automatically qualify for lower per-pound and per-item rates. The more you send in one order, the less each item costs.",
  },
  {
    icon: Building2,
    title: "Commercial pricing",
    description:
      "Businesses get custom, volume-based pricing instead of flat per-order rates. See the business pricing section below for details by industry.",
  },
  {
    icon: Repeat,
    title: "Subscription savings",
    description:
      "Weekly, biweekly, and monthly plans save up to 15% compared to one-time orders, since recurring pickups are easier for us to route efficiently.",
  },
  {
    icon: Gift,
    title: "Referral discounts",
    description:
      "Refer a friend or business and you both receive a credit toward your next order once their first pickup is complete.",
  },
  {
    icon: Sparkles,
    title: "Seasonal promotions",
    description:
      "Keep an eye on your account and email for seasonal offers, such as move-in season and holiday-linen specials.",
  },
];

export function PricingTransparency() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Pricing transparency
          </span>
          <h2 className="mt-3">No surprises, ever</h2>
          <p className="mt-4 text-muted-foreground">
            Here is exactly how pricing, discounts, and promotions work
            behind the scenes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <item.icon className="size-5" />
                </span>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
