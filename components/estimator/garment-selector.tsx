import { garments, dryCleanableGarments, type GarmentKey, type ServiceKey } from "@/config/pricing";
import { Stepper } from "@/components/ui/stepper";
import type { GarmentCounts } from "@/lib/pricing-engine";

type GarmentSelectorProps = {
  serviceKey: ServiceKey;
  garmentCounts: GarmentCounts;
  onChange: (key: GarmentKey, value: number) => void;
};

export function GarmentSelector({ serviceKey, garmentCounts, onChange }: GarmentSelectorProps) {
  const list = serviceKey === "dry_cleaning" ? dryCleanableGarments : garments;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {list.map((garment) => (
        <div
          key={garment.key}
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3.5 py-2.5"
        >
          <span className="flex items-center gap-2.5 text-sm font-medium">
            <span aria-hidden="true" className="text-lg">
              {garment.icon}
            </span>
            {garment.label}
          </span>
          <Stepper
            label={garment.label}
            value={garmentCounts[garment.key] ?? 0}
            onChange={(value) => onChange(garment.key, value)}
          />
        </div>
      ))}
    </div>
  );
}
