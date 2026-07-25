"use client";

import * as React from "react";
import { RotateCcw, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/motion/reveal";
import { GarmentSelector } from "@/components/estimator/garment-selector";
import { LaundryGuide } from "@/components/estimator/laundry-guide";
import { LiveEstimateCard } from "@/components/estimator/live-estimate-card";
import {
  services,
  serviceByKey,
  loadPresets,
  pickupWindows,
  expressRates as expressConfig,
  type ServiceKey,
  type GarmentKey,
} from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  computeEstimate_UI,
  mapWeightToQuoteFormTier,
  generateRecommendations,
  buildApplicableGarmentSummary,
  filterGarmentCounts,
  type GarmentCounts,
} from "@/lib/pricing-engine";
import { getAvailablePickupWindows, estimateDelivery, getDayLabel, formatHour } from "@/lib/scheduling";

export function PriceEstimator() {
  const [serviceKey, setServiceKey] = React.useState<ServiceKey>("wash_fold");
  const [garmentCounts, setGarmentCounts] = React.useState<GarmentCounts>({});
  // Per-kg services offer a quick load-size flow (default, "hamper" preselected
  // so a price shows immediately) alongside the per-garment counter.
  const [inputMode, setInputMode] = React.useState<"load" | "garments">("load");
  const [presetKey, setPresetKey] = React.useState<string | null>("hamper");
  const [location, setLocation] = React.useState("");
  const [pickupDate, setPickupDate] = React.useState("");
  const [pickupWindowLabel, setPickupWindowLabel] = React.useState("");
  const [express, setExpress] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");

  const minDate = React.useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString().split("T")[0],
    () => ""
  );

  function updateGarment(key: GarmentKey, value: number) {
    setGarmentCounts((prev) => ({ ...prev, [key]: value }));
  }

  const isPerKg = serviceByKey[serviceKey].model === "per_kg";
  const loadMode = isPerKg && inputMode === "load";
  const selectedPreset = loadMode ? (loadPresets.find((preset) => preset.key === presetKey) ?? null) : null;

  function resetLoad() {
    if (loadMode) {
      setPresetKey(null);
    } else {
      setGarmentCounts({});
    }
  }

  const estimate = React.useMemo(
    () =>
      computeEstimate_UI({
        serviceKey,
        garmentCounts,
        express,
        couponCode,
        presetWeightKg: selectedPreset?.weightKg,
      }),
    [serviceKey, garmentCounts, express, couponCode, selectedPreset]
  );
  const garmentTotal = estimate.garmentTotal;
  const recommendations = React.useMemo(
    () =>
      generateRecommendations({
        garmentCounts: filterGarmentCounts(garmentCounts, serviceKey),
        garmentTotal,
        serviceKey,
        // Includes the minimum-order top-up so the free-delivery tip agrees
        // with the fee the engine actually charges (it compares the same subtotal).
        preFeeSubtotal: estimate.baseCost + estimate.expressSurcharge + estimate.minimumOrderAdjustment,
        presetWeightKg: selectedPreset?.weightKg,
      }),
    [garmentCounts, serviceKey, garmentTotal, estimate.baseCost, estimate.expressSurcharge, estimate.minimumOrderAdjustment, selectedPreset]
  );

  const pickupDateObj = pickupDate ? new Date(`${pickupDate}T00:00:00`) : null;
  const availableWindows = pickupDateObj ? getAvailablePickupWindows(pickupDateObj) : pickupWindows;
  const selectedWindow = pickupWindows.find((w) => w.label === pickupWindowLabel) ?? null;

  const delivery =
    pickupDateObj && selectedWindow
      ? estimateDelivery({ pickupDate: pickupDateObj, pickupWindowEndHour: selectedWindow.endHour, express })
      : null;

  const pickupLabel =
    pickupDateObj && selectedWindow
      ? `${getDayLabel(pickupDateObj)} • ${formatHour(selectedWindow.startHour)} – ${formatHour(selectedWindow.endHour)}`
      : "Select date & time";

  const deliveryLabel = delivery ? `${delivery.dayLabel} • ${delivery.timeLabel}` : "—";

  const hasLoad = loadMode ? selectedPreset !== null : garmentTotal > 0;
  const bookDisabled = !hasLoad || !location || !pickupDate || !pickupWindowLabel;

  const bookHref = React.useMemo(() => {
    if (bookDisabled) return "/quote";
    const service = services.find((s) => s.key === serviceKey);
    const params = new URLSearchParams();
    if (service) params.set("service", service.label);
    if (!loadMode) {
      const summary = buildApplicableGarmentSummary(garmentCounts, serviceKey);
      if (summary) params.set("garments", summary);
    }
    params.set("weight", selectedPreset ? selectedPreset.quoteTier : mapWeightToQuoteFormTier(estimate.weightKg));
    params.set("price", String(estimate.total));
    params.set("city", location);
    params.set("date", pickupDate);
    params.set("time", pickupWindowLabel);
    params.set("express", express ? "1" : "0");
    if (delivery) {
      params.set("deliveryLabel", deliveryLabel);
      params.set("deliveryDate", delivery.date.toISOString().split("T")[0]);
    }
    return `/quote?${params.toString()}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookDisabled, serviceKey, garmentCounts, loadMode, selectedPreset, estimate, location, pickupDate, pickupWindowLabel, express, delivery]);

  return (
    <section id="price-estimator" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" />
            AI Price Estimator
          </Badge>
          <h2 className="mt-3">Know your price before you book</h2>
          <p className="mt-4 text-muted-foreground">
            Add your garments and we will estimate the weight, price, and schedule instantly.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal>
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <Label htmlFor="estimator-service">Service Type</Label>
                  <Select
                    value={services.find((s) => s.key === serviceKey)?.label}
                    onValueChange={(value) => {
                      const match = services.find((s) => s.label === value);
                      if (match) setServiceKey(match.key);
                    }}
                  >
                    <SelectTrigger id="estimator-service" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.key} value={service.label}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {services.find((s) => s.key === serviceKey)?.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>

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
                      disabled={loadMode ? !selectedPreset : garmentTotal === 0}
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

            <Reveal delay={0.1}>
              <Card>
                <CardContent className="flex flex-col gap-5">
                  <p className="font-medium">Pickup details</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="estimator-location">Pickup Location</Label>
                      <Select value={location} onValueChange={(value) => setLocation(value ?? "")}>
                        <SelectTrigger id="estimator-location" className="w-full">
                          <SelectValue placeholder="Choose your area" />
                        </SelectTrigger>
                        <SelectContent>
                          {siteConfig.contact.serviceAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="estimator-date">Preferred Pickup Date</Label>
                      <Input
                        id="estimator-date"
                        type="date"
                        min={minDate || undefined}
                        value={pickupDate}
                        onChange={(event) => {
                          setPickupDate(event.target.value);
                          setPickupWindowLabel("");
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="estimator-time">Preferred Pickup Time</Label>
                      <Select
                        value={pickupWindowLabel}
                        onValueChange={(value) => setPickupWindowLabel(value ?? "")}
                      >
                        <SelectTrigger id="estimator-time" className="w-full">
                          <SelectValue placeholder="Choose a window" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableWindows.map((window) => (
                            <SelectItem key={window.label} value={window.label}>
                              {window.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3.5 py-2.5">
                      <div>
                        <Label htmlFor="estimator-express">Express Delivery</Label>
                        <p className="text-xs text-muted-foreground">
                          +{Math.round((expressConfig.multiplier - 1) * 100)}% • faster turnaround
                        </p>
                      </div>
                      <Switch id="estimator-express" checked={express} onCheckedChange={setExpress} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="estimator-coupon">Coupon Code (optional)</Label>
                    <Input
                      id="estimator-coupon"
                      placeholder="e.g. FIRST10"
                      value={couponCode}
                      onChange={(event) => setCouponCode(event.target.value)}
                      className="sm:w-64"
                    />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24">
            <LiveEstimateCard
              weightKg={estimate.weightKg}
              price={estimate.total}
              weighAtPickup={isPerKg}
              pickupFee={estimate.pickupFee}
              discount={estimate.discount}
              minimumOrderAdjustment={estimate.minimumOrderAdjustment}
              taxAmount={estimate.taxAmount}
              couponError={estimate.couponError}
              pickupLabel={pickupLabel}
              deliveryLabel={deliveryLabel}
              recommendations={recommendations}
              bookHref={bookHref}
              bookDisabled={bookDisabled}
            />
          </div>
        </div>

        <LaundryGuide />
      </div>
    </section>
  );
}
