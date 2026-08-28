# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`aqly-landing` — single-page marketing site for Aqly.io (an AI agency). Next.js 15 App Router, statically exported to GitHub Pages. No backend, no database, no test suite.

## Commands

```bash
npm run dev      # local dev server at http://localhost:3000
npm run build    # static export → ./out (also what CI runs)
npm run preview  # build, then serve ./out under /saas-landing at :3000 (mimics prod basePath)
npm run start    # serve an already-built ./out under /saas-landing at :3000
npm run lint     # next lint
npm run check:toefl  # validate the TOEFL question bank (159 items)
```

There are no tests.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `master` (or manual `workflow_dispatch`). The build output is `./out` (Next `output: "export"`).

Critical: in production the site is served under `/saas-landing` (the `repo` const in `next.config.mjs`). `basePath`/`assetPrefix` are set only when `NODE_ENV === "production"`, so:
- Local dev serves at root; prod serves under `/saas-landing`.
- `images.unoptimized: true` and `trailingSlash: true` are required for static export — do not remove.
- Reference public assets by root-relative path (`/telegram.png`); Next rewrites the basePath. Hardcoding `/saas-landing/...` breaks local dev.

## Architecture

The whole site is one route. `app/page.tsx` composes section components from `components/site/` in render order: `Navbar → Hero → TechStack → About → WhatWeBuild → WhyNow → Approach → Pricing → FAQ → ContactForm → FinalCTA → Footer`. To add/reorder a section, edit `app/page.tsx`. (`CaseStudies` and `Stats` files exist but are **not** mounted in `page.tsx` — orphaned; don't assume they render.)

- `app/layout.tsx` — root layout, fonts, metadata; wraps children in `I18nProvider` and mounts `SmoothScroll` (anchor-scroll behavior) + `VoiceAgent` + `CookieConsent` once. Loads many Google fonts: **Geologica** (`--font-geologica`, the display face via `font-display`), **Onest** (`--font-onest`, body via `font-sans`), Geist Mono (`font-mono`), plus Playfair / Bricolage Grotesque / Instrument Serif / DM Sans used **only inside Design/AI service demos** (`ServiceVisual`).
- `components/site/` — one file per landing section. All are `"use client"` (interactive / use the i18n hook).
- `components/ui/` — shadcn/Radix-style primitives (`button`, `wordmark`) plus `dotted-surface` (the three.js hero dot-wave).
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge).

Path alias `@/*` → repo root (`tsconfig.json`).

### i18n — all copy lives in `lib/i18n.tsx`

This is the content source of truth. Components read text via the `useI18n()` hook → `{ lang, setLang, t }`, then `t.hero.title` etc. `LangToggle` flips `lang`.

- `en` is the canonical dictionary; its shape defines the `Dict` type. `ru` and `tj` (Tajik) are typed `Dict`, so each must mirror `en`'s exact nested shape or TS fails to compile.
- All three (`en`, `ru`, `tj`) are fully translated. When adding UI text, add the key to **all three** — do not hardcode strings in components. `LangToggle` cycles `ru / en / tj`.
- Tajik uses Cyrillic-extended letters (ғ ӣ қ ӯ ҳ ҷ). Both Geologica (display) and Onest (body) load the `cyrillic-ext` subset, so RU/TJ render natively in every face — no fallback chain needed for glyph coverage.
- Default language is `"ru"` (`I18nProvider` initial state); the choice persists to `localStorage` under `aqly-lang`.

### Service detail modals

`WhatWeBuild` lists services (data from `t.build.items`). `ServiceModal` (Radix Dialog) shows per-service detail. The modal title sits in a solid dark bar **below** the visual (not overlaid) so it's always legible. `ServiceVisual` renders a per-service **interactive demo** (`index`-mapped to the `t.build.items` order): 0 `ChatDemo` — Telegram chat (clickable quick-replies + input + typewriter), 1 `WebsitesDemo` — case carousel (auto-rotate, pause on hover, Lighthouse badges), 2 `VoiceDemo` — waveform teaser + "talk to the agent" button that opens the real ElevenLabs Conversational-AI agent (see `VoiceAgent`), 3 `FlowDemo` — n8n-style automation canvas cycling real orchestrators (n8n / Make / Zapier) with per-scenario trigger → destination data packets, 4 `IntegrationHub` — "AI conveyor": incoming business task → pulsing AI core (Claude badge) → result card, cycling 3 scenarios (support / content / copilot), stacks vertically under 480px, 5 `DesignDemo` — editor-grade build choreography that reassembles a poster, rotating brands each loop. Pure DOM/SVG + framer-motion, no image/media assets. Demos start ~300ms after open (`useStarted`), loops pause after 12s idle (`useActive`), and honor `prefers-reduced-motion` (static final frame). Demo copy is localized inline by `lang` (ru/en/tj) via the local `tr()` helper.

### Hero animation

