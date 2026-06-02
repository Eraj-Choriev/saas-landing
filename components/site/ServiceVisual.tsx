"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  Mic,
  Send,
  Globe,
  FileText,
  MessageSquare,
  Database,
  CreditCard,
  Users,
  Mail,
  Calendar,
  Megaphone,
  Sparkles,
  PenTool,
  Square,
  Type,
  type LucideIcon,
} from "lucide-react"
import { useI18n, type Lang } from "@/lib/i18n"

/**
 * ServiceVisual — per-service animated demo shown at the top of each modal.
 * Principle: don't illustrate the idea — show the product moving on its own.
 * index maps to service order in i18n (0 Telegram … 5 Design).
 * Pure DOM/SVG + framer-motion (no external libs, no media assets).
 *
 * Shared rules:
 *  - demos start ~300ms after the modal has faded in (`useStarted`)
 *  - looping demos pause after 12s of no pointer activity (`useActive`)
 *  - prefers-reduced-motion → render a sensible static final frame
 *  - NO manual controls: everything autoplays / auto-cycles
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
function useActive(timeout = 12000) {
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
    <IntegrationHub key="4" {...common} />,
    <DesignDemo key="5" {...common} />,
  ]

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden sm:h-[360px] lg:h-[400px]"
      style={{ background: BG }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_80%_at_50%_30%,#000,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
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
        "Зависит от вашего проекта и интеграций. Оставьте заявку — мы свяжемся и всё рассчитаем.",
        "It depends on your project and integrations. Leave a request — we'll get in touch and scope it.",
        "Вобаста ба лоиҳа ва интегратсияҳои шумо. Дархост гузоред — мо тамос мегирем ва ҳисоб мекунем."
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
    <div className="absolute inset-0 mx-auto flex max-w-[480px] flex-col px-4 pt-3 pb-3">
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

/* ════════════════ 2 · Websites — auto-rotating case browser ════════════════ */

