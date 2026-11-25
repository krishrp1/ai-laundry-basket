import { formatINR } from "@/lib/format";
import { dryCleanableGarments, services, type ServiceDefinition } from "@/config/pricing";

const dryCleaningFrom = Math.min(
  ...dryCleanableGarments.map((garment) => garment.perPieceRate?.default ?? Infinity)
);

function priceFor(service: ServiceDefinition) {
  if (service.perKgRate) {
    return { price: formatINR(service.perKgRate.default), unit: "per kg" };
  }
  if (service.flatPerPieceRate) {
    return { price: formatINR(service.flatPerPieceRate.default), unit: "per garment" };
  }
  return { price: `from ${formatINR(dryCleaningFrom)}`, unit: "per garment" };
}

/** Every service with its display price, derived live from config/pricing.ts. */
export const serviceRates = services.map((service) => ({
  key: service.key,
  label: service.label,
  description: service.description,
  model: service.model,
  ...priceFor(service),
}));
