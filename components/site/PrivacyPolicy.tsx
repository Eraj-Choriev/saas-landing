"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Wordmark } from "@/components/ui/wordmark"
import { LangToggle } from "./LangToggle"

/* Linkifies the contact email so legal copy stays plain strings in the dicts */
function Linkified({ text }: { text: string }) {
  const EMAIL = "hello@aqly.io"
  const parts = text.split(EMAIL)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${EMAIL}`} className="link-underline text-brand-amber">
              {EMAIL}
            </a>
          )}
        </span>
      ))}
    </>
  )
}

export function PrivacyPolicy() {
  const { t } = useI18n()
  return (
    <main className="min-h-screen bg-cream-50 text-ink">
      <header className="border-b border-ink/10 bg-cream-100">
        <div className="container flex items-center justify-between py-5">
          <Link href="/" aria-label="Aqly.io">
            <Wordmark />
          </Link>
          <LangToggle tone="ink" />
        </div>
      </header>

      <article className="container max-w-3xl py-16 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.privacy.backHome}
        </Link>

        <h1 className="mt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-tightest sm:text-[36px] text-balance">
          {t.privacy.title}
        </h1>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/45">
          {t.privacy.updated}
        </p>
        <p className="mt-6 text-[15.5px] leading-[1.65] text-ink/75 text-pretty">
          {t.privacy.intro}
        </p>

        <div className="mt-12 space-y-10">
          {t.privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[17px] font-medium tracking-tight sm:text-[19px]">
                {s.title}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.65] text-ink/70 text-pretty">
                    <Linkified text={p} />
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 border-t border-ink/10 pt-6">
          <p className="text-[12.5px] text-ink/50">{t.footer.rights}</p>
        </div>
      </article>
    </main>
  )
}
