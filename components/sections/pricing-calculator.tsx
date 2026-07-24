"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, Info, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/motion/reveal";

type ServiceType = "wash-fold" | "dry-cleaning" | "mixed";
type PickupPreference = "standard" | "priority";
type Frequency = "one-time" | "monthly" | "biweekly" | "weekly";

const RATE_PER_LB = 2.25;
const MIN_WASH_FOLD_CHARGE = 15;
const DRY_CLEAN_PER_ITEM = 6.5;
const IRONING_PER_ITEM = 2.75;
const PRIORITY_PICKUP_FEE = 5;
const EXPRESS_RATE = 0.25;
const EXPRESS_MIN_FEE = 10;

const frequencyDiscounts: Record<Frequency, number> = {
  "one-time": 0,
  monthly: 0.05,
  biweekly: 0.1,
  weekly: 0.15,
};

const frequencyLabels: Record<Frequency, string> = {
  "one-time": "One-time order",
  monthly: "Monthly",
  biweekly: "Every two weeks",
  weekly: "Weekly",
};

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  suffix: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="size-3.5" />
        </Button>
        <span className="w-14 text-center text-sm font-medium tabular-nums">
          {value} {suffix}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function PricingCalculator() {
  const [serviceType, setServiceType] = React.useState<ServiceType>("wash-fold");
  const [items, setItems] = React.useState(10);
  const [weight, setWeight] = React.useState(15);
  const [pickupPreference, setPickupPreference] =
    React.useState<PickupPreference>("standard");
  const [expressDelivery, setExpressDelivery] = React.useState(false);
  const [dryCleaningAddon, setDryCleaningAddon] = React.useState(false);
  const [ironingAddon, setIroningAddon] = React.useState(false);
  const [frequency, setFrequency] = React.useState<Frequency>("one-time");

  const needsWashFold = serviceType === "wash-fold" || serviceType === "mixed";
  const needsDryCleaning =
    serviceType === "dry-cleaning" || serviceType === "mixed" || dryCleaningAddon;

  const washFoldCost = needsWashFold
    ? Math.max(weight * RATE_PER_LB, MIN_WASH_FOLD_CHARGE)
    : 0;
  const dryCleaningCost = needsDryCleaning ? items * DRY_CLEAN_PER_ITEM : 0;
  const ironingCost = ironingAddon ? items * IRONING_PER_ITEM : 0;
  const priorityCost = pickupPreference === "priority" ? PRIORITY_PICKUP_FEE : 0;

  const preExpressSubtotal =
    washFoldCost + dryCleaningCost + ironingCost + priorityCost;
  const expressCost = expressDelivery
    ? Math.max(preExpressSubtotal * EXPRESS_RATE, EXPRESS_MIN_FEE)
    : 0;

  const subtotal = preExpressSubtotal + expressCost;
  const discountRate = frequencyDiscounts[frequency];
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const lineItems = [
    needsWashFold && {
      label: `Wash & Fold (${weight} lbs)`,
      value: washFoldCost,
    },
    needsDryCleaning && {
      label: `Dry Cleaning (${items} items)`,
      value: dryCleaningCost,
    },
    ironingAddon && {
      label: `Ironing & Pressing (${items} items)`,
      value: ironingCost,
    },
    pickupPreference === "priority" && {
      label: "Priority pickup window",
      value: priorityCost,
    },
    expressDelivery && {
      label: "Express delivery",
      value: expressCost,
    },
  ].filter(Boolean) as { label: string; value: number }[];

  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Estimate your cost
          </span>
          <h2 className="mt-3">See your price before you book</h2>
          <p className="mt-4 text-muted-foreground">
            Adjust the options below for a live estimate. Your final quote
            may vary slightly based on the actual condition of your order.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Card>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="calc-service-type">Service type</Label>
                  <Select
                    value={serviceType}
                    onValueChange={(value) =>
                      setServiceType(value as ServiceType)
                    }
                  >
                    <SelectTrigger id="calc-service-type" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wash-fold">Wash & Fold</SelectItem>
                      <SelectItem value="dry-cleaning">Dry Cleaning</SelectItem>
                      <SelectItem value="mixed">
                        Wash & Fold + Dry Cleaning
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Stepper
                  label="Number of clothing items"
                  value={items}
                  onChange={setItems}
                  min={1}
                  max={100}
                  suffix="items"
                />

                <Stepper
                  label="Laundry weight"
                  value={weight}
                  onChange={setWeight}
                  min={1}
                  max={150}
                  suffix="lbs"
                />

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="calc-pickup-pref">Pickup preference</Label>
                  <Select
                    value={pickupPreference}
                    onValueChange={(value) =>
                      setPickupPreference(value as PickupPreference)
                    }
                  >
                    <SelectTrigger id="calc-pickup-pref" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard pickup window
                      </SelectItem>
                      <SelectItem value="priority">
                        Priority pickup window (+$5)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="calc-frequency">Subscription frequency</Label>
                  <Select
                    value={frequency}
                    onValueChange={(value) => setFrequency(value as Frequency)}
                  >
                    <SelectTrigger id="calc-frequency" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(frequencyLabels) as Frequency[]).map(
                        (key) => (
                          <SelectItem key={key} value={key}>
                            {frequencyLabels[key]}
                            {frequencyDiscounts[key] > 0
                              ? ` (save ${frequencyDiscounts[key] * 100}%)`
                              : ""}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="calc-express" className="font-normal">
                    Express delivery
                  </Label>
                  <Switch
                    id="calc-express"
                    checked={expressDelivery}
                    onCheckedChange={setExpressDelivery}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="calc-dry-cleaning" className="font-normal">
                    Add dry cleaning items
                  </Label>
                  <Switch
                    id="calc-dry-cleaning"
                    checked={dryCleaningAddon || serviceType !== "wash-fold"}
                    onCheckedChange={setDryCleaningAddon}
                    disabled={serviceType !== "wash-fold"}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="calc-ironing" className="font-normal">
                    Add ironing & pressing
                  </Label>
                  <Switch
                    id="calc-ironing"
                    checked={ironingAddon}
                    onCheckedChange={setIroningAddon}
                  />
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <Card className="lg:sticky lg:top-24">
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Calculator className="size-4 text-primary" />
                  <p className="font-medium">Estimated cost breakdown</p>
                </div>

                <Separator />

                <div className="flex flex-col gap-2 text-sm">
                  {lineItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between gap-3"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}

                  {discountAmount > 0 && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">
                        {frequencyLabels[frequency]} discount (
                        {discountRate * 100}%)
                      </span>
                      <span className="font-medium text-primary">
                        -{formatCurrency(discountAmount)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-medium">Estimated total</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={total.toFixed(2)}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="font-heading text-2xl font-semibold text-primary"
                    >
                      {formatCurrency(total)}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  This is an estimate based on typical order patterns. Your
                  confirmed price is always shown before checkout.
                </p>

                <Button render={<Link href="/quote" />} className="mt-2 w-full">
                  Get this quote
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
