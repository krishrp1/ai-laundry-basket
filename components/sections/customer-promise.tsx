import { CheckCircle2, HeartHandshake } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const promises = [
  "We will always show pricing before you book, with no hidden fees.",
  "We will treat every item according to its actual care needs.",
  "We will tell you as soon as we know about a delay, not after.",
  "We will make it right if something goes wrong with your order.",
];

export function CustomerPromise() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HeartHandshake className="size-5" />
          </span>
          <h2 className="mt-5">Our promise to you</h2>
          <p className="mt-4 text-muted-foreground">
            Technology handles the sorting and scheduling. These commitments
            are the part we hold ourselves to, no matter what.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {promises.map((promise) => (
              <li key={promise} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{promise}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
