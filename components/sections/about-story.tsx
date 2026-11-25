import { siteConfig } from "@/config/site";

const team = [
  {
    name: siteConfig.business.ownerName,
    role: siteConfig.business.ownerRole,
    bio: "Founded A&I Laundry Basket to bring convenient, reliable laundry service to Bengaluru.",
  },
  {
    name: siteConfig.business.opsName,
    role: siteConfig.business.opsRole,
    bio: "Manages day-to-day operations and customer support.",
  },
];

export function AboutStory() {
  return (
    <>
      <section className="container-page section-y grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="max-w-2xl">
          <h2>Built in Bengaluru, for busy households</h2>
          <div className="mt-4 flex flex-col gap-4 text-lg text-muted-foreground">
            <p>
              A&I Laundry Basket was founded by {siteConfig.business.ownerName}{" "}
              to make professional laundry service more convenient, reliable and
              accessible across Bengaluru.
            </p>
            <p>
              {siteConfig.business.opsName} manages day-to-day operations and
              customer relations.
            </p>
          </div>
        </div>

        <figure className="self-start border-l-4 border-highlight pl-6">
          <blockquote className="font-heading text-2xl leading-snug font-medium">
            <p>
              &ldquo;We wanted laundry day to feel like it&apos;s already taken
              care of, not another thing on your list.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-4 text-muted-foreground">
            {siteConfig.business.ownerName}, {siteConfig.business.ownerRole}
          </figcaption>
        </figure>
      </section>

      <section className="border-t bg-card">
        <div className="container-page section-y">
          <h2>Who you deal with</h2>
          <ul className="mt-8 divide-y border-y">
            {team.map((member) => (
              <li key={member.name} className="grid gap-1 py-5 sm:grid-cols-[18rem_1fr] sm:gap-6">
                <div>
                  <h3>{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                </div>
                <p className="text-muted-foreground">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
