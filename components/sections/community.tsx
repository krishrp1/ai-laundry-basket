import { Gift, HandHeart, Users } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const programs = [
  {
    icon: HandHeart,
    title: "Community wash days",
    description:
      "Local shelters and community organizations can request free wash cycles for donated clothing and bedding.",
  },
  {
    icon: Gift,
    title: "Seasonal donation drives",
    description:
      "Coat and blanket collection drives run each winter in every metro area we serve.",
  },
  {
    icon: Users,
    title: "Student move-out program",
    description:
      "Partnering with local housing communities to collect and redistribute items during move-out season.",
  },
];

export function Community() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Community involvement
        </span>
        <h2 className="mt-3">AI Laundry Basket gives back</h2>
        <p className="mt-4 text-muted-foreground">
          Clean clothes are a basic need, not a luxury. Where we operate, we
          look for small, practical ways to support that.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {programs.map((program, i) => (
          <Reveal key={program.title} delay={i * 0.08}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
              <span className="mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <program.icon className="size-5" />
              </span>
              <p className="font-medium">{program.title}</p>
              <p className="text-sm text-muted-foreground">
                {program.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
