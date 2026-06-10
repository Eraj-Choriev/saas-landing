"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cookie, X } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const STORAGE_KEY = "aqly-cookie-consent" // "accepted" | "declined"

/**
 * Cookie consent card — bottom-left, ink glass over any section (matches the
 * navbar's liquid-glass language). The site sets no ad/analytics cookies;
 * consent only gates the localStorage language preference, so a single
 * accept + quiet decline is honest. Shows once, ~1.6s after load so it never
 * competes with the hero reveal.
 */
export function CookieConsent() {
  const { t } = useI18n()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    let id: ReturnType<typeof setTimeout> | undefined
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        id = setTimeout(() => setOpen(true), 1600)
      }
    } catch {
      /* storage blocked (private mode) — never show, nothing to remember */
    }
    return () => clearTimeout(id)
  }, [])

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label={t.cookie.kicker}
          // `isolate` forces a stacking context — iOS Safari otherwise paints the
          // backdrop-filter layer with square corners (sharp top-left artifact)
          className="fixed bottom-4 left-4 z-[60] w-[calc(100vw-2rem)] max-w-[380px] isolate overflow-hidden rounded-2xl border border-white/15 bg-ink/80 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7)] backdrop-blur-2xl backdrop-saturate-150"
        >
          {/* specular sheen along the top edge — same glass language as the navbar */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_40%,transparent_62%)]"
          />
          {/* warm coral pool behind the icon corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-brand-coral/25 blur-2xl"
          />

          <div className="relative p-5">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-coral/30 bg-brand-coral/15 text-brand-coral">
                <Cookie className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/45">
                  {t.cookie.kicker}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-snug text-cream-100/80">
                  {t.cookie.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => choose("declined")}
                aria-label={t.cookie.decline}
                className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream-100/40 transition-colors hover:bg-white/10 hover:text-cream-50"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 pl-[3.1rem]">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-brand-coral px-5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_22px_-6px_rgba(255,91,36,0.65)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_28px_-6px_rgba(255,91,36,0.8)]"
              >
                {t.cookie.accept}
              </button>
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-cream-100/50 transition-colors hover:text-cream-50"
              >
                {t.cookie.decline}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
