import Link from "next/link";

import { Button } from "@/components/ui/button";
import { RateCard } from "@/components/sections/rate-card";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="fx-aurora border-b bg-card">
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-20">
        <div>
          <h1 className="fx-shimmer sm:text-6xl">
            Laundry picked up from your door and brought back clean.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Washing, ironing and dry cleaning for homes and businesses across
            South Bengaluru. You see the price before you book.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="fx-glow" render={<Link href="/quote" />}>
              Request a Quote
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/pricing#price-estimator" />}>
              Estimate your price
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Or email{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
            >
              {siteConfig.contact.email}
            </a>
            , {siteConfig.contact.hours[0].time}, every day.
          </p>
        </div>

        <RateCard />
      </div>
    </section>
  );
}
