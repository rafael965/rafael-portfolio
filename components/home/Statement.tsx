import { ScrollWords } from "@/components/motion/ScrollWords";

/** One idea, set large, lit word by word at reading pace. */
export function Statement() {
  return (
    <section aria-label="Approach" className="bg-onyx pb-32 pt-8 text-paper md:pb-48 md:pt-16">
      <div className="shell">
        <ScrollWords
          className="t-statement max-w-[24ch] md:ml-[16.66%]"
          text="Most operations people inherit a process and keep it alive. Most developers build a tool and hand it over. I sit in the *overlap:* close enough to the work to know what actually breaks, and technical enough to fix it properly."
        />
      </div>
    </section>
  );
}
