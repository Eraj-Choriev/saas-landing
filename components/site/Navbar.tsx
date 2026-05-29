"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
    { href: "#blog", label: t.nav.blog },
    { href: "#community", label: t.nav.community },
  ]

  // tone swaps so the bar is readable over the dark hero AND the cream sections
  const tone = scrolled ? "ink" : "cream"

  return (
    <div className="sticky top-0 z-40 w-full">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="container pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between rounded-full border px-3 py-2 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500",
            scrolled
              ? "glass-light shadow-[0_16px_48px_-18px_rgba(10,14,19,0.28)]"
              : "border-white/[0.1] bg-white/[0.03] backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)]"
          )}
        >
          <a href="#" className="pl-3 shrink-0">
            <Wordmark tone={tone} />
          </a>

          <ul className="hidden lg:flex items-center gap-1 text-[14px]">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors",
                    scrolled
                      ? "text-ink/65 hover:text-ink hover:bg-ink/[0.06]"
                      : "text-cream-100/75 hover:text-cream-50 hover:bg-white/10"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pr-1">
            <div className="hidden sm:block">
              <LangToggle tone={tone} />
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
              className={cn(
                "lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                scrolled
                  ? "bg-ink text-cream-50"
                  : "bg-brand-blue text-ink"
              )}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "lg:hidden mt-2 rounded-3xl border p-2",
              scrolled
                ? "glass-light shadow-[0_16px_48px_-18px_rgba(10,14,19,0.28)]"
                : "border-white/[0.1] bg-ink/90 backdrop-blur-xl"
            )}
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-2xl transition-colors",
                      scrolled
                        ? "text-ink/75 hover:text-ink hover:bg-ink/[0.06]"
                        : "text-cream-100/75 hover:text-cream-50 hover:bg-white/10"
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-2 p-2">
              <LangToggle tone={tone} />
              <Button href="#contact" variant="primary" size="sm">
                {t.nav.contact}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
