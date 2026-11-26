import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export function ContactInfo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">Get in touch</span>
        <h2 className="mt-3">Contact information</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={0.06}>
          <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
            <CardContent className="flex h-full flex-col gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <p className="font-medium">Email us</p>
              <p className="text-sm text-muted-foreground">
                For questions, quotes, or account help. We reply within one
                business day.
              </p>
              <div className="mt-auto flex flex-col gap-0.5">
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </Link>
                <Link
                  href={`mailto:${siteConfig.contact.supportEmail}`}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  Support: {siteConfig.contact.supportEmail}
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
            <CardContent className="flex h-full flex-col gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </span>
              <p className="font-medium">Where we operate</p>
              <p className="text-sm text-muted-foreground">
                We don&apos;t have a public storefront yet — every order is
                picked up and delivered directly to your door.
              </p>
              <p className="mt-auto text-sm font-medium">
                {siteConfig.contact.addressLine}
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.18}>
          <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
            <CardContent className="flex h-full flex-col gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="size-5" />
              </span>
              <p className="font-medium">Operating hours</p>
              <ul className="mt-auto flex flex-col gap-1.5 text-sm text-muted-foreground">
                {siteConfig.contact.hours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span className="font-medium text-foreground">
                      {entry.time}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.24}>
          <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
            <CardContent className="flex h-full flex-col gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </span>
              <p className="font-medium">Service areas</p>
              <p className="text-sm text-muted-foreground">
                Currently serving these metro areas, with more on the way.
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {siteConfig.contact.serviceAreas.map((area) => (
                  <Badge key={area} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
