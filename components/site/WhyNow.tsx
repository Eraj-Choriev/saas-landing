"use client"

import * as React from "react"
import { motion, useInView, animate, useReducedMotion } from "framer-motion"
import { Globe, Send, Sparkles, ArrowUpRight, type LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const EASE = [0.22, 1, 0.36, 1] as const

const STAT_COLORS = ["#ff5b24", "#d17a00", "#a9caf9", "#fce88d"] as const
const CARD_META: { Icon: LucideIcon; color: string }[] = [
  { Icon: Globe, color: "#a9caf9" },
  { Icon: Send, color: "#ff5b24" },
  { Icon: Sparkles, color: "#d17a00" },
]

/** Count-up that fires once in view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(value)
      return
    }
    const controls = animate(0, value, { duration: 1.3, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value, reduce])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function WhyNow() {
  const { t } = useI18n()
  const w = t.why

  return (
    <section id="why" className="relative isolate overflow-hidden bg-ink text-cream-50">
      {/* atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(85%_75%_at_50%_0%,#000,transparent)]"
        style={{
          background:
            "radial-gradient(48% 55% at 78% 4%, rgba(255,91,36,0.16), transparent 70%), radial-gradient(46% 55% at 14% 12%, rgba(169,202,249,0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-25 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000,transparent)]"
        aria-hidden
      />

      <div className="container relative py-20 sm:py-28">
        {/* header */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-coral"
          >
            {w.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.15, delay: 0.09, ease: EASE }}
            className="mt-4 font-display text-[32px] leading-[1.04] tracking-tightest text-cream-50 sm:text-[46px] lg:text-[52px] text-balance"
          >
            {w.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
            className="mt-5 max-w-xl text-pretty text-[15.5px] leading-[1.6] text-cream-100/65 sm:text-[16.5px]"
          >
            {w.lead}
          </motion.p>
        </div>

        {/* cost-of-inaction stat cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {w.stats.map((s, i) => {
            const color = STAT_COLORS[i] ?? "#ff5b24"
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: i * 0.13, ease: EASE }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/20"
                style={{ ["--c" as string]: color }}
              >
                {/* top accent hairline on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  aria-hidden
                />
                {/* corner wash — radial-gradient (no blur filter) so it clips
                    cleanly to the rounded corner; a blurred circle here glitches
                    to a sharp corner mid-transition under overflow-hidden */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(150px circle at 100% 0%, ${color}33, transparent 70%)` }}
                  aria-hidden
                />
                <div
                  className="font-display text-[40px] font-medium leading-none tracking-tightest sm:text-[46px]"
                  style={{ color }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="relative mt-3 text-[13.5px] leading-[1.5] text-cream-100/70 text-pretty">
                  {s.label}
                </p>
                {s.source && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-100/35">
                    {s.source}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* divider + solutions */}
        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-100/45">
            {w.cardsTitle}
          </p>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {w.cards.map((c, i) => {
            const { Icon, color } = CARD_META[i] ?? CARD_META[0]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: i * 0.14, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-7 transition-colors duration-300 hover:border-white/20"
                style={{ ["--c" as string]: color }}
              >
                {/* accent ring + glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${color}55, 0 30px 70px -34px ${color}` }}
                  aria-hidden
                />
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ backgroundColor: `${color}1f` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} strokeWidth={1.9} />
                </div>
                <p className="relative mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ color }}>
                  {c.tag}
                </p>
                <h3 className="relative mt-2 font-display text-[22px] leading-tight tracking-tight text-cream-50">
                  {c.title}
                </h3>
                <p className="relative mt-3 flex-1 text-[14px] leading-[1.55] text-cream-100/65 text-pretty">
                  {c.body}
                </p>
                <a
                  href="#contact"
                  className="relative mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-cream-100/75 transition-colors hover:text-cream-50"
                >
                  {t.build.learnMore}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color }}
                  />
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* footnote */}
        <p className="mt-10 text-center font-mono text-[11px] tracking-[0.04em] text-cream-100/35">
          {w.note}
        </p>
      </div>
    </section>
  )
}
