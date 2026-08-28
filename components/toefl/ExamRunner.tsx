"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { Item, McqQuestion, PracticeSet } from "@/lib/toefl/types"
import { clozeBlanks, itemsForSet, normalizeLetters, setsById } from "@/lib/toefl/content"
import { useProgress } from "@/lib/toefl/progress"
import { fill, useToeflStrings } from "@/lib/toefl/ui"
import { PassageView } from "./PassageView"
import { ClozeView } from "./ClozeView"
import { ResultsView } from "./ResultsView"

/** One screen of the test: a whole cloze paragraph, or a single question. */
type Step =
  | { kind: "cloze"; setId: string; items: Item[] }
  | { kind: "mcq"; setId: string; question: McqQuestion; item: Item }

export interface ExamRunnerProps {
  runId: string
  runKind: "set" | "exam"
  title: string
  setIds: string[]
  /** Minutes on the clock. Omitted for untimed practice, which counts up. */
  minutes?: number
}

export function ExamRunner({ runId, runKind, title, setIds, minutes }: ExamRunnerProps) {
  const router = useRouter()
  const t = useToeflStrings()
  const { recordAnswers, recordAttempt, setLastRun } = useProgress()

  const sets = useMemo(
    () => setIds.map((id) => setsById[id]).filter(Boolean) as PracticeSet[],
    [setIds],
  )

  const steps = useMemo<Step[]>(() => buildSteps(sets), [sets])
  const items = useMemo<Item[]>(() => sets.flatMap(itemsForSet), [sets])

  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Record<string, boolean>>({})
  const [activeBlank, setActiveBlank] = useState<number | undefined>(undefined)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [clockVisible, setClockVisible] = useState(true)
  const paneRef = useRef<HTMLDivElement>(null)

  const total = minutes ? minutes * 60 : undefined
  const remaining = total != null ? Math.max(0, total - elapsed) : undefined

  useEffect(() => {
    setLastRun({ id: runId, kind: runKind })
  }, [runId, runKind, setLastRun])

  useEffect(() => {
    if (submitted) return
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [submitted])

  const step = steps[stepIndex]

  // Scroll both panes back to the top when the question changes.
  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0 })
    if (step?.kind === "cloze") setActiveBlank(step.items[0]?.number)
    else setActiveBlank(undefined)
  }, [stepIndex, step])

  const score = useCallback(() => {
    let correct = 0
    const entries = items.map((item) => {
      const given = answers[item.key] ?? ""
      const expected = expectedAnswer(item)
      const ok =
        given !== "" &&
        (item.section === "complete-the-words"
          ? normalizeLetters(given) === normalizeLetters(expected)
          : given === expected)
      if (ok) correct += 1
      return { key: item.key, answer: given, correct: ok }
    })
    return { correct, entries }
  }, [answers, items])

  const submit = useCallback(() => {
    if (submitted) return
    const { correct, entries } = score()
    recordAnswers(entries.filter((e) => e.answer !== ""))
    recordAttempt({ runId, finishedAt: Date.now(), correct, total: items.length, elapsed })
    setSubmitted(true)
    setReviewOpen(false)
  }, [elapsed, items.length, recordAnswers, recordAttempt, runId, score, submitted])

  // Out of time submits the paper, exactly as the real section does.
  useEffect(() => {
    if (remaining === 0 && !submitted) submit()
  }, [remaining, submit, submitted])

  const setAnswer = (key: string, value: string) =>
    setAnswers((current) => ({ ...current, [key]: value }))

  const goTo = (index: number) => {
    setStepIndex(Math.max(0, Math.min(steps.length - 1, index)))
    setReviewOpen(false)
  }

  // Keyboard: a–d picks a choice, arrows move between questions.
  useEffect(() => {
    if (submitted || reviewOpen || !step) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (step.kind === "mcq") {
        const key = event.key.toLowerCase()
        const choice = step.question.choices.find((c) => c.id === key)
        if (choice) {
          event.preventDefault()
          setAnswer(step.item.key, choice.id)
          return
        }
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        goTo(stepIndex + 1)
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goTo(stepIndex - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (submitted) {
    const { correct, entries } = score()
    return (
      <ResultsView
        title={title}
        runId={runId}
        sets={sets}
        entries={entries}
        correct={correct}
        total={items.length}
        elapsed={elapsed}
        onRetake={() => {
          setAnswers({})
          setMarked({})
          setStepIndex(0)
          setElapsed(0)
          setSubmitted(false)
        }}
      />
    )
  }

  if (!step) return null

  const answeredCount = items.filter((i) => (answers[i.key] ?? "") !== "").length
  const set = setsById[step.setId]
  const isLast = stepIndex === steps.length - 1
  const counter =
    step.kind === "cloze"
      ? `Questions ${step.items[0].number}–${step.items[step.items.length - 1].number} of ${items.length}`
      : fill(t.exam.questionOf, {
          n: items.findIndex((i) => i.key === step.item.key) + 1,
          total: items.length,
        })

  return (
    <div className="tf-exam">
      <header className="tf-exam-bar">
        <div className="tf-exam-brand">
          TOEFL iBT®
          <span>Reading</span>
        </div>
        <div className="tf-exam-counter">{counter}</div>

        <div className="tf-exam-clock" data-low={remaining != null && remaining <= 120}>
          <span className="tf-clock-label">{remaining != null ? t.exam.remaining : t.exam.elapsed}</span>
          {clockVisible ? (
            <span aria-live="off">{formatClock(remaining ?? elapsed)}</span>
          ) : (
            <span>—:—</span>
          )}
          <button
            type="button"
            className="tf-oval"
            data-tone="dark"
            onClick={() => setClockVisible((v) => !v)}
          >
            {clockVisible ? t.exam.hideTime : t.exam.showTime}
          </button>
        </div>

        <div className="tf-exam-actions">
          <button
            type="button"
            className="tf-oval"
            data-tone="dark"
            onClick={() => {
              if (window.confirm(t.exam.exitConfirm)) router.push("/toefl")
            }}
          >
            {t.exam.exit}
          </button>
          <button type="button" className="tf-oval" onClick={() => setReviewOpen(true)}>
            {t.exam.review}
          </button>
          <button
            type="button"
            className="tf-oval"
            onClick={() => goTo(stepIndex - 1)}
            disabled={stepIndex === 0}
          >
            {t.exam.back}
          </button>
          {isLast ? (
            <button
              type="button"
              className="tf-oval"
              data-active="true"
              onClick={() => {
                if (window.confirm(t.exam.finishConfirm)) submit()
              }}
            >
              {t.exam.finish}
            </button>
          ) : (
            <button type="button" className="tf-oval" onClick={() => goTo(stepIndex + 1)}>
              {t.exam.next}
            </button>
          )}
        </div>
      </header>

      <div className="tf-exam-body" data-single={step.kind === "cloze"}>
        <div className="tf-pane" ref={paneRef}>
          <div className="tf-directions" data-centred={step.kind === "cloze"}>
            {set.directions}
          </div>
          {step.kind === "cloze" ? (
            <ClozeView
              set={set as Extract<PracticeSet, { kind: "cloze" }>}
              values={Object.fromEntries(
                step.items.map((item) => [item.number, answers[item.key] ?? ""]),
              )}
              activeNumber={activeBlank}
              onFocusBlank={setActiveBlank}
              onChange={(number, value) => setAnswer(`${step.setId}:${number}`, value)}
            />
          ) : (
            <PassageView
              passage={(set as Extract<PracticeSet, { kind: "reading" }>).passage}
              selectable={step.question.selectableSentences}
              selectedSentence={selectedSentenceFor(step.question, answers[step.item.key])}
              onSelectSentence={(sentence) => {
                const choice = step.question.choices.find((c) => c.text === sentence)
                if (choice) setAnswer(step.item.key, choice.id)
              }}
            />
          )}
        </div>

        {step.kind === "mcq" ? (
          <div className="tf-pane">
            <QuestionView
              question={step.question}
              value={answers[step.item.key] ?? ""}
              onChange={(value) => setAnswer(step.item.key, value)}
            />
          </div>
        ) : null}

        {reviewOpen ? (
          <ReviewOverlay
            items={items}
            answers={answers}
            marked={marked}
            onPick={(key) => goTo(steps.findIndex((s) => stepContains(s, key)))}
            onClose={() => setReviewOpen(false)}
          />
        ) : null}
      </div>

      <footer className="tf-exam-foot">
        <button
          type="button"
          className="tf-oval"
          data-active={isMarked(step, marked)}
          onClick={() =>
            setMarked((current) => {
              const keys = stepKeys(step)
              const next = { ...current }
              const on = !isMarked(step, current)
              for (const key of keys) next[key] = on
              return next
            })
          }
        >
          {isMarked(step, marked) ? `⚑ ${t.exam.marked}` : `⚑ ${t.exam.markForReview}`}
        </button>
        <span className="tf-review-status" data-state="answered">
          {answeredCount}/{items.length} {t.exam.statusAnswered.toLowerCase()}
        </span>
        <div className="tf-pips">
          {items.map((item) => {
            const index = steps.findIndex((s) => stepContains(s, item.key))
            const state = marked[item.key]
              ? "marked"
              : (answers[item.key] ?? "") !== ""
                ? "answered"
                : "empty"
            return (
              <button
                key={item.key}
                type="button"
                className="tf-pip"
                data-state={state}
                data-current={index === stepIndex}
                title={`${item.number}`}
                aria-label={`Question ${item.number}`}
                onClick={() => goTo(index)}
              />
            )
          })}
        </div>
      </footer>
    </div>
  )
}

// ── Question pane ──────────────────────────────────────────────────────────

function QuestionView({
  question,
  value,
  onChange,
  reveal = false,
}: {
  question: McqQuestion
  value: string
  onChange?: (value: string) => void
  reveal?: boolean
}) {
  const verdictFor = (id: string) => {
    if (!reveal) return undefined
    if (id === question.answer) return "right"
    return id === value ? "wrong" : undefined
  }

  return (
    <div>
      <div className="tf-q-archetype">{question.archetype.replace(/-/g, " ")}</div>
      <p className="tf-q-prompt">{question.prompt}</p>
      {question.note ? <p className="tf-q-note">{question.note}</p> : null}

      {question.insertExcerpt ? (
        <p className="tf-insert">
          {parseInsert(question.insertExcerpt).map((part, i) =>
            part.square ? (
              <button
                key={i}
                type="button"
                className="tf-square"
                data-selected={value === part.square}
                data-verdict={verdictFor(part.square)}
                aria-label={`Insert at square ${part.square.toUpperCase()}`}
                onClick={() => onChange?.(part.square!)}
              />
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      ) : null}

      <div className="tf-choices" role="radiogroup">
        {question.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            role="radio"
            aria-checked={value === choice.id}
            className="tf-choice"
            data-selected={value === choice.id}
            data-verdict={verdictFor(choice.id)}
            onClick={() => onChange?.(choice.id)}
          >
            <span className="tf-choice-key">{choice.id}</span>
            <span>{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Review overlay ─────────────────────────────────────────────────────────

function ReviewOverlay({
  items,
  answers,
  marked,
  onPick,
  onClose,
}: {
  items: Item[]
  answers: Record<string, string>
  marked: Record<string, boolean>
  onPick: (key: string) => void
  onClose: () => void
}) {
  const t = useToeflStrings()
  const firstUnanswered = items.find((i) => (answers[i.key] ?? "") === "")

  return (
    <div className="tf-overlay" role="dialog" aria-modal="true" aria-label={t.exam.reviewTitle}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
          {t.exam.reviewTitle}
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-2)" }}>{t.exam.reviewLede}</p>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {firstUnanswered ? (
            <button type="button" className="tf-oval" onClick={() => onPick(firstUnanswered.key)}>
              {t.exam.goToFirstUnanswered}
            </button>
          ) : null}
          <button type="button" className="tf-oval" onClick={onClose}>
            {t.exam.returnToQuestion}
          </button>
        </div>
      </div>

      <div className="tf-review-grid">
        {items.map((item) => {
          const answered = (answers[item.key] ?? "") !== ""
          const state = marked[item.key] ? "marked" : answered ? "answered" : "empty"
          return (
            <button key={item.key} type="button" className="tf-review-row" onClick={() => onPick(item.key)}>
              <span className="tf-review-num">{item.number}</span>
              <span className="tf-review-status" data-state={state}>
                {marked[item.key]
                  ? t.exam.statusMarked
                  : answered
                    ? t.exam.statusAnswered
                    : t.exam.statusUnanswered}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function buildSteps(sets: PracticeSet[]): Step[] {
  return sets.flatMap<Step>((set) => {
    if (set.kind === "cloze") {
      return [{ kind: "cloze", setId: set.id, items: itemsForSet(set) }]
    }
    return set.questions.map((question) => ({
      kind: "mcq",
      setId: set.id,
      question,
      item: { key: `${set.id}:${question.number}`, setId: set.id, section: set.section, number: question.number },
    }))
  })
}

function stepKeys(step: Step): string[] {
  return step.kind === "cloze" ? step.items.map((i) => i.key) : [step.item.key]
}

function stepContains(step: Step, key: string): boolean {
  return stepKeys(step).includes(key)
}

function isMarked(step: Step, marked: Record<string, boolean>): boolean {
  return stepKeys(step).some((key) => marked[key])
}

export function expectedAnswer(item: Item): string {
  const set = setsById[item.setId]
  if (!set) return ""
  if (set.kind === "cloze") {
    return clozeBlanks(set).find((b) => b.number === item.number)?.answer ?? ""
  }
  return set.questions.find((q) => q.number === item.number)?.answer ?? ""
}

function selectedSentenceFor(question: McqQuestion, value?: string): string | null {
  if (!value) return null
  return question.choices.find((c) => c.id === value)?.text ?? null
}

export function parseInsert(excerpt: string): { text?: string; square?: string }[] {
  const parts: { text?: string; square?: string }[] = []
  const pattern = /\[\[([A-D])\]\]/g
  let cursor = 0
  for (const match of excerpt.matchAll(pattern)) {
    const at = match.index ?? 0
    if (at > cursor) parts.push({ text: excerpt.slice(cursor, at) })
    parts.push({ square: match[1].toLowerCase() })
    cursor = at + match[0].length
  }
  if (cursor < excerpt.length) parts.push({ text: excerpt.slice(cursor) })
  return parts
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

export { QuestionView }
