"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
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
 * The custom element is mounted ONCE, imperatively, and never torn down — React
 * does not own it. This is deliberate: if React (or StrictMode's dev double-mount,
 * or a `key`-driven remount on language change) disconnects the element while the
 * widget's config fetch is in flight, the widget aborts that fetch and logs
 * "[ConversationalAI] Cannot fetch config for agent …: signal is aborted without
 * reason". Mounting once + updating attributes in place avoids the disconnect.
 *
 * Other components open the agent by dispatching `window` event "aqly:open-voice"
 * (e.g. the AI-voice service modal).
 */
const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed"
const EL_ID = "aqly-convai-widget"

export function VoiceAgent() {
  const { lang } = useI18n()
  const pathname = usePathname()
  // The Reading trainer is a timed exam. Nothing floats over it.
  const hidden = pathname?.startsWith("/toefl") ?? false

  // Mount the script + element once, then keep the element alive and only sync
  // its attributes when `lang` changes. Never remove it (no aborted fetch).
  React.useEffect(() => {
    if (!AGENT_ID) return

    // inject the embed script once
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script")
      s.src = SCRIPT_SRC
      s.async = true
      s.type = "text/javascript"
      document.body.appendChild(s)
    }

    const tr = (ru: string, en: string, tj: string) =>
      lang === "ru" ? ru : lang === "tj" ? tj : en

    // create the singleton element if missing, otherwise reuse the existing one
    let el = document.getElementById(EL_ID)
    if (!el) {
      el = document.createElement("elevenlabs-convai")
      el.id = EL_ID
      document.body.appendChild(el)
    }

    // (re)apply attributes in place — language switches without a remount
    el.setAttribute("agent-id", AGENT_ID)
    el.setAttribute("avatar-orb-color-1", "#ff5b24")
    el.setAttribute("avatar-orb-color-2", "#d17a00")
    el.setAttribute("action-text", tr("Поговорить с AI-агентом", "Talk to our AI agent", "Бо AI-агент гап занед"))
    el.setAttribute("start-call-text", tr("Начать разговор", "Start a call", "Оғози сӯҳбат"))
    el.setAttribute("end-call-text", tr("Завершить", "End call", "Анҷом"))
    el.setAttribute("listening-text", tr("Слушаю…", "Listening…", "Гӯш мекунам…"))
    el.setAttribute("speaking-text", tr("Говорю…", "Speaking…", "Гап мезанам…"))
    // ElevenLabs has no Tajik engine → use Russian for the tj UI locale
    el.setAttribute("override-language", lang === "tj" ? "ru" : lang)
  }, [lang])

  // The element is never removed (that would abort its config fetch), so hide
  // it instead while the learner is inside the trainer.
  React.useEffect(() => {
    const el = document.getElementById(EL_ID)
    if (el) el.style.display = hidden ? "none" : ""
  }, [hidden])

  // let other components open the agent
  React.useEffect(() => {
    const onOpen = () => {
      const el = document.getElementById(EL_ID) as
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

  // the widget lives outside React's tree (mounted imperatively above)
  return null
}
