"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion"

const GLOW = 720 // spotlight diameter (px)

/**
 * Cursor-illuminated beam field — adapted from reactbits.dev hero "beams".
 * A faint static grid of vertical beams sits behind the hero; a spring-tracked
 * glow translates over them (mix-blend-screen) so beams brighten under the
 * pointer. Movement is a pure GPU translate3d — no per-frame mask/background
 * repaint — so it holds 60fps even during fast sweeps.
 */
export function HeroBeams() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 140, damping: 28, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 140, damping: 28, mass: 0.6 })

  // centre the glow element on the cursor via transform only (GPU-composited)
  const gx = useTransform(sx, (v) => v - GLOW / 2)
  const gy = useTransform(sy, (v) => v - GLOW / 2)
  const glowTransform = useMotionTemplate`translate3d(${gx}px, ${gy}px, 0)`

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) return
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduce, mx, my])

  // vertical beam stripes, ~46px apart, faded at the edges by a static mask
  const beams =
    "repeating-linear-gradient(90deg, transparent 0, transparent 45px, rgba(169,202,249,0.5) 45px, rgba(169,202,249,0.5) 46px)"
  const edgeFade =
    "radial-gradient(120% 90% at 50% 35%, #000 30%, transparent 80%)"

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* static beam grid — never repaints */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: beams,
          WebkitMaskImage: edgeFade,
          maskImage: edgeFade,
        }}
      />

      {!reduce ? (
        // moving glow — only its transform changes → GPU compositor only
        <motion.div
          className="absolute left-0 top-0 mix-blend-screen will-change-transform"
          style={{
            width: GLOW,
            height: GLOW,
            transform: glowTransform,
            background:
              "radial-gradient(circle, rgba(169,202,249,0.22), rgba(255,91,36,0.12) 38%, transparent 68%)",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(460px_circle_at_50%_40%,rgba(169,202,249,0.16),transparent_70%)]" />
      )}
    </div>
  )
}
