"use client";

// Adapted from React Bits <StrokeText /> (https://reactbits.dev): ported to
// TypeScript, plus `delay`, `fit` modes (height-driven, and fill-the-width), an
// optional `capHeight` crop, re-measuring when it becomes visible, and a hidden
// first paint so the finished word never flashes before the outline draws.

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "./StrokeText.css";

type Box = { x: number; y: number; width: number; height: number };

type Props = {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: "mount" | "hover" | "scroll" | "loop";
  fillMode?: "fade" | "wipe" | "none";
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  reverse?: boolean;
  /** Seconds before a mount/scroll timeline starts. */
  delay?: number;
  /**
   * "width": original behaviour (full width, fixed height).
   * "height": sized by --stroke-fit-height, natural width.
   * "fill": full width, height follows the word's proportions.
   */
  fit?: "width" | "height" | "fill";
  /**
   * Cap height as a fraction of fontSize. When set, the viewBox is cropped to the
   * capitals instead of the full em box — for all-caps words with no descenders.
   */
  capHeight?: number;
  className?: string;
  style?: CSSProperties;
};

export default function StrokeText({
  text = "Draw Attention",
  strokeColor = "#A78BFA",
  fillColor = "#F8FAFC",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  delay = 0,
  fit = "width",
  capHeight,
  className = "",
  style = {},
}: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);

  const [box, setBox] = useState<Box | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);

  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing,
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const pad = capHeight ? Math.max(Number(strokeWidth) || 1, fontSize * 0.035) : Math.max(Number(strokeWidth) || 1, fontSize * 0.1);
      const next = capHeight
        ? { x: bbox.x - pad, y: -capHeight * fontSize - pad, width: bbox.width + pad * 2, height: capHeight * fontSize + pad * 2 }
        : { x: bbox.x - pad, y: bbox.y - pad, width: bbox.width + pad * 2, height: bbox.height + pad * 2 };

      setBox((prev) =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next
      );
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});

    // A copy hidden at one breakpoint measures as zero; measure again once shown.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (rootRef.current) ro?.observe(rootRef.current);

    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth, capHeight]);

  // The measured box can change the page height; re-measure every scroll trigger.
  useEffect(() => {
    if (!box) return undefined;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [box]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !box) return undefined;

    const strokes = gsap.utils.toArray<SVGTSpanElement>(root.querySelectorAll("[data-stroke-char]"));
    const fills = gsap.utils.toArray<SVGTSpanElement>(root.querySelectorAll("[data-fill-char]"));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== "none";
    const useWipe = fillEnabled && fillMode === "wipe";
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse ? { each: stagger, from: "end" as const } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean) as Element[];

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = (startDelay = 0) => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        delay: startDelay,
        repeat: trigger === "loop" ? -1 : 0,
        repeatDelay: trigger === "loop" ? 0.9 : 0,
        defaults: { overwrite: "auto" },
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(wipe, { attr: { width: box.width }, duration: fillDuration, ease: "power2.inOut" }, drawDuration + fillDelay);
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: "power2.out", stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === "hover") {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener("pointerenter", play);
      removeHover = () => root.removeEventListener("pointerenter", play);
    } else {
      timeline = build(delay);
      if (trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => timeline?.play(0),
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse, delay]);

  // Before measuring, estimate the box from the character count so the element
  // reserves roughly its final size (no layout shift when the real box lands).
  const estPad = fontSize * 0.035;
  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : capHeight
      ? `0 ${-capHeight * fontSize - estPad} ${characters.length * fontSize * 0.56} ${capHeight * fontSize + estPad * 2}`
      : `0 ${-fontSize} 600 ${fontSize * 1.3}`;
  const animated = trigger !== "hover";

  return (
    <span
      ref={rootRef}
      className={[
        "stroke-text",
        trigger === "hover" && "stroke-text--hover",
        fit === "height" && "stroke-text--fit-height",
        fit === "fill" && "stroke-text--fill",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...style, "--stroke-text-height": `${Math.round(fontSize * 1.3)}px` } as CSSProperties}
      role="img"
      aria-label={String(text ?? "")}
    >
      <svg
        className="stroke-text__svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ visibility: box ? "visible" : "hidden" }}
      >
        {fillMode === "wipe" && box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={box.x} y={box.y} width="0" height={box.height} />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan
              data-stroke-char=""
              key={`s-${index}`}
              style={animated ? { strokeDasharray: dash, strokeDashoffset: dash } : undefined}
            >
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === "wipe" && box ? `url(#${wipeId})` : undefined}
          opacity={fillMode === "wipe" && !box ? 0 : undefined}
        >
          {characters.map((char, index) => (
            <tspan
              data-fill-char=""
              key={`f-${index}`}
              style={animated && fillMode !== "wipe" ? { opacity: 0 } : undefined}
            >
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
