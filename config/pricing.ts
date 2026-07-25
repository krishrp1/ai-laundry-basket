/**
 * Single source of truth for every price, delivery rule, and scheduling
 * constant used by the price estimator, the quote form, and the pricing
 * page. Update numbers here — nothing else needs to change.
 *
 * To edit a rate: find the garment or service below and change its
 * `default` value (keep `min`/`max` as honest documentation of the
 * Bangalore benchmark band that value should stay inside — they aren't
 * enforced at runtime, they're for whoever edits this file next).
 */

export type PriceBand = {
  /** Lower bound of the Bangalore benchmark band, for reference only. */
  min: number;
  /** Upper bound of the Bangalore benchmark band, for reference only. */
  max: number;
  /** The rate actually used by the calculator. Edit this to change pricing. */
  default: number;
};

/** Broad handling category — drives no pricing logic directly, but groups garments for display and future rules (e.g. a delicate-handling surcharge). */
export type ItemCategory =
  | "wearable_items"
  | "non_wearable_items"
  | "delicate_items"
  | "premium_items";

export const categoryLabels: Record<ItemCategory, string> = {
  wearable_items: "Everyday Wearables",
  non_wearable_items: "Household Linen",
  delicate_items: "Delicate Fabrics",
  premium_items: "Premium & Occasion Wear",
};

export type PricingModel = "per_kg" | "per_piece";

export type ServiceKey = "wash_fold" | "wash_iron" | "steam_iron" | "dry_cleaning";

export type ServiceDefinition = {
  key: ServiceKey;
  label: string;
  model: PricingModel;
  /** Rate per kg — only set for per_kg services (Wash & Fold, Wash & Iron). */
  perKgRate?: PriceBand;
  /** Flat rate per garment regardless of type — only set for Steam Iron. */
  flatPerPieceRate?: PriceBand;
  description: string;
  /** Short tip shown when this service is selected in the estimator. */
  recommendationTip: string;
};

/** serviceRates: per-kg and flat per-piece rates for each service level. */
export const services: ServiceDefinition[] = [
  {
    key: "wash_fold",
    label: "Wash & Fold",
    model: "per_kg",
    perKgRate: { min: 55, max: 89, default: 72 },
    description: "Everyday laundry washed, dried, and neatly folded.",
    recommendationTip: "Wash & Fold offers the best value for everyday clothes.",
  },
  {
    key: "wash_iron",
    label: "Wash & Iron",
    model: "per_kg",
    perKgRate: { min: 79, max: 129, default: 99 },
    description: "Washed and pressed for a crisp, ready-to-wear finish.",
    recommendationTip: "Wash & Iron is great if you want clothes ready to wear straight away.",
  },
  {
    key: "steam_iron",
    label: "Steam Iron",
    model: "per_piece",
    flatPerPieceRate: { min: 15, max: 25, default: 20 },
    description: "Steam pressing for crisp, wrinkle-free clothes.",
    recommendationTip: "Steam Iron works great as a quick touch-up for already-clean clothes.",
  },
  {
    key: "dry_cleaning",
    label: "Dry Cleaning",
    model: "per_piece",
    description: "Expert dry cleaning, priced per garment.",
    recommendationTip: "Dry Cleaning keeps delicate pieces like sarees and lehengas looking new.",
  },
];

export const serviceByKey = Object.fromEntries(
  services.map((service) => [service.key, service])
) as Record<ServiceKey, ServiceDefinition>;

export type GarmentKey =
  | "shirt"
  | "t_shirt"
  | "trousers"
  | "jeans"
  | "kurti_plain"
  | "kurti_fancy"
  | "bedsheet_single"
  | "bedsheet_double"
  | "towel_small"
  | "towel_large"
  | "saree_cotton"
  | "saree_silk"
  | "saree_fancy"
  | "lehenga_plain"
  | "lehenga_heavy"
  | "sherwani"
  | "blanket"
  | "curtain"
  | "suit"
  | "gown";

