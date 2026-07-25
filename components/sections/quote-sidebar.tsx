import Link from "next/link";
import { ClipboardCheck, Mail, Phone, Sparkles, Truck } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Submit your request",
    description: "Tell us what you need and when you need it.",
  },
  {
    icon: Sparkles,
    title: "We confirm the details",
    description:
      "Our team reviews your request and confirms pricing and scheduling.",
  },
  {
    icon: Truck,
    title: "Pickup is scheduled",
    description:
      "A driver arrives during your pickup window and weighs your laundry on the spot — you only pay for actual weight.",
  },
  {
    icon: ClipboardCheck,
    title: "Fresh laundry, delivered",
    description: "Your items come back clean, cared for, and on time.",
  },
];

export function QuoteSidebar() {
  return (
    <div className="flex flex-col gap-5">
      <Reveal>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div>
              <p className="font-heading text-xl font-semibold">
                How it works
              </p>
              <p className="mt-1 text-base text-muted-foreground">
                Here is what happens after you submit this form.
              </p>
            </div>

            <ol className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <p className="text-lg font-medium">Prefer to talk it through?</p>
            <div className="flex flex-col gap-3 text-base">
              <Link
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
              >
                <Phone className="size-5 text-primary" />
                {siteConfig.contact.phone}
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-5 text-primary" />
                {siteConfig.contact.email}
              </Link>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              Submitting this form does not book a pickup. We will follow up
              to confirm details before anything is scheduled or charged.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
