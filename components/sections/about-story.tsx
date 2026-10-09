import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export function AboutStory() {
  return (
    <section
      id="our-story"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
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

      </div>
    </section>
  );
}
