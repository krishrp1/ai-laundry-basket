import { formatINR } from "@/lib/format";
import {
  defaultPricingConfig,
  dryCleanableGarments,
  garments as allGarments,
  weightTiers,
  type GarmentKey,
  type ItemCategory,
  type PricingConfig,
  type ServiceKey,
} from "@/config/pricing";

/**
 * Pricing engine — pure functions, no React, no side effects. All rates
 * live in config/pricing.ts; nothing here should ever hardcode a number.
 *
 * Express / Rush is modeled as an `urgency` flag rather than a 5th
 * selectable service, because the Bangalore benchmark bands only give a
 * per-kg Express rate, not a full per-garment Express price list. Applying
 * it as a flag lets a customer request "Express Wash & Fold" or "Express
 * Dry Cleaning" — which matches how real laundry services actually sell
 * rush turnaround — instead of forcing Express to be its own disconnected
 * cleaning method.
 *
 * Rule precedence (highest wins):
 *   1. Express rate/multiplier     — overrides the per-kg rate, or multiplies
 *                                     the per-piece rate, before anything else.
 *   2. Per-piece service rate      — used for item-based lines.
 *   3. Per-kg service rate         — used for weight-based lines.
 *   4. Minimum order value         — tops up the subtotal (or blocks the
 *                                     order, per minimumOrderPolicy) before
 *                                     delivery and tax are applied.
 *   5. Delivery fee / free delivery, packaging fee, tax, discount — applied
 *      last, in that order, on the topped-up subtotal.
 */

export type OrderType = "weight" | "item" | "mixed";
export type Urgency = "standard" | "express";

export type OrderItem = {
  category: GarmentKey;
  quantity: number;
  /** Informational only (e.g. "cotton", "silk") — pricing already varies by garment key (saree_cotton vs saree_silk). */
  fabricType?: string;
};

export type OrderInput = {
  serviceType: ServiceKey;
  orderType: OrderType;
  items?: OrderItem[];
  weightKg?: number;
  urgency?: Urgency;
  /** Optional zone key (see config/pricing.ts zonePricing) — overrides the flat delivery fee for orders below the free-delivery threshold. */
  zone?: string;
  /** Flat optional line item, explicit override. Wins outright over both the flat deliveryFee and zonePricing. */
  deliveryFeeOverride?: number;
  /** Flat optional line item. Defaults to config.packagingFee (0) when omitted. */
  packagingFee?: number;
  /** Overrides config.minimumOrderValue for this order. */
  minimumOrderValue?: number;
  /** Overrides config.minimumOrderPolicy for this order. */
  minimumOrderPolicy?: "adjust" | "block";
  /** Percent (0-100). Overrides config.taxRate for this order. Omitted/0 = no tax. */
  taxRate?: number;
  /** Flat rupee discount, applied after coupon resolution (if couponCode also given, both are summed then capped at the subtotal). */
  discountAmount?: number;
  couponCode?: string;
  /** Full rate-table override — lets admin tooling or tests price against a different config without touching this file. */
  pricingConfig?: PricingConfig;
};

export type ValidationError = { field: string; message: string };

export type ItemLineBreakdown = {
  category: GarmentKey;
  label: string;
  quantity: number;
  unitRate: number;
  lineTotal: number;
  fabricType?: string;
};

export type PriceBreakdown = {
  /** Base service amount before express, minimum-order, delivery, packaging, or tax — items leg + weight leg. */
  baseAmount: number;
  /** Itemized per-garment lines, present for "item" and "mixed" orders. */
  itemizedTotal: ItemLineBreakdown[];
  /** Sum of itemizedTotal lines. */
  itemsAmount: number;
  /** Raw-weight leg amount, present for "weight" and "mixed" orders. */
  weightAmount: number;
  /** Express surcharge if urgency is "express", else 0. */
  expressSurcharge: number;
  /** Top-up applied if the post-express subtotal was below the minimum order value (minimumOrderPolicy "adjust" only). */
  minimumOrderAdjustment: number;
  /** baseAmount + expressSurcharge + minimumOrderAdjustment. */
  subtotal: number;
  /** True if this order qualified for free delivery. */
  freeDelivery: boolean;
  deliveryFee: number;
  packagingFee: number;
  taxRatePercent: number;
  taxAmount: number;
  discountAmount: number;
  /** Rounded to the nearest rupee, never negative. */
  grandTotal: number;
  /** Plain-language summary of the bill, suitable for showing directly to the customer. */
  explanation: string;
};

