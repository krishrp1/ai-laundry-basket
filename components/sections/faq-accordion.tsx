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
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  MINIMUM_ORDER_VALUE,
} from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";

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
        question: "How does pricing work?",
        answer:
          "Wash & Fold and Wash & Iron are priced per kg and billed on the weight measured at pickup. Steam Iron and Dry Cleaning are priced per garment. The price estimator on the Pricing page gives you an estimate before you send a request, and we confirm the price with you before we start work.",
      },
      {
        question: "Are there any extra charges?",
        answer: `Yes, and they are shown in the estimate: delivery is free on orders of ${formatINR(FREE_DELIVERY_THRESHOLD)} or more and ${formatINR(DELIVERY_FEE)} below that, orders under ${formatINR(MINIMUM_ORDER_VALUE)} are topped up to that minimum, and express turnaround costs more. If anything else could apply, such as special stain treatment, we tell you before we do it.`,
      },
      {
        question: "How do I pay?",
        answer:
          "Payment is normally collected on delivery. We tell you which payment methods we accept when we confirm your booking.",
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
          "Send a quote request with your address and a preferred pickup window. We contact you to confirm the price and time, collect your laundry from your doorstep, and deliver it back to you. We email you updates as your order moves along.",
      },
      {
        question: "What areas do you currently serve?",
        answer: `We currently serve ${areaPreview}, and other neighbourhoods across South Bengaluru. If you are not sure we cover you, send a request or call us and we will tell you.`,
      },
      {
        question: "Can I choose a pickup window?",
        answer:
          "Yes. You choose a preferred window when you send the request. We confirm it with you, or suggest another time if we cannot make it.",
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
          "Standard orders are usually ready in 2 to 3 business days from pickup. We confirm the delivery date when we confirm your booking.",
      },
      {
        question: "Do you offer express or same-day service?",
        answer:
          "Express service (12 to 24 hours) costs more and is shown in the estimate. Same-day service is subject to availability and carries an additional fee. Choose it on the quote form and we will confirm whether we can do it.",
      },
      {
        question: "What happens if my order is running late?",
        answer:
          "We will contact you as soon as we know about a delay and give you a new delivery time. If the delay is our fault and you are not satisfied, contact us and we will discuss a fair remedy.",
      },
    ],
  },
  {
    id: "wash-fold",
    title: "Wash & Fold",
    icon: Shirt,
    items: [
      {
        question: "What is included in Wash & Fold?",
        answer:
          "Everyday clothing, bedding, and towels are washed, dried, and folded, then packed for delivery. Wash & Iron adds pressing.",
      },
      {
        question: "Can I tell you how I want my clothes handled?",
        answer:
          "Yes. Write any instructions, such as a fragrance-free detergent request or items to wash separately, in the special instructions box on the quote form, or tell us when we collect. We will tell you if we cannot follow an instruction.",
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
          "Suits, sarees, lehengas, sherwanis, gowns, blazers, and other items labelled dry clean only, plus household items such as curtains and blankets. The Pricing page lists the garments we price.",
      },
      {
        question: "How do you decide how to clean my garment?",
        answer:
          "We follow the care label and the details you give us at pickup. If a label is missing or the fabric is delicate, tell us when we collect, and we will discuss the safest option before cleaning.",
      },
      {
        question: "Can you guarantee no damage to delicate fabrics?",
        answer:
          "We take reasonable care, but some fabrics, dyes, and embellishments can be affected by cleaning. Please point out anything delicate at pickup. Our Refund & Cancellation Policy explains what we cover.",
      },
    ],
  },
  {
    id: "commercial",
    title: "Business Customers",
    icon: Building2,
    items: [
      {
        question: "Do you take orders from businesses?",
        answer:
          "Yes. Choose \"Business\" on the quote form or contact us with your expected volume and schedule, and we will come back with a price. Availability depends on volume and location.",
      },
      {
        question: "How does billing work for businesses?",
        answer:
          "We agree billing terms with you when we confirm the arrangement. Contact us to discuss.",
      },
    ],
  },
  {
    id: "subscriptions-cancellation",
    title: "Repeat Pickups & Cancellation",
    icon: RefreshCw,
    items: [
      {
        question: "Can I get regular pickups?",
        answer:
          "You can ask for weekly, fortnightly, or monthly pickups on the quote form. We confirm the schedule with you; there is no fixed contract.",
      },
      {
        question: "How do I cancel or reschedule?",
        answer:
          "Call, WhatsApp, or email us before we collect your items and we will cancel or reschedule free of charge. After collection, see our Refund & Cancellation Policy.",
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
          "Tell us within 48 hours of delivery with your order ID. If our handling caused the damage, we will repair it, replace it, or compensate you for its reasonable value. See the Refund & Cancellation Policy for details.",
      },
      {
        question: "What if an item is missing?",
        answer:
          "Contact us straight away with your order ID. We will look into it and work with you on a fair resolution. Please tell us at pickup about any high-value items.",
      },
    ],
  },
  {
    id: "scheduling-account",
    title: "Changing Your Details",
    icon: UserCog,
    items: [
      {
        question: "Do I need an account?",
        answer:
          "No. You do not need to create an account. You send a request, and we use the details you provide to arrange your order.",
      },
      {
        question: "How do I correct or delete my details?",
        answer:
          "Email us and we will update or delete them. See our Privacy Policy for your rights.",
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
