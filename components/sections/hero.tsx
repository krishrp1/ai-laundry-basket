import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrushStroke } from "@/components/brand/brush-stroke";
import { Button } from "@/components/ui/button";
import { serviceRates } from "@/components/sections/rates";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, MINIMUM_ORDER_VALUE } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";

const facts = [
  `Free delivery from ${formatINR(FREE_DELIVERY_THRESHOLD)}, otherwise ${formatINR(DELIVERY_FEE)}`,
  `Minimum order ${formatINR(MINIMUM_ORDER_VALUE)}`,
  "Usually back in 2 to 3 business days",
  `${siteConfig.contact.hours[0].time}, every day`,
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-background">
      <div className="container-wide grid items-center gap-12 pt-10 pb-14 sm:pt-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pt-20 lg:pb-20">
        <div className="relative">
          {/* The signature stroke sits behind the headline; the headline inverts where it crosses. */}
          <BrushStroke
            id="hero-stroke"
            reveal="load"
            sheen
            viewBox="0 0 1600 760"
            width={200}
            seed={11}
            splatter={30}
            dryFrom={0.8}
            spine={[[[150, 600], [520, 330], [1080, 170], [1560, 360]]]}
            className="absolute top-[-4%] -left-[30%] -z-10 w-[165%] max-w-none text-foreground sm:top-[-4%] sm:-left-[18%] sm:w-[135%] lg:top-[-6%] lg:-left-[10%] lg:w-[128%]"
          />
          <p className="eyebrow hero-line" style={{ "--d": 0 } as React.CSSProperties}>
            Doorstep laundry · South Bengaluru
          </p>
          <h1
            id="hero-title"
            className="ink-invert mt-6 text-[clamp(2.9rem,5.8vw,5.4rem)] leading-[0.98] font-medium tracking-[-0.045em] lg:[&>span]:whitespace-nowrap"
          >
            <span className="hero-line block" style={{ "--d": 1 } as React.CSSProperties}>Fresh laundry,</span>
            <span className="hero-line block" style={{ "--d": 2 } as React.CSSProperties}>without leaving</span>
            <span className="hero-line block" style={{ "--d": 3 } as React.CSSProperties}>home.</span>
          </h1>

          <p className="hero-line mt-8 max-w-md text-lg text-muted-foreground" style={{ "--d": 4 } as React.CSSProperties}>
            We collect from your door, wash, iron or dry clean everything with care, and bring it
            back folded. You see the price before you book.
          </p>

          <div className="hero-line mt-9 flex flex-wrap gap-3" style={{ "--d": 5 } as React.CSSProperties}>
            <Button size="lg" className="h-12 px-6" render={<Link href="/quote" />}>
              Request a pickup <ArrowRight aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 bg-transparent px-6" render={<Link href="/#how-it-works" />}>
              How it works
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="hero-photo photo relative aspect-[4/5] rounded-[1.25rem]">
            <Image
              src="/images/hero-drape.webp"
              alt="Soft cream fabric falling in loose folds."
              fill
              priority
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
              className="object-cover"
            />
          </div>

          {/* Glass rate card: a quick answer to "what does it cost?" without leaving the hero. */}
          <div className="glass hero-line absolute -bottom-6 left-4 w-[min(19rem,calc(100%-2rem))] rounded-2xl p-5 sm:-left-10 lg:-left-16" style={{ "--d": 6 } as React.CSSProperties}>
            <p className="eyebrow">Rate card</p>
            <dl className="mt-3 flex flex-col gap-1.5 text-sm">
              {serviceRates.map((rate) => (
                <div key={rate.key} className="flex items-baseline justify-between gap-3">
                  <dt>{rate.label}</dt>
                  <dd className="font-heading font-medium tabular-nums">
                    {rate.price} <span className="text-xs font-normal text-muted-foreground">{rate.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/pricing#price-estimator"
              className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Estimate your order <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <ul className="container-wide hero-line flex flex-wrap gap-x-8 gap-y-2 border-t border-border py-5 text-sm text-muted-foreground" style={{ "--d": 7 } as React.CSSProperties}>
        {facts.map((fact) => (
          <li key={fact} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}
