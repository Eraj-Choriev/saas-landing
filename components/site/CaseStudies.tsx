"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const ease = [0.16, 1, 0.3, 1] as const

export function CaseStudies() {
  const { t } = useI18n()
  const c = t.cases
  return (
    <section id="cases" className="relative isolate overflow-hidden bg-ink text-cream-50">
      {/* atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,#000,transparent)]"
        style={{ background: "radial-gradient(55% 60% at 78% 0%, rgba(255,91,36,0.12), transparent 70%), radial-gradient(50% 60% at 18% 10%, rgba(169,202,249,0.12), transparent 70%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-grid-ink bg-[size:48px_48px] opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000,transparent)]" aria-hidden />

      <div className="container py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-coral">{c.kicker}</p>
          <h2 className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-cream-50 sm:text-[48px]">
            {c.title}
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-[1.55] text-cream-100/65 sm:text-[16px]">
            {c.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <motion.article
              key={item.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="group relative flex flex-col rounded-[24px] border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[20px] tracking-tight text-cream-50">{item.client}</span>
                <span className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-100/55">
                  {item.category}
                </span>
              </div>

              <h3 className="mt-4 text-pretty text-[17px] font-medium leading-snug text-cream-50">
                {item.name}
              </h3>

              <dl className="mt-5 space-y-3 text-[13.5px] leading-[1.5]">
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-coral/90">{c.problemLabel}</dt>
                  <dd className="mt-1 text-cream-100/70">{item.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-blue">{c.solutionLabel}</dt>
                  <dd className="mt-1 text-cream-100/70">{item.solution}</dd>
                </div>
              </dl>

              {/* result metrics */}
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/8 pt-5">
                {item.results.map((r) => (
                  <div key={r.label}>
                    <div className="font-display text-[24px] leading-none tracking-tight text-cream-50">{r.value}</div>
                    <div className="mt-1.5 text-[11px] leading-tight text-cream-100/55">{r.label}</div>
                  </div>
                ))}
              </div>

              {/* stack */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <span key={s} className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10.5px] text-cream-100/55">
                    {s}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brand-blue transition-colors duration-200 hover:text-cream-50"
              >
                {c.readCase}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
