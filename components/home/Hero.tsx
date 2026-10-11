"use client";

import { useEffect, useRef } from "react";
import StrokeText from "@/components/motion/StrokeText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { heroSpecs, site } from "@/content/site";

// Shared by both words so RAFAEL and REYES set at one cap height.
const NAME = {
  strokeColor: "#09814a",
  fillColor: "#e5c687",
  strokeWidth: 1.6,
  drawDuration: 1.7,
  fillDelay: 0.05,
  stagger: 0.07,
  ease: "power2.inOut",
  fontSize: 200,
  fontWeight: 800,
  letterSpacing: -5,
  capHeight: 0.72,
  fit: "height" as const,
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  // Supporting copy rises in under the name as it draws.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-hero-in]", {
        y: 28,
        autoAlpha: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.9,
      });
    },
    { scope: root }
  );

  // A soft sea-green light that follows the pointer across the hero.
  useEffect(() => {
    const el = root.current;
    const light = glow.current;
    if (!el || !light || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        light.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        light.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-name" className="grain relative overflow-hidden bg-onyx text-paper">
      <div
        aria-hidden="true"
        className="grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_75%)]"
      />
      <div
        ref={glow}
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-300 [--mx:70%] [--my:35%] [background:radial-gradient(38vw_circle_at_var(--mx)_var(--my),rgb(9_129_74/0.16),transparent_70%)]"
      />

      <div className="shell relative z-[2] flex min-h-svh flex-col pb-8 pt-28 md:pt-32">
        <div data-hero-in className="eyebrow flex items-center justify-between gap-6 text-dim">
          <span className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-sea" />
            <span className="text-paper/80">{site.role}</span>
          </span>
          <span className="hidden sm:inline">Portfolio · Case studies 01–10</span>
        </div>

        <h1 id="hero-name" className="sr-only">
          Rafael Reyes — {site.role}
        </h1>

        <div className="flex flex-1 flex-col justify-end gap-3 pt-14 md:gap-4 [--stroke-fit-height:clamp(4.4rem,13.6vw,15.5rem)] [font-family:var(--font-display)] [font-variation-settings:'wdth'_72]">
          {/* Row A — RAFAEL, with the introduction beside it on large screens */}
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8" aria-hidden="true">
              <StrokeText text="RAFAEL" {...NAME} delay={0.15} />
            </div>
            <p data-hero-in className="t-lead hidden max-w-[34ch] pb-3 text-sage lg:col-span-4 lg:block [font-family:var(--font-sans)] [font-variation-settings:normal]">
              <span className="text-paper">I run operations — and I build the software that runs them.</span> Nine
              years across legal, construction, marketing and customer operations, with a habit of turning the
              messy, undocumented parts of a business into systems somebody else can follow.
            </p>
          </div>

          {/* Row B — portrait, then REYES set flush right */}
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <figure data-hero-in className="order-2 hidden lg:order-1 lg:col-span-3 lg:block">
              <ImageReveal from="bottom" parallax={0} delay={0.6} className="aspect-[4/5] w-full max-w-[10.5rem] bg-onyx-2">
                <img
                  src="/assets/img/rafael@1x.webp"
                  srcSet="/assets/img/rafael@1x.webp 1x, /assets/img/rafael@2x.webp 2x"
                  alt="Rafael Reyes"
                  width={570}
                  height={752}
                  className="h-full w-full object-cover object-top grayscale contrast-[1.08]"
                />
              </ImageReveal>
              <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim">
                Fig. 01 — The operator
              </figcaption>
            </figure>
            <div className="order-1 text-right lg:order-2 lg:col-span-9" aria-hidden="true">
              <StrokeText text="REYES" {...NAME} delay={0.45} />
            </div>
          </div>

          {/* Small screens: introduction and portrait under the name */}
          <div data-hero-in className="mt-6 grid grid-cols-[1fr_6.5rem] items-start gap-5 sm:grid-cols-[1fr_9rem] lg:hidden [font-family:var(--font-sans)] [font-variation-settings:normal]">
            <p className="t-lead text-sage">
              <span className="text-paper">I run operations — and I build the software that runs them.</span> Nine
              years across legal, construction, marketing and customer operations, turning the undocumented parts of
              a business into systems somebody else can follow.
            </p>
            <img
              src="/assets/img/rafael@1x.webp"
              alt="Rafael Reyes"
              width={570}
              height={752}
              className="aspect-[4/5] w-full object-cover object-top grayscale"
            />
          </div>
        </div>

        {/* Spec strip */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-paper/12 pt-6 md:mt-16 md:grid-cols-4 lg:grid-cols-[repeat(4,1fr)_auto]">
          {heroSpecs.map((s) => (
            <div key={s.k} data-hero-in>
              <dt className="eyebrow text-dim">{s.k}</dt>
              <dd className="mt-1.5 text-[0.95rem] text-paper">{s.v}</dd>
            </div>
          ))}
          <div data-hero-in className="hidden items-center gap-3 self-end lg:flex" aria-hidden="true">
            <span className="eyebrow text-dim">Scroll</span>
            <span className="relative block h-9 w-px overflow-hidden bg-paper/15">
              <span className="animate-scroll-cue absolute inset-0 bg-fawn" />
            </span>
          </div>
        </dl>
      </div>
    </section>
  );
}
