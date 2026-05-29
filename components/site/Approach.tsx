"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useI18n } from "@/lib/i18n"

export function Approach() {
  const { t } = useI18n()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 70%", "end 30%"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="approach" className="relative bg-cream-50">
      <div className="container py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-amber"
          >
            {t.approach.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-ink sm:text-[48px] lg:text-[56px] text-balance"
          >
            {t.approach.title}
          </motion.h2>
        </div>

        <div ref={wrapperRef} className="relative mt-20 max-w-4xl mx-auto">
          {/* center rail */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-ink/10 lg:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-brand-blue via-brand-amber to-brand-coral lg:block"
          />

          {/* mobile rail */}
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-ink/10 lg:hidden" />
          <motion.div
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-5 top-0 w-px bg-gradient-to-b from-brand-blue via-brand-amber to-brand-coral lg:hidden"
          />

          <ul className="space-y-12 lg:space-y-20">
            {t.approach.steps.map((step, i) => {
              const isRight = i % 2 === 1
              return (
                <li key={i} className="relative">
                  <NodeDot progress={scrollYProgress} index={i} total={t.approach.steps.length} />

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-12 ${isRight ? "lg:[&>div]:col-start-2" : ""}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30, x: isRight ? 20 : -20 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="relative pl-14 lg:pl-0"
                    >
                      <div className="relative rounded-3xl border border-ink/8 bg-cream-100 p-7 sm:p-8 shadow-[0_24px_60px_-40px_rgba(10,14,19,0.25)]">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-display text-[15px] font-medium tracking-tightest text-brand-coral">
                            {step.n}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                            STEP {i + 1} / {t.approach.steps.length}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-[26px] leading-tight tracking-tight text-ink sm:text-[30px]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[14.5px] leading-[1.55] text-ink/65 text-pretty">
                          {step.body}
                        </p>
                        <span className="mt-5 inline-block rounded-full bg-brand-gold/30 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-amber">
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
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  index: number
  total: number
}) {
  const t = (index + 0.5) / total
  const scale = useTransform(progress, [t - 0.05, t], [0.6, 1])
  const opacity = useTransform(progress, [t - 0.08, t], [0.3, 1])
  return (
    <>
      <motion.div
        style={{ scale, opacity }}
        className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue ring-4 ring-cream-50 lg:block"
      />
      <motion.div
        style={{ scale, opacity }}
        className="absolute left-5 top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-blue ring-4 ring-cream-50 lg:hidden"
      />
    </>
  )
}
