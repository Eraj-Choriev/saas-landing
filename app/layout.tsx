import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { I18nProvider } from "@/lib/i18n"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT"],
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
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
