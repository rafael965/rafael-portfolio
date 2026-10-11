"use client";

import { useRef } from "react";
import Link from "next/link";
import StrokeText from "@/components/motion/StrokeText";
import { Showreel } from "@/components/home/Showreel";
import { ArrowRight } from "@/components/ui/Arrow";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";

// Shared by every instance so the name sets at one weight, colour and pace.
const NAME = {
  strokeColor: "#09814a",
  fillColor: "#e5c687",
  strokeWidth: 1.6,
  drawDuration: 1.7,
  fillDelay: 0.05,
  stagger: 0.06,
  ease: "power2.inOut",
  fontSize: 200,
  fontWeight: 800,
  letterSpacing: -5,
  capHeight: 0.72,
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Supporting copy and the reel rise in under the name as it draws.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-hero-in]", {
        y: 32,
        autoAlpha: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.85,
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="hero-name" className="relative bg-onyx pb-24 pt-24 text-paper md:pb-32">
      <div className="shell">
        <h1 id="hero-name" className="sr-only">
          {site.name}, {site.role}
        </h1>

        <p data-hero-in className="text-[0.95rem] text-sage md:text-base">
          {site.role}
        </p>

        {/* The name: one line from tablet up, stacked on phones. */}
        <div
          aria-hidden="true"
          className="mt-5 [font-family:var(--font-display)] [font-variation-settings:'wdth'_72] md:mt-6"
        >
          <div className="hidden md:block">
            <StrokeText text="RAFAEL REYES" fit="fill" delay={0.15} {...NAME} />
          </div>
          <div className="grid gap-2 md:hidden [--stroke-fit-height:clamp(4.2rem,21vw,7rem)]">
            <StrokeText text="RAFAEL" fit="height" delay={0.15} {...NAME} />
            <StrokeText text="REYES" fit="height" delay={0.4} {...NAME} />
          </div>
        </div>

        <div className="mt-8 grid gap-7 md:mt-10 md:grid-cols-12 md:items-end">
          <p data-hero-in className="t-lead max-w-[38ch] text-sage md:col-span-7">
            <span className="text-paper">I run operations and build the systems behind them:</span> internal tools,
            AI agents, websites and SOPs.
          </p>
          <div data-hero-in className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <Link
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-sea py-3 pl-6 pr-3 font-medium text-white transition-[background-color,transform] duration-300 hover:bg-[#076b3d] active:scale-[0.98]"
            >
              View work
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-paper/20 px-6 py-3.5 font-medium text-paper transition-colors duration-300 hover:border-fawn hover:text-fawn active:scale-[0.98]"
            >
              Let&rsquo;s talk
            </a>
          </div>
        </div>

        <div data-hero-in>
          <Showreel className="mt-14 md:mt-20" />
        </div>
      </div>
    </section>
  );
}
