"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatedNumber } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";
import { computeEstimate } from "@/lib/pricing-engine";
import { loadPresets } from "@/config/pricing";
import { cn } from "@/lib/utils";

/** Wash & Fold total for each load preset — computed live via the real pricing engine, not hardcoded. */
const presetTotals = loadPresets.map((preset) => {
  const result = computeEstimate({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: preset.weightKg,
  });
  return {
    ...preset,
    total: result.ok ? result.breakdown.grandTotal : 0,
  };
});

export function PriceEstimatorTeaser() {
  const [selectedKey, setSelectedKey] = useState(presetTotals[0]!.key);
  const selected = presetTotals.find((p) => p.key === selectedKey) ?? presetTotals[0]!;

  return (
    <section className="border-y bg-card">
      <div className="container-page section-y grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_1fr]">
        <div>
          <h2>What will a load cost?</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Pick the size closest to yours for a Wash &amp; Fold estimate. We
            weigh your laundry at pickup, and that weight sets the final price.
          </p>
        </div>

        {/* After the options on phones, so the price changes next to the thing that was tapped. */}
        <div className="order-last self-start lg:order-none">
          <div aria-live="polite">
            <p className="text-sm text-muted-foreground">
              Estimate for {selected.label.toLowerCase()}
            </p>
            <p className="font-heading text-6xl font-semibold text-primary tabular-nums">
              <AnimatedNumber value={formatINR(selected.total)} locale="en-IN" />
            </p>
          </div>
          <Button size="lg" render={<Link href="/quote" />} className="mt-6">
            Request pickup
          </Button>
        </div>

        <div className="fx-card flex flex-col divide-y self-start rounded-xl border lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {presetTotals.map((preset) => {
            const isActive = preset.key === selectedKey;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => setSelectedKey(preset.key)}
                aria-pressed={isActive}
                className={cn(
                  "flex items-center justify-between gap-4 border-l-4 px-4 py-4 text-left transition-colors outline-none first:rounded-t-xl last:rounded-b-xl focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "border-l-primary bg-accent"
                    : "border-l-transparent hover:bg-muted"
                )}
              >
                <span>
                  <span className="block font-semibold">{preset.label}</span>
                  <span className="block text-sm text-muted-foreground">{preset.sublabel}</span>
                </span>
                <span className="font-heading text-xl font-semibold tabular-nums">
                  {formatINR(preset.total)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
