import { cn } from "@/lib/cn";

/** Window chrome around a screenshot: three dots and the address it lives at. */
export function BrowserFrame({
  url,
  children,
  tone = "dark",
  className,
}: {
  url: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border",
        tone === "dark" ? "border-paper/10 bg-onyx-2" : "border-onyx/10 bg-paper-2",
        className
      )}
    >
      <div
        className={cn(
          "flex h-8 items-center gap-3 border-b px-3.5 md:h-9",
          tone === "dark" ? "border-paper/10" : "border-onyx/10"
        )}
      >
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("size-2 rounded-full", tone === "dark" ? "bg-paper/15" : "bg-onyx/15")} />
          ))}
        </span>
        <span
          className={cn(
            "mx-auto max-w-[70%] truncate rounded-full px-3 py-0.5 font-mono text-[0.65rem] tracking-[0.04em]",
            tone === "dark" ? "bg-paper/[0.06] text-dim" : "bg-onyx/[0.06] text-graphite"
          )}
        >
          {url}
        </span>
        <span aria-hidden="true" className="w-[2.25rem]" />
      </div>
      {children}
    </div>
  );
}

/** The address shown in the frame: the live host, or an honest label when there is none. */
export const frameUrl = (c: { slug: string; live: string | null }) => {
  if (c.live) return new URL(c.live).host;
  if (c.slug === "lively-website") return "lively — staging build";
  if (c.slug === "campaign-engine") return "5 live campaign pages";
  return "Illustrative interface — no client data";
};
