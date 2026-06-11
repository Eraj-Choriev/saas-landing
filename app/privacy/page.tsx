import type { Metadata } from "next"
import { PrivacyPolicy } from "@/components/site/PrivacyPolicy"

export const metadata: Metadata = {
  title: "Privacy Policy — Aqly.io",
  description:
    "How Aqly.io processes the personal data submitted through the contact form: what we collect, why, how long we keep it, and your rights.",
}

export default function PrivacyPage() {
  return <PrivacyPolicy />
}
