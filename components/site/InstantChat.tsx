"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

// Agency Telegram — same handle as the contact block.
const TG_URL = "https://t.me/aqly_io"

/**
 * Floating Telegram button — bottom-LEFT (the voice agent owns bottom-right).
 * For visitors who'll never fill a form and just want to message now.
 *
 * Appears ~2.4s after load so it doesn't fight the hero reveal or collide with
 * the CookieConsent card (also bottom-left, shows ~1.6s in then dismisses).
 * A one-time label bubble nudges attention, then collapses to a bare circle.
 */
export function InstantChat() {
  const { t } = useI18n()
  const [shown, setShown] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    // The CookieConsent card lives in the same bottom-left corner and shows once
    // per visitor. Hold the FAB back until that corner is free — otherwise they
    // overlap on first visit. If consent is already resolved, appear normally.
    let resolved = true
    try {
      resolved = !!localStorage.getItem("aqly-cookie-consent")
    } catch {
      /* storage blocked — treat as resolved, nothing will show the card */
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    const reveal = (delay: number) => {
      timers.push(setTimeout(() => setShown(true), delay))
      timers.push(setTimeout(() => setExpanded(true), delay + 800))
      timers.push(setTimeout(() => setExpanded(false), delay + 5600))
    }

    if (resolved) {
      reveal(2400)
    } else {
      const onResolved = () => reveal(500)
      window.addEventListener("aqly:cookie-resolved", onResolved, { once: true })
      timers.push(setTimeout(() => {}, 0)) // noop keeps array shape consistent
      return () => {
        window.removeEventListener("aqly:cookie-resolved", onResolved)
        timers.forEach(clearTimeout)
      }
    }
    return () => timers.forEach(clearTimeout)
  }, [])

  const href = TG_URL

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.chat.label}
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          // bottom-28 keeps clear of the CookieConsent card's footer row;
          // z below the cookie card (z-60) so it never sits on top of it
          className="group fixed bottom-28 left-4 z-50 flex items-center gap-2.5 rounded-full bg-[#229ED9] py-2.5 pl-2.5 pr-2.5 text-white shadow-[0_12px_32px_-8px_rgba(34,158,217,0.6)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_16px_40px_-8px_rgba(34,158,217,0.78)] active:scale-95 sm:bottom-6"
        >
          {/* gentle attention pulse ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 0 0 rgba(34,158,217,0.5)", animation: "wa-pulse 2.4s ease-out infinite" }}
          />
          <span className="relative grid h-9 w-9 shrink-0 place-items-center">
            {/* Telegram paper-plane glyph */}
            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" aria-hidden>
              <path d="M21.94 4.3l-3.32 15.65c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.15L18.4 6.1c.41-.36-.09-.56-.63-.2L6.18 13.1l-5.02-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 2.7c.91-.34 1.7.2 1.41 1.6z" />
            </svg>
          </span>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden whitespace-nowrap pr-1.5 text-[14px] font-semibold"
              >
                {t.chat.prompt}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
