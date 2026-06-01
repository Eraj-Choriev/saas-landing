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
 *      (optional) ALLOW_ORIGIN = https://your-domain.com   // lock CORS to your site
 *   4. Copy the Worker URL (https://aqly-lead.<you>.workers.dev) →
 *      put it in the site as NEXT_PUBLIC_LEAD_ENDPOINT (see .env.local.example).
 */

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

    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: "bad json" }, 400, cors)
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
    const email = esc(data.email).slice(0, 200)
    const website = esc(data.website).slice(0, 300)
    const services = Array.isArray(data.services)
      ? data.services.map(esc).join(", ").slice(0, 500)
      : ""
    const timeline = esc(data.timeline).slice(0, 100)
    const challenge = esc(data.challenge).slice(0, 2000)
    const lang = esc(data.lang).slice(0, 5)

    // basic sanity check — don't relay empty junk
    if (name.length < 2 || !/\S+@\S+\.\S+/.test(email)) {
      return json({ ok: false, error: "invalid" }, 422, cors)
    }

    // localize the message to the site language the visitor used
    const L =
      lang === "ru"
        ? {
            title: "Новая заявка — Aqly",
            name: "Имя",
            email: "Email",
            site: "Сайт",
            services: "Услуги",
            timeline: "Сроки",
            project: "Проект",
          }
        : {
            title: "New lead — Aqly",
            name: "Name",
            email: "Email",
            site: "Site",
            services: "Services",
            timeline: "Timeline",
            project: "Project",
          }

    const text =
      `🟢 <b>${L.title}</b>\n\n` +
      `👤 <b>${L.name}:</b> ${name}\n` +
      `✉️ <b>${L.email}:</b> ${email}\n` +
      (website ? `🌐 <b>${L.site}:</b> ${website}\n` : "") +
      (services ? `🧩 <b>${L.services}:</b> ${services}\n` : "") +
      (timeline ? `⏱ <b>${L.timeline}:</b> ${timeline}\n` : "") +
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
