import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceCard, coreServices } from "@/components/sections/service-card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wash & Fold, Dry Cleaning, Ironing, and Pickup & Delivery across South Bengaluru. Simple pricing, doorstep service.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Simple laundry, done right"
        description="Four services, one doorstep pickup. No guesswork, no long forms."
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <HowItWorks />

      <Cta
        title="Ready to book your first pickup?"
        description="Get an instant quote and schedule collection in minutes."
        buttonLabel="Get Instant Quote"
        buttonHref="/quote"
        note="No obligation, quick response."
      />
    </>
  );
}
