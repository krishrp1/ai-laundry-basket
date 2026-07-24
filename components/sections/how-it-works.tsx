import { CheckCircle2, Smartphone, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: Smartphone,
    step: "Step 01",
    title: "Add your laundry",
    description:
      "Snap a photo or add items manually. AI Laundry Basket identifies fabric type, color, and care needs instantly.",
  },
  {
    icon: Sparkles,
    step: "Step 02",
    title: "Get your plan",
    description:
      "Receive a smart wash plan: settings, load groupings, and the best time to start, tailored to your routine.",
  },
  {
    icon: CheckCircle2,
    step: "Step 03",
    title: "Wash with confidence",
    description:
      "Follow real-time reminders and tips, and let AI Laundry Basket learn your preferences with every load.",
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
        <h2 className="mt-3">Three steps to effortless laundry</h2>
      </Reveal>

      <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-6 hidden h-px bg-border sm:block"
        />
        {steps.map((step, i) => (
          <Reveal
            key={step.title}
            delay={i * 0.1}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <step.icon className="size-5" />
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
