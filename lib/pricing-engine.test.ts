import { test } from "node:test";
import assert from "node:assert/strict";

import { computeEstimate, computeEstimate_UI, type OrderInput, type OrderType } from "@/lib/pricing-engine";
import {
  garmentByKey,
  serviceByKey,
  expressRates,
  couponByCode,
  defaultPricingConfig,
  MINIMUM_ORDER_VALUE,
  FREE_DELIVERY_THRESHOLD,
  DELIVERY_FEE,
  zonePricing,
  type GarmentKey,
  type PricingConfig,
} from "@/config/pricing";

function configWith(overrides: Partial<PricingConfig>): PricingConfig {
  return { ...defaultPricingConfig, ...overrides };
}

function expectOk(order: OrderInput) {
  const result = computeEstimate(order);
  assert.equal(result.ok, true, result.ok ? "" : JSON.stringify(result.errors));
  if (!result.ok) throw new Error("unreachable");
  return result.breakdown;
}

function expectRejected(order: OrderInput) {
  const result = computeEstimate(order);
  assert.equal(result.ok, false);
  if (result.ok) throw new Error("unreachable");
  return result.errors;
}

// 1. 5 kg wash & fold ---------------------------------------------------

test("5 kg Wash & Fold (weight order)", () => {
  const breakdown = expectOk({ serviceType: "wash_fold", orderType: "weight", weightKg: 5 });

  assert.equal(breakdown.weightAmount, 5 * serviceByKey.wash_fold.perKgRate!.default);
  assert.equal(breakdown.baseAmount, breakdown.weightAmount);
  // ₹360 sits between the ₹199 minimum and the ₹499 free-delivery threshold,
  // so this order pays the delivery fee.
  assert.ok(breakdown.subtotal < FREE_DELIVERY_THRESHOLD);
  assert.equal(breakdown.freeDelivery, false);
  assert.equal(breakdown.deliveryFee, DELIVERY_FEE);
});

// 2. 1 shirt + 1 trouser --------------------------------------------------

test("1 shirt + 1 trouser (item order, Dry Cleaning)", () => {
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [
      { category: "shirt", quantity: 1 },
      { category: "trousers", quantity: 1 },
    ],
  });

  assert.equal(breakdown.itemizedTotal.length, 2);
  assert.equal(
    breakdown.baseAmount,
    garmentByKey.shirt.perPieceRate!.default + garmentByKey.trousers.perPieceRate!.default
  );
});

// 3. 2 sarees with dry cleaning -------------------------------------------

test("2 sarees (silk) with Dry Cleaning", () => {
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
  });

  const expected = 2 * garmentByKey.saree_silk.perPieceRate!.default;
  assert.equal(breakdown.baseAmount, expected);
  assert.equal(breakdown.grandTotal, expected); // already above both minimum order and free-delivery thresholds
});

// 4. Express order below the free-delivery threshold ----------------------

test("Express order that stays below the free-delivery threshold pays the delivery fee", () => {
  // minimumOrderValue is overridden to 0 here so this test isolates
  // delivery-fee behavior from the (higher) default minimum-order top-up.
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 1,
    urgency: "express",
    minimumOrderValue: 0,
  });

  const expectedAmount = 1 * expressRates.perKgRate.default;
  assert.equal(breakdown.weightAmount, expectedAmount);
  assert.ok(expectedAmount < FREE_DELIVERY_THRESHOLD);
  assert.equal(breakdown.freeDelivery, false);
  assert.equal(breakdown.deliveryFee, DELIVERY_FEE);
  assert.equal(breakdown.grandTotal, expectedAmount + DELIVERY_FEE);
});

// 5. Order above the free-delivery threshold gets free delivery ------------

test("Order above the free-delivery threshold qualifies for free delivery", () => {
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 7,
    minimumOrderValue: 0, // isolate the free-delivery threshold from the minimum-order rule
  });

  const expectedAmount = 7 * serviceByKey.wash_fold.perKgRate!.default;
  assert.ok(expectedAmount >= FREE_DELIVERY_THRESHOLD);
  assert.equal(breakdown.freeDelivery, true);
  assert.equal(breakdown.deliveryFee, 0);
  assert.equal(breakdown.grandTotal, expectedAmount);
});

// 6. Order below minimum order value --------------------------------------

