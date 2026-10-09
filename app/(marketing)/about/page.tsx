import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { Cta } from "@/components/sections/cta";
import { Team } from "@/components/sections/team";
import { TrustStrip } from "@/components/sections/trust-strip";

export const metadata: Metadata = {
  title: "About",
  description:
    "A&I Laundry Basket is a Bengaluru-based laundry and dry cleaning service with doorstep pickup and delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <TrustStrip />
      <Team />
      <Cta
        title="Ready to see it for yourself?"
        description="Get a custom quote in minutes, no obligation."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="No obligation, quick response."
      />
    </>
  );
}