export type CalculationResult =
  | { ok: true; breakdown: PriceBreakdown }
  | { ok: false; errors: ValidationError[] };

function round(value: number): number {
  return Math.round(value);
}

function resolveConfig(order: OrderInput): PricingConfig {
  return order.pricingConfig ?? defaultPricingConfig;
}

export function validateOrder(order: OrderInput, config: PricingConfig = defaultPricingConfig): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!order.serviceType) {
    errors.push({ field: "serviceType", message: "Service type is required." });
    return errors;
  }

  const service = config.serviceRates[order.serviceType];
  if (!service) {
    errors.push({ field: "serviceType", message: `Unknown service type "${order.serviceType}".` });
    return errors;
  }

  if (order.orderType !== "weight" && order.orderType !== "item" && order.orderType !== "mixed") {
    errors.push({ field: "orderType", message: `Unknown order type "${order.orderType}".` });
    return errors;
  }

  const weightCapable = service.model === "per_kg";

  if (order.orderType === "weight" || order.orderType === "mixed") {
    if (!weightCapable) {
      errors.push({
        field: "serviceType",
        message: `${service.label} is priced per garment and does not support weight-based orders.`,
      });
    }
    if (order.weightKg === undefined || order.weightKg === null) {
      errors.push({ field: "weightKg", message: "Weight (kg) is required for weight-based orders." });
    } else if (!Number.isFinite(order.weightKg) || order.weightKg <= 0) {
      errors.push({ field: "weightKg", message: "Weight must be greater than 0 kg." });
    }
  }

  if (order.orderType === "item" || order.orderType === "mixed") {
    if (!order.items || order.items.length === 0) {
      errors.push({ field: "items", message: "At least one item is required for item-based orders." });
    } else {
      order.items.forEach((item, index) => {
        const garment = config.itemRates[item.category];
        if (!garment) {
          errors.push({
            field: `items[${index}].category`,
            message: `"${item.category}" is not a recognized garment category.`,
          });
          return;
        }
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
          errors.push({
            field: `items[${index}].quantity`,
            message: `Quantity for ${garment.label} must be a positive whole number.`,
          });
        }
        if (order.serviceType === "dry_cleaning" && !garment.perPieceRate) {
          errors.push({
            field: `items[${index}].category`,
            message: `${garment.label} is not offered under Dry Cleaning.`,
          });
        }
      });
    }
  }

  // NaN passes a bare `< 0` check, so every numeric override must also be finite —
  // otherwise a NaN/Infinity fed in from parsed input poisons the grand total.
  const nonNegativeOverrides = [
    { field: "minimumOrderValue", value: order.minimumOrderValue, label: "Minimum order value" },
    { field: "discountAmount", value: order.discountAmount, label: "Discount amount" },
    { field: "deliveryFeeOverride", value: order.deliveryFeeOverride, label: "Delivery fee" },
    { field: "packagingFee", value: order.packagingFee, label: "Packaging fee" },
  ] as const;
  for (const { field, value, label } of nonNegativeOverrides) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      errors.push({ field, message: `${label} must be a non-negative number.` });
    }
  }
  if (order.taxRate !== undefined && (!Number.isFinite(order.taxRate) || order.taxRate < 0 || order.taxRate > 100)) {
    errors.push({ field: "taxRate", message: "Tax rate must be between 0 and 100." });
  }
  if (order.zone !== undefined && !config.zonePricing[order.zone]) {
    errors.push({ field: "zone", message: `"${order.zone}" is not a recognized delivery zone.` });
  }

  return errors;
}

