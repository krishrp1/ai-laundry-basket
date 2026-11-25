import { siteConfig } from "@/config/site";

export function ServiceAreas() {
  return (
    <section className="container-page section-y grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div>
        <h2>Where we pick up</h2>
        <p className="mt-3 text-muted-foreground">
          We have no storefront. We collect from and deliver to your door in
          these South Bengaluru neighbourhoods. Not listed? Call us and ask.
        </p>
      </div>

      <ul className="grid grid-cols-2 self-start gap-x-6 sm:grid-cols-3">
        {siteConfig.contact.serviceAreas.map((area) => (
          <li key={area} className="border-b py-2.5 font-medium">
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
