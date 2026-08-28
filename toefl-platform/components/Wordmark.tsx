"use client"

import Link from "next/link"

/**
 * The product name set in the same letter cells the Complete-the-Words
 * exercise uses. Two cells stay lit, the way two letters are always the ones
 * you have to supply.
 */
export function Wordmark() {
  return (
    <Link href="/" className="tf-wordmark" aria-label="Passage — TOEFL Reading trainer">
      <span className="tf-wordmark-cells" aria-hidden="true">
        {"PASSAGE".split("").map((letter, i) => (
          <span key={i} className="tf-wordmark-cell" data-lit={i === 4 || i === 5}>
            {letter}
          </span>
        ))}
      </span>
    </Link>
  )
}
