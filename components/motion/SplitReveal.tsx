"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts. */
  delay?: number;
  /** "scroll" waits for the element to enter the viewport; "load" plays on mount. */
  trigger?: "scroll" | "load";
  stagger?: number;
  id?: string;
};

/**
 * Line-by-line masked reveal. Lines rise out of a clipped mask, the way type
 * is set in on a premium editorial layout. Re-splits on resize.
 */
export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  trigger = "scroll",
  stagger = 0.09,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "sl",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 115,
            rotate: 1.5,
            transformOrigin: "0% 100%",
            duration: 1.25,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger:
              trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} data-reveal="" className={cn("[&_.sl-mask]:-mb-[0.12em] [&_.sl-mask]:pb-[0.12em]", className)}>
      {children}
    </Tag>
  );
}
