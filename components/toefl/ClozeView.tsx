"use client"

import { useEffect, useRef } from "react"
import type { ClozeSet } from "@/lib/toefl/types"
import { normalizeLetters, parseCloze } from "@/lib/toefl/content"

/**
 * The Complete-the-Words exercise. Each gap shows the stem the book prints,
 * followed by one cell per missing letter. A single hidden input per gap owns
 * the caret, so typing, backspace, and arrow keys behave like one field while
 * the cells stay purely visual.
 */
export function ClozeView({
  set,
  values,
  onChange,
  activeNumber,
  onFocusBlank,
  reveal = false,
  readOnly = false,
}: {
  set: ClozeSet
  values: Record<number, string>
  onChange?: (number: number, value: string) => void
  activeNumber?: number
  onFocusBlank?: (number: number) => void
  /** Show the correct letters and mark each cell right or wrong. */
  reveal?: boolean
  readOnly?: boolean
}) {
  const tokens = parseCloze(set)
  const inputs = useRef<Record<number, HTMLInputElement | null>>({})

  // Keep the caret with the question the exam chrome considers current.
  useEffect(() => {
    if (readOnly || activeNumber == null) return
    inputs.current[activeNumber]?.focus()
  }, [activeNumber, readOnly])

  const blanks = tokens.filter((t) => t.type === "blank")

  const step = (from: number, delta: number) => {
    const order = blanks.map((b) => (b.type === "blank" ? b.number : 0))
    const at = order.indexOf(from)
    const next = order[at + delta]
    if (next != null) inputs.current[next]?.focus()
  }

  return (
    <p className="tf-cloze">
      {tokens.map((token, i) => {
        if (token.type === "text") return <span key={i}>{token.value}</span>

        const typed = normalizeLetters(values[token.number] ?? "")
        const correct = reveal ? normalizeLetters(token.answer) : ""
        const isRight = reveal && typed === correct

        return (
          <span
            key={i}
            className="tf-blank"
            data-active={!readOnly && activeNumber === token.number}
          >
            <span className="tf-blank-stem">{token.stem}</span>
            <span className="tf-blank-slot">
              <span className="tf-cells" aria-hidden="true">
                {Array.from({ length: token.answer.length }, (_, slot) => {
                  const letter = reveal && !isRight ? token.answer[slot] : typed[slot] ?? ""
                  const state = reveal ? (isRight ? "right" : "wrong") : undefined
                  return (
                    <span
                      key={slot}
                      className="tf-cell"
                      data-filled={letter !== ""}
                      data-state={letter ? state : undefined}
                    >
                      {letter}
                    </span>
                  )
                })}
              </span>
              {readOnly ? null : (
                <input
                  ref={(node) => {
                    inputs.current[token.number] = node
                  }}
                  value={typed}
                  maxLength={token.answer.length}
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label={`Blank ${token.number}: ${token.stem}`}
                  onFocus={() => onFocusBlank?.(token.number)}
                  onChange={(event) => {
                    const next = normalizeLetters(event.target.value).slice(0, token.answer.length)
                    onChange?.(token.number, next)
                    if (next.length === token.answer.length) step(token.number, 1)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && typed === "") {
                      event.preventDefault()
                      step(token.number, -1)
                    }
                    if (event.key === "Enter" || (event.key === "ArrowRight" && typed.length === token.answer.length)) {
                      event.preventDefault()
                      step(token.number, 1)
                    }
                    if (event.key === "ArrowLeft" && typed.length === 0) {
                      event.preventDefault()
                      step(token.number, -1)
                    }
                  }}
                />
              )}
            </span>
          </span>
        )
      })}
    </p>
  )
}
