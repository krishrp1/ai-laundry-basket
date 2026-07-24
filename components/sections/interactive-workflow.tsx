"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  ClipboardCheck,
  MessageSquareHeart,
  Package,
  PackageCheck,
  Truck,
  UserCheck,
  WashingMachine,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: CalendarClock,
    title: "Schedule Pickup",
    description:
      "Book in the app or website, choose your pickup window, and add any special instructions.",
  },
  {
    icon: UserCheck,
    title: "Driver Assignment",
    description:
      "Our routing system assigns the nearest available driver and optimizes their route in real time.",
  },
  {
    icon: Package,
    title: "Collection",
    description:
      "Your driver arrives during the selected window and collects your order, no waiting around required.",
  },
  {
    icon: WashingMachine,
    title: "Professional Cleaning",
    description:
      "Each load is sorted and cleaned according to its AI-generated care plan by trained specialists.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Inspection",
    description:
      "Every order is checked before it leaves the facility to catch anything that needs a second pass.",
  },
  {
    icon: PackageCheck,
    title: "Packaging",
    description:
      "Clean items are folded, packed, or bagged and prepared for delivery.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Your order is delivered back on schedule, with a notification when your driver is on the way.",
  },
  {
    icon: MessageSquareHeart,
    title: "Customer Feedback",
    description:
      "Rate your order and share feedback that helps us fine-tune future scheduling and care decisions.",
  },
];

export function InteractiveWorkflow() {
  const [active, setActive] = React.useState(0);
  const step = steps[active];

  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            How it works
          </span>
          <h2 className="mt-3">
            From pickup to feedback, one connected workflow
          </h2>
          <p className="mt-4 text-muted-foreground">
            Select any step to see what happens behind the scenes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-2">
            <ol className="flex flex-col gap-1.5">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={active === i}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      active === i ? "bg-primary/10" : "hover:bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                        active === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        active === i
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border bg-card p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="size-7" />
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      Step {active + 1} of {steps.length}
                    </span>
                    <h3 className="mt-1 text-2xl">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
