import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesShowcase } from "@/components/sections/services-showcase";

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
        title="Washing, ironing and dry cleaning"
        description="Four services, all with doorstep pickup and delivery. Choose one when you request a pickup."
      />

      <section aria-labelledby="services-list-title" className="container-wide pb-24 lg:pb-32">
        <h2 id="services-list-title" className="sr-only">Our services and prices</h2>
        <ServicesShowcase />
      </section>

      <HowItWorks />
      <Cta />
    </>
  );
}
