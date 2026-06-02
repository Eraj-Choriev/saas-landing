"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useI18n, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LangToggle({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const { lang, setLang } = useI18n()
  const reduce = useReducedMotion()
  const items: Lang[] = ["ru", "en", "tj"]
  const activeIndex = Math.max(0, items.indexOf(lang))

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 text-[12px] font-mono uppercase tracking-[0.16em] select-none",
        tone === "ink"
          ? "bg-ink/5 border border-ink/10"
          : "bg-white/5 border border-white/10"
      )}
    >
      {/* single sliding pill — positioned inside the container (transform only),
          so it never measures against the viewport and stays smooth on scroll */}
      <motion.span
        aria-hidden
        className={cn(
          "absolute left-0.5 top-0.5 bottom-0.5 rounded-full shadow-sm",
          tone === "ink" ? "bg-brand-blue" : "bg-cream-50"
        )}
        style={{ width: "calc((100% - 4px) / 3)" }}
        animate={{ x: `${activeIndex * 100}%` }}
        transition={
          reduce ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.2 }
        }
      />
      {items.map((l) => {
        const isActive = lang === l
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 flex-1 rounded-full px-3 py-1.5 text-center transition-[color,transform] duration-200 active:scale-[0.94]",
              isActive
                ? "text-ink font-semibold"
                : tone === "ink"
                  ? "text-ink/50 hover:text-ink/75"
                  : "text-cream-100/60 hover:text-cream-100/90"
            )}
          >
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
