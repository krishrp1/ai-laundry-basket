import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Gem,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const trustBadges = [
  { icon: ClipboardCheck, label: "Two-point inspection" },
  { icon: Gem, label: "Fabric-matched care" },
  { icon: ShieldCheck, label: "Trained specialists" },
  { icon: Leaf, label: "Eco-friendly detergents" },
  { icon: HeartHandshake, label: "Satisfaction guarantee" },
];

export function TrustSustainability() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-sm font-semibold text-primary">
            Trust & sustainability
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl">
            Backed by real standards, not just marketing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every feature on this page is built on the same internal quality
            standards and eco-friendly practices our operations team follows
            on every single order.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {trustBadges.map((badge) => (
            <Badge key={badge.label} variant="outline" className="gap-1.5">
              <badge.icon className="size-3" />
              {badge.label}
            </Badge>
          ))}
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <Link
            href="/about#quality-standards"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            See our full quality and sustainability practices
            <ArrowRight className="size-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
