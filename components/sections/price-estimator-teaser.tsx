"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { formatINR } from "@/lib/format";
import { computeEstimate } from "@/lib/pricing-engine";
import { loadPresets } from "@/config/pricing";

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
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="border-border flex flex-col overflow-hidden rounded-[2rem] border shadow-lg md:flex-row">
          <div className="bg-accent flex flex-col justify-center p-10 sm:p-12 md:w-1/2">
            <h2 className="text-foreground">Estimate your order</h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Quickly estimate a Wash &amp; Fold order by load size. No hidden
              fees — final price is confirmed by weighing at pickup.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {presetTotals.map((preset) => {
                const isActive = preset.key === selectedKey;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setSelectedKey(preset.key)}
                    aria-pressed={isActive}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "border-primary bg-card"
                        : "border-transparent hover:bg-card/60"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span aria-hidden="true">{preset.icon}</span>
                      <span>
                        <span className="text-foreground block text-sm font-medium">
                          {preset.label}
                        </span>
                        <span className="text-muted-foreground block text-xs">
                          {preset.sublabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-foreground font-semibold">
                      {formatINR(preset.total)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-card flex flex-col items-center justify-center p-10 text-center sm:p-12 md:w-1/2">
            <span className="bg-accent mb-4 flex size-20 items-center justify-center rounded-full">
              <ShoppingBasket className="text-amber size-9" />
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              Estimated total
            </span>
            <div className="text-primary mt-2 text-6xl font-semibold">
              {formatINR(selected.total)}
            </div>
            <p className="text-muted-foreground mt-6 max-w-xs text-sm">
              *Final pricing confirmed upon physical weighing during pickup.
            </p>
            <Button size="lg" render={<Link href="/quote" />} className="mt-6 gap-1.5">
              Request Pickup Now
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
