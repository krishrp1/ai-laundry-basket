"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A small glass "Request a pickup" pill that stays in reach while scrolling. It waits until the
 * hero is passed, and steps aside on the pickup form and whenever another booking call to
 * action (anything marked `data-hide-floating`) is on screen.
 */
export function FloatingBooking() {
  const pathname = usePathname();
  const [pastTop, setPastTop] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    document.querySelectorAll("[data-hide-floating]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname?.startsWith("/quote")) return null;
  const shown = pastTop && !blocked;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 transition-[opacity,translate] duration-500 sm:inset-x-auto sm:right-6 sm:bottom-6",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      // Hidden from assistive tech while off screen, so it isn't announced or focusable twice.
      inert={!shown}
    >
      <Link
        href="/quote"
        className="glass group inline-flex h-12 [--glass-alpha:88%] items-center gap-3 rounded-full pr-2 pl-5 text-sm font-medium"
      >
        Request a pickup
        <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
