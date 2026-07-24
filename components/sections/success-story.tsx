import { CheckCircle2, Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const results = [
  "Cut weekly laundry coordination time roughly in half",
  "No more last-minute linen shortages between guest turnovers",
  "One shared schedule the whole front-desk team can see",
];

export function SuccessStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <Badge variant="secondary">Success Story</Badge>
          <h2 className="mt-4 text-2xl sm:text-3xl">
            How a small bed and breakfast tamed its linen chaos
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-muted-foreground">
            <p>
              Between guest turnovers, staff schedules, and a shared laundry
              room, keeping linens moving was eating into the team&apos;s
              mornings at Riverside Bed &amp; Breakfast in Portland.
            </p>
            <p>
              After switching to the Commercial Laundry plan, AI Laundry
              Basket started building the wash schedule automatically around
              checkout times and machine availability, and flagging loads
              that needed extra care before they became a problem.
            </p>
          </div>
          <ul className="mt-6 flex flex-col gap-3">
            {results.map((result) => (
              <li key={result} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="relative shadow-xl ring-1 ring-foreground/10">
            <div className="px-(--card-spacing)">
              <Quote className="size-8 text-primary/30" aria-hidden="true" />
              <p className="mt-3 text-lg text-foreground/90">
                We stopped thinking about laundry as a daily fire drill. It
                just runs in the background now, the way it should.
              </p>
            </div>
            <div className="mt-2 flex items-center gap-3 px-(--card-spacing)">
              <Avatar>
                <AvatarFallback className="bg-primary/10 font-heading text-primary">
                  HR
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hannah Reyes</p>
                <p className="text-xs text-muted-foreground">
                  Owner, Riverside Bed &amp; Breakfast
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
