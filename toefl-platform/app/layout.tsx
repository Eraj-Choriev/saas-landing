import type { Metadata, Viewport } from "next"
import { Golos_Text, JetBrains_Mono, Source_Serif_4 } from "next/font/google"
import { LangProvider } from "@/lib/lang"
import "./globals.css"

// Golos Text and JetBrains Mono both carry cyrillic-ext, so the RU and TJ shell
// renders in the same faces as the English one.
const golos = Golos_Text({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-golos",
  display: "swap",
})

// Passages are English only, so the reading face needs no Cyrillic.
const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Passage — TOEFL® Reading trainer",
  description:
    "159 TOEFL Reading practice questions across all three passage types, in a test-day interface, with an explanation for every answer.",
}

export const viewport: Viewport = {
  themeColor: "#0b1b2b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${golos.variable} ${sourceSerif.variable} ${mono.variable}`}>
      <body>
        <LangProvider>
          <div className="tf-root">{children}</div>
        </LangProvider>
      </body>
    </html>
  )
}
