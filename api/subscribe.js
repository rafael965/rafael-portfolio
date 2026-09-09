// Emails the Operations Runbook Kit to a subscriber and notifies Rafael.
// Requires RESEND_API_KEY in the Vercel project's environment variables.
//
// Deliberately one file with no dependencies: this does two things and does not
// warrant the shared-core/adapter split used by the booking funnels.

const FROM = 'Rafael Reyes <hello@rafaelreyes.dev>';
const NOTIFY = 'Reyesralf17@gmail.com';
const KIT_URL = 'https://rafaelreyes.dev/downloads/operations-runbook-kit.pdf';

// Deliberately permissive. Rejecting unusual-but-valid addresses costs a real
// subscriber; a bad address just bounces.
const looksLikeEmail = (v) =>
  typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const esc = (s) => String(s).replace(/[<>&"]/g, (c) =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

async function send(key, payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return r.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email is not configured yet.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const email = (body.email || '').trim();
  const name = (body.name || '').trim().slice(0, 80);

  // Honeypot: a hidden field only a bot fills in. Accept silently so it learns nothing.
  if (body.company) return res.status(200).json({ ok: true });

  if (!looksLikeEmail(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }

  const hi = name ? `Hi ${esc(name)},` : 'Hi,';

  try {
    await send(key, {
      from: FROM,
      to: [email],
      reply_to: NOTIFY,
      subject: 'The Operations Runbook Kit',
      html: `
<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1f2421;max-width:34em">
  <p>${hi}</p>
  <p>Here is the kit — four templates for turning work that lives in one person's head
     into work a team can run.</p>
  <p style="margin:22px 0">
    <a href="${KIT_URL}"
       style="background:#49a078;color:#1f2421;text-decoration:none;padding:11px 20px;
              border-radius:999px;font-weight:600;display:inline-block">Download the kit (PDF)</a>
  </p>
  <p style="color:#4d5551;font-size:14px">Inside: a seventeen-step client intake runbook, an SOP
     template, a weekly calendar structure, and six AI prompt workflows that survive repeated use.</p>
  <p style="color:#4d5551;font-size:14px">Take them apart — rename the columns, drop what does not
     apply. A template used exactly as written by someone else is usually the wrong template.</p>
  <p>If something in it is useful, or wrong, I would genuinely like to hear about it. Just reply.</p>
  <p style="margin-top:26px">Rafael<br>
     <a href="https://rafaelreyes.dev" style="color:#216869">rafaelreyes.dev</a></p>
  <hr style="border:0;border-top:1px solid #dce1de;margin:26px 0 12px">
  <p style="color:#6d7772;font-size:12px">You received this because you asked for the kit at
     rafaelreyes.dev. That is the only reason I have your address, and I will not add you to
     anything else. Reply with "remove" and I will delete it.</p>
</div>`,
    });

    // Fire-and-forget: a failed notification must not fail the subscriber's request.
    send(key, {
      from: FROM,
      to: [NOTIFY],
      subject: `Kit download — ${email}`,
      html: `<p><b>${esc(name) || '(no name)'}</b><br>${esc(email)}</p>`,
    }).catch((e) => console.error('notification failed:', e.message));

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe failed:', err.message);
    return res.status(502).json({ error: 'Could not send the email. Try again in a moment.' });
  }
}
