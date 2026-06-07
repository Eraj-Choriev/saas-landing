"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as const

export function FinalCTA() {
  const { t } = useI18n()
  const c = t.finalCta
  return (
    <section className="relative isolate overflow-hidden bg-cream-50">
      {/* warm aurora wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 [mask-image:radial-gradient(70%_80%_at_50%_50%,#000,transparent)]"
        style={{ background: "radial-gradient(45% 55% at 50% 0%, rgba(255,91,36,0.1), transparent 70%), radial-gradient(60% 60% at 50% 110%, rgba(209,122,0,0.1), transparent 70%)" }}
        aria-hidden
      />
      <div className="container grain py-24 text-center sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="font-mono text-[12px] uppercase tracking-[0.24em] text-brand-coral"
        >
          {c.kicker}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.15, delay: 0.1, ease }}
          className="mx-auto mt-5 max-w-3xl font-display text-[32px] leading-[1.05] tracking-tightest text-ink sm:text-[54px] sm:leading-[1.0] lg:text-[68px]"
        >
          {c.title[0]}{" "}
          <span className="italic font-light text-brand-coral">{c.title[1]}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.2, ease }}
          className="mx-auto mt-5 max-w-md text-pretty text-[16px] leading-[1.55] text-ink/60 sm:text-[17px]"
        >
          {c.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.18, ease }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <Button href="#contact" variant="primary" size="lg">
            {c.button}
          </Button>
          <p className="text-[14px] text-ink/55">
            {c.orPrefix}{" "}
            <a href={`mailto:${t.footer.email}`} className="link-underline text-brand-amber">
              {t.footer.email}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
