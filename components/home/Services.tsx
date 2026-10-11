import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { services, type Service } from "@/content/site";
import { getCase } from "@/content/cases";
import { cn } from "@/lib/cn";

// Bento rhythm on a 12-column grid: wide/narrow, narrow/wide, then an even pair.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];

const TONE: Record<Service["tone"], { cell: string; muted: string; num: string; chip: string; shot: string }> = {
  dark: {
    cell: "bg-onyx-2 border-paper/10 text-paper",
    muted: "text-sage",
    num: "text-fawn",
    chip: "border-paper/20 hover:border-fawn hover:bg-fawn hover:text-onyx",
    shot: "border-paper/10",
  },
  pine: {
    cell: "bg-pine border-paper/10 text-paper",
    muted: "text-sage",
    num: "text-fawn",
    chip: "border-paper/25 hover:border-fawn hover:bg-fawn hover:text-onyx",
    shot: "border-paper/15",
  },
  fawn: {
    cell: "bg-fawn border-onyx/10 text-onyx",
    muted: "text-pine",
    num: "text-pine",
    chip: "border-onyx/25 hover:border-onyx hover:bg-onyx hover:text-fawn",
    shot: "border-onyx/15",
  },
};

function Cell({ s, span }: { s: Service; span: string }) {
  const t = TONE[s.tone];
  return (
    <article
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl border p-7 md:p-9", t.cell, span)}
    >
      <h3 className="t-h3">{s.title}</h3>
      <p className={cn("mt-4 max-w-[42ch] leading-relaxed", t.muted)}>{s.body}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className={cn("mr-1 text-sm", t.muted)}>Proof:</span>
        {s.proof.map((slug) => {
          const c = getCase(slug);
          if (!c) return null;
          return (
            <Link
              key={slug}
              href={`/work/${slug}`}
              className={cn("rounded-full border px-3 py-1 text-[0.82rem] transition-colors duration-300", t.chip)}
            >
              {c.title}
            </Link>
          );
        })}
      </div>

      {s.stat && (
        <div className="mt-auto pt-12">
          <p className={cn("t-display text-[clamp(5rem,9vw,9rem)]", t.num)}>{s.stat.value}</p>
          <p className={cn("mt-3 max-w-[26ch]", t.muted)}>{s.stat.label}</p>
        </div>
      )}

      {s.image && (
        <div className="mt-auto pt-12">
          <div
            className={cn(
              "-mb-7 h-52 translate-y-3 overflow-hidden rounded-t-xl border border-b-0 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 md:-mb-9 md:h-64",
              t.shot
            )}
          >
            <img
              src={s.image.src}
              alt={s.image.alt}
              width={720}
              height={405}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      )}
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-onyx pb-32 text-paper md:pb-44">
      <div className="shell">
        <SectionHead
          id="services-title"
          title="Six ways I make a business *run.*"
          lede="Each one comes with proof: the case studies that show it working."
        />
        <Reveal stagger={0.08} className="mt-14 grid gap-4 md:mt-20 md:gap-5 lg:grid-cols-12">
          {services.map((s, i) => (
            <Cell key={s.title} s={s} span={SPANS[i]} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
