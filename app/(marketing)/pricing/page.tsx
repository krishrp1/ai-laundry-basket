import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { PriceEstimator } from "@/components/sections/price-estimator";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for laundry and dry cleaning across South Bengaluru. Pay per kg or per item, with delivery and express fees shown upfront.",
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
        description="Get a personalised quote based on your exact laundry needs."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="Free, no-obligation quote."
      />
    </>
  );
}
