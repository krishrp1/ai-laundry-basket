import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  useCase: string;
  whyItMatters: string;
  ctaLabel: string;
  ctaHref: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  benefits,
  useCase,
  whyItMatters,
  ctaLabel,
  ctaHref,
}: Feature) {
  return (
    <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
      <CardContent className="flex h-full flex-col gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
          <Icon className="size-5" />
        </span>

        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>

        <ul className="flex flex-col gap-1.5">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 border-t border-border pt-3 text-xs">
          <p>
            <span className="font-medium text-foreground">Example: </span>
            <span className="text-muted-foreground">{useCase}</span>
          </p>
          <p>
            <span className="font-medium text-foreground">
              Why it matters:{" "}
            </span>
            <span className="text-muted-foreground">{whyItMatters}</span>
          </p>
        </div>

        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {ctaLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
