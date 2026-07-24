import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const values = [
  {
    icon: Heart,
    title: "Care first",
    description:
      "Every recommendation starts with what is best for your clothes, not just what is fastest.",
  },
  {
    icon: Sparkles,
    title: "Radical simplicity",
    description:
      "Laundry should take less thought, not more apps to manage. We remove steps, not add them.",
  },
  {
    icon: Leaf,
    title: "Sustainable by design",
    description:
      "Smarter scheduling and batching mean less water, less energy, and less waste with every load.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy, always",
    description:
      "Your photos and habits stay yours. AI Laundry Basket is built to help you, not to sell your data.",
  },
];

export function Values() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            What drives us
          </span>
          <h2 className="mt-3">The values behind every recommendation</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardHeader className="gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                    <value.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
