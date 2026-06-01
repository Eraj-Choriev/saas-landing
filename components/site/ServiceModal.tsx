"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ServiceVisual } from "./ServiceVisual"

const EASE = [0.16, 1, 0.3, 1] as const

// staggered tile reveal — fires on mount (modal opens)
const tile = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.18 + i * 0.07, ease: EASE },
})

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
  details: {
    overview: string
    how: string[]
    features: string[]
  }
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
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[60] bg-ink/75 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <div
                className="fixed inset-0 z-[70] grid place-items-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) onOpenChange(false)
                }}
              >
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease: EASE } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-ink-800 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85)]"
              >
                <div className="flex max-h-[90vh] flex-col overflow-y-auto scrollbar-hide">
                  {/* ── TOP: interactive service demo (clean zone, no text overlay) ── */}
                  <div className="relative">
                    <ServiceVisual index={index} color={color} />

                    <Dialog.Close className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink/40 text-cream-100/70 backdrop-blur transition-colors hover:bg-ink/60 hover:text-cream-50">
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>

                  {/* ── title bar: solid dark band below the demo (Variant B — guaranteed legibility) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                    className="flex items-center gap-3.5 border-y border-white/8 bg-ink-800 px-5 py-4 sm:px-7"
                  >
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
                      style={{ backgroundColor: `${color}26`, borderColor: `${color}66`, color }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color }}>
                        {tag}
                      </p>
                      <Dialog.Title className="font-display text-[24px] leading-tight tracking-tight text-cream-50 sm:text-[28px]">
                        {title}
                      </Dialog.Title>
                    </div>
                  </motion.div>

                  {/* ── BOTTOM: bento grid of service info ── */}
                  <div className="relative bg-cream-50 px-5 pb-7 pt-6 sm:px-7 sm:pb-9">
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:grid-rows-[auto_auto]">
                      {/* overview — full width */}
                      <motion.div
                        {...tile(0)}
                        className="rounded-2xl border border-ink/8 bg-cream-100 p-5 sm:col-span-3 sm:p-6"
                      >
                        <p className="text-[15px] leading-[1.6] text-ink/75 text-pretty">
                          {details.overview}
                        </p>
                      </motion.div>

                      {/* how it works — wide tile */}
                      <motion.div
                        {...tile(1)}
                        className="rounded-2xl border border-ink/8 bg-cream-100 p-5 sm:col-span-2 sm:p-6"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-amber">
                          {t.build.modalHow}
                        </p>
                        <ul className="mt-4 space-y-3.5">
                          {details.how.map((step, i) => (
                            <li key={i} className="flex gap-3 text-[14px] leading-[1.5] text-ink/75">
                              <span
                                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold"
                                style={{ backgroundColor: `${color}1f`, color }}
                              >
                                {i + 1}
                              </span>
                              <span className="text-pretty">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* what's included — tall accent tile */}
                      <motion.div
                        {...tile(2)}
                        className="relative overflow-hidden rounded-2xl border p-5 sm:col-span-1 sm:p-6"
                        style={{
                          borderColor: `${color}33`,
                          background: `linear-gradient(160deg, ${color}1a, ${color}08)`,
                        }}
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color }}>
                          {t.build.modalIncludes}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {details.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-ink/80">
                              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} strokeWidth={2.5} />
                              <span className="text-pretty">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* CTA — full-width dark accent band */}
                      <motion.div
                        {...tile(3)}
                        className="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-ink p-5 sm:col-span-3 sm:flex-row sm:items-center sm:p-6"
                      >
                        <div
                          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40"
                          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
                          aria-hidden
                        />
                        <div className="relative">
                          <p className="font-display text-[20px] leading-tight text-cream-50 sm:text-[22px]">
                            {t.build.modalCtaTitle}
                          </p>
                          <p className="mt-1 text-[13.5px] text-cream-100/60">
                            {t.build.modalCtaSub}
                          </p>
                        </div>
                        <Button
                          href="#contact"
                          variant="accent"
                          size="lg"
                          className="relative shrink-0"
                          onClick={() => onOpenChange(false)}
                        >
                          {t.build.modalCta}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
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
