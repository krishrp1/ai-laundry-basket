import type { Metadata } from "next";

import { QuoteForm } from "@/components/sections/quote-form";
import { QuoteHero } from "@/components/sections/quote-hero";
import { QuoteSidebar } from "@/components/sections/quote-sidebar";
import { services, weightTiers, pickupWindows } from "@/config/pricing";
import type { QuoteFormValues } from "@/components/sections/quote-form";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a custom A&I Laundry Basket quote for residential or commercial laundry, dry cleaning, and pickup & delivery service.",
  alternates: { canonical: "/quote" },
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Builds QuoteForm initial values from the price estimator's "Book Pickup" query
 * params. Every field is optional and defensively validated against the known
 * option lists — a missing or malformed param just leaves that field blank,
 * exactly like navigating to /quote directly. */
function parseEstimatorParams(searchParams: RawSearchParams): Partial<QuoteFormValues> {
  const values: Partial<QuoteFormValues> = {};

  const serviceLabel = firstValue(searchParams.service);
  const matchedService = services.find((service) => service.label === serviceLabel);
  if (matchedService) {
    values.serviceType = matchedService.label;
  }

  const weightTier = firstValue(searchParams.weight);
  if (weightTier && weightTiers.includes(weightTier)) {
    values.estimatedWeight = weightTier;
  }

  const city = firstValue(searchParams.city);
  if (city) values.city = city;

  const date = firstValue(searchParams.date);
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    values.pickupDate = date;
  }

  const time = firstValue(searchParams.time);
  if (time && pickupWindows.some((window) => window.label === time)) {
    values.pickupTime = time;
  }

  const deliveryDate = firstValue(searchParams.deliveryDate);
  if (deliveryDate && /^\d{4}-\d{2}-\d{2}$/.test(deliveryDate)) {
    values.deliveryDate = deliveryDate;
  }

  if (firstValue(searchParams.express) === "1") {
    values.urgency = "rush";
  }

  const garments = firstValue(searchParams.garments);
  const price = Number(firstValue(searchParams.price));
  const deliveryLabel = firstValue(searchParams.deliveryLabel);
  const noteLines: string[] = [];
  if (garments) noteLines.push(`Garments: ${garments}`);
  if (Number.isFinite(price) && price > 0) {
    const caveat =
      matchedService?.model === "per_kg"
        ? "self-service estimate — laundry is weighed at pickup and billed by actual weight"
        : "self-service estimate, confirmed at pickup";
    noteLines.push(`Estimated total: ${formatINR(price)} (${caveat})`);
  }
  if (deliveryLabel) noteLines.push(`Delivery estimate: ${deliveryLabel}`);
  if (noteLines.length > 0) {
    values.specialInstructions = noteLines.join("\n");
  }

  return values;
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const initialValues = parseEstimatorParams(await searchParams);

  return (
    <>
      <QuoteHero />

      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <QuoteForm initialValues={initialValues} />
        <QuoteSidebar />
      </section>
    </>
  );
}
