import { Droplets, Leaf, Recycle, Route } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const practices = [
  {
    icon: Leaf,
    title: "Eco-friendly detergents",
    description:
      "Fragrance-free and hypoallergenic detergent options are available on every order at no extra cost.",
  },
  {
    icon: Droplets,
    title: "Water-conscious washing",
    description:
      "Loads are batched by fabric type and soil level to avoid running partial or unnecessary cycles.",
  },
  {
    icon: Route,
    title: "Optimized delivery routes",
    description:
      "Pickup and delivery routes are planned to reduce miles driven per order across each service area.",
  },
  {
    icon: Recycle,
    title: "Reusable packaging",
    description:
      "Orders are delivered in reusable garment bags where possible, instead of single-use plastic.",
  },
];

export function Sustainability() {
  return (
    <section
      id="sustainability"
      className="border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold text-primary">
              Sustainability
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl">
              Cleaner clothes, lighter footprint
            </h2>
            <p className="mt-4 text-muted-foreground">
              Smarter scheduling was always meant to save more than time.
              Batching loads by fabric type and planning routes efficiently
              also means less water, less energy, and fewer miles driven per
              order.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {practices.map((practice, i) => (
              <Reveal key={practice.title} delay={i * 0.06}>
                <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                    <practice.icon className="size-5" />
                  </span>
                  <p className="font-medium">{practice.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {practice.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
