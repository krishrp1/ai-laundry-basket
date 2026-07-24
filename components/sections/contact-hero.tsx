import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const quickActions = [
  {
    icon: Phone,
    label: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "Message us below",
    href: "#contact-form",
  },
];

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <div className="size-[26rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Badge variant="secondary">Contact</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            We are here to help with laundry day
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Questions about an order, a commercial account, or just want a
            quote? Reach us however is easiest, and a real person will get
            back to you.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              render={<Link href={action.href} />}
              className="gap-1.5"
            >
              <action.icon className="size-4" />
              {action.label}
            </Button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
