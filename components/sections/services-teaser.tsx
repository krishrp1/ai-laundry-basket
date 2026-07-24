import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Droplets,
  Flame,
  Shirt,
  Sparkle,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    icon: Shirt,
    title: "Wash & Fold",
    description: "Everyday loads, sorted and folded to your preferences.",
  },
  {
    icon: Droplets,
    title: "Dry Cleaning",
    description: "Suits, silks, and delicates cleaned with the right method.",
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    description: "A driver comes to you, on a window that fits your day.",
  },
  {
    icon: Building2,
    title: "Commercial Laundry",
    description: "Recurring service for hotels, gyms, and rental properties.",
  },
  {
    icon: Flame,
    title: "Ironing & Pressing",
    description: "Crisp, wrinkle-free finishing for shirts and formalwear.",
  },
  {
    icon: Sparkle,
    title: "Stain Treatment",
    description: "Targeted pre-treatment guided by AI stain detection.",
  },
];

export function ServicesTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          What we offer
        </span>
        <h2 className="mt-3">A service for every kind of laundry</h2>
        <p className="mt-4 text-muted-foreground">
          One account, six services, all planned and scheduled by the same
          AI-driven system.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <service.icon className="size-5" />
              </span>
              <p className="font-medium">{service.title}</p>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 text-center">
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/services" />}
          className="gap-1.5"
        >
          View all services
          <ArrowRight className="size-4" />
        </Button>
      </Reveal>
    </section>
  );
}
