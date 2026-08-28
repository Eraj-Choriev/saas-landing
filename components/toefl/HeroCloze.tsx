"use client"

import { useEffect, useState } from "react"
import { completeTheWords } from "@/lib/toefl/content"
import { parseCloze } from "@/lib/toefl/content"
import { useToeflStrings } from "@/lib/toefl/ui"

/**
 * The hero is the exercise itself: the opening of question 1 types its own
 * missing letters, one cell at a time, then rests. It is the most
 * characteristic thing in this product's world, so it opens the page.
 */
export function HeroCloze() {
  const t = useToeflStrings()
  const tokens = parseCloze(completeTheWords[0]).slice(0, 12)
  const letters = tokens
    .filter((token) => token.type === "blank")
    .reduce((n, token) => n + (token.type === "blank" ? token.answer.length : 0), 0)

  const [typed, setTyped] = useState(letters)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    setTyped(0)
    let count = 0
    const tick = window.setInterval(() => {
      count += 1
      setTyped(count)
      // Hold on the finished paragraph for a beat, then start over.
      if (count > letters + 14) count = -6
    }, 130)
    return () => window.clearInterval(tick)
  }, [letters])

  let consumed = 0

  return (
    <figure
      style={{
        margin: 0,
        background: "linear-gradient(180deg, var(--desk-2), #0d2135)",
        border: "1px solid var(--rule-soft)",
        borderRadius: 12,
        padding: "22px 24px 18px",
      }}
    >
      <figcaption className="tf-eyebrow" style={{ marginBottom: 14 }}>
        {t.home.demoCaption}
      </figcaption>
      <p
        style={{
          fontFamily: "var(--reading)",
          fontSize: 18,
          lineHeight: 2.15,
          color: "#e8eef4",
          margin: 0,
        }}
      >
        {tokens.map((token, i) => {
          if (token.type === "text") return <span key={i}>{token.value}</span>
          const start = consumed
          consumed += token.answer.length
          const shown = Math.max(0, Math.min(token.answer.length, typed - start))
          return (
            <span key={i} style={{ whiteSpace: "nowrap" }}>
              {token.stem}
              <span className="tf-cells" data-tone="desk">
                {token.answer.split("").map((letter, slot) => (
                  <span key={slot} className="tf-cell" data-filled={slot < shown}>
                    {slot < shown ? letter : ""}
                  </span>
                ))}
              </span>
            </span>
          )
        })}
        <span aria-hidden="true">…</span>
      </p>
    </figure>
  )
}
