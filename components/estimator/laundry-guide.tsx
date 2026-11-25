import { memo } from "react";
import { garmentByKey } from "@/config/pricing";

const guideLines = [
  `${Math.round(1 / garmentByKey.shirt.weightKg)} shirts ≈ 1 kg`,
  `${Math.round(1 / garmentByKey.jeans.weightKg)} pairs of jeans ≈ 1 kg`,
  `1 double bedsheet ≈ ${garmentByKey.bedsheet_double.weightKg} kg`,
  `1 sherwani ≈ ${garmentByKey.sherwani.weightKg} kg`,
];

/** Purely static (no props) — memoized so it doesn't re-render on every estimator keystroke. */
export const LaundryGuide = memo(function LaundryGuide() {
  return (
    <div className="mt-8 border-t pt-5">
      <h3>How much does laundry weigh?</h3>
      <ul className="mt-3 grid gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
        {guideLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
});