/** Prices a list of items under the given service, applying the express multiplier/rate override when requested. */
function priceItems(
  items: OrderItem[],
  serviceType: ServiceKey,
  express: boolean,
  config: PricingConfig
): { amount: number; lines: ItemLineBreakdown[] } {
  const service = config.serviceRates[serviceType];
  const lines: ItemLineBreakdown[] = [];
  let amount = 0;

  for (const item of items) {
    const garment = config.itemRates[item.category];
    if (!garment) continue;

    let unitRate: number;
    if (service.model === "per_kg" && service.perKgRate) {
      const perKgRate = express ? config.expressRates.perKgRate.default : service.perKgRate.default;
      unitRate = garment.weightKg * perKgRate;
    } else if (service.flatPerPieceRate) {
      unitRate = service.flatPerPieceRate.default * (express ? config.expressRates.multiplier : 1);
    } else {
      const base = garment.perPieceRate?.default ?? 0;
      unitRate = base * (express ? config.expressRates.multiplier : 1);
    }

    unitRate = round(unitRate);
    const lineTotal = round(unitRate * item.quantity);
    amount += lineTotal;
    lines.push({
      category: item.category,
      label: garment.label,
      quantity: item.quantity,
      unitRate,
      lineTotal,
      fabricType: item.fabricType,
    });
  }

  return { amount: round(amount), lines };
}

/** Prices a raw weightKg figure under the given per-kg service, applying the express rate override when requested. */
function priceWeight(weightKg: number, serviceType: ServiceKey, express: boolean, config: PricingConfig): number {
  const service = config.serviceRates[serviceType];
  if (!service.perKgRate) return 0;
  const rate = express ? config.expressRates.perKgRate.default : service.perKgRate.default;
  return round(weightKg * rate);
}

function buildExplanation(order: OrderInput, config: PricingConfig, breakdown: Omit<PriceBreakdown, "explanation">): string {
  const service = config.serviceRates[order.serviceType];
  const parts: string[] = [];

  if (breakdown.itemizedTotal.length > 0) {
    const itemsText = breakdown.itemizedTotal
      .map((line) => `${line.quantity} × ${line.label} @ ${formatINR(line.unitRate)} = ${formatINR(line.lineTotal)}`)
      .join("; ");
    parts.push(`${service.label}: ${itemsText}.`);
  }
  if (breakdown.weightAmount > 0) {
    parts.push(`${order.weightKg} kg of ${service.label} = ${formatINR(breakdown.weightAmount)}.`);
  }
  if (breakdown.expressSurcharge > 0) {
    parts.push(`Express/Rush surcharge: ${formatINR(breakdown.expressSurcharge)}.`);
  }
  if (breakdown.minimumOrderAdjustment > 0) {
    const minValue = order.minimumOrderValue ?? config.minimumOrderValue;
    parts.push(`Minimum order adjustment of ${formatINR(breakdown.minimumOrderAdjustment)} applied (minimum order ${formatINR(minValue)}).`);
  }
  parts.push(
    breakdown.freeDelivery
      ? "Free delivery on this order."
      : `Delivery fee: ${formatINR(breakdown.deliveryFee)}.`
  );
  if (breakdown.packagingFee > 0) {
    parts.push(`Packaging fee: ${formatINR(breakdown.packagingFee)}.`);
  }
  if (breakdown.taxAmount > 0) {
    parts.push(`Tax (${breakdown.taxRatePercent}%): ${formatINR(breakdown.taxAmount)}.`);
  }
  if (breakdown.discountAmount > 0) {
    parts.push(`Discount: -${formatINR(breakdown.discountAmount)}.`);
  }
  parts.push(`Total: ${formatINR(breakdown.grandTotal)}.`);

  return parts.join(" ");
}

