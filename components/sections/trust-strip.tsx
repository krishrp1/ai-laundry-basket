import { FileCheck2, ShieldCheck, Smartphone, Zap } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const badges = [
  { icon: Zap, label: "Same-day pickup available" },
  { icon: ShieldCheck, label: "Secure handling" },
  { icon: FileCheck2, label: "Satisfaction guarantee" },
  { icon: Smartphone, label: "UPI payments accepted" },
  { icon: FileCheck2, label: "GST invoice available" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <badge.icon className="size-4 text-primary" />
              {badge.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
