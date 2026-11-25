import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PriceEstimatorTeaser } from "@/components/sections/price-estimator-teaser";
import { ServiceAreas } from "@/components/sections/service-areas";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PriceEstimatorTeaser />
      <ServiceAreas />
      <Cta />
    </>
  );
}
