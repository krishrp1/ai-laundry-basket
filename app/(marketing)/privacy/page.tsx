import type { Metadata } from "next";
import Link from "next/link";

import { BusinessDetails } from "@/components/legal/business-details";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  const { contact, legal } = siteConfig;

  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="Who we are">
        <p>
          {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
          provides laundry, dry cleaning, ironing, and pickup &amp; delivery
          services across South Bengaluru. We decide why and how your personal
          data is used when you use {siteConfig.url}, which makes us the
          &quot;Data Fiduciary&quot; under India&apos;s Digital Personal Data
          Protection Act, 2023 (&quot;DPDP Act&quot;).
        </p>
        <BusinessDetails />
      </LegalSection>

      <LegalSection title="What we collect, and why">
        <p>
          We collect only what we need to answer you and carry out your
          request.
        </p>
        <ul className="list-disc pl-5">
          <li>
            <strong className="text-foreground">Quote request form:</strong>{" "}
            name, phone number, email address, pickup address, city and PIN
            code, service and load details, pickup date and time, and any
            special instructions you choose to write. We use these to check we
            serve your area, contact you with a price, and schedule pickup and
            delivery.
          </li>
          <li>
            <strong className="text-foreground">Contact form:</strong> name,
            email address, your message, and, only if you choose to give them,
            your phone number and area. We use these to reply to you.
          </li>
          <li>
            <strong className="text-foreground">
              Orders we create from your request:
            </strong>{" "}
            the order status, prices, and notes we record while handling your
            laundry, and the emails we send you about it.
          </li>
          <li>
            <strong className="text-foreground">
              Temporary technical data:
            </strong>{" "}
            your IP address is used for about an hour to limit repeated
            submissions and block spam. It is not stored with your request.
          </li>
          <li>
            <strong className="text-foreground">
              When you call, email, or message us on WhatsApp:
            </strong>{" "}
            we see the phone number or email address you contact us from and
            what you write.
          </li>
        </ul>
        <p>
          We do not ask for payment card details, government ID numbers, or
          sensitive personal data through this site. Please do not include any
          in free-text fields.
        </p>
      </LegalSection>

      <LegalSection title="Your consent">
        <p>
          Before you send either form you are asked to tick a box agreeing to
          this policy and to us using your details for that request. We record
          the time of your consent and the version of this policy you agreed
          to. You can withdraw consent at any time by contacting us (see
          &quot;Your rights&quot;). Withdrawing does not affect what we did
          before you withdrew, but we will stop using your data for that
          purpose, and may not be able to continue a service that needs it.
        </p>
        <p>
          We also process your data where the law allows or requires it
          without consent, for example to keep tax and accounting records.
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>
          We do not sell your personal data and we do not use it for
          advertising. We use these service providers, who handle data only to
          provide their service to us:
        </p>
        <ul className="list-disc pl-5">
          <li>
            <strong className="text-foreground">Supabase</strong>: database
            hosting, where your requests and orders are stored.
          </li>
          <li>
            <strong className="text-foreground">Resend</strong>: sending the
            confirmation and status emails we send you.
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong>: hosting this
            website.
          </li>
        </ul>
        <p>
          Our own staff and pickup/delivery team see the details they need to
          collect and return your laundry. We may disclose data if a court or
          government authority lawfully requires it.
        </p>
        <p>
          These providers may process data on servers outside India. We rely
          on them to protect it under their own security and contractual
          commitments. The DPDP Act allows transfers outside India except to
          countries the Government of India restricts.
        </p>
        <p>
          The WhatsApp link on our contact page opens WhatsApp, which is run by
          Meta and governed by Meta&apos;s own privacy policy.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and tracking">
        <p>
          We do not use advertising, analytics, or tracking cookies, and we do
          not load third-party trackers or embedded maps and videos. See our{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>{" "}
          for the few things your browser stores.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <ul className="list-disc pl-5">
          <li>
            Quote requests and contact messages that do not become an order:
            we review and delete these at least once a year, and sooner if you
            ask.
          </li>
          <li>
            Orders and related records: as long as needed to deliver the
            service and handle complaints, and for the period the law requires
            us to keep tax and accounting records.
          </li>
          <li>
            Emails we send are also kept by the email provider for a limited
            time under its own retention rules.
          </li>
        </ul>
        <p>
          You can ask us to delete your data sooner; we will do so unless the
          law requires us to keep it.
        </p>
      </LegalSection>

      <LegalSection title="Keeping it safe">
        <p>
          The site uses HTTPS. Customer records are visible only to
          password-protected staff accounts, and the database account used by
          the website has limited permissions. No system is perfectly secure.
          If a breach affecting your personal data occurs, we will notify you
          and the Data Protection Board of India as the law requires.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our services are for adults. We do not knowingly collect personal
          data of anyone under 18. If you believe a child has sent us their
          data, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under the DPDP Act you can ask us to:</p>
        <ul className="list-disc pl-5">
          <li>
            tell you what personal data we hold about you and how it is used,
            and who we share it with;
          </li>
          <li>correct or complete data that is wrong or out of date;</li>
          <li>erase data we no longer need;</li>
          <li>
            nominate another person to exercise these rights if you die or
            cannot act for yourself;
          </li>
          <li>withdraw your consent.</li>
        </ul>
        <p>
          To use any of these rights, or to raise a privacy complaint, email{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="text-primary hover:underline"
          >
            {contact.supportEmail}
          </a>
          {legal.grievanceOfficerName
            ? ` and address it to ${legal.grievanceOfficerName}`
            : ""}
          . We may ask you to confirm your identity first. We will reply as
          quickly as we can and within the time the law allows. If we have not
          resolved your complaint, you may complain to the Data Protection
          Board of India.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change this policy, we will update the &quot;Last
          updated&quot; date above. If a change affects how we use data you
          already gave us, we will ask for your consent again where the law
          requires it.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="text-primary hover:underline"
          >
            {contact.supportEmail}
          </a>{" "}
          or {contact.phone}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
