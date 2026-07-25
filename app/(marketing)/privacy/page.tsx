import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <Section title="Overview">
          <p>
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
            provides laundry, dry cleaning, and pickup &amp; delivery services
            across South Bengaluru. This policy explains what personal
            information we collect through {siteConfig.url}, why we collect
            it, and how you can contact us about it.
          </p>
        </Section>

        <Section title="Information we collect">
          <p>When you request a quote, book a service, or contact us, we collect:</p>
          <ul className="list-disc pl-5">
            <li>Name, email address, and phone number</li>
            <li>Pickup address, city, and PIN code</li>
            <li>Service details — service type, load size, pickup/delivery dates and times, special instructions</li>
            <li>Messages you send us through the contact form</li>
            <li>Your IP address, recorded against form submissions for fraud and spam prevention</li>
          </ul>
          <p>
            We do not use cookies for advertising or analytics tracking today.
            The site stores only a light/dark theme preference and, for signed-in
            staff, an encrypted admin session — both in your browser, not shared
            with any third party.
          </p>
        </Section>

        <Section title="How we use your information">
          <ul className="list-disc pl-5">
            <li>To respond to quote requests and contact messages</li>
            <li>To schedule and fulfil pickup, cleaning, and delivery of your order</li>
            <li>To send you transactional emails — quote confirmations, booking confirmations, and order status updates</li>
            <li>To detect and prevent spam or fraudulent submissions</li>
          </ul>
          <p>
            We do not sell your personal information, and we do not share it
            with third parties for their own marketing purposes.
          </p>
        </Section>

        <Section title="Who processes your data">
          <p>
            Your information is stored in a Postgres database hosted by
            Supabase. Transactional emails are sent through Resend. Both
            providers process data on our behalf and under our instructions —
            neither uses your information for their own purposes.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            We retain quote requests, orders, and messages for as long as
            needed to provide our services, resolve disputes, and meet legal
            and accounting obligations. You can ask us to delete your
            information at any time; see &quot;Your rights&quot; below.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask us to access, correct, or delete the personal
            information we hold about you, or ask how it&apos;s being used, by
            emailing{" "}
            <a
              href={`mailto:${siteConfig.contact.supportEmail}`}
              className="text-primary hover:underline"
            >
              {siteConfig.contact.supportEmail}
            </a>
            . We&apos;ll respond within a reasonable time.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy as our services change. Material
            changes will be reflected by updating the &quot;Last updated&quot;
            date above.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about this policy or your data can be sent to{" "}
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
