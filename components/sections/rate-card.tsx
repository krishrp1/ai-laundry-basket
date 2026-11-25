import Link from "next/link";

import { serviceRates } from "@/components/sections/rates";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, MINIMUM_ORDER_VALUE } from "@/config/pricing";
import { formatINR } from "@/lib/format";

export function RateCard() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b-4 border-highlight bg-band px-5 py-4 text-band-foreground sm:px-6">
        <h2 className="text-xl sm:text-xl">Rate card</h2>
      </div>
      <dl className="divide-y px-5 sm:px-6">
        {serviceRates.map((rate) => (
          <div key={rate.key} className="flex items-baseline gap-3 py-4">
            <dt className="font-medium">{rate.label}</dt>
            <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted" />
            <dd className="text-right">
              <span className="font-heading text-2xl font-semibold tabular-nums">{rate.price}</span>
              <span className="block text-xs text-muted-foreground">{rate.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-t bg-muted px-5 py-4 text-sm text-muted-foreground sm:px-6">
        <p>
          Delivery is free from {formatINR(FREE_DELIVERY_THRESHOLD)}, otherwise{" "}
          {formatINR(DELIVERY_FEE)}. Minimum order {formatINR(MINIMUM_ORDER_VALUE)}.
        </p>
        <Link
          href="/pricing"
          className="mt-1 inline-block font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
        >
          Full price list
        </Link>
      </div>
    </div>
  );
}
