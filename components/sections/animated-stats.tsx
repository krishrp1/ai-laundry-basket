import type { LucideIcon } from "lucide-react";
import { PackageCheck, Smile, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";

export type StatItem = {
  icon: LucideIcon;
  label: string;
  value?: number;
  suffix?: string;
  display?: string;
  decimals?: number;
};

const defaultStats: StatItem[] = [
  {
    icon: Users,
    value: 1000,
    suffix: "+",
    label: "Happy customers",
  },
  {
    icon: Smile,
    value: 98,
    suffix: "%",
    label: "Satisfaction rate",
  },
  {
    icon: PackageCheck,
    value: 10000,
    suffix: "+",
    label: "Orders completed",
  },
];

const gridCols: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

type AnimatedStatsProps = {
  stats?: StatItem[];
};

export function AnimatedStats({ stats = defaultStats }: AnimatedStatsProps) {
  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 gap-8",
            gridCols[stats.length] ?? "sm:grid-cols-3"
          )}
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </span>
              <p className="font-heading text-3xl font-semibold sm:text-4xl">
                {typeof stat.value === "number" ? (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                ) : (
                  stat.display
                )}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
