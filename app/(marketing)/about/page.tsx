import type { Metadata } from "next";
import { PackageCheck, Smile, Users, Zap } from "lucide-react";

import { AboutFaq } from "@/components/sections/about-faq";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { AiWorkflow } from "@/components/sections/ai-workflow";
import { AnimatedStats } from "@/components/sections/animated-stats";
import { Community } from "@/components/sections/community";
import { CompanyTimeline } from "@/components/sections/company-timeline";
import { Cta } from "@/components/sections/cta";
import { CustomerPromise } from "@/components/sections/customer-promise";
import { MissionVision } from "@/components/sections/mission-vision";
import { QualityStandards } from "@/components/sections/quality-standards";
import { Sustainability } from "@/components/sections/sustainability";
import { Team } from "@/components/sections/team";
import { Values } from "@/components/sections/values";
import { WhyTrustUs } from "@/components/sections/why-trust-us";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how AI Laundry Basket was founded, the mission and values behind it, the team running it, and how our AI-powered workflow takes laundry from booking to delivery.",
  alternates: { canonical: "/about" },
};

const aboutStats = [
  { icon: Users, value: 1000, suffix: "+", label: "Happy customers" },
  { icon: PackageCheck, value: 10000, suffix: "+", label: "Orders completed" },
  { icon: Smile, value: 98, suffix: "%", label: "Satisfaction rate" },
  {
    icon: Zap,
    display: "Same-Day",
    label: "Pickup available in core markets",
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVision />
      <Values />
      <WhyTrustUs />
      <CompanyTimeline />
      <AnimatedStats stats={aboutStats} />
      <AiWorkflow />
      <Team />
      <QualityStandards />
      <Sustainability />
      <Community />
      <CustomerPromise />
      <AboutFaq />
      <Cta
        title="Ready to see it for yourself?"
        description="Tell us about your home or business laundry needs and get a custom quote in minutes."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="No obligation, quick response."
      />
    </>
  );
}
