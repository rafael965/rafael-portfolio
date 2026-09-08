#!/usr/bin/env python3
"""Generates work/*.html. Run from the project root: python3 mockups/build_cases.py"""
import pathlib, html

NAV = '''<nav class="nav" data-open="false">
  <div class="nav__in">
    <a class="nav__mark" href="../index.html">RR<span>.</span></a>
    <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="menu">
      <svg width="22" height="16" viewBox="0 0 22 16"><rect y="1" width="22" height="2"/><rect y="7" width="22" height="2"/><rect y="13" width="22" height="2"/></svg>
    </button>
    <div class="nav__links" id="menu">
      <a class="nav__link" href="../index.html#work">Work</a>
      <a class="nav__link" href="../index.html#services">Services</a>
      <a class="nav__link" href="../index.html#experience">Experience</a>
      <a class="nav__link" href="../about.html">About</a>
      <a class="nav__link" href="../index.html#contact">Contact</a>
    </div>
    <a class="btn btn--ink nav__cta" href="../index.html#contact">Let's talk <span class="btn__arw">&#8599;</span></a>
  </div>
</nav>'''

FOOT = '''<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <div class="nav__mark" style="font-size:1.4rem;margin-bottom:.75rem">Rafael Reyes<span style="color:var(--green)">.</span></div>
        <p class="mute" style="max-width:34ch">Operations Manager &amp; AI Systems Builder. Building the systems I run.</p>
      </div>
      <div>
        <div class="foot__h mono">Site</div>
        <ul class="foot__list">
          <li><a href="../index.html#work">Work</a></li>
          <li><a href="../index.html#services">Services</a></li>
          <li><a href="../index.html#experience">Experience</a></li>
          <li><a href="../about.html">About</a></li>
        </ul>
      </div>
      <div>
        <div class="foot__h mono">Elsewhere</div>
        <ul class="foot__list">
          <li><a href="mailto:Reyesralf17@gmail.com">Email</a></li>
          <li><a href="https://www.linkedin.com/in/yourtop1va-rafaelreyes" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://bit.ly/3Xg4aam" target="_blank" rel="noopener">R&eacute;sum&eacute;</a></li>
        </ul>
      </div>
    </div>
    <div class="foot__bar mono">
      <span>&copy; 2026 Rafael Reyes</span>
      <span>Interface images are illustrative &mdash; no client data</span>
    </div>
  </div>
</footer>'''

PAGE = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Rafael Reyes</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title} — Rafael Reyes">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://rafaelreyes.dev/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://rafaelreyes.dev/work/{slug}.html">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/base.css">
<link rel="stylesheet" href="../assets/css/case.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
{nav}
<main id="main" class="wrap">
  <a class="back" href="../index.html#work"><span aria-hidden="true">&larr;</span> All work</a>

  <header class="chead">
    <span class="chead__eyebrow mono">{eyebrow}</span>
    <h1 class="chead__title">{title}</h1>
    <p class="lead chead__lede">{lede}</p>
  </header>

  <div class="cmeta">{meta}</div>

  <figure class="shot">
    <img src="../assets/img/screens/{img}" srcset="../assets/img/screens/{img_sm} 600w, ../assets/img/screens/{img} 1200w" sizes="(max-width: 48rem) 100vw, 50vw" alt="{alt}" width="1200" height="{imgh}">
    <figcaption>{caption}</figcaption>
  </figure>

  <article class="prose">
{body}
  </article>

  <div class="nextup">
    <a href="{next_href}">
      <span class="nextup__k mono">Next case</span>
      <span class="nextup__t">{next_title} <span aria-hidden="true">&#8599;</span></span>
    </a>
  </div>
