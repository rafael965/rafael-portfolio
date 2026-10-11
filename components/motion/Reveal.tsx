"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of revealing the block as one. */
  stagger?: number;
  y?: number;
};

/** Quiet secondary reveal for supporting copy, lists and meta rows. */
export function Reveal({ as: Tag = "div", children, className, delay = 0, stagger, y = 24 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { opacity: 1 });
      if (prefersReducedMotion()) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
