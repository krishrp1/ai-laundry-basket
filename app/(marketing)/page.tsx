import type { Metadata } from "next";
import { AnimatedStats } from "@/components/sections/animated-stats";
import { Cta } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedStats />
      <Features />
      <ServicesTeaser />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </>
  );
}
