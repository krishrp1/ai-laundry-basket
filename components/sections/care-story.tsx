import type { CSSProperties } from "react";

import { BrushImage } from "@/components/brand/brush-stroke";

const promises = [
  { title: "Price before you book", body: "Every rate is on the site, and the calculator shows your estimate before you request a pickup." },
  { title: "Pay for actual weight", body: "Per-kg loads are weighed at pickup, so the bill follows what you sent, not a guess." },
  { title: "Care labels, followed", body: "Washed, ironed or dry cleaned as you chose, following the care label on every garment." },
];

/** Fabric seen through a giant brushstroke, beside the three things we promise on every order. */
export function CareStory() {
  return (
    <section aria-labelledby="care-title" className="relative overflow-hidden">
      <div className="container-wide pt-4 pb-14 lg:pt-0 lg:pb-32">
        <BrushImage
          id="care-linen"
          src="/images/linen-flow.webp"
          viewBox="0 0 1600 640"
          width={330}
          seed={41}
          splatter={26}
          dryFrom={0.66}
          spine={[[[200, 440], [520, 230], [1050, 160], [1500, 330]]]}
          className="-mx-[6%] w-[112%] max-w-none"
        />

        <div className="mt-6 grid gap-12 lg:mt-0 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal-content>Our promise</p>
            <h2 id="care-title" className="mt-4" data-reveal-content style={{ "--d": 1 } as CSSProperties}>
              Care you can feel in every fold.
            </h2>
          </div>
          <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:pt-12">
            {promises.map((p, i) => (
              <div key={p.title} className="border-t border-foreground pt-5" data-reveal-content style={{ "--d": i + 2 } as CSSProperties}>
                <dt className="font-heading text-xl font-medium">{p.title}</dt>
                <dd className="mt-2 text-muted-foreground">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
