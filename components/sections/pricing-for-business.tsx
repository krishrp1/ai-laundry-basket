import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  UtensilsCrossed,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const segments = [
  {
    icon: Building2,
    title: "Commercial Laundry",
    description:
      "Custom volume-based pricing for offices, gyms, and salons that need linens, towels, or uniforms on a recurring schedule.",
  },
  {
    icon: Hotel,
    title: "Hotels & Airbnb",
    description:
      "Per-pound linen pricing with guaranteed same-day turnaround built around guest check-in and check-out times.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Laundry",
    description:
      "Daily or twice-weekly pickup for aprons, kitchen towels, and table linens, priced by weight and frequency.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Laundry",
    description:
      "Hygiene-focused processing for scrubs and patient linens, with volume pricing for clinics and care facilities.",
  },
  {
    icon: GraduationCap,
    title: "Student Discounts",
    description:
      "15% off Essential and Premium plans for students with a valid school email, no minimum commitment required.",
  },
  {
    icon: Briefcase,
    title: "Corporate Contracts",
    description:
      "Multi-location contracts with consolidated billing, a dedicated account manager, and custom service levels.",
  },
];

export function PricingForBusiness() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Pricing for every business
        </span>
        <h2 className="mt-3">Built for more than just households</h2>
        <p className="mt-4 text-muted-foreground">
          Every industry has different laundry needs. Here is how pricing
          adapts to yours.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, i) => (
          <Reveal key={segment.title} delay={i * 0.05}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <segment.icon className="size-5" />
              </span>
              <p className="font-medium">{segment.title}</p>
              <p className="flex-1 text-sm text-muted-foreground">
                {segment.description}
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Get a custom quote
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
