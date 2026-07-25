"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Scale, Sparkles, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/config/pricing";
import type { RecommendationTip } from "@/lib/pricing-engine";

const trustPoints = [
  "Doorstep Pickup",
  `Free Delivery over ${formatINR(FREE_DELIVERY_THRESHOLD)}`,
  "Professional Cleaning",
  "Folding",
  "GST Included",
];

const springFast = { type: "spring", stiffness: 500, damping: 38 } as const;
const springGentle = { type: "spring", stiffness: 380, damping: 32 } as const;

type LiveEstimateCardProps = {
  weightKg: number;
  price: number;
  /** True for per-kg services: the shown price is an estimate and the bill is by weighing at pickup. */
  weighAtPickup: boolean;
  pickupFee: number;
  discount: number;
  minimumOrderAdjustment: number;
  taxAmount: number;
  couponError: string | null;
  pickupLabel: string;
  deliveryLabel: string;
  recommendations: RecommendationTip[];
  bookHref: string;
  bookDisabled: boolean;
};

export function LiveEstimateCard({
  weightKg,
  price,
  weighAtPickup,
  pickupFee,
  discount,
  minimumOrderAdjustment,
  taxAmount,
  couponError,
  pickupLabel,
  deliveryLabel,
  recommendations,
  bookHref,
  bookDisabled,
}: LiveEstimateCardProps) {
  return (
    <Card className="shadow-xl ring-1 ring-foreground/10">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </span>
          <p className="font-heading text-lg font-semibold">Your live estimate</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Estimated Price</p>
          <AnimatePresence mode="popLayout" initial={false}>
            <m.p
              key={price}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={springFast}
              className="font-heading text-4xl font-semibold"
            >
              {formatINR(price)}
            </m.p>
          </AnimatePresence>
          {weighAtPickup && price > 0 && (
            <div className="mt-2 flex items-start gap-2 rounded-md bg-muted/60 px-2.5 py-2 text-xs">
              <Scale className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <p>
                <span className="font-semibold">This is an estimate, not a commitment.</span>{" "}
                We weigh your laundry at pickup and you only pay for the actual weight.
              </p>
            </div>
          )}
          {(discount > 0 || minimumOrderAdjustment > 0 || taxAmount > 0) && (
            <p className="mt-1 text-xs text-muted-foreground">
              {minimumOrderAdjustment > 0 && (
                <span>Includes {formatINR(minimumOrderAdjustment)} minimum-order adjustment. </span>
              )}
              {taxAmount > 0 && <span>Includes {formatINR(taxAmount)} tax. </span>}
              {discount > 0 && <span>Coupon saved you {formatINR(discount)}.</span>}
            </p>
          )}
          {couponError && <p className="mt-1 text-xs text-destructive">{couponError}</p>}
        </div>

        <AnimatePresence initial={false}>
          {price > 0 && (
            <m.div
              key="delivery-fee"
              layout
              initial={{ opacity: 0, height: 0, marginTop: -20 }}
              animate={{ opacity: 1, height: "auto", marginTop: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: -20 }}
              transition={springGentle}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-sm">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="size-4 text-primary" />
                  Delivery fee
                </span>
                {pickupFee > 0 ? (
                  <span className="font-semibold">{formatINR(pickupFee)}</span>
                ) : (
                  <Badge className="font-semibold">FREE</Badge>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/60 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Estimated Weight</p>
            <p className="font-medium">{weightKg > 0 ? `${weighAtPickup ? "~" : ""}${weightKg} kg` : "—"}</p>
          </div>
          <div className="rounded-lg bg-muted/60 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="font-medium">{pickupLabel}</p>
          </div>
          <div className="col-span-2 rounded-lg bg-muted/60 px-3 py-2.5">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Truck className="size-3.5" />
              Delivery
            </p>
            <p className="font-medium">{deliveryLabel}</p>
          </div>
        </div>

        <Separator />

        <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {recommendations.length > 0 && (
            <m.div
              key="recommendations"
              layout
              initial={{ opacity: 0, height: 0, marginTop: -20 }}
              animate={{ opacity: 1, height: "auto", marginTop: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: -20 }}
              transition={springGentle}
              className="overflow-hidden"
            >
              <Separator />
              <div className="mt-5 flex flex-col gap-2">
                {/* Keyed by tip.id, not text: count/amount text updates in place
                    without an exit/enter remount, so rapid +/- clicks don't
                    thrash the list. */}
                <AnimatePresence initial={false}>
                  {recommendations.map((tip) => (
                    <m.div
                      key={tip.id}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={springGentle}
                    >
                      <Badge
                        variant="secondary"
                        className="h-auto w-fit max-w-full justify-start py-1.5 text-left font-normal whitespace-normal"
                      >
                        {tip.text}
                      </Badge>
                    </m.div>
                  ))}
                </AnimatePresence>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          disabled={bookDisabled}
          render={bookDisabled ? undefined : <Link href={bookHref} />}
          className="w-full gap-1.5"
        >
          Book Pickup
        </Button>
        {bookDisabled && (
          <p className="-mt-2 text-center text-xs text-muted-foreground">
            Choose your laundry load and a pickup location, date, and time.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