export type GarmentDefinition = {
  key: GarmentKey;
  label: string;
  icon: string;
  category: ItemCategory;
  /** Average weight in kg for one unit, used by per-kg services and mixed orders. */
  weightKg: number;
  /** Per-garment rate for per-piece services (Steam Iron uses its own flat rate instead; this is used by Dry Cleaning). Omitted only for garments with no realistic per-piece service. */
  perPieceRate?: PriceBand;
};

/** itemRates: per-garment weight and per-piece rate for every supported category. */
export const garments: GarmentDefinition[] = [
  { key: "shirt", label: "Shirts", icon: "👔", category: "wearable_items", weightKg: 0.2, perPieceRate: { min: 85, max: 119, default: 99 } },
  { key: "t_shirt", label: "T-Shirts", icon: "👕", category: "wearable_items", weightKg: 0.15, perPieceRate: { min: 85, max: 119, default: 89 } },
  { key: "trousers", label: "Trousers", icon: "🩳", category: "wearable_items", weightKg: 0.3, perPieceRate: { min: 85, max: 119, default: 105 } },
  { key: "jeans", label: "Jeans", icon: "👖", category: "wearable_items", weightKg: 0.33, perPieceRate: { min: 119, max: 130, default: 125 } },
  { key: "kurti_plain", label: "Kurtis (Plain)", icon: "👘", category: "wearable_items", weightKg: 0.25, perPieceRate: { min: 89, max: 119, default: 99 } },
  { key: "kurti_fancy", label: "Kurtis (Fancy)", icon: "👘", category: "delicate_items", weightKg: 0.3, perPieceRate: { min: 130, max: 180, default: 150 } },
  { key: "bedsheet_single", label: "Bedsheets (Single)", icon: "🛏️", category: "non_wearable_items", weightKg: 1.0, perPieceRate: { min: 60, max: 90, default: 75 } },
  { key: "bedsheet_double", label: "Bedsheets (Double)", icon: "🛏️", category: "non_wearable_items", weightKg: 1.5, perPieceRate: { min: 90, max: 130, default: 110 } },
  { key: "towel_small", label: "Towels (Small)", icon: "🧺", category: "non_wearable_items", weightKg: 0.25, perPieceRate: { min: 25, max: 40, default: 32 } },
  { key: "towel_large", label: "Towels (Large)", icon: "🧺", category: "non_wearable_items", weightKg: 0.45, perPieceRate: { min: 40, max: 60, default: 50 } },
  { key: "saree_cotton", label: "Sarees (Cotton)", icon: "🥻", category: "delicate_items", weightKg: 0.45, perPieceRate: { min: 200, max: 260, default: 220 } },
  { key: "saree_silk", label: "Sarees (Silk)", icon: "🥻", category: "delicate_items", weightKg: 0.5, perPieceRate: { min: 260, max: 340, default: 290 } },
  { key: "saree_fancy", label: "Sarees (Fancy/Work)", icon: "🥻", category: "premium_items", weightKg: 0.6, perPieceRate: { min: 320, max: 390, default: 360 } },
  { key: "lehenga_plain", label: "Lehengas (Plain)", icon: "💃", category: "premium_items", weightKg: 1.0, perPieceRate: { min: 350, max: 480, default: 420 } },
  { key: "lehenga_heavy", label: "Lehengas (Heavy Work)", icon: "💃", category: "premium_items", weightKg: 1.4, perPieceRate: { min: 480, max: 750, default: 620 } },
  { key: "sherwani", label: "Sherwanis", icon: "🥼", category: "premium_items", weightKg: 0.9, perPieceRate: { min: 550, max: 650, default: 600 } },
  { key: "blanket", label: "Blankets", icon: "🛌", category: "non_wearable_items", weightKg: 2.2, perPieceRate: { min: 150, max: 220, default: 180 } },
  { key: "curtain", label: "Curtains", icon: "🪟", category: "non_wearable_items", weightKg: 1.0, perPieceRate: { min: 120, max: 180, default: 150 } },
  { key: "suit", label: "Suits", icon: "🤵", category: "premium_items", weightKg: 1.6, perPieceRate: { min: 350, max: 450, default: 400 } },
  { key: "gown", label: "Gowns", icon: "👗", category: "premium_items", weightKg: 0.8, perPieceRate: { min: 300, max: 450, default: 360 } },
];

