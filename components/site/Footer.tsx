"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { Wordmark } from "@/components/ui/wordmark"
import { LangToggle } from "./LangToggle"

/* ── brand glyphs + accent colour per network ── */
type SocialIcon = "telegram" | "whatsapp" | "instagram" | "facebook"

const SOCIAL_META: Record<SocialIcon, { color: string; Glyph: () => JSX.Element }> = {
  telegram: {
    color: "#229ED9",
    Glyph: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M21.94 4.5 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.94.46l.33-4.78L18.6 6.4c.38-.34-.08-.53-.6-.19L6.2 13.55l-4.66-1.46c-1.01-.32-1.03-1.01.21-1.5l18.2-7.02c.84-.31 1.58.2 1.3 1.43Z" />
      </svg>
    ),
  },
  whatsapp: {
    color: "#25D366",
    Glyph: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.45 1.34 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    ),
  },
  instagram: {
    color: "#E1306C",
    Glyph: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  facebook: {
    color: "#1877F2",
    Glyph: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    ),
  },
}

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-cream-100 border-t border-ink/10">
      {/* extra bottom padding clears the fixed ElevenLabs voice widget
          (bottom-right launcher) so the legal row is never occluded */}
      <div className="container pt-16 pb-32 sm:pt-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.5fr] lg:gap-16">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.55] text-ink/65 text-pretty">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${t.footer.email}`}
              className="link-underline mt-5 inline-block text-[14px] text-brand-amber"
            >
              {t.footer.email}
            </a>
            <div className="mt-6">
              <LangToggle />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {t.footer.cols.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link-underline text-[14px] text-ink/75 hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* social — brand-tinted icon buttons with hover lift + glow */}
            <div className="col-span-2 sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                {t.footer.socialTitle}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {t.footer.social.map((s, i) => {
                  const meta = SOCIAL_META[s.icon as SocialIcon]
                  if (!meta) return null
                  const { color, Glyph } = meta
                  return (
                    <motion.li
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-ink/10 bg-cream-50 text-ink/55 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white"
                        style={{ ["--c" as string]: color }}
                      >
                        {/* brand fill sweeps up on hover */}
                        <span
                          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-smooth group-hover:scale-y-100"
                          style={{ backgroundColor: color }}
                          aria-hidden
                        />
                        {/* glow */}
                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ boxShadow: `0 12px 30px -10px ${color}` }}
                          aria-hidden
                        />
                        <span className="relative transition-transform duration-300 group-hover:scale-110">
                          <Glyph />
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="text-[12.5px] text-ink/50">{t.footer.rights}</p>
          <ul className="flex flex-wrap gap-5 text-[12.5px] text-ink/55">
            {t.footer.nav.map((n) => (
              <li key={n}>
                <a href="#" className="link-underline hover:text-ink">
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
