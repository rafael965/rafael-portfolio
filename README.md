# rafael-portfolio

Personal portfolio site for Rafael Reyes — Operations Manager & AI Systems Builder.
Live at **https://rafaelreyes.dev**.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Motion is GSAP
(ScrollTrigger, SplitText), Lenis smooth scrolling and Motion for React. Every page is
statically prerendered; the only server code is the kit signup route.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

---

## 1. Layout

```
app/                    routes: / about resources work/[slug] api/subscribe,
                        sitemap.ts, robots.ts, template.tsx (page transition), not-found
content/site.ts         ALL non-case content: nav, services, roles, testimonials, tools
content/cases.json      the ten case studies (body is HTML, rendered on paper)
content/cases.ts        types, homepage card copy, helpers
components/home/        homepage sections (Hero + Showreel, FeaturedStack, bento Services, ...)
components/motion/      SmoothScroll, SplitReveal, Reveal, ImageReveal, Magnetic,
                        ScrollWords, StrokeText, LogoLoop
components/layout/      Nav, Footer (the footer is the #contact section on every page)
public/                 images, favicons, the kit PDF — paths unchanged from the static site
mockups/                SOURCE for generated images — not part of the published site
kit/                    SOURCE for the Operations Runbook Kit PDF
```

`StrokeText` (the hero name) and `LogoLoop` (the toolkit marquee) are adapted from
[React Bits](https://reactbits.dev). Changes are noted at the top of each file.

## 2. Editing

- **A case study:** edit its entry in `content/cases.json`. Order in the file is order on
  the homepage; the first four are featured. Card copy and tags live in `cards` in
  `content/cases.ts`. A new case also needs its slug added to a service's `proof` list in
  `content/site.ts` if it is evidence for one.
- **Images:** WebP pairs in `public/assets/img/screens/` — `name.webp` (1200–1440px) and
  `name-sm.webp` (600–720px). Screenshots sit in a browser frame; the address shown is the
  live host, or `url` on the image entry, or an "illustrative" label.
- **Services, roles, testimonials, tools:** `content/site.ts`.

## 3. Design tokens

Palette: Onyx `#121619`, Pine Teal `#2D4739`, Sea Green `#09814A`, Dry Sage `#BCB382`,
Soft Fawn `#E5C687`, plus derived neutrals (paper `#F3ECDD`, paper-2, onyx-2, graphite,
dim). All defined in `app/globals.css` under `@theme`.

### The one rule that matters

**Sea green is a fill, never body text.** It measures 3.68:1 on onyx and 4.20:1 on paper —
both fail AA for normal text. Buttons use white text on sea green (4.94:1).

```
on dark:  paper 15.5   fawn 11.1   sage 8.6   dim 6.2
on light: onyx 15.5    pine 8.6    graphite 5.5
on pine:  paper 8.6    fawn 6.2    sage 4.8
```

Sage and fawn on paper are decorative only (1.8:1, 1.4:1).

### House style (anti-template rules)

- **One display face.** Archivo, with its own italic for emphasis inside headlines
  (`t-accent`). No serif accent words.
- **No em or en dashes** anywhere visible: commas, colons, periods, parentheses. Hyphens
  for ranges ("3-4").
- **No numbered section labels**, scroll cues, decorative grid lines, status dots, custom
  cursor or "Fig." captions. Headings carry sections on their own.
- **Shape:** containers, cards and media are `rounded-2xl`; anything clickable is a pill.
- **One label per intent:** contact is always "Let's talk", the work is always "View work".
- **The site is dark** by brand choice. A page may switch to paper once, for long reading
  (case-study bodies, the About story).
- **Testimonials are word-for-word excerpts**, three lines at most.

## 4. No client data

The Lively dashboard and sales portal, ARC (intake, calendar, content) and Grace Built
images are **illustrations built for this site**, with invented names and figures. Their
browser frames say "Illustrative interface, no client data", and the footer says so too.

The real screenshots contained a law firm's conversion rate, a construction project's
location and named staff, and an executive calendar carrying privileged matter subjects
and live meeting links. None of that belongs on a public page.

The content-programme case carries **no engagement metrics** — the analytics belonged to
the firm's principal. The DCSE, Lively website and Camp images are genuine screenshots of
marketing sites with nothing private on them.

**Keep it that way.** Check any real screenshot at full resolution for names, addresses,
figures and third parties before it goes in.

DCSE links to its staging preview until the firm approves launch; update `live` on the
`dcse-website` entry when the real domain is up. The Lively website has no public link
until it launches.

## 5. Availability

The site carries no "available for work" signal, and no role shows as current — no dates,
no "present". Keep it that way unless that changes.

## 6. Kit signup

`app/api/subscribe/route.ts` emails the kit through Resend. It needs `RESEND_API_KEY` in
the Vercel project's environment variables; without it the form reports that email is not
configured. The PDF lives at `/downloads/operations-runbook-kit.pdf` — that URL is in emails
already sent, so it must not move.

## 7. URLs

`next.config.ts` permanently redirects every URL from the static site: `*.html` pages to
their clean paths, and the five former Camp case studies to `/work/campaign-engine`.

## 8. Social card and favicon

Rendered from `mockups/og.html` and `mockups/favicon.html` with headless Chrome:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --virtual-time-budget=6000 \
  --window-size=1200,630 --screenshot=public/assets/img/og.png "file://$PWD/mockups/og.html"
```

LinkedIn caches the card; refresh it with the Post Inspector after changing it.

## 9. Motion and accessibility

Every effect respects `prefers-reduced-motion`: reveals render in place, the name is drawn
already filled, Lenis is off, the hero reel holds on its first slide, the work stack keeps its
sticky layout without the scale/dim, and the toolkit marquee stops and wraps instead of looping. Vercel Web Analytics is included via
`@vercel/analytics`.
