import {
  BrainCircuit,
  CheckCircle2,
  PackageCheck,
  Smartphone,
  Truck,
  WashingMachine,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: Smartphone,
    title: "Book in minutes",
    description:
      "Request a quote or schedule a pickup with your service type, location, and preferred time.",
  },
  {
    icon: BrainCircuit,
    title: "AI sorts and plans",
    description:
      "Computer vision identifies fabric type and care needs, then builds a wash plan and route.",
  },
  {
    icon: Truck,
    title: "Pickup arrives",
    description:
      "A driver collects your order during the selected window and logs it into your account.",
  },
  {
    icon: WashingMachine,
    title: "Cleaned with care",
    description:
      "Specialists clean each load according to its plan, with high-risk items reviewed by hand.",
  },
  {
    icon: CheckCircle2,
    title: "Quality checked",
    description:
      "Every order is inspected before it leaves the facility to catch anything that needs a second pass.",
  },
  {
    icon: PackageCheck,
    title: "Delivered fresh",
    description:
      "Your order is folded, packed, and delivered back on schedule, with a notification along the way.",
  },
];

export function AiWorkflow() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          How it works
        </span>
        <h2 className="mt-3">
          The AI-powered workflow, from booking to delivery
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every order moves through the same six-step process, whether it is
          a single hamper or a hotel&apos;s daily linens.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <step.icon className="size-4.5" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
