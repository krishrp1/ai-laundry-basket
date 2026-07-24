import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type MockItem = {
  icon: LucideIcon;
  text: string;
};

type ServiceBlockProps = {
  index: number;
  eyebrow?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  mockLabel: string;
  mockItems: MockItem[];
  reverse?: boolean;
  useCase?: string;
  whyItMatters?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function ServiceBlock({
  index,
  eyebrow = "Service",
  icon: Icon,
  title,
  description,
  benefits,
  mockLabel,
  mockItems,
  reverse = false,
  useCase,
  whyItMatters,
  ctaLabel,
  ctaHref,
}: ServiceBlockProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        <span className="text-sm font-semibold text-primary">
          {eyebrow} {String(index).padStart(2, "0")}
        </span>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
        </div>
        <p className="mt-4 text-muted-foreground">{description}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {useCase && (
          <div className="mt-5 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
            <span className="font-medium text-foreground">Example: </span>
            <span className="text-muted-foreground">{useCase}</span>
          </div>
        )}

        {whyItMatters && (
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Why it matters:{" "}
            </span>
            {whyItMatters}
          </p>
        )}

        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </Reveal>

      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        <Card className="shadow-xl ring-1 ring-foreground/10">
          <div className="flex items-center justify-between px-(--card-spacing)">
            <p className="text-sm font-medium">{mockLabel}</p>
            <Badge variant="secondary">Live</Badge>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 px-(--card-spacing)">
            {mockItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2.5 rounded-lg bg-muted/60 px-3 py-2.5"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-background text-primary">
                  <item.icon className="size-4" />
                </span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
