import type { Metadata } from "next";

import { QuoteForm } from "@/components/sections/quote-form";
import { QuoteHero } from "@/components/sections/quote-hero";
import { QuoteSidebar } from "@/components/sections/quote-sidebar";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a custom AI Laundry Basket quote for residential or commercial laundry, dry cleaning, and pickup & delivery service.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <QuoteHero />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>
          <QuoteSidebar />
        </div>
      </section>
    </>
  );
}
