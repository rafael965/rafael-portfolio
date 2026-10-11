import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { testimonials } from "@/content/site";

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section aria-labelledby="words-title" className="grain relative overflow-hidden bg-pine py-28 text-paper md:py-40">
      <div className="shell relative z-[2]">
        <SectionHead id="words-title" index="/04" label="In their words" title="Kind *words*" />

        <figure className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <span aria-hidden="true" className="t-accent -mb-10 text-[9rem] leading-[0.6] text-fawn md:col-span-1 md:mb-0">
            &ldquo;
          </span>
          <blockquote className="md:col-span-10">
            <SplitReveal as="p" stagger={0.05} className="font-serif text-[clamp(1.7rem,3.2vw,3.25rem)] leading-[1.18] tracking-[-0.01em]">
              {featured.quote}
            </SplitReveal>
          </blockquote>
          <Reveal as="figcaption" className="md:col-span-10 md:col-start-2">
            <span className="block text-lg text-paper">{featured.name}</span>
            <span className="eyebrow text-fawn">{featured.org}</span>
          </Reveal>
        </figure>

        <Reveal stagger={0.1} className="mt-24 grid gap-x-16 gap-y-14 md:mt-32 md:grid-cols-2">
          {rest.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between gap-10 border-t border-paper/15 pt-8">
              <blockquote className="font-serif text-[1.35rem] leading-[1.4] text-paper/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="block text-paper">{t.name}</span>
                <span className="eyebrow text-fawn">{t.org}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
