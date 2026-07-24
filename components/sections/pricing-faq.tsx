import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const faqs = [
  {
    question: "How is my final price calculated?",
    answer:
      "Your final price is based on the actual weight and item count of your order once it is processed, using the same per-pound and per-item rates shown in our calculator. If the final total differs from your estimate, we will always show you the breakdown before charging your payment method.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, Apple Pay, and Google Pay. Commercial and corporate accounts can also be set up with monthly invoicing.",
  },
  {
    question: "When am I billed for a subscription plan?",
    answer:
      "Subscription plans are billed at the start of each billing cycle (weekly, biweekly, or monthly, depending on your plan). One-time orders are charged after the order is weighed and processed.",
  },
  {
    question: "Can I change or cancel my subscription?",
    answer:
      "Yes. You can upgrade, downgrade, pause, or cancel your subscription at any time from your account settings, with no long-term commitment or cancellation fee.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "If you are not satisfied with an order, contact us within 48 hours of delivery. We will re-clean the item, issue a partial credit, or refund the affected portion of your order depending on the situation.",
  },
  {
    question: "Is sales tax included in the prices shown?",
    answer:
      "Prices shown in our calculator and plans are before applicable local sales tax, which is calculated and displayed at checkout based on your service address.",
  },
  {
    question: "Do you offer a referral discount?",
    answer:
      "Yes. When you refer someone new, you both receive an account credit once their first order is completed. Credits are applied automatically to your next invoice.",
  },
  {
    question: "How do bulk and commercial discounts work?",
    answer:
      "Larger orders qualify for lower per-pound and per-item rates automatically. Commercial accounts receive custom volume-based pricing negotiated with our team rather than the standard per-order rates.",
  },
  {
    question: "Will my subscription price change after I sign up?",
    answer:
      "Your plan price is locked in for as long as your subscription stays active. We will always notify you in advance of any pricing changes before they apply to your account.",
  },
  {
    question: "Do you charge for a missed or canceled pickup?",
    answer:
      "There is no charge to cancel a pickup before your driver is dispatched. A small dispatch fee may apply if a driver arrives and the order is not ready.",
  },
];

export function PricingFaq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Pricing FAQ
        </span>
        <h2 className="mt-3">Payments, billing, and refunds</h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={String(i)}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
