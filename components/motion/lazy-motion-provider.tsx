"use client";

import { LazyMotion, domMax } from "framer-motion";

/**
 * Loads framer-motion's feature bundle once for the whole marketing route
 * group instead of every `motion.*` usage pulling in the full animation
 * engine independently. `domMax` (not the smaller `domAnimation`) is
 * required because the navbar's active-tab underline uses `layoutId`, which
 * only `domMax` supports. Every `motion.*` usage under this provider must be
 * `m.*` instead — `strict` throws in dev if one is missed.
 */
export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