export const garmentByKey = Object.fromEntries(
  garments.map((garment) => [garment.key, garment])
) as Record<GarmentKey, GarmentDefinition>;

/** Garments realistically offered under Dry Cleaning (every garment with a perPieceRate). */
export const dryCleanableGarments = garments.filter((g) => g.perPieceRate !== undefined);

/** expressRates: Express / Rush is modeled as an urgency flag rather than a 5th selectable service — see lib/pricing-engine.ts for why. */
export const expressRates = {
  label: "Express / Rush (12-24h)",
  /** Overrides a per-kg service's own rate when urgency is "express" — the Bangalore Express benchmark band. */
  perKgRate: { min: 139, max: 249, default: 180 } as PriceBand,
  /** Multiplies a per-piece line's rate when urgency is "express". */
  multiplier: 1.5,
};

/**
 * Orders below this subtotal (in ₹) get a minimum-billing top-up (or are
 * blocked, per minimumOrderPolicy). Overridable per order via
 * OrderInput.minimumOrderValue.
 *
 * Kept BELOW freeDeliveryThreshold on purpose: orders between the two pay
 * the delivery fee, so small orders cover their own pickup/drop cost instead
 * of the minimum silently gifting free delivery (which is what happened when
 * this was ₹399 against a ₹350 threshold).
 */
export const MINIMUM_ORDER_VALUE = 199;

/** "adjust" tops the order up to the minimum; "block" rejects checkout with a validation error instead. */
export const MINIMUM_ORDER_POLICY: "adjust" | "block" = "adjust";

/** Tax is disabled by default (prices already read as GST-inclusive site-wide) — a taxRate of 0 means no tax line is shown. Enable per order via OrderInput.taxRate (percent). */
export const TAX_RATE_PERCENT = 0;

/**
 * Orders at or above this subtotal (in ₹) get free delivery. Set just above a
 * typical single-person weekly load (3-5 kg Wash & Fold ≈ ₹216-360) to nudge
 * customers toward batching two weeks or adding ironing — the same
 * "free above a threshold, nominal fee below" pattern the Bangalore doorstep
 * chains use.
 */
export const FREE_DELIVERY_THRESHOLD = 499;

/**
 * Flat delivery fee charged on orders below the free-delivery threshold. A
 * nominal convenience fee that recovers most of a rider round-trip — the
 * minimum-order top-up (₹199) already floors very small orders, so this no
 * longer needs to be punitive.
 */
export const DELIVERY_FEE = 49;

/** Optional flat packaging/handling fee, disabled by default (0). Set a positive default here, or pass OrderInput.packagingFee per order. */
export const PACKAGING_FEE = 0;

export type ZoneRate = { label: string; deliveryFee: number };

/**
 * Optional zone-based delivery pricing — pass OrderInput.zone to use a zone's
 * rate instead of the flat DELIVERY_FEE for orders below the free-delivery
 * threshold. Not wired into the homepage estimator's UI yet (it doesn't
 * collect a zone), but ready for admin/API use.
 */
export const zonePricing: Record<string, ZoneRate> = {
  local: { label: "Local zone", deliveryFee: 29 },
  standard: { label: "Standard zone", deliveryFee: 49 },
  outer: { label: "Outer zone", deliveryFee: 69 },
};

export type Coupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
  label: string;
};

/** discountRules: demo coupon codes, applied client-side only. */
export const coupons: Coupon[] = [
  { code: "FIRST10", type: "percent", value: 10, label: "10% off your first order" },
  { code: "FLAT50", type: "flat", value: 50, label: "₹50 off" },
];

