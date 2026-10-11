"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight } from "@/components/ui/Arrow";
import { getLenis } from "@/lib/lenis";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Solid capsule once scrolled; slides away on scroll down, returns on scroll up.
  // Motion's scroll value is batched per frame, unlike a raw scroll listener.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const last = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > 320 && y > last + 4) setHidden(true);
    else if (y < last - 4) setHidden(false);
  });

  // Close the menu on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll while the menu is open; Escape closes it.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-transform duration-700 ease-[var(--ease-expo)]",
          hidden && !open && "-translate-y-[120%]"
        )}
      >
        <div className="shell pt-3 md:pt-4">
          <div
            className={cn(
              "flex h-14 items-center justify-between rounded-full pl-5 pr-2 text-paper transition-[background-color,backdrop-filter,box-shadow] duration-500 md:h-[3.75rem] md:pl-6",
              scrolled || open
                ? "bg-onyx/80 shadow-[0_0_0_1px_rgb(229_198_135/0.1)] backdrop-blur-xl"
                : "bg-transparent"
            )}
          >
            <Logo />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="link-underline group relative py-1 text-[0.94rem] text-paper/85 transition-colors hover:text-paper aria-[current=page]:text-paper"
                    >
                      {item.label}
                      {item.count && (
                        <sup className="ml-0.5 font-mono text-[0.6rem] text-fawn">{item.count}</sup>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="group hidden items-center gap-2 rounded-full bg-sea px-5 py-2.5 text-[0.92rem] font-medium text-white transition-colors duration-300 hover:bg-[#076b3d] sm:inline-flex"
              >
                Let&rsquo;s talk
                <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu"
                className="relative grid size-11 place-items-center rounded-full border border-paper/15 lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span
                  className={cn(
                    "absolute h-px w-4 bg-paper transition-transform duration-500 ease-[var(--ease-expo)]",
                    open ? "rotate-45" : "-translate-y-[3px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-paper transition-transform duration-500 ease-[var(--ease-expo)]",
                    open ? "-rotate-45" : "translate-y-[3px]"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[55] flex flex-col bg-onyx pt-28 text-paper lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav aria-label="Mobile" className="shell flex-1">
              <ul className="border-t border-paper/12">
                {[...nav, { label: "Contact", href: "#contact" }].map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-paper/12">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="t-h3">{item.label}</span>
                        {"count" in item && item.count && (
                          <span className="font-mono text-xs text-fawn">{item.count}</span>
                        )}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="shell flex flex-wrap gap-x-6 gap-y-2 pb-10 pt-6 text-sm text-sage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
