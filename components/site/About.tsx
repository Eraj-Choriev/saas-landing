"use client"

import { motion } from "framer-motion"
import { Zap, Code2, Eye, Handshake, type LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"

// Icons only — the section leads with a single accent (coral), not a per-card
// rainbow. Identity comes from the icon + copy, not from four different hues.
const VALUE_ICONS: LucideIcon[] = [Zap, Code2, Eye, Handshake]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
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
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:items-start">
          {/* left — narrative */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-brand-coral to-brand-amber" />
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-coral">
                {t.about.kicker}
              </span>
            </motion.div>

            <h2 className="mt-6 font-display text-[36px] leading-[0.98] tracking-tightest text-cream-50 sm:text-[50px] lg:text-[56px] text-balance">
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
                    <span className="font-medium text-brand-gold">{line}</span>
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
              className="mt-7 max-w-xl text-pretty text-[16px] leading-[1.65] text-cream-100/80 sm:text-[17px]"
            >
              {t.about.lead}
            </motion.p>

            {/* signature row — a single coral tick, then the wordmark */}
            <motion.div
              variants={reveal}
              custom={5}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-9 flex items-center gap-3"
              aria-hidden
            >
              <span className="h-2.5 w-2.5 rounded-[3px] bg-brand-coral" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-100/40">
                Aqly<span className="text-brand-coral">®</span>
              </span>
            </motion.div>
          </div>

          {/* right — value cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {t.about.values.map((v, i) => (
              <ValueCard
                key={i}
                index={i}
                Icon={VALUE_ICONS[i]}
                title={v.title}
                body={v.body}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  index,
  Icon,
  title,
  body,
}: {
  index: number
  Icon: LucideIcon
  title: string
  body: string
}) {
  return (
    <motion.div
      variants={reveal}
      custom={index + 2}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative flex min-h-[15rem] flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-ink-800/40 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-brand-coral/30"
    >
      {/* icon chip — neutral; coral is reserved for the action accent below */}
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Icon className="h-[22px] w-[22px] text-cream-50" strokeWidth={1.9} />
      </div>

      <h3 className="relative mt-6 font-display text-[22px] leading-tight tracking-tight text-cream-50">
        {title}
      </h3>
      <p className="relative mt-2.5 text-[14px] leading-[1.6] text-cream-100/75 text-pretty">
        {body}
      </p>

      {/* baseline accent bar — the single coral signal, grows on hover */}
      <div className="relative mt-auto pt-6">
        <span
          className="block h-px w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#ff5b24,transparent)] transition-transform duration-500 ease-smooth group-hover:scale-x-100"
        />
      </div>
    </motion.div>
  )
}
