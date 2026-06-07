"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Globe,
  Mic,
  Workflow,
  Sparkles,
  PenTool,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { ServiceModal } from "./ServiceModal"

// icon + accent colour per service — gives each card its own identity
const META: { Icon: LucideIcon; color: string }[] = [
  { Icon: Send, color: "#a9caf9" },
  { Icon: Globe, color: "#d17a00" },
  { Icon: Mic, color: "#ff5b24" },
  { Icon: Workflow, color: "#d17a00" },
  { Icon: Sparkles, color: "#a9caf9" },
  { Icon: PenTool, color: "#ff5b24" },
]

// bento tiling on a 6-col grid: two tall 2×2 corners (0,2), wide mid tiles
// (1,3) and two half-width bottom tiles (4,5). Tiles perfectly, no gaps.
// Below lg it collapses to a simple 2-col / 1-col grid (spans are lg-only).
const SPAN = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
]
const FEATURED = new Set([0, 2]) // the tall tiles get a larger heading

export function WhatWeBuild() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative bg-cream-100 border-y border-ink/8">
      {/* soft texture so the section is not a flat block */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
        style={{
          backgroundImage: "radial-gradient(rgba(10,14,19,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="container relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-amber"
          >
            {t.build.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.15, delay: 0.09 }}
            className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-ink sm:text-[48px] lg:text-[56px] text-balance"
          >
            {t.build.title}
          </motion.h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(210px,1fr)]">
          {t.build.items.map((item, i) => (
            <ServiceCard
              key={i}
              index={i}
              Icon={META[i].Icon}
              color={META[i].color}
              title={item.title}
              body={item.body}
              featured={FEATURED.has(i)}
              spanClass={SPAN[i]}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ServiceModal
          open={openIndex !== null}
          onOpenChange={(v) => !v && setOpenIndex(null)}
          index={openIndex}
          Icon={META[openIndex].Icon}
          color={META[openIndex].color}
          title={t.build.items[openIndex].title}
          tag={t.build.items[openIndex].tag}
          details={t.build.items[openIndex].details}
        />
      )}
    </section>
  )
}

function ServiceCard({
  index,
  Icon,
  color,
  title,
  body,
  featured = false,
  spanClass = "",
  onOpen,
}: {
  index: number
  Icon: LucideIcon
  color: string
  title: string
  body: string
  featured?: boolean
  spanClass?: string
  onOpen: () => void
}) {
  const { t } = useI18n()
  const ref = useRef<HTMLButtonElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onClick={onOpen}
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-[26px] border border-ink/8 bg-cream-50 p-7 text-left transition-[border-color,box-shadow] duration-300 ${spanClass}`}
      style={
        {
          "--card-accent": color,
        } as React.CSSProperties
      }
    >
      {/* cursor spotlight tinted with the card's accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), ${color}22, transparent 70%)`,
        }}
      />
      {/* accent ring on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 ring-1 ring-inset transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${color}66, 0 30px 70px -32px ${color}99` }}
      />
      {/* top hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* always-on accent wash — kills the flat-cream look */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{ background: `linear-gradient(to top, ${color}14, transparent)` }}
        aria-hidden
      />
      {/* soft corner glow, intensifies on hover */}
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: `radial-gradient(circle, ${color}40, transparent 70%)` }}
        aria-hidden
      />

      {/* signature per-service line-art filling the empty space */}
      <ServiceArt index={index} color={color} featured={featured} />

      <div className="relative flex w-full items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-cream-50 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5 transition-colors duration-300" style={{ color }} strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[12px] tracking-[0.2em] text-ink/25 transition-colors group-hover:text-ink/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className={`relative mt-7 font-display leading-[1.1] tracking-tight text-ink ${
          featured ? "text-[26px] lg:text-[30px]" : "text-[23px]"
        }`}
      >
        {title}
      </h3>
      <p
        className={`relative mt-3 flex-1 leading-[1.55] text-ink/65 text-pretty ${
          featured ? "text-[15px] lg:max-w-[34ch]" : "text-[14px]"
        }`}
      >
        {body}
      </p>

      {/* always-visible Learn more — clearly clickable */}
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/70 transition-colors group-hover:text-ink">
        {t.build.learnMore}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color }}
        />
      </span>
    </motion.button>
  )
}

/* ════════════════ per-service signature line-art ════════════════
   Pure SVG, drawn in the card's accent colour (currentColor). Sits behind
   the text, fills the empty lower region, and lifts gently on hover. */

const BRAND = { blue: "#a9caf9", amber: "#d17a00", coral: "#ff5b24" }

