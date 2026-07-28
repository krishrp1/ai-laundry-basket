import type { LucideIcon } from "lucide-react";
import { Droplets, Shirt, Sparkles, Wind } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { formatINR } from "@/lib/format";
import { serviceByKey, type ServiceKey } from "@/config/pricing";

export type Service = {
  icon: LucideIcon;
  title: string;
  /** Live price label, e.g. "₹72/kg" — omitted for services priced per garment. */
  price?: string;
  description: string;
};

const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  wash_fold: Droplets,
  wash_iron: Shirt,
  steam_iron: Wind,
  dry_cleaning: Sparkles,
};

/** Price label derived live from config/pricing.ts — never hardcoded. */
function priceLabel(key: ServiceKey): string | undefined {
  const service = serviceByKey[key];
  if (service.model === "per_kg" && service.perKgRate) {
    return `${formatINR(service.perKgRate.default)}/kg`;
  }
  if (service.model === "per_piece" && service.flatPerPieceRate) {
    return `${formatINR(service.flatPerPieceRate.default)}/piece`;
  }
  return undefined;
}

/** The 4 core services offered, shown on Home and the Services page — pricing pulled live from config/pricing.ts. */
export const coreServices: Service[] = (
  ["wash_fold", "wash_iron", "steam_iron", "dry_cleaning"] as ServiceKey[]
).map((key) => {
  const service = serviceByKey[key];
  return {
    icon: SERVICE_ICONS[key],
    title: service.label,
    price: priceLabel(key),
    description: service.description,
  };
});

export function ServiceCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
        <CardContent className="flex h-full flex-col items-start gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <service.icon className="size-5" />
          </span>
          <p className="font-heading text-lg font-semibold">{service.title}</p>
          <p className="text-amber text-sm font-semibold">
            {service.price ?? "Priced per garment"}
          </p>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </CardContent>
      </Card>
    </Reveal>
  );
}
