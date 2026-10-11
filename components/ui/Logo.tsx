import Link from "next/link";

/** "RR." monogram — the full stop is the sea-green accent, as in the favicon. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Rafael Reyes, home" className={`group inline-flex items-baseline ${className}`}>
      <span className="font-display text-[1.45rem] font-extrabold leading-none tracking-[-0.04em] [font-variation-settings:'wdth'_75]">
        RR
      </span>
      <span className="ml-[1px] inline-block size-[0.42rem] translate-y-[-0.05rem] rounded-full bg-sea transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-150" />
    </Link>
  );
}
