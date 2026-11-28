"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const motionAllowed = () =>
  typeof window !== "undefined" && !!window.matchMedia
  && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

/**
 * Scroll-driven reveals for the marketing pages, from one observer and one scroll listener:
 * - `[data-reveal="view"]` brushes and `[data-reveal-content]` blocks get `data-shown` once in view;
 * - `[data-scroll-paint]` sections get `--p` (0-1, how far the visitor has scrolled through them),
 *   which paints their scroll brushes, and their `[data-step]` children get `data-shown` as it passes.
 * Re-scans on every navigation, because this layout persists between pages.
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const revealables = document.querySelectorAll<HTMLElement>('[data-reveal="view"], [data-reveal-content]');
    if (!motionAllowed()) {
      revealables.forEach((el) => el.setAttribute("data-shown", ""));
      document.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    revealables.forEach((el) => io.observe(el));

    const sections = [...document.querySelectorAll<HTMLElement>("[data-scroll-paint]")];
    let frame = 0;
    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        // 0 when the section's top reaches 80% down the screen, 1 when its bottom reaches 70%
        const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.1)));
        section.style.setProperty("--p", p.toFixed(3));
        section.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
          step.toggleAttribute("data-shown", p >= Number(step.dataset.step));
        });
      }
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(paint);
    };
    if (sections.length) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

/**
 * Counts up to the number inside `value` ("9,564", "90.4%", "₹1,584"), keeping its prefix, suffix and
 * grouping. The server render, reduced motion and screen readers all get the final value.
 */
export function AnimatedNumber({ value, locale = "en-US" }: { value: string; locale?: string }) {
  const [shown, setShown] = useState<string | null>(null);
  const from = useRef(0);

  useEffect(() => {
    const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match || !motionAllowed()) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replaceAll(",", ""));
    const decimals = digits.split(".")[1]?.length ?? 0;
    const format = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const origin = from.current;
    let start = 0;
    let frame = requestAnimationFrame(function step(now) {
      start ||= now;
      const t = Math.min((now - start) / 700, 1);
      const current = origin + (target - origin) * (1 - (1 - t) ** 3);
      from.current = current;
      setShown(t < 1 ? `${prefix}${format.format(current)}${suffix}` : null);
      if (t < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [value, locale]);

  if (shown === null) return <>{value}</>;
  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </>
  );
}
