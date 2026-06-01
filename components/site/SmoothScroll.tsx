"use client"

import { useEffect } from "react"

/**
 * Global smooth-scroll for in-page anchor links (#about, #services, …).
 * Intercepts clicks on any `a[href^="#"]`, eases to the target with a
 * navbar-aware offset and a custom curve — far calmer than the browser's
 * instant jump. User wheel/touch interrupts mid-flight; honors
 * prefers-reduced-motion (falls back to an instant, offset-correct jump).
 */

// fixed navbar pill height + breathing room
const HEADER_OFFSET = 92

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0

    function targetTop(hash: string): number | null {
      if (hash === "#") return 0
      const el = document.getElementById(hash.slice(1))
      if (!el) return null
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
    }

    function animateTo(to: number) {
      cancelAnimationFrame(raf)
      const start = window.scrollY
      const dist = to - start
      if (Math.abs(dist) < 2) return
      // distance-scaled duration so short hops stay snappy, long ones glide
      const duration = Math.min(1100, Math.max(480, Math.abs(dist) * 0.55))
      // easeInOutCubic — gentle acceleration, soft settle
      const ease = (x: number) =>
        x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

      let t0: number | null = null
      const step = (now: number) => {
        if (t0 === null) t0 = now
        const p = Math.min(1, (now - t0) / duration)
        window.scrollTo(0, start + dist * ease(p))
        if (p < 1) raf = requestAnimationFrame(step)
        else cleanup()
      }

      const interrupt = () => {
        cancelAnimationFrame(raf)
        cleanup()
      }
      const cleanup = () => {
        window.removeEventListener("wheel", interrupt)
        window.removeEventListener("touchstart", interrupt)
      }
      window.addEventListener("wheel", interrupt, { passive: true })
      window.addEventListener("touchstart", interrupt, { passive: true })
      raf = requestAnimationFrame(step)
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const link = (e.target as HTMLElement | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null
      if (!link || link.target === "_blank") return
      const hash = link.getAttribute("href") || ""
      if (!hash.startsWith("#")) return

      const to = targetTop(hash)
      if (to === null) return // unknown anchor — let it be

      e.preventDefault()
      if (reduce) window.scrollTo(0, to)
      else animateTo(to)
      // keep the URL hash in sync without a second jump
      if (hash !== "#") history.replaceState(null, "", hash)
      else history.replaceState(null, "", window.location.pathname + window.location.search)
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
