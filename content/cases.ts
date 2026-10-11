import data from "./cases.json";

/** `url` overrides the browser-frame address for this one screen. */
export type Shot = { src: string; sm: string; w: number; h: number; alt: string; caption: string; url?: string };

export type Case = {
  slug: string;
  title: string;
  client: string;
  discipline: string;
  summary: string;
  lede: string;
  image: Shot;
  gallery: Shot[];
  meta: [string, string][];
  live: string | null;
  body: string;
};

/** Ordered as shown on the homepage: four featured, then the rest. */
export const cases = data as Case[];

export const FEATURED = 4;

/** Homepage card copy: shorter than the case summary, plus the tags. */
export const cards: Record<string, { blurb: string; tags: string[] }> = {
  "dcse-website": {
    blurb:
      "A ground-up redesign for a structural engineering firm — an engineering-drawing design language, a Three.js logo that assembles on scroll, and project photography given one art direction.",
    tags: ["Next.js", "GSAP", "Three.js", "Art direction"],
  },
  "lively-website": {
    blurb:
      "A premium multi-page site for an AI operations company — generated particle visuals, a self-drawing logo and an agent showcase, built in Next.js and Motion.",
    tags: ["Next.js", "Motion", "Canvas", "Copy & IA"],
  },
  "agent-system": {
    blurb:
      "Five agents across two organisations. At Lively, a strategy-and-execution team with written routing rules and a shared client memory. At ARC, research agents for due diligence and partner research.",
    tags: ["AI agents", "Prompt systems", "Due diligence", "Routing design"],
  },
  "arc-intake": {
    blurb:
      "A seventeen-step onboarding chain from first enquiry to open matter — documented, delegable, and wired across Clio, DocuSign, LawPay and Dropbox.",
    tags: ["Clio Grow", "Clio Manage", "DocuSign", "SOP design"],
  },
  "lively-dashboard": {
    blurb:
      "A multi-tenant dashboard that collects weekly numbers from every account, writes the monthly narrative, renders the PDF and emails it.",
    tags: ["Next.js", "TypeScript", "Claude API"],
  },
  "exec-calendar": {
    blurb:
      "Protected blocks, prep buffers, team availability and deadlines as fixtures — so the week is a budget rather than a queue.",
    tags: ["Calendar", "Inbox triage", "Outlook"],
  },
  "content-programme": {
    blurb:
      "Twenty-four articles in eight months on AI and intellectual property — written, reviewed, illustrated and published to a held cadence.",
    tags: ["Editorial", "Ghostwriting", "LinkedIn"],
  },
  "campaign-engine": {
    blurb:
      "Five landing pages for two gyms on one reusable funnel engine — from a $1 win-back to a six-week challenge shipped in eighteen days.",
    tags: ["Landing pages", "Serverless", "Staff SOPs"],
  },
  "gbi-buildertrend": {
    blurb:
      "Estimates, allowances and compliance documentation brought into one predictable shape, so the job could be handed over without a phone call.",
    tags: ["Buildertrend", "Estimating", "Compliance"],
  },
  "bdr-portal": {
    blurb:
      "Sequential training modules with assessments, so a new starter ramps on a defined path instead of shadowing whoever is free.",
    tags: ["React", "Vite", "Curriculum design"],
  },
};

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

export const nextCase = (slug: string) => {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
};

/** Short client label for cards ("ARC IP Law, PC" → "ARC IP Law"). */
export const shortClient = (client: string) =>
  client.replace(/, (PC|Inc\.)$/, "").replace("The Camp Transformation Center", "The Camp");

/** h2 headings in a case body, for the in-page index. */
export const sections = (body: string) =>
  Array.from(body.matchAll(/<h2>(.*?)<\/h2>/g), (m, i) => ({
    id: `s-${i + 1}`,
    label: m[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&rsquo;/g, "’"),
  }));

/** Give each h2 an id matching sections(). */
export const withAnchors = (body: string) => {
  let i = 0;
  return body.replace(/<h2>/g, () => `<h2 id="s-${++i}">`);
};
