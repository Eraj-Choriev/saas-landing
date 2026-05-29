"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Globe,
  Rocket,
  Workflow,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { ServiceModal } from "./ServiceModal"

// icon + accent colour per service — gives each card its own identity
const META: { Icon: LucideIcon; color: string }[] = [
  { Icon: Send, color: "#a9caf9" },
  { Icon: Globe, color: "#d17a00" },
  { Icon: Rocket, color: "#ff5b24" },
  { Icon: Workflow, color: "#d17a00" },
  { Icon: Sparkles, color: "#a9caf9" },
  { Icon: TrendingUp, color: "#ff5b24" },
]

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
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-amber"
          >
            {t.build.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-[34px] leading-[1.02] tracking-tightest text-ink sm:text-[48px] lg:text-[56px] text-balance"
          >
            {t.build.title}
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.build.items.map((item, i) => (
            <ServiceCard
              key={i}
              index={i}
              Icon={META[i].Icon}
              color={META[i].color}
              title={item.title}
              body={item.body}
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
  onOpen,
}: {
  index: number
  Icon: LucideIcon
  color: string
  title: string
  body: string
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-ink/8 bg-cream-50 p-7 text-left transition-[border-color,box-shadow] duration-300"
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

      <div className="relative flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-cream-50 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5 transition-colors duration-300" style={{ color }} strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[12px] tracking-[0.2em] text-ink/25 transition-colors group-hover:text-ink/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-[23px] leading-[1.1] tracking-tight text-ink">
        {title}
      </h3>
      <p className="relative mt-3 flex-1 text-[14px] leading-[1.55] text-ink/60 text-pretty">
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
