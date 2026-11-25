import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { footerNav, siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { SocialIcon } from "@/components/icons/social-icon";
import { Separator } from "@/components/ui/separator";
import { Brand } from "@/components/layout/brand";

export function Footer() {
  const year = new Date().getFullYear();
  const { legal } = siteConfig;
  // Accounts aren't live yet — don't render dead "#" links.
  const configuredSocialLinks = socialLinks.filter((social) => social.href !== "#");

  return (
    <footer className="w-full border-t bg-card">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Brand />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm">
              <Link
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {siteConfig.contact.phone}
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-4 text-primary" />
                {siteConfig.contact.email}
              </Link>
            </div>

            {configuredSocialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {configuredSocialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="font-sans text-sm font-semibold sm:text-sm">
                {group.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <p>
            &copy; {year} {legal.entityName ?? siteConfig.name}. All rights
            reserved.
          </p>
          <p className="sm:max-w-md sm:text-right">
            {legal.registeredAddress ? `${legal.registeredAddress}. ` : ""}
            {legal.gstin ? `GSTIN: ${legal.gstin}. ` : ""}
            {siteConfig.contact.addressLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
