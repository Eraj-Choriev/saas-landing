"use client"

import * as React from "react"
import { motion, useInView, animate, useReducedMotion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

const ease = [0.16, 1, 0.3, 1] as const

/** Count-up number that fires once when scrolled into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { t } = useI18n()
  const s = t.stats
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream-50">
      <div
        className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-25 [mask-image:radial-gradient(90%_80%_at_50%_50%,#000,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(70%_90%_at_50%_50%,#000,transparent)]"
        style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(255,91,36,0.10), transparent 70%)" }}
        aria-hidden
      />
      <div className="container py-16 sm:py-20">
        <p className="text-center font-mono text-[12px] uppercase tracking-[0.2em] text-brand-coral">
          {s.kicker}
        </p>
        <h2 className="mt-3 text-center font-display text-[26px] leading-tight tracking-tightest text-cream-50 sm:text-[34px]">
          {s.title}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {s.items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="text-center"
            >
              <div className="font-display text-[40px] font-medium leading-none tracking-tightest text-cream-50 sm:text-[52px]">
                <Counter value={it.value} suffix={it.suffix} />
              </div>
              <div className="mx-auto mt-3 max-w-[10rem] text-[13px] leading-snug text-cream-100/60">
                {it.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
