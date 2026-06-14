"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
    // rAF-coalesce: collapse a burst of scroll events into one read per frame,
    // and only flip state on a real boundary crossing (no redundant renders)
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 24
          return next === prev ? prev : next
        })
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // `route: true` → a real Next route (next/link applies basePath in prod);
  // the rest are same-page hash anchors.
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#approach", label: t.nav.approach },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
    { href: "/gallery", label: t.nav.gallery, route: true },
    { href: "#contact", label: t.nav.contact },
  ]

  // One consistent dark frosted pill across hero AND cream sections.
  // Scrolling only deepens the glass — no jarring light/dark tone swap.
  // The mobile dropdown shares the same recipe so it reads as one surface.
  // backdrop-filter is IDENTICAL in both states on purpose: animating blur or
  // saturate forces a full re-blur every transition frame — the main source of
  // scroll jank on mobile. Only paint-cheap props (bg, border, shadow) change.
  const glass = scrolled
    ? "border-white/15 bg-ink/55 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)]"
    : "border-white/20 bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.30),inset_0_-10px_28px_-14px_rgba(255,255,255,0.07)]"
  // NOT transition-all: framer animates opacity/transform on the dropdown every
  // frame, and a CSS `all` transition re-interpolates those frames 500ms behind
  // → the menu visibly stutters and "pops". Transition only the glass props.
  const glassTransition = "transition-[background-color,border-color,box-shadow] duration-500"

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
            "relative mx-auto flex items-center justify-between overflow-hidden rounded-full border px-3 py-2",
            glassTransition,
            glass
          )}
        >
          {/* liquid-glass specular sheen — bright band along the top edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02)_38%,transparent_60%)]"
          />
          <a href="#" className="relative pl-3 shrink-0">
            <Wordmark tone="cream" />
          </a>

          <ul className="relative hidden lg:flex items-center gap-1 text-[14px]">
            {links.map((l) => {
              const Cmp = l.route ? Link : "a"
              return (
                <li key={l.href}>
                  <Cmp
                    href={l.href}
                    className="group relative inline-flex items-center rounded-full px-3.5 py-2 text-cream-100/75 transition-colors hover:text-cream-50"
                  >
                    {l.label}
                    <span className="pointer-events-none absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-coral to-brand-amber transition-transform duration-300 group-hover:scale-x-100" />
                  </Cmp>
                </li>
              )
            })}
          </ul>

          <div className="relative flex items-center gap-2 pr-1">
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
              type="button"
              data-open={open}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-ink transition-transform active:scale-95"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className="burger-box" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              // `isolate` — same iOS Safari fix as CookieConsent: backdrop-filter
              // otherwise paints square corners without its own stacking context
              className={cn(
                "lg:hidden relative isolate mt-2 overflow-hidden rounded-3xl border p-2",
                glassTransition,
                glass
              )}
            >
              {/* same specular sheen as the pill — bright band along the top edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02)_38%,transparent_60%)]"
              />
              <ul className="relative flex flex-col">
                {links.map((l) => {
                  const Cmp = l.route ? Link : "a"
                  return (
                    <li key={l.href}>
                      <Cmp
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-cream-100/75 transition-colors hover:bg-white/10 hover:text-cream-50"
                      >
                        {l.label}
                      </Cmp>
                    </li>
                  )
                })}
              </ul>
              <div className="relative flex items-center justify-between gap-2 p-2">
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
