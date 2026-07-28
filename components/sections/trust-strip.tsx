import { MapPin, ReceiptText, ShieldCheck, Truck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const badges = [
  { icon: Truck, label: "Doorstep Pickup & Delivery" },
  { icon: ReceiptText, label: "Transparent Pricing" },
  { icon: ShieldCheck, label: "Expert Garment Care" },
  { icon: MapPin, label: "Serving South Bengaluru" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-2.5 text-sm font-medium text-foreground"
            >
              <badge.icon className="text-primary size-5" />
              {badge.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
