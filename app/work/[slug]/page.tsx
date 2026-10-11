import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Arrow";
import { BrowserFrame, frameUrl } from "@/components/ui/BrowserFrame";
import { cases, getCase, nextCase, sections, shortClient, withAnchors } from "@/content/cases";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.title} · ${shortClient(c.client)}`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${c.slug}`,
      title: c.title,
      description: c.summary,
      images: [{ url: c.image.src, width: c.image.w, height: c.image.h, alt: c.image.alt }],
    },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const index = cases.findIndex((x) => x.slug === c.slug) + 1;
  const toc = sections(c.body);
  const next = nextCase(c.slug);

  return (
    <article>
      {/* Header */}
      <header className="grain relative overflow-hidden bg-onyx pb-16 pt-36 text-paper md:pb-24 md:pt-44">
        <div
          aria-hidden="true"
          className="grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <div className="shell relative z-[2]">
          <Reveal className="eyebrow flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-4 text-dim">
            <Link href="/#work" className="group inline-flex items-center gap-2 text-paper/85 hover:text-fawn">
              <ArrowRight className="size-3 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
              All work
            </Link>
            <span>
              <span className="text-fawn">{String(index).padStart(2, "0")}</span> /{" "}
              {String(cases.length).padStart(2, "0")}
            </span>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal className="eyebrow text-fawn">
                {c.client} · {c.discipline}
              </Reveal>
              <SplitReveal as="h1" trigger="load" delay={0.15} className="t-h1 mt-6">
                {c.title}
              </SplitReveal>
              <Reveal delay={0.3}>
                <p className="t-lead mt-8 max-w-[54ch] text-sage">{c.lede}</p>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="lg:col-span-4">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/12 pt-6">
                {c.meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-dim">{k}</dt>
                    <dd className="mt-1.5 text-[0.95rem] text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
              {c.live && (
                <a
                  href={c.live}
                  target="_blank"
                  rel="noopener"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-sea py-2.5 pl-6 pr-2.5 font-medium text-white transition-colors hover:bg-[#076b3d]"
                >
                  {c.slug === "dcse-website" ? "View the preview" : "View live site"}
                  <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </header>

      {/* Lead image */}
      <figure className="bg-onyx pb-20 md:pb-28">
        <div className="shell">
          <BrowserFrame url={c.image.url ?? frameUrl(c)} className="shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)]">
            <ImageReveal
              from="bottom"
              parallax={0}
              settle={1.01}
              delay={0.2}
              className="bg-onyx-2"
              style={{ aspectRatio: `${c.image.w} / ${c.image.h}` }}
            >
              <img
                src={c.image.src}
                srcSet={`${c.image.sm} 720w, ${c.image.src} ${c.image.w}w`}
                sizes="(min-width: 1680px) 1540px, 94vw"
                alt={c.image.alt}
                width={c.image.w}
                height={c.image.h}
                fetchPriority="high"
                className="h-full w-full object-cover object-top"
              />
            </ImageReveal>
          </BrowserFrame>
          <figcaption className="mt-4 flex justify-between gap-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-dim">
            <span>{c.image.caption}</span>
            <span className="hidden sm:inline">Fig. 01</span>
          </figcaption>
        </div>
      </figure>

      {/* Body */}
      <section aria-label="Case study" className="on-light bg-paper py-24 text-onyx md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-graphite">In this case</p>
              <ol className="mt-5 grid gap-2.5 border-l border-onyx/15 pl-5 text-[0.95rem]">
                {toc.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex gap-3 text-graphite transition-colors hover:text-onyx">
                      <span className="font-mono text-xs leading-6 text-pine">{String(i + 1).padStart(2, "0")}</span>
                      <span className="link-underline">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-10 max-w-[30ch] text-sm leading-relaxed text-graphite">{c.summary}</p>
            </div>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="prose-case" dangerouslySetInnerHTML={{ __html: withAnchors(c.body) }} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {c.gallery.length > 0 && (
        <section aria-label="More screens" className="on-light bg-paper pb-24 text-onyx md:pb-32">
          <div className="shell">
            <p className="eyebrow mb-8 border-t border-onyx/15 pt-4 text-graphite">More screens</p>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
              {c.gallery.map((g, i) => (
                <figure key={g.src}>
                  <BrowserFrame
                    url={g.url ?? frameUrl(c)}
                    tone="light"
                    className="shadow-[0_30px_80px_-40px_rgb(18_22_25/0.45)]"
                  >
                    <ImageReveal
                      from="bottom"
                      parallax={0}
                      settle={1.01}
                      delay={i % 2 ? 0.12 : 0}
                      className="bg-paper-2"
                      style={{ aspectRatio: `${g.w} / ${g.h}` }}
                    >
                      <img
                        src={g.sm}
                        srcSet={`${g.sm} 720w, ${g.src} ${g.w}w`}
                        sizes="(min-width: 768px) 46vw, 94vw"
                        alt={g.alt}
                        width={g.w}
                        height={g.h}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                    </ImageReveal>
                  </BrowserFrame>
                  <figcaption className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-graphite">
                    Fig. {String(i + 2).padStart(2, "0")} — {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next case */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="Next"
        className="group relative block overflow-hidden border-t border-paper/10 bg-onyx py-24 text-paper md:py-36"
      >
        <img
          src={next.image.sm}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-0 blur-[2px] grayscale transition-[opacity,transform] duration-1000 ease-[var(--ease-expo)] group-hover:scale-100 group-hover:opacity-[0.18]"
        />
        <div className="shell relative">
          <p className="eyebrow text-dim">
            <span className="text-fawn">Next case</span> · {shortClient(next.client)} · {next.discipline}
          </p>
          <p className="t-h1 mt-6 flex items-end justify-between gap-8">
            <span className="max-w-[16ch] transition-colors duration-500 group-hover:text-fawn">{next.title}</span>
            <span className="mb-2 hidden size-20 shrink-0 place-items-center rounded-full border border-paper/20 transition-all duration-700 ease-[var(--ease-expo)] group-hover:rotate-[-45deg] group-hover:border-fawn group-hover:bg-fawn group-hover:text-onyx md:grid">
              <ArrowRight className="size-6" />
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
