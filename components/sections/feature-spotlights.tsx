import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileSignature,
  Gem,
  MessageSquareWarning,
  PackageCheck,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";

import { ServiceBlock } from "@/components/sections/service-block";

const spotlights = [
  {
    icon: CalendarClock,
    title: "AI-Powered Scheduling",
    description:
      "Our scheduling engine looks at your routine, driver availability, and even local demand to find the best possible time for every pickup and wash cycle.",
    benefits: [
      "Learns your routine over time",
      "Avoids conflicts with shared or busy machines",
      "Automatically rebalances if a driver is delayed",
    ],
    mockLabel: "This week's schedule",
    mockItems: [
      { icon: CalendarClock, text: "Mon 6:00 PM - Pickup confirmed" },
      { icon: Zap, text: "Wed 7:30 AM - Route optimized" },
      { icon: CheckCircle2, text: "Sat 10:00 AM - Auto-rescheduled" },
    ],
    useCase:
      "A weekly subscriber's pickup automatically shifts a day earlier when a holiday changes driver availability, with no action needed from the customer.",
    whyItMatters:
      "Manual scheduling breaks down the moment life gets busy. AI scheduling keeps laundry moving even when your week does not go as planned.",
    ctaLabel: "See how scheduling works",
    ctaHref: "/services",
  },
  {
    icon: Truck,
    title: "Smart Pickup, Delivery & Same-Day Express",
    description:
      "Choose a pickup window that fits your day, and get same-day turnaround when you need it most, all tracked by the same routing engine that plans our drivers' routes.",
    benefits: [
      "Flexible morning, afternoon, or evening windows",
      "Same-day express available in core markets",
      "Real-time driver ETA on pickup and delivery",
    ],
    mockLabel: "Delivery status",
    mockItems: [
      { icon: Truck, text: "Driver en route - ETA 12 min" },
      { icon: Zap, text: "Same-day express active" },
      { icon: PackageCheck, text: "Delivered - 4:52 PM" },
    ],
    useCase:
      "A guest checks out of a boutique hotel at 11 AM, and same-day express has fresh linens back before the next check-in at 4 PM.",
    whyItMatters:
      "Turnaround time is often the difference between a laundry service being genuinely useful and just another errand.",
    ctaLabel: "See pickup & delivery pricing",
    ctaHref: "/pricing",
  },
  {
    icon: Gem,
    title: "Professional Garment Care & Stain Removal",
    description:
      "Every fabric type gets matched to the cleaning method that actually protects it, and computer vision flags stains before they set in, so problems get caught before they become permanent.",
    benefits: [
      "Fabric-matched wash and dry-clean methods",
      "Pre-treatment for stains flagged before washing",
      "Delicates and specialty fabrics handled separately",
    ],
    mockLabel: "Pre-wash scan",
    mockItems: [
      { icon: MessageSquareWarning, text: "Coffee stain detected - sleeve" },
      { icon: ShieldCheck, text: "Pre-treated before washing" },
      { icon: CheckCircle2, text: "Fabric-safe cycle applied" },
    ],
    useCase:
      "A wool blazer gets flagged for hand-finishing instead of a standard wash, avoiding the shrinkage a normal cycle would have caused.",
    whyItMatters:
      "A cheap wash that ruins an expensive garment is not actually cheap. Getting the care decision right the first time protects what you own.",
    ctaLabel: "Explore garment care services",
    ctaHref: "/services",
  },
  {
    icon: Building2,
    title: "Commercial, Hotel & Airbnb Solutions",
    description:
      "Hotels, short-term rentals, restaurants, and offices get custom volume pricing, dedicated routes, and guaranteed turnaround built around guest check-in and check-out times.",
    benefits: [
      "Custom volume-based pricing",
      "Dedicated pickup and delivery routes",
      "Consolidated invoicing and account management",
    ],
    mockLabel: "Property account",
    mockItems: [
      { icon: Building2, text: "12 units - daily linen service" },
      { icon: Clock, text: "Same-day turnaround guaranteed" },
      { icon: FileSignature, text: "Consolidated monthly invoice" },
    ],
    useCase:
      "A 12-unit short-term rental operator syncs linen pickups to guest turnover days automatically, without calling to schedule each one.",
    whyItMatters:
      "Hospitality businesses cannot afford laundry day surprises. A missed pickup means a guest checks into an unmade room.",
    ctaLabel: "See business pricing",
    ctaHref: "/pricing",
  },
];

export function FeatureSpotlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-20 lg:gap-28">
        {spotlights.map((spotlight, i) => (
          <ServiceBlock
            key={spotlight.title}
            index={i + 1}
            eyebrow="Feature"
            icon={spotlight.icon}
            title={spotlight.title}
            description={spotlight.description}
            benefits={spotlight.benefits}
            mockLabel={spotlight.mockLabel}
            mockItems={spotlight.mockItems}
            useCase={spotlight.useCase}
            whyItMatters={spotlight.whyItMatters}
            ctaLabel={spotlight.ctaLabel}
            ctaHref={spotlight.ctaHref}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
