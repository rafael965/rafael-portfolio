import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowRight } from "@/components/ui/Arrow";
import { Toolkit } from "@/components/home/Toolkit";
import { roleGroups } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 bg-onyx pb-32 text-paper md:pb-44">
      <div className="shell">
        <SectionHead
          id="experience-title"
          title="Nine years, *six* organisations."
          lede="Three sectors, one throughline: I arrive where the process lives in somebody's head, and leave it written down and running."
        />

        {/* Grouped by sector rather than listed: the grouping is the point. */}
        <Reveal stagger={0.1} className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
          {roleGroups.map(({ group, roles }) => (
            <div key={group} className="border-t border-fawn/40 pt-6">
              <h3 className="text-[0.95rem] text-fawn">{group}</h3>
              <ul className="mt-8 grid gap-9">
                {roles.map((r) => (
                  <li key={r.org}>
                    <p className="t-h3 text-[clamp(1.6rem,2.2vw,2.2rem)]">{r.org}</p>
                    <p className="mt-2 text-sage">{r.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <Link href="/about" className="group inline-flex items-center gap-3 text-paper">
            <span className="link-underline">Full background</span>
            <span className="grid size-9 place-items-center rounded-full border border-paper/20 transition-colors duration-500 group-hover:border-fawn group-hover:bg-fawn group-hover:text-onyx">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="mt-28 md:mt-36">
        <Toolkit />
      </div>
    </section>
  );
}
