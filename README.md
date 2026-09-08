# rafael-portfolio

Personal portfolio site for Rafael Reyes — Operations Manager & AI Systems Builder.

Plain HTML, CSS and JavaScript. **No build step, no dependencies, no framework.**
Open `index.html` in a browser and it works.

---

## 1. Layout

```
index.html            Home — hero, work, services, experience, testimonials, contact
about.html            Full background, roles, education, tooling
work/*.html           Six case studies
assets/css/           tokens.css (design tokens) · base.css (chrome) · home.css · case.css
assets/js/main.js     Nav, scroll reveals, accordion. ~3 KB, no libraries.
assets/img/           Portrait, social card
assets/img/screens/   Case study imagery (WebP, 1200px + 600px)
mockups/              SOURCE for generated images — not part of the published site
```

`mockups/` is tooling, not content. It holds the HTML used to render the dashboard
images and the social card, plus `build_cases.py`. You can delete it from a deploy;
keep it in the repo so the images can be regenerated.

## 2. Editing

Everything is hand-editable HTML. The one exception is the case studies.

**Case studies are generated.** Content lives in the `CASES` list in
`mockups/build_cases.py`, which also holds the shared nav and footer. Edit there,
then regenerate from the project root:

```bash
python3 mockups/build_cases.py
```

Editing `work/*.html` directly works, but the next run of that script overwrites it.

## 3. Design tokens

All colour and type lives in `assets/css/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1f2421` | Body text, dark sections, footer |
| `--teal` | `#216869` | Eyebrows, links, section numbers on light |
| `--green` | `#49a078` | Accent — see the rule below |
| `--sage` | `#9cc5a1` | Body text on dark sections |
| `--paper` | `#dce1de` | Page ground |

### The one rule that matters

**`--green` on `--paper` measures 2.41:1 and fails WCAG AA.**

On the light ground, green is a **fill only** — button backgrounds with `--ink` text on
top, the status dot, underline bars. Never green text, and never a green glyph, on
`--paper` or `--card`. Use `--teal` there (4.88:1).

On dark sections green is fine as text (4.94:1 against `--ink`).

Every other pair in the system passes AA:

```
ink/paper 11.91   ink/card 14.36   mute/paper 5.80   mute/card 7.00
teal/paper 4.88   teal/card 5.89   sage/ink  8.19    green/ink 4.94
```

## 4. Images

Case study imagery is WebP at 1200px and 600px. To regenerate:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --virtual-time-budget=7000 \
  --window-size=1280,720 --screenshot=out.png \
  "file://$PWD/mockups/arc-intake.html"
```

Then downscale to WebP (quality 84). Heights differ per mockup — measure the content
rather than guessing, or the image gets dead space at the bottom.

### No client data

The Lively, ARC (intake and calendar) and Grace Built images are **illustrations built
for this site**, using invented names and figures. They are labelled as such in the interface itself, in each
case study, and in the site footer.

This was deliberate. The real screenshots contained a law firm's conversion rate; a
construction project's location, named staff and payment activity; and an executive
calendar carrying litigation deadlines, privileged matter subjects, matter numbers,
live meeting links and colleagues' vacation dates. None of that belongs on a public
page, and the calendar in particular could not have been safely redacted — nearly every
block held something identifying. The Camp images are genuine, because those are public
marketing pages with nothing private on them.

**Keep it that way.** If you swap in a real screenshot, check it at full resolution for
names, addresses, figures and third parties first.

## 5. Analytics

Vercel Web Analytics, added as one tag on every page:

```html
<script defer src="/_vercel/insights/script.js"></script>
```

**It only reports once enabled in the dashboard** — Vercel project →
Analytics → Enable. The script is served by Vercel at that path at runtime;
there is no package to install and nothing to configure in the code.

Cookieless, so no consent banner is required. The path 404s when you open the
files locally, which is harmless — the tag is deferred and nothing else depends
on it.

To add Speed Insights later, the same pattern applies with
`/_vercel/speed-insights/script.js`.

## 6. Deploying

Static — any host works. Drag the folder into Netlify, or:

```bash
npx vercel --prod
```

Live at **https://rafael-portfolio-sable.vercel.app**

The domain appears in four places. Change all of them together when it moves:

- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — every `<loc>`
- `index.html` and `about.html` — `og:image` and `og:url`
- `mockups/build_cases.py` — the `og:image` in the page template

```bash
OLD=rafael-portfolio-sable.vercel.app; NEW=your-domain.com
grep -rl "$OLD" --include=*.html --include=*.xml --include=*.txt --include=*.py . \
  | xargs sed -i '' "s|$OLD|$NEW|g"
python3 mockups/build_cases.py
```

## 7. Browser support

Modern evergreen browsers. Uses `:has()`-free CSS, CSS nesting-free syntax, WebP,
`overflow: clip`, `inert`, and `IntersectionObserver`. Reduced motion is respected —
all animation is disabled under `prefers-reduced-motion: reduce`.