function ServiceArt({
  index,
  color,
  featured,
}: {
  index: number
  color: string
  featured: boolean
}) {
  const wrap = featured
    ? "absolute inset-x-7 bottom-[4.75rem] flex items-end justify-center"
    : "absolute -bottom-1 right-4 flex items-end justify-end"
  const size = featured ? "h-36 w-full max-w-[280px]" : "h-24 w-32"

  return (
    <div className={`${wrap} pointer-events-none`} aria-hidden>
      <div
        className={`${size} opacity-80 transition-all duration-700 ease-smooth group-hover:-translate-y-1.5 group-hover:opacity-100`}
        style={{ color }}
      >
        {ART[index]}
      </div>
    </div>
  )
}

const ART: React.ReactNode[] = [
  // 0 · Telegram — rising chat bubbles + paper plane
  <svg key="0" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    <rect x="6" y="84" width="92" height="34" rx="17" fill="currentColor" opacity="0.10" />
    <rect x="6" y="84" width="92" height="34" rx="17" stroke="currentColor" strokeOpacity="0.45" />
    <rect x="40" y="46" width="104" height="32" rx="16" fill="currentColor" opacity="0.14" />
    <rect x="40" y="46" width="104" height="32" rx="16" stroke="currentColor" strokeOpacity="0.5" />
    <rect x="104" y="12" width="76" height="28" rx="14" fill="currentColor" opacity="0.20" />
    <path d="M158 102l60-26-24 58-11-23-25-9z" fill="currentColor" opacity="0.9" />
    <path d="M218 76l-32 35" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
  </svg>,

  // 1 · Websites — browser frame + ascending performance bars
  <svg key="1" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    <rect x="24" y="14" width="192" height="100" rx="14" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
    <path d="M24 40h192" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
    <circle cx="40" cy="27" r="3.2" fill="currentColor" opacity="0.6" />
    <circle cx="52" cy="27" r="3.2" fill="currentColor" opacity="0.4" />
    <circle cx="64" cy="27" r="3.2" fill="currentColor" opacity="0.25" />
    <rect x="44" y="84" width="20" height="18" rx="4" fill="currentColor" opacity="0.35" />
    <rect x="76" y="70" width="20" height="32" rx="4" fill="currentColor" opacity="0.55" />
    <rect x="108" y="56" width="20" height="46" rx="4" fill="currentColor" opacity="0.75" />
    <rect x="140" y="64" width="20" height="38" rx="4" fill="currentColor" opacity="0.5" />
    <rect x="172" y="48" width="20" height="54" rx="4" fill="currentColor" opacity="0.9" />
  </svg>,

  // 2 · Voice — equalizer waveform
  <svg key="2" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    {[34, 58, 86, 110, 74, 122, 96, 64, 112, 80, 52, 36].map((h, i) => (
      <rect
        key={i}
        x={10 + i * 19}
        y={124 - h}
        width="9"
        height={h}
        rx="4.5"
        fill="currentColor"
        opacity={0.35 + (i % 3) * 0.22}
      />
    ))}
  </svg>,

  // 3 · AI Automation — connected nodes + travelling packet
  <svg key="3" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    <path d="M34 96C70 96 80 44 120 44s52 52 86 52" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 6" />
    <circle cx="34" cy="96" r="11" fill="currentColor" opacity="0.16" />
    <circle cx="34" cy="96" r="11" stroke="currentColor" strokeOpacity="0.55" />
    <circle cx="120" cy="44" r="13" fill="currentColor" opacity="0.22" />
    <circle cx="120" cy="44" r="13" stroke="currentColor" strokeOpacity="0.6" />
    <circle cx="206" cy="96" r="11" fill="currentColor" opacity="0.16" />
    <circle cx="206" cy="96" r="11" stroke="currentColor" strokeOpacity="0.55" />
    <circle cx="120" cy="44" r="4" fill="currentColor" />
  </svg>,

  // 4 · AI Integration — concentric arcs + spark
  <svg key="4" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    <circle cx="150" cy="92" r="22" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
    <circle cx="150" cy="92" r="42" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
    <circle cx="150" cy="92" r="62" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
    <circle cx="150" cy="92" r="6" fill="currentColor" />
    <path d="M58 40c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" fill="currentColor" opacity="0.85" />
  </svg>,

  // 5 · Design — overlapping brand swatches + pen nib
  <svg key="5" viewBox="0 0 240 130" fill="none" className="h-full w-full">
    <circle cx="78" cy="78" r="34" fill={BRAND.blue} opacity="0.55" />
    <circle cx="118" cy="78" r="34" fill={BRAND.amber} opacity="0.5" />
    <circle cx="98" cy="50" r="34" fill={BRAND.coral} opacity="0.45" />
    <path d="M176 44l34 14-14 34-10-14-14-4 4-14z" fill="currentColor" opacity="0.85" />
    <path d="M196 64l-14 28" stroke="#FBF8F2" strokeOpacity="0.7" strokeWidth="1.5" />
  </svg>,
]
