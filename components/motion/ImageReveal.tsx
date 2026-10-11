"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Direction the mask opens from. */
  from?: "bottom" | "top" | "left" | "right";
  /** Scroll-linked drift of the inner image, in percent. 0 disables parallax. */
  parallax?: number;
  delay?: number;
  /** Children are absolutely positioned, so size the frame here (e.g. aspectRatio). */
  style?: CSSProperties;
  /** Resting scale of the inner image. Keep near 1 for screenshots so edges are not cropped. */
  settle?: number;
};

const START: Record<NonNullable<Props["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Architectural image unveil: the frame opens like a shutter while the photo settles. */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  parallax = 8,
  delay = 0,
  style,
  settle = 1.08,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.querySelector<HTMLElement>("[data-inner]");
      if (!el || !inner || prefersReducedMotion()) return;

      gsap.fromTo(
        el,
        { clipPath: START[from] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.inOut",
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        inner,
        { scale: 1.28 },
        {
          scale: settle,
          duration: 1.9,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={style}>
      <div data-inner="" className="absolute inset-0 will-change-transform" style={{ scale: settle }}>
        {children}
      </div>
    </div>
  );
}
