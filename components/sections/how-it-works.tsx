import type { CSSProperties } from "react";

import { BrushStroke } from "@/components/brand/brush-stroke";

const steps = [
  {
    title: "Request a pickup",
    description: "Pick a service and a pickup window. We call or message you to confirm both.",
  },
  {
    title: "We collect",
    description: "We pick up from your door. Per-kg loads are weighed then, so you pay for actual weight.",
  },
  {
    title: "We clean",
    description: "Washed, ironed or dry cleaned as you chose, following the care labels.",
  },
  {
    title: "Delivered to your door",
    description: "Standard orders are usually ready 2 to 3 business days after pickup.",
  },
];

/** The four-step journey on charcoal. A white brush path is painted as the visitor scrolls through. */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="dark scroll-mt-20 bg-background text-foreground"
      data-scroll-paint
    >
      <div className="container-wide section-y lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-12" data-reveal-content>How it works</p>
          <h2 id="how-it-works-title" className="lg:col-span-7" data-reveal-content style={{ "--d": 1 } as CSSProperties}>
            From your door, and back again.
          </h2>
          <p className="max-w-md text-lg text-muted-foreground lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal-content style={{ "--d": 2 } as CSSProperties}>
            No storefront to visit and nothing to carry. One request starts it, and your clothes come
            home clean.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          {/* Wide screens: one stroke running across the four steps. */}
          <BrushStroke
            id="journey-wide"
            reveal="scroll"
            viewBox="0 0 1600 200"
            width={46}
            seed={5}
            splatter={12}
            dryFrom={0.8}
            spine={[
              [[30, 120], [300, 40], [520, 170], [800, 100]],
              [[800, 100], [1080, 30], [1300, 170], [1570, 90]],
            ]}
            className="pointer-events-none absolute -top-14 left-0 hidden w-full text-foreground lg:block"
          />
          {/* Phones and tablets: the stroke runs down beside the steps. */}
          <BrushStroke
            id="journey-tall"
            reveal="scroll"
            viewBox="0 0 120 4000"
            fit="stretch"
            width={30}
            seed={9}
            splatter={0}
            dryFrom={0.85}
            spine={[
              [[60, 30], [30, 1000], [90, 1600], [60, 2000]],
              [[60, 2000], [30, 2600], [90, 3200], [60, 3970]],
            ]}
            className="pointer-events-none absolute top-0 -left-3 h-full w-12 text-foreground lg:hidden"
          />

          <ol className="relative grid gap-12 pl-14 lg:grid-cols-4 lg:gap-10 lg:pt-20 lg:pl-0">
            {steps.map((step, i) => (
              <li key={step.title}>
                {/* Only the decorative number waits for the path; the text is always full contrast. */}
                <span aria-hidden="true" data-step={((i + 0.6) / steps.length).toFixed(2)} className="inline-block font-heading text-6xl font-light tracking-[-0.04em] tabular-nums lg:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-medium">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
