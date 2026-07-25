import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { PriceEstimator } from "@/components/sections/price-estimator";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for laundry and dry cleaning across South Bengaluru. Pay per kg or per item, no hidden fees.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PriceEstimator />
      <Cta
        title="Ready for pricing built around you?"
        description="Get a personalized quote based on your exact laundry needs, no hidden fees."
        buttonLabel="Get Instant Quote"
        buttonHref="/quote"
        note="Free, no-obligation quote."
      />
    </>
  );
}
