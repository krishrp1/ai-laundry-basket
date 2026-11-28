import Link from "next/link";

import { footerNav, siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { SocialIcon } from "@/components/icons/social-icon";
import { Brand } from "@/components/layout/brand";

export function Footer() {
  const year = new Date().getFullYear();
  const { legal, contact } = siteConfig;
  // Accounts aren't live yet — don't render dead "#" links.
  const configuredSocialLinks = socialLinks.filter((social) => social.href !== "#");

  return (
    <footer data-hide-floating className="dark w-full bg-background text-foreground">
      <div className="container-wide border-t border-border py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-block rounded-full">
              <Brand />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>

            <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1.5 flex flex-col">
                  <a href={`mailto:${contact.email}`} className="inline-flex min-h-9 items-center break-all hover:underline">
                    {contact.email}
                  </a>
                  <a href={`mailto:${contact.supportEmail}`} className="inline-flex min-h-9 items-center break-all text-muted-foreground hover:text-foreground hover:underline">
                    {contact.supportEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Hours</dt>
                {contact.hours.map((entry) => (
                  <dd key={entry.day} className="mt-1.5">
                    {entry.day}
                    <br />
                    <span className="text-muted-foreground">{entry.time}</span>
                  </dd>
                ))}
              </div>
            </dl>

            {configuredSocialLinks.length > 0 && (
              <div className="mt-8 flex items-center gap-3">
                {configuredSocialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h2 className="eyebrow">{group.title}</h2>
              <ul className="mt-3 flex flex-col">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <p>
            &copy; {year} {legal.entityName ?? siteConfig.name}. All rights reserved.
          </p>
          <p className="sm:max-w-md sm:text-right">
            {legal.registeredAddress ? `${legal.registeredAddress}. ` : ""}
            {legal.gstin ? `GSTIN: ${legal.gstin}. ` : ""}
            {contact.addressLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
