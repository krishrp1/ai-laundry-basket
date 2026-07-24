import { ClipboardCheck, Gauge, Gem, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const standards = [
  {
    icon: ClipboardCheck,
    title: "Two-point inspection",
    description:
      "Every order is checked before cleaning to confirm care needs, and again before packing to catch anything that needs a second pass.",
  },
  {
    icon: Gem,
    title: "Fabric-matched care",
    description:
      "Cleaning method, temperature, and detergent are matched to each garment, not applied as one standard cycle.",
  },
  {
    icon: ShieldCheck,
    title: "Trained specialists",
    description:
      "Staff handling delicates, dry cleaning, and stain treatment are trained specifically on those processes.",
  },
  {
    icon: Gauge,
    title: "Consistent standards",
    description:
      "The same quality checklist applies whether an order comes from a single household or a commercial account.",
  },
];

export function QualityStandards() {
  return (
    <section
      id="quality-standards"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Quality standards
        </span>
        <h2 className="mt-3">The commitments behind every order</h2>
        <p className="mt-4 text-muted-foreground">
          These are the internal standards our operations team follows on
          every single order, not just the ones customers ask about.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {standards.map((standard, i) => (
          <Reveal key={standard.title} delay={i * 0.06}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <standard.icon className="size-5" />
              </span>
              <p className="font-medium">{standard.title}</p>
              <p className="text-sm text-muted-foreground">
                {standard.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
