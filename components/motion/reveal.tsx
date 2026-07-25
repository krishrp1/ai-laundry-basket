"use client";

import * as React from "react";
import { m, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type RevealProps = React.ComponentProps<typeof m.div> & {
  delay?: number;
};

export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </m.div>
  );
}
