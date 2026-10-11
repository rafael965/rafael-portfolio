import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { FeaturedStack } from "@/components/home/FeaturedStack";
import { cards, cases, FEATURED, shortClient, type Case } from "@/content/cases";

function Tile({ c }: { c: Case }) {
  const card = cards[c.slug];
  return (
    <Link href={`/work/${c.slug}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-paper/10 bg-onyx-2">
        <img
          src={c.image.sm}
          srcSet={`${c.image.sm} 600w, ${c.image.src} ${c.image.w}w`}
          sizes="(min-width: 768px) 46vw, 94vw"
          alt={c.image.alt}
          width={c.image.w}
          height={c.image.h}
          loading="lazy"
          decoding="async"
          className="shot h-full w-full object-cover object-top group-hover:scale-[1.03] group-hover:[filter:none]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="text-[0.9rem] text-sage">
            {shortClient(c.client)} · {c.discipline}
          </p>
          <h4 className="t-h4 mt-1.5 transition-colors duration-500 group-hover:text-fawn">{c.title}</h4>
        </div>
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-paper/15 transition-all duration-500 ease-[var(--ease-expo)] group-hover:border-fawn group-hover:bg-fawn group-hover:text-onyx">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
      <p className="mt-3 max-w-[52ch] text-[0.98rem] leading-relaxed text-sage">{card.blurb}</p>
    </Link>
  );
}

export function Work() {
  const featured = cases.slice(0, FEATURED).map((c) => ({ ...c, ...cards[c.slug] }));
  const rest = cases.slice(FEATURED);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 bg-onyx pb-32 text-paper md:pb-44">
      <div className="shell">
        <SectionHead
          id="work-title"
          title="Selected work"
          lede="Ten projects across five organisations. Some are software, some are process, some are both. The useful ones usually are."
        />

        <div className="mt-14 md:mt-20">
          <FeaturedStack items={featured} />
        </div>

        <div className="mt-32 md:mt-44">
          <h3 className="t-h3">More work</h3>
          {/* Staggered spread: every right-hand tile sits lower. `translate` (not margin)
              keeps rows aligned and DOM order intact, so phones read 05 to 10 in order. */}
          <Reveal stagger={0.1} className="mt-12 grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24 md:pb-28">
            {rest.map((c) => (
              <div key={c.slug} className="md:even:translate-y-28">
                <Tile c={c} />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
