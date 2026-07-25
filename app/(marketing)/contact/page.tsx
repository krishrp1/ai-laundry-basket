import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactMap } from "@/components/sections/contact-map";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A&I Laundry Basket. Call, email, or send a message about pricing, an existing order, or a commercial account.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactMap />
      <ContactForm />
      <Cta
        title="Ready for a custom quote?"
        description="Tell us about your home or business laundry needs and we will put together a plan that fits."
        buttonLabel="Request a Quote"
        buttonHref="#contact-form"
        note="No obligation, quick response."
      />
    </>
  );
}
