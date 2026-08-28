"use client"

import Link from "next/link"
import { exams, examsById, sections, setQuestionCount, setsById, totalQuestions } from "@/lib/toefl/content"
import { bestAttempt, setStatus, useProgress } from "@/lib/toefl/progress"
import { useToeflStrings } from "@/lib/toefl/ui"
import { HeroCloze } from "./HeroCloze"
import { Wordmark } from "./Wordmark"

export function Overview() {
  const t = useToeflStrings()
  const { progress, stats, ready, reset } = useProgress()

  const resumeHref = progress.lastRun
    ? progress.lastRun.kind === "exam"
      ? `/toefl/practice/${progress.lastRun.id}`
      : `/toefl/practice/${progress.lastRun.id}`
    : null
  const resumeLabel = progress.lastRun
    ? (examsById[progress.lastRun.id]?.title ?? setsById[progress.lastRun.id]?.title ?? "")
    : ""

  return (
    <div>
      <nav className="tf-nav">
        <div className="tf-shell tf-nav-inner">
          <Wordmark />
          <div className="tf-nav-links">
            <Link className="tf-nav-link" href="/toefl" aria-current="page">
              {t.nav.overview}
            </Link>
            <a className="tf-nav-link" href="#practice">
              {t.nav.practice}
            </a>
            <Link className="tf-nav-link" href="/toefl/answers">
              {t.nav.answers}
            </Link>
            <Link className="tf-nav-link" href="/" style={{ color: "#6f8ba3" }}>
              Aqly ↗
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="tf-shell" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div
            style={{
              display: "grid",
              gap: 40,
              gridTemplateColumns: "minmax(0, 1.02fr) minmax(0, 1fr)",
              alignItems: "center",
            }}
            className="tf-hero-grid"
          >
            <div>
              <p className="tf-eyebrow">{t.home.eyebrow}</p>
              <h1 className="tf-h1" style={{ marginTop: 14 }}>
                {t.home.title}
              </h1>
              <p className="tf-lede" style={{ marginTop: 18 }}>
                {t.home.lede}
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
                <Link className="tf-btn" data-variant="primary" href={`/toefl/practice/${exams[0].id}`}>
                  {t.home.startTest}
                </Link>
                <a className="tf-btn" data-variant="ghost" href="#practice">
                  {t.home.browseSets}
                </a>
              </div>

              {ready && resumeHref && stats.answered > 0 ? (
                <p style={{ marginTop: 22, fontSize: 13.5, color: "#9fb4c7" }}>
                  {t.home.resume}:{" "}
                  <Link href={resumeHref} style={{ color: "var(--flag)" }}>
                    {resumeLabel} →
                  </Link>
                </p>
              ) : null}
            </div>

            <HeroCloze />
          </div>
        </section>

        {/* Progress */}
        <section className="tf-shell" style={{ paddingBottom: 52 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 1,
              background: "var(--rule-soft)",
              border: "1px solid var(--rule-soft)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Stat label={t.home.statQuestions} value={String(totalQuestions)} />
            <Stat
              label={t.home.statAnswered}
              value={ready ? `${stats.answered}` : "—"}
              hint={ready ? `/ ${stats.total}` : undefined}
            />
            <Stat
              label={t.home.statAccuracy}
              value={ready && stats.answered > 0 ? `${Math.round(stats.accuracy * 100)}%` : "—"}
            />
            <Stat
              label={t.home.statSets}
              value={ready ? `${stats.setsFinished}` : "—"}
              hint={ready ? `/ ${Object.keys(setsById).length}` : undefined}
            />
          </div>
        </section>

        {/* Full tests */}
        <section className="tf-shell" style={{ paddingBottom: 56 }}>
          <div className="tf-measure">
            <span className="tf-measure-index">{t.home.examsTitle}</span>
            <p style={{ fontSize: 13.5, color: "#7f95a8" }}>{t.home.examsLede}</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(196px, 1fr))",
              gap: 10,
              marginTop: 18,
            }}
          >
            {exams.map((exam) => {
              const best = ready ? bestAttempt(progress, exam.id) : undefined
              return (
                <Link key={exam.id} href={`/toefl/practice/${exam.id}`} className="tf-card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span className="tf-card-meta">
                      {String(exam.index).padStart(2, "0")} · {exam.minutes} {t.home.minutes}
                    </span>
                    {best ? (
                      <span className="tf-card-meta" style={{ color: "var(--flag)" }}>
                        {t.home.bestScore} {best.correct}/{best.total}
                      </span>
                    ) : null}
                  </div>
                  <p className="tf-card-title" style={{ marginTop: 10 }}>
                    {exam.title}
                  </p>
                  <p style={{ fontSize: 12.5, color: "#7f95a8", marginTop: 6, lineHeight: 1.45 }}>
                    {exam.blurb}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Sets, by passage type */}
        <section id="practice" className="tf-shell" style={{ paddingBottom: 40 }}>
          {sections.map((section) => (
            <div key={section.id} style={{ marginBottom: 46 }}>
              <div className="tf-measure">
                <span className="tf-measure-index">
                  {t.home.sectionOrder} {section.order}
                </span>
                <h2 className="tf-h2">{section.name}</h2>
                <span className="tf-card-meta" style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>
                  {section.sets.length} {t.home.setsWord} · {section.questionCount} {t.home.questions}
                </span>
              </div>
              <p className="tf-lede" style={{ marginTop: 14, fontSize: 14.5 }}>
                {t.sectionBlurb[section.id]}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                {section.sets.map((set) => {
                  const status = ready ? setStatus(progress, set.id) : null
                  const count = setQuestionCount(set)
                  const pct = status && status.total ? (status.answered / status.total) * 100 : 0
                  return (
                    <Link key={set.id} href={`/toefl/practice/${set.id}`} className="tf-card">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <span className="tf-card-meta">{String(set.index).padStart(2, "0")}</span>
                        <span className="tf-card-meta">
                          {count} {t.home.questions}
                        </span>
                      </div>
                      <p className="tf-card-title" style={{ marginTop: 10, marginBottom: 14 }}>
                        {set.title}
                      </p>
                      <div className="tf-card-bar">
                        <span style={{ width: `${pct}%` }} />
                      </div>
                      <p className="tf-card-meta" style={{ marginTop: 8 }}>
                        {!status || status.answered === 0
                          ? t.home.notStarted
                          : status.complete
                            ? `${t.home.done} · ${status.correct}/${status.total}`
                            : `${status.answered}/${status.total}`}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        <footer
          className="tf-shell"
          style={{ paddingTop: 28, paddingBottom: 56, borderTop: "1px solid var(--rule-soft)" }}
        >
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
            <p style={{ flex: "1 1 380px", fontSize: 12.5, lineHeight: 1.6, color: "#6f8ba3", maxWidth: "70ch" }}>
              {t.home.sourceNote}
            </p>
            {ready && stats.answered > 0 ? (
              <button
                type="button"
                className="tf-btn"
                data-variant="quiet"
                onClick={() => {
                  if (window.confirm(t.home.resetConfirm)) reset()
                }}
              >
                {t.home.reset}
              </button>
            ) : null}
          </div>
        </footer>
      </main>
    </div>
  )
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ background: "var(--desk-2)", padding: "18px 20px" }}>
      <div className="tf-eyebrow">{label}</div>
      <div
        style={{
          marginTop: 8,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
        {hint ? (
          <span style={{ fontSize: 14, color: "#6f8ba3", marginLeft: 6, fontWeight: 400 }}>{hint}</span>
        ) : null}
      </div>
    </div>
  )
}
