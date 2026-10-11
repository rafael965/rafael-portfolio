import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { services } from "@/content/site";
import { getCase } from "@/content/cases";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="on-light grid-light relative scroll-mt-24 bg-paper py-28 text-onyx md:py-40"
    >
      <div className="shell">
        <SectionHead
          id="services-title"
          tone="light"
          index="/02"
          label="What I do"
          title="Six ways I make a business *run*"
          aside="Each one is backed by work you can read — the proof links go straight to the case study."
        />

        <ol className="mt-16 border-b border-onyx/15 md:mt-24">
          {services.map((s, i) => (
            <li key={s.title} className="group relative border-t border-onyx/15">
              {/* Hover sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper-2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100"
              />
              <Reveal className="relative grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <span className="font-mono text-sm text-pine md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 md:col-span-5 lg:col-span-4">{s.title}</h3>
                <div className="md:col-span-6 lg:col-span-7">
                  <p className="max-w-[56ch] text-[1.05rem] leading-relaxed text-graphite">{s.body}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 text-[0.95rem] sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-sea" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <span className="eyebrow mr-2 text-graphite">Proof</span>
                    {s.proof.map((slug) => {
                      const c = getCase(slug);
                      if (!c) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/work/${slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-onyx/20 px-3.5 py-1.5 text-[0.85rem] transition-colors duration-300 hover:border-pine hover:bg-pine hover:text-paper"
                        >
                          {c.title}
                          <ArrowUpRight className="size-3" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
