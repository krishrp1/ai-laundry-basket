import Image from "next/image";

import { siteConfig } from "@/config/site";

export function AboutStory() {
  return (
    <section aria-labelledby="our-story-title" className="container-wide pb-20 lg:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="photo relative aspect-[4/3] rounded-2xl lg:col-span-7" data-reveal-content>
          <Image
            src="/images/towels.webp"
            alt="Soft white towels, rolled and stacked."
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl lg:col-span-5">
          <p className="eyebrow" data-reveal-content>Our story</p>
          <h2 id="our-story-title" className="mt-4" data-reveal-content>Built in Bengaluru, for busy households</h2>
          <div className="mt-6 flex flex-col gap-4 text-lg text-muted-foreground" data-reveal-content>
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
      </div>
    </section>
  );
}
