import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Arrow";
import { Toolkit } from "@/components/home/Toolkit";
import { roles } from "@/content/site";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative scroll-mt-24 bg-onyx py-28 text-paper md:py-40"
    >
      <div className="shell">
        <SectionHead
          id="experience-title"
          index="/03"
          label="Track record"
          title="Nine years, *six* organisations"
          aside="Five sectors, one throughline: I arrive somewhere the process lives in somebody's head, and I leave it written down and running."
        />

        <Reveal stagger={0.06} as="ol" className="mt-16 border-b border-paper/12 md:mt-24">
          {roles.map((r, i) => (
            <li key={r.org} className="group relative overflow-hidden border-t border-paper/12">
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-pine transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
              />
              <div className="relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-6 md:grid-cols-12 md:gap-8 md:py-8">
                <span className="font-mono text-xs text-fawn md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-h3 md:col-span-6 md:transition-transform md:duration-700 md:ease-[var(--ease-expo)] md:group-hover:translate-x-3">
                  {r.org}
                </span>
                <span className="col-start-2 text-sage md:col-span-5 md:col-start-auto md:text-right">{r.title}</span>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <Link href="/about" className="group inline-flex items-center gap-3 text-paper">
            <span className="link-underline">Full background</span>
            <span className="grid size-9 place-items-center rounded-full border border-paper/20 transition-colors duration-500 group-hover:border-fawn group-hover:bg-fawn group-hover:text-onyx">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>

        <div className="mt-28 border-t border-paper/12 pt-6 md:mt-36">
          <Reveal className="eyebrow mb-12 flex items-center justify-between text-dim">
            <span>
              <span className="text-fawn">/03.1</span>&nbsp;&nbsp;The toolkit
            </span>
            <span className="hidden sm:inline">Hover to slow</span>
          </Reveal>
        </div>
      </div>
      <Toolkit />
    </section>
  );
}
