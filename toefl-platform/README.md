# Passage — TOEFL® Reading trainer

A practice platform for the TOEFL iBT® Reading section: 159 questions across all three passage
types, in an interface built to match the real test, with an explanation for every answer.

![Sections](https://img.shields.io/badge/questions-159-E8A33D) ![Next.js](https://img.shields.io/badge/Next.js-15-0b1b2b)

## What is in it

| Section | Sets | Questions |
|---|---|---|
| Complete the Words | 10 paragraphs | 100 letter blanks |
| Read in Daily Life | 13 emails, notices, and text chains | 34 |
| Read an Academic Passage | 5 passages | 25 |
| **Full tests** | 5 sittings — one passage of each type, one clock | 18 min each |

Every question format behaves the way it does on test day: letter-by-letter cells for the
cloze paragraphs, clickable ■ squares for insert-text, and sentences you select **inside the
passage** for sentence-select. The exam screen has a countdown you can hide, a review screen,
mark-for-review, and a question navigator.

Results give a score, per-question verdicts, and the full reasoning for each answer. Progress is
kept in the browser — nothing is uploaded, and there is no account.

Interface is available in Russian, English, and Tajik. The exam content stays in English.

## Running it

```bash
npm install
npm run dev      # http://localhost:3100
```

```bash
npm run build && npm run start   # production build on :3100
npm run check:content            # validate the question bank
```

Run `check:content` after editing anything in `lib/content/` — it checks question numbering,
blank counts, answer validity, insertion squares, and that every selectable sentence still
matches its passage exactly.

## Deploying

It is a standard Next.js app with no environment variables and no backend. On Vercel, create a
project pointing at this repository and set **Root Directory** to `toefl-platform`. The
marketing site at the repository root is a separate project and a separate deploy; the two share
no code, no dependencies, and no build.

## Layout

```
app/                     routes: overview, /practice/[setId], /answers
  globals.css            the whole design system, scoped to .tf-root
components/              ExamRunner (engine), PassageView, ClozeView, ResultsView, AnswerKey …
lib/
  content/               the 159 questions, one file per section
  progress.ts            localStorage progress
  ui.ts                  shell copy in en / ru / tj
scripts/validate-content.ts
```

## Credits

Questions are from *100 Practice Questions for the TOEFL® Reading Section* by TST Prep.
TOEFL® is a registered trademark of Educational Testing Service (ETS). This trainer is an
independent study tool and is not endorsed or approved by ETS or TST Prep.
