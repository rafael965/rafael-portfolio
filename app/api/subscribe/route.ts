// Emails the Operations Runbook Kit to a subscriber and notifies Rafael.
// Requires RESEND_API_KEY in the Vercel project's environment variables.

const FROM = "Rafael Reyes <hello@rafaelreyes.dev>";
const NOTIFY = "Reyesralf17@gmail.com";
const KIT_URL = "https://rafaelreyes.dev/downloads/operations-runbook-kit.pdf";

// Deliberately permissive. Rejecting unusual-but-valid addresses costs a real
// subscriber; a bad address just bounces.
const looksLikeEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const esc = (s: string) =>
  s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);

async function send(key: string, payload: Record<string, unknown>) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";

  // Honeypot: a hidden field only a bot fills in. Accept silently so it learns nothing.
  if (body.company) return Response.json({ ok: true });

  if (!looksLikeEmail(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const hi = name ? `Hi ${esc(name)},` : "Hi,";

  try {
    await send(key, {
      from: FROM,
      to: [email],
      reply_to: NOTIFY,
      subject: "The Operations Runbook Kit",
      html: `
<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.55;color:#121619;max-width:34em">
  <p>${hi}</p>
  <p>Here is the kit — four templates for turning work that lives in one person's head
     into work a team can run.</p>
  <p style="margin:22px 0">
    <a href="${KIT_URL}"
       style="background:#09814a;color:#ffffff;text-decoration:none;padding:11px 20px;
              border-radius:999px;font-weight:600;display:inline-block">Download the kit (PDF)</a>
  </p>
  <p style="color:#5a5f5b;font-size:14px">Inside: a seventeen-step client intake runbook, an SOP
     template, a weekly calendar structure, and six AI prompt workflows that survive repeated use.</p>
  <p style="color:#5a5f5b;font-size:14px">Take them apart — rename the columns, drop what does not
     apply. A template used exactly as written by someone else is usually the wrong template.</p>
  <p>If something in it is useful, or wrong, I would genuinely like to hear about it. Just reply.</p>
  <p style="margin-top:26px">Rafael<br>
     <a href="https://rafaelreyes.dev" style="color:#2d4739">rafaelreyes.dev</a></p>
  <hr style="border:0;border-top:1px solid #ebe2cf;margin:26px 0 12px">
  <p style="color:#5a5f5b;font-size:12px">You received this because you asked for the kit at
     rafaelreyes.dev. That is the only reason I have your address, and I will not add you to
     anything else. Reply with "remove" and I will delete it.</p>
</div>`,
    });

    // Fire-and-forget: a failed notification must not fail the subscriber's request.
    send(key, {
      from: FROM,
      to: [NOTIFY],
      subject: `Kit download — ${email}`,
      html: `<p><b>${esc(name) || "(no name)"}</b><br>${esc(email)}</p>`,
    }).catch((e: Error) => console.error("notification failed:", e.message));

    return Response.json({ ok: true });
  } catch (err) {
    console.error("subscribe failed:", (err as Error).message);
    return Response.json({ error: "Could not send the email. Try again in a moment." }, { status: 502 });
  }
}
