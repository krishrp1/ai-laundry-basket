import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PricingCalculator } from "@/components/sections/pricing-calculator";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { PricingFaq } from "@/components/sections/pricing-faq";
import { PricingForBusiness } from "@/components/sections/pricing-for-business";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { PricingTransparency } from "@/components/sections/pricing-transparency";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, AI-powered pricing for AI Laundry Basket. Compare Essential, Premium, Family, and Business plans, estimate your cost, and see pricing for hotels, restaurants, healthcare, and more.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingCalculator />
      <PricingComparison />
      <PricingTransparency />
      <PricingForBusiness />
      <PricingFaq />
      <Cta
        title="Ready for pricing built around you?"
        description="Get a personalized quote based on your exact laundry needs, no guesswork, no hidden fees."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="Free, no-obligation quote."
      />
    </>
  );
}
