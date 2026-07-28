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
  description = "Doorstep pickup, careful cleaning, and reliable delivery — every order, every time.",
  buttonLabel = "Request a Quote",
  buttonHref = "/quote",
  note = "No obligation, quick response.",
}: CtaProps = {}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-accent px-8 py-16 text-center sm:px-16">
          <h2 className="relative text-foreground">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            {description}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href={buttonHref} />}
              className="h-12 gap-1.5 rounded-full px-8 text-base shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {buttonLabel}
              <ArrowRight className="size-4" />
            </Button>
          </div>
          {note && (
            <p className="relative mt-4 text-xs text-muted-foreground">
              {note}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
