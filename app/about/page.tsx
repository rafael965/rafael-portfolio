import type { Metadata } from "next";
import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Arrow";
import { facts, roles, toolGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Operations manager and AI systems builder. Nine years across legal, construction, marketing and customer operations, and the habit of writing the process down, then building what a computer should be doing.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <header className="bg-onyx pb-20 pt-28 text-paper md:pb-28 md:pt-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="text-[0.95rem] text-fawn">About</Reveal>
            <SplitReveal as="h1" trigger="load" delay={0.1} className="t-display mt-6 pb-[0.1em] text-[clamp(3.4rem,10vw,10.5rem)]">
              I build the systems I <span className="t-accent text-fawn">run</span>
            </SplitReveal>
            <Reveal delay={0.25}>
              <p className="t-lead mt-8 max-w-[56ch] text-sage">
                Most operations people inherit a process and keep it alive. Most developers build a tool and hand it
                over. I sit in the overlap: close enough to the work to know what actually breaks, and technical
                enough to fix it properly.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-paper/12 pt-6 sm:grid-cols-3">
                {facts.map((s) => (
                  <div key={s.k}>
                    <dt className="text-[0.85rem] text-dim">{s.k}</dt>
                    <dd className="mt-1.5 text-paper">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <figure className="lg:col-span-4">
            <ImageReveal from="bottom" parallax={6} delay={0.2} className="aspect-[4/5] w-full max-w-md rounded-2xl bg-onyx-2">
              <img
                src="/assets/img/rafael@2x.webp"
                srcSet="/assets/img/rafael@1x.webp 570w, /assets/img/rafael@2x.webp 1140w"
                sizes="(min-width: 1024px) 28vw, 90vw"
                alt="Rafael Reyes"
                width={1140}
                height={1503}
                fetchPriority="high"
                className="h-full w-full object-cover object-top grayscale contrast-[1.06]"
              />
            </ImageReveal>
          </figure>
        </div>
      </header>

      {/* Story: the page's one light section, for long-form reading */}
      <section aria-labelledby="story" className="on-light bg-paper py-24 text-onyx md:py-36">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h2 id="story" className="t-h3">
              How I got here
            </h2>
          </Reveal>
          <Reveal stagger={0.08} className="grid max-w-[64ch] gap-6 text-[1.15rem] leading-[1.75] lg:col-span-8 lg:col-start-5">
            <p className="t-h4 !leading-snug">
              I started in customer operations at Amazon, moved into administrative management at a digital forensics
              firm, then into construction project coordination. Different industries, the same recurring discovery:
              the thing slowing the business down was almost never a lack of talent. It was that nobody had written the
              process down.
            </p>
            <p>
              So I started writing them down. Then I started noticing which documented steps a computer should be doing
              instead, and eventually, building those.
            </p>
            <p>
              The training was already there. I hold a Computer Programming NC IV and was named Programmer of the Year
              in 2017, which felt like an irrelevant detail through most of the administrative years. It stopped being
              irrelevant the moment a spreadsheet stopped coping and the honest answer was &ldquo;this should be an
              application.&rdquo;
            </p>
            <p>
              The most recent chapter is legal operations: client coordination and executive support at an
              intellectual property firm, where the same pattern applies. Intake, onboarding, matter administration and
              compliance, held together by documentation and improved with automation where automation genuinely earns
              its place.
            </p>
            <p className="border-l-2 border-sea pl-6 text-graphite">
              The part I care about is <strong className="font-semibold text-onyx">handover</strong>. A system that only
              works while I&rsquo;m running it isn&rsquo;t a system. It&rsquo;s a dependency. Everything on this site
              was built to be given away.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Roles */}
      <section aria-labelledby="roles-title" className="bg-onyx py-24 text-paper md:py-36">
        <div className="shell">
          <SectionHead id="roles-title" title="Six *roles*" />
          <ol className="mt-16 divide-y divide-paper/12 border-y border-paper/12 md:mt-20">
            {roles.map((r) => (
              <li key={r.org}>
                <Reveal className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                  <div className="md:col-span-5">
                    <h3 className="t-h3">{r.org}</h3>
                    <p className="mt-2 text-sage">{r.title}</p>
                  </div>
                  <div className="grid max-w-[62ch] gap-4 leading-relaxed text-paper/85 md:col-span-7">
                    <p>{r.summary}</p>
                    {r.detail && <p className="text-sage">{r.detail}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Education + tooling */}
      <section aria-label="Education and tooling" className="bg-onyx pb-24 text-paper md:pb-36">
        <div className="shell grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h3">Education</h2>
            <Reveal stagger={0.08} className="mt-8 grid gap-8">
              <div>
                <p className="t-h4">Computer Programming NC IV</p>
                <p className="mt-1 text-sage">Infotech College of Arts and Sciences</p>
              </div>
              <div>
                <p className="t-h4">Programmer of the Year, 2017</p>
                <p className="mt-1 text-sage">1st Honorable Mention</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="t-h3">What I work in</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {toolGroups.map((g) => (
                <Reveal key={g.label}>
                  <p className="text-fawn">{g.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <li key={t} className="rounded-full border border-paper/20 px-3 py-1 text-[0.88rem] text-paper/85">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section aria-label="Next" className="border-t border-paper/10 bg-onyx text-paper">
        <div className="shell grid md:grid-cols-2">
          <Link
            href="/#work"
            className="group flex items-center justify-between gap-6 border-b border-paper/10 py-14 md:border-b-0 md:border-r md:py-20 md:pr-10"
          >
            <span className="t-h2 transition-colors duration-500 group-hover:text-fawn">View work</span>
            <ArrowRight className="size-8 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2" />
          </Link>
          <a href="#contact" className="group flex items-center justify-between gap-6 py-14 md:py-20 md:pl-10">
            <span className="t-h2 transition-colors duration-500 group-hover:text-fawn">Let&rsquo;s talk</span>
            <ArrowRight className="size-8 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2" />
          </a>
        </div>
      </section>
    </>
  );
}
