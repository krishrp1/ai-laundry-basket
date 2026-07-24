import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { faqCategories } from "@/components/sections/faq-accordion";

export function FaqHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <div className="size-[26rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Badge variant="secondary">FAQ</Badge>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            Answers to your laundry day questions
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Everything you need to know about pricing, pickup and delivery,
            dry cleaning, subscriptions, and more. Cannot find what you are
            looking for? Reach out at the bottom of the page.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {faqCategories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              render={<Link href={`#${category.id}`} />}
              className="gap-1.5"
            >
              <category.icon className="size-3" />
              {category.title}
            </Badge>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
