import { Star, StarHalf } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "Doorstep pickup makes this so easy. I schedule it around my work week and don't think about laundry otherwise.",
    name: "Priya M.",
    role: "Jayanagar",
    initials: "PM",
    rating: 5,
  },
  {
    quote:
      "Booking took two minutes and my clothes came back properly cared for. Simple process, no back and forth.",
    name: "Arjun K.",
    role: "Banashankari",
    initials: "AK",
    rating: 4.5,
  },
  {
    quote:
      "Had to reschedule a pickup last minute and support sorted it out quickly. Delivery was still on time.",
    name: "Sneha R.",
    role: "JP Nagar",
    initials: "SR",
    rating: 5,
  },
  {
    quote:
      "Pricing was clear before I booked, and the final bill matched. No surprises at delivery.",
    name: "Rohit N.",
    role: "BTM Layout",
    initials: "RN",
    rating: 4.5,
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex gap-0.5 text-primary">
      {Array.from({ length: 5 }).map((_, idx) => {
        if (idx < fullStars) {
          return <Star key={idx} className="size-3.5 fill-current" />;
        }
        if (idx === fullStars && hasHalfStar) {
          return <StarHalf key={idx} className="size-3.5 fill-current" />;
        }
        return <Star key={idx} className="size-3.5 text-muted-foreground/30" />;
      })}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Customer feedback
          </span>
          <h2 className="mt-3">Loved by people who hate laundry day</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.06}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardContent className="flex h-full flex-col gap-4">
                  <StarRating rating={testimonial.rating} />
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