test("Order below minimum order value gets topped up (policy: adjust)", () => {
  const breakdown = expectOk({
    serviceType: "steam_iron",
    orderType: "item",
    items: [{ category: "t_shirt", quantity: 1 }],
  });

  assert.equal(breakdown.baseAmount, serviceByKey.steam_iron.flatPerPieceRate!.default);
  assert.equal(breakdown.minimumOrderAdjustment, MINIMUM_ORDER_VALUE - breakdown.baseAmount);
  assert.equal(breakdown.subtotal, MINIMUM_ORDER_VALUE);
  // A topped-up order is still below the free-delivery threshold, so it also
  // pays the delivery fee — the minimum no longer gifts free delivery.
  assert.equal(breakdown.freeDelivery, false);
  assert.equal(breakdown.grandTotal, MINIMUM_ORDER_VALUE + DELIVERY_FEE);
});

test("Order below minimum order value is rejected (policy: block)", () => {
  const errors = expectRejected({
    serviceType: "steam_iron",
    orderType: "item",
    items: [{ category: "t_shirt", quantity: 1 }],
    minimumOrderPolicy: "block",
  });

  assert.ok(errors.some((e) => e.field === "minimumOrderValue"));
});

// 7. Mixed garment order ----------------------------------------------------

test("Mixed garment order sums the itemized leg and the weight leg separately", () => {
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "mixed",
    items: [{ category: "shirt", quantity: 2 }],
    weightKg: 3,
  });

  const perKgRate = serviceByKey.wash_fold.perKgRate!.default;
  const expectedItemsAmount = Math.round(Math.round(garmentByKey.shirt.weightKg * perKgRate) * 2);
  const expectedWeightAmount = Math.round(3 * perKgRate);

  assert.equal(breakdown.itemsAmount, expectedItemsAmount);
  assert.equal(breakdown.weightAmount, expectedWeightAmount);
  assert.equal(breakdown.baseAmount, expectedItemsAmount + expectedWeightAmount);
});

// 8. Invalid item category ---------------------------------------------------

test("Invalid garment category is rejected", () => {
  const errors = expectRejected({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "not_a_real_garment" as unknown as GarmentKey, quantity: 1 }],
  });

  assert.ok(errors.some((e) => e.field === "items[0].category"));
});

// 9. Zero quantity ------------------------------------------------------------

test("Zero quantity is rejected", () => {
  const errors = expectRejected({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "shirt", quantity: 0 }],
  });

  assert.ok(errors.some((e) => e.field === "items[0].quantity"));
});

test("Negative quantity is rejected", () => {
  const errors = expectRejected({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "shirt", quantity: -2 }],
  });

  assert.ok(errors.some((e) => e.field === "items[0].quantity"));
});

// 10. Zero weight ---------------------------------------------------------------

test("Zero weight is rejected", () => {
  const errors = expectRejected({ serviceType: "wash_fold", orderType: "weight", weightKg: 0 });
  assert.ok(errors.some((e) => e.field === "weightKg"));
});

test("Negative weight is rejected", () => {
  const errors = expectRejected({ serviceType: "wash_fold", orderType: "weight", weightKg: -3 });
  assert.ok(errors.some((e) => e.field === "weightKg"));
});

// Additional coverage for the new delivery/packaging/zone rules -----------------

test("Missing service type is rejected", () => {
  const errors = expectRejected({
    serviceType: undefined as unknown as OrderInput["serviceType"],
    orderType: "weight",
    weightKg: 5,
  });
  assert.ok(errors.some((e) => e.field === "serviceType"));
});

test("Weight-based orders are rejected for a per-piece-only service", () => {
  const errors = expectRejected({ serviceType: "dry_cleaning", orderType: "weight", weightKg: 5 });
  assert.ok(errors.some((e) => e.field === "serviceType"));
});

test("Non-dry-cleanable combination is still caught if a garment has no per-piece rate", () => {
  // Every current garment defines a perPieceRate, so this exercises the guard
  // via an unknown category instead — kept as a regression check that the
  // Dry Cleaning per-piece-rate validation branch doesn't false-positive on
  // real garments now that bedsheets/towels have their own rates.
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "bedsheet_single", quantity: 1 }],
  });
  assert.equal(breakdown.baseAmount, garmentByKey.bedsheet_single.perPieceRate!.default);
});

test("Zone pricing overrides the flat delivery fee for small orders", () => {
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 1,
    minimumOrderValue: 0,
    zone: "outer",
  });

  assert.equal(breakdown.freeDelivery, false);
  assert.equal(breakdown.deliveryFee, zonePricing.outer.deliveryFee);
});

