"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Counts up from zero when scrolled into view. Server-renders the final value. */
export function Counter({ value, pad = 2, className }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => String(Math.round(n)).padStart(pad, "0");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { n: 0 };
      el.textContent = format(0);
      gsap.to(state, {
        n: value,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(state.n);
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
