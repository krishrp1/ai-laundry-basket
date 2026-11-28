import { siteConfig } from "@/config/site";

const steps = [
  {
    title: "You send this form",
    description: "It does not book a pickup or charge you anything.",
  },
  {
    title: "We confirm the details",
    description: "We contact you to agree the price and a pickup time.",
  },
  {
    title: "We collect",
    description:
      "Per-kg laundry is weighed at pickup, so you only pay for actual weight.",
  },
  {
    title: "We deliver",
    description: "Your items come back at the delivery time we agree with you.",
  },
];

const linkClass =
  "font-semibold text-primary underline underline-offset-4 break-all hover:text-primary-hover";

export function QuoteSidebar() {
  return (
    <aside className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl sm:text-xl">What happens next</h2>
        <ol className="mt-4 divide-y border-y">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 py-4">
              <span aria-hidden="true" className="font-heading text-2xl leading-none font-semibold text-primary tabular-nums">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl sm:text-xl">Have a question first?</h2>
        <p className="mt-2">
          <a href={`mailto:${siteConfig.contact.email}`} className={linkClass}>
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </aside>
  );
}
