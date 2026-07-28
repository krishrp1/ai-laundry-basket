import { MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/reveal";

export function ServiceAreas() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Where we deliver
          </span>
          <h2 className="mt-3">Serving neighborhoods across South Bengaluru</h2>
          <p className="mt-3 text-muted-foreground">
            {siteConfig.contact.addressLine} No fixed storefront — we pick up
            and deliver directly to your door.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5"
        >
          {siteConfig.contact.serviceAreas.map((area) => (
            <span
              key={area}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              <MapPin className="text-muted-foreground size-3.5" aria-hidden="true" />
              {area}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