test("Unknown zone is rejected", () => {
  const errors = expectRejected({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 1,
    zone: "not_a_real_zone",
  });
  assert.ok(errors.some((e) => e.field === "zone"));
});

test("Packaging fee is added as its own line when configured", () => {
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
    packagingFee: 25,
  });

  assert.equal(breakdown.packagingFee, 25);
  assert.equal(breakdown.grandTotal, breakdown.subtotal + breakdown.taxAmount + breakdown.deliveryFee + 25);
});

test("Explanation string summarizes the bill", () => {
  // 5 kg × ₹72 = ₹360, plus the ₹49 delivery fee (below the ₹499 threshold).
  const breakdown = expectOk({ serviceType: "wash_fold", orderType: "weight", weightKg: 5 });
  assert.ok(breakdown.explanation.includes("Delivery fee: ₹49"));
  assert.ok(breakdown.explanation.includes("Total: ₹409"));

  // A tiny order shows the minimum-order top-up instead.
  const tiny = expectOk({
    serviceType: "steam_iron",
    orderType: "item",
    items: [{ category: "t_shirt", quantity: 1 }],
  });
  assert.ok(tiny.explanation.includes("Minimum order adjustment"));
});

// Hardening coverage: order-type/numeric-input validation, boundaries, and
// single-application of every fee line ---------------------------------------

test("Unknown order type is rejected instead of pricing to ₹0", () => {
  const errors = expectRejected({
    serviceType: "wash_fold",
    orderType: "bogus" as OrderType,
    weightKg: 5,
  });
  assert.ok(errors.some((e) => e.field === "orderType"));
});

test("Missing order type is rejected", () => {
  const errors = expectRejected({
    serviceType: "wash_fold",
    orderType: undefined as unknown as OrderType,
    weightKg: 5,
  });
  assert.ok(errors.some((e) => e.field === "orderType"));
});

test("Empty items array is rejected for item orders", () => {
  const errors = expectRejected({ serviceType: "dry_cleaning", orderType: "item", items: [] });
  assert.ok(errors.some((e) => e.field === "items"));
});

test("Non-finite weight is rejected", () => {
  for (const weightKg of [Infinity, NaN]) {
    const errors = expectRejected({ serviceType: "wash_fold", orderType: "weight", weightKg });
    assert.ok(errors.some((e) => e.field === "weightKg"), `weightKg=${weightKg}`);
  }
});

test("Non-finite numeric overrides are rejected instead of producing NaN totals", () => {
  const base: OrderInput = { serviceType: "wash_fold", orderType: "weight", weightKg: 5 };
  const cases: Array<[Partial<OrderInput>, string]> = [
    [{ taxRate: NaN }, "taxRate"],
    [{ discountAmount: NaN }, "discountAmount"],
    [{ deliveryFeeOverride: Infinity }, "deliveryFeeOverride"],
    [{ packagingFee: NaN }, "packagingFee"],
    [{ minimumOrderValue: NaN }, "minimumOrderValue"],
  ];
  for (const [override, field] of cases) {
    const errors = expectRejected({ ...base, ...override });
    assert.ok(errors.some((e) => e.field === field), field);
  }
});

test("Non-integer quantity is rejected", () => {
  const errors = expectRejected({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "shirt", quantity: 1.5 }],
  });
  assert.ok(errors.some((e) => e.field === "items[0].quantity"));
});

test("Free-delivery threshold boundary: exactly at threshold is free, one rupee under is not", () => {
  // 5 kg Wash & Fold = ₹360; pin the threshold on either side of it.
  const at = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 5,
    minimumOrderValue: 0,
    pricingConfig: configWith({ freeDeliveryThreshold: 360 }),
  });
  assert.equal(at.freeDelivery, true);
  assert.equal(at.deliveryFee, 0);

  const under = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 5,
    minimumOrderValue: 0,
    pricingConfig: configWith({ freeDeliveryThreshold: 361 }),
  });
  assert.equal(under.freeDelivery, false);
  assert.equal(under.deliveryFee, DELIVERY_FEE);
  assert.equal(under.grandTotal, 360 + DELIVERY_FEE);
});

