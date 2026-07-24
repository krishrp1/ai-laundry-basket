import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const stories = [
  {
    feature: "Live Order Tracking",
    quote:
      "I can see exactly where an order is without calling anyone. That alone changed how I manage linens across four rental units.",
    name: "Devon Marsh",
    role: "Property manager",
    initials: "DM",
  },
  {
    feature: "Same-Day Express",
    quote:
      "I needed a suit back the same day for a flight, and express delivery actually delivered, with no last-minute surprises.",
    name: "Isabel Cruz",
    role: "Premium plan customer",
    initials: "IC",
  },
  {
    feature: "Eco-Friendly Cleaning",
    quote:
      "The fragrance-free detergent option was exactly what my family needed, and I did not have to call and ask for it twice.",
    name: "Wes Thornton",
    role: "Family plan customer",
    initials: "WT",
  },
  {
    feature: "Business Dashboard",
    quote:
      "Seeing billing and pickups in one dashboard instead of a dozen texts has saved my front desk hours every month.",
    name: "Naomi Chen",
    role: "Boutique gym owner",
    initials: "NC",
  },
  {
    feature: "Real-Time Notifications",
    quote:
      "Getting a text when my driver is five minutes out means I am never standing around waiting for a pickup.",
    name: "Jordan Patel",
    role: "Essential plan customer",
    initials: "JP",
  },
];

export function FeatureTestimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          In their words
        </span>
        <h2 className="mt-3">Real feedback on the features that matter</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, i) => (
          <Reveal key={story.name} delay={(i % 3) * 0.06}>
            <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
              <CardContent className="flex h-full flex-col gap-4">
                <Badge variant="outline" className="w-fit">
                  Feature: {story.feature}
                </Badge>

                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="size-3.5 fill-current" />
                  ))}
                </div>

                <p className="flex-1 text-sm text-foreground/90">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary/10 font-heading text-primary">
                      {story.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{story.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
