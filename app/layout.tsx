import type { Metadata } from "next"
import { Geologica, Playfair_Display, Onest, Bricolage_Grotesque, Instrument_Serif, DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { I18nProvider } from "@/lib/i18n"
import { GlobalChrome } from "@/components/site/GlobalChrome"
import "./globals.css"

// Display headings — Geologica: tight contemporary grotesque (replaced the wide
// crypto-flavored Unbounded). Variable weight + full cyrillic-ext, so RU and
// Tajik (ғ ӣ қ ӯ ҳ ҷ) headings render natively with no fallback chain.
const geologica = Geologica({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-geologica",
  display: "swap",
})

// Used only by the Design service demo (Latin brand names + Cyrillic copy)
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
})

// Body — Onest: warm modern geometric sans, full Cyrillic (+ ext for Tajik
// ғ ӣ қ ӯ ҳ ҷ). Replaced Manrope as the body face and as the demo fallback.
const onest = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-onest",
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
// map chains Onest after it so RU/TJ copy still renders cleanly.
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
      className={`${geologica.variable} ${playfair.variable} ${onest.variable} ${GeistMono.variable} ${bricolage.variable} ${instrument.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <I18nProvider>
          {children}
          <GlobalChrome />
        </I18nProvider>
      </body>
    </html>
  )
}