test("Minimum-order boundary: subtotal exactly at the minimum gets no top-up", () => {
  const exact = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 5, // ₹360
    minimumOrderValue: 360,
  });
  assert.equal(exact.minimumOrderAdjustment, 0);

  const oneUnder = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 5,
    minimumOrderValue: 361,
  });
  assert.equal(oneUnder.minimumOrderAdjustment, 1);
  assert.equal(oneUnder.subtotal, 361);
});

test("Default config keeps a live delivery-fee band between the minimum and the threshold", () => {
  // Guards the CFO pricing structure: if the minimum ever creeps above the
  // free-delivery threshold again, the delivery fee becomes dead code and
  // every topped-up order silently ships free.
  assert.ok(MINIMUM_ORDER_VALUE < FREE_DELIVERY_THRESHOLD);

  // An order inside the band (₹199 ≤ subtotal < ₹499) pays the fee…
  const inBand = expectOk({ serviceType: "wash_fold", orderType: "weight", weightKg: 4 }); // ₹288
  assert.equal(inBand.freeDelivery, false);
  assert.equal(inBand.deliveryFee, DELIVERY_FEE);

  // …and one above the threshold does not.
  const above = expectOk({ serviceType: "wash_fold", orderType: "weight", weightKg: 7 }); // ₹504
  assert.equal(above.freeDelivery, true);
  assert.equal(above.deliveryFee, 0);
});

test("Express surcharge equals the express/standard delta and is applied once", () => {
  const standard = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
  });
  const express = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
    urgency: "express",
  });

  const expectedUnit = Math.round(garmentByKey.saree_silk.perPieceRate!.default * expressRates.multiplier);
  assert.equal(express.expressSurcharge, expectedUnit * 2 - standard.baseAmount);
  assert.equal(express.subtotal, express.baseAmount + express.expressSurcharge + express.minimumOrderAdjustment);
});

test("Express surcharge never goes negative when the express rate undercuts the standard rate", () => {
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 5,
    urgency: "express",
    minimumOrderValue: 0,
    pricingConfig: configWith({
      expressRates: { ...expressRates, perKgRate: { min: 0, max: 0, default: 10 } },
    }),
  });
  assert.equal(breakdown.expressSurcharge, 0);
  // The breakdown falls back to the standard-priced leg, so the reported
  // weight amount matches what is actually billed — not the cheaper express leg.
  assert.equal(breakdown.weightAmount, 5 * serviceByKey.wash_fold.perKgRate!.default);
  assert.equal(breakdown.subtotal, breakdown.weightAmount);
});

test("Duplicate item entries price the same as a single combined line", () => {
  const split = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [
      { category: "shirt", quantity: 2 },
      { category: "shirt", quantity: 3 },
    ],
  });
  const combined = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "shirt", quantity: 5 }],
  });
  assert.equal(split.baseAmount, combined.baseAmount);
  assert.equal(split.grandTotal, combined.grandTotal);
});

test("Very large orders still produce finite, integer totals", () => {
  const heavy = expectOk({ serviceType: "wash_fold", orderType: "weight", weightKg: 1_000_000 });
  assert.ok(Number.isFinite(heavy.grandTotal));
  assert.ok(Number.isInteger(heavy.grandTotal));

  const many = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "shirt", quantity: 1_000_000 }],
  });
  assert.ok(Number.isFinite(many.grandTotal));
  assert.ok(Number.isInteger(many.grandTotal));
});

test("Fractional weights round to the nearest rupee once, at the line level", () => {
  // 2.3125 kg × ₹72 = ₹166.5 → rounds to ₹167.
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 2.3125,
    minimumOrderValue: 0,
  });
  assert.equal(breakdown.weightAmount, 167);
  assert.ok(Number.isInteger(breakdown.grandTotal));
});

test("Delivery fee, tax, and packaging are each applied exactly once in the grand total", () => {
  const breakdown = expectOk({
    serviceType: "wash_fold",
    orderType: "weight",
    weightKg: 1, // ₹72 — below both thresholds
    minimumOrderValue: 0,
    taxRate: 18,
    packagingFee: 25,
  });
  assert.equal(breakdown.deliveryFee, DELIVERY_FEE);
  assert.equal(breakdown.taxAmount, Math.round(breakdown.subtotal * 0.18));
  assert.equal(
    breakdown.grandTotal,
    breakdown.subtotal + breakdown.taxAmount + breakdown.deliveryFee + breakdown.packagingFee - breakdown.discountAmount
  );
});

