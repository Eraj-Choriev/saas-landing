"use client"

import * as React from "react"
import { useI18n } from "@/lib/i18n"

/**
 * Global ElevenLabs Conversational-AI widget — a real, realistic-voice agent
 * the visitor can actually talk to. Embedded the canonical way (custom element
 * + CDN script). The `agent-id` is PUBLIC by design — security is enforced in
 * the ElevenLabs dashboard (Security tab → allowed domains, public agent).
 *
 * Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in .env.local to activate; without it the
 * component renders nothing (no broken widget).
 *
 * Other components open the agent by dispatching `window` event "aqly:open-voice"
 * (e.g. the AI-voice service modal).
 */
const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id"?: string
        variant?: string
        "avatar-orb-color-1"?: string
        "avatar-orb-color-2"?: string
        "action-text"?: string
        "start-call-text"?: string
        "end-call-text"?: string
        "listening-text"?: string
        "speaking-text"?: string
        "override-language"?: string
      }
    }
  }
}

export function VoiceAgent() {
  const { lang } = useI18n()

  // inject the widget script once
  React.useEffect(() => {
    if (!AGENT_ID) return
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
    const s = document.createElement("script")
    s.src = SCRIPT_SRC
    s.async = true
    s.type = "text/javascript"
    document.body.appendChild(s)
  }, [])

  // let other components open the agent
  React.useEffect(() => {
    const onOpen = () => {
      const el = document.querySelector("elevenlabs-convai") as
        | (HTMLElement & { openConversation?: () => void; open?: () => void })
        | null
      try {
        el?.openConversation?.()
        el?.open?.()
      } catch {
        /* widget exposes no programmatic open — the floating launcher is still there */
      }
    }
    window.addEventListener("aqly:open-voice", onOpen)
    return () => window.removeEventListener("aqly:open-voice", onOpen)
  }, [])

  if (!AGENT_ID) return null

  const tr = (ru: string, en: string, tj: string) =>
    lang === "ru" ? ru : lang === "tj" ? tj : en

  return (
    <elevenlabs-convai
      // remount on language change so the widget re-initialises in the new locale
      key={lang}
      agent-id={AGENT_ID}
      avatar-orb-color-1="#ff5b24"
      avatar-orb-color-2="#d17a00"
      action-text={tr("Поговорить с AI-агентом", "Talk to our AI agent", "Бо AI-агент гап занед")}
      start-call-text={tr("Начать разговор", "Start a call", "Оғози сӯҳбат")}
      end-call-text={tr("Завершить", "End call", "Анҷом")}
      listening-text={tr("Слушаю…", "Listening…", "Гӯш мекунам…")}
      speaking-text={tr("Говорю…", "Speaking…", "Гап мезанам…")}
      // ElevenLabs has no Tajik engine → use Russian for the tj UI locale
      override-language={lang === "tj" ? "ru" : lang}
    />
  )
}
