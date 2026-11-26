import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export function AboutStory() {
  return (
    <section
      id="our-story"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col gap-4 text-muted-foreground">
          <span className="text-sm font-semibold text-primary">
            Our story
          </span>
          <h2 className="text-2xl sm:text-3xl">
            Built in Bengaluru, for busy households
          </h2>
          <p>
            A&I Laundry Basket set out to make professional laundry services
            more convenient, reliable, and accessible across Bengaluru.
          </p>
          <p>
            Day-to-day operations and customer relations are managed by{" "}
            {siteConfig.business.opsName}, ensuring every customer receives
            prompt support and high-quality service.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
