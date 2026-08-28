"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { ChoiceId, SectionId } from "./types"
import { allItems, itemsForSet, setsById, totalQuestions } from "./content"

const STORAGE_KEY = "toefl-reading-progress-v1"

export interface Attempt {
  /** Set or exam id. */
  runId: string
  finishedAt: number
  correct: number
  total: number
  /** Seconds spent. */
  elapsed: number
}

export interface Progress {
  /** Latest answer per item key: `${setId}:${questionNumber}`. */
  answers: Record<string, string>
  /** Whether that latest answer was correct. */
  verdicts: Record<string, boolean>
  attempts: Attempt[]
  /** Last run the learner opened, so the overview can offer to resume it. */
  lastRun?: { id: string; kind: "set" | "exam" }
}

const empty: Progress = { answers: {}, verdicts: {}, attempts: [] }

function read(): Progress {
  if (typeof window === "undefined") return empty
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      answers: parsed.answers ?? {},
      verdicts: parsed.verdicts ?? {},
      attempts: parsed.attempts ?? [],
      lastRun: parsed.lastRun,
    }
  } catch {
    return empty
  }
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Private browsing or a full quota: progress is a convenience, not the product.
  }
}

/** Fired on every save so sibling components re-read without a shared provider. */
const CHANGED = "toefl:progress-changed"

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(empty)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setProgress(read())
    setReady(true)
    const sync = () => setProgress(read())
    window.addEventListener(CHANGED, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(CHANGED, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  const commit = useCallback((mutate: (current: Progress) => Progress) => {
    const next = mutate(read())
    write(next)
    setProgress(next)
    window.dispatchEvent(new Event(CHANGED))
  }, [])

  const recordAnswers = useCallback(
    (entries: { key: string; answer: string; correct: boolean }[]) => {
      commit((current) => {
        const answers = { ...current.answers }
        const verdicts = { ...current.verdicts }
        for (const entry of entries) {
          answers[entry.key] = entry.answer
          verdicts[entry.key] = entry.correct
        }
        return { ...current, answers, verdicts }
      })
    },
    [commit],
  )

  const recordAttempt = useCallback(
    (attempt: Attempt) => {
      commit((current) => ({ ...current, attempts: [...current.attempts, attempt].slice(-200) }))
    },
    [commit],
  )

  const setLastRun = useCallback(
    (lastRun: Progress["lastRun"]) => {
      commit((current) => ({ ...current, lastRun }))
    },
    [commit],
  )

  const reset = useCallback(() => {
    write(empty)
    setProgress(empty)
    window.dispatchEvent(new Event(CHANGED))
  }, [])

  const stats = useMemo(() => summarize(progress), [progress])

  return { progress, stats, ready, recordAnswers, recordAttempt, setLastRun, reset }
}

export interface Stats {
  answered: number
  correct: number
  total: number
  accuracy: number
  setsFinished: number
  bySection: Record<SectionId, { answered: number; correct: number; total: number }>
}

export function summarize(progress: Progress): Stats {
  const bySection: Stats["bySection"] = {
    "complete-the-words": { answered: 0, correct: 0, total: 0 },
    "daily-life": { answered: 0, correct: 0, total: 0 },
    academic: { answered: 0, correct: 0, total: 0 },
  }

  let answered = 0
  let correct = 0

  for (const item of allItems) {
    const bucket = bySection[item.section]
    bucket.total += 1
    if (item.key in progress.answers) {
      bucket.answered += 1
      answered += 1
      if (progress.verdicts[item.key]) {
        bucket.correct += 1
        correct += 1
      }
    }
  }

  let setsFinished = 0
  for (const set of Object.values(setsById)) {
    const items = itemsForSet(set)
    if (items.length > 0 && items.every((i) => i.key in progress.answers)) setsFinished += 1
  }

  return {
    answered,
    correct,
    total: totalQuestions,
    accuracy: answered === 0 ? 0 : correct / answered,
    setsFinished,
    bySection,
  }
}

/** Per-set summary used by the overview cards. */
export function setStatus(progress: Progress, setId: string) {
  const set = setsById[setId]
  if (!set) return { answered: 0, correct: 0, total: 0, complete: false }
  const items = itemsForSet(set)
  let answered = 0
  let correct = 0
  for (const item of items) {
    if (item.key in progress.answers) {
      answered += 1
      if (progress.verdicts[item.key]) correct += 1
    }
  }
  return { answered, correct, total: items.length, complete: items.length > 0 && answered === items.length }
}

export function bestAttempt(progress: Progress, runId: string): Attempt | undefined {
  return progress.attempts
    .filter((a) => a.runId === runId)
    .sort((a, b) => b.correct / b.total - a.correct / a.total)[0]
}

export type { ChoiceId }
