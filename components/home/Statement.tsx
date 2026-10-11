import { ScrollWords } from "@/components/motion/ScrollWords";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/content/site";

export function Statement() {
  return (
    <section aria-label="Approach" className="relative bg-onyx py-28 text-paper md:py-44">
      <div className="shell grid gap-16 md:grid-cols-12">
        <Reveal className="eyebrow text-dim md:col-span-3">
          <span className="text-fawn">/00</span>&nbsp;&nbsp;Approach
        </Reveal>
        <div className="md:col-span-9">
          <ScrollWords
            className="t-statement"
            text="Most operations people inherit a process and keep it alive. Most developers build a tool and hand it over. I sit in the *overlap* — close enough to the work to know what actually breaks, and technical enough to fix it properly."
          />
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-paper/10 bg-paper/10 md:mt-28 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-onyx p-6 md:p-8">
                <dt className="eyebrow text-dim">{s.label}</dt>
                <dd className="t-display mt-6 text-[clamp(3.5rem,6vw,6rem)] text-fawn">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