function WebsitesDemo({ color, reduce, started, lang }: Demo) {
  const cases = [
    { name: "Northwind", url: "northwind.io", accent: "#ff5b24", lh: 99, lcp: "0.8s", cls: "0.01" },
    { name: "Lumen", url: "lumen.app", accent: "#a9caf9", lh: 98, lcp: "0.9s", cls: "0.02" },
    { name: "Voltage", url: "voltage.co", accent: "#d17a00", lh: 97, lcp: "1.0s", cls: "0.01" },
  ]
  const DUR = 4200
  const [i, setI] = React.useState(0)
  const active = useActive()
  React.useEffect(() => {
    if (reduce || !started || !active) return
    const id = setInterval(() => setI((v) => (v + 1) % cases.length), DUR)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, active])

  const c = cases[i]
  return (
    <div className="absolute inset-0 grid place-items-center px-5 sm:px-10">
      <div className="w-full max-w-[640px]">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#11161c] shadow-2xl">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/8 px-3.5 py-2.5">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.06] px-2.5 py-1 text-center font-mono text-[11px] text-cream-100/55">
              https://{c.url}
            </span>
          </div>
          {/* stylized site preview */}
          <div className="relative h-[160px] sm:h-[210px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -28 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-0"
                style={{ background: `radial-gradient(130% 90% at 82% 0%, ${c.accent}26, transparent 58%), #0e1318` }}
              >
                {/* fake site nav */}
                <div className="flex items-center justify-between px-4 pt-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-[5px]" style={{ background: c.accent }} />
                    <span className="font-display text-[12px] text-cream-50">{c.name}</span>
                  </div>
                  <div className="hidden gap-3 sm:flex">
                    {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-7 rounded-full bg-white/12" />)}
                  </div>
                </div>
                {/* hero */}
                <div className="grid grid-cols-5 gap-3 px-4 pt-5">
                  <div className="col-span-3">
                    <div className="h-3.5 w-4/5 rounded bg-white/18" />
                    <div className="mt-2 h-3.5 w-3/5 rounded bg-white/12" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-white/8" />
                    <div className="mt-3.5 inline-block h-6 w-28 rounded-full" style={{ background: c.accent }} />
                  </div>
                  <motion.div
                    className="col-span-2 rounded-xl"
                    style={{ background: `linear-gradient(140deg, ${c.accent}cc, ${c.accent}33)`, minHeight: 64 }}
                    animate={reduce ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                {/* card row */}
                <div className="hidden grid-cols-3 gap-2.5 px-4 pt-4 sm:grid">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="rounded-lg border border-white/8 bg-white/[0.04] p-2">
                      <span className="block h-2 w-2 rounded-full" style={{ background: c.accent }} />
                      <div className="mt-1.5 h-1.5 w-full rounded bg-white/12" />
                      <div className="mt-1 h-1.5 w-2/3 rounded bg-white/8" />
                    </div>
                  ))}
                </div>
                {/* metrics badge */}
                <div className="absolute bottom-3 right-3 rounded-lg border border-white/12 bg-ink/75 px-2.5 py-1.5 backdrop-blur">
                  <div className="font-mono text-[11px] font-semibold text-emerald-400">Lighthouse {c.lh}</div>
                  <div className="mt-0.5 font-mono text-[9.5px] text-cream-100/55">LCP {c.lcp} · CLS {c.cls}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* autoplay progress segments (non-interactive) */}
        <div className="mt-3.5 flex items-center justify-center gap-2">
          {cases.map((_, d) => (
            <div key={d} className="h-1 w-10 overflow-hidden rounded-full bg-white/12">
              {d === i && !reduce && (
                <motion.div
                  key={`fill-${i}`}
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DUR / 1000, ease: "linear" }}
                />
              )}
              {d === i && reduce && <div className="h-full w-full rounded-full" style={{ background: color }} />}
            </div>
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
  const bars = Array.from({ length: 40 })

  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="w-full max-w-[460px] text-center">
        {/* live waveform teaser */}
        <div className="mx-auto mb-6 flex h-16 items-center justify-center gap-[3px]">
          {bars.map((_, i) => {
            const base = 6 + Math.abs(Math.sin(i * 0.55)) * 26
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
          className="group mx-auto inline-flex items-center gap-2.5 rounded-full py-3 pl-3.5 pr-6 text-[15px] font-medium text-white transition-transform hover:scale-[1.03] active:scale-95"
          style={{ background: `linear-gradient(135deg, ${color}, #d17a00)`, boxShadow: `0 14px 36px -12px ${color}` }}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
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

        <p className="mx-auto mt-5 max-w-[320px] text-pretty text-[12.5px] leading-snug text-cream-100/50">
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

/* ════════════════ 4 · Connected Tools — auto-cycling flow with real icons ════════════════ */

type App = { label: string; Icon: LucideIcon; brand: string }

function FlowDemo({ color, reduce, started, lang }: Demo) {
  const scenarios: { name: string; apps: App[]; labels: string[] }[] = [
    {
      name: "E-commerce",
      apps: [
        { label: "Tilda", Icon: Globe, brand: "#ff5b24" },
        { label: "Notion", Icon: FileText, brand: "#e6e6e6" },
        { label: "Telegram", Icon: Send, brand: "#229ED9" },
        { label: "AmoCRM", Icon: Users, brand: "#2a9df4" },
      ],
      labels: [
        tr(lang, "Заявка", "Order", "Дархост"),
        tr(lang, "Запись", "Saved", "Сабт"),
        tr(lang, "Алерт", "Alert", "Огоҳӣ"),
        tr(lang, "Лид", "Lead", "Лид"),
      ],
    },
    {
      name: "SaaS",
      apps: [
        { label: "Webflow", Icon: Globe, brand: "#4353ff" },
        { label: "Stripe", Icon: CreditCard, brand: "#8b7bff" },
        { label: "Slack", Icon: MessageSquare, brand: "#ecb22e" },
        { label: "HubSpot", Icon: Users, brand: "#ff7a59" },
      ],
      labels: [
        tr(lang, "Регистрация", "Sign-up", "Бақайдгирӣ"),
        tr(lang, "Оплата", "Payment", "Пардохт"),
        tr(lang, "Алерт", "Notify", "Огоҳӣ"),
        tr(lang, "Контакт", "Contact", "Тамос"),
      ],
    },
    {
      name: "Lead-gen",
      apps: [
        { label: "Meta Ads", Icon: Megaphone, brand: "#1877f2" },
        { label: "Airtable", Icon: Database, brand: "#fcb400" },
        { label: "Email", Icon: Mail, brand: "#ff7a59" },
        { label: "Bitrix24", Icon: Users, brand: "#2fc7f7" },
      ],
      labels: [
        tr(lang, "Клик", "Click", "Клик"),
        tr(lang, "Захват", "Capture", "Захира"),
        tr(lang, "Письмо", "Email", "Мактуб"),
        tr(lang, "Воронка", "Funnel", "Воронка"),
      ],
    },
  ]

  // single ticker drives both the travelling packet (step) and scenario rotation
  const CYCLE = 6 // 0..3 connect, 4..5 hold then switch
  const [tick, setTick] = React.useState(0)
  const active = useActive()
  React.useEffect(() => {
    if (reduce || !started || !active) return
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [reduce, started, active])

  const tab = reduce ? 0 : Math.floor(tick / CYCLE) % scenarios.length
  const step = reduce ? 3 : Math.min(tick % CYCLE, 3)
  const sc = scenarios[tab]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-5 sm:px-10">
      {/* auto-rotating scenario label */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-100/40">
          {tr(lang, "Сценарий", "Scenario", "Сенария")}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={sc.name}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{ background: color, color: "#0b0f14" }}
          >
            {sc.name}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* nodes */}
      <div className="flex w-full max-w-[600px] items-start justify-between">
        {sc.apps.map((app, i) => {
          const on = step >= i
          return (
            <React.Fragment key={`${tab}-${app.label}`}>
              <div className="flex flex-col items-center gap-2" style={{ width: 92 }}>
                <motion.div
                  className="relative grid h-16 w-16 place-items-center rounded-2xl border"
                  animate={{
                    borderColor: on ? `${app.brand}` : "rgba(255,255,255,0.12)",
                    boxShadow: on ? `0 0 26px -6px ${app.brand}` : "0 0 0 0 transparent",
                    scale: step === i ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ background: "#11161c" }}
                >
                  <app.Icon
                    className="h-6 w-6 transition-colors duration-300"
                    style={{ color: on ? app.brand : "rgba(243,239,230,0.5)" }}
                    strokeWidth={1.75}
                  />
                </motion.div>
                <span className="text-center font-mono text-[10.5px] leading-tight text-cream-100/55">{app.label}</span>
                <AnimatePresence>
                  {on && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-[10.5px] font-medium leading-tight"
                      style={{ color }}
                    >
                      {sc.labels[i]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {i < sc.apps.length - 1 && (
                <div className="relative mt-8 h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <motion.div
                    className="absolute -top-[3px] h-2 w-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    animate={{
                      left: step === i ? ["0%", "100%"] : step > i ? "100%" : "0%",
                      opacity: step >= i ? 1 : 0,
                    }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

/* ════════════════ 5 · AI Integration — everything plugs into one hub ════════════════ */

function IntegrationHub({ color, reduce, started, lang }: Demo) {
  const nodes: { Icon: LucideIcon; label: string; brand: string }[] = [
    { Icon: Users, label: "CRM", brand: "#2a9df4" },
    { Icon: CreditCard, label: "Stripe", brand: "#8b7bff" },
    { Icon: MessageSquare, label: "Slack", brand: "#ecb22e" },
    { Icon: Database, label: "Data", brand: "#00b894" },
    { Icon: Mail, label: "Email", brand: "#ff7a59" },
    { Icon: Calendar, label: "Calendar", brand: "#e84393" },
  ]
  // elliptical layout in % of the demo box
  const pos = nodes.map((_, i) => {
    const a = ((-90 + i * (360 / nodes.length)) * Math.PI) / 180
    return { x: 50 + 33 * Math.cos(a), y: 52 + 34 * Math.sin(a) }
  })

  const MAX = nodes.length + 3 // connect one-by-one, then hold, then reset
  const [tick, setTick] = React.useState(reduce ? MAX : 0)
  const active = useActive()
  React.useEffect(() => {
    if (reduce || !started || !active) return
    const id = setInterval(() => setTick((t) => (t >= MAX ? 0 : t + 1)), 720)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, active])

  const allDone = tick >= nodes.length

  return (
    <div className="absolute inset-0">
      {/* connection lines + travelling data packets */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {pos.map((p, i) => {
          const on = tick > i
          return (
            <g key={i}>
              <motion.line
                x1={50} y1={52} x2={p.x} y2={p.y}
                stroke={on ? color : "rgba(255,255,255,0.12)"}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: on ? 1 : 0.001, opacity: on ? 0.7 : 0.25 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              {on && !reduce && (
                <motion.circle
                  r={1.4}
                  fill={color}
                  initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                  animate={{ cx: [p.x, 50], cy: [p.y, 52], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn", delay: i * 0.1 }}
                />
              )}
            </g>
          )
        })}
      </svg>

      {/* satellite nodes */}
      {nodes.map((n, i) => {
        const on = tick > i
        return (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          >
            <motion.div
              className="grid h-12 w-12 place-items-center rounded-2xl border sm:h-14 sm:w-14"
              animate={{
                borderColor: on ? n.brand : "rgba(255,255,255,0.12)",
                boxShadow: on ? `0 0 22px -4px ${n.brand}` : "0 0 0 0 transparent",
                scale: on ? 1 : 0.92,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ background: "#11161c" }}
            >
              <n.Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: on ? n.brand : "rgba(243,239,230,0.45)" }} strokeWidth={1.75} />
            </motion.div>
            <span className="font-mono text-[9.5px] text-cream-100/45">{n.label}</span>
          </div>
        )
      })}

      {/* central hub */}
      <div className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ top: "52%" }}>
        <div className="relative grid h-[68px] w-[68px] place-items-center sm:h-[76px] sm:w-[76px]">
          {/* rotating dashed orbit */}
          {!reduce && (
            <motion.span
              className="absolute inset-[-10px] rounded-full"
              style={{ border: `1px dashed ${color}55` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
          )}
          {/* pulse ring when fully integrated */}
          <AnimatePresence>
            {allDone && !reduce && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: `1.5px solid ${color}` }}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          {/* core */}
          <div
            className="grid h-full w-full place-items-center rounded-full text-white"
            style={{ background: `linear-gradient(140deg, ${color}, #d17a00)`, boxShadow: `0 0 40px -8px ${color}` }}
          >
            <Sparkles className="h-7 w-7" strokeWidth={1.75} />
          </div>
        </div>
        <div className="mt-3 font-display text-[15px] text-cream-50">Aqly</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={allDone ? "done" : "wiring"}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[10.5px]"
            style={{ color: allDone ? "#3FB950" : "rgba(243,239,230,0.5)" }}
          >
            {allDone
              ? tr(lang, "всё связано ✓", "all connected ✓", "ҳама пайваст ✓")
              : tr(lang, "подключение…", "connecting…", "пайвастшавӣ…")}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ════════════════ 6 · Design — animated cursor builds a brand ════════════════ */

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
    Mark: ({ c }) => <path d="M56 18 32 54h16l-6 28 26-40H52l4-24Z" fill={c} />,
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

// targets in % of the artboard — cursor visits each, "clicks", element materialises
const STEPS = [
  { to: [27, 50] as const, key: "mark" },
  { to: [70, 36] as const, key: "word" },
  { to: [66, 74] as const, key: "palette" },
]

function DesignDemo({ color, reduce, started, lang }: Demo) {
  const [brand, setBrand] = React.useState(0)
  const [p, setP] = React.useState(reduce ? STEPS.length - 1 : -1)
  const [click, setClick] = React.useState(0)
  const active = useActive()

  React.useEffect(() => {
    if (reduce) {
      setP(STEPS.length - 1)
      return
    }
    if (!started || !active) return
    setP(-1)
    let local = -1
    const id = setInterval(() => {
      local += 1
      if (local < STEPS.length) {
        setP(local)
        setClick((k) => k + 1)
      } else if (local >= STEPS.length + 1) {
        // finished + held → rebuild with next brand
        setBrand((b) => (b + 1) % BRANDS.length)
        local = -1
        setP(-1)
      }
    }, 1300)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, active])

  const b = BRANDS[brand]
  const show = (key: string) => {
    const idx = STEPS.findIndex((s) => s.key === key)
    return p >= idx
  }
  const inBoard = p >= 0 && p < STEPS.length
  const cursor = inBoard ? STEPS[p].to : ([8, 90] as const)
  const tagline = tr(lang, "Дизайн на ваших глазах", "Design, drawn live", "Дизайн дар пеши назар")

  return (
    <div className="absolute inset-0 grid place-items-center px-5 sm:px-10">
      <div className="w-full max-w-[620px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-100/40">{tagline}</span>
          <span className="font-mono text-[10.5px] text-cream-100/40" style={{ color }}>{b.fontLabel}</span>
        </div>

        {/* artboard */}
        <div
          className="relative h-[210px] overflow-hidden rounded-2xl border border-white/10 sm:h-[250px]"
          style={{
            background:
              "radial-gradient(110% 90% at 20% 0%, rgba(255,255,255,0.05), transparent 60%), #0e1318",
          }}
        >
          {/* design-tool left rail (decorative) */}
          <div className="absolute left-0 top-0 flex h-full w-9 flex-col items-center gap-3 border-r border-white/8 bg-white/[0.03] pt-4">
            {[PenTool, Square, Type].map((Ic, k) => (
              <Ic key={k} className="h-4 w-4" style={{ color: k === 0 ? color : "rgba(243,239,230,0.4)" }} strokeWidth={1.75} />
            ))}
          </div>

          {/* === logo tile (key 'mark') === */}
          <motion.div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04]"
            style={{ left: "27%", top: "50%", width: 116, height: 116 }}
            animate={{ opacity: show("mark") ? 1 : 0, scale: show("mark") ? 1 : 0.9 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <svg viewBox="0 0 100 100" className="h-12 w-12">
              <b.Mark c={b.palette[1]} />
            </svg>
            <span className="text-[16px] leading-none text-cream-50" style={{ fontFamily: b.font }}>{b.name}</span>
          </motion.div>

          {/* === wordmark (key 'word') === */}
          <motion.div
            className="absolute -translate-y-1/2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
            style={{ left: "48%", top: "36%", width: "44%" }}
            animate={{ opacity: show("word") ? 1 : 0, y: show("word") ? "-50%" : "-42%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="truncate text-[28px] leading-tight text-cream-50" style={{ fontFamily: b.font }}>
              {b.name}<span style={{ color: b.palette[1] }}>.</span>
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-cream-100/45">Aa Bb Cc 123</div>
          </motion.div>

          {/* === palette (key 'palette') === */}
          <div className="absolute flex gap-2" style={{ left: "48%", top: "63%", width: "44%" }}>
            {b.palette.map((sw, i) => (
              <motion.div
                key={`${brand}-${i}`}
                className="h-9 flex-1 rounded-lg border border-white/10"
                style={{ background: sw }}
                animate={{
                  opacity: show("palette") ? 1 : 0,
                  y: show("palette") ? 0 : 10,
                }}
                transition={{ duration: 0.35, delay: show("palette") ? i * 0.08 : 0, ease: EASE }}
              />
            ))}
          </div>

          {/* === animated cursor + click ripple === */}
          {!reduce && (
            <>
              <motion.div
                className="pointer-events-none absolute z-20"
                initial={false}
                animate={{ left: `${cursor[0]}%`, top: `${cursor[1]}%` }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ translateX: "-2px", translateY: "-2px" }}
              >
                {/* click ripple */}
                <AnimatePresence>
                  {inBoard && (
                    <motion.span
                      key={click}
                      className="absolute -left-1 -top-1 rounded-full"
                      style={{ width: 26, height: 26, border: `1.5px solid ${color}` }}
                      initial={{ scale: 0.2, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                {/* pointer */}
                <svg width="20" height="20" viewBox="0 0 20 20" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  <path d="M3 2l13 6.5-5.4 1.7-2.4 5.3z" fill="#fff" stroke="#0b0f14" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
