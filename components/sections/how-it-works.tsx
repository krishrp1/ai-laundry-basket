const steps = [
  {
    title: "Send a request",
    description: "Pick a service and a pickup window. We call or message you to confirm both.",
  },
  {
    title: "We collect",
    description: "We pick up from your door. Per-kg loads are weighed then, so you pay for actual weight.",
  },
  {
    title: "We clean",
    description: "Washed, ironed or dry cleaned as you chose, following the care labels.",
  },
  {
    title: "We bring it back",
    description: "Standard orders are usually ready 2 to 3 business days after pickup.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page section-y scroll-mt-16">
      <h2>How a pickup works</h2>

      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-primary pt-4">
            <span aria-hidden="true" className="font-heading text-4xl font-semibold text-primary tabular-nums">
              {i + 1}
            </span>
            <h3 className="mt-3">{step.title}</h3>
            <p className="mt-1.5 text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
