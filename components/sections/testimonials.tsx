import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "I used to lose an hour every week just figuring out wash settings. Now I glance at my phone and go.",
    name: "Priya S.",
    role: "Busy parent, early access user",
    initials: "PS",
  },
  {
    quote:
      "It flagged a red shirt bleeding onto my whites before I made the mistake. Worth it for that alone.",
    name: "Marcus T.",
    role: "Grad student, early access user",
    initials: "MT",
  },
  {
    quote:
      "Scheduling laundry around shared building machines used to be a nightmare. Now it just happens automatically.",
    name: "Elena R.",
    role: "Apartment dweller, early access user",
    initials: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Early feedback
          </span>
          <h2 className="mt-3">Loved by people who hate laundry day</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.08}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm text-foreground/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar size="sm">
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
