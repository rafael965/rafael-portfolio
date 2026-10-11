import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/content/site";

const elsewhere = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Résumé", href: site.resume },
];

/** Every page ends on the same invitation. `#contact` is the nav CTA's target. */
export function Footer() {
  return (
    <footer id="contact" className="grain grid-dark relative overflow-hidden bg-onyx text-paper">
      <div className="shell relative z-[2] pb-10 pt-28 md:pt-40">
        <Reveal className="eyebrow flex items-center gap-4 border-t border-paper/15 pt-4 text-dim">
          <span className="text-fawn">/05</span>
          <span>Contact</span>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:items-end">
          <SplitReveal as="h2" className="t-display text-[clamp(3.4rem,11.5vw,12.5rem)] lg:col-span-9">
            Want to talk <span className="t-accent text-fawn">shop?</span>
          </SplitReveal>
          <Reveal className="lg:col-span-3 lg:pb-4">
            <p className="t-lead max-w-[30ch] text-sage">
              Always glad to talk operations, internal tooling, or how any of the systems here actually got built. The
              inbox is open.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4 md:mt-20">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-4 rounded-full bg-fawn py-3 pl-7 pr-3 text-onyx transition-colors duration-500 hover:bg-paper md:py-4 md:pl-9"
            >
              <span className="t-h4">{site.email}</span>
              <span className="grid size-11 place-items-center rounded-full bg-onyx text-fawn transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-45 md:size-12">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Magnetic>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-4 text-paper transition-colors hover:border-fawn hover:text-fawn"
          >
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
        </Reveal>

        <div className="mt-28 grid gap-10 border-t border-paper/12 pt-10 text-sm md:mt-40 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sage">
              {site.role}. {site.tagline}
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4 text-dim">Site</p>
            <ul className="grid gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-paper/85 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow mb-4 text-dim">Elsewhere</p>
            <ul className="grid gap-2">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener" })}
                    className="link-underline inline-flex items-center gap-1.5 text-paper/85 hover:text-paper"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-dim sm:flex-row">
          <span>© 2026 Rafael Reyes</span>
          <span>Internal-tool screens are illustrative — no client data</span>
        </div>
      </div>
    </footer>
  );
}
