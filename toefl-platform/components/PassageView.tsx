"use client"

import { Fragment } from "react"
import type { PassageBlock } from "@/lib/types"

/**
 * Renders the four passage formats the book uses. Sentence-select questions
 * pass `selectable`: those sentences become clickable inside the passage, the
 * way they are on test day.
 */
export function PassageView({
  passage,
  selectable,
  selectedSentence,
  onSelectSentence,
}: {
  passage: PassageBlock
  selectable?: string[]
  selectedSentence?: string | null
  onSelectSentence?: (sentence: string) => void
}) {
  const mark = (text: string) => (
    <MarkSentences
      text={text}
      selectable={selectable}
      selected={selectedSentence ?? null}
      onSelect={onSelectSentence}
    />
  )

  if (passage.type === "chat") {
    return (
      <div className="tf-chat">
        {passage.messages.map((message, i) => (
          <div key={i} className="tf-chat-msg">
            <div className="tf-chat-head">
              <span className="tf-chat-name">{message.from}</span>
              <span className="tf-chat-time">{message.time}</span>
            </div>
            <p className="tf-chat-text">{mark(message.text)}</p>
          </div>
        ))}
      </div>
    )
  }

  if (passage.type === "article") {
    return (
      <article className="tf-passage">
        <h2 className="tf-passage-title">{passage.title}</h2>
        {passage.paragraphs.map((paragraph, i) => (
          <p key={i}>{mark(paragraph)}</p>
        ))}
      </article>
    )
  }

  return (
    <div className="tf-sheet">
      {passage.type === "email" ? (
        <div className="tf-sheet-subject">
          <span>Subject</span>
          {passage.subject}
        </div>
      ) : null}
      <div className="tf-passage">
        {passage.body.map((paragraph, i) => (
          <p key={i}>{mark(paragraph)}</p>
        ))}
        {passage.signoff ? (
          <p className="tf-sheet-signoff">
            {passage.signoff.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < passage.signoff!.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Splits a paragraph around any selectable sentences it contains. */
function MarkSentences({
  text,
  selectable,
  selected,
  onSelect,
}: {
  text: string
  selectable?: string[]
  selected: string | null
  onSelect?: (sentence: string) => void
}) {
  if (!selectable?.length) return <>{text}</>

  const hits = selectable
    .map((sentence) => ({ sentence, at: text.indexOf(sentence) }))
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at)

  if (hits.length === 0) return <>{text}</>

  const parts: React.ReactNode[] = []
  let cursor = 0

  hits.forEach((hit, i) => {
    if (hit.at < cursor) return
    if (hit.at > cursor) parts.push(<Fragment key={`t${i}`}>{text.slice(cursor, hit.at)}</Fragment>)
    parts.push(
      <span
        key={`s${i}`}
        role="button"
        tabIndex={0}
        className="tf-sentence"
        data-selected={selected === hit.sentence}
        onClick={() => onSelect?.(hit.sentence)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onSelect?.(hit.sentence)
          }
        }}
      >
        {hit.sentence}
      </span>,
    )
    cursor = hit.at + hit.sentence.length
  })

  if (cursor < text.length) parts.push(<Fragment key="tail">{text.slice(cursor)}</Fragment>)
  return <>{parts}</>
}
