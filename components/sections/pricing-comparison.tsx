import { Check, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion/reveal";

type Cell = string | boolean;

type Row = {
  feature: string;
  essential: Cell;
  premium: Cell;
  family: Cell;
  business: Cell;
};

const rows: Row[] = [
  { feature: "Starting price (one-time)", essential: "$19/order", premium: "$34/order", family: "$54/order", business: "Custom" },
  { feature: "Starting price (subscription)", essential: "$49/mo", premium: "$89/mo", family: "$149/mo", business: "From $399/mo" },
  { feature: "Wash & Fold", essential: true, premium: true, family: true, business: true },
  { feature: "Dry Cleaning", essential: false, premium: true, family: true, business: true },
  { feature: "Ironing & Pressing", essential: false, premium: "Add-on", family: true, business: true },
  { feature: "Stain treatment", essential: "Basic flagging", premium: true, family: true, business: true },
  { feature: "Pickup & delivery", essential: true, premium: true, family: true, business: true },
  { feature: "Same-day service", essential: false, premium: true, family: true, business: true },
  { feature: "Weight allowance per pickup", essential: "20 lbs", premium: "30 lbs", family: "60 lbs", business: "Custom" },
  { feature: "Pickup frequency", essential: "Weekly", premium: "Weekly", family: "2x weekly", business: "Daily / custom" },
  { feature: "Multiple saved addresses", essential: false, premium: false, family: true, business: true },
  { feature: "AI fabric sorting", essential: true, premium: true, family: true, business: true },
  { feature: "AI smart scheduling", essential: "Basic", premium: "Smart", family: "Smart", business: "Enterprise routing" },
  { feature: "Real-time order tracking", essential: true, premium: true, family: true, business: true },
  { feature: "Dedicated account manager", essential: false, premium: false, family: false, business: true },
  { feature: "Priority support", essential: false, premium: true, family: true, business: true },
  { feature: "Support channels", essential: "Email", premium: "Email + phone", family: "Phone + chat", business: "24/7 priority line" },
  { feature: "Eco-friendly detergent options", essential: true, premium: true, family: true, business: true },
  { feature: "Subscription discount", essential: "Up to 15%", premium: "Up to 15%", family: "Up to 15%", business: "Custom" },
  { feature: "Referral rewards", essential: true, premium: true, family: true, business: true },
  { feature: "Consolidated commercial invoicing", essential: false, premium: false, family: false, business: true },
  { feature: "Custom SLA", essential: false, premium: false, family: false, business: true },
];

const plans = [
  { key: "essential" as const, label: "Essential" },
  { key: "premium" as const, label: "Premium" },
  { key: "family" as const, label: "Family" },
  { key: "business" as const, label: "Business" },
];

function renderCell(value: Cell) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-primary" aria-label="Included" />
    ) : (
      <X
        className="mx-auto size-4 text-muted-foreground/50"
        aria-label="Not included"
      />
    );
  }
  return <span>{value}</span>;
}

export function PricingComparison() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Compare plans
        </span>
        <h2 className="mt-3">Every plan, side by side</h2>
        <p className="mt-4 text-muted-foreground">
          A full feature breakdown so you can pick the plan that actually
          fits, not just the cheapest one.
        </p>
      </Reveal>

      <Reveal
        delay={0.08}
        className="mt-12 overflow-hidden rounded-2xl border border-border"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-56 whitespace-normal">Feature</TableHead>
              {plans.map((plan) => (
                <TableHead key={plan.key} className="text-center">
                  {plan.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.feature}>
                <TableCell className="whitespace-normal font-medium text-foreground">
                  {row.feature}
                </TableCell>
                <TableCell className="text-center">
                  {renderCell(row.essential)}
                </TableCell>
                <TableCell className="text-center">
                  {renderCell(row.premium)}
                </TableCell>
                <TableCell className="text-center">
                  {renderCell(row.family)}
                </TableCell>
                <TableCell className="text-center">
                  {renderCell(row.business)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Reveal>
    </section>
  );
}
