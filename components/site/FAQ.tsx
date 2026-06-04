"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const ease = [0.16, 1, 0.3, 1] as const

export function FAQ() {
  const { t } = useI18n()
  const f = t.faq
  const [open, setOpen] = React.useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-cream-100">
      <div className="container py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-amber">
              {f.kicker}
            </p>
            <h2 className="mt-4 font-display text-[34px] leading-[1.05] tracking-tightest text-ink sm:text-[48px] text-balance">
              {f.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-[15px] leading-[1.55] text-ink/60">
              {f.lead}
            </p>
          </div>

          <ul className="mt-12 space-y-3">
            {f.items.map((it, i) => {
              const isOpen = open === i
              return (
                <li
                  key={i}
                  className="overflow-hidden rounded-2xl border border-ink/10 bg-cream-50 transition-colors duration-300 hover:border-ink/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="font-display text-[16.5px] leading-snug tracking-tight text-ink sm:text-[18px]">
                      {it.q}
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-transparent bg-brand-coral text-white"
                          : "border-ink/15 text-ink/70"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        <p className="px-5 pb-5 text-[14.5px] leading-[1.6] text-ink/65 text-pretty sm:px-6">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
