import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Droplets, Gem, Scale, Shirt, WashingMachine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { services, dryCleanableGarments, FREE_DELIVERY_THRESHOLD, type ServiceKey } from "@/config/pricing";

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  wash_fold: Droplets,
  wash_iron: WashingMachine,
  steam_iron: Shirt,
  dry_cleaning: Gem,
};

const dryCleaningStartingPrice = Math.min(
  ...dryCleanableGarments.map((garment) => garment.perPieceRate?.default ?? Infinity)
);

function priceDisplay(serviceKey: ServiceKey) {
  const service = services.find((s) => s.key === serviceKey)!;
  if (service.model === "per_kg" && service.perKgRate) {
    return {
      price: formatINR(service.perKgRate.default),
      unit: "per kg",
      note: "Weighed at pickup — you pay for actual weight.",
    };
  }
  if (serviceKey === "steam_iron" && service.flatPerPieceRate) {
    return { price: formatINR(service.flatPerPieceRate.default), unit: "starting, per garment", note: undefined };
  }
  return { price: formatINR(dryCleaningStartingPrice), unit: "starting price", note: undefined };
}

export function PricingPlans() {
  return (
    <section id="plans" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">Pricing</span>
        <h2 className="mt-3">Pay only for what you need</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const { price, unit, note } = priceDisplay(service.key);
          const popular = service.key === "wash_fold";
          const Icon = serviceIcons[service.key];

          return (
            <Reveal key={service.key} delay={i * 0.06}>
              <Card
                className={cn(
                  // overflow-visible: the base Card clips its contents, which cut
                  // off the floating "Most Popular" badge above the card edge.
                  "relative h-full overflow-visible transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                  popular ? "shadow-lg ring-2 ring-primary" : "hover:ring-primary/30"
                )}
              >
                {popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <CardContent className="flex h-full flex-col gap-4">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>

                  <div>
                    <p className="font-heading text-lg font-semibold">{service.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-3xl font-semibold">{price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{unit}</p>
                    {note && (
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <Scale className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {note}
                      </p>
                    )}
                  </div>

                  <Button render={<Link href="/quote" />} className="w-full">
                    Get Instant Quote
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.3} className="mt-8 text-center text-sm text-muted-foreground">
        Free delivery on orders above {formatINR(FREE_DELIVERY_THRESHOLD)}. Need pricing
        for a business, hotel, or bulk order?{" "}
        <Link href="/contact" className="font-medium text-primary hover:underline">
          Contact us
        </Link>
        .
      </Reveal>
    </section>
  );
}
