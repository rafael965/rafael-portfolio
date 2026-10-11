import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Arrow";
import { BrowserFrame, frameUrl } from "@/components/ui/BrowserFrame";
import { cards, cases, FEATURED, shortClient, type Case } from "@/content/cases";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

function Featured({ c, i }: { c: Case; i: number }) {
  const card = cards[c.slug];
  const flip = i % 2 === 1;
  return (
    <article className="group grid items-center gap-8 border-t border-paper/12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <Link
        href={`/work/${c.slug}`}
        data-cursor="View case"
        aria-label={`${c.title} — case study`}
        className={cn("block lg:col-span-7", flip && "lg:order-2")}
      >
        <BrowserFrame
          url={c.image.url ?? frameUrl(c)}
          className="transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:-translate-y-1.5"
        >
          <ImageReveal from={flip ? "left" : "right"} parallax={0} settle={1.01} className="aspect-video bg-onyx-2">
            <img
              src={c.image.src}
              srcSet={`${c.image.sm} 720w, ${c.image.src} ${c.image.w}w`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt={c.image.alt}
              width={c.image.w}
              height={c.image.h}
              loading="lazy"
              decoding="async"
              className="shot h-full w-full object-cover object-top group-hover:[filter:none]"
            />
          </ImageReveal>
        </BrowserFrame>
      </Link>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <Reveal className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-dim">
          <span className="text-fawn">{pad(i + 1)}</span>
          <span aria-hidden="true">/</span>
          <span>{shortClient(c.client)}</span>
          <span aria-hidden="true">·</span>
          <span>{c.discipline}</span>
        </Reveal>
        <SplitReveal as="h3" className="t-h3 mt-5 text-[clamp(2rem,3.4vw,3.4rem)]">
          <Link href={`/work/${c.slug}`} className="transition-colors duration-500 hover:text-fawn">
            {c.title}
          </Link>
        </SplitReveal>
        <Reveal>
          <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-sage">{card.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools and disciplines">
            {card.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[0.7rem] text-paper/80"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href={`/work/${c.slug}`} className="group/l inline-flex items-center gap-3 text-paper">
              <span className="link-underline">Read the case study</span>
              <span className="grid size-9 place-items-center rounded-full border border-paper/20 transition-colors duration-500 group-hover/l:border-fawn group-hover/l:bg-fawn group-hover/l:text-onyx">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
            {c.live && (
              <a
                href={c.live}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm text-fawn"
              >
                <span className="link-underline">View live site</span>
                <ArrowUpRight className="size-3" />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function Card({ c, n }: { c: Case; n: number }) {
  const card = cards[c.slug];
  return (
    <Link href={`/work/${c.slug}`} data-cursor="View" className="group block">
      <div className="relative aspect-video overflow-hidden rounded-[8px] bg-onyx-2">
        <img
          src={c.image.sm}
          srcSet={`${c.image.sm} 600w, ${c.image.src} ${c.image.w}w`}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
          alt={c.image.alt}
          width={c.image.w}
          height={c.image.h}
          loading="lazy"
          decoding="async"
          className="shot h-full w-full object-cover object-top group-hover:scale-[1.04] group-hover:[filter:none]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-paper/12 pb-3">
        <span className="font-mono text-xs text-fawn">{pad(n)}</span>
        <span className="eyebrow text-right text-dim">
          {shortClient(c.client)} · {c.discipline}
        </span>
      </div>
      <h3 className="t-h4 mt-4 flex items-start justify-between gap-4">
        <span className="transition-colors duration-500 group-hover:text-fawn">{c.title}</span>
        <ArrowUpRight className="mt-1 size-4 shrink-0 text-dim transition-all duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fawn" />
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-sage">{card.blurb}</p>
    </Link>
  );
}

export function Work() {
  const featured = cases.slice(0, FEATURED);
  const rest = cases.slice(FEATURED);
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-24 bg-onyx pb-28 text-paper md:pb-40">
      <div className="shell">
        <SectionHead
          id="work-title"
          index="/01"
          label="Selected work"
          title="Selected *work*"
          aside="Ten projects across five organisations. Some are software, some are process, some are both — the useful ones usually are."
        />

        <div className="mt-16 md:mt-24">
          {featured.map((c, i) => (
            <Featured key={c.slug} c={c} i={i} />
          ))}
        </div>

        <div className="border-t border-paper/12 pt-14 md:pt-20">
          <Reveal className="eyebrow mb-10 flex items-center justify-between text-dim">
            <span>More work</span>
            <span>
              {pad(FEATURED + 1)}–{pad(cases.length)}
            </span>
          </Reveal>
          <Reveal stagger={0.08} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c, i) => (
              <Card key={c.slug} c={c} n={FEATURED + i + 1} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
