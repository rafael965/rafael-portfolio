// Everything on the site that is not a case study. Case studies live in cases.json.
// House style: no em or en dashes in visible copy; use commas, colons and periods.

export const site = {
  name: "Rafael Reyes",
  role: "Operations Manager & AI Systems Builder",
  url: "https://rafaelreyes.dev",
  email: "hello@rafaelreyes.dev",
  linkedin: "https://www.linkedin.com/in/reyesralf17",
  resume: "https://drive.google.com/file/d/1HjKzQR7-CzYpcu2JTC6ixwIcjOjyoJ0V/view?usp=sharing",
  description:
    "Operations manager who builds the systems he runs: internal tools, AI agents, websites and the SOPs behind them. Nine years across legal, construction, marketing and customer operations.",
  tagline: "Building the systems I run.",
};

export const nav = [
  { label: "Work", href: "/#work", count: "10" },
  { label: "Services", href: "/#services", count: "06" },
  { label: "Experience", href: "/#experience", count: "06" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

/** Short facts for the About header. */
export const facts = [
  { k: "Discipline", v: "Operations and internal tooling" },
  { k: "Experience", v: "9 years" },
  { k: "Sectors", v: "Legal, construction, marketing" },
];

export type Service = {
  title: string;
  body: string;
  proof: string[]; // case-study slugs
  /** Bento cell treatment: a surface tone plus either a screenshot or a figure. */
  tone: "dark" | "pine" | "fawn";
  image?: { src: string; alt: string };
  stat?: { value: string; label: string };
};

export const services: Service[] = [
  {
    title: "Operations management",
    body: "Owning the day-to-day so leadership doesn't have to: calendars, inbox triage, client coordination, vendors, and the follow-up that keeps work moving.",
    proof: ["exec-calendar", "arc-intake", "gbi-buildertrend"],
    tone: "dark",
    image: { src: "/assets/img/screens/calendar-sm.webp", alt: "Illustrative weekly calendar with protected blocks" },
  },
  {
    title: "Internal tools & dashboards",
    body: "When the spreadsheet stops coping, I build what replaces it. Authenticated, deployed, and simple enough to adopt without a training session.",
    proof: ["lively-dashboard", "bdr-portal"],
    tone: "pine",
    image: { src: "/assets/img/screens/lively-dashboard-sm.webp", alt: "Illustrative client reporting dashboard" },
  },
  {
    title: "AI agents & automation",
    body: "Agents with written boundaries, and reusable workflows for triage, drafting, research and reporting. Applied where it removes real work.",
    proof: ["agent-system", "lively-dashboard"],
    tone: "dark",
    stat: { value: "5", label: "agents designed and built for two organisations" },
  },
  {
    title: "Websites & digital experiences",
    body: "Marketing sites built like products: structure, copy and motion that earn trust before the first call, handed over with content the team can edit.",
    proof: ["dcse-website", "lively-website", "campaign-engine"],
    tone: "fawn",
    image: { src: "/assets/img/screens/dcse-home-sm.webp", alt: "DCSE Associates homepage" },
  },
  {
    title: "Process & SOP design",
    body: "Turning what one person knows into something the whole team can run. Written down, sequenced and owned.",
    proof: ["arc-intake", "gbi-buildertrend", "bdr-portal"],
    tone: "dark",
    stat: { value: "17", label: "steps in one documented intake chain" },
  },
  {
    title: "Marketing operations",
    body: "Editorial programmes that hold their cadence, landing pages that convert, and the collateral a campaign needs before it can run.",
    proof: ["content-programme", "campaign-engine"],
    tone: "dark",
    stat: { value: "24", label: "articles published in eight months" },
  },
];

export type Role = { org: string; title: string; group: string; summary: string; detail?: string };

// Order agreed with Rafael: Lively first, ARC second. No dates, no "present".
export const roles: Role[] = [
  {
    org: "Lively",
    title: "Operations & internal tooling",
    group: "Operations",
    summary:
      "Built the agency's client reporting platform and its companion intake portal, plus a sales onboarding portal for new starters. Replaced a manual monthly reporting cycle with software that collects the numbers, drafts the narrative, renders the PDF and sends it.",
  },
  {
    org: "ARC IP Law, PC",
    title: "Client Coordinator & Executive Assistant",
    group: "Operations",
    summary:
      "Supporting the principal attorney while owning client experience, executive operations and legal administrative workflow. I was the coordination point between attorneys, clients, vendors and outside providers, which in practice meant making sure matters kept moving and leadership stayed on the work only they could do.",
    detail:
      "Client intake and onboarding end to end: engagement letters, retainers, payments and documentation, plus the follow-up tracking that stops matters stalling. Matter administration across Clio Grow and Clio Manage. Standardised procedures for trademarks, patents, business matters and litigation support. AI-assisted workflows for inbox review, reporting, research and drafting. Business development support covering networking, referral tracking, prospect research and LinkedIn content.",
  },
  {
    org: "Par Corp",
    title: "Construction Manager",
    group: "Construction",
    summary:
      "Ten concurrent construction projects across the Los Angeles area. Coordinated daily with project managers and on-site supervisors: tracking progress against schedule, sequencing trades across sites and resolving site issues as they arose. Owned materials procurement end to end, from sourcing and quoting to purchase orders and delivery timing against site readiness, so no crew sat waiting on materials.",
  },
  {
    org: "Grace Built Inc",
    title: "Construction Project Coordinator",
    group: "Construction",
    summary:
      "Planning, organising and executing residential construction projects. Coordinated contractors, vendors and internal teams; tracked progress and maintained documentation. Standardised estimating and allowance setup in Buildertrend and organised compliance documentation so nothing lapsed unnoticed.",
  },
  {
    org: "Amazon Operations Services",
    title: "Customer Service L3",
    group: "Customer operations",
    summary:
      "Escalation-tier support across phone, email and chat. Where I learned that most recurring problems are process problems wearing a customer's clothes.",
  },
  {
    org: "Digital Forensics Corp",
    title: "Assistant Manager",
    group: "Customer operations",
    summary: "Administrative management for the customer service department: reporting, records and budget management.",
  },
];

/** Groups in display order, for the homepage experience columns. */
export const roleGroups = ["Operations", "Construction", "Customer operations"].map((group) => ({
  group,
  roles: roles.filter((r) => r.group === group),
}));

// Pull-quotes: word-for-word excerpts from the full recommendations, kept to a glance.
export const testimonials = [
  {
    quote:
      "He is incredibly detail oriented, and his ability to keep Buildertrend organized is unmatched. He takes the time to learn anything needed, no matter how complex.",
    name: "Ali Montano",
    org: "Grace Built Inc",
  },
  {
    quote:
      "Rafael could be trusted to handle responsibilities independently while maintaining accuracy and professionalism.",
    name: "Chris P",
    org: "Digital Forensics Corp",
  },
  {
    quote:
      "Rafael was highly organized and dependable in managing multiple construction projects across Los Angeles.",
    name: "David Partiyeli",
    org: "Par Corp",
  },
];

export const toolGroups = [
  { label: "Legal & practice", items: ["Clio Manage", "Clio Grow", "DocuSign", "LawPay"] },
  {
    label: "Operations & CRM",
    items: ["GoHighLevel", "Zoho CRM", "HubSpot", "Buildertrend", "ClickUp", "Asana", "Notion", "RingCentral"],
  },
  {
    label: "Build",
    items: ["Next.js", "TypeScript", "React", "Node", "GSAP", "Motion", "Three.js", "Vercel", "Netlify", "n8n", "Claude API"],
  },
  { label: "Everyday", items: ["Microsoft 365", "Google Workspace", "Slack", "Teams", "Dropbox", "Canva"] },
];
