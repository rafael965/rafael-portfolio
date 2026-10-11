import type { Metadata } from "next";
import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Arrow";
import { heroSpecs, roles, toolGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Operations manager and AI systems builder. Nine years across legal, construction, marketing and customer operations — and the habit of writing the process down, then building what a computer should be doing.",
  alternates: { canonical: "/about" },
};

const specs = heroSpecs.filter((s) => s.k !== "Builds");

export default function About() {
  return (
    <>
      <header className="grain relative overflow-hidden bg-onyx pb-20 pt-36 text-paper md:pb-28 md:pt-44">
        <div aria-hidden="true" className="grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="shell relative z-[2] grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal className="eyebrow flex items-center gap-4 border-t border-paper/15 pt-4 text-dim">
              <span className="text-fawn">About</span>
              <span>Rafael Reyes</span>
            </Reveal>
            <SplitReveal as="h1" trigger="load" delay={0.1} className="t-display mt-10 text-[clamp(3.4rem,10vw,10.5rem)]">
              I build the systems I <span className="t-accent text-fawn">run</span>
            </SplitReveal>
            <Reveal delay={0.25}>
              <p className="t-lead mt-10 max-w-[56ch] text-sage">
                Most operations people inherit a process and keep it alive. Most developers build a tool and hand it
                over. I sit in the overlap — close enough to the work to know what actually breaks, and technical
                enough to fix it properly.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-paper/12 pt-6 sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt className="eyebrow text-dim">{s.k}</dt>
                    <dd className="mt-1.5 text-paper">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <figure className="lg:col-span-4">
            <ImageReveal from="bottom" parallax={6} delay={0.2} className="aspect-[4/5] w-full max-w-md bg-onyx-2">
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

      {/* Story */}
      <section aria-labelledby="story" className="on-light bg-paper py-24 text-onyx md:py-36">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h2 id="story" className="eyebrow border-t border-onyx/15 pt-4 text-graphite">
              <span className="text-pine">/01</span>&nbsp;&nbsp;How I got here
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
              instead — and, eventually, building those.
            </p>
            <p>
              The training was already there. I hold a Computer Programming NC IV and was named Programmer of the Year
              in 2017, which felt like an irrelevant detail through most of the administrative years. It stopped being
              irrelevant the moment a spreadsheet stopped coping and the honest answer was &ldquo;this should be an
              application.&rdquo;
            </p>
            <p>
              The most recent chapter is legal operations — client coordination and executive support at an
              intellectual property firm, where the same pattern applies: intake, onboarding, matter administration and
              compliance, held together by documentation and improved with automation where automation genuinely earns
              its place.
            </p>
            <p className="border-l-2 border-sea pl-6 text-graphite">
              The part I care about is <strong className="font-semibold text-onyx">handover</strong>. A system that only
              works while I&rsquo;m running it isn&rsquo;t a system — it&rsquo;s a dependency. Everything on this site
              was built to be given away.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Roles */}
      <section aria-labelledby="roles-title" className="bg-onyx py-24 text-paper md:py-36">
        <div className="shell">
          <SectionHead id="roles-title" index="/02" label="Background" title="Six *roles*" />
          <ol className="mt-16 border-b border-paper/12 md:mt-20">
            {roles.map((r, i) => (
              <li key={r.org} className="border-t border-paper/12">
                <Reveal className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14">
                  <span className="font-mono text-xs text-fawn md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="md:col-span-4">
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
      <section aria-label="Education and tooling" className="on-light bg-paper py-24 text-onyx md:py-36">
        <div className="shell grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="eyebrow border-t border-onyx/15 pt-4 text-graphite">
                <span className="text-pine">/03</span>&nbsp;&nbsp;Education
              </h2>
            </Reveal>
            <Reveal stagger={0.08} className="mt-8 grid gap-8">
              <div>
                <p className="t-h4">Computer Programming NC IV</p>
                <p className="mt-1 text-graphite">Infotech College of Arts and Sciences</p>
              </div>
              <div>
                <p className="t-h4">Programmer of the Year, 2017</p>
                <p className="mt-1 text-graphite">1st Honorable Mention</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="eyebrow border-t border-onyx/15 pt-4 text-graphite">
                <span className="text-pine">/04</span>&nbsp;&nbsp;What I work in
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {toolGroups.map((g) => (
                <Reveal key={g.label}>
                  <p className="t-h4">{g.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <li key={t} className="rounded-full border border-onyx/20 px-3 py-1 text-[0.88rem]">
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
          <Link href="/#work" className="group flex items-center justify-between gap-6 border-b border-paper/10 py-14 md:border-b-0 md:border-r md:py-20 md:pr-10">
            <span>
              <span className="eyebrow block text-fawn">Next</span>
              <span className="t-h2 mt-3 block transition-colors duration-500 group-hover:text-fawn">See the work</span>
            </span>
            <ArrowRight className="size-8 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2" />
          </Link>
          <a href="#contact" className="group flex items-center justify-between gap-6 py-14 md:py-20 md:pl-10">
            <span>
              <span className="eyebrow block text-fawn">Or</span>
              <span className="t-h2 mt-3 block transition-colors duration-500 group-hover:text-fawn">Get in touch</span>
            </span>
            <ArrowRight className="size-8 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2" />
          </a>
        </div>
      </section>
    </>
  );
}
