"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Mic, Send, ArrowUpRight } from "lucide-react"
import { useI18n, type Lang } from "@/lib/i18n"

/**
 * ServiceVisual — per-service INTERACTIVE demo shown at the top of each modal.
 * The principle: don't illustrate the idea, let the visitor touch the product.
 * index maps to service order in i18n (0 Telegram … 5 Design).
 * Pure DOM/SVG + framer-motion (no external libs, no media assets).
 *
 * Shared rules (per brief):
 *  - demos start ~300ms after the modal has faded in (`useStarted`)
 *  - looping demos pause after 10s of no pointer activity (`useActive`)
 *  - prefers-reduced-motion → render a sensible static final frame
 */
const EASE = [0.16, 1, 0.3, 1] as const
const BG = "radial-gradient(120% 120% at 50% 0%, #141a22 0%, #0b0f14 62%)"

const tr = (lang: Lang, ru: string, en: string, tj: string) =>
  lang === "ru" ? ru : lang === "tj" ? tj : en

function useStarted(delay = 300) {
  const [started, setStarted] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return started
}

// pause looping demos after inactivity — saves CPU, stops distracting the reader
function useActive(timeout = 10000) {
  const [active, setActive] = React.useState(true)
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const reset = () => {
      setActive(true)
      clearTimeout(timer)
      timer = setTimeout(() => setActive(false), timeout)
    }
    reset()
    window.addEventListener("mousemove", reset, { passive: true })
    window.addEventListener("keydown", reset)
    window.addEventListener("touchstart", reset, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", reset)
      window.removeEventListener("keydown", reset)
      window.removeEventListener("touchstart", reset)
    }
  }, [timeout])
  return active
}

