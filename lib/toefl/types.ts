// Domain model for the TOEFL Reading trainer.
//
// Content is transcribed from "100 Practice Questions for the TOEFL® Reading
// Section" (TST Prep, 2026 edition). Question numbers below are the numbers
// printed in that book, so a result screen can be checked against the source.

export type ChoiceId = "a" | "b" | "c" | "d"

export type SectionId = "complete-the-words" | "daily-life" | "academic"

/** TOEFL question archetypes, shown as an eyebrow so learners name what they are practising. */
export type Archetype =
  | "main-idea"
  | "purpose"
  | "detail"
  | "inference"
  | "vocabulary"
  | "negative-fact"
  | "rhetorical-purpose"
  | "insert-text"
  | "sentence-select"
  | "connect-ideas"

export interface Choice {
  id: ChoiceId
  text: string
}

export interface McqQuestion {
  kind: "mcq"
  /** Number as printed in the source book (101–159). */
  number: number
  archetype: Archetype
  prompt: string
  choices: Choice[]
  answer: ChoiceId
  explanation: string
  /**
   * Insert-text questions quote a stretch of the passage with four insertion
   * points written as [[A]]…[[D]]. Choice ids map onto those points.
   */
  insertExcerpt?: string
  /**
   * Sentence-select questions highlight these sentences inside the passage.
   * Each string must appear verbatim in the passage so it can be found.
   */
  selectableSentences?: string[]
  /** Shown under the prompt when the real test behaves differently from this practice format. */
  note?: string
}

export type PassageBlock =
  | { type: "email"; subject: string; body: string[]; signoff?: string[] }
  | { type: "notice"; body: string[]; signoff?: string[] }
  | { type: "chat"; messages: ChatMessage[] }
  | { type: "article"; title: string; paragraphs: string[] }

export interface ChatMessage {
  from: string
  time: string
  text: string
}

export interface ClozeSet {
  kind: "cloze"
  id: string
  section: "complete-the-words"
  /** 1-based position within its section. */
  index: number
  title: string
  directions: string
  /** Solved paragraph; missing letters are wrapped in braces, e.g. "Wa{rm} air a{nd}". */
  source: string
  /** Book number of this set's first blank (1, 11, 21 …). */
  firstBlank: number
}

export interface ReadingSet {
  kind: "reading"
  id: string
  section: "daily-life" | "academic"
  index: number
  title: string
  directions: string
  passage: PassageBlock
  questions: McqQuestion[]
}

export type PracticeSet = ClozeSet | ReadingSet

/** A test-day style sitting: one set of each passage type, one clock. */
export interface Exam {
  id: string
  index: number
  title: string
  blurb: string
  setIds: string[]
  /** Minutes on the clock. */
  minutes: number
}

/** One answerable item. A cloze set expands to ten of these; an MCQ is one. */
export interface Item {
  /** Stable key: `${setId}:${number}`. */
  key: string
  setId: string
  section: SectionId
  number: number
}
