"use client"

import * as React from "react"
import { motion, useReducedMotion, useInView, animate } from "framer-motion"
import { Sparkles, Send, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const spotRef = React.useRef<HTMLDivElement>(null)

  // cursor-following spotlight — drives CSS vars via rAF, no React re-render,
  // listener scoped to the hero <section> so it never costs anything elsewhere
  React.useEffect(() => {
    if (reduce) return
    const el = spotRef.current
    const sec = el?.parentElement
    if (!el || !sec) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = sec.getBoundingClientRect()
        el.style.setProperty("--hx", `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty("--hy", `${((e.clientY - r.top) / r.height) * 100}%`)
        el.style.opacity = "1"
      })
    }
    const onLeave = () => { el.style.opacity = "0" }
    sec.addEventListener("pointermove", onMove, { passive: true })
    sec.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      sec.removeEventListener("pointermove", onMove)
      sec.removeEventListener("pointerleave", onLeave)
    }
  }, [reduce])

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      {/* ── base: slow flowing warm gradient mesh (coral → dark → amber/cream) ── */}
      <div className={`hero-mesh absolute inset-0 -z-30 ${reduce ? "hero-mesh--static" : ""}`} aria-hidden />

      {/* ── Linear-style fine dot grid, crisp, fades toward edges ── */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.55] [mask-image:radial-gradient(115%_85%_at_50%_0%,#000_35%,transparent_88%)]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      {/* ── cursor-following radial spotlight (warm) ── */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 -z-20 opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(440px circle at var(--hx,50%) var(--hy,40%), rgba(255,91,36,0.20), rgba(209,122,0,0.08) 40%, transparent 62%)",
        }}
        aria-hidden
      />

      {/* readability scrim — keeps the headline crisp */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0A0E13_0%,rgba(10,14,19,0.72)_28%,rgba(10,14,19,0.14)_58%,transparent_80%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,#0A0E13)]"
        aria-hidden
      />
      {/* top glow */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[55%] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,91,36,0.10),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative grain w-full pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[12px] font-mono uppercase tracking-[0.18em] text-cream-100/80"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              {t.hero.eyebrow}
            </motion.div>

            <h1 className="mt-6 font-display text-[34px] leading-[1.0] tracking-tightest text-cream-50 sm:text-[54px] sm:leading-[0.96] lg:text-[72px]">
              {t.hero.title.map((line, i) => (
                <motion.span
                  key={i}
                  variants={reveal}
                  custom={i + 1}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  {i === 1 ? (
                    <span className="italic text-brand-gold font-light">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={reveal}
              custom={5}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-pretty text-[16px] leading-[1.55] text-cream-100/75 sm:text-[17px]"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              variants={reveal}
              custom={6}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="#contact" variant="primary" size="lg">
                {t.hero.primary}
              </Button>
              <Button
                href="#services"
                variant="ghost"
                size="lg"
                className="border border-cream-50/25 text-cream-50 hover:border-cream-50/50 hover:bg-white/[0.06] [&_.dot]:bg-cream-50/15 [&_.dot]:text-cream-50 hover:[&_.dot]:bg-cream-50/25"
              >
                {t.hero.secondary}
              </Button>
            </motion.div>

            {/* clickable topic tags → jump to services */}
            <motion.div
              variants={reveal}
              custom={8}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-wrap items-center gap-2"
            >
              {t.hero.tags.map((tag) => (
                <a
                  key={tag.label}
                  href={tag.href}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.14em] text-cream-100/55 transition-colors duration-200 hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-cream-50"
                >
                  {tag.label}
                </a>
              ))}
            </motion.div>
          </div>

          <HeroChat />
        </div>
      </div>
    </section>
  )
}

/* ════════════════ Interactive Telegram demo ════════════════ */

type Turn = { role: string; text: string; card: boolean }
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function HeroChat() {
  const { t } = useI18n()
  const chat = t.hero.chat
  const reduce = useReducedMotion()

  const [msgs, setMsgs] = React.useState<Turn[]>([])
  const [typing, setTyping] = React.useState(false)
  const [ready, setReady] = React.useState(false)
  const [usedQuick, setUsedQuick] = React.useState<number[]>([])
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const busyRef = React.useRef(false)

  // auto-play the scripted conversation (re-runs on language change)
  React.useEffect(() => {
    if (reduce) {
      setMsgs(chat.turns as Turn[])
      setReady(true)
      return
    }
    let cancelled = false
    setMsgs([])
    setReady(false)
    setUsedQuick([])
    ;(async () => {
      await wait(650)
      for (const turn of chat.turns as Turn[]) {
        if (cancelled) return
        if (turn.role === "agent") {
          setTyping(true)
          await wait(950)
          if (cancelled) return
          setTyping(false)
        } else {
          await wait(550)
        }
        if (cancelled) return
        setMsgs((m) => [...m, turn])
        await wait(350)
      }
      if (!cancelled) setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [chat, reduce])

  // keep the thread pinned to the latest message
  React.useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [msgs, typing, reduce])

  const replyKeys = ["price", "services", "booking"] as const

  async function send(text: string, key: (typeof replyKeys)[number], quickIdx?: number) {
    if (busyRef.current) return
    busyRef.current = true
    if (quickIdx !== undefined) setUsedQuick((u) => [...u, quickIdx])
    setMsgs((m) => [...m, { role: "user", text, card: false }])
    if (!reduce) {
      await wait(450)
      setTyping(true)
      await wait(950)
      setTyping(false)
    }
    setMsgs((m) => [...m, { role: "agent", text: chat.replies[key], card: false }])
    busyRef.current = false
  }

  function matchKey(input: string): (typeof replyKeys)[number] {
    const s = input.toLowerCase()
    if (/(стоит|цен|сколько|cost|price|\$)/.test(s)) return "price"
    if (/(созвон|запиш|call|book|встреч|consult)/.test(s)) return "booking"
    if (/(делае|услуг|do you|what|services|строит|build)/.test(s)) return "services"
    return "services"
  }

  const [draft, setDraft] = React.useState("")
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = draft.trim()
    if (!v) return
    setDraft("")
    // freeform → fallback unless it matches a known intent
    const s = v.toLowerCase()
    const known = /(стоит|цен|сколько|cost|price|\$|созвон|запиш|call|book|делае|услуг|do you|what|services|строит|build)/.test(s)
    if (known) {
      send(v, matchKey(v))
    } else {
      sendFallback(v)
    }
  }

  async function sendFallback(text: string) {
    if (busyRef.current) return
    busyRef.current = true
    setMsgs((m) => [...m, { role: "user", text, card: false }])
    if (!reduce) {
      await wait(450)
      setTyping(true)
      await wait(950)
      setTyping(false)
    }
    setMsgs((m) => [...m, { role: "agent", text: chat.replies.fallback, card: false }])
    busyRef.current = false
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      {/* ambient glow behind the device */}
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-brand-blue/12 blur-3xl" aria-hidden />

      <div className="glass-dark overflow-hidden rounded-[28px] p-1.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[22px] bg-ink-800/80">
          {/* Telegram header */}
          <div className="flex items-center gap-3 bg-[linear-gradient(180deg,#2AABEE,#229ED9)] px-4 py-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 font-display text-[15px] text-white">
              a
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-white">{chat.title}</p>
              <p className="flex items-center gap-1.5 text-[11.5px] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {typing ? chat.typing + "…" : chat.status}
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
              Aqly
            </span>
          </div>

          {/* message thread */}
          <div
            ref={scrollRef}
            className="flex h-[300px] flex-col gap-2 overflow-y-auto scrollbar-hide px-3.5 py-4 sm:h-[330px]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(169,202,249,0.05) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          >
            {msgs.map((m, i) =>
              m.card ? (
                <Bubble key={i} side="agent">
                  <span className="mb-1 block">{m.text}</span>
                  <ServiceCard
                    title={chat.cardTitle}
                    body={chat.cardBody}
                    tag={chat.cardTag}
                  />
                </Bubble>
              ) : (
                <Bubble key={i} side={m.role === "user" ? "user" : "agent"}>
                  {m.text}
                </Bubble>
              )
            )}
            {typing && <TypingBubble />}
          </div>

          {/* quick replies + input */}
          <div className="border-t border-white/8 bg-ink-800/60 px-3 pb-3 pt-2.5">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {chat.quickReplies.map((q, i) =>
                usedQuick.includes(i) ? null : (
                  <button
                    key={q}
                    type="button"
                    disabled={!ready}
                    onClick={() => send(q, replyKeys[i], i)}
                    className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-1 text-[12px] text-brand-blue transition-colors duration-200 enabled:hover:bg-brand-blue/20 disabled:opacity-40"
                  >
                    {q}
                  </button>
                )
              )}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={chat.placeholder}
                aria-label={chat.placeholder}
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13.5px] text-cream-50 placeholder:text-cream-100/30 focus:border-brand-blue/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#229ED9] text-white transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <LiveCounter template={chat.counter} target={1247} reduce={!!reduce} />
    </motion.div>
  )
}

function Bubble({ side, children }: { side: "user" | "agent"; children: React.ReactNode }) {
  const isUser = side === "user"
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-[1.45] ${
          isUser
            ? "rounded-br-md bg-[#229ED9] text-white"
            : "rounded-bl-md border border-white/10 bg-white/[0.07] text-cream-50"
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-3">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-brand-blue"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: d * 0.16, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  )
}

function ServiceCard({ title, body, tag }: { title: string; body: string; tag: string }) {
  return (
    <div className="mt-1 w-full rounded-xl border border-brand-blue/25 bg-[linear-gradient(160deg,rgba(169,202,249,0.12),rgba(169,202,249,0.03))] p-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-cream-50">{title}</span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          {tag}
        </span>
      </div>
      <p className="mt-1 text-[12px] leading-snug text-cream-100/70">{body}</p>
    </div>
  )
}

function LiveCounter({ template, target, reduce }: { template: string; target: number; reduce: boolean }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [n, setN] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(target)
      return
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, reduce])

  const [before, after] = template.split("%n")
  return (
    <p
      ref={ref}
      className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-cream-100/55"
    >
      <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
      <span>
        {before}
        <span className="font-mono font-medium text-cream-50">{n.toLocaleString("en-US")}</span>
        {after}
      </span>
    </p>
  )
}