export const couponByCode = Object.fromEntries(
  coupons.map((coupon) => [coupon.code, coupon])
) as Record<string, Coupon>;

export type PickupWindow = {
  label: string;
  startHour: number;
  endHour: number;
};

/** The 3 standard pickup windows, shared by the quote form and the estimator. */
export const pickupWindows: PickupWindow[] = [
  { label: "Morning (7 AM - 11 AM)", startHour: 7, endHour: 11 },
  { label: "Afternoon (11 AM - 3 PM)", startHour: 11, endHour: 15 },
  { label: "Evening (3 PM - 8 PM)", startHour: 15, endHour: 20 },
];

/** The quote form's estimated-weight tiers, shared with the estimator's weight-to-tier mapping. */
export const weightTiers = [
  "Under 5 kg (1-2 small bags)",
  "5-10 kg (about 1 hamper)",
  "10-20 kg (2-3 hampers)",
  "20+ kg (large household or commercial)",
];

export type LoadPreset = {
  key: string;
  label: string;
  sublabel: string;
  icon: string;
  /**
   * Representative weight (tier midpoint) used to price the estimate — actual
   * billing is by weighing at pickup, so this only needs to be an honest
   * anchor, not exact.
   */
  weightKg: number;
  /** The weightTiers entry this preset maps to when prefilling the quote form. */
  quoteTier: string;
};

/**
 * Load-size presets for the per-kg services (Wash & Fold, Wash & Iron) —
 * customers can answer "about a hamper" instantly, where "how many kg" or
 * per-garment counting stalls them (and misses undergarments, socks, etc.
 * that never get itemized). One preset per quote-form weight tier.
 */
export const loadPresets: LoadPreset[] = [
  { key: "small", label: "A few clothes", sublabel: "Under 5 kg · 1-2 small bags", icon: "🛍️", weightKg: 4, quoteTier: weightTiers[0] },
  { key: "hamper", label: "One hamper", sublabel: "5-10 kg · about a week's laundry", icon: "🧺", weightKg: 7.5, quoteTier: weightTiers[1] },
  { key: "family", label: "Two-three hampers", sublabel: "10-20 kg · family-size load", icon: "🏠", weightKg: 15, quoteTier: weightTiers[2] },
  { key: "bulk", label: "Large household", sublabel: "20+ kg · bulk or commercial", icon: "🏢", weightKg: 22, quoteTier: weightTiers[3] },
];

/**
 * Everything the pricing engine needs, bundled into one object so admins
 * (or tests) can override the whole rate table without touching
 * lib/pricing-engine.ts — pass a modified copy as OrderInput.pricingConfig.
 * Field names deliberately mirror the business's own vocabulary
 * (serviceRates, itemRates, expressRates, freeDeliveryThreshold,
 * deliveryFee, taxRate, discountRules, packagingFee, zonePricing).
 */
export type PricingConfig = {
  serviceRates: Record<ServiceKey, ServiceDefinition>;
  itemRates: Record<GarmentKey, GarmentDefinition>;
  expressRates: typeof expressRates;
  minimumOrderValue: number;
  minimumOrderPolicy: "adjust" | "block";
  freeDeliveryThreshold: number;
  deliveryFee: number;
  taxRate: number;
  packagingFee: number;
  zonePricing: Record<string, ZoneRate>;
  discountRules: Record<string, Coupon>;
};

export const defaultPricingConfig: PricingConfig = {
  serviceRates: serviceByKey,
  itemRates: garmentByKey,
  expressRates,
  minimumOrderValue: MINIMUM_ORDER_VALUE,
  minimumOrderPolicy: MINIMUM_ORDER_POLICY,
  freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
  deliveryFee: DELIVERY_FEE,
  taxRate: TAX_RATE_PERCENT,
  packagingFee: PACKAGING_FEE,
  zonePricing,
  discountRules: couponByCode,
};
