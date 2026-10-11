"use client";

import type { IconType } from "react-icons";
import {
  SiAsana, SiCalendly, SiClaude, SiClickup, SiDropbox, SiGoogle, SiGoogleappsscript, SiGsap, SiHubspot,
  SiN8N, SiNetlify, SiNextdotjs, SiNodedotjs, SiNotion, SiReact, SiResend, SiTailwindcss, SiThreedotjs,
  SiTodoist, SiTypescript, SiVercel, SiZoho, SiZoom,
} from "react-icons/si";
import { LogoLoop, type LogoItem } from "@/components/motion/LogoLoop";

type Tool = [name: string, icon?: IconType];

const build: Tool[] = [
  ["Next.js", SiNextdotjs], ["React", SiReact], ["TypeScript", SiTypescript], ["Node.js", SiNodedotjs],
  ["Tailwind CSS", SiTailwindcss], ["GSAP", SiGsap], ["Motion"], ["Three.js", SiThreedotjs],
  ["Vercel", SiVercel], ["Netlify", SiNetlify], ["n8n", SiN8N], ["Claude API", SiClaude],
  ["Apps Script", SiGoogleappsscript], ["Resend", SiResend],
];

const operate: Tool[] = [
  ["Clio Manage"], ["Clio Grow"], ["DocuSign"], ["LawPay"], ["Buildertrend"], ["GoHighLevel"],
  ["ClickUp", SiClickup], ["Notion", SiNotion], ["Asana", SiAsana], ["HubSpot", SiHubspot], ["Zoho CRM", SiZoho],
  ["Google Workspace", SiGoogle], ["Microsoft 365"], ["Slack"], ["Dropbox", SiDropbox], ["Zoom", SiZoom],
  ["Calendly", SiCalendly], ["RingCentral"], ["Todoist", SiTodoist], ["Canva"],
];

// Brand marks where Simple Icons has one; a monogram where it does not, so
// every item carries the same leading mark. All drawn in one tone, not brand colour.
const toItems = (tools: Tool[]): LogoItem[] =>
  tools.map(([name, Icon]) => ({
    title: name,
    node: (
      <span className="flex items-center gap-[0.4em] text-sage transition-colors duration-300 hover:text-fawn">
        {Icon ? (
          <Icon aria-hidden="true" className="size-[0.62em] shrink-0" />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-[0.62em] shrink-0 place-items-center rounded-full border-[1.5px] border-current"
          >
            <span className="font-mono text-[0.32em] font-medium leading-none">{name[0]}</span>
          </span>
        )}
        <span className="font-display text-[0.72em] font-semibold tracking-[-0.02em] [font-variation-settings:'wdth'_82]">
          {name}
        </span>
      </span>
    ),
  }));

const buildItems = toItems(build);
const operateItems = toItems(operate);

// Block layout on purpose: inside a grid or flex row the loop's container grows
// with its own content, so each added copy widens it and asks for more copies.
export function Toolkit() {
  return (
    <div className="space-y-8 overflow-hidden py-2 md:space-y-10">
      {[
        { label: "Build with", logos: buildItems, direction: "left" as const, aria: "Development tools" },
        { label: "Operate in", logos: operateItems, direction: "right" as const, aria: "Operations software" },
      ].map((row) => (
        <div key={row.label}>
          <p className="shell eyebrow mb-4 text-dim">{row.label}</p>
          <LogoLoop
            logos={row.logos}
            speed={42}
            direction={row.direction}
            logoHeight={52}
            gap={56}
            hoverSpeed={10}
            fadeOut
            fadeOutColor="#121619"
            ariaLabel={row.aria}
          />
        </div>
      ))}
    </div>
  );
}
