import {
  Bell,
  CalendarClock,
  Gauge,
  Route,
  Scale,
  Smile,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const capabilities = [
  {
    icon: CalendarClock,
    title: "Scheduling",
    description:
      "Predicts the best pickup and wash windows based on your routine, past orders, and driver availability.",
  },
  {
    icon: Route,
    title: "Routing",
    description:
      "Plans driver routes in real time so pickups and deliveries stay on schedule even as new orders come in.",
  },
  {
    icon: Scale,
    title: "Workload Balancing",
    description:
      "Distributes orders evenly across facilities and specialists so no single location or person is overloaded.",
  },
  {
    icon: Truck,
    title: "Delivery Optimization",
    description:
      "Groups nearby deliveries and adjusts routes on the fly to reduce delays and unnecessary miles driven.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Times updates to when they are actually useful, like a delay alert before you have to wonder where your order is.",
  },
  {
    icon: Smile,
    title: "Customer Experience",
    description:
      "Learns preferences over time, from detergent choice to pickup windows, so the service adapts to you.",
  },
  {
    icon: Gauge,
    title: "Operational Efficiency",
    description:
      "Reduces wasted trips, partial loads, and manual scheduling work, which keeps pricing predictable for customers.",
  },
];

export function AiTechnology() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">AI Technology</Badge>
          <h2 className="mt-4">The engine behind every order</h2>
          <p className="mt-4 text-muted-foreground">
            One system coordinates scheduling, routing, and quality across
            every order, so the platform gets smarter and more efficient the
            more it runs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <capability.icon className="size-5" />
                </span>
                <p className="font-medium">{capability.title}</p>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
