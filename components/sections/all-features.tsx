import {
  BadgeCheck,
  Bell,
  BrainCircuit,
  Building2,
  Headset,
  HeartHandshake,
  History,
  Hotel,
  Leaf,
  LayoutDashboard,
  Lock,
  Radar,
  Receipt,
  Repeat,
  Shirt,
  Smartphone,
  SprayCan,
  Truck,
  UserCircle,
  Zap,
} from "lucide-react";

import { FeatureCard, type Feature } from "@/components/sections/feature-card";
import { Reveal } from "@/components/motion/reveal";

type FeatureCategory = {
  id: string;
  title: string;
  features: Feature[];
};

const categories: FeatureCategory[] = [
  {
    id: "smart-technology",
    title: "Smart Technology",
    features: [
      {
        icon: BrainCircuit,
        title: "AI-Powered Scheduling",
        description:
          "Scheduling that adapts to your routine and driver availability instead of forcing you into a fixed slot.",
        benefits: [
          "Auto-suggested pickup windows",
          "Adjusts for holidays and delays",
          "Learns your preferences over time",
        ],
        useCase:
          "Your Tuesday pickup automatically shifts when a driver calls out sick, no rebooking required.",
        whyItMatters:
          "You get the schedule reliability of a large operation without ever having to think about routing.",
        ctaLabel: "Learn about scheduling",
        ctaHref: "/services",
      },
      {
        icon: Radar,
        title: "Live Order Tracking",
        description:
          "Follow your order from pickup to delivery with live status updates, not vague processing messages.",
        benefits: [
          "Real-time status by stage",
          "Driver location during pickup and delivery",
          "Shareable status for team accounts",
        ],
        useCase:
          "A front-desk manager checks tracking to confirm towels will arrive before a 3 PM guest turnover.",
        whyItMatters:
          "Not knowing where your order is is one of the most common laundry-service frustrations. Tracking removes the guesswork.",
        ctaLabel: "See tracking in action",
        ctaHref: "/quote",
      },
      {
        icon: Bell,
        title: "Real-Time Notifications",
        description:
          "Get notified the moment your order is picked up, cleaned, quality-checked, and out for delivery.",
        benefits: [
          "Pickup and delivery confirmations",
          "Delay alerts before you have to ask",
          "Configurable by email, text, or push",
        ],
        useCase:
          "You get a text the moment your driver is five minutes away, instead of waiting around all afternoon.",
        whyItMatters:
          "Good notifications turn a black-box service into one you can actually plan your day around.",
        ctaLabel: "See notification options",
        ctaHref: "/contact",
      },
      {
        icon: Smartphone,
        title: "Mobile Friendly Booking",
        description:
          "Book, reschedule, or check on an order from your phone in under a minute, no app download required.",
        benefits: [
          "Book a pickup in a few taps",
          "Works on any phone browser",
          "Saved preferences speed up repeat orders",
        ],
        useCase:
          "You schedule next week's pickup from the back of a rideshare in under a minute.",
        whyItMatters:
          "Laundry should not require sitting down at a computer. Booking needs to fit into the moments you actually have.",
        ctaLabel: "Request a Quote",
        ctaHref: "/quote",
      },
    ],
  },
  {
    id: "care-quality",
    title: "Care & Quality",
    features: [
      {
        icon: Shirt,
        title: "Professional Garment Care",
        description:
          "Each item is cleaned according to its actual fabric and care label, not a one-size-fits-all cycle.",
        benefits: [
          "Fabric-matched wash temperatures",
          "Specialty handling for delicates",
          "Care notes saved to your profile",
        ],
        useCase:
          "A silk blouse is automatically routed to a cold, gentle cycle instead of your default wash setting.",
        whyItMatters:
          "Most garment damage comes from the wrong method, not dirty clothes. Getting the method right protects what you own.",
        ctaLabel: "See garment care details",
        ctaHref: "/services",
      },
      {
        icon: Leaf,
        title: "Eco-Friendly Cleaning",
        description:
          "Fragrance-free and hypoallergenic detergent options, plus batching that reduces water and energy use per load.",
        benefits: [
          "Eco-friendly detergent at no extra cost",
          "Loads batched to avoid partial cycles",
          "Reusable garment bags where possible",
        ],
        useCase:
          "A customer with sensitive skin switches to fragrance-free detergent with one toggle in their account.",
        whyItMatters:
          "Clean clothes should not come at the cost of unnecessary water, energy, or harsh chemicals.",
        ctaLabel: "See our sustainability practices",
        ctaHref: "/about#sustainability",
      },
      {
        icon: SprayCan,
        title: "Stain Removal Experts",
        description:
          "Computer vision flags stains before washing, and trained specialists apply the right pre-treatment for the fabric and stain type.",
        benefits: [
          "Stains flagged before they set in",
          "Pre-treatment matched to fabric and stain",
          "Reduces re-washing and wasted cycles",
        ],
        useCase:
          "A red wine stain on a tablecloth is caught and pre-treated before it becomes permanent.",
        whyItMatters:
          "Catching a stain early is often the only chance to save a garment. Waiting until laundry day is usually too late.",
        ctaLabel: "See stain treatment services",
        ctaHref: "/services",
      },
      {
        icon: BadgeCheck,
        title: "Quality Assurance",
        description:
          "Every order is inspected twice: once before cleaning to confirm care needs, and again before packing.",
        benefits: [
          "Two-point inspection on every order",
          "Consistent checklist across locations",
          "Issues caught before delivery, not after",
        ],
        useCase:
          "A missed stain is caught during the final inspection and re-treated before the order ever leaves the facility.",
        whyItMatters:
          "Consistency is what separates a service you can rely on from one you have to double-check yourself.",
        ctaLabel: "See our quality standards",
        ctaHref: "/about#quality-standards",
      },
    ],
  },
  {
    id: "service-delivery",
    title: "Service & Delivery",
    features: [
      {
        icon: Truck,
        title: "Smart Pickup & Delivery",
        description:
          "Choose a pickup window that fits your day, and let route optimization handle the rest.",
        benefits: [
          "Morning, afternoon, and evening windows",
          "Optimized routes reduce delays",
          "Multiple saved addresses supported",
        ],
        useCase:
          "A customer with a home and an office address switches between them depending on the week.",
        whyItMatters:
          "Convenience only counts if the pickup actually happens on time. Smart routing is what makes that possible at scale.",
        ctaLabel: "See delivery options",
        ctaHref: "/services",
      },
      {
        icon: Zap,
        title: "Same-Day Express Service",
        description:
          "Need it back today? Same-day express is available in core markets for orders placed before the daily cutoff.",
        benefits: [
          "Same-day turnaround in core markets",
          "Priority handling through the facility",
          "Transparent rush pricing shown upfront",
        ],
        useCase:
          "A last-minute business trip means a suit needs to be cleaned and back home in a few hours, not a few days.",
        whyItMatters:
          "Sometimes standard turnaround is not fast enough. Express service exists for exactly those moments.",
        ctaLabel: "See express pricing",
        ctaHref: "/pricing",
      },
      {
        icon: Repeat,
        title: "Subscription Plans",
        description:
          "Set a recurring pickup schedule and save compared to booking one-time orders.",
        benefits: [
          "Weekly, biweekly, or monthly cadence",
          "Save up to 15% versus one-time pricing",
          "Pause or cancel anytime, no penalty",
        ],
        useCase:
          "A busy family sets a weekly Monday pickup and never has to remember to book laundry again.",
        whyItMatters:
          "Recurring service turns laundry from a task you manage into something that just happens.",
        ctaLabel: "Compare subscription plans",
        ctaHref: "/pricing",
      },
      {
        icon: Headset,
        title: "Priority Support",
        description:
          "Premium and Family plans get priority phone and chat support, with a dedicated line for urgent order issues.",
        benefits: [
          "Priority queue for phone and chat",
          "Dedicated urgent-order support line",
          "Faster resolution on time-sensitive issues",
        ],
        useCase:
          "A guest towel order runs late before a check-in, and the priority line gets it resolved in minutes, not hours.",
        whyItMatters:
          "When something needs to be fixed fast, waiting in a general support queue is not good enough.",
        ctaLabel: "Contact support",
        ctaHref: "/contact",
      },
    ],
  },
  {
    id: "business-solutions",
    title: "Business Solutions",
    features: [
      {
        icon: Building2,
        title: "Commercial Laundry Solutions",
        description:
          "Custom volume-based pricing and dedicated routes for offices, gyms, salons, and other commercial accounts.",
        benefits: [
          "Custom pricing based on volume",
          "Dedicated recurring route",
          "Consolidated monthly invoicing",
        ],
        useCase:
          "A boutique gym sets a standing towel-service schedule that runs without anyone having to think about it.",
        whyItMatters:
          "Commercial laundry needs are too variable for a flat per-order rate. Custom pricing reflects what a business actually uses.",
        ctaLabel: "See commercial pricing",
        ctaHref: "/pricing",
      },
      {
        icon: Hotel,
        title: "Hotel & Airbnb Laundry",
        description:
          "Linen and towel service built around guest check-in and check-out times, with guaranteed turnaround.",
        benefits: [
          "Turnaround timed to guest turnovers",
          "Per-pound linen pricing",
          "Scales from a single unit to a full property",
        ],
        useCase:
          "A 12-unit short-term rental portfolio syncs pickups to cleaning schedules automatically.",
        whyItMatters:
          "A late linen delivery means a guest checks into an unmade room. Hospitality cannot absorb that risk.",
        ctaLabel: "See hospitality pricing",
        ctaHref: "/pricing",
      },
      {
        icon: LayoutDashboard,
        title: "Business Dashboard",
        description:
          "Commercial accounts get a dashboard view of upcoming pickups, order history, and billing in one place.",
        benefits: [
          "Upcoming pickup and delivery calendar",
          "Order history across all locations",
          "Billing and invoice history in one view",
        ],
        useCase:
          "A property manager checks the dashboard once a week to confirm every unit's linen schedule is on track.",
        whyItMatters:
          "Managing laundry across multiple locations by phone calls and spreadsheets does not scale. A dashboard does.",
        ctaLabel: "Request a Quote",
        ctaHref: "/quote",
      },
      {
        icon: History,
        title: "Order History",
        description:
          "Every past order, from a single wash to a full commercial account, is saved and searchable in your account.",
        benefits: [
          "Full order history with dates and pricing",
          "Reorder a past service in one click",
          "Downloadable for expense tracking",
        ],
        useCase:
          "A customer reorders the exact same service from three months ago without re-entering any details.",
        whyItMatters:
          "You should not have to remember what you ordered last time. Your history should remember it for you.",
        ctaLabel: "See the customer portal",
        ctaHref: "/quote",
      },
    ],
  },
  {
    id: "account-payments",
    title: "Account & Payments",
    features: [
      {
        icon: Lock,
        title: "Secure Payments",
        description:
          "Payments are processed securely with major cards, Apple Pay, and Google Pay, plus invoicing for commercial accounts.",
        benefits: [
          "Encrypted payment processing",
          "Multiple payment methods supported",
          "Monthly invoicing for commercial accounts",
        ],
        useCase:
          "A commercial account is billed monthly by invoice instead of charging a card after every single pickup.",
        whyItMatters:
          "Payment should be the easiest part of the experience, not something you have to think twice about trusting.",
        ctaLabel: "See payment FAQs",
        ctaHref: "/faq",
      },
      {
        icon: Receipt,
        title: "Digital Receipts",
        description:
          "Every order comes with a digital receipt and itemized pricing breakdown, stored in your account automatically.",
        benefits: [
          "Itemized pricing on every order",
          "Stored automatically, nothing to save yourself",
          "Exportable for expense reports",
        ],
        useCase:
          "A small business owner exports a quarter's worth of receipts for expense reporting in a few clicks.",
        whyItMatters:
          "Paper receipts get lost. Digital ones do not, and they make pricing transparent after the fact, not just before.",
        ctaLabel: "See pricing transparency",
        ctaHref: "/pricing",
      },
      {
        icon: UserCircle,
        title: "Customer Portal",
        description:
          "Manage addresses, payment methods, preferences, and upcoming orders from a single account portal.",
        benefits: [
          "Saved addresses and preferences",
          "Manage upcoming and recurring orders",
          "Update payment methods anytime",
        ],
        useCase:
          "A customer updates their delivery address once, and every future order uses it automatically.",
        whyItMatters:
          "You should be able to manage your service without contacting support for routine changes.",
        ctaLabel: "Request a Quote",
        ctaHref: "/quote",
      },
      {
        icon: HeartHandshake,
        title: "Satisfaction Guarantee",
        description:
          "If something is not right with an order, we will re-clean, credit, or make it right, no complicated process required.",
        benefits: [
          "Simple resolution process",
          "Credit or re-clean depending on the issue",
          "48-hour reporting window after delivery",
        ],
        useCase:
          "A missed stain is reported after delivery, and the item is re-cleaned at no additional cost.",
        whyItMatters:
          "A guarantee only matters if it is easy to use. Ours is built to be exactly that.",
        ctaLabel: "Read our customer promise",
        ctaHref: "/about",
      },
    ],
  },
];

export function AllFeatures() {
  return (
    <section
      id="all-features"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Every capability
        </span>
        <h2 className="mt-3">The complete platform, feature by feature</h2>
        <p className="mt-4 text-muted-foreground">
          Twenty capabilities working together across five areas of the
          platform.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {categories.map((category) => (
          <div key={category.id}>
            <Reveal className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
              <h3 className="whitespace-nowrap text-lg text-primary">
                {category.title}
              </h3>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {category.features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.05}>
                  <FeatureCard {...feature} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
