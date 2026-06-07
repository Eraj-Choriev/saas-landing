/**
 * Aqly — Telegram lead proxy (Cloudflare Worker)
 * ------------------------------------------------
 * Receives a lead POST from the contact form and forwards it to a Telegram
 * chat/group via the Bot API. The bot TOKEN never touches the browser —
 * it lives only in this Worker's env vars.
 *
 * SETUP (dash.cloudflare.com):
 *   1. Workers & Pages → Create → Create Worker → Deploy.
 *   2. Edit code → paste this whole file → Deploy.
 *   3. Settings → Variables and Secrets → add two SECRET vars:
 *        BOT_TOKEN = <token from @BotFather>
 *        CHAT_ID   = <your chat id or group id from getUpdates>
 *      (recommended) ALLOW_ORIGIN = https://your-domain.com  // lock to your site
 *   4. Copy the Worker URL (https://aqly-lead.<you>.workers.dev) →
 *      put it in the site as NEXT_PUBLIC_LEAD_ENDPOINT (see .env.local.example).
 *
 * ABUSE PROTECTION (optional but recommended):
 *   Settings → Bindings → add a KV namespace binding named `RL`.
 *   With it bound, requests are rate-limited per IP (see RL_MAX / RL_WINDOW).
 *   Without it, the Worker still runs — it just skips rate limiting.
 */

// rate limit: max requests per IP per window (seconds)
const RL_MAX = 5
const RL_WINDOW = 60
// reject bodies larger than this many bytes before parsing
const MAX_BODY = 10_000

export default {
  async fetch(request, env) {
    const origin = env.ALLOW_ORIGIN || "*"
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors })
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors })
    }

    // Origin allowlist — CORS is browser-only, so also reject mismatched
    // Origins server-side. Skipped if ALLOW_ORIGIN is unset.
    if (env.ALLOW_ORIGIN) {
      const reqOrigin = request.headers.get("Origin")
      if (reqOrigin && reqOrigin !== env.ALLOW_ORIGIN) {
        return json({ ok: false, error: "forbidden" }, 403, cors)
      }
    }

    // reject oversized bodies before reading them into memory
    if (Number(request.headers.get("Content-Length") || 0) > MAX_BODY) {
      return json({ ok: false, error: "too large" }, 413, cors)
    }

    // per-IP rate limit (only if a KV namespace `RL` is bound)
    if (env.RL) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown"
      const key = `rl:${ip}`
      const hits = Number((await env.RL.get(key)) || 0)
      if (hits >= RL_MAX) {
        return json({ ok: false, error: "rate limited" }, 429, cors)
      }
      // best-effort; first hit sets the TTL window
      await env.RL.put(key, String(hits + 1), { expirationTtl: RL_WINDOW })
    }

    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: "bad json" }, 400, cors)
    }

    // guard against huge bodies sent without a Content-Length header
    if (JSON.stringify(data).length > MAX_BODY) {
      return json({ ok: false, error: "too large" }, 413, cors)
    }

    // honeypot — bots fill hidden fields; silently accept & drop
    if (data.company) {
      return json({ ok: true }, 200, cors)
    }

    const esc = (s) =>
      String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

    const name = esc(data.name).slice(0, 200)
    const phone = esc(data.phone).slice(0, 50)
    const website = esc(data.website).slice(0, 300)
    const services = Array.isArray(data.services)
      ? data.services.map(esc).join(", ").slice(0, 500)
      : ""
    const challenge = esc(data.challenge).slice(0, 2000)
    const lang = esc(data.lang).slice(0, 5)

    // basic sanity check — don't relay empty junk.
    // Tajik number: +992 + 9 digits = 12 digits total incl. country code.
    const phoneDigits = String(data.phone ?? "").replace(/\D/g, "")
    if (name.length < 2 || phoneDigits.length !== 12 || !phoneDigits.startsWith("992")) {
      return json({ ok: false, error: "invalid" }, 422, cors)
    }

    // localize the message to the site language the visitor used
    const L =
      lang === "ru"
        ? {
            title: "Новая заявка — Aqly",
            name: "Имя",
            phone: "Телефон",
            site: "Сайт",
            services: "Услуги",
            project: "Проект",
          }
        : {
            title: "New lead — Aqly",
            name: "Name",
            phone: "Phone",
            site: "Site",
            services: "Services",
            project: "Project",
          }

    const text =
      `🟢 <b>${L.title}</b>\n\n` +
      `👤 <b>${L.name}:</b> ${name}\n` +
      `📞 <b>${L.phone}:</b> ${phone}\n` +
      (website ? `🌐 <b>${L.site}:</b> ${website}\n` : "") +
      (services ? `🧩 <b>${L.services}:</b> ${services}\n` : "") +
      (challenge ? `\n💬 <b>${L.project}:</b>\n${challenge}` : "")

    const tg = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    )

    if (!tg.ok) {
      return json({ ok: false, error: "telegram failed" }, 502, cors)
    }
    return json({ ok: true }, 200, cors)
  },
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  })
}
