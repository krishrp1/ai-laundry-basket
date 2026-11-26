import { siteConfig } from "@/config/site";

/**
 * Who runs the business and how to reach them. Lines whose value is not yet
 * configured in `siteConfig.legal` are omitted rather than invented.
 */
export function BusinessDetails() {
  const { legal, contact } = siteConfig;

  return (
    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
      <dt className="font-medium text-foreground">Business name</dt>
      <dd>{legal.entityName ?? siteConfig.name}</dd>

      {legal.registeredAddress && (
        <>
          <dt className="font-medium text-foreground">Address</dt>
          <dd>{legal.registeredAddress}</dd>
        </>
      )}

      <dt className="font-medium text-foreground">Service area</dt>
      <dd>{contact.addressLine} We do not operate a public storefront.</dd>

      <dt className="font-medium text-foreground">Email</dt>
      <dd>
        <a
          href={`mailto:${contact.email}`}
          className="text-primary hover:underline"
        >
          {contact.email}
        </a>
      </dd>

      <dt className="font-medium text-foreground">Support email</dt>
      <dd>
        <a
          href={`mailto:${contact.supportEmail}`}
          className="text-primary hover:underline"
        >
          {contact.supportEmail}
        </a>
      </dd>

      {legal.gstin && (
        <>
          <dt className="font-medium text-foreground">GSTIN</dt>
          <dd>{legal.gstin}</dd>
        </>
      )}

      <dt className="font-medium text-foreground">Hours</dt>
      <dd>
        {contact.hours.map((entry) => `${entry.day}, ${entry.time}`).join("; ")}
      </dd>
    </dl>
  );
}
