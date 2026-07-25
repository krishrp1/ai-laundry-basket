import type { LucideIcon } from "lucide-react";
import { Droplets, Shirt, Sparkles, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** The 4 core services offered, shown on Home and the Services page. */
export const coreServices: Service[] = [
  {
    icon: Droplets,
    title: "Wash & Fold",
    description: "Everyday laundry washed, dried, and neatly folded.",
  },
  {
    icon: Sparkles,
    title: "Dry Cleaning",
    description: "Expert care for suits, sarees, and delicate fabrics.",
  },
  {
    icon: Shirt,
    title: "Ironing",
    description: "Crisp, wrinkle-free clothes, ready to wear.",
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    description: "Free doorstep pickup and delivery, every order.",
  },
];

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
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <service.icon className="size-5" />
          </span>
          <p className="font-heading text-lg font-semibold">{service.title}</p>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </CardContent>
      </Card>
    </Reveal>
  );
}
