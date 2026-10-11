import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { testimonials } from "@/content/site";

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section aria-labelledby="words-title" className="bg-pine py-28 text-paper md:py-40">
      <div className="shell">
        <h2 id="words-title" className="sr-only">
          What people say
        </h2>

        <figure className="max-w-6xl">
          <blockquote>
            <SplitReveal
              as="p"
              stagger={0.06}
              className="font-display text-[clamp(1.8rem,3.3vw,3.3rem)] font-medium leading-[1.12] tracking-[-0.025em] [font-variation-settings:'wdth'_88]"
            >
              <span className="text-fawn">&ldquo;</span>
              {featured.quote}
              <span className="text-fawn">&rdquo;</span>
            </SplitReveal>
          </blockquote>
          <Reveal as="figcaption" className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-fawn" aria-hidden="true" />
            <span>
              <span className="text-paper">{featured.name}</span>
              <span className="text-sage">, {featured.org}</span>
            </span>
          </Reveal>
        </figure>

        <Reveal stagger={0.12} className="mt-20 grid gap-14 md:mt-28 md:grid-cols-2 md:gap-12 lg:ml-[33.33%] lg:grid-cols-2">
          {rest.map((t) => (
            <figure key={t.name}>
              <blockquote className="text-[1.25rem] leading-[1.45] text-paper/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[0.95rem]">
                <span className="text-paper">{t.name}</span>
                <span className="text-sage">, {t.org}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
