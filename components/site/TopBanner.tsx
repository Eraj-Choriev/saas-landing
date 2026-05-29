"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function TopBanner() {
  const { t } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-30 w-full bg-ink text-cream-100"
    >
      <div className="container flex items-center justify-between gap-4 py-2.5 text-[12.5px]">
        <span className="hidden sm:inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-cream-200/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-aqua-400" />
          {t.banner.label}
        </span>
        <span className="flex-1 text-center text-cream-100 text-pretty truncate">
          {t.banner.text}
        </span>
        <a
          href="#"
          className="group hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-cream-50 hover:bg-white/5 transition-colors"
        >
          {t.banner.cta}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  )
}
