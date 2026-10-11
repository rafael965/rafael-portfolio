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
    <footer id="contact" className="relative overflow-hidden bg-onyx text-paper">
      <div className="shell pb-10 pt-32 md:pt-44">
        <SplitReveal as="h2" className="t-display pb-[0.1em] text-[clamp(3.4rem,11vw,12rem)]">
          Want to talk <span className="t-accent text-fawn">shop?</span>
        </SplitReveal>
        <Reveal>
          <p className="t-lead mt-8 max-w-[44ch] text-sage">
            Always glad to talk operations, internal tooling, or how any of the systems here actually got built.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-14">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-4 rounded-full bg-fawn py-3 pl-8 pr-3 text-onyx transition-colors duration-500 hover:bg-paper active:scale-[0.98] md:py-3.5"
            >
              <span className="t-h4">Let&rsquo;s talk</span>
              <span className="grid size-11 place-items-center rounded-full bg-onyx text-fawn transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Magnetic>
          <a href={`mailto:${site.email}`} className="link-underline text-lg text-paper/90 hover:text-paper">
            {site.email}
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
            <p className="mb-4 text-[0.9rem] text-dim">Site</p>
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
            <p className="mb-4 text-[0.9rem] text-dim">Elsewhere</p>
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

        <div className="mt-16 flex flex-col justify-between gap-3 text-[0.85rem] text-dim sm:flex-row">
          <span>© 2026 Rafael Reyes</span>
          <span>Internal-tool screens are illustrative, with no client data</span>
        </div>
      </div>
    </footer>
  );
}
