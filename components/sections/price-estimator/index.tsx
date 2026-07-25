"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { LaundryGuide } from "@/components/estimator/laundry-guide";
import { LiveEstimateCard } from "@/components/estimator/live-estimate-card";
import {
  services,
  serviceByKey,
  loadPresets,
  pickupWindows,
  type ServiceKey,
  type GarmentKey,
} from "@/config/pricing";
import {
  computeEstimate_UI,
  mapWeightToQuoteFormTier,
  generateRecommendations,
  buildApplicableGarmentSummary,
  filterGarmentCounts,
  type GarmentCounts,
} from "@/lib/pricing-engine";
import { getAvailablePickupWindows, estimateDelivery, getDayLabel, formatHour } from "@/lib/scheduling";
import { ServiceTypeCard } from "./service-type-card";
import { LoadCard } from "./load-card";
import { PickupDetailsCard } from "./pickup-details-card";

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
            <ServiceTypeCard serviceKey={serviceKey} onServiceChange={setServiceKey} />

            <LoadCard
              isPerKg={isPerKg}
              loadMode={loadMode}
              inputMode={inputMode}
              setInputMode={setInputMode}
              presetKey={presetKey}
              setPresetKey={setPresetKey}
              selectedPresetSet={selectedPreset !== null}
              garmentTotal={garmentTotal}
              resetLoad={resetLoad}
              serviceKey={serviceKey}
              garmentCounts={garmentCounts}
              updateGarment={updateGarment}
            />

            <PickupDetailsCard
              location={location}
              setLocation={setLocation}
              pickupDate={pickupDate}
              minDate={minDate}
              onPickupDateChange={(value) => {
                setPickupDate(value);
                setPickupWindowLabel("");
              }}
              pickupWindowLabel={pickupWindowLabel}
              setPickupWindowLabel={setPickupWindowLabel}
              availableWindows={availableWindows}
              express={express}
              setExpress={setExpress}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
            />
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
