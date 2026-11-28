import type * as React from "react";

import { BrushStroke } from "@/components/brand/brush-stroke";

type PageHeaderProps = {
  title: string;
  description: string;
  /** Small label above the title. */
  eyebrow?: string;
  children?: React.ReactNode;
};

/** Inner-page masthead: large type with a short ink stroke painted beneath it. */
export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-wide pt-14 pb-14 lg:pt-24 lg:pb-20">
        {eyebrow && <p className="eyebrow hero-line">{eyebrow}</p>}
        <h1 className="hero-line relative mt-4 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98] tracking-[-0.04em]" style={{ "--d": 1 } as React.CSSProperties}>
          {title}
        </h1>
        <BrushStroke
          id="page-header-stroke"
          reveal="load"
          viewBox="0 0 900 70"
          width={18}
          seed={title.length * 7 + 3}
          splatter={5}
          dryFrom={0.55}
          spine={[[[20, 44], [260, 20], [560, 56], [880, 28]]]}
          className="mt-5 w-[min(26rem,70%)] text-foreground"
        />
        <p className="hero-line mt-6 max-w-2xl text-lg text-muted-foreground" style={{ "--d": 2 } as React.CSSProperties}>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
