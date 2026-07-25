import Link from "next/link";
import { Mail, Phone, WashingMachine } from "lucide-react";

import { footerNav, siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { SocialIcon } from "@/components/icons/social-icon";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WashingMachine className="size-4.5" aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Founded by {siteConfig.business.ownerName}.
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

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
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
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
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

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with care for fresher, easier laundry days.
          </p>
        </div>
      </div>
    </footer>
  );
}
