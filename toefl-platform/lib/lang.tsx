"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

/**
 * Language state for the trainer shell. Only the interface is translated —
 * passages, prompts, choices, and explanations stay in English, because that is
 * the language of the exam.
 */
export type Lang = "ru" | "en" | "tj"

export const LANGS: { id: Lang; label: string }[] = [
  { id: "ru", label: "RU" },
  { id: "en", label: "EN" },
  { id: "tj", label: "TJ" },
]

const STORAGE_KEY = "passage-lang"

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "ru",
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru")

  // Read after mount so the server and first client render agree.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "ru" || saved === "en" || saved === "tj") setLangState(saved)
    } catch {
      /* storage blocked — the default is fine */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
