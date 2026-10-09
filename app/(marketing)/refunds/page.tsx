import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `How cancellations, refunds, re-cleaning, and damage or loss claims work at ${siteConfig.name}.`,
  alternates: { canonical: "/refunds" },
};

export default function RefundPolicyPage() {
  const { contact } = siteConfig;

  return (
    <LegalPage title="Refund & Cancellation Policy">
      <LegalSection title="Overview">
        <p>
          Payment is normally collected on delivery, so most orders never
          involve a refund. This page explains what happens if you cancel,
          pay more than you should have, are unhappy with the cleaning, or an
          item is damaged or lost. It is part of our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Cancelling or rescheduling a pickup">
        <ul className="list-disc pl-5">
          <li>
            Before we collect your items, you can cancel or reschedule free of
            charge. Call, WhatsApp, or email us.
          </li>
          <li>
            After we have collected your items and started cleaning, we may
            not be able to stop the work. If we cannot, you pay for the
            service already carried out.
          </li>
          <li>
            If we have to cancel or cannot serve your address, you owe
            nothing.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="If you are not happy with the cleaning">
        <p>
          Tell us within 48 hours of delivery, with your order ID and, if
          possible, a photo. We will re-clean the affected items free of
          charge. If we cannot fix the problem, we will refund the charge for
          those items.
        </p>
      </LegalSection>

      <LegalSection title="Damaged or lost items">
        <p>
          Report damage or loss within 48 hours of delivery (or of the
          expected delivery date, for items not returned). If it was caused by
          our handling, we will repair the item, replace it, or compensate you
          for its reasonable value, taking into account its age and condition.
          Damage that comes from a manufacturing defect, a wrong care label,
          or the fragility of the fabric is not covered, as explained in the
          Terms of Service.
        </p>
      </LegalSection>

      <LegalSection title="Overcharges and failed services">
        <p>
          If you were charged more than the confirmed price, or we did not
          perform the service you paid for, we will refund the difference or
          the full amount, as appropriate.
        </p>
      </LegalSection>

      <LegalSection title="How refunds are paid">
        <p>
          Refunds go back to the method you used to pay, or to another method
          we agree with you, within 7 working days of us approving the refund.
        </p>
      </LegalSection>

      <LegalSection title="How to make a request">
        <p>
          Email{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="text-primary hover:underline"
          >
            {contact.supportEmail}
          </a>{" "}
          or call or WhatsApp {contact.phone} with your order ID and a short
          description. Your statutory consumer rights are not affected by this
          policy.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
