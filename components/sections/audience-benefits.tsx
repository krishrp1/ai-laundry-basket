import {
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const audiences = [
  {
    icon: User,
    title: "Individuals",
    description:
      "Skip the guesswork on wash settings and never wonder if that silk top can go in with your towels.",
  },
  {
    icon: Users,
    title: "Families",
    description:
      "Bulk wash & fold scheduling with room for everyone's laundry, plus preferences saved to one account.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Skip the dorm laundry room entirely, with student discounts and pickup that fits around class schedules.",
  },
  {
    icon: Building2,
    title: "Businesses",
    description:
      "Recurring service for offices and gyms with consolidated billing and a dashboard to track every order.",
  },
  {
    icon: Hotel,
    title: "Hotels",
    description:
      "Linen turnaround timed to check-in and check-out, so housekeeping is never waiting on laundry.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description:
      "Daily or twice-weekly pickup for aprons, linens, and kitchen towels, priced by weight and frequency.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Facilities",
    description:
      "Hygiene-focused processing for scrubs and patient linens, with reliable recurring pickup schedules.",
  },
];

export function AudienceBenefits() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Built for everyone
          </span>
          <h2 className="mt-3">Benefits that fit how you actually live</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => (
            <Reveal key={audience.title} delay={(i % 4) * 0.05}>
              <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <audience.icon className="size-5" />
                </span>
                <p className="font-medium">{audience.title}</p>
                <p className="text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
