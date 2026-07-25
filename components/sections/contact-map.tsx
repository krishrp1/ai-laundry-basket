import { MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/reveal";

// TODO: Once a permanent business address is finalized, restore a "Get
// directions" link/embedded map here (and add a real PostalAddress to
// components/seo/organization-json-ld.tsx). Until then this is a doorstep-only
// service with no fixed location to point to.
export function ContactMap() {
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
              <p className="font-medium">{siteConfig.contact.addressLine}</p>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                We don&apos;t have a fixed storefront — our team picks up and
                delivers directly to your doorstep across South Bengaluru.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
