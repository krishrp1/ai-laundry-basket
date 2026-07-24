import { BadgeCheck, Clock, Eye, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Pickups and deliveries run on a schedule you can count on, with real-time updates if anything changes.",
  },
  {
    icon: BadgeCheck,
    title: "Quality",
    description:
      "Every item is treated according to its actual care needs, not a one-size-fits-all cycle.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear pricing before you book, order status you can check anytime, and no surprise charges.",
  },
  {
    icon: Clock,
    title: "Convenience",
    description:
      "Book in minutes, choose a window that fits your day, and let the rest happen without follow-up.",
  },
];

export function WhyTrustUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Why customers trust us
        </span>
        <h2 className="mt-3">Built to be dependable, not just convenient</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.06}>
            <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
              <CardHeader className="gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <pillar.icon className="size-5" />
                </span>
                <CardTitle className="text-base">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{pillar.description}</CardDescription>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
