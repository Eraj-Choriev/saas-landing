# Aqly.io — AI agency landing

Next.js 15 (App Router) · Tailwind · shadcn/Radix · Framer Motion · Lucide.
RU/EN тоггл, полностью адаптивный, smooth animations.

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Структура

- `app/` — Next.js routes (page, layout, globals)
- `components/site/` — секции лендинга (Hero, Outcomes, WhatWeBuild, Industries, Results, Methodology, Security, Insights, CTA, Footer, Navbar, TopBanner, LangToggle)
- `components/ui/` — shadcn-style примитивы (Button, Wordmark)
- `lib/i18n.tsx` — словарь RU/EN + React Context
- `lib/utils.ts` — `cn()` helper
- `tailwind.config.ts` — токены (cream/ink/aqua/wine), кейфреймы, шрифты
- `app/globals.css` — base styles, aurora, grain

## Spline

В `Hero.tsx` есть слот под Spline (`{/* spline slot */}`). Подключить:

```bash
npm i @splinetool/react-spline @splinetool/runtime
```

Импорт в `Hero.tsx`:

```tsx
import Spline from "@splinetool/react-spline/next"
// ...
<Spline scene="https://prod.spline.design/<your-scene>/scene.splinecode" />
```

## Дизайн-токены

- Палитра: `cream-50/100/200`, `ink + 800/700/600`, `aqua-50→800`, `wine`
- Шрифты: `font-display` (Fraunces), `font-sans` (Geist Sans), `font-mono` (Geist Mono)
- Анимации: `animate-marquee`, `animate-fade-up`, `animate-shimmer`

## i18n

Хук `useI18n()` возвращает `{ lang, setLang, t }`. Все строки в `lib/i18n.tsx`.
