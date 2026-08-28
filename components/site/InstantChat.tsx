"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  // Never over the Reading trainer's timed exam screen.
  const onTrainer = pathname?.startsWith("/toefl") ?? false

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
      {shown && !onTrainer && (
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
          // bottom-7 (28px) so this FAB's centre lines up with the voice widget's
          // launcher on the right (which sits 32px from the bottom, 48px tall →
          // centre at 56px; this circle is 56px tall → centre also at 56px). The
          // FAB only reveals after the CookieConsent card is dismissed, so the
          // bottom-left corner is already clear — no need to perch it higher.
          className="group fixed bottom-7 left-4 z-50 flex items-center rounded-full bg-[#229ED9] p-2.5 text-white shadow-[0_12px_32px_-8px_rgba(34,158,217,0.6)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_16px_40px_-8px_rgba(34,158,217,0.78)] active:scale-95"
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
          {/* label reveal — max-width 0↔Npx tweens smoothly in BOTH directions
              (framer's width:auto couldn't and snapped shut on exit). Pure CSS,
              no mount/unmount. 240px clears the longest localized label. */}
          <span
            className="overflow-hidden whitespace-nowrap text-[14px] font-semibold ease-smooth"
            style={{
              maxWidth: expanded ? 240 : 0,
              opacity: expanded ? 1 : 0,
              paddingLeft: expanded ? 8 : 0,
              paddingRight: expanded ? 6 : 0,
              transition: "max-width 0.34s cubic-bezier(0.16,1,0.3,1), opacity 0.26s ease, padding 0.34s ease",
            }}
          >
            {t.chat.prompt}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
