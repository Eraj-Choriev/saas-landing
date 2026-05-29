"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import {
  Bot,
  Globe,
  Rocket,
  Workflow,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

const icons: LucideIcon[] = [Bot, Globe, Rocket, Workflow, Sparkles, TrendingUp]

export function WhatWeBuild() {
  const { t } = useI18n()
  return (
    <section
      id="services"
      className="relative bg-cream-100 border-y border-ink/8"
    >
      {/* soft texture so the section is not a flat block */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,14,19,0.06) 1px, transparent 1px)",
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
              Icon={icons[i]}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  index,
  Icon,
  title,
  body,
}: {
  index: number
  Icon: LucideIcon
  title: string
  body: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-ink/8 bg-cream-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-[0_30px_70px_-32px_rgba(169,202,249,0.55)]"
    >
      {/* cursor spotlight */}
      <div className="card-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* top gradient hairline revealed on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-ink group-hover:rotate-[-6deg]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[12px] tracking-[0.2em] text-ink/25 transition-colors group-hover:text-brand-coral">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-[23px] leading-[1.1] tracking-tight text-ink">
        {title}
      </h3>
      <p className="relative mt-3 flex-1 text-[14px] leading-[1.55] text-ink/60 text-pretty">
        {body}
      </p>

      <div className="relative mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/0 transition-colors duration-300 group-hover:text-brand-amber">
        <span className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Learn more
        </span>
        <ArrowUpRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
