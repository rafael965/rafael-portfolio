"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

// Real, public (or staging) sites only: the hero shows shipped work, not mockups.
const SLIDES = [
  {
    src: "/assets/img/screens/dcse-home.webp",
    sm: "/assets/img/screens/dcse-home-sm.webp",
    w: 1440,
    h: 810,
    alt: "DCSE Associates homepage",
    url: "dcse-website.vercel.app",
    title: "DCSE Associates website",
    href: "/work/dcse-website",
  },
  {
    src: "/assets/img/screens/lively-home.webp",
    sm: "/assets/img/screens/lively-home-sm.webp",
    w: 1440,
    h: 810,
    alt: "Lively homepage",
    url: "Lively, staging build",
    title: "Lively website",
    href: "/work/lively-website",
  },
  {
    src: "/assets/img/screens/camp-hb-6w.webp",
    sm: "/assets/img/screens/camp-hb-6w-sm.webp",
    w: 1200,
    h: 750,
    alt: "The Final 6-Week Challenge landing page",
    url: "camp-hb-6-week-challenge.vercel.app",
    title: "The Final 6-Week Challenge",
    href: "/work/campaign-engine",
  },
  {
    src: "/assets/img/screens/camp-whittier.webp",
    sm: "/assets/img/screens/camp-whittier-sm.webp",
    w: 1200,
    h: 750,
    alt: "Grand reopening landing page",
    url: "thecamp-whittier-reopening-promo.vercel.app",
    title: "Grand reopening funnel",
    href: "/work/campaign-engine",
  },
];

const HOLD_MS = 4200;

/**
 * The hero's visual: a large frame that cycles through shipped sites, and grows
 * to full size as the visitor scrolls from the name into the work.
 */
export function Showreel({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Cycle only while on screen, visible, and motion is welcome.
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting && !document.hidden));
    io.observe(el);
    const onVisibility = () => setPlaying(!document.hidden && el.getBoundingClientRect().top < window.innerHeight);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [playing, index]);

  // Scroll brings the work forward: the frame settles from 94% to full size.
  useGSAP(
    () => {
      if (!frame.current || prefersReducedMotion()) return;
      gsap.fromTo(
        frame.current,
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "center center", scrub: 0.6 },
        }
      );
    },
    { scope: root }
  );

  const slide = SLIDES[index];

  return (
    <div ref={root} className={className}>
      <div ref={frame} className="origin-top will-change-transform">
        <Link
          href={slide.href}
          aria-label={`${slide.title}, case study`}
          className="group block overflow-hidden rounded-2xl border border-paper/10 bg-onyx-2 shadow-[0_60px_140px_-60px_rgb(9_129_74/0.35)]"
        >
          <div className="relative flex h-8 items-center justify-center border-b border-paper/10 px-4 md:h-9">
            {SLIDES.map((s, i) => (
              <span
                key={s.url}
                aria-hidden={i !== index}
                className={cn(
                  "absolute max-w-[90%] truncate font-mono text-[0.68rem] tracking-[0.02em] text-dim transition-opacity duration-700",
                  i === index ? "opacity-100" : "opacity-0"
                )}
              >
                {s.url}
              </span>
            ))}
          </div>
          <div className="relative aspect-video overflow-hidden">
            {SLIDES.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                srcSet={`${s.sm} ${s.w / 2}w, ${s.src} ${s.w}w`}
                sizes="(min-width: 1680px) 1540px, 94vw"
                alt={i === index ? s.alt : ""}
                aria-hidden={i !== index}
                width={s.w}
                height={s.h}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-expo)]",
                  i === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                )}
              />
            ))}
          </div>
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-6 text-sm">
        <Link href={slide.href} className="group inline-flex items-center gap-2 text-sage transition-colors hover:text-paper">
          <span key={slide.title} className="animate-[fade-in_0.7s_ease]">
            {slide.title}
          </span>
          <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose a project">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={s.title}
              aria-current={i === index}
              className="grid size-6 place-items-center"
            >
              <span
                className={cn(
                  "block h-1 rounded-full transition-all duration-500 ease-[var(--ease-expo)]",
                  i === index ? "w-5 bg-fawn" : "w-1 bg-paper/30"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
