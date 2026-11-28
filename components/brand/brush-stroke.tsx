import type { CSSProperties } from "react";

import { brushStroke, type BrushOptions } from "@/lib/brush";
import { cn } from "@/lib/utils";

type BrushStrokeProps = BrushOptions & {
  /** Unique per page: names the SVG mask. */
  id: string;
  viewBox: string;
  /**
   * How the stroke appears: "load" paints on page load (CSS only), "view" paints when
   * scrolled into view, "scroll" is painted by a parent as the page scrolls, "hover"
   * paints while its `.group` parent is hovered, "none" is always fully drawn.
   */
  reveal?: "load" | "view" | "scroll" | "hover" | "none";
  /** Wet highlights on the ink (only meaningful for dark ink on a light ground). */
  sheen?: boolean;
  /** "stretch" fills the box exactly; use a viewBox close to the box's shape so the brush barely distorts. */
  fit?: "contain" | "stretch";
  className?: string;
  style?: CSSProperties;
};

/**
 * The signature ink brushstroke. Drawn in `currentColor`, so `text-foreground` gives
 * charcoal on paper and light on dark sections. Decorative: hidden from assistive tech.
 */
export function BrushStroke({ id, viewBox, reveal = "view", sheen = false, fit = "contain", className, style, ...options }: BrushStrokeProps) {
  const b = brushStroke(options);
  const masked = reveal !== "none";
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio={fit === "stretch" ? "none" : "xMidYMid meet"}
      className={cn("brush", className)}
      data-reveal={reveal}
      style={{ "--len": b.length, ...style } as CSSProperties}
    >
      {masked && (
        <defs>
          <mask id={`${id}-paint`} maskUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <path
              className="brush-mask"
              d={b.spinePath}
              fill="none"
              stroke="#fff"
              strokeWidth={options.width * 2.4}
              strokeLinecap="round"
            />
          </mask>
        </defs>
      )}
      <g mask={masked ? `url(#${id}-paint)` : undefined}>
        <path className="brush-body" d={b.body} fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {b.bristles.map((g) => (
            <path key={g.width} d={g.d} strokeWidth={g.width} />
          ))}
        </g>
        {sheen && (
          <path
            d={b.sheen}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.13}
            strokeWidth={Math.max(1, options.width / 80)}
            strokeLinecap="round"
          />
        )}
      </g>
      {b.dots.length > 0 && (
        <g className="brush-dots" fill="currentColor">
          {b.dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} style={{ "--i": i } as CSSProperties} />
          ))}
        </g>
      )}
    </svg>
  );
}

type BrushImageProps = BrushOptions & {
  id: string;
  viewBox: string;
  /** Image URL, shown only where the brush would have laid ink. */
  src: string;
  className?: string;
};

/** A photograph seen through a brushstroke: the stroke works as the image's mask, painted in on view. */
export function BrushImage({ id, viewBox, src, className, ...options }: BrushImageProps) {
  const b = brushStroke(options);
  const [, , w, h] = viewBox.split(" ").map(Number);
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      className={cn("brush", className)}
      data-reveal="view"
      style={{ "--len": b.length } as CSSProperties}
    >
      <defs>
        <mask id={`${id}-paint`} maskUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
          <path className="brush-mask" d={b.spinePath} fill="none" stroke="#fff" strokeWidth={options.width * 2.4} strokeLinecap="round" />
        </mask>
        <mask id={`${id}-shape`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <g mask={`url(#${id}-paint)`}>
            <path d={b.body} fill="#fff" />
            <g fill="none" stroke="#fff" strokeLinecap="round">
              {b.bristles.map((g) => (
                <path key={g.width} d={g.d} strokeWidth={g.width} />
              ))}
            </g>
          </g>
          <g className="brush-dots" fill="#fff">
            {b.dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} />
            ))}
          </g>
        </mask>
      </defs>
      <image href={src} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" mask={`url(#${id}-shape)`} />
    </svg>
  );
}