export function ServiceVisual({ index, color }: { index: number; color: string }) {
  const reduce = !!useReducedMotion()
  const { lang } = useI18n()
  const started = useStarted(300)

  const common = { color, reduce, started, lang }
  const map = [
    <ChatDemo key="0" {...common} />,
    <WebsitesDemo key="1" {...common} />,
    <VoiceDemo key="2" {...common} />,
    <FlowDemo key="3" {...common} />,
    <TerminalDemo key="4" {...common} />,
    <DesignDemo key="5" {...common} />,
  ]

  return (
    <div className="relative h-[230px] w-full overflow-hidden sm:h-[260px]" style={{ background: BG }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_80%_at_50%_30%,#000,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
        style={{ background: `radial-gradient(60% 80% at 50% 0%, ${color}1f, transparent 70%)` }}
        aria-hidden
      />
      {map[index] ?? map[0]}
    </div>
  )
}

type Demo = { color: string; reduce: boolean; started: boolean; lang: Lang }

/* ════════════════ 1 · Telegram — interactive chat ════════════════ */

type Msg = { id: number; from: "bot" | "user"; text: string; tw?: boolean }

function ChatDemo({ color, reduce, started, lang }: Demo) {
  const greeting = tr(
    lang,
    "Привет! Я бот Aqly. Спросите меня о чём угодно 👋",
    "Hi! I'm the Aqly bot. Ask me anything 👋",
    "Салом! Ман боти Aqly. Ҳар чӣ хоҳед пурсед 👋"
  )

  const NODE: Record<string, { q: string; a: string; next: string[] }> = {
    abilities: {
      q: tr(lang, "Что умеете?", "What can you do?", "Чӣ метавонед?"),
      a: tr(
        lang,
        "Квалифицирую лидов, принимаю заявки, отвечаю на вопросы и подключаюсь к вашей CRM и Stripe.",
        "I qualify leads, take orders, answer questions and connect to your CRM and Stripe.",
        "Лидҳоро баҳо медиҳам, дархостҳо мегирам, ба саволҳо ҷавоб медиҳам ва ба CRM ва Stripe пайваст мешавам."
      ),
      next: ["price", "booking"],
    },
    price: {
      q: tr(lang, "Сколько стоит?", "How much?", "Нархаш чанд?"),
      a: tr(
        lang,
        "От $5 000 — зависит от объёма и интеграций. Сделать бесплатную оценку?",
        "From $5,000 — depends on scope and integrations. Want a free estimate?",
        "Аз $5 000 — вобаста ба ҳаҷм ва интегратсияҳо. Баҳои ройгон кунам?"
      ),
      next: ["booking", "abilities"],
    },
    booking: {
      q: tr(lang, "Записать на созвон", "Book a call", "Ба занг сабт кунед"),
      a: tr(
        lang,
        "Конечно! Свободные слоты на этой неделе:",
        "Sure! Free slots this week:",
        "Албатта! Вақтҳои холӣ ин ҳафта:"
      ),
      next: ["s1", "s2", "s3"],
    },
    s1: { q: tr(lang, "Пн 14:00", "Mon 14:00", "Душ 14:00"), a: "", next: [] },
    s2: { q: tr(lang, "Вт 11:00", "Tue 11:00", "Сеш 11:00"), a: "", next: [] },
    s3: { q: tr(lang, "Ср 16:00", "Wed 16:00", "Чор 16:00"), a: "", next: [] },
    default: {
      q: "",
      a: tr(
        lang,
        "В реальном продакшене я подключён к Claude и отвечаю на любые запросы. Хотите такого же?",
        "In production I'm wired to Claude and answer any request. Want one like me?",
        "Дар продакшен ман ба Claude пайвастам ва ба ҳар дархост ҷавоб медиҳам. Чунинашро мехоҳед?"
      ),
      next: ["price", "booking"],
    },
  }
  const confirm = tr(
    lang,
    "Готово — записал вас ✅ Менеджер подтвердит детали.",
    "Done — you're booked ✅ A manager will confirm details.",
    "Тайёр — шуморо сабт кардам ✅ Менеҷер тафсилотро тасдиқ мекунад."
  )

  const [msgs, setMsgs] = React.useState<Msg[]>([])
  const [quick, setQuick] = React.useState<string[]>([])
  const [typing, setTyping] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const idRef = React.useRef(0)
  const threadRef = React.useRef<HTMLDivElement>(null)
  const next = (m: Omit<Msg, "id">): Msg => { idRef.current += 1; return { ...m, id: idRef.current } }

  React.useEffect(() => {
    if (reduce) {
      setMsgs([
        next({ from: "bot", text: greeting }),
        next({ from: "user", text: NODE.price.q }),
        next({ from: "bot", text: NODE.price.a }),
      ])
      setQuick(["booking", "abilities"])
      return
    }
    setMsgs([])
    setQuick([])
    if (!started) return
    setTyping(true)
    const t = setTimeout(() => {
      setTyping(false)
      setMsgs([next({ from: "bot", text: greeting, tw: true })])
      setQuick(["abilities", "price", "booking"])
    }, 500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduce, lang])

  React.useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [msgs, typing, quick, reduce])

  const busy = React.useRef(false)
  function pick(id: string) {
    if (busy.current) return
    const node = NODE[id]
    busy.current = true
    setQuick([])
    setMsgs((m) => [...m, next({ from: "user", text: node.q })])
    const answer = id.startsWith("s") ? confirm : node.a
    const followups = id.startsWith("s") ? [] : node.next
    if (reduce) {
      setMsgs((m) => [...m, next({ from: "bot", text: answer })])
      setQuick(followups)
      busy.current = false
      return
    }
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, next({ from: "bot", text: answer, tw: true })])
      setQuick(followups)
      busy.current = false
    }, 1000)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy.current || !draft.trim()) return
    const text = draft.trim()
    setDraft("")
    busy.current = true
    setQuick([])
    setMsgs((m) => [...m, next({ from: "user", text })])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, next({ from: "bot", text: NODE.default.a, tw: true })])
      setQuick(NODE.default.next)
      busy.current = false
    }, 1000)
  }

  return (
    <div className="absolute inset-0 mx-auto flex max-w-[440px] flex-col px-4 pt-3 pb-3">
      <div className="flex items-center gap-2 pb-2">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-[#229ED9] font-display text-[13px] text-white">a</div>
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold text-cream-50">Aqly</p>
          <p className="text-[10.5px] text-emerald-300/90">{typing ? tr(lang, "печатает…", "typing…", "навишта истода…") : "online"}</p>
        </div>
      </div>

      <div ref={threadRef} className="flex-1 space-y-1.5 overflow-y-auto scrollbar-hide pr-1">
        {msgs.map((m) => (
          <Bubble key={m.id} side={m.from} color={color}>
            {m.tw ? <Typewriter text={m.text} /> : m.text}
          </Bubble>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3.5 py-2.5">
              {[0, 1, 2].map((d) => (
                <motion.span key={d} className="h-1.5 w-1.5 rounded-full" style={{ background: color }}
                  animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.16 }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {quick.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {quick.map((id) => (
            <button key={id} type="button" onClick={() => pick(id)}
              className="rounded-full border px-2.5 py-1 text-[11.5px] transition-colors"
              style={{ borderColor: `${color}40`, background: `${color}14`, color }}>
              {NODE[id].q}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
          placeholder={tr(lang, "Напишите сообщение…", "Type a message…", "Паём нависед…")}
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[12.5px] text-cream-50 placeholder:text-cream-100/30 focus:border-white/25 focus:outline-none" />
        <button type="submit" aria-label="Send" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white" style={{ background: "#229ED9" }}>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  )
}

function Bubble({ side, color, children }: { side: "bot" | "user"; color: string; children: React.ReactNode }) {
  const isUser = side === "user"
  return (
    <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] px-3 py-1.5 text-[12.5px] leading-[1.4] ${isUser ? "rounded-2xl rounded-br-md text-white" : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] text-cream-50"}`}
        style={isUser ? { background: "#229ED9" } : undefined}>
        {children}
      </div>
    </motion.div>
  )
}

function Typewriter({ text, speed = 18 }: { text: string; speed?: number }) {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    setN(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return <>{text.slice(0, n)}</>
}

/* ════════════════ 2 · Websites — case carousel + metrics ════════════════ */

function WebsitesDemo({ color, reduce, started, lang }: Demo) {
  const cases = [
    { name: "Northwind", url: "northwind.io", accent: "#ff5b24", lh: 99, lcp: "0.8s", cls: "0.01" },
    { name: "Lumen", url: "lumen.app", accent: "#a9caf9", lh: 98, lcp: "0.9s", cls: "0.02" },
    { name: "Voltage", url: "voltage.co", accent: "#d17a00", lh: 97, lcp: "1.0s", cls: "0.01" },
  ]
  const [i, setI] = React.useState(0)
  const [hover, setHover] = React.useState(false)
  const active = useActive()
  React.useEffect(() => {
    if (reduce || !started || hover || !active) return
    const id = setInterval(() => setI((v) => (v + 1) % cases.length), 4000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, hover, active])

  const c = cases[i]
  return (
    <div className="absolute inset-0 grid place-items-center px-5" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="w-full max-w-[420px]">
        <div className="overflow-hidden rounded-xl border border-white/12 bg-[#11161c] shadow-xl">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
            <span className="flex gap-1"><i className="h-2 w-2 rounded-full bg-white/25" /><i className="h-2 w-2 rounded-full bg-white/25" /><i className="h-2 w-2 rounded-full bg-white/25" /></span>
            <span className="ml-1 truncate rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10.5px] text-cream-100/55">https://{c.url}</span>
          </div>
          {/* stylized site preview */}
          <div className="relative h-[110px] sm:h-[128px]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0 p-3" style={{ background: `radial-gradient(120% 90% at 80% 0%, ${c.accent}22, transparent 60%), #0e1318` }}>
                <div className="h-2.5 w-20 rounded-full" style={{ background: c.accent }} />
                <div className="mt-3 h-3.5 w-3/4 rounded bg-white/15" />
                <div className="mt-1.5 h-3.5 w-1/2 rounded bg-white/10" />
                <div className="mt-3 inline-block h-5 w-24 rounded-full" style={{ background: `${c.accent}cc` }} />
                {/* metrics badge */}
                <div className="absolute bottom-3 right-3 rounded-lg border border-white/12 bg-ink/70 px-2.5 py-1.5 backdrop-blur">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-mono font-semibold text-emerald-400">Lighthouse {c.lh}</span>
                  </div>
                  <div className="mt-0.5 font-mono text-[9.5px] text-cream-100/55">LCP {c.lcp} · CLS {c.cls}</div>
                </div>
                {hover && (
                  <a href="#contact" className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-ink">
                    {tr(lang, "Открыть", "View live", "Кушодан")} <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {cases.map((_, d) => (
            <button key={d} aria-label={`Case ${d + 1}`} onClick={() => setI(d)}
              className="h-1.5 rounded-full transition-all duration-300" style={{ width: d === i ? 18 : 6, background: d === i ? color : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════ 3 · AI Voice — player ════════════════ */

function VoiceDemo({ color, reduce, lang }: Demo) {
  const open = () => {
    try {
      window.dispatchEvent(new CustomEvent("aqly:open-voice"))
    } catch {
      /* noop */
    }
  }
  const bars = Array.from({ length: 32 })

  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="w-full max-w-[420px] text-center">
        {/* live waveform teaser */}
        <div className="mx-auto mb-5 flex h-12 items-center justify-center gap-[3px]">
          {bars.map((_, i) => {
            const base = 5 + Math.abs(Math.sin(i * 0.55)) * 20
            return (
              <motion.span
                key={i}
                className="w-[3px] rounded-full"
                style={{ height: base, background: i % 2 ? `${color}` : `${color}80` }}
                animate={reduce ? { scaleY: 1 } : { scaleY: [1, 0.45 + Math.abs(Math.sin(i * 1.4)) * 1.1, 1] }}
                transition={{ duration: 1.4, repeat: reduce ? 0 : Infinity, delay: i * 0.04, ease: "easeInOut" }}
              />
            )
          })}
        </div>

        <button
          onClick={open}
          className="group mx-auto inline-flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-5 text-[14px] font-medium text-white transition-transform hover:scale-[1.03] active:scale-95"
          style={{ background: `linear-gradient(135deg, ${color}, #d17a00)`, boxShadow: `0 14px 36px -12px ${color}` }}
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/20">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: "1.5px solid rgba(255,255,255,0.6)" }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Mic className="h-4 w-4" strokeWidth={2} />
          </span>
          {tr(lang, "Поговорить с агентом", "Talk to the agent", "Бо агент гап занед")}
        </button>

        <p className="mx-auto mt-4 max-w-[300px] text-pretty text-[12px] leading-snug text-cream-100/50">
          {tr(
            lang,
            "Живой голосовой агент на базе ElevenLabs — реальный разговор прямо в браузере.",
            "A live ElevenLabs voice agent — a real conversation right in the browser.",
            "Агенти овозии зинда дар асоси ElevenLabs — сӯҳбати воқеӣ дар браузер."
          )}
        </p>
      </div>
    </div>
  )
}

/* ════════════════ 4 · Connected Tools — animated flow + scenario tabs ════════════════ */

function FlowDemo({ color, reduce, started, lang }: Demo) {
  const scenarios = [
    {
      name: tr(lang, "E-commerce", "E-commerce", "E-commerce"),
      apps: ["Tilda", "Notion", "Telegram", "AmoCRM"],
      labels: [
        tr(lang, "Заявка", "Order", "Дархост"),
        tr(lang, "Запись", "Saved", "Сабт"),
        tr(lang, "Алерт", "Alert", "Огоҳӣ"),
        tr(lang, "Лид", "Lead", "Лид"),
      ],
    },
    {
      name: tr(lang, "SaaS", "SaaS", "SaaS"),
      apps: ["Webflow", "Stripe", "Slack", "HubSpot"],
      labels: [
        tr(lang, "Регистрация", "Sign-up", "Бақайдгирӣ"),
        tr(lang, "Оплата", "Payment", "Пардохт"),
        tr(lang, "Уведомление", "Notify", "Огоҳнома"),
        tr(lang, "Контакт", "Contact", "Тамос"),
      ],
    },
    {
      name: tr(lang, "Lead-gen", "Lead-gen", "Lead-gen"),
      apps: ["Meta Ads", "Airtable", "Email", "Bitrix24"],
      labels: [
        tr(lang, "Клик", "Click", "Клик"),
        tr(lang, "Сохранение", "Save", "Захира"),
        tr(lang, "Письмо", "Email", "Мактуб"),
        tr(lang, "Воронка", "Funnel", "Воронка"),
      ],
    },
  ]
  const [tab, setTab] = React.useState(0)
  const [step, setStep] = React.useState(reduce ? 3 : -1)
  const active = useActive()
  const sc = scenarios[tab]

  React.useEffect(() => {
    setStep(reduce ? 3 : -1)
    if (reduce || !started || !active) return
    let s = -1
    const id = setInterval(() => {
      s = s >= 3 ? 0 : s + 1
      setStep(s)
    }, 1100)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, reduce, started, active])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5">
      {/* tabs */}
      <div className="flex gap-1.5">
        {scenarios.map((s, i) => (
          <button key={s.name} onClick={() => setTab(i)}
            className="rounded-full px-2.5 py-1 text-[11px] transition-colors"
            style={i === tab ? { background: color, color: "#0b0f14", fontWeight: 600 } : { background: "rgba(255,255,255,0.06)", color: "rgba(243,239,230,0.6)" }}>
            {s.name}
          </button>
        ))}
      </div>

      {/* nodes */}
      <div className="flex w-full max-w-[440px] items-start justify-between">
        {sc.apps.map((app, i) => {
          const on = step >= i
          return (
            <React.Fragment key={app}>
              <div className="flex flex-col items-center gap-1.5" style={{ width: 78 }}>
                <motion.div className="grid h-12 w-12 place-items-center rounded-xl border text-center font-mono text-[10px] leading-tight"
                  animate={{ borderColor: on ? color : "rgba(255,255,255,0.12)", boxShadow: on ? `0 0 18px -4px ${color}` : "0 0 0 0 transparent", color: on ? "#fff" : "rgba(243,239,230,0.55)" }}
                  transition={{ duration: 0.3 }} style={{ background: "#11161c" }}>
                  {app}
                </motion.div>
                <AnimatePresence>
                  {on && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-center text-[10px] leading-tight" style={{ color }}>
                      {sc.labels[i]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {i < sc.apps.length - 1 && (
                <div className="relative mt-6 h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <motion.div className="absolute -top-[3px] h-1.5 w-1.5 rounded-full" style={{ background: color }}
                    animate={{ left: step === i ? ["0%", "100%"] : step > i ? "100%" : "0%", opacity: step >= i ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }} />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

/* ════════════════ 5 · AI Integration — live terminal ════════════════ */

type Line = { t: "cmd" | "warn" | "ok" | "comment"; text: string }

function TerminalDemo({ color, reduce, started, lang }: Demo) {
  const scenarios: Line[][] = [
    [
      { t: "cmd", text: "$ curl https://api.aqly.io/analyze" },
      { t: "comment", text: '  -d \'{ "query": "хочу заказать сайт" }\'' },
      { t: "warn", text: "⠙ routing to Claude Opus 4…" },
      { t: "ok", text: "✓ 0.4s  { intent: \"website\", score: 87, route: \"sales\" }" },
    ],
    [
      { t: "cmd", text: "$ aqly generate --type=post" },
      { t: "warn", text: "⠹ drafting content…" },
      { t: "ok", text: "✓ 0.6s  { title: \"5 AI wins\", words: 480, tone: \"expert\" }" },
    ],
    [
      { t: "cmd", text: "$ aqly support --ticket=4821" },
      { t: "warn", text: "⠸ reading history…" },
      { t: "ok", text: "✓ 0.3s  { reply_drafted: true, csat_pred: 0.94 }" },
    ],
  ]
  const [sc, setSc] = React.useState(0)
  const [shown, setShown] = React.useState(reduce ? scenarios[0].length : 0)
  const [chars, setChars] = React.useState(0)
  const active = useActive()
  const lines = scenarios[sc]

  React.useEffect(() => {
    if (reduce || !started || !active) { setShown(reduce ? lines.length : shown); return }
    setShown(0); setChars(0)
    let li = 0, ci = 0
    const id = setInterval(() => {
      const cur = lines[li]
      if (!cur) {
        clearInterval(id)
        setTimeout(() => setSc((v) => (v + 1) % scenarios.length), 1800)
        return
      }
      ci += 2
      setChars(ci)
      if (ci >= cur.text.length) {
        setShown((s) => Math.max(s, li + 1))
        li += 1; ci = 0; setChars(0)
      }
    }, 28)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sc, reduce, started, active])

  const colorOf = (t: Line["t"]) => t === "cmd" ? "#58A6FF" : t === "ok" ? "#3FB950" : t === "warn" ? "#D29922" : "#8B949E"

  return (
    <div className="absolute inset-0 grid place-items-center px-5">
      <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-white/10" style={{ background: "#0D1117" }}>
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
          <span className="flex gap-1"><i className="h-2 w-2 rounded-full bg-[#ff5f56]" /><i className="h-2 w-2 rounded-full bg-[#ffbd2e]" /><i className="h-2 w-2 rounded-full bg-[#27c93f]" /></span>
          <span className="ml-1 font-mono text-[10.5px] text-cream-100/45">api-request.sh</span>
        </div>
        <div className="h-[150px] overflow-hidden p-3 font-mono text-[11.5px] leading-[1.55] sm:h-[168px]">
          {lines.map((ln, i) => {
            if (i > shown) return null
            const typingLine = i === shown && chars < ln.text.length && !reduce
            const text = typingLine ? ln.text.slice(0, chars) : ln.text
            return (
              <div key={`${sc}-${i}`} style={{ color: colorOf(ln.t) }} className="whitespace-pre-wrap break-words">
                {text}
                {typingLine && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse" style={{ background: color }} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ════════════════ 6 · Design — brand-kit preview: logo + palette + type ════════════════ */

type Brand = {
  name: string
  font: string
  fontLabel: string
  palette: string[]
  Mark: ({ c }: { c: string }) => JSX.Element
}

const BRANDS: Brand[] = [
  {
    name: "Lumio",
    font: "var(--font-display), serif",
    fontLabel: "Playfair Display",
    palette: ["#0b0f14", "#2f6fb0", "#a9caf9", "#f3efe6"],
    Mark: ({ c }) => (
      <g stroke={c} strokeWidth="6" fill="none" strokeLinecap="round">
        <circle cx="38" cy="50" r="22" />
        <circle cx="62" cy="50" r="22" opacity="0.55" />
      </g>
    ),
  },
  {
    name: "Volt",
    font: "var(--font-mono), monospace",
    fontLabel: "Geist Mono",
    palette: ["#0b0f14", "#ff5b24", "#d17a00", "#f3efe6"],
    Mark: ({ c }) => (
      <path d="M56 18 32 54h16l-6 28 26-40H52l4-24Z" fill={c} />
    ),
  },
  {
    name: "Bloom",
    font: "var(--font-sans), sans-serif",
    fontLabel: "Manrope",
    palette: ["#0b0f14", "#d4a017", "#009639", "#f3efe6"],
    Mark: ({ c }) => (
      <g fill={c}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="50" rx="9" ry="24" transform={`rotate(${i * 60} 50 50)`} opacity={i % 2 ? 0.5 : 1} />
        ))}
      </g>
    ),
  },
]

function DesignDemo({ color, reduce, started, lang }: Demo) {
  const [tab, setTab] = React.useState(0)
  const b = BRANDS[tab]
  const tagline = tr(lang, "Фирменный стиль", "Brand identity", "Услуби фирмавӣ")
  const tabNames = [
    tr(lang, "Засечки", "Serif", "Серифӣ"),
    tr(lang, "Смелый", "Bold", "Ҷасур"),
    tr(lang, "Мягкий", "Soft", "Нарм"),
  ]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5">
      <div className="flex w-full max-w-[440px] items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-100/45">{tagline}</span>
        <div className="flex gap-1.5">
          {tabNames.map((name, i) => (
            <button key={name} onClick={() => setTab(i)}
              className="rounded-full px-2.5 py-1 text-[11px] transition-colors"
              style={i === tab ? { background: color, color: "#0b0f14", fontWeight: 600 } : { background: "rgba(255,255,255,0.06)", color: "rgba(243,239,230,0.6)" }}>
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-[440px] items-stretch gap-3">
        {/* logo tile */}
        <motion.div
          key={`tile-${tab}`}
          className="flex aspect-square w-[140px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
          initial={reduce ? false : { scale: 0.92, opacity: 0 }}
          animate={started || reduce ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}>
          <svg viewBox="0 0 100 100" className="h-14 w-14">
            <b.Mark c={b.palette[1]} />
          </svg>
          <span className="text-[18px] leading-none text-cream-50" style={{ fontFamily: b.font }}>{b.name}</span>
        </motion.div>

        {/* right: wordmark sample + palette + font */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5">
          <div
            className="rounded-xl border border-white/10 px-3 py-2.5"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="truncate text-[26px] leading-tight text-cream-50" style={{ fontFamily: b.font }}>
              {b.name}<span style={{ color: b.palette[1] }}>.</span>
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-cream-100/45">Aa Bb Cc · {b.fontLabel}</div>
          </div>

          {/* palette */}
          <div className="flex gap-1.5">
            {b.palette.map((p, i) => (
              <motion.div key={`${tab}-${i}`}
                className="h-9 flex-1 rounded-lg border border-white/10"
                style={{ background: p }}
                initial={reduce ? false : { y: 8, opacity: 0 }}
                animate={started || reduce ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.15 + i * 0.07, ease: EASE }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