/** Computes the full priced breakdown for an order, or the list of validation errors if the order is invalid. */
export function computeEstimate(order: OrderInput): CalculationResult {
  const config = resolveConfig(order);
  const errors = validateOrder(order, config);
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const express = order.urgency === "express";
  const wantsItems = order.orderType === "item" || order.orderType === "mixed";
  const wantsWeight = order.orderType === "weight" || order.orderType === "mixed";

  const emptyItems = { amount: 0, lines: [] as ItemLineBreakdown[] };
  const standardItems = wantsItems ? priceItems(order.items!, order.serviceType, false, config) : emptyItems;
  const standardWeightAmount = wantsWeight ? priceWeight(order.weightKg!, order.serviceType, false, config) : 0;
  const baseAmountNoExpress = standardItems.amount + standardWeightAmount;

  // Default to the standard-priced legs; swap in the express-priced legs only
  // when they cost at least as much, so a misconfigured express rate that
  // undercuts the standard rate never lowers the bill or leaves the reported
  // legs out of sync with the subtotal.
  let itemLines = standardItems.lines;
  let itemsAmount = standardItems.amount;
  let weightAmount = standardWeightAmount;
  let expressSurcharge = 0;
  if (express) {
    const expressItems = wantsItems ? priceItems(order.items!, order.serviceType, true, config) : emptyItems;
    const expressWeightAmount = wantsWeight ? priceWeight(order.weightKg!, order.serviceType, true, config) : 0;
    const expressBase = expressItems.amount + expressWeightAmount;
    if (expressBase >= baseAmountNoExpress) {
      itemLines = expressItems.lines;
      itemsAmount = expressItems.amount;
      weightAmount = expressWeightAmount;
      expressSurcharge = round(expressBase - baseAmountNoExpress);
    }
  }

  const minimumOrderValue = order.minimumOrderValue ?? config.minimumOrderValue;
  const minimumOrderPolicy = order.minimumOrderPolicy ?? config.minimumOrderPolicy;
  const preMinSubtotal = baseAmountNoExpress + expressSurcharge;

  if (minimumOrderPolicy === "block" && preMinSubtotal > 0 && preMinSubtotal < minimumOrderValue) {
    return {
      ok: false,
      errors: [
        {
          field: "minimumOrderValue",
          message: `Order total ${formatINR(preMinSubtotal)} is below the minimum order value of ${formatINR(minimumOrderValue)}. Add more items or choose a different service.`,
        },
      ],
    };
  }

  const minimumOrderAdjustment = preMinSubtotal > 0 && preMinSubtotal < minimumOrderValue
    ? round(minimumOrderValue - preMinSubtotal)
    : 0;

  const subtotal = baseAmountNoExpress + expressSurcharge + minimumOrderAdjustment;

  const freeDelivery = subtotal <= 0 || subtotal >= config.freeDeliveryThreshold;
  const zoneFee = order.zone ? config.zonePricing[order.zone]?.deliveryFee : undefined;
  const resolvedDeliveryFee = order.deliveryFeeOverride ?? zoneFee ?? config.deliveryFee;
  const deliveryFee = freeDelivery ? 0 : resolvedDeliveryFee;

  const packagingFee = order.packagingFee ?? config.packagingFee;

  const taxRatePercent = order.taxRate ?? config.taxRate;
  const taxAmount = taxRatePercent > 0 ? round(subtotal * (taxRatePercent / 100)) : 0;

  let discountAmount = order.discountAmount ?? 0;
  const trimmedCode = order.couponCode?.trim().toUpperCase();
  if (trimmedCode) {
    const coupon = config.discountRules[trimmedCode];
    if (coupon) {
      const couponDiscount = coupon.type === "percent" ? round(subtotal * (coupon.value / 100)) : coupon.value;
      discountAmount += couponDiscount;
    }
  }
  const preDiscountTotal = subtotal + taxAmount + deliveryFee + packagingFee;
  discountAmount = Math.min(discountAmount, preDiscountTotal);

  const grandTotal = Math.max(0, round(preDiscountTotal - discountAmount));

  const breakdownWithoutExplanation: Omit<PriceBreakdown, "explanation"> = {
    baseAmount: round(baseAmountNoExpress),
    itemizedTotal: itemLines,
    itemsAmount,
    weightAmount,
    expressSurcharge,
    minimumOrderAdjustment,
    subtotal: round(subtotal),
    freeDelivery,
    deliveryFee,
    packagingFee,
    taxRatePercent,
    taxAmount,
    discountAmount,
    grandTotal,
  };

  return {
    ok: true,
    breakdown: {
      ...breakdownWithoutExplanation,
      explanation: buildExplanation(order, config, breakdownWithoutExplanation),
    },
  };
}

// ---------------------------------------------------------------------------
// UI convenience helpers — used by the homepage price estimator, which is
// always an item-based (garment-count) flow with a single service selected.
// ---------------------------------------------------------------------------

export type GarmentCounts = Partial<Record<GarmentKey, number>>;

/** Garment keys actually offered/visible for the given service (Dry Cleaning hides non-dry-cleanable garments). */
export function getApplicableGarments(serviceKey: ServiceKey): GarmentKey[] {
  const list = serviceKey === "dry_cleaning" ? dryCleanableGarments : allGarments;
  return list.map((garment) => garment.key);
}

