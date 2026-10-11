"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

type State = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function SubscribeForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!looksLikeEmail(data.email || "")) {
      setState({ kind: "err", text: "That email address does not look right." });
      return;
    }
    setState({ kind: "sending" });
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "Something went wrong.");
      form.reset();
      setState({ kind: "ok", text: "Sent. Check your inbox — the download link is in the email." });
    } catch (err) {
      setState({ kind: "err", text: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const field =
    "mt-2 w-full border-b border-paper/25 bg-transparent py-3 text-lg text-paper placeholder:text-dim focus:border-fawn focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7">
      <div>
        <label htmlFor="kName" className="eyebrow text-dim">
          Name <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="kName" name="name" type="text" autoComplete="name" maxLength={80} className={field} />
      </div>
      <div>
        <label htmlFor="kEmail" className="eyebrow text-dim">
          Email
        </label>
        <input
          id="kEmail"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          aria-describedby="kNote"
          className={field}
        />
      </div>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="kCompany">Company</label>
        <input id="kCompany" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state.kind === "sending"}
        className="group inline-flex w-fit items-center gap-3 rounded-full bg-sea py-3 pl-7 pr-3 font-medium text-white transition-colors hover:bg-[#076b3d] disabled:opacity-70"
      >
        {state.kind === "sending" ? "Sending…" : "Send me the kit"}
        <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-3.5" />
        </span>
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-[1.5em] text-[0.95rem]",
          state.kind === "ok" && "text-fawn",
          state.kind === "err" && "text-[#f2a07b]"
        )}
      >
        {state.text}
      </p>

      <p id="kNote" className="max-w-[44ch] text-sm leading-relaxed text-sage">
        One email with the download link. No list, no sequence, no sharing your address with anyone. Reply
        &ldquo;remove&rdquo; and I delete it.
      </p>
    </form>
  );
}
