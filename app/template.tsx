"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Module scope survives client navigations, so the curtain skips the very first load.
let hasNavigated = false;

/** Page transition: on client navigation the new page is revealed by an onyx curtain lifting away. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [curtain] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {curtain && !reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-onyx"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
        >
          <span className="font-display text-2xl font-extrabold tracking-[-0.04em] text-paper [font-variation-settings:'wdth'_75]">
            RR<span className="text-sea">.</span>
          </span>
          <span className="absolute inset-x-0 bottom-0 h-px bg-fawn/50" />
        </motion.div>
      )}
      {children}
    </>
  );
}