/** Drops counts for garments not applicable to the current service (e.g. leftover counts after switching to Dry Cleaning). */
export function filterGarmentCounts(garmentCounts: GarmentCounts, serviceKey: ServiceKey): GarmentCounts {
  const applicable = new Set(getApplicableGarments(serviceKey));
  const filtered: GarmentCounts = {};
  for (const [key, count] of Object.entries(garmentCounts)) {
    if (typeof count === "number" && count > 0 && applicable.has(key as GarmentKey)) {
      filtered[key as GarmentKey] = count;
    }
  }
  return filtered;
}

/** Total estimated weight in kg for the given garment counts, rounded to 1 decimal — display only. */
export function computeWeightKg(garmentCounts: GarmentCounts): number {
  let total = 0;
  for (const [key, count] of Object.entries(garmentCounts)) {
    if (!count) continue;
    const garment = defaultPricingConfig.itemRates[key as GarmentKey];
    if (!garment) continue;
    total += garment.weightKg * count;
  }
  return Math.round(total * 10) / 10;
}

export function computeGarmentTotal(garmentCounts: GarmentCounts): number {
  return Object.values(garmentCounts).reduce((sum, count) => sum + (count ?? 0), 0);
}

/** Maps a computed weight to the quote form's existing weight-tier options. */
export function mapWeightToQuoteFormTier(weightKg: number): string {
  if (weightKg < 5) return weightTiers[0];
  if (weightKg < 10) return weightTiers[1];
  if (weightKg < 20) return weightTiers[2];
  return weightTiers[3];
}

export type EstimatorInput = {
  serviceKey: ServiceKey;
  garmentCounts: GarmentCounts;
  express: boolean;
  couponCode?: string;
  /**
   * Per-kg services only: price a weight-based order at this many kg (from a
   * load-size preset) instead of pricing the garment counts. Ignored for
   * per-piece services, which always price by item.
   */
  presetWeightKg?: number;
};

export type EstimatorResult = {
  weightKg: number;
  garmentTotal: number;
  baseCost: number;
  expressSurcharge: number;
  minimumOrderAdjustment: number;
  pickupFee: number;
  taxAmount: number;
  discount: number;
  couponError: string | null;
  total: number;
};

/** Thin wrapper around computeEstimate for the estimator UI — prices a load-size preset (per-kg services) or the garment counts. */
export function computeEstimate_UI({ serviceKey, garmentCounts, express, couponCode, presetWeightKg }: EstimatorInput): EstimatorResult {
  const service = defaultPricingConfig.serviceRates[serviceKey];
  const usePresetWeight =
    presetWeightKg !== undefined && Number.isFinite(presetWeightKg) && presetWeightKg > 0 && service?.model === "per_kg";

  const applicableCounts = filterGarmentCounts(garmentCounts, serviceKey);
  const items: OrderItem[] = usePresetWeight
    ? []
    : Object.entries(applicableCounts)
        .filter(([, count]) => Boolean(count))
        .map(([category, quantity]) => ({ category: category as GarmentKey, quantity: quantity! }));

  const weightKg = usePresetWeight ? presetWeightKg : computeWeightKg(applicableCounts);
  const garmentTotal = usePresetWeight ? 0 : computeGarmentTotal(applicableCounts);
  const hasInput = usePresetWeight || items.length > 0;

  const trimmedCode = couponCode?.trim().toUpperCase();
  const couponError =
    trimmedCode && hasInput && !defaultPricingConfig.discountRules[trimmedCode]
      ? "Coupon code not recognized."
      : null;

  if (!hasInput) {
    return {
      weightKg,
      garmentTotal: 0,
      baseCost: 0,
      expressSurcharge: 0,
      minimumOrderAdjustment: 0,
      pickupFee: 0,
      taxAmount: 0,
      discount: 0,
      couponError,
      total: 0,
    };
  }

  const result = computeEstimate(
    usePresetWeight
      ? {
          serviceType: serviceKey,
          orderType: "weight",
          weightKg: presetWeightKg,
          urgency: express ? "express" : "standard",
          couponCode: couponError ? undefined : trimmedCode,
        }
      : {
          serviceType: serviceKey,
          orderType: "item",
          items,
          urgency: express ? "express" : "standard",
          couponCode: couponError ? undefined : trimmedCode,
        }
  );

  if (!result.ok) {
    // Every error here is a defensive-programming case (e.g. an unrecognized
    // garment key), not something the UI's own controls can produce.
    return {
      weightKg,
      garmentTotal,
      baseCost: 0,
      expressSurcharge: 0,
      minimumOrderAdjustment: 0,
      pickupFee: 0,
      taxAmount: 0,
      discount: 0,
      couponError: result.errors[0]?.message ?? "Unable to calculate this combination.",
      total: 0,
    };
  }

  const { breakdown } = result;
  return {
    weightKg,
    garmentTotal,
    baseCost: breakdown.baseAmount,
    expressSurcharge: breakdown.expressSurcharge,
    minimumOrderAdjustment: breakdown.minimumOrderAdjustment,
    pickupFee: breakdown.deliveryFee,
    taxAmount: breakdown.taxAmount,
    discount: breakdown.discountAmount,
    couponError,
    total: breakdown.grandTotal,
  };
}

