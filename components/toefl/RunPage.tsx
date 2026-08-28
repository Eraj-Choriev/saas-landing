"use client"

import { ExamRunner, type ExamRunnerProps } from "./ExamRunner"

/** Thin client boundary so the route stays a server component. */
export function RunPage(props: ExamRunnerProps) {
  return <ExamRunner {...props} />
}
