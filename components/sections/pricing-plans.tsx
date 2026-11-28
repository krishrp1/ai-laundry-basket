import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serviceRates } from "@/components/sections/rates";
import { formatINR } from "@/lib/format";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  MINIMUM_ORDER_VALUE,
  dryCleanableGarments,
  expressRates,
} from "@/config/pricing";

const fees = [
  {
    label: "Delivery",
    value: `Free on orders of ${formatINR(FREE_DELIVERY_THRESHOLD)} or more, ${formatINR(DELIVERY_FEE)} below that`,
  },
  {
    label: "Minimum order",
    value: `${formatINR(MINIMUM_ORDER_VALUE)}. Smaller orders are topped up to this amount`,
  },
  {
    label: expressRates.label,
    value: `${formatINR(expressRates.perKgRate.default)} per kg for per-kg services; per-garment prices are ${expressRates.multiplier} times the standard rate`,
  },
];

export function PricingPlans() {
  return (
    <section id="plans" className="container-page section-y scroll-mt-16">
      <p className="eyebrow">Rates</p>
      <h2 className="mt-4">Rates and fees</h2>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {serviceRates.map((rate) => (
          <div key={rate.key} className="border-t border-foreground pt-5" data-reveal-content>
            <h3>{rate.label}</h3>
            <p className="mt-4 font-heading text-5xl font-medium tracking-[-0.03em] tabular-nums">
              {rate.price}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{rate.unit}</p>
            <p className="mt-4 text-muted-foreground">{rate.description}</p>
          </div>
        ))}
      </div>

      <dl className="mt-8 divide-y border-y">
        {fees.map((fee) => (
          <div key={fee.label} className="grid gap-1 py-3.5 sm:grid-cols-[14rem_1fr] sm:gap-6">
            <dt className="font-semibold">{fee.label}</dt>
            <dd className="text-muted-foreground">{fee.value}.</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-muted-foreground">
        Need a price for a business, hotel or bulk order?{" "}
        <Link href="/contact" className="font-semibold underline underline-offset-4">
          Contact us
        </Link>
        .
      </p>
    </section>
  );
}

export function DryCleaningPrices() {
  return (
    <section id="dry-cleaning-prices" className="container-page section-y scroll-mt-16">
      <p className="eyebrow">Dry cleaning</p>
      <h2 className="mt-4">Dry cleaning, per garment</h2>
      <p className="mt-3 text-muted-foreground">Standard turnaround rates.</p>

      <div className="mt-8 grid gap-x-10 md:grid-cols-2">
        {[0, 1].map((column) => {
          const half = Math.ceil(dryCleanableGarments.length / 2);
          const rows = dryCleanableGarments.slice(column * half, (column + 1) * half);
          return (
            <Table key={column} className="text-base">
              <TableHeader className={column === 1 ? "max-md:sr-only" : undefined}>
                <TableRow>
                  <TableHead>Garment</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((garment) => (
                  <TableRow key={garment.key}>
                    <TableCell>{garment.label}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {formatINR(garment.perPieceRate!.default)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        })}
      </div>
    </section>
  );
}
