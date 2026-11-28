"use client";

import { useId, useState } from "react";
import Link from "next/link";

import { BrushStroke } from "@/components/brand/brush-stroke";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const areas = siteConfig.contact.serviceAreas;
const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** The neighbourhoods we serve, set as large type, with a quick "do you come to me?" check. */
export function ServiceAreas() {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = normalise(query);
  const matches = q ? areas.filter((area) => normalise(area).includes(q)) : [];

  return (
    <section aria-labelledby="areas-title" className="relative overflow-hidden border-t border-border">
      <div className="container-wide section-y grid gap-12 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal-content>Where we pick up</p>
          <h2 id="areas-title" className="relative mt-4 w-fit" data-reveal-content>
            South Bengaluru, door to door.
            <BrushStroke
              id="areas-underline"
              viewBox="0 0 600 60"
              width={14}
              seed={31}
              splatter={0}
              dryFrom={0.55}
              spine={[[[10, 40], [200, 20], [380, 48], [590, 30]]]}
              className="absolute -bottom-4 left-0 w-2/3 text-foreground"
            />
          </h2>
          <p className="mt-8 max-w-sm text-muted-foreground" data-reveal-content>
            We have no storefront. We collect from and deliver to your door in these
            neighbourhoods.
          </p>

          <div className="mt-8 max-w-sm" data-reveal-content>
            <label htmlFor={inputId} className="text-sm font-medium">
              Check your area
            </label>
            <input
              id={inputId}
              type="search"
              autoComplete="address-level3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Jayanagar"
              className="mt-2 h-12 w-full rounded-full border border-input bg-card px-5 text-base outline-none placeholder:text-muted-foreground/80 focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
            />
            <p role="status" className="mt-3 min-h-12 text-sm">
              {!q ? null : matches.length > 0 ? (
                <>
                  <span className="font-medium">Yes, we pick up in {matches.slice(0, 3).join(", ")}{matches.length > 3 ? " and more" : ""}.</span>{" "}
                  <Link href="/quote" className="underline underline-offset-4">Request a pickup</Link>
                </>
              ) : (
                <>
                  Not on our list yet.{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-4">
                    Email us
                  </a>{" "}
                  and we will tell you if we can reach you.
                </>
              )}
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap content-start items-baseline gap-x-3 gap-y-1 font-heading text-[clamp(1.6rem,3.4vw,3rem)] leading-tight font-medium tracking-[-0.03em] lg:col-span-8">
          {areas.map((area, i) => {
            const hit = q !== "" && normalise(area).includes(q);
            return (
              <li key={area} className="flex items-baseline gap-3" data-reveal-content style={{ "--d": Math.min(i, 10) } as React.CSSProperties}>
                <span className={cn("transition-colors duration-300", q && !hit ? "text-foreground/30" : "text-foreground")}>
                  {area}
                </span>
                {i < areas.length - 1 && <span aria-hidden="true" className="text-foreground/25">·</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
