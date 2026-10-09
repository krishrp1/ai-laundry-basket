import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `What ${siteConfig.name} stores in your browser, and why.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy">
      <LegalSection title="Short version">
        <p>
          This site does not use advertising, analytics, or tracking cookies,
          and it does not load third-party scripts, embedded maps, or videos.
          Because we store nothing in your browser except the items below,
          which are needed to run the site or to remember a choice you made,
          we do not show a cookie consent banner.
        </p>
      </LegalSection>

      <LegalSection title="What your browser stores">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left">
            <caption className="sr-only">
              Items this site stores in your browser
            </caption>
            <thead>
              <tr className="border-b border-border text-foreground">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Name
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Purpose
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Who gets it
                </th>
                <th scope="col" className="py-2 font-medium">
                  Lasts
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-border">
                <th scope="row" className="py-2 pr-4 font-normal">
                  <code>theme</code> (local storage)
                </th>
                <td className="py-2 pr-4">
                  Remembers whether you chose light or dark mode. Only saved if
                  you use the theme switch.
                </td>
                <td className="py-2 pr-4">Stays in your browser</td>
                <td className="py-2">Until you clear site data</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 pr-4 font-normal">
                  <code>admin_session</code> (cookie)
                </th>
                <td className="py-2 pr-4">
                  Keeps our staff signed in to the admin area. Set only when
                  staff log in; visitors never receive it.
                </td>
                <td className="py-2 pr-4">Only us</td>
                <td className="py-2">Until sign-out or expiry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="Fonts and other resources">
        <p>
          Fonts and images are served from this site itself. Your browser does
          not contact Google or other font or content networks when you view
          our pages. Links to WhatsApp or social media only leave this site if
          you click them.
        </p>
      </LegalSection>

      <LegalSection title="Controlling storage">
        <p>
          You can clear or block cookies and site data in your browser
          settings. The public pages keep working; the theme will simply reset
          to light.
        </p>
      </LegalSection>

      <LegalSection title="If this changes">
        <p>
          If we ever add analytics or any other non-essential storage, we will
          update this page and ask for your consent before it starts. See our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          for how we handle personal data.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
