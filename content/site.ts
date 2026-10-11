// Everything on the site that is not a case study. Case studies live in cases.json.

export const site = {
  name: "Rafael Reyes",
  role: "Operations Manager & AI Systems Builder",
  url: "https://rafaelreyes.dev",
  email: "hello@rafaelreyes.dev",
  linkedin: "https://www.linkedin.com/in/reyesralf17",
  resume: "https://drive.google.com/file/d/1HjKzQR7-CzYpcu2JTC6ixwIcjOjyoJ0V/view?usp=sharing",
  description:
    "Operations manager who builds the systems he runs — internal tools, AI agents, websites and the SOPs behind them. Nine years across legal, construction, marketing and customer operations.",
  tagline: "Building the systems I run.",
};

export const nav = [
  { label: "Work", href: "/#work", count: "10" },
  { label: "Services", href: "/#services", count: "06" },
  { label: "Experience", href: "/#experience", count: "06" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export const heroSpecs = [
  { k: "Discipline", v: "Operations & internal tooling" },
  { k: "Builds", v: "Tools · Agents · Websites" },
  { k: "Sectors", v: "Legal · Construction · Marketing" },
  { k: "Experience", v: "9 years" },
];

export const stats = [
  { value: 9, label: "Years in operations" },
  { value: 6, label: "Organisations" },
  { value: 5, label: "AI agents designed & built" },
  { value: 24, label: "Articles published in 8 months" },
];

export type Service = {
  title: string;
  body: string;
  points: string[];
  proof: string[]; // case-study slugs
};

export const services: Service[] = [
  {
    title: "Operations management",
    body: "Owning the day-to-day so leadership doesn't have to. Scheduling, inbox triage, client coordination, vendor management, and the follow-up that stops work stalling between people.",
    points: [
      "Executive calendar and inbox",
      "Client intake and onboarding",
      "Vendor and contractor coordination",
      "Reporting that leadership actually reads",
    ],
    proof: ["exec-calendar", "arc-intake", "gbi-buildertrend"],
  },
  {
    title: "Internal tools & dashboards",
    body: "When the spreadsheet stops coping, I build the thing that replaces it — authenticated, deployed, and simple enough that the team adopts it without a training session.",
    points: [
      "Reporting dashboards and client portals",
      "Structured intake and data collection",
      "Automated PDF and email delivery",
      "Next.js, TypeScript, Vercel",
    ],
    proof: ["lively-dashboard", "bdr-portal"],
  },
  {
    title: "AI agents & automation",
    body: "Applied where it removes real work, not where it demos well. Agents with written boundaries, and reusable workflows for triage, drafting, research and reporting the team can rely on.",
    points: [
      "Role-scoped AI agents with routing rules",
      "Inbox review and prioritisation",
      "Report and summary generation",
      "CRM and follow-up automation",
    ],
    proof: ["agent-system", "lively-dashboard"],
  },
  {
    title: "Websites & digital experiences",
    body: "Marketing sites built like products — structure, copy and motion that earn trust before a sales call does. Designed and engineered end to end, then handed over with content the team can edit.",
    points: [
      "Brand-led marketing websites",
      "Motion and interaction design",
      "Content audits and information architecture",
      "SEO, performance and accessibility",
    ],
    proof: ["dcse-website", "lively-website", "campaign-engine"],
  },
  {
    title: "Process & SOP design",
    body: "Turning what one person knows into something the whole team can run. Written down, sequenced, and owned — the difference between a business that scales and one that depends on you.",
    points: [
      "Runbooks, checklists and templates",
      "Handoffs and ownership mapping",
      "Onboarding documentation and curricula",
      "Bottleneck analysis",
    ],
    proof: ["arc-intake", "gbi-buildertrend", "bdr-portal"],
  },
  {
    title: "Marketing operations",
    body: "The outward-facing half. Editorial programmes that hold their cadence, landing pages that convert, and the unglamorous collateral a campaign needs before it can actually run.",
    points: [
      "Editorial calendars and ghostwriting",
      "Landing pages and booking funnels",
      "Campaign collateral, print and QR",
      "Publication cadence and performance reporting",
    ],
    proof: ["content-programme", "campaign-engine"],
  },
];

export type Role = { org: string; title: string; summary: string; detail?: string };

// Order agreed with Rafael: Lively first, ARC second. No dates, no "present".
export const roles: Role[] = [
  {
    org: "Lively",
    title: "Operations & internal tooling",
    summary:
      "Built the agency's client reporting platform and its companion intake portal, plus a sales onboarding portal for new starters. Replaced a manual monthly reporting cycle with software that collects the numbers, drafts the narrative, renders the PDF and sends it.",
  },
  {
    org: "ARC IP Law, PC",
    title: "Client Coordinator & Executive Assistant",
    summary:
      "Supporting the principal attorney while owning client experience, executive operations and legal administrative workflow. I was the coordination point between attorneys, clients, vendors and outside providers — which in practice meant making sure matters kept moving and leadership stayed on the work only they could do.",
    detail:
      "Client intake and onboarding end to end: engagement letters, retainers, payments and documentation, plus the follow-up tracking that stops matters stalling. Matter administration across Clio Grow and Clio Manage. Standardised procedures for trademarks, patents, business matters and litigation support. AI-assisted workflows for inbox review, reporting, research and drafting. Business development support covering networking, referral tracking, prospect research and LinkedIn content.",
  },
  {
    org: "Par Corp",
    title: "Construction Manager",
    summary:
      "Ten concurrent construction projects across the Los Angeles area. Coordinated daily with project managers and on-site supervisors — tracking progress against schedule, sequencing trades across sites and resolving site issues as they arose. Owned materials procurement end to end: sourcing, quoting, purchase orders and delivery timing against site readiness, so no crew sat waiting on materials.",
  },
  {
    org: "Grace Built Inc",
    title: "Construction Project Coordinator",
    summary:
      "Planning, organising and executing residential construction projects. Coordinated contractors, vendors and internal teams; tracked progress and maintained documentation. Standardised estimating and allowance setup in Buildertrend and organised compliance documentation so nothing lapsed unnoticed.",
  },
  {
    org: "Amazon Operations Services",
    title: "Customer Service L3",
    summary:
      "Escalation-tier support across phone, email and chat. Where I learned that most recurring problems are process problems wearing a customer's clothes.",
  },
  {
    org: "Digital Forensics Corp",
    title: "Assistant Manager",
    summary: "Administrative management for the customer service department — reporting, records and budget management.",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Rafael has been an absolute joy. He is incredibly detail oriented, and his ability to keep Buildertrend organized is unmatched — he cleans up jobs, streamlines information, and makes the CRM look spotless. He takes the time to learn anything needed, no matter how complex, and brings a positive, reliable energy to every project.",
    name: "Ali Montano",
    org: "Grace Built Inc",
  },
  {
    quote:
      "Rafael was a dependable and highly organized member of our team. He effectively managed key administrative functions for the customer service department, including reporting, records management, and budget tracking. He was proactive, detail-oriented, and consistently helped keep departmental operations organized and running efficiently. Rafael could be trusted to handle responsibilities independently while maintaining accuracy and professionalism.",
    name: "Chris P",
    org: "Digital Forensics Corp",
  },
  {
    quote:
      "Rafael was highly organized and dependable in managing multiple construction projects across Los Angeles. He kept projects moving by coordinating teams, materials, subcontractors, schedules, and reporting while identifying issues early and resolving them quickly.",
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
