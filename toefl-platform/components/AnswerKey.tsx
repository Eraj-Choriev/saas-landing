"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { PracticeSet, SectionId } from "@/lib/types"
import { allSets, clozeBlanks, sections } from "@/lib/content"
import { useToeflStrings } from "@/lib/ui"
import { LetterCells } from "./LetterCells"
import { LangToggle } from "./LangToggle"
import { Wordmark } from "./Wordmark"

/** Everything a set contributes to the key, flattened once for searching. */
function haystack(set: PracticeSet): string {
  if (set.kind === "cloze") {
    return [
      set.title,
      ...clozeBlanks(set).map((b) => `${b.number} ${b.stem}${b.answer}`),
    ].join(" ").toLowerCase()
  }
  return [
    set.title,
    ...set.questions.flatMap((q) => [
      String(q.number),
      q.prompt,
      ...q.choices.map((c) => c.text),
      q.explanation,
    ]),
  ].join(" ").toLowerCase()
}

const index = allSets.map((set) => ({ set, text: haystack(set) }))

export function AnswerKey() {
  const t = useToeflStrings()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<SectionId | "all">("all")
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return index
      .filter(({ set, text }) => {
        if (filter !== "all" && set.section !== filter) return false
        return !needle || text.includes(needle)
      })
      .map(({ set }) => set)
  }, [filter, query])

  const questionCount = visible.reduce(
    (n, set) => n + (set.kind === "cloze" ? clozeBlanks(set).length : set.questions.length),
    0,
  )

  return (
    <div>
      <nav className="tf-nav">
        <div className="tf-shell tf-nav-inner">
          <Wordmark />
          <div className="tf-nav-links">
            <Link className="tf-nav-link" href="/">
              {t.nav.overview}
            </Link>
            <Link className="tf-nav-link" href="/answers" aria-current="page">
              {t.nav.answers}
            </Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      <main className="tf-shell" style={{ paddingTop: 44, paddingBottom: 72 }}>
        <h1 className="tf-h1">{t.answers.title}</h1>
        <p className="tf-lede" style={{ marginTop: 14 }}>
          {t.answers.lede}
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 26,
            alignItems: "center",
            position: "sticky",
            top: 60,
            zIndex: 20,
            background: "var(--desk)",
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <input
            className="tf-field"
            style={{ flex: "1 1 260px" }}
            type="search"
            value={query}
            placeholder={t.answers.search}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t.answers.search}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button type="button" className="tf-chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              {t.answers.filterAll}
            </button>
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="tf-chip"
                aria-pressed={filter === section.id}
                onClick={() => setFilter(section.id)}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        <p className="tf-card-meta">
          {visible.length} {t.home.setsWord} · {questionCount} {t.home.questions}
        </p>

        {visible.length === 0 ? (
          <p className="tf-lede" style={{ marginTop: 24 }}>
            {t.answers.noMatches}
          </p>
        ) : (
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {visible.map((set) => (
              <section key={set.id} className="tf-result-item">
                <header
                  style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}
                >
                  <span className="tf-card-meta">{String(set.index).padStart(2, "0")}</span>
                  <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>
                    {set.title}
                  </h2>
                  <span className="tf-card-meta" style={{ marginLeft: "auto" }}>
                    {sections.find((s) => s.id === set.section)?.name}
                  </span>
                  <Link className="tf-btn" data-variant="quiet" href={`/practice/${set.id}`}>
                    {t.home.open} →
                  </Link>
                </header>

                {set.kind === "cloze" ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px 20px",
                      marginTop: 16,
                      fontFamily: "var(--reading)",
                      fontSize: 16,
                      color: "#eaf2f9",
                    }}
                  >
                    {clozeBlanks(set).map((blank) => (
                      <span key={blank.number} style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
                        <span className="tf-blank-hint">{blank.number}</span>
                        {blank.stem}
                        <LetterCells value={blank.answer} length={blank.answer.length} tone="desk" />
                      </span>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
                    {set.questions.map((question) => {
                      const key = `${set.id}:${question.number}`
                      const right = question.choices.find((c) => c.id === question.answer)!
                      return (
                        <div key={question.number}>
                          <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                            <span className="tf-card-meta" style={{ minWidth: 30 }}>
                              {question.number}
                            </span>
                            <p style={{ flex: "1 1 240px", fontSize: 14.5, color: "#c8d8e6", lineHeight: 1.45 }}>
                              {question.prompt.split("\n")[0]}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "baseline",
                              marginTop: 6,
                              paddingLeft: 42,
                              flexWrap: "wrap",
                            }}
                          >
                            <span className="tf-verdict" data-v="right">
                              {question.answer}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--reading)",
                                fontSize: 15,
                                color: "#7fd9b6",
                                maxWidth: "58ch",
                              }}
                            >
                              {right.text}
                            </span>
                            <button
                              type="button"
                              className="tf-btn"
                              data-variant="quiet"
                              onClick={() => setOpen((c) => ({ ...c, [key]: !c[key] }))}
                            >
                              {open[key] ? t.answers.hide : t.answers.show}
                            </button>
                          </div>
                          {open[key] ? (
                            <p className="tf-explanation" style={{ marginLeft: 42 }}>
                              {question.explanation}
                            </p>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