</main>
{foot}
<script src="../assets/js/main.js" defer></script>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
'''

def meta_cells(pairs):
    return "".join(
        f'<div class="cmeta__c"><span class="cmeta__k mono">{k}</span>'
        f'<span class="cmeta__v">{v}</span></div>' for k, v in pairs)

CASES = [
{
 "slug":"arc-intake",
 "title":"The intake system that runs itself",
 "eyebrow":"ARC IP Law, PC &middot; Legal operations",
 "desc":"A seventeen-step client intake and onboarding chain for an IP law firm, documented and delegable.",
 "lede":"A law firm loses money in the gap between “someone enquired” and “the matter is open.” "
        "I closed that gap by writing the whole thing down and wiring the tools together.",
 "img":"arc-intake.webp","imgh":"675",
 "alt":"Illustrative intake console showing pipeline stages and an onboarding runbook",
 "caption":"Illustrative interface &mdash; sample data, no client information",
 "meta":[("Role","Client Coordinator &amp; EA"),("Discipline","Legal operations"),
         ("Stack","Clio, DocuSign, LawPay, Dropbox"),("Sector","Intellectual property")],
 "body":"""<h2>The problem</h2>
<p>Intake at a small firm is deceptively hard. A prospective client emails, calls, or arrives
through a referral. Somebody books a consultation. Somebody else drafts an engagement letter.
A retainer needs collecting, a conflicts check needs running, an entity needs verifying with the
Secretary of State, and a matter needs opening in a different system than the one the enquiry
arrived in.</p>
<p>None of that is difficult. All of it is forgettable. And when a step is forgotten, the failure
is silent — the enquiry simply goes quiet, and nobody notices until the month-end review asks
why the pipeline looks thin.</p>
<p>The firm had capable people. What it did not have was a written answer to
<strong>“what happens next, and who does it.”</strong></p>

<h2>What I built</h2>
<p>A single onboarding chain covering every step from first contact to an open, funded matter —
sequenced, owned, and documented well enough that someone who had never done it could run it
correctly on their first attempt.</p>
<ol class="chain">
  <li><span class="n">01</span><span>Create the matter and log the enquiry source</span></li>
  <li><span class="n">02</span><span>Provision the client folder against a fixed structure</span></li>
  <li><span class="n">03</span><span>Send the intake form and record what came back</span></li>
  <li><span class="n">04</span><span>Verify the entity where the client is a company</span></li>
  <li><span class="n">05</span><span>Prepare the engagement letter and disclosures</span></li>
  <li><span class="n">06</span><span>Route to the assigned attorney for review</span></li>
  <li><span class="n">07</span><span>Send for signature and track the retainer</span></li>
  <li><span class="n">08</span><span>File executed documents back to the client folder</span></li>
  <li><span class="n">09</span><span>Convert the record into an active matter</span></li>
  <li><span class="n">10</span><span>Trigger the welcome sequence and first follow-up task</span></li>
</ol>
<p>Seventeen steps in total. Each one names the tool, the owner, and the trigger for the step
after it — so the process moves without anyone holding the whole thing in their head.</p>

<h2>How it holds together</h2>
<p>The chain spans four systems that do not natively talk to each other, so the documentation
<em>is</em> the integration. Clio Grow holds the enquiry, Clio Manage holds the matter, DocuSign
carries the signature, LawPay carries the retainer, and Dropbox holds the file. The runbook
defines the handoff at every boundary, including what “done” looks like before the next step
is allowed to start.</p>
<p>Around it sits a set of companion procedures for the work that recurs: inbox triage rules that
sort what needs an attorney's judgement from what needs an assistant's, continuing-education
compliance tracking, and expense entry against the right matter.</p>

<h2>Where AI actually helps</h2>
<p>I use it where it removes genuine work rather than where it demonstrates well. Reviewing an
executive inbox and surfacing what needs a decision. Turning a long thread into a short summary
with the action items pulled out. Drafting the routine correspondence that follows a predictable
shape. Researching a prospective client or organisation ahead of a meeting.</p>
<p>The pattern that made these stick was writing them as reusable workflows rather than one-off
prompts — so the output is consistent enough to trust, and someone other than me can run them.</p>

<h2>What changed</h2>
<p>The measurable part is not speed, it is <strong>survivability</strong>. Before, the process
lived in the head of whoever had done it last. Now it exists as a document, which means it can be
delegated, audited, improved, and handed to a new starter.</p>
<p>The follow-up tracking is the part I would keep if I could only keep one thing. Enquiries do
not stall silently any more, because “waiting on the client” is a state the system knows about
rather than something a person has to remember.</p>
<div class="note-box"><p>The interface above is an illustration built for this portfolio. It shows
the shape of the work, not the firm's data — no client information appears anywhere on this site.</p></div>""",
},
{
 "slug":"exec-calendar",
 "title":"Running a principal's calendar",
 "eyebrow":"ARC IP Law, PC &middot; Executive operations",
 "desc":"Weekly calendar structure for a law firm's principal attorney — protected time, prep buffers, team availability and deadline visibility.",
 "lede":"An attorney's calendar is the constraint the whole firm runs against. Left to fill "
        "itself, it fills with other people's priorities.",
 "img":"calendar.webp","imgh":"693",
 "alt":"Illustrative weekly calendar showing protected blocks, buffers, team availability and a deadline",
 "caption":"Illustrative interface &mdash; sample data, no client, matter or personal information",
 "meta":[("Role","Executive Assistant"),("Discipline","Calendar &amp; inbox"),
         ("Tools","Outlook, Teams, Zoom"),("Cadence","Weekly")],
 "body":"""<h2>The problem</h2>
<p>A principal attorney's week is contested by everyone at once. Client consultations, internal
reviews, networking commitments, vendor calls, filing deadlines, and a steady background of people
who need ten minutes. Every one of those requests is reasonable in isolation.</p>
<p>Left to arrive first-come, the calendar fills with whatever was asked for earliest rather than
whatever matters most. The predictable results: no gap between a meeting across town and the one
after it, administrative work pushed to the evening because the day had no room for it, and a
double-booking nobody notices until someone is already waiting.</p>
<p>The failure is rarely a missed meeting. It is that the highest-value work &mdash; the work only
the attorney can do &mdash; gets whatever is left over.</p>

<h2>How I structure the week</h2>
<p>The calendar is treated as a budget rather than a queue. Some of it is spent before anyone gets
to ask.</p>
<ul>
  <li><strong>Protected blocks.</strong> Recurring, defended time for inbox triage, invoicing and
      matter administration. Booked like a meeting, because time that is not on the calendar is
      time other people assume is free.</li>
  <li><strong>Buffers.</strong> Prep and travel sit on the calendar as their own entries before
      anything external. A one o'clock across town starts at twelve-fifteen.</li>
  <li><strong>Categories.</strong> Client, internal, networking, protected and buffer are visually
      distinct, so a glance answers &ldquo;what kind of week is this&rdquo; without reading a
      single title.</li>
  <li><strong>Availability bands.</strong> Who is out, who is remote, who is working several hours
      ahead &mdash; across the top, where it informs scheduling instead of being discovered
      afterwards.</li>
  <li><strong>Deadlines as fixtures.</strong> Filing and response dates sit in the all-day row from
      the moment they are known, so the days before them are visibly spoken for.</li>
</ul>

<h2>The judgement part</h2>
<p>Structure handles the routine. The rest is triage, and it is the part that cannot be automated.</p>
<p>When two things collide, someone has to weigh which moves &mdash; against travel feasibility,
who else is affected, whether the other party can reasonably be rescheduled, and what it costs the
relationship. I make that call and present a recommendation rather than handing over a conflict.</p>
<p>The same applies to the inbox. Most of what arrives needs an answer, a delegation or a diary
entry; only a fraction genuinely needs the principal's judgement. Sorting those is the job.</p>

<h2>Why it holds</h2>
<p>Because the rules are written down rather than held in my head. The categories, the buffer
conventions, what gets protected and what may be moved &mdash; documented alongside the firm's
other procedures, so someone covering for me schedules the week the way I would.</p>
<p>That is the same test I apply to everything else here. A calendar only I can run is not a
system, it is a dependency.</p>
<div class="note-box"><p>The calendar above is an illustration built for this portfolio. Every
name, meeting and deadline is invented &mdash; no client, matter or personal information from any
firm appears anywhere on this site.</p></div>""",
},
{
 "slug":"content-programme",
 "title":"The firm's LinkedIn content programme",
 "eyebrow":"ARC IP Law, PC &middot; Business development",
 "desc":"An editorial programme for an IP law firm — twenty-four articles across eight months on AI and intellectual property, written, produced and published to a held cadence.",
 "lede":"Every professional services firm knows it should be publishing. Almost none of them "
        "do it consistently, and the reason is always the same: it depends on the busiest person.",
 "img":"content-pipeline.webp","imgh":"778",
 "alt":"Illustrative editorial pipeline showing an article calendar, production run and topic mix",
 "caption":"Illustrative interface &mdash; no performance data, no personal information",
 "meta":[("Role","Content &amp; BD support"),("Output","24 articles, 8 months"),
         ("Beat","AI &amp; intellectual property"),("Cadence","3&ndash;4 per month")],
 "body":"""<h2>The problem</h2>
<p>Thought leadership at a small firm fails in a predictable way. Someone decides the firm should
be visible. Three good posts go out in a fortnight. Then a filing deadline lands, and nothing
appears for two months.</p>
<p>Sporadic publishing is close to worthless, because none of it compounds. The audience never
forms a habit, the firm never builds a beat it is known for, and the effort already spent is
wasted rather than banked.</p>
<p>The bottleneck is never ideas. It is that drafting depends on the person with the least
available time &mdash; the attorney whose expertise makes the writing worth reading.</p>

<h2>What I do</h2>
<p>I run the programme end to end so the attorney's involvement is concentrated where only they
can contribute: reviewing for accuracy and positioning.</p>
<ul>
  <li><strong>Topic selection against the news.</strong> An editorial calendar tracking rulings,
      agency guidance and disputes as they land, filtered to what the firm's clients would
      actually act on.</li>
  <li><strong>Drafting.</strong> Each article written to a consistent shape &mdash; what happened,
      why it matters commercially, what a business should do about it.</li>
  <li><strong>Attorney review.</strong> The one step that cannot be delegated, and the reason the
      rest is worth delegating.</li>
  <li><strong>Production.</strong> A matched banner graphic per article, so the feed presence is
      recognisable rather than incidental.</li>
  <li><strong>Publication and reporting.</strong> Scheduled to hold the cadence, with performance
      rolled into the monthly summary to leadership.</li>
</ul>

<h2>Choosing the beat</h2>
<p>The programme concentrated on <strong>artificial intelligence and intellectual property</strong>,
and that focus is what made it work.</p>
<p>It is where the firm's clients have live, unresolved questions, and where the law is moving fast
enough that timely commentary has genuine value. It also rewards consistency: a reader who wants to
understand how AI is reshaping IP risk has a reason to come back, which a general-interest legal
feed never earns.</p>
<p>Pieces covered privilege over AI-generated documents, trade secret contamination between
competitors, chain-of-title problems in training data, copyright exposure surfacing in discovery,
and the shifting IP landscape in China &mdash; alongside the foundational trademark material a
prospective client searches for.</p>

<h2>Selected writing</h2>
<p>Openings from three pieces, chosen for range rather than performance. Each was written for the
firm and published under its byline &mdash; these are excerpts shown as writing samples, not
republished articles.</p>

<div class="samples">

  <article class="sample">
    <div class="sample__m"><span class="sample__d mono">August 2026</span><span class="tag">AI &amp; trade secrets</span></div>
    <h3 class="sample__t">Apple v. OpenAI Is a Warning Shot on Trade Secret Contamination</h3>
    <div class="sample__x">
      <p>On July 10, 2026, Apple filed a trade-secret and breach-of-contract lawsuit in the Northern
      District of California against OpenAI, two former employees, and related entities tied to
      OpenAI&rsquo;s hardware push. The case is at an early stage, and the allegations remain
      allegations. But for business leaders, that does not mean the dispute is only interesting if
      Apple ultimately wins.</p>
      <p>What makes this filing important is the type of IP risk it highlights. For the last several
      years, AI legal commentary has focused heavily on copyright, training data, and model outputs.
      Those issues still matter. But the Apple complaint is a reminder that the next major AI IP
      problem for some companies may look less like a copyright theory and more like trade secret
      contamination.</p>
    </div>
    <div class="sample__by mono">Written for ARC IP Law, PC &middot; published under the firm&rsquo;s byline</div>
  </article>

  <article class="sample">
    <div class="sample__m"><span class="sample__d mono">March 2026</span><span class="tag">Privilege &amp; AI</span></div>
    <h3 class="sample__t">AI-Created Documents Sent to Counsel Are Not Privileged, Federal Judge Rules</h3>
    <div class="sample__x">
      <p>A recent federal court decision from the Southern District of New York has delivered a clear
      message about the limits of attorney-client privilege in the age of artificial intelligence. In
      <em>United States v. Heppner</em>, a district court held that documents a client generated using
      a commercial AI tool and later shared with his attorneys were not protected by attorney-client
      privilege or the work-product doctrine.</p>
      <p>The case involved a financial services executive facing federal fraud charges who used an AI
      tool to create a series of documents related to his legal defense. Even though the client shared
      those materials with his lawyer, the court agreed with the government that privilege did not
      apply.</p>
    </div>
    <div class="sample__by mono">Written for ARC IP Law, PC &middot; published under the firm&rsquo;s byline</div>
  </article>

  <article class="sample">
    <div class="sample__m"><span class="sample__d mono">February 2026</span><span class="tag">Trademarks</span></div>
    <h3 class="sample__t">Why Trademark Clearance Should Happen Before You Launch</h3>
    <div class="sample__x">
      <p>Launching a new brand is exciting. You have invested time, money, and creativity into your
      name, logo, and messaging, and you are ready to go to market.</p>
      <p>But one of the most common &mdash; and costly &mdash; mistakes we see is skipping trademark
      clearance before launch. In today&rsquo;s fast-moving, digital-first environment, failing to
      clear a brand name early can expose businesses to unnecessary risk, expense, and disruption.</p>
    </div>
    <div class="sample__by mono">Written for ARC IP Law, PC &middot; published under the firm&rsquo;s byline</div>
  </article>

</div>

<h2>What made it hold</h2>
<p>Twenty-four articles between January and August, at three to four a month. The number matters
less than the fact that the cadence survived busy months, which is exactly where these programmes
normally die.</p>
<p>It survived because it stopped being a creative act performed when someone felt inspired and
became a production run with defined steps and a named owner at each one. Same path every time.
That is the whole trick, and it is the same one behind the intake system and the reporting
platform on this site.</p>
<div class="note-box"><p>The pipeline above is an illustration built for this portfolio. It shows
no performance figures and no personal data &mdash; audience and engagement metrics belong to the
firm and its people, not to a portfolio.</p></div>""",
},
{
 "slug":"lively-dashboard",
 "title":"Client reporting platform",
 "eyebrow":"Lively &middot; Client reporting",
 "desc":"A multi-tenant Next.js reporting platform that collects weekly client numbers, generates the monthly narrative, renders a PDF and emails it.",
 "lede":"Monthly client reporting was a manual assembly job that consumed the same days every "
        "month. I replaced the assembly line with software.",
 "img":"lively-dashboard.webp","imgh":"672",
 "alt":"Illustrative client reporting dashboard with KPI tiles, a trend chart and a generated summary",
 "caption":"Illustrative interface &mdash; sample data, no client information",
 "meta":[("Role","Builder"),("Stack","Next.js, TypeScript"),
         ("Services","Claude API, Sheets, Resend"),("Host","Vercel")],
 "body":"""<h2>The problem</h2>
<p>An agency reporting to a roster of clients every month does the same work repeatedly: chase
each account for their numbers, assemble them into a document, write a paragraph explaining what
the numbers mean, export it, and email it. Multiply by the client list and it consumes several
days of senior time every cycle — time that produces no new value, only the same value again.</p>
<p>Worse, the chasing is invisible work. Nobody sees the effort spent finding out that three
accounts have not submitted yet.</p>

<h2>What I built</h2>
<p>Two applications that operate as one system.</p>
<ul>
  <li><strong>An intake portal</strong> where each account submits their weekly and monthly
      figures through structured forms — separate flows for different service lines, plus
      financials and strategy inputs.</li>
  <li><strong>A reporting dashboard</strong> that reads what came in, tracks it against per-client
      goals, surfaces which accounts are healthy and which are drifting, generates the written
      summary, renders the report as a PDF, and sends it.</li>
</ul>
<p>Both sit behind one-time-passcode authentication with signed sessions, because the data is
commercially sensitive and the users are not technical.</p>

<h2>How it works</h2>
<p>Submissions land in a structured store the team can still inspect directly — deliberately, so
nobody is locked out of their own numbers by the tool meant to help them. The dashboard reads
against that, compares to goals, and derives the health signals.</p>
<p>The narrative summary is generated through the Claude API from the actual figures, then
reviewed before delivery. The report renders server-side to PDF and goes out through a
transactional email service. Reports can also be shared as tokenised links, so a client can open
one without needing an account.</p>
<p>Scheduled checks watch for the things that quietly go wrong — a missed submission, an invoice
past due, a month with no monthly report — and raise them rather than waiting for someone to
notice.</p>

<h2>Decisions worth defending</h2>
<p>The generated summary is <em>reviewed, never auto-sent.</em> The model is good at turning
numbers into readable prose and unreliable at knowing which omission matters. Keeping a human
approval step is what makes it usable for client-facing work.</p>
<p>Authentication is one-time passcode rather than passwords. For a small set of infrequent,
non-technical users, passwords generate support burden and get reused; a passcode to a known
address removes both problems.</p>

<h2>What changed</h2>
<p>The reporting cycle stopped being a manual assembly job. Chasing became visible — the system
knows who has not submitted, so the follow-up is a glance rather than an investigation. And the
monthly narrative starts from a draft rather than a blank page.</p>
<div class="note-box"><p>The interface above is an illustration built for this portfolio, with
invented clients and figures. No client data appears anywhere on this site.</p></div>""",
},
{
 "slug":"camp-whittier",
 "title":"Grand reopening funnel",
 "eyebrow":"The Camp Transformation Center &middot; Whittier",
 "desc":"A mobile-first promotional landing page and booking funnel for a gym under new ownership.",
 "lede":"A gym under new ownership had one month to convert local interest into memberships. "
        "The page had to work on a phone, in a parking lot, in under a minute.",
 "img":"camp-whittier.webp","imgh":"750",
 "alt":"The Camp Whittier grand reopening landing page",
 "caption":"Live site &mdash; thecamp-whittier-reopening-promo.vercel.app",
 "meta":[("Role","Builder"),("Discipline","Lead generation"),
         ("Stack","Static + serverless"),
         ("Live",'<a href="https://thecamp-whittier-reopening-promo.vercel.app" target="_blank" rel="noopener">View site &#8599;</a>')],
 "body":"""<h2>The problem</h2>
<p>New ownership, a dollar-for-your-first-month offer, and a hard date. Everything hung on
converting attention into a booked first class before the promotion expired.</p>
<p>The constraint that shaped every decision: almost all the traffic would arrive from a phone,
via Instagram or a text from a friend, and would give the page well under a minute.</p>

<h2>What I built</h2>
<p>A single mobile-first page that does exactly one job — pick a class, submit, done. No account,
no payment online, no CRM integration to go wrong at the moment of conversion.</p>
<p>On submission, two emails fire: one to the team formatted for how they actually work, and one
to the prospect confirming the booking with a calendar invite attached. Staff update their sales
system by hand, which sounds primitive and is in fact the correct call — it keeps the critical
path short and gives the front desk a human touchpoint.</p>

<h2>One backend, two hosts</h2>
<p>All the server logic lives once, in a shared module holding validation and both emails. Two
thin adapters expose it — one for Netlify functions, one for Vercel. The page always posts to the
same path, and host configuration rewrites it as needed.</p>
<p>The reason is unglamorous and practical: a small business should never be stuck with a host
because their landing page is welded to it. Moving is a config change, not a rebuild.</p>

<h2>Beyond the page</h2>
<p>A landing page alone does not run a promotion. The same project produced the surrounding
material: QR codes in print-ready formats with ready-to-print counter signs, a front-desk playbook
that works as a web page and a PDF from one source file, text-message follow-up templates, and a
testing checklist to run before the link went out.</p>
<p>It is built on the same engine as the Huntington Beach page, deliberately kept as a separate
folder, repo, deploy and data store — so retiring this promotion can never disturb the other
location's live funnel.</p>

<h2>Working with the client</h2>
<p>Two days before launch the client came back with changes: special hours for the Monday, and a
rename from “Reopening” to “Grand Reopening Event” so members understood the gym was already open
and this was an event, not a return from closure.</p>
<p>That second note was a genuine catch — the original wording would have cost them walk-ins from
people who assumed the doors were shut. Both changes went live the same day, and the current site
reflects them.</p>""",
},
{
 "slug":"gbi-buildertrend",
 "title":"Project operations in Buildertrend",
 "eyebrow":"Grace Built Homes &middot; Construction",
 "desc":"Estimating, allowances and compliance documentation standardised inside Buildertrend for a residential builder.",
 "lede":"Construction admin fails quietly. A missing certificate or an uncategorised line item "
        "costs nothing on the day and a great deal three months later.",
 "img":"gbi-project.webp","imgh":"587",
 "alt":"Illustrative construction project operations view with milestones and daily logs",
 "caption":"Illustrative interface &mdash; sample data, no client or project information",
 "meta":[("Role","Project Coordinator"),("Discipline","Construction operations"),
         ("Stack","Buildertrend, Excel"),("Focus","Estimating &amp; compliance")],
 "body":"""<h2>The problem</h2>
<p>A residential build generates a continuous stream of small administrative obligations. Daily
logs, subcontractor certificates with expiry dates, change orders awaiting owner decisions,
invoices moving toward payment, allowance tracking against a budget that shifts weekly.</p>
<p>Each item is trivial. Collectively they decide whether a project stays profitable and whether
the builder can answer a question three months later. The failure mode is not dramatic — it is a
certificate that lapsed, a line item nobody categorised, an allowance quietly overspent.</p>

<h2>What I did</h2>
<p>Brought the recurring work into one predictable shape inside Buildertrend, so the same job
produced the same artefacts every time regardless of who was doing it.</p>
<ul>
  <li><strong>Estimate structure.</strong> Line items categorised against a consistent scheme, so
      estimates could be compared across jobs instead of each being its own dialect.</li>
  <li><strong>Allowance setup.</strong> Allowances configured and tracked so overruns surfaced
      while there was still time to have the conversation.</li>
  <li><strong>Compliance documentation.</strong> Subcontractor certificates and required documents
      organised with expiry visible, rather than discovered during an audit.</li>
  <li><strong>A coordinator's guide.</strong> The recurring procedures written down, so the role
      could be handed over without a week of shadowing.</li>
</ul>

<h2>Why the documentation mattered most</h2>
<p>The estimating and allowance work made individual projects legible. The written guide is what
made the <em>role</em> transferable.</p>
<p>Construction coordination is heavy on undocumented knowledge — which subcontractor needs
chasing, what a particular owner wants to approve personally, which milestone always slips. Some
of that is genuinely irreducible judgement. A surprising amount is just procedure nobody had
bothered to write down.</p>

<h2>What carried forward</h2>
<p>This is where the pattern I now apply everywhere first became obvious to me: the bottleneck in
a small operation is rarely capability, and almost always the fact that the process exists only
as habit. The same instinct produced the intake system at ARC and the reporting platform at
Lively — find the recurring work, write it down, then automate the parts that deserve it.</p>
<div class="note-box"><p>The interface above is an illustration built for this portfolio. Project
names, people and figures are invented &mdash; no client or project information appears on this site.</p></div>""",
},
{
 "slug":"bdr-portal",
 "title":"Sales onboarding portal",
 "eyebrow":"Lively &middot; Enablement",
 "desc":"A React training portal with sequential modules and assessments for onboarding new sales development reps.",
 "lede":"New reps were ramping by shadowing whoever happened to be free. That makes onboarding "
        "quality a function of who was available that week.",
 "img":"bdr-portal.webp","imgh":"737",
 "alt":"Illustrative training portal showing sequential modules and a knowledge check",
 "caption":"Illustrative interface &mdash; sample data, no personal information",
 "meta":[("Role","Builder &amp; curriculum"),("Stack","React, Vite"),
         ("Discipline","Enablement"),("Output","9 modules")],
 "body":"""<h2>The problem</h2>
<p>Onboarding by apprenticeship has an obvious appeal and a hidden cost. What a new starter learns
depends on who had capacity to teach them, so two reps hired a month apart receive materially
different training — and nobody can say which parts either of them actually absorbed.</p>
<p>It also consumes the time of exactly the people you least want pulled off their own work.</p>

<h2>What I built</h2>
<p>A self-serve training portal with a defined curriculum. Modules unlock in sequence, each ending
in a knowledge check that has to be passed before the next opens.</p>
<p>The sequencing is the point. Objection handling before qualification produces a rep who argues
with the wrong people; the order encodes how the job is actually learned, not just what there is
to know.</p>

<h2>Curriculum over software</h2>
<p>The application is deliberately modest — React and Vite, module content in structured data,
assessments alongside. That was the right call, because the difficulty was never technical.</p>
<p>The hard part was deciding what a new rep genuinely needs in week one versus what a manager
merely enjoys explaining. Most training material fails by being comprehensive: it covers
everything, so a new starter cannot tell what matters. Cutting it back to what changes behaviour
in the first fortnight took considerably longer than building the portal that delivers it.</p>

<h2>What it gives a manager</h2>
<p>Visibility, mainly. Where each starter is, what they have passed, what needs retaking, and
whether the ramp target is still realistic. That turns onboarding from an anecdote into something
a manager can actually act on before it becomes a problem.</p>
<div class="note-box"><p>The interface above is an illustration built for this portfolio. Progress
and results are invented &mdash; no personal or client information appears on this site.</p></div>""",
},
{
 "slug":"camp-hb",
 "title":"Non-member class booking",
 "eyebrow":"The Camp Transformation Center &middot; Huntington Beach",
 "desc":"A mobile-first booking page letting prospects claim a free first class, with a serverless backend and a staff playbook.",
 "lede":"The original of the pair. A prospect picks a class, the team gets an email they can act "
        "on, and the front desk works from something written down.",
 "img":"camp-hb.webp","imgh":"750",
 "alt":"The Camp Huntington Beach class booking landing page",
 "caption":"Live site &mdash; thecamp-hb-booking.vercel.app",
 "meta":[("Role","Builder"),("Discipline","Lead generation"),
         ("Stack","Static + serverless"),
         ("Live",'<a href="https://thecamp-hb-booking.vercel.app" target="_blank" rel="noopener">View site &#8599;</a>')],
 "body":"""<h2>The problem</h2>
<p>The gym's first class is free, which is a strong offer undermined by a weak path to claiming it.
Interested people had to call during opening hours and negotiate a time — a small amount of
friction placed at exactly the moment someone has decided to try something intimidating.</p>
<p>Phone tag is where casual interest goes to die.</p>

<h2>What I built</h2>
<p>A single page that lets someone pick a class time and submit in about forty-five seconds. No
membership, no account, no payment. The weekly schedule is defined as a pattern in one place, so
the front desk can adjust class times without touching anything that looks like code.</p>
<p>On submission the team receives an email formatted to match how they enter leads into their
sales system, and the prospect receives a confirmation. Staff update the CRM by hand — a
deliberate choice that keeps the conversion path short and preserves a human follow-up.</p>

<h2>The half that is not a website</h2>
<p>A booking page produces bookings, which is only useful if someone reliably acts on them. So the
project also delivered the operating material around it: a staff workflow defining what happens
when a booking arrives and who owns it, text-message templates for follow-up, guidance on where
the link belongs across social channels, and a QA checklist to run before sharing it.</p>
<p>That is usually the difference between a page that generates leads and a business that converts
them. The page was the easy half.</p>

<h2>Built to be reused</h2>
<p>The server logic lives in one shared module with thin adapters for two different hosts, so the
whole thing can move between platforms with a configuration change. When the Whittier location
needed a promotion of its own, that structure meant starting from a proven engine rather than a
blank page — as a separate repo and deploy, so neither location's funnel can break the other.</p>""",
},
]

root = pathlib.Path(".")
(root / "work").mkdir(exist_ok=True)
for i, c in enumerate(CASES):
    nxt = CASES[(i + 1) % len(CASES)]
    out = PAGE.format(
        nav=NAV, foot=FOOT,
        title=c["title"], desc=c["desc"], eyebrow=c["eyebrow"], lede=c["lede"],
        slug=c["slug"],
        meta=meta_cells(c["meta"]), img=c["img"], img_sm=c["img"].replace(".webp","-sm.webp"), imgh=c["imgh"],
        alt=c["alt"], caption=c["caption"], body=c["body"],
        next_href=nxt["slug"] + ".html", next_title=nxt["title"],
    )
    (root / "work" / f'{c["slug"]}.html').write_text(out, encoding="utf-8")
    print(f'  work/{c["slug"]}.html  {len(out):,} bytes')
print(f"\n{len(CASES)} case studies written")
