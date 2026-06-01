import type { Metadata } from "next"
import { Playfair_Display, Manrope } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { I18nProvider } from "@/lib/i18n"
import { SmoothScroll } from "@/components/site/SmoothScroll"
import { VoiceAgent } from "@/components/site/VoiceAgent"
import "./globals.css"

// Display — high-contrast editorial serif, full Cyrillic (works for RU + EN)
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
      className={`${playfair.variable} ${manrope.variable} ${GeistMono.variable}`}
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
