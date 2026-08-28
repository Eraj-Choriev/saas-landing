/**
 * Content check for the TOEFL Reading trainer.
 *
 * The 159 questions were transcribed by hand from a PDF, so this asserts the
 * things a typo would break: every book number present exactly once, ten blanks
 * per cloze paragraph, four valid choices with a real answer per question,
 * insert-text squares intact, and every sentence-select option findable verbatim
 * inside its passage.
 *
 *   npm run check:toefl
 */
import { allSets, allItems, clozeBlanks, sections, totalQuestions, exams, setsById, parseCloze } from "@/lib/toefl/content"

const problems: string[] = []

// Every book number 1–159 present exactly once.
const numbers = allItems.map((i) => i.number).sort((a, b) => a - b)
for (let n = 1; n <= 159; n++) {
  const hits = numbers.filter((x) => x === n).length
  if (hits !== 1) problems.push(`question ${n}: appears ${hits} times`)
}
if (numbers.length !== 159) problems.push(`total items ${numbers.length}, expected 159`)
if (totalQuestions !== 159) problems.push(`totalQuestions ${totalQuestions}`)

for (const set of allSets) {
  if (set.kind === "cloze") {
    const blanks = clozeBlanks(set)
    if (blanks.length !== 10) problems.push(`${set.id}: ${blanks.length} blanks`)
    for (const b of blanks) {
      if (!/^[a-z]+$/.test(b.answer)) problems.push(`${set.id}#${b.number}: odd answer "${b.answer}"`)
      if (b.stem === "") problems.push(`${set.id}#${b.number}: empty stem`)
    }
    // Braces must all be consumed by the parser.
    const raw = (set.source.match(/\{/g) || []).length
    if (raw !== blanks.length) problems.push(`${set.id}: ${raw} braces vs ${blanks.length} parsed`)
    continue
  }

  for (const q of set.questions) {
    const ids = q.choices.map((c) => c.id).join("")
    if (ids !== "abcd") problems.push(`Q${q.number}: choice ids "${ids}"`)
    if (!q.choices.some((c) => c.id === q.answer)) problems.push(`Q${q.number}: answer "${q.answer}" not a choice`)
    if (!q.explanation.trim()) problems.push(`Q${q.number}: no explanation`)

    if (q.insertExcerpt) {
      const squares = (q.insertExcerpt.match(/\[\[[A-D]\]\]/g) || []).join(",")
      if (squares !== "[[A]],[[B]],[[C]],[[D]]") problems.push(`Q${q.number}: squares ${squares}`)
    }

    // Sentence-select needs each sentence to exist verbatim in the passage.
    if (q.selectableSentences) {
      const text =
        set.passage.type === "article"
          ? set.passage.paragraphs.join("\n")
          : set.passage.type === "chat"
            ? set.passage.messages.map((m) => m.text).join("\n")
            : set.passage.body.join("\n")
      for (const sentence of q.selectableSentences) {
        if (!text.includes(sentence)) problems.push(`Q${q.number}: sentence not found in passage — "${sentence.slice(0, 50)}…"`)
      }
      for (const c of q.choices) {
        if (!q.selectableSentences.includes(c.text)) problems.push(`Q${q.number}: choice ${c.id} is not a selectable sentence`)
      }
    }
  }
}

for (const exam of exams) {
  for (const id of exam.setIds) if (!setsById[id]) problems.push(`${exam.id}: unknown set ${id}`)
  const kinds = exam.setIds.map((id) => setsById[id].section)
  if (new Set(kinds).size !== 3) problems.push(`${exam.id}: does not cover all three passage types`)
}

// No stray ligatures or straight-quote artifacts from the PDF extraction.
const dump = JSON.stringify(allSets)
for (const bad of ["ﬁ", "ﬀ", "ﬃ", "ﬂ", "  "]) {
  if (dump.includes(bad)) problems.push(`found artifact ${JSON.stringify(bad)} in content`)
}

console.log("sections:", sections.map((s) => `${s.name} ${s.sets.length} sets / ${s.questionCount} Q`).join(" | "))
console.log("items:", allItems.length, "| sets:", allSets.length, "| exams:", exams.length)
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "✓ all content checks pass")
