"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Sparkles, Check, CheckCheck, Send, Bot } from "lucide-react"
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
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      {/* base dark gradient */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#0A0E13_0%,#0A0E13_58%,#130e08_100%)]" />

      {/* drifting aurora blobs — slow, calm, organic */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="aurora-blob animate-drift-a left-[-8%] top-[6%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(169,202,249,0.5),transparent_65%)]" />
        <div className="aurora-blob animate-drift-b right-[-10%] top-[-6%] h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(255,91,36,0.34),transparent_65%)]" />
        <div className="aurora-blob animate-drift-c left-[28%] bottom-[-14%] h-[36rem] w-[36rem] bg-[radial-gradient(circle,rgba(209,122,0,0.4),transparent_65%)]" />
      </div>

      {/* fine grid + top glow */}
      <div className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]" />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(169,202,249,0.16),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative grain w-full pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
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

            <h1 className="mt-6 font-display text-[44px] leading-[0.95] tracking-tightest text-cream-50 sm:text-[64px] lg:text-[78px]">
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
              <Button href="#contact" variant="light" size="lg">
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

            <motion.div
              variants={reveal}
              custom={7}
              initial="hidden"
              animate="show"
              className="mt-10 inline-flex items-center gap-2 text-[12.5px] font-mono uppercase tracking-[0.16em] text-cream-100/55"
            >
              <span className="inline-block h-px w-8 bg-cream-100/30" />
              {t.hero.pill}
            </motion.div>
          </div>

          <HeroMock />
        </div>
      </div>
    </section>
  )
}

function HeroMock() {
  const { t, lang } = useI18n()
  const prefersReduced = useReducedMotion()
  const c = t.hero.chat

  const [shown, setShown] = useState(0) // messages fully revealed
  const [typing, setTyping] = useState(false) // agent typing bubble
  const [done, setDone] = useState(false) // conversation complete → success
  const [pct, setPct] = useState(0)
  const [runKey, setRunKey] = useState(0)
  const cancelled = useRef(false)

  useEffect(() => {
    if (prefersReduced) {
      setShown(c.turns.length)
      setTyping(false)
      setDone(true)
      setPct(100)
      return
    }

    cancelled.current = false
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

    async function run() {
      setShown(0)
      setTyping(false)
      setDone(false)
      setPct(0)
      await sleep(700)

      for (let i = 0; i < c.turns.length; i++) {
        if (cancelled.current) return
        const turn = c.turns[i]
        if (turn.role === "agent") {
          setTyping(true)
          await sleep(1150)
          if (cancelled.current) return
          setTyping(false)
        }
        setShown(i + 1)
        await sleep(turn.role === "user" ? 850 : turn.card ? 1500 : 1250)
      }

      if (cancelled.current) return
      await sleep(300)
      setDone(true)
      for (let p = 0; p <= 100; p += 4) {
        if (cancelled.current) return
        setPct(p)
        await sleep(12)
      }
      setPct(100)

      await sleep(3000)
      if (cancelled.current) return
      setRunKey((k) => k + 1)
    }

    run()
    return () => {
      cancelled.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, lang, prefersReduced])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="overflow-hidden rounded-[22px] bg-ink-800/85">
          {/* Telegram-style header */}
          <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-amber">
                <Bot className="h-4.5 w-4.5 text-ink" strokeWidth={2.2} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-800 bg-emerald-400" />
              </div>
              <div className="leading-tight">
                <p className="text-[13.5px] font-medium text-cream-50">{c.title}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={typing ? "typing" : "online"}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className={`text-[11px] ${typing ? "text-brand-blue" : "text-emerald-400/80"}`}
                  >
                    {typing ? `${c.typing}…` : c.status}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-100/35">
              Aqly · AI
            </span>
          </div>

          {/* chat body */}
          <div
            className="relative flex h-[340px] flex-col justify-end gap-2 px-4 py-4"
            style={{
              backgroundImage:
                "radial-gradient(rgba(169,202,249,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="flex flex-col gap-2.5">
              {c.turns.slice(0, shown).map((turn, i) =>
                turn.role === "user" ? (
                  <UserBubble key={i} text={turn.text} />
                ) : (
                  <AgentBubble
                    key={i}
                    text={turn.text}
                    card={turn.card}
                    cardTitle={c.cardTitle}
                    cardBody={c.cardBody}
                    cardTag={c.cardTag}
                  />
                )
              )}
              <AnimatePresence>{typing && <TypingBubble key="typing" />}</AnimatePresence>
            </div>
          </div>

          {/* footer — input bar → success */}
          <div className="border-t border-white/8 bg-white/[0.02] px-3 py-2.5">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2"
                >
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 left-0 bg-emerald-400/15"
                    animate={{ width: `${pct}%` }}
                    transition={{ ease: "linear" }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[12.5px] font-medium text-emerald-300">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-ink">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {c.success}
                    </span>
                    <span className="font-display text-[18px] text-cream-50 tabular-nums">{pct}%</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-full border border-white/8 bg-ink/50 px-4 py-2"
                >
                  <span className="flex-1 text-[13px] text-cream-100/40">{c.placeholder}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-blue text-ink">
                    <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-blue px-3.5 py-2 text-[13.5px] leading-snug text-ink">
        {text}
        <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-ink/55">
          now
          <CheckCheck className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>
    </motion.div>
  )
}

function AgentBubble({
  text,
  card,
  cardTitle,
  cardBody,
  cardTag,
}: {
  text: string
  card: boolean
  cardTitle: string
  cardBody: string
  cardTag: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="flex items-end gap-2"
    >
      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-amber">
        <Bot className="h-3 w-3 text-ink" strokeWidth={2.4} />
      </div>
      <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2 text-[13.5px] leading-snug text-cream-100/90">
        {text}
        {card && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 280, damping: 24 }}
            className="mt-2 overflow-hidden rounded-xl border border-brand-blue/30 bg-ink/50"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-brand-blue/20 to-transparent px-3 py-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-blue text-ink">
                <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
              </div>
              <div className="leading-tight">
                <p className="text-[12.5px] font-medium text-cream-50">{cardTitle}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-400/80">
                  ● {cardTag}
                </p>
              </div>
            </div>
            <p className="px-3 pb-2.5 pt-1 text-[11.5px] leading-snug text-cream-100/70">
              {cardBody}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-end gap-2"
    >
      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-amber">
        <Bot className="h-3 w-3 text-ink" strokeWidth={2.4} />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cream-100/60"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