`Hero` background is a three.js dotted-wave floor (`components/ui/dotted-surface.tsx`), loaded via `next/dynamic` with `ssr: false` so the ~340K three.js bundle never blocks first paint — keep it lazy. Readability comes from layered gradient overlays (dark pool behind the headline, top/bottom fades), tuned in `Hero.tsx` itself. The right column is `HeroChat` — an interactive Telegram-style demo that auto-plays the scripted `t.hero.chat.turns`, then accepts quick-reply chips + freeform input (keyword-matched to `t.hero.chat.replies`). Honors `prefers-reduced-motion` (renders the full thread statically). The `.aurora` CSS effects in `app/globals.css` are no longer used by the hero — `About` and `FinalCTA` still use them.

### Other sections

- `WhyNow` (`#why`) — urgency/timing section (`t.whyNow`).
- `Pricing` (`#pricing`) — plan cards; the featured plan uses `brand.coral`. A "details" button opens `PricingModal` (Radix Dialog) with per-plan breakdown.
- `FAQ` (`#faq`) — accordion of common questions (`t.faq`).
- `FinalCTA` — cream pre-footer conversion block, display headline with italic coral accent (`t.finalCta`).
- `VoiceAgent` — global ElevenLabs Conversational-AI widget (custom element + CDN script), mounted once in `app/layout.tsx`. Gated by `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` (public-safe; lock the agent to your domain in the ElevenLabs dashboard Security tab). Other components open it via the `window` event `aqly:open-voice` (the AI-voice service modal button dispatches it). Renders nothing if the env var is unset.
- `CookieConsent` — bottom-left ink-glass card, mounted once in `app/layout.tsx`. Shows once ~1.6s after load if `localStorage["aqly-cookie-consent"]` is unset. The site sets no ad/analytics cookies — consent only covers the language preference, so accept/decline is deliberately quiet.

### Contact form

`ContactForm` POSTs the lead to `process.env.NEXT_PUBLIC_LEAD_ENDPOINT` (a Cloudflare Worker — see `telegram-worker.js`, which forwards to Telegram via the Bot API). If the env var is unset, submit resets local state only. No Next API route; see `.env.local.example`.

## TOEFL Reading trainer (`/toefl`)

A second, self-contained product living in the same Next app: **Passage**, a TOEFL iBT Reading
practice platform. It shares only the root layout and `I18nProvider` with the marketing site —
nothing else. Marketing overlays (`VoiceAgent`, `CookieConsent`, `InstantChat`) are suppressed
under `/toefl` so nothing floats over a timed exam.

- **Content** — `lib/toefl/content/`, transcribed from *100 Practice Questions for the TOEFL®
  Reading Section* (TST Prep). 159 questions in the book's own numbering: 100 letter blanks
  (`complete-the-words.ts`, 10 paragraphs × 10), 34 MCQs (`daily-life.ts`, 13 passages),
  25 MCQs (`academic.ts`, 5 passages). `index.ts` assembles sections, the five full tests, and
  the cloze parser. **Run `npm run check:toefl` after touching content** — it asserts numbering,
  blank counts, choice/answer validity, insert-text squares, and that every sentence-select
  option exists verbatim in its passage.
- Cloze paragraphs are stored **solved**, with the missing letters in braces:
  `"Wa{rm} air a{nd}"`. `parseCloze()` splits that into the on-screen stem plus one letter cell
  per missing character. Adding a blank means adding braces — nothing else.
- **Routes** — `app/toefl/` (overview), `app/toefl/practice/[setId]/` (any set id *or* exam id;
  `generateStaticParams` prerenders all 33), `app/toefl/answers/` (searchable key).
- **Engine** — `components/toefl/ExamRunner.tsx` drives everything: it flattens the run into
  *steps* (a whole cloze paragraph is one step, an MCQ is one step), owns the clock (counts down
  for exams, up for practice), review overlay, mark-for-review, keyboard shortcuts (`a`–`d`,
  arrows), and scoring. `ResultsView` replaces it on submit.
- **Styling** — `app/toefl/toefl.css`, scoped to `.tf-root`, plain CSS with `--tf` tokens.
  Deliberately *not* Tailwind and not the marketing palette: a dark navy "desk" shell around a
  light, ETS-accurate exam screen. Fonts are scoped in `app/toefl/layout.tsx` (Golos Text /
  Source Serif 4 / JetBrains Mono) so the marketing site keeps Geologica + Onest.
- **i18n** — shell copy is localized in `lib/toefl/ui.ts` (en/ru/tj, driven by the same
  `useI18n()` lang). Exam content — passages, prompts, choices, explanations — stays English on
  purpose: it is an English exam.
- Progress lives in `localStorage` under `toefl-reading-progress-v1` (`lib/toefl/progress.ts`).

## Styling

Tailwind with a custom token set in `tailwind.config.ts`:
- Colors: `cream-*`, `ink`/`ink-*`, `aqua-*`, `brand.{blue,amber,gold,coral}`, `accent`, `danger` (form errors — kept distinct from `coral`, which is reserved for primary CTAs / the featured plan).
- Fonts: `font-display` (Geologica), `font-sans` (Onest), `font-mono` (Geist Mono).
- Custom keyframes/animations: `animate-marquee`, `animate-shimmer`, `animate-fade-up`; `tracking-tightest` and the `ease-smooth` timing fn are tuned for Geologica.
- Base styles, aurora and grain effects in `app/globals.css`.

Animations also use `framer-motion`. Icons from `lucide-react`.
