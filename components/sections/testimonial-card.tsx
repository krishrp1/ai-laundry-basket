import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function initialsFrom(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export type Testimonial = {
  name: string;
  city: string;
  service: string;
  quote: string;
  rating: number;
};

export function TestimonialCard({
  name,
  city,
  service,
  quote,
  rating,
}: Testimonial) {
  return (
    <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 font-heading text-primary">
                {initialsFrom(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{city}</p>
            </div>
          </div>
          <Badge variant="outline" className="shrink-0">
            {service}
          </Badge>
        </div>

        <div
          className="flex gap-0.5 text-primary"
          role="img"
          aria-label={`Rated ${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className="size-3.5"
              fill={idx < rating ? "currentColor" : "none"}
            />
          ))}
        </div>

        <p className="flex-1 text-sm text-foreground/90">
          &ldquo;{quote}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}
