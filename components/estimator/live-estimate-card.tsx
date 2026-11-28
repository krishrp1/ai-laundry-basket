"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/effects";
import { formatINR } from "@/lib/format";
import type { RecommendationTip } from "@/lib/pricing-engine";

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
  const details = [
    {
      label: "Estimated weight",
      value: weightKg > 0 ? `${weighAtPickup ? "~" : ""}${weightKg} kg` : "—",
    },
    ...(price > 0
      ? [{ label: "Delivery fee", value: pickupFee > 0 ? formatINR(pickupFee) : "Free" }]
      : []),
    { label: "Pickup", value: pickupLabel },
    { label: "Delivery", value: deliveryLabel },
  ];

  return (
    <div className="relative">
      {/* Pearls give the glass something to refract. */}
      <span aria-hidden="true" className="pearl -top-10 -left-8 size-40" />
      <span aria-hidden="true" className="pearl top-[45%] -right-8 size-32" />
    <div className="glass relative flex flex-col gap-5 rounded-[1.75rem] p-6">
        <div aria-live="polite">
          <h3 className="eyebrow">Estimated price</h3>
          <p className="mt-2 font-heading text-6xl font-medium tracking-[-0.04em] tabular-nums">
            <AnimatedNumber value={formatINR(price)} locale="en-IN" />
          </p>
          {weighAtPickup && price > 0 && (
            <p className="mt-2 text-sm">
              <span className="font-semibold">This is an estimate, not a commitment.</span>{" "}
              We weigh your laundry at pickup and you only pay for the actual weight.
            </p>
          )}
          {(discount > 0 || minimumOrderAdjustment > 0 || taxAmount > 0) && (
            <p className="mt-1 text-sm text-muted-foreground">
              {minimumOrderAdjustment > 0 && (
                <span>Includes {formatINR(minimumOrderAdjustment)} minimum-order adjustment. </span>
              )}
              {taxAmount > 0 && <span>Includes {formatINR(taxAmount)} tax. </span>}
              {discount > 0 && <span>Coupon saved you {formatINR(discount)}.</span>}
            </p>
          )}
          {couponError && <p className="mt-1 text-sm text-destructive">{couponError}</p>}
        </div>

        <dl className="divide-y border-y">
          {details.map((detail) => (
            <div key={detail.label} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted-foreground">{detail.label}</dt>
              <dd className="text-right font-semibold">{detail.value}</dd>
            </div>
          ))}
        </dl>

        {recommendations.length > 0 && (
          <ul className="flex list-disc flex-col gap-1 pl-4 text-muted-foreground marker:text-primary">
            {recommendations.map((tip) => (
              <li key={tip.id}>{tip.text}</li>
            ))}
          </ul>
        )}

        <Button
          size="lg"
          disabled={bookDisabled}
          render={bookDisabled ? undefined : <Link href={bookHref} />}
          className="h-12 w-full"
        >
          Request a pickup
        </Button>
        {bookDisabled && (
          <p className="-mt-2 text-center text-sm text-muted-foreground">
            Choose your laundry load and a pickup location, date, and time.
          </p>
        )}
    </div>
    </div>
  );
}
