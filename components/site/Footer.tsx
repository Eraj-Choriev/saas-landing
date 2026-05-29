"use client"

import { useI18n } from "@/lib/i18n"
import { Wordmark } from "@/components/ui/wordmark"
import { LangToggle } from "./LangToggle"

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-cream-100 border-t border-ink/10">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.5fr] lg:gap-16">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.55] text-ink/65 text-pretty">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${t.footer.email}`}
              className="mt-5 inline-block text-[14px] text-brand-amber hover:text-brand-coral transition-colors"
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
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[14px] text-ink/75 hover:text-ink transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="text-[12.5px] text-ink/50">{t.footer.rights}</p>
          <ul className="flex flex-wrap gap-5 text-[12.5px] text-ink/55">
            {t.footer.nav.map((n) => (
              <li key={n}>
                <a href="#" className="hover:text-ink transition-colors">
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
