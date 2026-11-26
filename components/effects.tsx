"use client";

import { useEffect, useRef, useState } from "react";

/** Cards that get the spotlight and tilt. */
const CARD = '[data-slot="card"], .surface, .fx-card';
/** Tilting something you type into or read a chart from gets in the way, so these only get the spotlight. */
const NO_TILT = "input, select, textarea, table, canvas, svg.main-svg, .js-plotly-plot";
const TILT_DEG = 4;
const MAGNET = 0.18;

const motionAllowed = () =>
  typeof window !== "undefined" && !!window.matchMedia
  && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

/** Cursor-driven effects (ring, card spotlight and tilt, magnetic buttons), delegated from one listener. */
export function Effects() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !window.matchMedia("(pointer: fine)").matches) return;
    let card: HTMLElement | null = null;
    let button: HTMLElement | null = null;
    let frame = 0;
    let event: PointerEvent;

    const release = () => {
      if (card) card.style.transform = "";
      if (button) button.style.translate = "";
      card?.removeAttribute("data-fx-hover");
      card = button = null;
    };

    const paint = () => {
      frame = 0;
      const target = event.target instanceof Element ? event.target : null;
      if (ring.current) {
        ring.current.style.opacity = "1";
        ring.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        ring.current.toggleAttribute("data-active", !!target?.closest("a, button, summary, [role=button]"));
      }
      const nextCard = target?.closest<HTMLElement>(CARD) ?? null;
      const nextButton = target?.closest<HTMLElement>('[data-slot="button"], .fx-magnetic') ?? null;
      if (nextCard !== card || nextButton !== button) release();
      card = nextCard;
      button = nextButton;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width;
        const y = (event.clientY - r.top) / r.height;
        card.setAttribute("data-fx-hover", "");
        card.style.setProperty("--fx-x", `${x * 100}%`);
        card.style.setProperty("--fx-y", `${y * 100}%`);
        // Large panels tilt visibly at tiny angles, so only card-sized elements move.
        if (r.width < 520 && r.height < 420 && !card.querySelector(NO_TILT)) {
          card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * TILT_DEG}deg) rotateY(${(x - 0.5) * TILT_DEG}deg)`;
        }
      }
      if (button) {
        const r = button.getBoundingClientRect();
        button.style.translate =
          `${(event.clientX - r.left - r.width / 2) * MAGNET}px ${(event.clientY - r.top - r.height / 2) * MAGNET}px`;
      }
    };

    const move = (e: PointerEvent) => {
      event = e;
      frame ||= requestAnimationFrame(paint);
    };
    const leave = () => {
      release();
      if (ring.current) ring.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return (
    <>
      <div ref={ring} className="fx-cursor" aria-hidden="true" />
      <div className="fx-grain" aria-hidden="true" />
    </>
  );
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