/** Human-readable garment breakdown, e.g. "3 Shirts, 2 Jeans, 1 Saree (Silk)". */
export function buildGarmentSummary(garmentCounts: GarmentCounts): string {
  const parts: string[] = [];
  for (const [key, count] of Object.entries(garmentCounts)) {
    if (!count) continue;
    const garment = defaultPricingConfig.itemRates[key as GarmentKey];
    if (!garment) continue;
    parts.push(`${count} ${garment.label}`);
  }
  return parts.join(", ");
}

/** Same as `buildGarmentSummary`, but only for garments applicable to `serviceKey`. */
export function buildApplicableGarmentSummary(garmentCounts: GarmentCounts, serviceKey: ServiceKey): string {
  return buildGarmentSummary(filterGarmentCounts(garmentCounts, serviceKey));
}

export type RecommendationInput = {
  garmentCounts: GarmentCounts;
  garmentTotal: number;
  serviceKey: ServiceKey;
  preFeeSubtotal: number;
  /** Set when the estimate came from a load-size preset instead of garment counts. */
  presetWeightKg?: number;
};

const PREMIUM_CATEGORIES: ItemCategory[] = ["premium_items", "delicate_items"];

/**
 * A tip's `id` is its stable identity: the text may update every click (garment
 * count, remaining-to-free-delivery amount), but the id only changes when the
 * tip itself appears or disappears — UI lists must key on `id`, not `text`, so
 * in-place text updates don't remount (and re-animate) the whole row.
 */
export type RecommendationTip = {
  id: "garment-count" | "service" | "premium-care" | "delivery";
  text: string;
};

/** Ordered list of short, dynamic tips shown alongside the live estimate. */
export function generateRecommendations({
  garmentCounts,
  garmentTotal,
  serviceKey,
  preFeeSubtotal,
  presetWeightKg,
}: RecommendationInput): RecommendationTip[] {
  const tips: RecommendationTip[] = [];

  const hasPresetLoad = presetWeightKg !== undefined && presetWeightKg > 0;
  if (garmentTotal === 0 && !hasPresetLoad) {
    return tips;
  }

  // The weigh-at-pickup reassurance lives next to the price in the estimate
  // card, so the tip here only restates the load size.
  tips.push(
    hasPresetLoad
      ? { id: "garment-count", text: `Your load is approximately ${presetWeightKg} kg.` }
      : {
          id: "garment-count",
          text: `Your laundry is approximately ${garmentTotal} garment${garmentTotal === 1 ? "" : "s"}.`,
        }
  );

  const service = defaultPricingConfig.serviceRates[serviceKey];
  if (service) {
    tips.push({ id: "service", text: service.recommendationTip });
  }

  const hasPremiumItems = Object.entries(garmentCounts).some(([key, count]) => {
    if (!count) return false;
    const garment = defaultPricingConfig.itemRates[key as GarmentKey];
    return garment && PREMIUM_CATEGORIES.includes(garment.category);
  });
  if (hasPremiumItems && serviceKey !== "dry_cleaning") {
    tips.push({
      id: "premium-care",
      text: "You've added delicate or premium items — Dry Cleaning gives them extra care.",
    });
  }

  if (preFeeSubtotal > 0 && preFeeSubtotal < defaultPricingConfig.freeDeliveryThreshold) {
    const remaining = defaultPricingConfig.freeDeliveryThreshold - preFeeSubtotal;
    tips.push({ id: "delivery", text: `Add ${formatINR(remaining)} more to unlock Free Delivery.` });
  } else {
    tips.push({ id: "delivery", text: "Free delivery unlocked on this order." });
  }

  return tips;
}
