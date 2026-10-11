"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { BrowserFrame, frameUrl } from "@/components/ui/BrowserFrame";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Arrow";
import { shortClient, type Case } from "@/content/cases";
import { cn } from "@/lib/cn";

// One palette colour per card, so each project gets its own moment.
// Text pairs are the measured ones from globals.css (paper/fawn/sage on dark, onyx/pine on light).
const TONES = [
  {
    card: "bg-onyx-2 border-paper/10 text-paper",
    meta: "text-sage",
    num: "text-fawn",
    chip: "border-paper/20 text-paper/80",
    cta: "bg-fawn text-onyx hover:bg-paper",
    link: "text-fawn",
  },
  {
    card: "bg-pine border-paper/10 text-paper",
    meta: "text-sage",
    num: "text-fawn",
    chip: "border-paper/25 text-paper/85",
    cta: "bg-fawn text-onyx hover:bg-paper",
    link: "text-fawn",
  },
  {
    card: "bg-fawn border-onyx/10 text-onyx",
    meta: "text-pine",
    num: "text-pine",
    chip: "border-onyx/25 text-onyx/80",
    cta: "bg-onyx text-fawn hover:bg-pine",
    link: "text-pine",
  },
  {
    card: "bg-sage border-onyx/10 text-onyx",
    meta: "text-pine",
    num: "text-pine",
    chip: "border-onyx/25 text-onyx/80",
    cta: "bg-onyx text-sage hover:bg-pine hover:text-paper",
    link: "text-pine",
  },
];

const TOP = 96; // px below the viewport top where the first card pins
const STEP = 18; // each later card pins a little lower, so the deck's edges show

type Item = Case & { blurb: string; tags: string[] };

export function FeaturedStack({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);

  // As the next card slides over, the one beneath settles back and dims.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: `top ${TOP + (i + 1) * STEP}px`,
              scrub: true,
            },
          });
          tl.to(card, { scale: 0.94, ease: "none" }, 0).to(
            card.querySelector("[data-dim]"),
            { opacity: 0.45, ease: "none" },
            0
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="grid gap-6 lg:block">
      {items.map((c, i) => {
        const t = TONES[i % TONES.length];
        return (
          <article
            key={c.slug}
            data-card=""
            style={{ top: TOP + i * STEP }}
            className={cn(
              "relative origin-top overflow-hidden rounded-2xl border p-5 sm:p-7 lg:sticky lg:mb-[14vh] lg:grid lg:grid-cols-12 lg:gap-10 lg:p-10 lg:last:mb-0",
              t.card
            )}
          >
            <div className="flex flex-col lg:col-span-4">
              <span className={cn("t-display text-[clamp(3.5rem,6vw,6.5rem)]", t.num)}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-8 lg:mt-auto">
                <p className={cn("text-[0.95rem]", t.meta)}>
                  {shortClient(c.client)} · {c.discipline}
                </p>
                <h3 className="t-h3 mt-3 text-[clamp(1.9rem,2.8vw,2.9rem)]">
                  <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0 lg:after:content-none">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-[44ch] leading-relaxed opacity-85">{c.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools and disciplines">
                  {c.tags.map((tag) => (
                    <li key={tag} className={cn("rounded-full border px-3 py-1 text-[0.8rem]", t.chip)}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/work/${c.slug}`}
                    className={cn(
                      "group inline-flex items-center gap-2.5 rounded-full py-2.5 pl-5 pr-2.5 text-[0.95rem] font-medium transition-colors duration-300",
                      t.cta
                    )}
                  >
                    Read the case
                    <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5" />
                  </Link>
                  {c.live && (
                    <a
                      href={c.live}
                      target="_blank"
                      rel="noopener"
                      className={cn("inline-flex items-center gap-1.5 text-sm font-medium", t.link)}
                    >
                      <span className="link-underline">Live site</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed 16:9 so screenshots are never cropped at the sides; the card sizes to it. */}
            <div className="mt-8 lg:col-span-8 lg:mt-0">
              <BrowserFrame url={c.image.url ?? frameUrl(c)}>
                <div className="relative aspect-video">
                  <img
                    src={c.image.src}
                    srcSet={`${c.image.sm} 720w, ${c.image.src} ${c.image.w}w`}
                    sizes="(min-width: 1024px) 60vw, 94vw"
                    alt={c.image.alt}
                    width={c.image.w}
                    height={c.image.h}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            </div>

            <div data-dim="" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-onyx opacity-0" />
          </article>
        );
      })}
    </div>
  );
}
