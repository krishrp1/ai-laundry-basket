import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const faqs = [
  {
    question: "When was AI Laundry Basket founded?",
    answer:
      "AI Laundry Basket was founded in 2022, starting with a fabric-sorting prototype before expanding into full pickup, delivery, and cleaning service.",
  },
  {
    question: "Is AI Laundry Basket available in my city?",
    answer:
      "We currently serve a growing list of metro areas, including Austin, Chicago, Seattle, Denver, Miami, and Nashville. Check our Contact page for the full list, with more cities added regularly.",
  },
  {
    question: "How exactly is AI used in the laundry process?",
    answer:
      "Computer vision identifies fabric type, color, and care requirements from photos of your items, then our scheduling engine uses that information to plan the safest cleaning method and the most efficient pickup and delivery route.",
  },
  {
    question: "Do you work with businesses, not just individuals?",
    answer:
      "Yes. Our Commercial Laundry plan supports hotels, gyms, salons, short-term rentals, and offices that need linens, towels, or uniforms on a recurring schedule.",
  },
  {
    question: "How can I join the team?",
    answer:
      "We are a small, growing team across engineering, operations, and laundry care. Reach out through our Contact page and mention the role you are interested in.",
  },
  {
    question: "Where can I find your full FAQ on pricing and policies?",
    answer:
      "Our dedicated FAQ page covers pricing, turnaround times, cancellations, and more, in addition to the company questions answered here.",
  },
];

export function AboutFaq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Company FAQ
        </span>
        <h2 className="mt-3">Questions about AI Laundry Basket</h2>
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
