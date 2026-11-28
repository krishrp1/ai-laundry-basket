import Link from "next/link";

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
  buttonLabel = "Request a Quote",
  buttonHref = "/quote",
}: CtaProps = {}) {
  return (
    <section className="fx-aurora bg-band text-band-foreground">
      <div className="container-page flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2>{title}</h2>
          <p className="mt-2">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            render={<Link href={buttonHref} />}
            className="fx-glow bg-highlight text-highlight-foreground hover:bg-band-foreground"
          >
            {buttonLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<a href={`mailto:${siteConfig.contact.email}`} />}
            className="border-band-foreground/60 bg-transparent text-band-foreground hover:border-band-foreground hover:bg-band-foreground hover:text-band"
          >
            Email us
          </Button>
        </div>
      </div>
    </section>
  );
}
