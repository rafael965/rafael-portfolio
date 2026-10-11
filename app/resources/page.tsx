import type { Metadata } from "next";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SubscribeForm } from "@/components/resources/SubscribeForm";

export const metadata: Metadata = {
  title: "The Operations Runbook Kit",
  description:
    "Four free templates for turning work that lives in one person's head into work a team can run: an intake-to-onboarding runbook, an SOP template, a weekly calendar structure and six AI prompt workflows.",
  alternates: { canonical: "/resources" },
};

const inside = [
  {
    title: "Intake to onboarding",
    body: "Seventeen steps from first enquiry to onboarded client, with owner, tool and a “done when” condition per step.",
  },
  {
    title: "SOP template",
    body: "The seven fields that make a written process survive contact with reality, including the one everybody leaves out.",
  },
  {
    title: "Weekly calendar structure",
    body: "Five block types, availability bands, and deadlines held as fixtures. How to protect the work only one person can do.",
  },
  {
    title: "AI prompt workflows",
    body: "Six prompts on a shared Role / Task / Context / Constraints / Output structure: inbox triage, thread-to-actions, meeting brief, report narrative, reply draft, prospect research.",
  },
];

export default function Resources() {
  return (
    <>
      <section aria-labelledby="kit-title" className="bg-onyx pb-24 pt-28 text-paper md:pb-32 md:pt-32">
        <div className="shell">
          <Reveal className="text-[0.95rem] text-fawn">Free resource, 9-page PDF</Reveal>
          <div className="mt-6 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SplitReveal as="h1" id="kit-title" trigger="load" delay={0.1} className="t-h1 pb-[0.08em]">
                The Operations <span className="t-accent text-fawn">Runbook</span> Kit
              </SplitReveal>
              <Reveal delay={0.25}>
                <p className="t-lead mt-8 max-w-[52ch] text-paper">
                  Four templates for turning work that lives in your head into work someone else can run. Every one came
                  out of a real job: a client intake chain, an executive&rsquo;s calendar, a project coordinator&rsquo;s
                  handover.
                </p>
                <p className="mt-6 max-w-[56ch] leading-relaxed text-sage">
                  They are deliberately tool-agnostic. The value was never the software; it was deciding who owns each
                  step and what &ldquo;done&rdquo; means. Nine pages, no signup wall on the content itself. If you
                  would rather just read it, the download link is in the email and there is nothing else in there.
                </p>
              </Reveal>
              <Reveal delay={0.35} className="mt-14 max-w-xl border-t border-paper/12 pt-10">
                <SubscribeForm />
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <ImageReveal from="bottom" parallax={6} delay={0.3} className="aspect-[760/983] w-full rounded-2xl bg-onyx-2 shadow-[0_50px_120px_-40px_rgb(0_0_0/0.7)]">
                <img
                  src="/assets/img/kit-cover.webp"
                  alt="Cover of the Operations Runbook Kit"
                  width={760}
                  height={983}
                  className="h-full w-full object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="inside" className="on-light bg-paper py-24 text-onyx md:py-32">
        <div className="shell">
          <h2 id="inside" className="t-h3">
            What&rsquo;s inside
          </h2>
          <Reveal stagger={0.08} as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inside.map((t, i) => (
              <li key={t.title} className="rounded-2xl border border-onyx/10 bg-paper-2 p-6 md:p-8">
                <span className="t-display text-5xl text-pine">{i + 1}</span>
                <h3 className="t-h4 mt-8">{t.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-graphite">{t.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
