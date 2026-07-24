import { Layers, Quote, ScanEye, Sparkles, Timer } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";

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
            From a ruined sweater to a smarter way to wash
          </h2>
          <p>
            AI Laundry Basket started with a laundry disaster. Our founders
            were running a small tech consultancy together when a client
            meeting outfit came out of the dryer three sizes smaller than it
            went in. The care label had been right there the whole time. It
            just was not read.
          </p>
          <p>
            That small, avoidable mistake turned into a bigger question:
            laundry is one of the few household and business tasks that has
            barely changed in decades, while almost everything around it has
            gotten smarter. Machines got more efficient, but the decisions
            before the wash, what to separate, what temperature, what needs
            special care, were still left entirely to guesswork.
          </p>
          <p>
            So we built the thing we wished existed: a system that looks at
            what is actually in the load, cross-references fabric and care
            information, and turns that into a plan, not just a suggestion.
            From there, it was a short step to asking the same question
            about the rest of laundry day: when to wash, how to schedule
            pickups, how to keep a hotel&apos;s linens or a gym&apos;s
            towels moving without anyone thinking about it. AI Laundry
            Basket grew into a full service built around that one idea, let
            the software handle the guesswork, and let people handle the
            parts that actually need a human touch.
          </p>
          <p>
            Today that means real drivers, real wash specialists, and real
            support staff, backed by sorting and scheduling technology that
            gets a little sharper with every order.
          </p>

          <Card className="mt-2 flex-row items-start gap-4 p-5">
            <Quote
              className="size-6 shrink-0 text-primary/40"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm text-foreground/90 italic">
                We did not set out to build a laundry company. We set out to
                fix one bad habit, guessing, and it turned out that fixing it
                properly meant building the company around it.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary/10 font-heading text-primary">
                    MC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Maya Chen</p>
                  <p className="text-xs text-muted-foreground">
                    Co-Founder & CEO, AI Laundry Basket
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
