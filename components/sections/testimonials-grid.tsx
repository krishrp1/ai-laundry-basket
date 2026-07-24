import { Reveal } from "@/components/motion/reveal";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/sections/testimonial-card";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    city: "Austin, TX",
    service: "Wash & Fold",
    rating: 5,
    quote:
      "AI Laundry Basket has genuinely given me back my Sunday afternoons. I drop everything in and it tells me exactly how to handle each load.",
  },
  {
    name: "James Okafor",
    city: "Chicago, IL",
    service: "Dry Cleaning",
    rating: 5,
    quote:
      "The care instructions caught a wool blazer I would have definitely ruined in a normal wash. Small thing, but it saved an expensive jacket.",
  },
  {
    name: "Priya Natarajan",
    city: "Seattle, WA",
    service: "Commercial Laundry",
    rating: 5,
    quote:
      "We run a boutique gym and the commercial plan keeps our towel rotation on schedule without anyone having to think about it.",
  },
  {
    name: "Daniel Brooks",
    city: "Denver, CO",
    service: "Pickup & Delivery",
    rating: 4,
    quote:
      "Scheduling used to eat into my mornings. Now it just tells me the best pickup window and I am done.",
  },
  {
    name: "Maria Gonzalez",
    city: "Miami, FL",
    service: "Stain Treatment",
    rating: 5,
    quote:
      "It flagged a wine stain on a tablecloth before it set in. That alone made the plan worth it for the year.",
  },
  {
    name: "Tyler Anderson",
    city: "Nashville, TN",
    service: "Wash & Fold",
    rating: 5,
    quote:
      "Simple and fast, and it actually explains why it is recommending a setting instead of just guessing for me.",
  },
  {
    name: "Aisha Bello",
    city: "Minneapolis, MN",
    service: "Ironing & Pressing",
    rating: 5,
    quote:
      "My shirts finally come out crease-free without me standing over an iron every morning before work.",
  },
  {
    name: "Ethan Walsh",
    city: "Phoenix, AZ",
    service: "Wash & Fold",
    rating: 4,
    quote:
      "I travel constantly for work, so having a system that keeps laundry organized between trips has been a real relief.",
  },
  {
    name: "Grace Kim",
    city: "Boston, MA",
    service: "Dry Cleaning",
    rating: 5,
    quote:
      "The fabric care tips are genuinely useful, not generic. It knows the difference between silk and a polyester blend.",
  },
  {
    name: "Marcus Delgado",
    city: "Raleigh, NC",
    service: "Commercial Laundry",
    rating: 5,
    quote:
      "We manage a small rental portfolio and the scheduling keeps linens turning over between guests without extra staff time.",
  },
  {
    name: "Olivia Bennett",
    city: "San Diego, CA",
    service: "Pickup & Delivery",
    rating: 5,
    quote:
      "Support answered a scheduling question in minutes. It is a small touch, but it is the kind of thing that builds trust.",
  },
  {
    name: "Noah Fischer",
    city: "Portland, OR",
    service: "Stain Treatment",
    rating: 5,
    quote:
      "Caught a grass stain on my kid's uniform before it set in. First app that has actually saved a piece of clothing for us.",
  },
];

export function TestimonialsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">Reviews</span>
        <h2 className="mt-3">What customers are saying</h2>
        <p className="mt-4 text-muted-foreground">
          A sample of feedback from households and businesses using AI
          Laundry Basket across the country.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {testimonials.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={(i % 4) * 0.06}>
            <TestimonialCard {...testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
