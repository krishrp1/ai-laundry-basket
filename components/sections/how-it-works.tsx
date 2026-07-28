import { CalendarCheck, PackageCheck, Sparkles, Truck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: CalendarCheck,
    step: "Step 01",
    title: "Book Pickup",
    description: "Choose a time that works for you, in under a minute.",
  },
  {
    icon: PackageCheck,
    step: "Step 02",
    title: "We Collect",
    description: "Our team picks up your laundry from your doorstep.",
  },
  {
    icon: Sparkles,
    step: "Step 03",
    title: "Professional Cleaning",
    description: "Every item gets the fabric-safe care it needs.",
  },
  {
    icon: Truck,
    step: "Step 04",
    title: "Delivered to Your Door",
    description: "Fresh, folded laundry back at your home, on time.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          How it works
        </span>
        <h2 className="mt-3">Four steps to effortless laundry</h2>
      </Reveal>

      <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-6 hidden h-px bg-border lg:block"
        />
        {steps.map((step, i) => (
          <Reveal
            key={step.title}
            delay={i * 0.08}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md">
              <step.icon className="size-6" />
            </div>
            <span className="mt-4 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {step.step}
            </span>
            <h3 className="mt-1 text-lg">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
