import { siteConfig } from "@/config/site";

export function AboutStory() {
  return (
    <>
      <section className="container-page section-y">
        <div className="max-w-2xl">
          <h2>Built in Bengaluru, for busy households</h2>
          <div className="mt-4 flex flex-col gap-4 text-lg text-muted-foreground">
            <p>
              A&I Laundry Basket set out to make professional laundry services
              more convenient, reliable, and accessible across Bengaluru.
            </p>
            <p>
              Day-to-day operations and customer relations are managed by{" "}
              {siteConfig.business.opsName}, ensuring every customer receives
              prompt support and high-quality service.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
