import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ContactMap() {
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.contact.address
  )}`;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-40"
          />
          <div className="relative flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="size-6" />
            </span>
            <div>
              <p className="font-medium">{siteConfig.contact.address}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Map preview placeholder, a live map will go here once this
                site is connected to a mapping provider.
              </p>
            </div>
            <Button
              variant="secondary"
              render={
                <Link
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="gap-1.5"
            >
              <Navigation className="size-4" />
              Get directions
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
