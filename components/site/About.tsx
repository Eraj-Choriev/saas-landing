"use client"

import { motion } from "framer-motion"
import { Zap, Code2, Eye, Handshake, type LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const VALUE_META: { Icon: LucideIcon; color: string }[] = [
  { Icon: Zap, color: "#ff5b24" },
  { Icon: Code2, color: "#a9caf9" },
  { Icon: Eye, color: "#fce88d" },
  { Icon: Handshake, color: "#d17a00" },
]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function About() {
  const { t } = useI18n()

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-ink text-cream-50"
    >
      {/* base dark gradient — the contrast anchor */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#0A0E13_0%,#0A0E13_55%,#130e08_100%)]" />

      {/* single aurora glow + faint grid, kept calm */}
      <div
        className="absolute right-[-12%] top-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,91,36,0.22),transparent_65%)] blur-[80px]"
        aria-hidden
      />
      <div
        className="absolute left-[-10%] bottom-[-16%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(169,202,249,0.16),transparent_65%)] blur-[80px]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]" />

      <div className="container relative grain py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-start">
          {/* left — narrative */}
          <div>
            <motion.p
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-coral"
            >
              {t.about.kicker}
            </motion.p>

            <h2 className="mt-4 font-display text-[34px] leading-[1.0] tracking-tightest text-cream-50 sm:text-[48px] lg:text-[54px] text-balance">
              {t.about.title.map((line, i) => (
                <motion.span
                  key={i}
                  variants={reveal}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="italic font-light text-brand-gold">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h2>

            <motion.p
              variants={reveal}
              custom={4}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-6 max-w-xl text-pretty text-[16px] leading-[1.6] text-cream-100/80 sm:text-[17px]"
            >
              {t.about.lead}
            </motion.p>
          </div>

          {/* right — value cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {t.about.values.map((v, i) => {
              const { Icon, color } = VALUE_META[i]
              return (
                <motion.div
                  key={i}
                  variants={reveal}
                  custom={i + 2}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -5 }}
                  className="glass-dark group relative overflow-hidden rounded-3xl p-6 transition-[box-shadow,border-color] duration-300"
                  style={{ ["--accent" as string]: color }}
                >
                  {/* clean corner wash on hover — radial gradient, no blur filter
                      (the old blurred circle clipped to a hard block under
                      overflow-hidden + the glass backdrop-filter) */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(150px circle at 90% 0%, ${color}24, transparent 68%)`,
                    }}
                    aria-hidden
                  />
                  {/* accent ring on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 1px ${color}55` }}
                    aria-hidden
                  />
                  <div
                    className="relative grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ backgroundColor: `${color}1f` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} strokeWidth={1.9} />
                  </div>
                  <h3 className="relative mt-5 font-display text-[21px] leading-tight tracking-tight text-cream-50">
                    {v.title}
                  </h3>
                  <p className="relative mt-2.5 text-[14px] leading-[1.55] text-cream-100/78 text-pretty">
                    {v.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
