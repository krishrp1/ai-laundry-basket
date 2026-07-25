import { memo } from "react";
import { garmentByKey } from "@/config/pricing";
import { Reveal } from "@/components/motion/reveal";

const guideLines = [
  {
    icon: garmentByKey.shirt.icon,
    text: `${Math.round(1 / garmentByKey.shirt.weightKg)} Shirts ≈ 1 kg`,
  },
  {
    icon: garmentByKey.jeans.icon,
    text: `${Math.round(1 / garmentByKey.jeans.weightKg)} Jeans ≈ 1 kg`,
  },
  {
    icon: garmentByKey.bedsheet_double.icon,
    text: `1 Bedsheet (Double) ≈ ${garmentByKey.bedsheet_double.weightKg} kg`,
  },
  {
    icon: garmentByKey.sherwani.icon,
    text: `1 Sherwani ≈ ${garmentByKey.sherwani.weightKg} kg`,
  },
];

/** Purely static (no props) — memoized so it doesn't re-render on every estimator keystroke. */
export const LaundryGuide = memo(function LaundryGuide() {
  return (
    <Reveal className="mt-10">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Not sure how much your laundry weighs? Here&apos;s a quick guide.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {guideLines.map((line) => (
          <div
            key={line.text}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-4 text-center"
          >
            <span aria-hidden="true" className="text-2xl">
              {line.icon}
            </span>
            <span className="text-xs text-muted-foreground">{line.text}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
});
