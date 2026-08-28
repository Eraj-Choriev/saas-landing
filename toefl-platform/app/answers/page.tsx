import type { Metadata } from "next"
import { AnswerKey } from "@/components/AnswerKey"

export const metadata: Metadata = {
  title: "Answer key — Passage",
  description: "Every TOEFL Reading practice answer with the reasoning behind it.",
}

export default function AnswersPage() {
  return <AnswerKey />
}
