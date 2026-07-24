import {
  Bell,
  CalendarClock,
  Droplets,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: Sparkles,
    title: "Smart load sorting",
    description:
      "Snap a photo and AI Laundry Basket automatically sorts by color, fabric, and wash temperature, no more guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Fabric care intelligence",
    description:
      "Get tailored care instructions for every garment, from delicates to denim, so nothing shrinks, fades, or frays.",
  },
  {
    icon: CalendarClock,
    title: "Smart scheduling",
    description:
      "AI Laundry Basket finds the best time to wash based on your routine, machine availability, and off-peak energy rates.",
  },
  {
    icon: Droplets,
    title: "Stain and odor detection",
    description:
      "Computer vision flags stains before they set and recommends the right pre-treatment, automatically.",
  },
  {
    icon: Leaf,
    title: "Energy-aware planning",
    description:
      "Batch loads intelligently to save water, detergent, and electricity without sacrificing cleanliness.",
  },
  {
    icon: Bell,
    title: "Reminders that adapt",
    description:
      "Get nudged at the right moment, not too early or too late, based on how you actually do laundry.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">Features</span>
          <h2 className="mt-3">
            Everything laundry day needs, handled automatically
          </h2>
          <p className="mt-4 text-muted-foreground">
            AI Laundry Basket combines computer vision and smart scheduling so
            every load gets exactly the care it needs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardHeader className="gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                    <feature.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
