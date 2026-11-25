import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { FaqAccordion, faqCategories } from "@/components/sections/faq-accordion";
import { PageHeader } from "@/components/sections/page-header";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about A&I Laundry Basket, covering pricing, pickup and delivery, dry cleaning, wash & fold, commercial plans, subscriptions, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd categories={faqCategories} />
      <PageHeader
        title="Frequently asked questions"
        description="Pricing, pickup and delivery, garment care, cancellations and damaged items."
      />
      <FaqAccordion />
      <Cta
        title="Still have a question?"
        description="Send us a message and we will reply within one business day."
        buttonLabel="Contact us"
        buttonHref="/contact"
      />
    </>
  );
}
