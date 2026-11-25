"use client";

import { useState } from "react";
import Link from "next/link";

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
      <div className="container-page section-y grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2>What will a load cost?</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Pick the size closest to yours for a Wash &amp; Fold estimate. We
            weigh your laundry at pickup, and that weight sets the final price.
          </p>
          <div className="mt-8" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              Estimate for {selected.label.toLowerCase()}
            </p>
            <p className="font-heading text-6xl font-semibold text-primary tabular-nums">
              {formatINR(selected.total)}
            </p>
          </div>
          <Button size="lg" render={<Link href="/quote" />} className="mt-6">
            Request pickup
          </Button>
        </div>

        <div className="flex flex-col divide-y self-start rounded-xl border">
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
