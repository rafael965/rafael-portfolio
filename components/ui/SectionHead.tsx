import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Section opener: index + label on a rule, then a display heading.
 * `title` may contain one *accent* word, set in the serif italic.
 */
export function SectionHead({
  index,
  label,
  title,
  aside,
  tone = "dark",
  id,
  className,
}: {
  id?: string;
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const parts = title.split(/(\*[^*]+\*)/);
  return (
    <header className={cn("grid gap-10 md:grid-cols-12 md:items-end", className)}>
      <Reveal
        className={cn(
          "eyebrow flex items-center gap-4 border-t pt-4 md:col-span-12",
          tone === "dark" ? "border-paper/15 text-dim" : "border-onyx/15 text-graphite"
        )}
      >
        <span className={tone === "dark" ? "text-fawn" : "text-pine"}>{index}</span>
        <span>{label}</span>
      </Reveal>
      <SplitReveal as="h2" id={id} className="t-h2 md:col-span-8">
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
      {aside && (
        <Reveal className={cn("t-lead md:col-span-4", tone === "dark" ? "text-sage" : "text-graphite")}>{aside}</Reveal>
      )}
    </header>
  );
}
