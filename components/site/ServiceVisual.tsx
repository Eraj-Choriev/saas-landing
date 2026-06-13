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
  Workflow,
  Zap,
  Puzzle,
  Check,
  Table,
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

type Msg = { id: number; from: "bot" | "user"; text: string; tw?: boolean; time?: string }

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
  // autoplay drives the thread until the visitor takes over
  const [autoOn, setAutoOn] = React.useState(true)
  const active = useActive()
  const idRef = React.useRef(0)
  const threadRef = React.useRef<HTMLDivElement>(null)
  const next = (m: Omit<Msg, "id" | "time">): Msg => {
    idRef.current += 1
    // fake telegram clock — a minute ticks by every couple of messages
    return { ...m, id: idRef.current, time: `12:${String(4 + Math.floor(idRef.current / 2)).padStart(2, "0")}` }
  }

  React.useEffect(() => {
    if (!reduce) return
    setMsgs([
      next({ from: "bot", text: greeting }),
      next({ from: "user", text: NODE.price.q }),
      next({ from: "bot", text: NODE.price.a }),
    ])
    setQuick(["booking", "abilities"])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, lang])

  /* scripted conversation — plays on loop until the visitor interacts:
     greet → abilities → price → book a call → pick a slot → confirmed →
     hold → wipe → replay. Paused while the tab/section is idle (useActive). */
  React.useEffect(() => {
    if (reduce || !started || !active || !autoOn) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (fn: () => void, ms: number) => {
      if (cancelled) return
      timers.push(setTimeout(() => { if (!cancelled) fn() }, ms))
    }

    const SCRIPT: Array<{ from: "bot" | "user"; text: string; quick?: string[] }> = [
      { from: "bot", text: greeting, quick: ["abilities", "price", "booking"] },
      { from: "user", text: NODE.abilities.q },
      { from: "bot", text: NODE.abilities.a, quick: NODE.abilities.next },
      { from: "user", text: NODE.price.q },
      { from: "bot", text: NODE.price.a, quick: NODE.price.next },
      { from: "user", text: NODE.booking.q },
      { from: "bot", text: NODE.booking.a, quick: ["s1", "s2", "s3"] },
      { from: "user", text: NODE.s2.q },
      { from: "bot", text: confirm },
    ]

    let i = 0
    setMsgs([])
    setQuick([])
    setTyping(false)
    idRef.current = 0

    const step = () => {
      if (cancelled) return
      if (i >= SCRIPT.length) {
        // hold on the confirmation, then wipe and replay — the loop
        later(() => {
          setMsgs([])
          setQuick([])
          idRef.current = 0
          i = 0
          later(step, 700)
        }, 3400)
        return
      }
      const s = SCRIPT[i]
      i += 1
      if (s.from === "bot") {
        setQuick([])
        setTyping(true)
        later(() => {
          setTyping(false)
          setMsgs((m) => [...m, next({ from: "bot", text: s.text, tw: true })])
          if (s.quick) later(() => setQuick(s.quick!), 500)
          // wait out the typewriter plus a beat to read
          later(step, 900 + s.text.length * 16)
        }, 800)
      } else {
        later(() => {
          setQuick([])
          setMsgs((m) => [...m, next({ from: "user", text: s.text })])
          later(step, 600)
        }, 1000)
      }
    }
    later(step, 400)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, active, autoOn, lang])

  React.useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [msgs, typing, quick, reduce])

  const busy = React.useRef(false)
  function pick(id: string) {
    if (busy.current) return
    setAutoOn(false) // visitor takes over — stop the scripted loop
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
    setAutoOn(false) // visitor takes over — stop the scripted loop
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
        {/* telegram-style day chip */}
        <div className="sticky top-0 z-[1] flex justify-center pb-1">
          <span className="rounded-full bg-white/[0.07] px-2.5 py-0.5 font-mono text-[9.5px] text-cream-100/45 backdrop-blur-sm">
            {tr(lang, "Сегодня", "Today", "Имрӯз")}
          </span>
        </div>
        {msgs.map((m) => (
          <Bubble key={m.id} side={m.from} color={color} time={m.time}>
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

function Bubble({ side, color, time, children }: { side: "bot" | "user"; color: string; time?: string; children: React.ReactNode }) {
  const isUser = side === "user"
  return (
    <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] px-3 py-1.5 text-[12.5px] leading-[1.4] ${isUser ? "rounded-2xl rounded-br-md text-white" : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] text-cream-50"}`}
        style={isUser ? { background: "#229ED9" } : undefined}>
        {children}
        {time && (
          <span className={`ml-1.5 inline-flex translate-y-[2px] items-center gap-[3px] whitespace-nowrap text-[9px] leading-none ${isUser ? "text-white/65" : "text-cream-100/35"}`}>
            {time}
            {isUser && (
              // double tick — "read", the telegram tell
              <svg width="13" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 4.2 3.4 6.8 8 1.4" />
                <path d="M6 4.2 8.4 6.8 13 1.4" />
              </svg>
            )}
          </span>
        )}
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

/* ════════════════ 2 · Websites — live build & ship ════════════════ */

// scripted fake cursor — glides between positions, ripples on click
function Cursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-30"
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 80, damping: 16, mass: 0.7 }}
    >
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]"
      >
        <path
          d="M2 2 L2 18 L6.6 13.6 L10.6 20.4 L13.2 19.2 L9.4 12.4 L16 12 Z"
          fill="#fff"
          stroke="#0b0f14"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
      <AnimatePresence>
        {clicking && (
          <motion.span
            className="absolute -left-1 -top-1 block h-7 w-7 rounded-full border-2 border-white"
            initial={{ scale: 0.25, opacity: 0.85 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// rAF count-up; resets to 0 then eases to `to` when `run` flips true
function CountUp({ to, run, className }: { to: number; run: boolean; className?: string }) {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!run) {
      setN(0)
      return
    }
    let raf = 0
    let start = 0
    const dur = 900
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min(1, (ts - start) / dur)
      const e = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * e))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <span className={className}>{n}</span>
}

// bento arrangements — one per case so the layout visibly changes each cycle
const BENTO_LAYOUTS = [
  ["col-span-2 h-16", "col-span-1 h-16", "col-span-1 h-14", "col-span-2 h-14"],
  ["col-span-1 h-[72px]", "col-span-2 h-[72px]", "col-span-2 h-14", "col-span-1 h-14"],
  ["col-span-3 h-12", "col-span-1 h-16", "col-span-1 h-16", "col-span-1 h-16"],
]

function WebsitesDemo({ color, reduce, started, lang }: Demo) {
  const cases = [
    { name: "Northwind", url: "northwind.io", accent: "#ff5b24", lh: 99, lcp: "0.8s", cls: "0.01", layout: 0 },
    { name: "Lumen", url: "lumen.app", accent: "#a9caf9", lh: 98, lcp: "0.9s", cls: "0.02", layout: 1 },
    { name: "Voltage", url: "voltage.co", accent: "#d17a00", lh: 97, lcp: "1.0s", cls: "0.01", layout: 2 },
  ]
  const DUR = 9200
  const active = useActive()
  const [cycle, setCycle] = React.useState(0)
  const i = cycle % cases.length
  const c = cases[i]
  const bento = BENTO_LAYOUTS[c.layout]

  // phase machine: 0 load · 1 build · 2 scroll · 3 ship
  const [phase, setPhase] = React.useState(reduce ? 3 : 0)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = React.useState(0)

  // measure how far the assembled page can scroll inside the viewport
  React.useLayoutEffect(() => {
    const measure = () => {
      const vp = viewportRef.current
      const ct = contentRef.current
      if (!vp || !ct) return
      setScroll(Math.max(0, ct.scrollHeight - vp.clientHeight))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [cycle])

  // drive the timeline; loop to the next case at DUR
  React.useEffect(() => {
    if (reduce || !started || !active) return
    setPhase(0)
    const t = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 3300),
      setTimeout(() => setPhase(3), 6700),
      setTimeout(() => setCycle((v) => v + 1), DUR),
    ]
    return () => t.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle, reduce, started, active])

  // cursor choreography per phase (px relative to the browser window)
  const cursorPos = [
    { x: 300, y: 16, click: false }, // address bar
    { x: 150, y: 150, click: true }, // click hero CTA
    { x: 588, y: 120, click: false }, // ride the scrollbar
    { x: 532, y: 214, click: true }, // tap the score badge
  ]
  const cur = cursorPos[phase]
  const [clicking, setClicking] = React.useState(false)
  React.useEffect(() => {
    if (reduce || !cur.click) {
      setClicking(false)
      return
    }
    const a = setTimeout(() => setClicking(true), 380)
    const b = setTimeout(() => setClicking(false), 920)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [phase, reduce, cur.click])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }

  const captions = [
    tr(lang, "Загрузка…", "Loading…", "Боргузорӣ…"),
    tr(lang, "Сборка макета", "Assembling layout", "Сохтани тарҳ"),
    tr(lang, "Прокрутка страницы", "Scrolling the page", "Варақгардонӣ"),
    tr(lang, `Готово · Lighthouse ${c.lh}`, `Shipped · Lighthouse ${c.lh}`, `Тайёр · Lighthouse ${c.lh}`),
  ]

  return (
    <div className="absolute inset-0 grid place-items-center px-5 sm:px-10">
      <div className="relative w-full max-w-[640px]">
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0e1318] shadow-2xl">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/8 px-3.5 py-2.5">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </span>
            <span className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-cream-100/60">
              <span className="text-cream-100/35">https://</span>
              {c.url}
              {phase === 0 && !reduce && (
                <motion.span
                  className="ml-0.5 inline-block h-3 w-px bg-cream-100/50"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </div>

          {/* viewport — the page being built scrolls inside here */}
          <div ref={viewportRef} className="relative h-[176px] sm:h-[226px]">
            <motion.div
              animate={{ y: phase >= 2 ? -scroll : 0 }}
              transition={{ duration: 3.0, ease: EASE }}
              style={{ background: `radial-gradient(120% 70% at 82% 0%, ${c.accent}1f, transparent 60%), #0e1318` }}
            >
              <motion.div
                ref={contentRef}
                variants={container}
                initial={reduce ? "show" : "hidden"}
                animate={phase >= 1 ? "show" : "hidden"}
                className="space-y-3 p-4"
              >
                {/* nav */}
                <motion.div variants={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3.5 w-3.5 rounded-[5px]" style={{ background: c.accent }} />
                    <span className="font-display text-[12px] text-cream-50">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="hidden gap-2.5 sm:flex">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-7 rounded-full bg-white/12" />
                      ))}
                    </span>
                    <span className="h-5 w-16 rounded-full" style={{ background: `${c.accent}33` }} />
                  </div>
                </motion.div>

                {/* hero */}
                <motion.div variants={item} className="grid grid-cols-5 gap-3">
                  <div className="col-span-3">
                    <div className="h-3.5 w-4/5 rounded bg-white/20" />
                    <div className="mt-2 h-3.5 w-3/5 rounded bg-white/12" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-white/8" />
                    <div className="mt-3 inline-block h-6 w-28 rounded-full" style={{ background: c.accent }} />
                  </div>
                  <motion.div
                    className="col-span-2 rounded-xl"
                    style={{ background: `linear-gradient(140deg, ${c.accent}cc, ${c.accent}33)`, minHeight: 70 }}
                    animate={reduce ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* bento grid — span pattern changes per case */}
                <motion.div variants={item} className="grid grid-cols-3 gap-2">
                  {bento.map((cls, d) => (
                    <motion.div
                      key={d}
                      className={`${cls} relative overflow-hidden rounded-lg border p-2`}
                      style={
                        d === 0
                          ? { borderColor: `${c.accent}40`, background: `linear-gradient(135deg, ${c.accent}26, ${c.accent}08)` }
                          : { borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.035)" }
                      }
                      animate={reduce || d !== 0 ? {} : { y: [0, -3, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="block h-2 w-2 rounded-full" style={{ background: c.accent }} />
                      <div className="mt-1.5 h-1.5 w-full rounded bg-white/12" />
                      <div className="mt-1 h-1.5 w-2/3 rounded bg-white/8" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* stats strip */}
                <motion.div variants={item} className="grid grid-cols-3 gap-2">
                  {[
                    { v: "+180%", k: tr(lang, "конверсия", "conversion", "табдил") },
                    { v: c.lcp, k: "LCP" },
                    { v: c.lh, k: "Lighthouse" },
                  ].map((s, d) => (
                    <div key={d} className="rounded-lg border border-white/8 bg-white/[0.03] px-2 py-1.5">
                      <div className="font-mono text-[12px] font-semibold text-cream-50">{s.v}</div>
                      <div className="text-[9px] text-cream-100/45">{s.k}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA band */}
                <motion.div
                  variants={item}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5"
                  style={{ background: `linear-gradient(120deg, ${c.accent}, ${c.accent}99)` }}
                >
                  <div>
                    <div className="h-2 w-24 rounded bg-black/25" />
                    <div className="mt-1 h-1.5 w-16 rounded bg-black/15" />
                  </div>
                  <span className="h-6 w-20 rounded-full bg-ink/85" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* scrollbar hint (rides down while scrolling) */}
            {!reduce && (
              <motion.div
                className="absolute right-1 top-1.5 w-1 rounded-full bg-white/20"
                style={{ height: 36 }}
                animate={{ y: phase >= 2 ? 110 : 0, opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 3.0, ease: EASE }}
              />
            )}

            {/* Lighthouse badge — pops in on ship, score counts up */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="absolute bottom-3 right-3 rounded-lg border border-emerald-400/30 bg-ink/80 px-2.5 py-1.5 backdrop-blur"
                >
                  <div className="font-mono text-[11px] font-semibold text-emerald-400">
                    Lighthouse {reduce ? c.lh : <CountUp to={c.lh} run={phase >= 3} />}
                  </div>
                  <div className="mt-0.5 font-mono text-[9.5px] text-cream-100/55">
                    LCP {c.lcp} · CLS {c.cls}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* scripted cursor */}
            {!reduce && <Cursor x={cur.x} y={cur.y} clicking={clicking} />}
          </div>
        </div>

        {/* phase caption + case dots */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[11px] text-cream-100/55"
            >
              {reduce ? captions[3] : captions[phase]}
            </motion.span>
          </AnimatePresence>
          <span className="flex items-center gap-1.5">
            {cases.map((_, d) => (
              <span
                key={d}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: d === i ? 16 : 6,
                  background: d === i ? color : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </span>
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
  type FlowApp = App & { event: string }
  type Scenario = { name: string; platform: App; trigger: FlowApp; dests: FlowApp[] }

  // real orchestrators people actually wire automations with — the platform
  // rotates with the scenario: n8n → Make → Zapier
  const scenarios: Scenario[] = [
    {
      name: "E-commerce",
      platform: { label: "n8n", Icon: Workflow, brand: "#EA4B71" },
      trigger: { label: "Tilda", Icon: Globe, brand: "#ff5b24", event: tr(lang, "Заявка", "Order", "Дархост") },
      dests: [
        { label: "Sheets", Icon: Table, brand: "#34a853", event: tr(lang, "Запись", "Row", "Сабт") },
        { label: "Telegram", Icon: Send, brand: "#229ED9", event: tr(lang, "Алерт", "Alert", "Огоҳӣ") },
        { label: "AmoCRM", Icon: Users, brand: "#2a9df4", event: tr(lang, "Лид", "Lead", "Лид") },
      ],
    },
    {
      name: "SaaS",
      platform: { label: "Make", Icon: Puzzle, brand: "#a259ff" },
      trigger: { label: "Stripe", Icon: CreditCard, brand: "#8b7bff", event: tr(lang, "Оплата", "Payment", "Пардохт") },
      dests: [
        { label: "Slack", Icon: MessageSquare, brand: "#ecb22e", event: tr(lang, "Нотиф", "Notify", "Огоҳӣ") },
        { label: "Notion", Icon: FileText, brand: "#e6e6e6", event: tr(lang, "Запись", "Page", "Сабт") },
        { label: "Gmail", Icon: Mail, brand: "#ea4335", event: tr(lang, "Чек", "Receipt", "Чек") },
      ],
    },
    {
      name: "Lead-gen",
      platform: { label: "Zapier", Icon: Zap, brand: "#FF4F00" },
      trigger: { label: "Meta Ads", Icon: Megaphone, brand: "#1877f2", event: tr(lang, "Лид", "Lead", "Лид") },
      dests: [
        { label: "Airtable", Icon: Database, brand: "#fcb400", event: tr(lang, "Захват", "Capture", "Захира") },
        { label: "Email", Icon: Mail, brand: "#ff7a59", event: tr(lang, "Письмо", "Email", "Мактуб") },
        { label: "Bitrix24", Icon: Users, brand: "#2fc7f7", event: tr(lang, "Сделка", "Deal", "Муомила") },
      ],
    },
  ]

  /* tick machine: 0 trigger fires · 1 packet → hub · 2/3/4 hub → dest 0/1/2 ·
     5–6 hold on the finished run, then the next scenario rebuilds the canvas */
  const CYCLE = 7
  const [tick, setTick] = React.useState(0)
  const active = useActive()
  React.useEffect(() => {
    if (reduce || !started || !active) return
    const id = setInterval(() => setTick((t) => t + 1), 1050)
    return () => clearInterval(id)
  }, [reduce, started, active])

  const tab = reduce ? 0 : Math.floor(tick / CYCLE) % scenarios.length
  const step = reduce ? 4 : Math.min(tick % CYCLE, 5)
  const runs = 1047 + Math.floor(tick / CYCLE)
  const sc = scenarios[tab]

  // canvas coordinates (600 × 240): trigger left, hub centre, dests fan right.
  // Wire ends tuck under the node boxes — nodes paint on top of the svg.
  const WIRES = [
    "M 100 120 C 170 120, 200 120, 268 120",
    "M 332 120 C 410 120, 420 42, 505 42",
    "M 332 120 C 400 120, 430 120, 505 120",
    "M 332 120 C 410 120, 420 198, 505 198",
  ]
  const hubBusy = !reduce && step >= 1 && step <= 4
  const packetWire = step >= 1 && step <= 4 ? step - 1 : -1 // which wire carries a packet now
  const wireLit = (w: number) => (reduce ? true : w === 0 ? step >= 1 : step >= w + 1)
  const destOn = (i: number) => (reduce ? true : step >= i + 2)

  const packetColor = packetWire === 0 ? sc.trigger.brand : packetWire > 0 ? sc.dests[packetWire - 1].brand : color

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 sm:px-10">
      {/* header: scenario pill · platform badge · live run counter */}
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
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
        <AnimatePresence mode="wait">
          <motion.span
            key={`run-${tab}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            className="font-mono text-[10px] tabular-nums text-cream-100/40"
          >
            {tr(lang, "запуск", "run", "иҷро")} #{runs}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* node canvas — wires behind, nodes on top. The whole canvas crossfades
          between scenarios so the rebuild never flashes (the old version
          remounted everything cold — read as flicker, especially on mobile) */}
      <div className="relative w-full max-w-[620px]" style={{ aspectRatio: "600/250" }}>
        <AnimatePresence mode="wait">
        <motion.div
          key={`canvas-${tab}`}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
        <svg viewBox="0 0 600 240" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          {WIRES.map((d, w) => (
            <g key={`${tab}-${w}`}>
              {/* base wire draws itself when the scenario mounts */}
              <motion.path
                d={d}
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="1.5"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: w * 0.1, ease: EASE }}
              />
              {/* lit overlay once data has flowed through */}
              <motion.path
                d={d}
                stroke={w === 0 ? sc.trigger.brand : sc.dests[w - 1].brand}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: wireLit(w) ? 1 : 0, opacity: wireLit(w) ? 0.55 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              {/* travelling packet — native SMIL motion along the bezier,
                  remounts (and so restarts) on every step change */}
              {!reduce && packetWire === w && (
                <circle key={`pkt-${tab}-${step}`} r="3.5" fill={packetColor} opacity="0.95">
                  <animateMotion dur="0.8s" repeatCount="1" fill="freeze" path={d} />
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* trigger node */}
        <div className="absolute flex w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: "13.3%", top: "50%" }}>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...SPRING, delay: 0.15 }}
            className="whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px]"
            style={{ background: `${sc.trigger.brand}22`, color: sc.trigger.brand, border: `1px solid ${sc.trigger.brand}44` }}
          >
            {sc.trigger.event}
          </motion.span>
          <motion.div
            key={`tn-${tab}`}
            className="relative grid h-14 w-14 place-items-center rounded-2xl border"
            style={{ background: "#11161c" }}
            initial={reduce ? false : { scale: 0.7, opacity: 0 }}
            animate={{
              scale: step === 0 && !reduce ? [1, 1.1, 1] : 1,
              opacity: 1,
              borderColor: sc.trigger.brand,
              boxShadow: `0 0 22px -6px ${sc.trigger.brand}`,
            }}
            transition={step === 0 && !reduce ? { duration: 0.6, times: [0, 0.4, 1] } : SPRING}
          >
            <sc.trigger.Icon className="h-5 w-5" style={{ color: sc.trigger.brand }} strokeWidth={1.75} />
            {/* firing ping — keyed per scenario (not per tick) so it fires once,
                no re-mount strobing */}
            {!reduce && step === 0 && (
              <motion.span
                key={`ping-${tab}`}
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1.5px solid ${sc.trigger.brand}` }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.45, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </motion.div>
          <span className="font-mono text-[10px] leading-tight text-cream-100/55">{sc.trigger.label}</span>
        </div>

        {/* hub node — the orchestrator platform */}
        <div className="absolute flex w-[110px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: "50%", top: "50%" }}>
          <motion.div
            key={`hub-${tab}`}
            className="relative grid h-[68px] w-[68px] place-items-center rounded-2xl border-2"
            style={{ background: "#11161c" }}
            initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              borderColor: sc.platform.brand,
              boxShadow: hubBusy
                ? `0 0 34px -4px ${sc.platform.brand}, inset 0 0 18px -8px ${sc.platform.brand}`
                : `0 0 22px -8px ${sc.platform.brand}`,
            }}
            transition={SPRING}
          >
            {/* the engine spins while executing */}
            <motion.span
              className="grid place-items-center"
              animate={hubBusy ? { rotate: 360 } : { rotate: 0 }}
              transition={hubBusy ? { duration: 2.4, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
            >
              <sc.platform.Icon className="h-7 w-7" style={{ color: sc.platform.brand }} strokeWidth={1.75} />
            </motion.span>
            {/* busy ring */}
            {hubBusy && (
              <motion.span
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1.5px solid ${sc.platform.brand}` }}
                animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </motion.div>
          <span className="font-mono text-[11px] font-semibold leading-tight" style={{ color: sc.platform.brand }}>
            {sc.platform.label}
          </span>
        </div>

        {/* destination nodes — stacked label under the icon so nothing clips
            at the right edge on narrow screens */}
        {sc.dests.map((d, i) => {
          const on = destOn(i)
          const top = ["17.5%", "50%", "82.5%"][i]
          return (
            <div
              key={`${tab}-d${i}`}
              className="absolute flex w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[3px] text-center"
              style={{ left: "88%", top }}
            >
              <motion.div
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
                style={{ background: "#11161c" }}
                initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  borderColor: on ? d.brand : "rgba(255,255,255,0.12)",
                  boxShadow: on ? `0 0 18px -6px ${d.brand}` : "0 0 0 0 transparent",
                }}
                transition={{ ...SPRING, delay: reduce ? 0 : 0.1 + i * 0.07 }}
              >
                <d.Icon className="transition-colors duration-300" style={{ color: on ? d.brand : "rgba(243,239,230,0.45)", height: 18, width: 18 }} strokeWidth={1.75} />
                {/* delivered tick */}
                <AnimatePresence>
                  {on && (
                    <motion.span
                      key={`ok-${tab}-${i}`}
                      className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-ink"
                      initial={reduce ? false : { scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={SPRING}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="w-full truncate font-mono text-[9.5px] leading-tight text-cream-100/55">{d.label}</div>
              {/* fixed-height slot — event fades in without shifting layout */}
              <div className="h-[14px] w-full">
                <motion.div
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="truncate text-[10px] font-medium leading-tight"
                  style={{ color: d.brand }}
                >
                  {d.event}
                </motion.div>
              </div>
            </div>
          )
        })}
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ════════════════ 5 · AI Integration — everything plugs into one hub ════════════════ */

function IntegrationHub({ reduce, started, lang }: Demo) {
  const C = {
    bg: "#141311",
    surface: "#1E1D1A",
    border: "#2A2926",
    line: "#333130",
    accent: "#C4704B",
    text: "#E8E6E2",
    dim: "#9C9890",
    success: "#4ADE80",
  }
  const font = "var(--font-dmsans), var(--font-onest), ui-sans-serif, system-ui, sans-serif"

  // Three business moments, one shape: task in → AI core → result out.
  // Far simpler than the old radial node map — reads as a story, not a diagram.
  const SCENARIOS = [
    {
      label: tr(lang, "Чат-поддержка 24/7", "Chat support 24/7", "Дастгирии чат 24/7"),
      InIcon: MessageSquare,
      inTitle: tr(lang, "«Где мой заказ?»", "“Where is my order?”", "«Фармоиши ман куҷост?»"),
      inSub: tr(lang, "клиент · 02:14 ночи", "customer · 2:14 am", "мизоҷ · 02:14 шаб"),
      OutIcon: Check,
      outTitle: tr(lang, "Ответ отправлен", "Reply sent", "Ҷавоб фиристода шуд"),
      outSub: tr(lang, "за 3 секунды", "in 3 seconds", "дар 3 сония"),
    },
    {
      label: tr(lang, "Генерация контента", "Content generation", "Тавлиди контент"),
      InIcon: Database,
      inTitle: tr(lang, "Товар без описания", "Product missing copy", "Маҳсулот бе тавсиф"),
      inSub: tr(lang, "каталог · 38 позиций", "catalog · 38 items", "феҳрист · 38 мавқеъ"),
      OutIcon: FileText,
      outTitle: tr(lang, "Описания готовы", "Copy generated", "Тавсифҳо тайёр"),
      outSub: tr(lang, "SEO-тексты для всех", "SEO copy for all", "матнҳои SEO барои ҳама"),
    },
    {
      label: tr(lang, "AI-копайлот для команды", "AI copilot for the team", "AI-ёрдамчӣ барои даста"),
      InIcon: Users,
      inTitle: tr(lang, "«Продажи за июнь?»", "“Sales for June?”", "«Фурӯши июн чӣ қадар?»"),
      inSub: tr(lang, "вопрос менеджера", "manager’s question", "саволи менеҷер"),
      OutIcon: Table,
      outTitle: tr(lang, "Отчёт собран", "Report ready", "Ҳисобот тайёр"),
      outSub: tr(lang, "цифры и динамика", "numbers and trends", "рақамҳо ва динамика"),
    },
  ]

  // stack vertically when the panel is too narrow for three stations in a row
  const boxRef = React.useRef<HTMLDivElement>(null)
  const [w, setW] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setW(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const vertical = w > 0 && w < 480

  const active = useActive()
  // phase: 0 task appears → 1 dot travels in → 2 core thinks → 3 dot travels
  // out → 4 result lands; then the next scenario crossfades in
  const [scn, setScn] = React.useState(0)
  const [phase, setPhase] = React.useState(reduce ? 4 : 0)
  React.useEffect(() => {
    if (reduce) {
      setPhase(4)
      return
    }
    if (!started || !active) return
    setPhase(0)
    const T = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1450),
      setTimeout(() => setPhase(3), 2750),
      setTimeout(() => setPhase(4), 3600),
      setTimeout(() => setScn((s) => (s + 1) % SCENARIOS.length), 6200),
    ]
    return () => T.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scn, reduce, started, active])

  const S = SCENARIOS[scn]
  const thinking = phase === 2 || phase === 3
  const done = phase >= 4

  const card = (on: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: vertical ? "min(78%, 250px)" : 168,
    padding: "10px 12px",
    borderRadius: 12,
    background: C.surface,
    border: `1.5px solid ${on ? C.accent : C.border}`,
    transition: "border-color 0.3s ease, opacity 0.3s ease",
  })
  const iconTile = (on: boolean): React.CSSProperties => ({
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    borderRadius: 9,
    flexShrink: 0,
    color: on ? C.accent : C.dim,
    background: C.bg,
    border: `1px solid ${on ? C.accent : C.border}`,
    transition: "color 0.3s ease, border-color 0.3s ease",
  })

  // connector with a data dot that travels across during its phase
  const Connector = ({ run, passed }: { run: boolean; passed: boolean }) => (
    <div
      className="relative"
      style={
        vertical
          ? { width: 1.5, flex: 1, minHeight: 18, background: passed || run ? C.accent : C.line, transition: "background 0.4s ease" }
          : { height: 1.5, flex: 1, minWidth: 24, background: passed || run ? C.accent : C.line, transition: "background 0.4s ease" }
      }
      aria-hidden
    >
      {run && !reduce && (
        <motion.span
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 7,
            background: C.accent,
            boxShadow: `0 0 10px ${C.accent}`,
            ...(vertical ? { left: -2.75, top: 0 } : { top: -2.75, left: 0 }),
          }}
          animate={vertical ? { top: ["0%", "96%"] } : { left: ["0%", "96%"] }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        />
      )}
    </div>
  )

  return (
    <div className="absolute inset-0" style={{ fontFamily: font }}>
      {/* opaque schematic ground — covers the parent gradient/glow */}
      <div className="absolute inset-0" style={{ background: C.bg }} aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.4,
        }}
        aria-hidden
      />

      <div ref={boxRef} className="relative mx-auto flex h-full w-full flex-col" style={{ maxWidth: 640 }}>
        {/* scenario label — what business job is on the belt right now */}
        <div className="flex items-center justify-center" style={{ paddingTop: vertical ? 10 : 18 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={scn}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                border: `1px solid ${C.border}`,
                background: C.surface,
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: C.text,
              }}
            >
              <Zap size={12} color={C.accent} aria-hidden />
              {S.label}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the belt: task → AI core → result */}
        <div
          className="flex flex-1 items-center"
          style={{
            flexDirection: vertical ? "column" : "row",
            padding: vertical ? "12px 0 14px" : "0 22px",
            gap: vertical ? 0 : 0,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scn}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex w-full flex-1 items-center"
              style={{ flexDirection: vertical ? "column" : "row" }}
            >
              {/* incoming task */}
              <motion.div
                initial={reduce ? false : { opacity: 0, [vertical ? "y" : "x"]: -12 }}
                animate={phase >= 0 ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.4, ease: EASE }}
                style={card(phase >= 1 && !done)}
              >
                <span style={iconTile(phase >= 1 && !done)}>
                  <S.InIcon size={16} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>
                    {S.inTitle}
                  </span>
                  <span style={{ display: "block", fontSize: 11, color: C.dim, marginTop: 1 }}>{S.inSub}</span>
                </span>
              </motion.div>

              <Connector run={phase === 1} passed={phase >= 2} />

              {/* AI core */}
              <div className="flex flex-col items-center" style={{ padding: vertical ? "0" : "0 4px" }}>
                <div
                  className="relative grid place-items-center rounded-full"
                  style={{
                    width: vertical ? 58 : 72,
                    height: vertical ? 58 : 72,
                    background: C.surface,
                    border: `1.5px solid ${thinking || done ? C.accent : C.border}`,
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {thinking && !reduce && (
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${C.accent}`, animation: "imap-pulse 1.4s ease-out infinite" }}
                      aria-hidden
                    />
                  )}
                  <motion.svg
                    width={vertical ? 24 : 30}
                    height={vertical ? 24 : 30}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    animate={thinking && !reduce ? { rotate: 180, scale: [1, 1.12, 1] } : { rotate: 0 }}
                    transition={{ duration: 1.1, ease: EASE }}
                  >
                    <path
                      d="M12 2 C 13 9 15 11 22 12 C 15 13 13 15 12 22 C 11 15 9 13 2 12 C 9 11 11 9 12 2 Z"
                      fill={thinking || done ? C.accent : C.dim}
                      style={{ transition: "fill 0.3s ease" }}
                    />
                  </motion.svg>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  style={{ marginTop: 7, fontSize: 11, color: C.dim, whiteSpace: "nowrap" }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      display: "inline-block",
                      background: thinking ? C.accent : C.success,
                      transition: "background 0.3s ease",
                    }}
                  />
                  {thinking
                    ? tr(lang, "AI обрабатывает…", "AI is working…", "AI кор карда истодааст…")
                    : `Aqly AI · Claude`}
                </div>
              </div>

              <Connector run={phase === 3} passed={phase >= 4} />

              {/* result */}
              <motion.div
                animate={{ opacity: done ? 1 : 0.45, scale: !reduce && done ? [0.96, 1] : 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={card(done)}
              >
                <span style={iconTile(done)}>
                  {done ? <S.OutIcon size={16} color={C.success} /> : <S.OutIcon size={16} />}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: done ? C.text : C.dim, lineHeight: 1.3, transition: "color 0.3s ease" }}>
                    {S.outTitle}
                  </span>
                  <span style={{ display: "block", fontSize: 11, color: C.dim, marginTop: 1 }}>{S.outSub}</span>
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* scenario progress dots */}
        <div className="flex items-center justify-center gap-1.5" style={{ paddingBottom: vertical ? 10 : 16 }}>
          {SCENARIOS.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === scn ? 16 : 5,
                height: 5,
                borderRadius: 999,
                background: i === scn ? C.accent : C.line,
                transition: "all 0.4s ease",
              }}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════ 6 · Design — cursor draws a brand, ends on a poster ════════════════ */

// shared stroke-draw helpers: marks render as line-art that draws itself in
const strokeP = (c: string) => ({
  stroke: c,
  strokeWidth: 6,
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
})
const drawT = (draw: boolean, delay = 0) => ({
  initial: { pathLength: 0 } as const,
  animate: { pathLength: draw ? 1 : 0 },
  transition: { duration: 0.85, delay: draw ? delay : 0, ease: EASE },
})

type Brand = {
  name: string
  tagline: string
  font: string
  fontStyle?: "italic" | "normal"
  fontLabel: string
  ink: string // primary brand color
  palette: string[] // solid chips
  gradient: string // the "grade" — animated mesh
  Mark: ({ c, draw }: { c: string; draw: boolean }) => JSX.Element
}

const BRANDS: Brand[] = [
  {
    name: "Lumio",
    tagline: "Clarity, in focus.",
    font: "var(--font-instrument), serif",
    fontStyle: "italic",
    fontLabel: "Instrument Serif",
    ink: "#7fb2f0",
    palette: ["#0b1c30", "#2f6fb0", "#a9caf9", "#f3efe6"],
    gradient: "linear-gradient(120deg,#0b2a4a,#2f6fb0 45%,#a9caf9)",
    Mark: ({ c, draw }) => (
      <>
        <motion.circle cx="38" cy="52" r="22" {...strokeP(c)} {...drawT(draw)} />
        <motion.circle cx="62" cy="52" r="22" strokeOpacity={0.55} {...strokeP(c)} {...drawT(draw, 0.18)} />
      </>
    ),
  },
  {
    name: "Volt",
    tagline: "Energy, delivered.",
    font: "var(--font-bricolage), sans-serif",
    fontLabel: "Bricolage Grotesque",
    ink: "#ff7a3c",
    palette: ["#2a1000", "#ff5b24", "#ffb061", "#f3efe6"],
    gradient: "linear-gradient(120deg,#3a1500,#ff5b24 50%,#ffb061)",
    Mark: ({ c, draw }) => (
      <motion.path d="M58 12 30 56h18l-8 32 32-46H56l8-30Z" {...strokeP(c)} {...drawT(draw)} />
    ),
  },
  {
    name: "Bloom",
    tagline: "Grow in full colour.",
    font: "var(--font-sans), sans-serif",
    fontLabel: "Manrope",
    ink: "#e6b51e",
    palette: ["#1d2a00", "#d4a017", "#7bd389", "#f3efe6"],
    gradient: "linear-gradient(120deg,#23330a,#d4a017 50%,#7bd389)",
    Mark: ({ c, draw }) => (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.ellipse
            key={i}
            cx="50"
            cy="50"
            rx="9"
            ry="24"
            transform={`rotate(${i * 60} 50 50)`}
            strokeOpacity={i % 2 ? 0.5 : 1}
            {...strokeP(c)}
            {...drawT(draw, i * 0.08)}
          />
        ))}
      </>
    ),
  },
  {
    name: "Helix",
    tagline: "Systems, intertwined.",
    font: "var(--font-mono), monospace",
    fontLabel: "Geist Mono",
    ink: "#3fd9cf",
    palette: ["#06222b", "#0e9f9f", "#7c5cff", "#f3efe6"],
    gradient: "linear-gradient(120deg,#06222b,#0e9f9f 48%,#7c5cff)",
    Mark: ({ c, draw }) => (
      <>
        <motion.path d="M42 14 C 72 36, 28 50, 58 72 C 70 80, 70 80, 62 88" {...strokeP(c)} {...drawT(draw)} />
        <motion.path d="M58 14 C 28 36, 72 50, 42 72 C 30 80, 30 80, 38 88" strokeOpacity={0.55} {...strokeP(c)} {...drawT(draw, 0.18)} />
      </>
    ),
  },
  {
    name: "Atlas",
    tagline: "Brands that travel.",
    font: "var(--font-playfair), serif",
    fontStyle: "italic",
    fontLabel: "Playfair Display",
    ink: "#ff8a5c",
    palette: ["#2a0d08", "#ff5b24", "#f3c9a0", "#f3efe6"],
    gradient: "linear-gradient(120deg,#2a0d08,#ff5b24 52%,#f3c9a0)",
    Mark: ({ c, draw }) => (
      <>
        <motion.circle cx="50" cy="50" r="30" {...strokeP(c)} {...drawT(draw)} />
        <motion.ellipse cx="50" cy="50" rx="13" ry="30" strokeOpacity={0.55} {...strokeP(c)} {...drawT(draw, 0.16)} />
        <motion.path d="M20 50 H80" strokeOpacity={0.55} {...strokeP(c)} {...drawT(draw, 0.3)} />
      </>
    ),
  },
]

// targets in % of the artboard — cursor visits each, "clicks", element materialises
const STEPS = [
  { to: [29, 27] as const, key: "mark" },
  { to: [29, 56] as const, key: "type" },
  { to: [29, 85] as const, key: "grade" },
  { to: [76, 50] as const, key: "poster" },
]

/** Per-character staggered reveal — the "type being set" moment. */
function Chars({ text, delay = 0, reduce }: { text: string; delay?: number; reduce: boolean }) {
  if (reduce) return <>{text}</>
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.38, delay: delay + i * 0.05, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </>
  )
}

/** Figma-style selection: dashed marquee + four corner handles. Shown only
 *  while its element is the one being placed, like a live editor. */
function SelBox({ active, c }: { active: boolean; c: string }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          className="pointer-events-none absolute -inset-2 z-10 rounded-lg"
          style={{ border: `1px dashed ${c}AA` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.32, ease: EASE }}
          aria-hidden
        >
          {(["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-left-[3px] -bottom-[3px]", "-right-[3px] -bottom-[3px]"] as const).map((pos) => (
            <span
              key={pos}
              className={`absolute h-[7px] w-[7px] rounded-[2px] bg-white ${pos}`}
              style={{ boxShadow: `0 0 0 1.5px ${c}` }}
            />
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/** Snap guides — a crosshair of brand-tinted rules flashes through the spot
 *  where the current element just landed. */
function SnapGuides({ x, y, show, c }: { x: string; y: string; show: boolean; c: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          <span
            className="absolute inset-y-0 w-px"
            style={{ left: x, background: `linear-gradient(180deg,transparent,${c}55 30%,${c}55 70%,transparent)` }}
          />
          <span
            className="absolute left-9 right-0 h-px"
            style={{ top: y, background: `linear-gradient(90deg,transparent,${c}55 30%,${c}55 70%,transparent)` }}
          />
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/** Ghost wireframe — dashed placeholder hinting where the next element will
 *  land, so the artboard reads as a planned layout, not dead space. */
function Ghost({ shown, style, rounded = "rounded-2xl" }: { shown: boolean; style: React.CSSProperties; rounded?: string }) {
  return (
    <motion.span
      className={`pointer-events-none absolute border border-dashed border-white/10 ${rounded}`}
      style={style}
      animate={{ opacity: shown ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      aria-hidden
    />
  )
}

const SPRING = { type: "spring", stiffness: 320, damping: 22, mass: 0.7 } as const

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
      } else if (local >= STEPS.length + 2) {
        // finished + held on the poster → rebuild with a fresh brand.
        // +2 step keeps the cycle from repeating the same logo each time.
        setBrand((bb) => (bb + 2) % BRANDS.length)
        local = -1
        setP(-1)
      }
    }, 1150)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, started, active])

  const b = BRANDS[brand]
  const fam = { fontFamily: b.font, fontStyle: b.fontStyle ?? "normal" }
  const show = (key: string) => p >= STEPS.findIndex((s) => s.key === key)
  const inBoard = p >= 0 && p < STEPS.length
  const cursor = inBoard ? STEPS[p].to : ([8, 92] as const)

  const labels = [
    tr(lang, "Рисую логотип", "Drawing the mark", "Расми лого"),
    tr(lang, "Ставлю шрифт", "Setting the type", "Интихоби шрифт"),
    tr(lang, "Подбираю цвета", "Grading colours", "Интихоби рангҳо"),
    tr(lang, "Собираю постер", "Composing the poster", "Сохтани постер"),
  ]
  const tagline = tr(lang, "Дизайн на ваших глазах", "Design, drawn live", "Дизайн дар пеши назар")

  return (
    <div className="absolute inset-0 grid place-items-center px-5 sm:px-10">
      <div className="w-full max-w-[640px]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-100/40">{tagline}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={b.fontLabel}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[10.5px]"
              style={{ color: b.ink }}
            >
              {b.fontLabel}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* artboard */}
        <div
          className="relative h-[218px] overflow-hidden rounded-2xl border border-white/10 sm:h-[258px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px) 0 0 / 18px 18px, radial-gradient(120% 90% at 18% 0%, rgba(255,255,255,0.05), transparent 60%), #0e1318",
          }}
        >
          {/* artboard caption — sells the "real canvas" */}
          <span className="absolute right-2.5 top-2 z-[2] font-mono text-[8.5px] tracking-[0.14em] text-cream-100/25">
            1080 × 1350 · 100%
          </span>

          {/* tool rail — ink-tinted glow slides between tools (shared element) */}
          <div className="absolute left-0 top-0 z-10 flex h-full w-9 flex-col items-center gap-2 border-r border-white/8 bg-white/[0.03] pt-3">
            {[PenTool, Type, Square, Sparkles].map((Ic, k) => {
              const on = p === k || (p >= STEPS.length && k === STEPS.length - 1)
              return (
                <span key={k} className="relative grid h-7 w-7 place-items-center">
                  {on && (
                    <motion.span
                      layoutId="design-tool-glow"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: `${b.ink}26`, boxShadow: `inset 0 0 0 1px ${b.ink}44` }}
                      transition={SPRING}
                    />
                  )}
                  <motion.span animate={{ scale: on ? 1.12 : 1 }} transition={SPRING} className="relative">
                    <Ic className="h-4 w-4" style={{ color: on ? b.ink : "rgba(243,239,230,0.35)" }} strokeWidth={1.75} />
                  </motion.span>
                </span>
              )
            })}
          </div>

          {/* ghost wireframes — the planned layout, fading out as real elements land */}
          {!reduce && (
            <>
              <Ghost shown={show("mark")} style={{ left: "29%", top: "27%", width: 116, height: 100, transform: "translate(-50%,-50%)" }} />
              <Ghost shown={show("type")} rounded="rounded-xl" style={{ left: "29%", top: "56%", width: "46%", maxWidth: 250, height: 58, transform: "translate(-50%,-50%)" }} />
              <Ghost shown={show("grade")} rounded="rounded-lg" style={{ left: "29%", top: "85%", width: "46%", maxWidth: 250, height: 48, transform: "translate(-50%,-50%)" }} />
              <Ghost shown={show("poster")} rounded="rounded-xl" style={{ right: 12, top: "50%", width: "38%", maxWidth: 196, height: "82%", transform: "translateY(-50%)" }} />
            </>
          )}

          {/* snap guides flash where the current element lands */}
          {!reduce && inBoard && (
            <SnapGuides x={`${STEPS[p].to[0]}%`} y={`${STEPS[p].to[1]}%`} show c={b.ink} />
          )}

          {/* ── LEFT COLUMN: mark · type · grade ── */}

          {/* logo tile — springs in, line-art mark draws itself, marquee while active */}
          <motion.div
            className="absolute flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04]"
            style={{ left: "29%", top: "27%", width: 116, height: 100, x: "-50%", y: "-50%" }}
            animate={{ opacity: show("mark") ? 1 : 0, scale: show("mark") ? 1 : 0.8 }}
            transition={show("mark") ? SPRING : { duration: 0.3, ease: EASE }}
          >
            <SelBox active={!reduce && inBoard && STEPS[p].key === "mark"} c={b.ink} />
            <svg viewBox="0 0 100 100" className="h-11 w-11" key={`mark-${brand}`}>
              <b.Mark c={b.ink} draw={show("mark")} />
            </svg>
            <span className="text-[15px] leading-none text-cream-50" style={fam}>
              {show("mark") && <Chars key={`mn-${brand}`} text={b.name} delay={0.5} reduce={reduce} />}
            </span>
          </motion.div>

          {/* type specimen — the name sets itself letter by letter */}
          <motion.div
            className="absolute rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5"
            style={{ left: "29%", top: "56%", width: "46%", maxWidth: 250, x: "-50%", y: "-50%" }}
            animate={{ opacity: show("type") ? 1 : 0, scale: show("type") ? 1 : 0.92 }}
            transition={show("type") ? SPRING : { duration: 0.3, ease: EASE }}
          >
            <SelBox active={!reduce && inBoard && STEPS[p].key === "type"} c={b.ink} />
            <div className="truncate text-[30px] leading-none text-cream-50" style={fam}>
              {show("type") && (
                <>
                  <Chars key={`tn-${brand}`} text={b.name} delay={0.15} reduce={reduce} />
                  <motion.span
                    key={`dot-${brand}`}
                    style={{ color: b.ink }}
                    initial={reduce ? false : { opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...SPRING, delay: 0.15 + b.name.length * 0.05 + 0.1 }}
                    className="inline-block"
                  >
                    .
                  </motion.span>
                </>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[9.5px] text-cream-100/45">
              <span>Aa Gg Qq 123</span>
              <span style={{ color: b.ink }}>{b.fontLabel}</span>
            </div>
          </motion.div>

          {/* grade bar wipes in; swatches drop like paint chips */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "29%", top: "85%", width: "46%", maxWidth: 250 }}>
            <SelBox active={!reduce && inBoard && STEPS[p].key === "grade"} c={b.ink} />
            <motion.div
              className="h-7 w-full overflow-hidden rounded-lg border border-white/12"
              style={{ transformOrigin: "left center" }}
              animate={{ opacity: show("grade") ? 1 : 0, scaleX: show("grade") ? 1 : 0.2 }}
              transition={show("grade") ? SPRING : { duration: 0.3, ease: EASE }}
            >
              <motion.div
                key={`grade-${brand}`}
                className="h-full w-full"
                style={{ backgroundImage: b.gradient, backgroundSize: "240% 240%" }}
                animate={reduce ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <div className="mt-1.5 flex gap-1.5">
              {b.palette.map((sw, i) => (
                <motion.div
                  key={`${brand}-${i}`}
                  className="h-3.5 flex-1 rounded-[5px] border border-white/10"
                  style={{ background: sw }}
                  animate={
                    show("grade")
                      ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                      : { opacity: 0, y: 10, scale: 0.6, rotate: -8 }
                  }
                  transition={show("grade") ? { ...SPRING, delay: 0.12 + i * 0.07 } : { duration: 0.25, ease: EASE }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: the poster — composes layer by layer, the payoff ── */}
          <motion.div
            className="absolute right-3 z-[5] overflow-hidden rounded-xl border border-white/15"
            style={{
              top: "50%",
              width: "38%",
              maxWidth: 196,
              height: "82%",
              boxShadow: `0 24px 60px -24px rgba(0,0,0,0.8), 0 12px 48px -18px ${b.ink}55`,
            }}
            animate={{
              opacity: show("poster") ? 1 : 0,
              y: show("poster") ? "-50%" : "-42%",
              scale: show("poster") ? 1 : 0.9,
              rotate: show("poster") ? 0 : -4,
            }}
            transition={show("poster") ? { type: "spring", stiffness: 200, damping: 20, mass: 0.9 } : { duration: 0.35, ease: EASE }}
          >
            <SelBox active={!reduce && inBoard && STEPS[p].key === "poster"} c="#ffffff" />
            {/* animated gradient ground */}
            <motion.div
              key={`poster-${brand}`}
              className="absolute inset-0"
              style={{ backgroundImage: b.gradient, backgroundSize: "200% 200%" }}
              animate={reduce ? {} : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-black/20" />
            {/* oversized mark watermark */}
            <svg viewBox="0 0 100 100" className="absolute -right-5 -top-6 h-28 w-28 opacity-25" key={`wm-${brand}`}>
              <b.Mark c="#ffffff" draw={show("poster")} />
            </svg>
            {/* poster content — staggered layer assembly, keyed so each brand re-runs */}
            {show("poster") && (
              <div key={`pc-${brand}`} className="absolute inset-0 flex flex-col justify-between p-3.5">
                <motion.div
                  className="flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/75"
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
                >
                  <span>Studio</span>
                  <span>’26</span>
                </motion.div>
                <div>
                  {/* headline rises from under a mask — print-reveal moment */}
                  <div className="overflow-hidden">
                    <motion.div
                      className="leading-[0.92] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                      style={{ ...fam, fontSize: 38 }}
                      initial={reduce ? false : { y: "112%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                    >
                      {b.name}
                    </motion.div>
                  </div>
                  <motion.div
                    className="mt-1.5 max-w-[150px] text-[10px] leading-snug text-white/85"
                    style={fam}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.42, ease: EASE }}
                  >
                    {b.tagline}
                  </motion.div>
                </div>
                <div className="flex items-center gap-1">
                  {b.palette.slice(1).map((sw, i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-6 rounded-full border border-white/30"
                      style={{ background: sw }}
                      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ...SPRING, delay: 0.55 + i * 0.08 }}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* gloss sweep once assembled */}
            {!reduce && show("poster") && (
              <motion.div
                key={`gloss-${brand}`}
                className="absolute inset-y-0 w-1/3"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)" }}
                initial={{ x: "-140%" }}
                animate={{ x: "360%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
              />
            )}
          </motion.div>

          {/* ── animated cursor + action label ── */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute z-20"
              initial={false}
              animate={{ left: `${cursor[0]}%`, top: `${cursor[1]}%` }}
              transition={{ type: "spring", stiffness: 90, damping: 17, mass: 0.7 }}
            >
              <AnimatePresence>
                {inBoard && (
                  <motion.span
                    key={click}
                    className="absolute -left-1 -top-1 rounded-full"
                    style={{ width: 26, height: 26, border: `1.5px solid ${b.ink}` }}
                    initial={{ scale: 0.2, opacity: 0.85 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              {/* cursor presses down on each click */}
              <motion.span
                key={`press-${click}`}
                className="block"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.78, 1] }}
                transition={{ duration: 0.3, times: [0, 0.4, 1], ease: "easeOut" }}
              >
                <svg width="20" height="22" viewBox="0 0 20 22" className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]">
                  <path
                    d="M2 2 L2 18 L6.6 13.6 L10.6 20.4 L13.2 19.2 L9.4 12.4 L16 12 Z"
                    fill="#fff"
                    stroke="#0b0f14"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
              {/* tiny action pill trailing the cursor */}
              <AnimatePresence mode="wait">
                {inBoard && (
                  <motion.span
                    key={p}
                    className="absolute left-4 top-4 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] text-ink"
                    style={{ background: b.ink }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  >
                    {labels[p]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
