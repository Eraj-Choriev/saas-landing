"use client"

import { usePathname } from "next/navigation"
import { SmoothScroll } from "@/components/site/SmoothScroll"
import { VoiceAgent } from "@/components/site/VoiceAgent"
import { CookieConsent } from "@/components/site/CookieConsent"
import { InstantChat } from "@/components/site/InstantChat"

/**
 * Global, mount-once chrome (smooth-scroll, voice widget, cookie card, instant
 * chat). Suppressed on the immersive /gallery route so its own HUD owns the
 * screen corners.
 */
export function GlobalChrome() {
  const pathname = usePathname()
  if (pathname?.startsWith("/gallery")) return null
  return (
    <>
      <SmoothScroll />
      <VoiceAgent />
      <CookieConsent />
      <InstantChat />
    </>
  )
}
