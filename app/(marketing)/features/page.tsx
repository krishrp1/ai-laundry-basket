import type { Metadata } from "next";
import { PackageCheck, Smile, Users, Zap } from "lucide-react";

import { AiTechnology } from "@/components/sections/ai-technology";
import { AllFeatures } from "@/components/sections/all-features";
import { AnimatedStats } from "@/components/sections/animated-stats";
import { AudienceBenefits } from "@/components/sections/audience-benefits";
import { Cta } from "@/components/sections/cta";
import { FeatureSpotlights } from "@/components/sections/feature-spotlights";
import { FeatureTestimonials } from "@/components/sections/feature-testimonials";
import { FeaturesHero } from "@/components/sections/features-hero";
import { InteractiveWorkflow } from "@/components/sections/interactive-workflow";
import { TraditionalVsAi } from "@/components/sections/traditional-vs-ai";
import { TrustSustainability } from "@/components/sections/trust-sustainability";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every AI Laundry Basket capability in one place: AI-powered scheduling, live tracking, professional garment care, commercial and hospitality solutions, and more.",
  alternates: { canonical: "/features" },
};

const featuresStats = [
  { icon: Smile, value: 98, suffix: "%", label: "Customer satisfaction" },
  { icon: PackageCheck, value: 10000, suffix: "+", label: "Orders completed" },
  {
    icon: PackageCheck,
    value: 99.5,
    suffix: "%",
    decimals: 1,
    label: "On-time delivery",
  },
  { icon: Users, value: 1000, suffix: "+", label: "Active customers" },
  { icon: Zap, display: "Same-Day", label: "Pickup available" },
];

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeatureSpotlights />
      <AiTechnology />
      <InteractiveWorkflow />
      <AnimatedStats stats={featuresStats} />
      <AllFeatures />
      <TraditionalVsAi />
      <AudienceBenefits />
      <FeatureTestimonials />
      <TrustSustainability />
      <Cta
        title="Ready to put every feature to work?"
        description="Tell us about your home or business laundry needs and get a personalized quote in minutes."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="No obligation, quick response."
      />
    </>
  );
}
