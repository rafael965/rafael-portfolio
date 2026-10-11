import Link from "next/link";
import { ArrowRight } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section className="flex min-h-[100dvh] items-end bg-onyx pb-20 pt-28 text-paper">
      <div className="shell">
        <p className="text-[0.95rem] text-fawn">Error 404</p>
        <h1 className="t-display mt-6 pb-[0.1em] text-[clamp(4rem,16vw,16rem)]">
          Not <span className="t-accent text-fawn">here</span>
        </h1>
        <p className="t-lead mt-8 max-w-[44ch] text-sage">
          This page has moved or never existed. Everything that did exist is one click away.
        </p>
        <Link href="/" className="group mt-10 inline-flex items-center gap-3 text-paper">
          <span className="link-underline">Back to the homepage</span>
          <span className="grid size-9 place-items-center rounded-full border border-paper/20 transition-colors duration-500 group-hover:border-fawn group-hover:bg-fawn group-hover:text-onyx">
            <ArrowRight className="size-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
