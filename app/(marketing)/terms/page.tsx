import type { Metadata } from "next";
import Link from "next/link";

import { BusinessDetails } from "@/components/legal/business-details";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern using ${siteConfig.name}'s laundry and dry cleaning services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  const { contact } = siteConfig;

  return (
    <LegalPage title="Terms of Service">
      <LegalSection title="Who these terms are with">
        <p>
          These terms are between you and the business below. They govern your
          use of {siteConfig.url} and any laundry, dry cleaning, ironing, or
          pickup &amp; delivery service you request through it or by phone,
          email, or WhatsApp. By sending a quote request or using our service
          you agree to these terms. If you do not agree, please do not use the
          service.
        </p>
        <BusinessDetails />
        <p>
          You must be at least 18 years old and able to enter into a contract
          under Indian law to book our services.
        </p>
      </LegalSection>

      <LegalSection title="Quotes and bookings">
        <p>
          Prices shown by the price estimator and in the quote form are
          estimates based on the details you provide (item counts, weight,
          service type). Per-kg services are billed on the actual weight
          measured at pickup. Other charges, such as the minimum order top-up,
          delivery fee, or express surcharge, are shown in the estimate. The
          final price is confirmed with you before we begin work and may differ
          from the estimate if the actual load, fabric, or condition differs
          from what was described.
        </p>
        <p>
          Sending a quote request does not book a pickup. A booking is
          confirmed only when we confirm it to you by email, phone, or message
          and give you an order ID. Pickup and delivery windows are estimates
          and may shift because of traffic, weather, or operational reasons.
          We will tell you about any material delay.
        </p>
      </LegalSection>

      <LegalSection title="Payment">
        <p>
          Unless we agree otherwise, payment is due on delivery. We will tell
          you which payment methods we accept when we confirm your booking.
          Applicable taxes, if any, are shown on your bill. If we introduce
          online payment, we will update this page with the provider and terms
          that apply.
        </p>
      </LegalSection>

      <LegalSection title="Cancellations, refunds and rescheduling">
        <p>
          You can cancel or reschedule before we collect your items. Refunds,
          re-cleaning, and complaints are covered in our{" "}
          <Link href="/refunds" className="text-primary hover:underline">
            Refund &amp; Cancellation Policy
          </Link>
          , which forms part of these terms.
        </p>
      </LegalSection>

      <LegalSection title="Garment care and liability">
        <p>
          We handle every item with care and clean it according to the service
          you chose and the garment type and care instructions declared at
          pickup. Please note:
        </p>
        <ul className="list-disc pl-5">
          <li>
            Tell us about pre-existing damage, missing buttons or trims, and
            stains at pickup so we can note them before cleaning.
          </li>
          <li>
            Some fabrics, dyes, or embellishments can be affected by cleaning
            even with reasonable care. We are not responsible for damage
            caused by a manufacturing defect, an incorrect or missing care
            label, or the inherent fragility of the material, where we have
            followed reasonable care.
          </li>
          <li>
            If we lose or damage an item through our own fault, we will repair
            it, re-clean it, or compensate you as set out in the Refund &amp;
            Cancellation Policy. Our liability is limited to the reasonable
            value of the affected item, taking into account its age and
            condition, and does not extend to indirect or consequential loss.
          </li>
          <li>
            Please check pockets before pickup. We are not responsible for
            valuables, cash, or other items left in pockets or bags.
          </li>
        </ul>
        <p>
          Nothing in these terms excludes or limits any right you have as a
          consumer under the Consumer Protection Act, 2019 or any other law
          that cannot be excluded by agreement.
        </p>
      </LegalSection>

      <LegalSection title="Your responsibilities">
        <ul className="list-disc pl-5">
          <li>
            Give an accurate pickup address, contact details, and service
            requirements.
          </li>
          <li>
            Be available at the agreed pickup and delivery window, or arrange
            for someone to be.
          </li>
          <li>
            Do not hand over items that are hazardous, illegal, or unsuitable
            for standard laundry or dry-cleaning processing.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Using this website">
        <p>
          The content, text, and design of this site belong to us or are used
          with permission. Please do not copy it for commercial use, submit
          false information, attempt to break or overload the site, or use
          automated tools to submit forms.
        </p>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          How we handle your personal data is described in our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Complaints">
        <p>
          If something goes wrong, please contact us first at{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="text-primary hover:underline"
          >
            {contact.supportEmail}
          </a>{" "}
          or {contact.phone}. You also have the right to approach the National
          Consumer Helpline (1915) or the Consumer Commission if you are not
          satisfied.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms. The version that applies to an order is
          the one on this page when you sent your request. We will change the
          &quot;Last updated&quot; date above whenever we update them.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Subject to your
          rights as a consumer to bring a claim where you live or where we
          provide the service, disputes are subject to the jurisdiction of the
          courts in Bengaluru, Karnataka.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about these terms can be sent to{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-primary hover:underline"
          >
            {contact.email}
          </a>{" "}
          or {contact.phone}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
