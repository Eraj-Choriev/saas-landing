"use client"

import Link from "next/link"
import { useState } from "react"
import type { PracticeSet } from "@/lib/types"
import { clozeBlanks, normalizeLetters } from "@/lib/content"
import { useToeflStrings } from "@/lib/ui"
import { LetterCells } from "./LetterCells"
import { formatClock } from "./ExamRunner"
import { LangToggle } from "./LangToggle"
import { Wordmark } from "./Wordmark"

export interface ScoredEntry {
  key: string
  answer: string
  correct: boolean
}

export function ResultsView({
  title,
  sets,
  entries,
  correct,
  total,
  elapsed,
  onRetake,
}: {
  title: string
  runId: string
  sets: PracticeSet[]
  entries: ScoredEntry[]
  correct: number
  total: number
  elapsed: number
  onRetake: () => void
}) {
  const t = useToeflStrings()
  const byKey = Object.fromEntries(entries.map((e) => [e.key, e]))
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)
  const verdictLine =
    percent === 100 ? t.results.perfect : percent >= 70 ? t.results.strong : t.results.keepGoing

  return (
    <div style={{ minHeight: "100dvh" }}>
      <nav className="tf-nav">
        <div className="tf-shell tf-nav-inner">
          <Wordmark />
          <div className="tf-nav-links">
            <Link className="tf-nav-link" href="/">
              {t.results.backHome}
            </Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      <main className="tf-shell" style={{ paddingTop: 44, paddingBottom: 72 }}>
        <p className="tf-eyebrow">{title}</p>
        <h1 className="tf-h1" style={{ marginTop: 10 }}>
          {t.results.title}
        </h1>

        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 28,
            paddingBottom: 30,
            borderBottom: "1px solid var(--rule-soft)",
          }}
        >
          <div className="tf-score-ring" style={{ ["--value" as string]: percent }}>
            <div>
              <div>
                <span className="tf-score-value">
                  {correct}/{total}
                </span>
                <div className="tf-score-label">{percent}%</div>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <p className="tf-lede" style={{ color: "#cfe0ee", fontSize: 17 }}>
              {verdictLine}
            </p>
            <p className="tf-card-meta" style={{ marginTop: 12 }}>
              {t.results.timeLabel} {formatClock(elapsed)}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              <button type="button" className="tf-btn" data-variant="primary" onClick={onRetake}>
                {t.results.retake}
              </button>
              <Link className="tf-btn" data-variant="ghost" href="/">
                {t.results.backHome}
              </Link>
              <Link className="tf-btn" data-variant="quiet" href="/answers">
                {t.results.reviewAnswers}
              </Link>
            </div>
          </div>
        </div>

        <h2 className="tf-h2" style={{ marginTop: 34, marginBottom: 16 }}>
          {t.results.breakdown}
        </h2>

        <div style={{ display: "grid", gap: 10 }}>
          {sets.map((set) =>
            set.kind === "cloze" ? (
              <ClozeResult key={set.id} set={set} byKey={byKey} />
            ) : (
              set.questions.map((question) => {
                const entry = byKey[`${set.id}:${question.number}`]
                const chosen = question.choices.find((c) => c.id === entry?.answer)
                const right = question.choices.find((c) => c.id === question.answer)!
                const state = !entry?.answer ? "skipped" : entry.correct ? "right" : "wrong"
                return (
                  <div key={question.number} className="tf-result-item">
                    <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                      <span className="tf-card-meta">{question.number}</span>
                      <p style={{ flex: 1, fontSize: 15, color: "#eaf2f9", lineHeight: 1.45 }}>
                        {question.prompt.split("\n")[0]}
                      </p>
                      <span className="tf-verdict" data-v={state}>
                        {state === "right"
                          ? t.results.correct
                          : state === "wrong"
                            ? t.results.incorrect
                            : t.results.skipped}
                      </span>
                    </div>

                    <dl style={{ marginTop: 12, display: "grid", gap: 6, fontSize: 14 }}>
                      {state !== "right" ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <dt className="tf-card-meta" style={{ minWidth: 92 }}>
                            {t.results.yourAnswer}
                          </dt>
                          <dd style={{ color: "#f0a79c" }}>
                            {chosen ? `${chosen.id}. ${chosen.text}` : t.results.noAnswer}
                          </dd>
                        </div>
                      ) : null}
                      <div style={{ display: "flex", gap: 8 }}>
                        <dt className="tf-card-meta" style={{ minWidth: 92 }}>
                          {t.results.correctAnswer}
                        </dt>
                        <dd style={{ color: "#7fd9b6" }}>
                          {right.id}. {right.text}
                        </dd>
                      </div>
                    </dl>

                    <p className="tf-explanation">{question.explanation}</p>
                  </div>
                )
              })
            ),
          )}
        </div>
      </main>
    </div>
  )
}

/** A cloze set reads best as the whole paragraph replayed with every gap judged. */
function ClozeResult({
  set,
  byKey,
}: {
  set: Extract<PracticeSet, { kind: "cloze" }>
  byKey: Record<string, ScoredEntry>
}) {
  const t = useToeflStrings()
  const [open, setOpen] = useState(true)
  const blanks = clozeBlanks(set)
  const wrong = blanks.filter((b) => !byKey[`${set.id}:${b.number}`]?.correct)

  return (
    <div className="tf-result-item">
      <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <span className="tf-card-meta">
          {blanks[0].number}–{blanks[blanks.length - 1].number}
        </span>
        <p style={{ flex: 1, fontSize: 15, color: "#eaf2f9" }}>{set.title}</p>
        <span className="tf-verdict" data-v={wrong.length === 0 ? "right" : "skipped"}>
          {blanks.length - wrong.length}/{blanks.length}
        </span>
        <button
          type="button"
          className="tf-btn"
          data-variant="quiet"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.answers.hide : t.answers.show}
        </button>
      </div>

      {open ? (
        <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
          {blanks.map((blank) => {
            const entry = byKey[`${set.id}:${blank.number}`]
            const typed = normalizeLetters(entry?.answer ?? "")
            const ok = entry?.correct === true
            return (
              <div
                key={blank.number}
                style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}
              >
                <span className="tf-card-meta" style={{ minWidth: 28 }}>
                  {blank.number}
                </span>
                <span style={{ fontFamily: "var(--reading)", color: "#eaf2f9", minWidth: 96 }}>
                  {blank.stem}
                  <b style={{ color: ok ? "#7fd9b6" : "#f0a79c", fontWeight: 500 }}>{blank.answer}</b>
                </span>
                {ok ? (
                  <span className="tf-verdict" data-v="right">
                    {t.results.correct}
                  </span>
                ) : (
                  <>
                    <span className="tf-card-meta">{t.results.yourAnswer}</span>
                    {typed ? (
                      <LetterCells value={typed} length={blank.answer.length} tone="desk" state="wrong" />
                    ) : (
                      <span className="tf-verdict" data-v="skipped">
                        {t.results.skipped}
                      </span>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
