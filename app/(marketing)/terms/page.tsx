import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern using ${siteConfig.name}'s laundry and dry cleaning services.`,
  alternates: { canonical: "/terms" },
};

const lastUpdated = "25 July 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <Section title="Agreement to terms">
          <p>
            These terms govern your use of {siteConfig.url} and any laundry,
            dry cleaning, ironing, or pickup &amp; delivery service booked
            through it. By submitting a quote request or booking a service,
            you agree to these terms.
          </p>
        </Section>

        <Section title="Quotes and bookings">
          <p>
            Prices shown by the price estimator and quote form are estimates
            based on the details you provide (item counts, weight, service
            type). The final price is confirmed once we&apos;ve inspected your
            items at pickup, and may differ from the estimate if the actual
            load, fabric, or condition differs from what was described.
          </p>
          <p>
            A booking is only confirmed once you receive a booking
            confirmation email with an order ID. Pickup and delivery windows
            are estimates and may shift due to traffic, weather, or
            operational constraints — we&apos;ll notify you of any material
            delay.
          </p>
        </Section>

        <Section title="Cancellations and rescheduling">
          <p>
            You can cancel or reschedule a pickup by contacting us before the
            scheduled pickup time. Once items have been picked up and
            processing has started, cancellation may not be possible.
          </p>
        </Section>

        <Section title="Payment">
          <p>
            Unless otherwise agreed, payment is collected on delivery. We may
            introduce online payment options in the future; if we do, this
            page will be updated to reflect the payment provider and terms
            that apply.
          </p>
        </Section>

        <Section title="Garment care and liability">
          <p>
            We handle every item with care and follow standard cleaning
            practices for the fabric and garment type declared at pickup.
            However:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Please point out pre-existing damage, missing buttons/trims, or
              stains at pickup so we can note them before cleaning.
            </li>
            <li>
              Some fabrics, dyes, or embellishments may be damaged by standard
              cleaning processes despite reasonable care; we are not liable
              for damage caused by manufacturer defects, mislabeled care
              instructions, or the inherent fragility of a material.
            </li>
            <li>
              In the rare case of loss or damage caused by our handling, our
              liability is limited to a reasonable repair/replacement value
              of the affected item, not the order total or any consequential
              loss.
            </li>
            <li>
              Please check pockets before pickup — we&apos;re not responsible
              for items left in pockets.
            </li>
          </ul>
        </Section>

        <Section title="Your responsibilities">
          <ul className="list-disc pl-5">
            <li>Provide an accurate pickup address, contact details, and service requirements.</li>
            <li>Be reasonably available at the agreed pickup/delivery window, or arrange for someone to be.</li>
            <li>Don&apos;t submit items that are hazardous, illegal, or unsuitable for standard laundry/dry-cleaning processing.</li>
          </ul>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms as our services evolve. Continued use of
            our services after an update means you accept the revised terms.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These terms are governed by the laws of India, and any disputes
            are subject to the exclusive jurisdiction of the courts in
            Bengaluru, Karnataka.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about these terms can be sent to{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-primary hover:underline"
            >
              {siteConfig.contact.email}
            </a>{" "}
            or {siteConfig.contact.phone}.
          </p>
        </Section>
      </div>
    </div>
  );
}
