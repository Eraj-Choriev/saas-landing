import type { Metadata } from "next"
import { Unbounded, Playfair_Display, Manrope, Bricolage_Grotesque, Instrument_Serif, DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { I18nProvider } from "@/lib/i18n"
import { SmoothScroll } from "@/components/site/SmoothScroll"
import { VoiceAgent } from "@/components/site/VoiceAgent"
import "./globals.css"

// Display headings — Unbounded: geometric techno display with real character.
// Ships a Cyrillic subset, so RU/TJ headings keep the display face (Michroma was
// Latin-only and fell back to Manrope). Manrope stays as the fallback for any
// Tajik cyrillic-ext glyph Unbounded doesn't cover.
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
})

// Used only by the Design service demo (Latin brand names + Cyrillic copy)
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
})

// Body — refined geometric sans, full Cyrillic (+ ext for Tajik ғ ӣ қ ӯ ҳ ҷ)
const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
})

// Showcase display faces — used only inside the Design service demo (latin brand
// names), so no Cyrillic subset needed. Distinctive, characterful choices.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})
// Used by the AI-Integration map demo — clean, technical, full Cyrillic.
// DM Sans has no Cyrillic Google subset → Latin labels use it; the integration
// map chains Manrope after it so RU/TJ copy still renders cleanly.
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-dmsans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aqly.io — AI agency, engineered.",
  description:
    "Aqly designs, builds and deploys custom AI agents, automations, websites and growth systems for ambitious teams.",
  metadataBase: new URL("https://aqly.io"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${playfair.variable} ${manrope.variable} ${GeistMono.variable} ${bricolage.variable} ${instrument.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <I18nProvider>
          <SmoothScroll />
          {children}
          <VoiceAgent />
        </I18nProvider>
      </body>
    </html>
  )
}
