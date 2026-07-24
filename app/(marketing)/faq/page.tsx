import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { FaqAccordion, faqCategories } from "@/components/sections/faq-accordion";
import { FaqHero } from "@/components/sections/faq-hero";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about AI Laundry Basket, covering pricing, pickup and delivery, dry cleaning, wash & fold, commercial plans, subscriptions, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd categories={faqCategories} />
      <FaqHero />
      <FaqAccordion />
      <Cta
        title="Still have questions?"
        description="Our support team is happy to help with anything not covered here."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        note=""
      />
    </>
  );
}
