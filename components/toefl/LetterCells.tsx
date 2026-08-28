"use client"

/** Read-only row of letter cells — used in the hero, results, and answer key. */
export function LetterCells({
  value,
  length,
  tone = "paper",
  state,
}: {
  value: string
  length: number
  tone?: "paper" | "desk"
  state?: "right" | "wrong"
}) {
  const letters = Array.from({ length }, (_, i) => value[i] ?? "")
  return (
    <span className="tf-cells" data-tone={tone}>
      {letters.map((letter, i) => (
        <span key={i} className="tf-cell" data-filled={letter !== ""} data-state={letter ? state : undefined}>
          {letter}
        </span>
      ))}
    </span>
  )
}
