import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { GarmentSelector } from "@/components/estimator/garment-selector";
import { loadPresets, type ServiceKey, type GarmentKey } from "@/config/pricing";
import { cn } from "@/lib/utils";
import type { GarmentCounts } from "@/lib/pricing-engine";

export function LoadCard({
  isPerKg,
  loadMode,
  inputMode,
  setInputMode,
  presetKey,
  setPresetKey,
  selectedPresetSet,
  garmentTotal,
  resetLoad,
  serviceKey,
  garmentCounts,
  updateGarment,
}: {
  isPerKg: boolean;
  loadMode: boolean;
  inputMode: "load" | "garments";
  setInputMode: (mode: "load" | "garments") => void;
  presetKey: string | null;
  setPresetKey: (key: string | null) => void;
  selectedPresetSet: boolean;
  garmentTotal: number;
  resetLoad: () => void;
  serviceKey: ServiceKey;
  garmentCounts: GarmentCounts;
  updateGarment: (key: GarmentKey, value: number) => void;
}) {
  return (
    <Reveal delay={0.05}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{loadMode ? "How much laundry?" : "How many garments?"}</p>
              <p className="text-sm text-muted-foreground">
                {loadMode
                  ? "Pick the closest load size — we weigh at pickup, so you only pay for actual weight."
                  : "Use the + / - controls, no need to weigh anything."}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={loadMode ? !selectedPresetSet : garmentTotal === 0}
              onClick={resetLoad}
              className="shrink-0 gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          </div>

          {isPerKg && (
            <div className="flex w-fit gap-1 rounded-lg border border-border bg-muted/40 p-1">
              {(
                [
                  ["load", "Load size"],
                  ["garments", "Count garments"],
                ] as const
              ).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={inputMode === mode}
                  onClick={() => setInputMode(mode)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    inputMode === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {loadMode ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {loadPresets.map((preset) => {
                const selected = presetKey === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPresetKey(selected ? null : preset.key)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors",
                      selected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:border-primary/40"
                    )}
                  >
                    <span aria-hidden="true" className="text-2xl">
                      {preset.icon}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{preset.label}</span>
                      <span className="block text-xs text-muted-foreground">{preset.sublabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <GarmentSelector
              serviceKey={serviceKey}
              garmentCounts={garmentCounts}
              onChange={updateGarment}
            />
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
