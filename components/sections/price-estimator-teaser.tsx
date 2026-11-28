"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedNumber } from "@/components/effects";
import { LoadStack } from "@/components/estimator/load-stack";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { computeEstimate, type PriceBreakdown } from "@/lib/pricing-engine";
import { loadPresets, serviceByKey, type ServiceKey } from "@/config/pricing";
import { cn } from "@/lib/utils";

const perKgServices = (["wash_fold", "wash_iron"] as const).map((key) => serviceByKey[key]);

/** Every per-kg service × load preset, priced once by the real pricing engine (nothing hardcoded). */
const estimates = Object.fromEntries(
  perKgServices.map((service) => [
    service.key,
    Object.fromEntries(
      loadPresets.map((preset) => {
        const result = computeEstimate({ serviceType: service.key, orderType: "weight", weightKg: preset.weightKg });
        return [preset.key, result.ok ? result.breakdown : null];
      }),
    ),
  ]),
) as Record<"wash_fold" | "wash_iron", Record<string, PriceBreakdown | null>>;

export function PriceEstimatorTeaser() {
  const [serviceKey, setServiceKey] = useState<"wash_fold" | "wash_iron">("wash_fold");
  const [presetKey, setPresetKey] = useState(loadPresets[1]!.key);
  const preset = loadPresets.find((p) => p.key === presetKey) ?? loadPresets[0]!;
  const service = serviceByKey[serviceKey as ServiceKey];
  const b = estimates[serviceKey][preset.key];
  const rate = service.perKgRate!.default;

  const bookHref = `/quote?${new URLSearchParams({ service: service.label, weight: preset.quoteTier })}`;

  return (
    <section aria-labelledby="estimate-title" className="relative overflow-hidden">
      <div className="container-wide section-y grid gap-14 lg:grid-cols-12 lg:gap-12 lg:py-32">
        <div className="lg:col-span-6">
          <p className="eyebrow" data-reveal-content>Price calculator</p>
          <h2 id="estimate-title" className="mt-4" data-reveal-content>What will a load cost?</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground" data-reveal-content>
            Choose a service and the size closest to yours. We weigh your laundry at pickup, and
            that weight sets the final price.
          </p>

          <fieldset className="mt-10">
            <legend className="text-sm font-medium">Service</legend>
            <div className="mt-3 inline-flex rounded-full border border-border bg-card p-1">
              {perKgServices.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={serviceKey === s.key}
                  onClick={() => setServiceKey(s.key as "wash_fold" | "wash_iron")}
                  className={cn(
                    "min-h-10 rounded-full px-5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    serviceKey === s.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label} · {formatINR(s.perKgRate!.default)}/kg
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">How much laundry?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {loadPresets.map((p, i) => {
                const active = p.key === preset.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPresetKey(p.key)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      active ? "border-foreground bg-card" : "border-border hover:border-foreground/40 hover:bg-card",
                    )}
                  >
                    <LoadStack level={i} active={active} />
                    <span>
                      <span className="block font-medium">{p.label}</span>
                      <span className="block text-sm text-muted-foreground">{p.sublabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:self-center">
          {/* Pearls give the glass something to refract. */}
          <span aria-hidden="true" className="pearl -top-12 -left-6 size-44 sm:-left-12 sm:size-56" />
          <span aria-hidden="true" className="pearl top-[38%] -right-6 size-36 sm:-right-12 sm:size-48" />
          <span aria-hidden="true" className="pearl -bottom-10 left-[38%] size-32" />

          <div className="glass relative rounded-[1.75rem] p-6 sm:p-8" aria-live="polite">
            <p className="eyebrow">Your estimate</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {service.label}, {preset.label.toLowerCase()} (about {preset.weightKg} kg)
            </p>
            <p className="mt-1 font-heading text-6xl font-medium tracking-[-0.04em] tabular-nums sm:text-7xl">
              {b ? <AnimatedNumber value={formatINR(b.grandTotal)} locale="en-IN" /> : "—"}
            </p>

            {b && (
              <dl className="mt-6 flex flex-col divide-y divide-border border-y border-border text-sm">
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted-foreground">{preset.weightKg} kg × {formatINR(rate)}</dt>
                  <dd className="tabular-nums">{formatINR(b.weightAmount)}</dd>
                </div>
                {b.minimumOrderAdjustment > 0 && (
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">Minimum-order top-up</dt>
                    <dd className="tabular-nums">{formatINR(b.minimumOrderAdjustment)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted-foreground">Pickup and delivery</dt>
                  <dd className="tabular-nums">{b.freeDelivery ? "Free" : formatINR(b.deliveryFee)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2.5 font-medium">
                  <dt>Estimated total</dt>
                  <dd className="tabular-nums">{formatINR(b.grandTotal)}</dd>
                </div>
              </dl>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              An estimate, not the final bill: you pay for the weight measured at pickup.
            </p>

            <Button size="lg" className="mt-6 h-12 w-full" render={<Link href={bookHref} />}>
              Request a pickup <ArrowRight aria-hidden="true" />
            </Button>
            <Link
              href="/pricing#price-estimator"
              className="mt-3 flex min-h-10 items-center justify-center text-sm font-medium underline-offset-4 hover:underline"
            >
              Count garments, ironing or dry cleaning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
