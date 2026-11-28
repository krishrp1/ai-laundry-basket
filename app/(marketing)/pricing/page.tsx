import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { DryCleaningPrices, PricingPlans } from "@/components/sections/pricing-plans";
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
      <PageHeader
        eyebrow="Pricing"
        title="Prices, in full"
        description="Washing is charged by weight. Ironing on its own and dry cleaning are charged per garment."
      />
      <PricingPlans />
      <PriceEstimator />
      <DryCleaningPrices />
      <Cta />
    </>
  );
}