test("Flat coupon is applied exactly once", () => {
  const withCoupon = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
    couponCode: "flat50", // case-insensitive
  });
  const without = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
  });
  assert.equal(withCoupon.discountAmount, couponByCode.FLAT50.value);
  assert.equal(withCoupon.grandTotal, without.grandTotal - couponByCode.FLAT50.value);
});

test("Percent coupon and flat discount are summed, then capped at the payable total", () => {
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }], // ₹580 subtotal
    couponCode: "FIRST10",
    discountAmount: 25,
  });
  assert.equal(breakdown.discountAmount, Math.round(breakdown.subtotal * 0.1) + 25);

  const capped = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_silk", quantity: 2 }],
    couponCode: "FIRST10",
    discountAmount: 100000,
  });
  assert.equal(capped.grandTotal, 0);
});

test("Mixed express order surcharge covers both the items leg and the weight leg", () => {
  const standard = expectOk({
    serviceType: "wash_fold",
    orderType: "mixed",
    items: [{ category: "shirt", quantity: 2 }],
    weightKg: 3,
  });
  const express = expectOk({
    serviceType: "wash_fold",
    orderType: "mixed",
    items: [{ category: "shirt", quantity: 2 }],
    weightKg: 3,
    urgency: "express",
  });
  assert.equal(express.expressSurcharge, express.itemsAmount + express.weightAmount - standard.baseAmount);
});

// computeEstimate_UI (homepage estimator wrapper) ------------------------------

test("Estimator UI: empty garment counts return an all-zero estimate", () => {
  const result = computeEstimate_UI({ serviceKey: "wash_fold", garmentCounts: {}, express: false });
  assert.equal(result.total, 0);
  assert.equal(result.garmentTotal, 0);
  assert.equal(result.couponError, null);
});

test("Estimator UI: zero and negative counts are ignored", () => {
  const result = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: { shirt: 0, jeans: -3 },
    express: false,
  });
  assert.equal(result.total, 0);
  assert.equal(result.garmentTotal, 0);
});

test("Estimator UI: load-size preset prices a weight order for per-kg services", () => {
  const result = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: {},
    express: false,
    presetWeightKg: 7.5,
  });
  const expected = Math.round(7.5 * serviceByKey.wash_fold.perKgRate!.default); // ₹540
  assert.equal(result.weightKg, 7.5);
  assert.equal(result.garmentTotal, 0);
  assert.equal(result.baseCost, expected);
  assert.ok(expected >= FREE_DELIVERY_THRESHOLD);
  assert.equal(result.pickupFee, 0);
  assert.equal(result.total, expected);
});

test("Estimator UI: preset weight wins over garment counts for per-kg services", () => {
  const withBoth = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: { shirt: 5 },
    express: false,
    presetWeightKg: 4,
  });
  const presetOnly = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: {},
    express: false,
    presetWeightKg: 4,
  });
  assert.equal(withBoth.total, presetOnly.total);
  assert.equal(withBoth.garmentTotal, 0);
});

test("Estimator UI: preset weight is ignored for per-piece services", () => {
  const result = computeEstimate_UI({
    serviceKey: "dry_cleaning",
    garmentCounts: { shirt: 2 },
    express: false,
    presetWeightKg: 7.5,
  });
  assert.equal(result.garmentTotal, 2);
  assert.equal(result.baseCost, 2 * garmentByKey.shirt.perPieceRate!.default);
});

test("Estimator UI: small preset load pays the delivery fee", () => {
  const result = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: {},
    express: false,
    presetWeightKg: 4, // ₹288 — inside the fee band
  });
  assert.equal(result.pickupFee, DELIVERY_FEE);
});

test("Estimator UI: unknown coupon reports an error and applies no discount", () => {
  const result = computeEstimate_UI({
    serviceKey: "wash_fold",
    garmentCounts: { shirt: 5 },
    express: false,
    couponCode: "NOT_A_COUPON",
  });
  assert.equal(result.couponError, "Coupon code not recognized.");
  assert.equal(result.discount, 0);
  assert.ok(result.total > 0);
});

test("Totals are always rounded to the nearest rupee and never negative", () => {
  const breakdown = expectOk({
    serviceType: "dry_cleaning",
    orderType: "item",
    items: [{ category: "saree_cotton", quantity: 1 }],
    discountAmount: 100000,
  });

  assert.equal(Number.isInteger(breakdown.grandTotal), true);
  assert.equal(breakdown.grandTotal, 0);
});
