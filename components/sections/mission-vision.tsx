import { Target, Telescope } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export function MissionVision() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
              <CardContent className="flex h-full flex-col gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <Target className="size-5" />
                </span>
                <h2 className="text-xl sm:text-2xl">Our mission</h2>
                <p className="text-muted-foreground">
                  Remove the guesswork from laundry for every household and
                  business we serve, by pairing AI-driven sorting and
                  scheduling with a team that genuinely cares about the
                  clothes and linens in its care.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="group h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
              <CardContent className="flex h-full flex-col gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                  <Telescope className="size-5" />
                </span>
                <h2 className="text-xl sm:text-2xl">Our vision</h2>
                <p className="text-muted-foreground">
                  A future where laundry day is not a day at all, where
                  sorting, care decisions, and scheduling happen quietly in
                  the background, and the only thing left for you to do is
                  put clean clothes away.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
