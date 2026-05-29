"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Wordmark } from "@/components/ui/wordmark"
import { Button } from "@/components/ui/button"
import { LangToggle } from "./LangToggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#approach", label: t.nav.approach },
    { href: "#contact", label: t.nav.contact },
  ]

  // One consistent dark frosted pill across hero AND cream sections.
  // Scrolling only deepens the glass — no jarring light/dark tone swap.
  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="container pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
            scrolled
              ? "border-white/12 bg-ink/70 backdrop-blur-xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)]"
              : "border-white/8 bg-ink/35 backdrop-blur-md shadow-[0_8px_30px_-16px_rgba(0,0,0,0.5)]"
          )}
        >
          <a href="#" className="pl-3 shrink-0">
            <Wordmark tone="cream" />
          </a>

          <ul className="hidden lg:flex items-center gap-1 text-[14px]">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-center rounded-full px-3.5 py-2 text-cream-100/75 transition-colors hover:text-cream-50"
                >
                  {l.label}
                  <span className="pointer-events-none absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-coral to-brand-amber transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pr-1">
            <div className="hidden sm:block">
              <LangToggle tone="cream" />
            </div>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {t.nav.contact}
            </Button>
            <button
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-ink transition-transform active:scale-95"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-2 rounded-3xl border border-white/12 bg-ink/85 p-2 backdrop-blur-xl shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]"
            >
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-cream-100/75 transition-colors hover:bg-white/10 hover:text-cream-50"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-2 p-2">
                <LangToggle tone="cream" />
                <Button href="#contact" variant="primary" size="sm" onClick={() => setOpen(false)}>
                  {t.nav.contact}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
