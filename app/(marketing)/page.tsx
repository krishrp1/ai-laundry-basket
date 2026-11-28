import type { Metadata } from "next";
import { CareStory } from "@/components/sections/care-story";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PriceEstimatorTeaser } from "@/components/sections/price-estimator-teaser";
import { ServiceAreas } from "@/components/sections/service-areas";
import { ServicesShowcase } from "@/components/sections/services-showcase";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="services-title" className="container-wide section-y lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-12" data-reveal-content>Services</p>
          <h2 id="services-title" className="lg:col-span-7" data-reveal-content>
            Four ways we care for your clothes.
          </h2>
          <p className="max-w-md text-lg text-muted-foreground lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal-content>
            Every service includes pickup and delivery at your door. Prices shown are the rates we charge.
          </p>
        </div>
        <div className="mt-16 lg:mt-24">
          <ServicesShowcase />
        </div>
      </section>
      <HowItWorks />
      <PriceEstimatorTeaser />
      <CareStory />
      <ServiceAreas />
      <Cta />
    </>
  );
}
