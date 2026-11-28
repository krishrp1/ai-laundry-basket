import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrushStroke } from "@/components/brand/brush-stroke";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type CtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function Cta({
  title = "Book a pickup",
  description = "Send your address and a pickup window. Nothing is booked or charged until we confirm with you.",
  buttonLabel = "Request a pickup",
  buttonHref = "/quote",
}: CtaProps = {}) {
  return (
    <section aria-labelledby="cta-title" data-hide-floating className="dark relative isolate overflow-hidden bg-background text-foreground">
      <BrushStroke
        id="cta-stroke"
        viewBox="0 0 1600 600"
        width={150}
        seed={17}
        splatter={22}
        spine={[[[1500, 470], [1150, 250], [600, 160], [80, 300]]]}
        className="absolute top-1/2 left-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 text-foreground/[0.07] sm:w-[115%]"
      />
      <div className="container-wide flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-5xl sm:text-7xl" data-reveal-content>{title}</h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground" data-reveal-content>{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row" data-reveal-content>
          <Button size="lg" className="h-12 px-6" render={<Link href={buttonHref} />}>
            {buttonLabel} <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 bg-transparent px-6"
            render={<a href={`mailto:${siteConfig.contact.email}`} />}
          >
            Email us
          </Button>
        </div>
      </div>
    </section>
  );
}
