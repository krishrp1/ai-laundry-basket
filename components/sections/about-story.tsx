import { Layers, Quote, ScanEye, Sparkles, Timer } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

const stats = [
  { icon: ScanEye, label: "Fabric types recognized", value: "50+" },
  { icon: Layers, label: "Wash programs supported", value: "200+" },
  { icon: Timer, label: "Average setup time", value: "2 min" },
  { icon: Sparkles, label: "Automatic scheduling", value: "24/7" },
];

export function AboutStory() {
  return (
    <section
      id="our-story"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Reveal className="flex flex-col gap-4 text-muted-foreground">
          <span className="text-sm font-semibold text-primary">
            Our story
          </span>
          <h2 className="text-2xl sm:text-3xl">
            Built in Bengaluru, for busy households
          </h2>
          <p>
            A&I Laundry Basket was founded by {siteConfig.business.ownerName}{" "}
            with the vision of making professional laundry services more
            convenient, reliable, and accessible across Bengaluru.
          </p>
          <p>
            Day-to-day operations and customer relations are managed by{" "}
            {siteConfig.business.opsName}, ensuring every customer receives
            prompt support and high-quality service.
          </p>

          <Card className="mt-2 flex-row items-start gap-4 p-5">
            <Quote
              className="size-6 shrink-0 text-primary/40"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm text-foreground/90 italic">
                We wanted laundry day to feel like it&apos;s already taken
                care of, not another thing on your list.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary/10 font-heading text-primary">
                    RP
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {siteConfig.business.ownerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {siteConfig.business.ownerRole}, A&I Laundry Basket
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="shadow-xl ring-1 ring-foreground/10">
            <div className="px-(--card-spacing)">
              <p className="text-sm font-medium">By the numbers</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 px-(--card-spacing)">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 rounded-lg bg-muted/60 p-4"
                >
                  <span className="flex size-8 items-center justify-center rounded-md bg-background text-primary">
                    <stat.icon className="size-4" />
                  </span>
                  <span className="font-heading text-xl font-semibold">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
