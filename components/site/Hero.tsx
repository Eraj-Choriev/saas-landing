"use client"

import { motion } from "framer-motion"
import { Sparkles, Check, Activity, Workflow } from "lucide-react"
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
    <section className="relative isolate overflow-hidden">
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

      <div className="container relative grain pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
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
              <Button variant="light" size="lg">
                {t.hero.primary}
              </Button>
              <Button variant="ghost" size="lg" arrow={false} className="text-cream-100 hover:bg-white/5">
                <span className="underline-offset-4 group-hover:underline">
                  {t.hero.secondary}
                </span>
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
  const { t } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="rounded-[22px] bg-ink-800/80 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-amber grid place-items-center">
                <Activity className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <p className="text-[13px] text-cream-50 font-medium">{t.hero.mockTitle}</p>
                <p className="text-[11px] text-cream-100/50 font-mono uppercase tracking-wider">
                  Customer Operations
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-coral/15 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-brand-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-coral animate-pulse" />
              {t.hero.mockStatus}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-ink/40 p-4">
            <p className="text-[12px] text-cream-100/55 font-mono uppercase tracking-wider">
              Request
            </p>
            <p className="mt-1 text-[14px] text-cream-50">{t.hero.mockReq}</p>
            <p className="mt-3 text-[12px] text-cream-100/50 font-mono">{t.hero.mockMeta}</p>
          </div>

          <ul className="mt-4 space-y-2">
            {t.hero.mockLog.map((l, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.18, duration: 0.5 }}
                className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2.5 text-[13px] text-cream-100/85"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 text-brand-blue shrink-0" />
                {l}
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-brand-gold/25 bg-brand-gold/10 px-4 py-3">
            <div className="flex items-center gap-2 text-brand-amber">
              <Workflow className="h-4 w-4" />
              <span className="font-mono text-[12px] uppercase tracking-wider">
                {t.hero.mockBadge}
              </span>
            </div>
            <span className="font-display text-[22px] text-cream-50">98%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
