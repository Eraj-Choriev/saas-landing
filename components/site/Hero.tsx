"use client"

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { Sparkles, Terminal } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { HeroBeams } from "@/components/site/HeroBeams"

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

      {/* cursor-illuminated beam field (reactbits-style, adapted) */}
      <HeroBeams />

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

          <HeroCodeCard />
        </div>
      </div>
    </section>
  )
}

/* ── glassmorphism code panel with pointer-driven 3D tilt + glare ── */
function HeroCodeCard() {
  const prefersReduced = useReducedMotion()

  const px = useMotionValue(0) // -0.5 … 0.5
  const py = useMotionValue(0)
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 })
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })
  const glareX = useTransform(px, [-0.5, 0.5], ["18%", "82%"])
  const glareY = useTransform(py, [-0.5, 0.5], ["8%", "72%"])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 58%)`
  )

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <div className="[perspective:1600px]">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative mx-auto w-full max-w-[520px] will-change-transform"
      >
        {/* gentle perpetual float */}
        <motion.div
          animate={prefersReduced ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute -inset-12 -z-10 rounded-full bg-brand-blue/12 blur-3xl" />

          <div
            className="glass-dark relative overflow-hidden rounded-[24px] p-1.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75)]"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* glare that tracks the tilt */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 opacity-60 mix-blend-soft-light"
              style={{ background: glare }}
            />

            <div className="overflow-hidden rounded-[18px] bg-ink-800/70">
              {/* editor chrome */}
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-coral/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-amber/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-gold/80" />
                  </span>
                  <span className="ml-1 flex items-center gap-1.5 font-mono text-[11.5px] text-cream-100/55">
                    <Terminal className="h-3.5 w-3.5" strokeWidth={2} />
                    agent.ts
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-100/35">
                  Aqly · AI
                </span>
              </div>

              {/* code body */}
              <div
                className="relative px-4 py-5 font-mono text-[13px] leading-[1.85]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(169,202,249,0.05) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                <CodeLines />
              </div>

              {/* runtime status footer */}
              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
                <span className="flex items-center gap-2 text-[12px] text-emerald-300/90">
                  <span className="relative grid place-items-center">
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/50" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  deployed
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-100/40">
                  opus-4 · n8n · telegram
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* syntax-coloured snippet — brand palette, staggered reveal */
function CodeLines() {
  const kw = "text-brand-coral"
  const fn = "text-brand-blue"
  const str = "text-brand-gold"
  const pn = "text-cream-100/40"
  const tx = "text-cream-100/85"

  const lines: React.ReactNode[] = [
    <>
      <span className={kw}>const</span> <span className={fn}>agent</span>{" "}
      <span className={pn}>=</span> <span className={kw}>new</span>{" "}
      <span className={fn}>AqlyAgent</span>
      <span className={pn}>{"({"}</span>
    </>,
    <>
      {"  "}
      <span className={tx}>model</span>
      <span className={pn}>:</span> <span className={str}>{'"claude-opus-4"'}</span>
      <span className={pn}>,</span>
    </>,
    <>
      {"  "}
      <span className={tx}>tools</span>
      <span className={pn}>:</span> <span className={pn}>[</span>
      <span className={fn}>telegram</span>
      <span className={pn}>,</span> <span className={fn}>n8n</span>
      <span className={pn}>,</span> <span className={fn}>crm</span>
      <span className={pn}>],</span>
    </>,
    <>
      {"  "}
      <span className={tx}>voice</span>
      <span className={pn}>:</span> <span className={kw}>true</span>
      <span className={pn}>,</span>
    </>,
    <>
      <span className={pn}>{"})"}</span>
    </>,
    <>{" "}</>,
    <>
      <span className={kw}>await</span> <span className={fn}>agent</span>
      <span className={pn}>.</span>
      <span className={fn}>deploy</span>
      <span className={pn}>()</span>
    </>,
    <>
      <span className="text-emerald-400/70">{"// ✓ live · 1.2k chats/day"}</span>
    </>,
  ]

  return (
    <div>
      {lines.map((ln, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-[1.4rem_1fr] gap-x-3"
        >
          <span className="select-none text-right text-cream-100/20">{i + 1}</span>
          <span className="whitespace-pre">{ln}</span>
        </motion.div>
      ))}
    </div>
  )
}
