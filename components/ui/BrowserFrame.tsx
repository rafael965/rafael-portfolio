import { cn } from "@/lib/cn";

/** A slim address bar over a screenshot: just where it lives, no window chrome. */
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
        "overflow-hidden rounded-2xl border",
        tone === "dark" ? "border-paper/10 bg-onyx-2" : "border-onyx/10 bg-paper-2",
        className
      )}
    >
      <div
        className={cn(
          "flex h-8 items-center justify-center border-b px-4 md:h-9",
          tone === "dark" ? "border-paper/10" : "border-onyx/10"
        )}
      >
        <span
          className={cn(
            "max-w-full truncate font-mono text-[0.68rem] tracking-[0.02em]",
            tone === "dark" ? "text-dim" : "text-graphite"
          )}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/** The address shown in the frame: the live host, or an honest label when there is none. */
export const frameUrl = (c: { slug: string; live: string | null }) => {
  if (c.live) return new URL(c.live).host;
  if (c.slug === "lively-website") return "Lively, staging build";
  if (c.slug === "campaign-engine") return "5 live campaign pages";
  return "Illustrative interface, no client data";
};
