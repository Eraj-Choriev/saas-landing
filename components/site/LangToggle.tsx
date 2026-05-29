"use client"

import { useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LangToggle({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const { lang, setLang } = useI18n()
  const uid = useId()
  const items: Lang[] = ["en", "ru"]

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 text-[12px] font-mono uppercase tracking-[0.16em] select-none",
        tone === "ink"
          ? "bg-ink/5 border border-ink/10"
          : "bg-white/5 border border-white/10"
      )}
    >
      {items.map((l) => {
        const isActive = lang === l
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 rounded-full px-3 py-1.5 transition-colors duration-200",
              isActive
                ? tone === "ink"
                  ? "text-ink"
                  : "text-cream-50"
                : tone === "ink"
                  ? "text-ink/50 hover:text-ink/75"
                  : "text-cream-100/50 hover:text-cream-100/80"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`lang-pill-${uid}`}
                className={cn(
                  "absolute inset-0 rounded-full shadow-sm",
                  tone === "ink"
                    ? "bg-brand-blue"
                    : "bg-cream-50"
                )}
                transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.5 }}
              />
            )}
            <span className="relative">{l}</span>
          </button>
        )
      })}
    </div>
  )
}

export function PageFade({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
