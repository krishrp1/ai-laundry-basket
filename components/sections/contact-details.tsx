import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

const linkClass =
  "font-semibold text-primary underline underline-offset-4 break-all hover:text-primary-hover";

// TODO: once a permanent business address is finalized, add it here with a
// "Get directions" link (and a real PostalAddress in
// components/seo/organization-json-ld.tsx).
export function ContactDetails() {
  return (
    <div>
      <h2>Reach us directly</h2>
      <dl className="mt-6 divide-y border-y">
        <div className="py-4">
          <dt className="text-sm text-muted-foreground">Email</dt>
          <dd>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
          </dd>
        </div>
        <div className="py-4">
          <dt className="text-sm text-muted-foreground">Order support</dt>
          <dd>
            <a href={`mailto:${contact.supportEmail}`} className={linkClass}>
              {contact.supportEmail}
            </a>
          </dd>
        </div>
        <div className="py-4">
          <dt className="text-sm text-muted-foreground">Hours</dt>
          {contact.hours.map((entry) => (
            <dd key={entry.day} className="font-semibold">
              {entry.day}, {entry.time}
            </dd>
          ))}
        </div>
      </dl>
    </div>
  );
}
