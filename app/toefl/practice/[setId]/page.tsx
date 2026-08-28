import { notFound } from "next/navigation"
import { exams, examsById, setsById, allSets } from "@/lib/toefl/content"
import { RunPage } from "@/components/toefl/RunPage"

/** Every set and every full test gets a real URL. */
export function generateStaticParams() {
  return [...allSets.map((s) => ({ setId: s.id })), ...exams.map((e) => ({ setId: e.id }))]
}

export default async function PracticePage({ params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params
  const exam = examsById[setId]
  const set = setsById[setId]
  if (!exam && !set) notFound()

  return exam ? (
    <RunPage runId={exam.id} runKind="exam" title={exam.title} setIds={exam.setIds} minutes={exam.minutes} />
  ) : (
    <RunPage runId={set.id} runKind="set" title={set.title} setIds={[set.id]} />
  )
}
