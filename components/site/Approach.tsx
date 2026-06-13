"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Compass, Target, Hammer, LifeBuoy, type LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const STEP_META: { Icon: LucideIcon; color: string }[] = [
  { Icon: Compass, color: "#a9caf9" },
  { Icon: Target, color: "#d17a00" },
  { Icon: Hammer, color: "#ff5b24" },
  { Icon: LifeBuoy, color: "#d17a00" },
]

export function Approach() {
  const { t } = useI18n()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 70%", "end 30%"],
  })

  // scaleY (compositor-only) instead of animating height (layout every scroll
  // frame) — identical look on a 1px rail, no scroll jank
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="approach" className="relative overflow-hidden bg-cream-50">
      {/* faint warm glow so the section breathes */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #d17a00, transparent 70%)" }}
        aria-hidden
      />

      <div className="container relative py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-amber"
          >
            {t.approach.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.15, delay: 0.09 }}
            className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-ink sm:text-[48px] lg:text-[56px] text-balance"
          >
            {t.approach.title}
          </motion.h2>
        </div>

        <div ref={wrapperRef} className="relative mt-20 max-w-4xl mx-auto">
          {/* center rail */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-ink/10 lg:block" />
          <motion.div
            style={{ scaleY: lineScale, x: "-50%", transformOrigin: "top" }}
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-brand-blue via-brand-amber to-brand-coral shadow-[0_0_12px_rgba(209,122,0,0.5)] lg:block"
          />

          {/* mobile rail */}
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-ink/10 lg:hidden" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gradient-to-b from-brand-blue via-brand-amber to-brand-coral lg:hidden"
          />

          <ul className="space-y-12 lg:space-y-16">
            {t.approach.steps.map((step, i) => {
              const isRight = i % 2 === 1
              const { Icon, color } = STEP_META[i]
              return (
                <li key={i} className="relative">
                  <NodeDot progress={scrollYProgress} index={i} total={t.approach.steps.length} color={color} />

                  <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12">
                    {/* giant ghost step-number balances the empty column on desktop */}
                    <div
                      className={`pointer-events-none hidden select-none lg:flex ${
                        isRight ? "lg:order-1 justify-end pr-14" : "lg:order-2 justify-start pl-14"
                      }`}
                      aria-hidden
                    >
                      <span
                        className="font-display text-[150px] font-medium leading-none tracking-tightest"
                        style={{ color: `${color}1f` }}
                      >
                        {step.n}
                      </span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 36, x: isRight ? 28 : -28 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.7 }}
                      whileHover={{ y: -5 }}
                      className={`relative pl-14 lg:pl-0 ${isRight ? "lg:order-2" : "lg:order-1"}`}
                    >
                      <div
                        className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-cream-100 p-7 shadow-[0_24px_60px_-40px_rgba(10,14,19,0.25)] transition-shadow duration-300 sm:p-8"
                        style={{ ["--accent" as string]: color }}
                      >
                        {/* accent corner wash — radial-gradient (no blur filter)
                            so it clips cleanly to the rounded corner; a blurred
                            circle glitches to a sharp corner mid-transition */}
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: `radial-gradient(170px circle at 100% 0%, ${color}26, transparent 70%)` }}
                        />
                        <div className="relative flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                              style={{ backgroundColor: `${color}22`, color: "#0A0E13" }}
                            >
                              <Icon className="h-5 w-5" style={{ color }} strokeWidth={1.9} />
                            </div>
                            <span
                              className="font-display text-[28px] font-medium leading-none tracking-tightest"
                              style={{ color }}
                            >
                              {step.n}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                            {t.approach.stepLabel} {i + 1} / {t.approach.steps.length}
                          </span>
                        </div>
                        <h3 className="relative mt-5 font-display text-[26px] leading-tight tracking-tight text-ink sm:text-[30px]">
                          {step.title}
                        </h3>
                        <p className="relative mt-3 text-[14.5px] leading-[1.55] text-ink/65 text-pretty">
                          {step.body}
                        </p>
                        <span
                          className="relative mt-5 inline-block rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]"
                          style={{ backgroundColor: `${color}22`, color: "#0A0E13" }}
                        >
                          {step.tag}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function NodeDot({
  progress,
  index,
  total,
  color,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  index: number
  total: number
  color: string
}) {
  const t = (index + 0.5) / total
  const scale = useTransform(progress, [t - 0.06, t], [0.4, 1])
  const opacity = useTransform(progress, [t - 0.09, t], [0.2, 1])
  return (
    <>
      {/* desktop node */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-cream-50 lg:block"
      >
        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: color }} />
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-40"
          style={{ backgroundColor: color }}
        />
      </motion.div>
      {/* mobile node */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute left-5 top-8 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-cream-50 lg:hidden"
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: color }} />
      </motion.div>
    </>
  )
}
