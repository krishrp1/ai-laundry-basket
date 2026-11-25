import { siteConfig } from "@/config/site";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b bg-card">
        <div className="container-page py-12">
          <h1>{title}</h1>
          <p className="mt-3 text-muted-foreground">
            Last updated: {siteConfig.legal.lastUpdated}
          </p>
        </div>
      </div>
      <div className="container-page section-y">
        <div className="flex max-w-3xl flex-col gap-10">{children}</div>
      </div>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl text-foreground sm:text-xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}
