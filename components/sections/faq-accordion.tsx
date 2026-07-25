import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CreditCard,
  Droplets,
  PackageX,
  RefreshCw,
  Shirt,
  Timer,
  Truck,
  UserCog,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

const areaPreview = siteConfig.contact.serviceAreas.slice(0, 5).join(", ");

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "pricing-payments",
    title: "Pricing & Payments",
    icon: CreditCard,
    items: [
      {
        question: "How does pricing work for A&I Laundry Basket?",
        answer:
          "Pricing is based on the service you choose (Wash & Fold, Dry Cleaning, or a Commercial plan) and the volume you send in. Wash & Fold is typically priced per kg, Dry Cleaning is priced per garment, and Commercial accounts get a custom rate based on expected volume. You always see an estimate before confirming an order.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI, all major credit and debit cards, and net banking, with cash on delivery available in select areas. Commercial accounts can also be set up with monthly invoicing. A GST invoice is available for every order.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. Your quote includes service, pickup, and delivery. The only additional charges that can apply are optional add-ons you select yourself, such as rush turnaround or specialty stain treatment, and those are always shown before you confirm an order.",
      },
    ],
  },
  {
    id: "pickup-delivery",
    title: "Pickup, Delivery & Service Areas",
    icon: Truck,
    items: [
      {
        question: "How does pickup and delivery work?",
        answer:
          "Schedule a pickup window through the app, leave your bag out (or hand it to your driver), and A&I Laundry Basket handles the rest. Once your order is processed, we schedule delivery back to you and send a notification when it is on its way.",
      },
      {
        question: "What areas do you currently serve?",
        answer: `We currently serve ${areaPreview}, and other neighborhoods across South Bengaluru, with more areas added regularly. Enter your PIN code on the quote page to check availability in your area.`,
      },
      {
        question: "Can I schedule a specific pickup window?",
        answer:
          "Yes. You can choose from available morning, afternoon, or evening windows when booking, and A&I Laundry Basket will suggest the best time based on driver availability in your area.",
      },
    ],
  },
  {
    id: "turnaround-same-day",
    title: "Turnaround & Same-Day Service",
    icon: Timer,
    items: [
      {
        question: "What is the standard turnaround time?",
        answer:
          "Most Wash & Fold and Dry Cleaning orders are ready within 24 to 48 hours from pickup. Commercial accounts typically run on a recurring schedule agreed to during setup, rather than a per-order turnaround.",
      },
      {
        question: "Do you offer same-day service?",
        answer:
          "Same-day service is available in select areas for orders placed before the daily cutoff time shown in the app. It carries a rush fee, which is displayed upfront before you confirm the order.",
      },
      {
        question: "What happens if my order is running late?",
        answer:
          "You will get a notification as soon as we know a delay is likely, along with an updated delivery estimate. If a delay is on our end, our support team will follow up to make it right.",
      },
    ],
  },
  {
    id: "wash-fold",
    title: "Wash & Fold",
    icon: Shirt,
    items: [
      {
        question: "What is included in the Wash & Fold service?",
        answer:
          "Everyday clothing, bedding, and towels are washed, dried, and neatly folded according to the settings A&I Laundry Basket recommends for each fabric type, then packed and ready for delivery.",
      },
      {
        question: "Can I set preferences for detergent or folding style?",
        answer:
          "Yes. You can set a preferred detergent (including fragrance-free and hypoallergenic options), water temperature, and folding style in your account settings, and every order will follow those preferences automatically.",
      },
    ],
  },
  {
    id: "dry-cleaning-care",
    title: "Dry Cleaning & Garment Care",
    icon: Droplets,
    items: [
      {
        question: "What items can I send for dry cleaning?",
        answer:
          "Suits, dresses, blazers, silk garments, and other items labeled dry clean only are all supported, along with household items like curtains and comforters upon request.",
      },
      {
        question:
          "How does A&I Laundry Basket decide the right care instructions for my garment?",
        answer:
          "Our sorting technology reads fabric type, color, and care labels to recommend the safest cleaning method for each item. Anything flagged as high-risk or unclear is reviewed before cleaning to avoid damage.",
      },
      {
        question: "Do you handle delicate or specialty fabrics?",
        answer:
          "Yes. Delicates like silk, wool, cashmere, and other specialty fabrics are cleaned using methods matched to that fabric type, and are handled separately from standard loads.",
      },
    ],
  },
  {
    id: "commercial",
    title: "Commercial Services",
    icon: Building2,
    items: [
      {
        question: "Do you offer plans for businesses?",
        answer:
          "Yes. Our Commercial Laundry plan is built for hotels, gyms, salons, short-term rentals, and offices that need linens, towels, or uniforms turned around on a reliable, recurring schedule.",
      },
      {
        question: "How does billing work for commercial accounts?",
        answer:
          "Commercial accounts are billed monthly based on your agreed volume and schedule, with a single consolidated invoice rather than per-order charges. Your account team can adjust volume as your needs change.",
      },
    ],
  },
  {
    id: "subscriptions-cancellation",
    title: "Recurring Subscriptions & Cancellation",
    icon: RefreshCw,
    items: [
      {
        question: "How do recurring subscriptions work?",
        answer:
          "You can set up a recurring pickup schedule (weekly or biweekly, for example) so laundry day happens automatically without booking each time. You will always get a reminder before a scheduled pickup.",
      },
      {
        question: "Can I pause or cancel my subscription anytime?",
        answer:
          "Yes. You can pause, skip, or cancel a recurring subscription at any time from your account settings, with no long-term commitment required.",
      },
      {
        question: "Is there a cancellation fee?",
        answer:
          "There is no fee to cancel a subscription. If you need to cancel a single order, do so before the assigned driver is dispatched to avoid a small dispatch fee.",
      },
    ],
  },
  {
    id: "damaged-lost",
    title: "Damaged or Lost Items",
    icon: PackageX,
    items: [
      {
        question: "What happens if an item is damaged?",
        answer:
          "Report the issue through the app within 48 hours of delivery. Our team will review what happened and, depending on the situation, repair, re-clean, or reimburse the item consistent with standard industry care policies.",
      },
      {
        question: "What if an item is lost?",
        answer:
          "Lost items are rare, but if one turns up missing we will investigate immediately and work with you on a fair resolution. We recommend noting any particularly high-value items at drop-off so they can be tracked closely.",
      },
    ],
  },
  {
    id: "scheduling-account",
    title: "Scheduling & Account Management",
    icon: UserCog,
    items: [
      {
        question: "How do I schedule or reschedule a pickup?",
        answer:
          "Open the app, choose a date and window, and confirm. To reschedule, go to your upcoming order and select a new time, provided it is before the cutoff for that pickup window.",
      },
      {
        question: "How do I update my account information or payment method?",
        answer:
          "Go to Account Settings to update your name, contact details, addresses, or payment method at any time. Changes apply to your next order automatically.",
      },
      {
        question: "Can I manage multiple addresses on one account?",
        answer:
          "Yes. You can save multiple pickup and delivery addresses, which is useful for a home and office, and choose which one to use each time you schedule an order.",
      },
    ],
  },
];

export function FaqAccordion() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {faqCategories.map((category, categoryIndex) => (
          <Reveal
            key={category.id}
            id={category.id}
            delay={Math.min(categoryIndex * 0.04, 0.24)}
            className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <category.icon className="size-4" />
              </span>
              <h2 className="text-xl sm:text-2xl">{category.title}</h2>
            </div>

            <Accordion className="mt-4">
              {category.items.map((item, itemIndex) => (
                <AccordionItem
                  key={item.question}
                  value={`${categoryIndex}-${itemIndex}`}
                >
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
