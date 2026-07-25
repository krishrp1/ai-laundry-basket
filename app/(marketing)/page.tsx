import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesTeaser />
      <HowItWorks />
      <Testimonials />
      <Cta buttonLabel="Get Instant Quote" />
    </>
  );
}
