import type { Metadata } from "next";

import { AnimatedStats } from "@/components/sections/animated-stats";
import { Cta } from "@/components/sections/cta";
import { SuccessStory } from "@/components/sections/success-story";
import { TestimonialsGrid } from "@/components/sections/testimonials-grid";
import { TestimonialsHero } from "@/components/sections/testimonials-hero";
import { TrustedBy } from "@/components/sections/trusted-by";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what households and businesses say about AI Laundry Basket, from wash & fold to dry cleaning, pickup & delivery, and commercial laundry plans.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsHero />
      <AnimatedStats />
      <TestimonialsGrid />
      <TrustedBy />
      <SuccessStory />
      <Cta
        title="Ready to experience it yourself?"
        description="Request a personalized quote and see how AI Laundry Basket can fit your home or business laundry needs."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
        note="Free, no-obligation quote."
      />
    </>
  );
}
