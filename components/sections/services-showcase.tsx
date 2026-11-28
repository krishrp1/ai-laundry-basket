import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BrushStroke } from "@/components/brand/brush-stroke";
import { serviceRates } from "@/components/sections/rates";
import type { ServiceKey } from "@/config/pricing";
import { cn } from "@/lib/utils";

const photos: Record<ServiceKey, { src: string; alt: string }> = {
  wash_fold: { src: "/images/wash-fold.webp", alt: "Stacks of crisply folded white linen." },
  wash_iron: { src: "/images/wash-iron.webp", alt: "Pressed shirt collars on wooden hangers." },
  steam_iron: { src: "/images/steam-iron.webp", alt: "A steam iron standing upright on an ironing board." },
  dry_cleaning: { src: "/images/dry-cleaning.webp", alt: "Jackets and shirts hanging on a rail." },
};

/**
 * Every service as a large editorial row: photograph, name, description, live price and
 * a link that opens the pickup form with the service chosen. Rows alternate sides.
 */
export function ServicesShowcase() {
  return (
    <ol className="flex flex-col gap-20 lg:gap-28">
      {serviceRates.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <li key={service.key} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div
              className={cn(
                "photo relative rounded-2xl",
                i % 2 === 0 ? "aspect-[4/3]" : "aspect-[4/5] lg:aspect-[5/6]",
                flip ? "lg:order-2 lg:col-span-5 lg:col-start-8" : "lg:col-span-7",
              )}
              data-reveal-content
            >
              <Image
                src={photos[service.key].src}
                alt={photos[service.key].alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className={cn(flip ? "lg:order-1 lg:col-span-6 lg:col-start-1" : "lg:col-span-5")}>
              <p className="eyebrow tabular-nums" data-reveal-content>
                {String(i + 1).padStart(2, "0")} / {String(serviceRates.length).padStart(2, "0")}
              </p>
              <h3
                className="mt-4 font-heading text-4xl font-medium tracking-[-0.03em] sm:text-5xl"
                data-reveal-content
                style={{ "--d": 1 } as CSSProperties}
              >
                {service.label}
              </h3>
              <p className="mt-4 max-w-md text-lg text-muted-foreground" data-reveal-content style={{ "--d": 2 } as CSSProperties}>
                {service.description}{" "}
                {service.model === "per_kg"
                  ? "Billed on the weight measured at pickup."
                  : "Billed by the number of garments."}
              </p>

              <div className="relative mt-8 w-fit" data-reveal-content style={{ "--d": 3 } as CSSProperties}>
                <p className="font-heading text-5xl font-medium tracking-[-0.03em] tabular-nums">
                  {service.price}
                  <span className="ml-2 align-middle text-base font-normal tracking-normal text-muted-foreground">
                    {service.unit}
                  </span>
                </p>
                <BrushStroke
                  id={`svc-${service.key}`}
                  reveal="hover"
                  viewBox="0 0 600 60"
                  width={16}
                  seed={21 + i}
                  splatter={0}
                  dryFrom={0.5}
                  spine={[[[10, 38], [180, 22], [400, 46], [590, 26]]]}
                  className="absolute -bottom-3 left-0 w-full text-foreground"
                />
              </div>

              <Link
                href={`/quote?service=${encodeURIComponent(service.label)}`}
                className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-foreground pb-1 font-medium"
                data-reveal-content
                style={{ "--d": 4 } as CSSProperties}
              >
                Request {service.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
