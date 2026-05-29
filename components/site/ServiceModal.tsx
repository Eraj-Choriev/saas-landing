"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight, type LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { ServiceVisual } from "./ServiceVisual"

type Details = {
  overview: string
  how: string[]
  features: string[]
}

export function ServiceModal({
  open,
  onOpenChange,
  index,
  Icon,
  color,
  title,
  tag,
  details,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  index: number
  Icon: LucideIcon
  color: string
  title: string
  tag: string
  details: Details
}) {
  const { t } = useI18n()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] bg-ink/55 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <div
                className="fixed inset-0 z-[101] grid place-items-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) onOpenChange(false)
                }}
              >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid max-h-[90vh] w-full max-w-3xl grid-rows-[auto_1fr] overflow-hidden rounded-[28px] border border-ink/10 bg-cream-50 shadow-[0_50px_120px_-30px_rgba(10,14,19,0.6)]"
              >
                {/* visual header */}
                <div
                  className="relative overflow-hidden px-7 pt-7 pb-6 sm:px-9"
                  style={{
                    background: `linear-gradient(135deg, ${color}26, transparent 70%), #141A22`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full blur-3xl"
                    style={{ background: color, opacity: 0.28 }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl"
                        style={{ backgroundColor: color, color: "#0A0E13" }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-100/60">
                          {tag}
                        </p>
                        <Dialog.Title className="mt-0.5 font-display text-[26px] leading-tight tracking-tight text-cream-50 sm:text-[30px]">
                          {title}
                        </Dialog.Title>
                      </div>
                    </div>
                    <Dialog.Close className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-cream-100/70 transition-colors hover:bg-white/10 hover:text-cream-50">
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>

                  {/* the "image" — a stylized product preview */}
                  <div className="relative mt-6">
                    <ServiceVisual index={index} color={color} />
                  </div>
                </div>

                {/* body — scrolls if long */}
                <div className="scrollbar-hide overflow-y-auto px-7 py-7 sm:px-9">
                  <p className="text-[15px] leading-[1.6] text-ink/75 text-pretty">
                    {details.overview}
                  </p>

                  <div className="mt-7 grid gap-7 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-amber">
                        {t.build.modalHow}
                      </p>
                      <ol className="mt-4 space-y-3">
                        {details.how.map((step, i) => (
                          <li key={i} className="flex gap-3 text-[14px] leading-snug text-ink/75">
                            <span
                              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10px] font-medium"
                              style={{ backgroundColor: `${color}33`, color: "#0A0E13" }}
                            >
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-amber">
                        {t.build.modalIncludes}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {details.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink/75">
                            <Check className="h-4 w-4 shrink-0" style={{ color }} strokeWidth={2.5} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => onOpenChange(false)}
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[15px] font-medium text-cream-50 transition-colors hover:bg-ink-800"
                  >
                    {t.build.modalCta}
                    <span
                      className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ backgroundColor: color, color: "#0A0E13" }}
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
