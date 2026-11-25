import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Cta } from "@/components/sections/cta";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHeader } from "@/components/sections/page-header";
import { serviceRates } from "@/components/sections/rates";

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
        title="Washing, ironing and dry cleaning"
        description="Four services, all with doorstep pickup and delivery. Choose one when you request a quote."
      />

      <section className="container-page section-y">
        <ul className="divide-y border-y">
          {serviceRates.map((service) => (
            <li
              key={service.key}
              className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10"
            >
              <div>
                <h2>{service.label}</h2>
                <p className="mt-2 text-muted-foreground">
                  {service.description}{" "}
                  {service.model === "per_kg"
                    ? "Billed on the weight measured at pickup."
                    : "Billed by the number of garments."}
                </p>
              </div>
              <p className="sm:text-right">
                <span className="font-heading text-3xl font-semibold tabular-nums">{service.price}</span>{" "}
                <span className="text-muted-foreground sm:block">{service.unit}</span>
              </p>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/pricing" />}
          className="mt-8"
        >
          See prices and estimate your order
        </Button>
      </section>

      <div className="border-t bg-card">
        <HowItWorks />
      </div>

      <Cta />
    </>
  );
}
