import { Award, MapPin, Rocket, TrendingUp, Users } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const milestones = [
  {
    year: "2022",
    icon: Rocket,
    title: "AI Laundry Basket is founded",
    description:
      "Two co-founders start building a fabric-recognition prototype after one too many laundry mistakes.",
  },
  {
    year: "2023",
    icon: Users,
    title: "First neighborhood pickups",
    description:
      "Wash & Fold and Dry Cleaning launch in Austin with a handful of drivers and a lot of spreadsheets.",
  },
  {
    year: "2024",
    icon: MapPin,
    title: "Expansion to new metro areas",
    description:
      "Service expands into Chicago, Seattle, and Denver, alongside the first Commercial Laundry accounts.",
  },
  {
    year: "2025",
    icon: TrendingUp,
    title: "Commercial accounts take off",
    description:
      "Hotels, gyms, and short-term rental operators join the platform, and the scheduling engine gets a major rebuild.",
  },
  {
    year: "2026",
    icon: Award,
    title: "Same-day service and beyond",
    description:
      "Same-day pickup rolls out in core markets, with more cities and services on the way.",
  },
];

export function CompanyTimeline() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Our journey
          </span>
          <h2 className="mt-3">From one bad wash to a growing service</h2>
        </Reveal>

        <div className="relative mt-14 flex flex-col gap-10">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-5 w-px bg-border sm:left-6"
          />
          {milestones.map((milestone, i) => (
            <Reveal
              key={milestone.year}
              delay={i * 0.08}
              className="relative flex gap-5"
            >
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md sm:size-12">
                <milestone.icon className="size-4 sm:size-5" />
              </span>
              <div className="pt-1">
                <span className="text-sm font-semibold text-primary">
                  {milestone.year}
                </span>
                <h3 className="mt-1 text-lg">{milestone.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
