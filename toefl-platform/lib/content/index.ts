import type { ClozeSet, Exam, Item, PracticeSet, ReadingSet, SectionId } from "../types"
import { completeTheWords } from "./complete-the-words"
import { dailyLife } from "./daily-life"
import { academic } from "./academic"

export { completeTheWords, dailyLife, academic }

export const allSets: PracticeSet[] = [...completeTheWords, ...dailyLife, ...academic]

export const setsById: Record<string, PracticeSet> = Object.fromEntries(
  allSets.map((set) => [set.id, set]),
)

export interface SectionMeta {
  id: SectionId
  /** Order the three passage types appear in on test day. */
  order: 1 | 2 | 3
  name: string
  sets: PracticeSet[]
  questionCount: number
}

/** Every blank in a cloze set is one scored question, matching the book's numbering. */
export const BLANKS_PER_CLOZE_SET = 10

export function setQuestionCount(set: PracticeSet): number {
  return set.kind === "cloze" ? BLANKS_PER_CLOZE_SET : set.questions.length
}

export const sections: SectionMeta[] = [
  {
    id: "complete-the-words",
    order: 1,
    name: "Complete the Words",
    sets: completeTheWords,
    questionCount: completeTheWords.length * BLANKS_PER_CLOZE_SET,
  },
  {
    id: "daily-life",
    order: 2,
    name: "Read in Daily Life",
    sets: dailyLife,
    questionCount: dailyLife.reduce((n, s) => n + s.questions.length, 0),
  },
  {
    id: "academic",
    order: 3,
    name: "Read an Academic Passage",
    sets: academic,
    questionCount: academic.reduce((n, s) => n + s.questions.length, 0),
  },
]

export const totalQuestions = sections.reduce((n, s) => n + s.questionCount, 0)

/**
 * Test-day sittings. Each pairs one set of every passage type, the minimum
 * combination ETS guarantees on the real Reading section.
 */
export const exams: Exam[] = [
  {
    id: "exam-1",
    index: 1,
    title: "Full test 1",
    blurb: "Rainforests · Textbook collection · The Evolution of Money",
    setIds: ["cw-1", "dl-1", "ap-1"],
    minutes: 18,
  },
  {
    id: "exam-2",
    index: 2,
    title: "Full test 2",
    blurb: "How sound travels · Open-house volunteers · The Hidden Life of Soil",
    setIds: ["cw-3", "dl-6", "ap-2"],
    minutes: 18,
  },
  {
    id: "exam-3",
    index: 3,
    title: "Full test 3",
    blurb: "Privacy online · Academic mentorship · Facial Recognition",
    setIds: ["cw-6", "dl-9", "ap-3"],
    minutes: 18,
  },
  {
    id: "exam-4",
    index: 4,
    title: "Full test 4",
    blurb: "The sense of smell · Water service · The Pull of Nostalgia",
    setIds: ["cw-9", "dl-11", "ap-4"],
    minutes: 18,
  },
  {
    id: "exam-5",
    index: 5,
    title: "Full test 5",
    blurb: "How we decide · Oakridge pool · The Rise of the Telegraph",
    setIds: ["cw-10", "dl-13", "ap-5"],
    minutes: 18,
  },
]

export const examsById: Record<string, Exam> = Object.fromEntries(exams.map((e) => [e.id, e]))

// ── Cloze parsing ──────────────────────────────────────────────────────────
// Source text stores the solved paragraph with the missing letters in braces:
// "envi{ronment}" renders as the stem "envi" plus eight letter cells.

export type ClozeToken =
  | { type: "text"; value: string }
  | { type: "blank"; number: number; stem: string; answer: string }

const BLANK = /([A-Za-z]*)\{([A-Za-z]+)\}/g

export function parseCloze(set: ClozeSet): ClozeToken[] {
  const tokens: ClozeToken[] = []
  let cursor = 0
  let n = 0

  for (const match of set.source.matchAll(BLANK)) {
    const [whole, stem, answer] = match
    const start = match.index ?? 0
    const lead = set.source.slice(cursor, start)
    if (lead) tokens.push({ type: "text", value: lead })
    tokens.push({ type: "blank", number: set.firstBlank + n, stem, answer })
    cursor = start + whole.length
    n += 1
  }

  const tail = set.source.slice(cursor)
  if (tail) tokens.push({ type: "text", value: tail })
  return tokens
}

/** The paragraph as the learner first sees it, with underscores for missing letters. */
export function clozeBlanks(set: ClozeSet) {
  return parseCloze(set).filter((t): t is Extract<ClozeToken, { type: "blank" }> => t.type === "blank")
}

// ── Items ──────────────────────────────────────────────────────────────────

export function itemsForSet(set: PracticeSet): Item[] {
  if (set.kind === "cloze") {
    return clozeBlanks(set).map((b) => ({
      key: `${set.id}:${b.number}`,
      setId: set.id,
      section: set.section,
      number: b.number,
    }))
  }
  return set.questions.map((q) => ({
    key: `${set.id}:${q.number}`,
    setId: set.id,
    section: set.section,
    number: q.number,
  }))
}

export function itemsForSets(setIds: string[]): Item[] {
  return setIds.flatMap((id) => {
    const set = setsById[id]
    return set ? itemsForSet(set) : []
  })
}

export const allItems: Item[] = allSets.flatMap(itemsForSet)

/** A cloze answer counts when the letters match, ignoring case and stray spaces. */
export function normalizeLetters(value: string): string {
  return value.replace(/[^A-Za-z]/g, "").toLowerCase()
}
