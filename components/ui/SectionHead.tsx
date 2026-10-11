import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Section opener: a display heading with an optional lede stacked beneath it.
 * `title` may contain one *emphasis* word, set in the italic of the same face.
 */
export function SectionHead({
  title,
  lede,
  tone = "dark",
  id,
  className,
}: {
  title: string;
  lede?: React.ReactNode;
  tone?: "dark" | "light";
  id?: string;
  className?: string;
}) {
  const parts = title.split(/(\*[^*]+\*)/);
  return (
    <header className={cn("max-w-4xl", className)}>
      <SplitReveal as="h2" id={id} className="t-h2 pb-[0.08em]">
        {parts.map((p, i) =>
          p.startsWith("*") ? (
            <span key={i} className={cn("t-accent", tone === "dark" ? "text-fawn" : "text-pine")}>
              {p.slice(1, -1)}
            </span>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </SplitReveal>
      {lede && (
        <Reveal className={cn("t-lead mt-6 max-w-[58ch]", tone === "dark" ? "text-sage" : "text-graphite")}>
          {lede}
        </Reveal>
      )}
    </header>
  );
}
