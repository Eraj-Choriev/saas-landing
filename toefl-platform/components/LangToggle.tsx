"use client"

import { LANGS, useLang } from "@/lib/lang"

/** Three-way language switch for the shell. Exam content is unaffected. */
export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="tf-lang" role="group" aria-label="Interface language">
      {LANGS.map((option) => (
        <button
          key={option.id}
          type="button"
          className="tf-lang-btn"
          aria-pressed={lang === option.id}
          onClick={() => setLang(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
