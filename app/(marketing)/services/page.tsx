import type { Metadata } from "next";
import {
  AlarmClock,
  Bell,
  BrainCircuit,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Droplets,
  MessageSquareWarning,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ThermometerSnowflake,
  Wind,
} from "lucide-react";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceBlock } from "@/components/sections/service-block";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the AI-powered services behind AI Laundry Basket, from fabric sorting to smart scheduling, stain detection, and adaptive reminders.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    icon: Sparkles,
    title: "AI Sorting & Fabric Care",
    description:
      "Snap a photo of your hamper and AI Laundry Basket instantly identifies fabric type, color, and the safest wash settings for every item.",
    benefits: [
      "Prevents shrinking, fading, and fabric damage",
      "Works with any hamper, no barcodes or tags needed",
      "Learns your wardrobe over time",
    ],
    mockLabel: "Sorting in progress",
    mockItems: [
      { icon: ThermometerSnowflake, text: "Cotton - 40C wash" },
      { icon: Wind, text: "Wool - Air dry only" },
      { icon: Droplets, text: "Silk - Cold, gentle cycle" },
    ],
  },
  {
    icon: CalendarClock,
    title: "Smart Wash Scheduling",
    description:
      "AI Laundry Basket finds the best time to run a load based on your routine, machine availability, and off-peak energy rates.",
    benefits: [
      "Avoids conflicts with shared or busy machines",
      "Shifts loads to lower-cost energy windows",
      "Syncs with your calendar automatically",
    ],
    mockLabel: "This week's schedule",
    mockItems: [
      { icon: Calendar, text: "Mon 6:00 PM - Off-peak rate" },
      { icon: AlarmClock, text: "Wed 7:30 AM - Machine free" },
      { icon: CheckCircle2, text: "Sat 10:00 AM - Confirmed" },
    ],
  },
  {
    icon: Droplets,
    title: "Stain & Odor Detection",
    description:
      "Computer vision scans for stains and odor risks before you wash, then recommends the right pre-treatment so problems never set in.",
    benefits: [
      "Flags stains before they become permanent",
      "Cuts down on re-washing and wasted cycles",
      "Extends the life of your favorite garments",
    ],
    mockLabel: "Pre-wash scan",
    mockItems: [
      { icon: MessageSquareWarning, text: "Coffee stain detected - sleeve" },
      { icon: ShieldCheck, text: "Pre-treat before washing" },
      { icon: CheckCircle2, text: "Ready for normal cycle" },
    ],
  },
  {
    icon: BrainCircuit,
    title: "Adaptive Reminders & Learning",
    description:
      "AI Laundry Basket learns how you actually do laundry and adjusts reminders to match, so nudges arrive at the right moment, not just on a fixed timer.",
    benefits: [
      "Fewer missed or forgotten loads",
      "Reminders that fit your real routine",
      "Gets smarter with every wash",
    ],
    mockLabel: "Reminder activity",
    mockItems: [
      { icon: Bell, text: "Reminder sent - 8:00 PM" },
      { icon: BrainCircuit, text: "Learned: evening loads preferred" },
      { icon: Smartphone, text: "Synced to your phone" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="AI-powered services for every load"
        description="AI Laundry Basket is more than a scheduler. Each service below works together to sort, protect, and care for your laundry automatically."
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20 lg:gap-28">
          {services.map((service, i) => (
            <ServiceBlock
              key={service.title}
              index={i + 1}
              icon={service.icon}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              mockLabel={service.mockLabel}
              mockItems={service.mockItems}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
