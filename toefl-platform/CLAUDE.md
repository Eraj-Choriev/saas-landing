# CLAUDE.md

Guidance for Claude Code when working in `toefl-platform/`.

## Overview

**Passage** — a TOEFL iBT® Reading practice platform. Next.js 15 App Router, React 18,
TypeScript. No Tailwind, no UI library, no animation library: the whole interface is plain CSS
in `app/globals.css` plus three Google fonts. No backend and no database — progress lives in the
learner's `localStorage`.

This is a **standalone project**. It sits inside the `saas-landing` repo but shares nothing with
the marketing site at the repo root: separate `package.json`, dependencies, `tsconfig.json`, and
`@/*` root. **Never import from the parent directory** — if something is needed here, it gets
copied here.

Isolation is not automatic, because some tools resolve *upward* out of this folder and would
otherwise find the marketing site's setup. Three files exist purely to stop that, and deleting
any of them breaks the build only on a machine without `node_modules` at the repo root — which is
every fresh clone:

- `postcss.config.mjs` — empty on purpose. `postcss-load-config` walks up the tree; without this
  file Next loads the root config, which requires `tailwindcss` and `autoprefixer`, and the build
  dies in `getPostCssPlugins` on `require.resolve`.
- `next.config.mjs` → `outputFileTracingRoot` — pins the workspace root here, since the second
  lockfile one level up makes Next's inference ambiguous.
- the parent's `tsconfig.json` excludes `toefl-platform`, and its `next.config.mjs` excludes this
  folder from output file tracing.

## Commands

```bash
npm install
npm run dev            # http://localhost:3100  (3100, so the landing can run on 3000)
npm run build
npm run start          # serve the production build on :3100
npm run check:content  # validate the 159-question bank — run after any content edit
```

There are no unit tests; `check:content` is the safety net that matters.

## Content — `lib/content/`

Transcribed from *100 Practice Questions for the TOEFL® Reading Section* (TST Prep, 2026), using
that book's own question numbers so any answer can be checked against the source.

| File | Section | Sets | Questions |
|---|---|---|---|
| `complete-the-words.ts` | Complete the Words | 10 paragraphs | 100 letter blanks (1–100) |
| `daily-life.ts` | Read in Daily Life | 13 passages | 34 MCQs (101–134) |
| `academic.ts` | Read an Academic Passage | 5 passages | 25 MCQs (135–159) |

`index.ts` assembles the sections, the five full tests, and the cloze parser.

**Cloze paragraphs are stored solved**, with the missing letters in braces:

```ts
source: "Rainforests are dense regions… Wa{rm} air a{nd} heavy ra{in} create t{he} ideal envi{ronment}…"
```

`parseCloze()` splits that into the on-screen stem (`envi`) plus one letter cell per missing
character (`ronment` → eight cells). Adding or moving a blank means moving braces — nothing else.
Blank numbering comes from the set's `firstBlank` (1, 11, 21 …), so every set must contain
exactly ten braces. `check:content` enforces that.

`check:content` also asserts: every book number 1–159 present exactly once, four choices with ids
`abcd` per question, the answer id existing among them, a non-empty explanation, insert-text
excerpts carrying exactly `[[A]]`–`[[D]]`, and every sentence-select option appearing **verbatim**
inside its own passage (the passage highlighter finds them by substring, so a single changed
character silently breaks the interaction).

## Routes

| Route | |
|---|---|
| `/` | Overview: progress, five full tests, all 28 sets by passage type |
| `/practice/[setId]` | Any set id (`cw-1`…`ap-5`) **or** exam id (`exam-1`…`exam-5`); `generateStaticParams` prerenders all 33 |
| `/answers` | Searchable answer key grouped by passage |

## Exam engine — `components/ExamRunner.tsx`

Drives everything. It flattens a run into **steps**, which are not the same as questions: a whole
cloze paragraph is one step (all ten blanks on screen at once, as on test day), while each MCQ is
its own step. It owns the clock (counts **down** for exams, **up** for untimed practice, and
auto-submits at zero), the review overlay, mark-for-review, the footer pips, keyboard shortcuts
(`a`–`d` to pick, arrows to move), and scoring. `ResultsView` replaces it on submit.

Question formats and how each behaves:

- **mcq** — standard four choices.
- **insert-text** — the excerpt renders with four clickable ■ squares (`insertExcerpt`, markers
  `[[A]]`–`[[D]]`); the squares and the choice list are two views of one answer.
- **sentence-select** — `selectableSentences` are made clickable **inside the passage**;
  `PassageView` locates them by substring and syncs the selection with the choice list.

## Styling — `app/globals.css`

One scoped stylesheet on `.tf-root`, with its own reset. Two worlds on purpose: a dark navy
"desk" for the shell (overview, results, answer key) around a light, ETS-accurate exam screen.
Class prefix is `tf-`.

The signature element is the **letter cell** — the slot that holds one missing letter. It builds
the `PASSAGE` wordmark, the hero animation, the cloze inputs, and the results reveal. Keep new UI
consistent with it rather than adding another motif.

Fonts (in `app/layout.tsx`): **Golos Text** display/UI, **Source Serif 4** passages, **JetBrains
Mono** cells, timer, and labels. Golos and JetBrains carry `cyrillic-ext`, so RU and TJ render in
the same faces — do not swap them for a Latin-only face.

## i18n — `lib/ui.ts`

Shell copy is translated `en` / `ru` / `tj`, driven by `useLang()` (`lib/lang.tsx`, persisted to
`localStorage` under `passage-lang`, default `ru`). `en` defines the `ToeflStrings` type, so `ru`
and `tj` must mirror its exact shape or the build fails.

**Exam content stays English**: passages, prompts, choices, explanations, and the exam chrome's
own directions line. It is an English proficiency exam — translating it would not prepare anyone
for test day. Add new *interface* strings to all three dictionaries; never hardcode them.

## Progress — `lib/progress.ts`

`localStorage` key `toefl-reading-progress-v1`: latest answer and verdict per item key
(`${setId}:${questionNumber}`), plus attempt history. Reads are wrapped in try/catch — private
browsing must degrade to "no saved progress", never to a crash. Components subscribe through the
`toefl:progress-changed` window event rather than a shared provider.

## Attribution

The overview footer credits TST Prep and states that TOEFL® is a registered ETS trademark and
that this trainer is not endorsed by ETS. Keep that notice.
