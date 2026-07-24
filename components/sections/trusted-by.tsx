import {
  Briefcase,
  Building2,
  Dumbbell,
  GraduationCap,
  Hotel,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const segments = [
  { icon: Hotel, label: "Boutique Hotels" },
  { icon: Building2, label: "Property Management" },
  { icon: Users, label: "Coworking Spaces" },
  { icon: Dumbbell, label: "Fitness & Wellness Studios" },
  { icon: GraduationCap, label: "University Housing" },
  { icon: Briefcase, label: "Corporate Offices" },
];

export function TrustedBy() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold text-primary">
            Trusted across industries
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl">
            Businesses that cannot afford laundry day surprises
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {segments.map((segment, i) => (
            <Reveal
              key={segment.label}
              delay={i * 0.05}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <segment.icon className="size-5" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {segment.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
