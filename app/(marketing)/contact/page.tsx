import type { Metadata } from "next";

import { ContactDetails } from "@/components/sections/contact-details";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceAreas } from "@/components/sections/service-areas";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A&I Laundry Basket. Email us or send a message about pricing, an existing order, or a commercial account.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        description="Ask about an order, a business account or a price. We reply to messages within one business day."
      />
      <div className="container-page section-y grid gap-12 lg:grid-cols-[2fr_3fr]">
        <ContactDetails />
        <ContactForm />
      </div>
      <div className="border-t bg-card">
        <ServiceAreas />
      </div>
    </>
  );
}
