import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard, coreServices } from "@/components/sections/service-card";

export function ServicesTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          What we offer
        </span>
        <h2 className="mt-3">Everything your laundry needs</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {coreServices.map((service, i) => (
          <ServiceCard key={service.title} service={service} delay={i * 0.06} />
        ))}
      </div>

      <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" render={<Link href="/quote" />} className="gap-1.5">
          Get Instant Quote
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/services" />}>
          View all services
        </Button>
      </Reveal>
    </section>
  );
}
