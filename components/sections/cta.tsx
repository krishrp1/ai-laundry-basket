import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type CtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  note?: string;
};

export function Cta({
  title = "Ready to make laundry day effortless?",
  description = "Join AI Laundry Basket and let smart technology handle the sorting, scheduling, and care, so you do not have to.",
  buttonLabel = "Request a Quote",
  buttonHref = "/quote",
  note = "No obligation, quick response.",
}: CtaProps = {}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"
          />
          <h2 className="relative text-primary-foreground">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/80">
            {description}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href={buttonHref} />}
              className="gap-1.5"
            >
              {buttonLabel}
              <ArrowRight className="size-4" />
            </Button>
          </div>
          {note && (
            <p className="relative mt-4 text-xs text-primary-foreground/70">
              {note}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
