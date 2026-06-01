# Aqly.io — Landing Prototype Brief (for Claude / Claude Design)

> **How to use:** paste this whole file into Claude / Claude Design as the build brief.
> Goal: build a **NEW visual prototype** of the Aqly.io landing page.
> **All copy must match EXACTLY** what is written here (RU + EN, word for word — final, do not
> rewrite / translate / shorten / "improve"). You are free to invent a **completely new visual
> design** — new layout, colours, type, motion — as long as every section, every string and every
> feature below is present and bilingual.

---

## 0. What this is

Single-page (one route) **bilingual RU/EN** marketing landing for **Aqly.io**, a young engineering
studio / AI agency. Sells custom AI builds: Telegram bots, websites, voice assistants,
connected-tools automation, AI integration, growth marketing.

- **Audience:** business owners (incl. Russian-speaking / Central Asia — keep RU plain, no jargon).
- **Copy tone:** confident, plain, "engineering-first", lightly editorial.
- **Must nail:** in the first 3 seconds the visitor feels "serious, modern, premium AI studio".

**Tech target (recommended):** Next.js (App Router) + Tailwind + Framer Motion + lucide-react.
Fully responsive, accessible, honors `prefers-reduced-motion`. A **language toggle (EN/RU)** swaps
every string live via dictionary + React context. **Default language: EN.**

---

## 1. Required sections (render order)

1. **Top banner** — thin strip at very top
2. **Navbar** — sticky/floating, language toggle + primary CTA
3. **Hero** — headline + subtitle + 2 CTAs + animated "product" visual
4. **Tech stack** — logo marquee strip
5. **About** (`#about`) — who we are + 4 value cards
6. **Services / "What we build"** (`#services`) — 6 cards, each opens a **detail modal**
7. **Approach** (`#approach`) — 4-step process timeline
8. **Contact form** (`#contact`) — multi-field, live progress + validation
9. **Footer**

Anchor IDs matter: nav + footer jump to `#about`, `#services`, `#approach`, `#contact`.

---

## 2. KEY FEATURE — Service detail modal (must implement)

Each of 6 service cards has **"Learn more / Подробнее"**. Click opens a **modal dialog** (Radix Dialog
or equivalent; focus-trapped, Esc + backdrop-click close, scroll-locked). MUST be **centered on all
viewports** (desktop + mobile). Contents in a **bento-grid**:

- **TOP — animated visualization** of that service (coded SVG/DOM, no bitmaps):
  - Telegram Bots → chat thread, bubbles arrive + typing dots
  - Websites → page assembling block-by-block in a browser frame + Lighthouse "100" ring
  - AI Voice Assistants → mic core + expanding sound rings + waveform
  - **Connected Tools / Связка программ → node chain animating in sequence: node 1 appears →
    connector draws to node 2 → connector draws to node 3 → an impulse pulse travels the whole
    chain → loops.** Labels EN `Lead in → Saved → Sent`; RU `Заявка → Таблица → Готово`.
  - AI Integration → central core, satellites connect in + data pulses flow inward
  - Growth Marketing → bars grow + trend line draws through their tops
  - All loop calmly (~4–5s); under `prefers-reduced-motion` show final static frame.
- **BELOW — info tiles:**
  - **Overview** paragraph (full width) — `details.overview`
  - **"How it works" / "Как это работает"** — numbered `details.how` (4 steps)
  - **"What's included" / "Что входит"** — checklist `details.features` (4 items, accent tile)
  - **CTA band** (dark) — `modalCtaTitle` + `modalCtaSub` + button `modalCta` → `#contact`
- Tiles fade/slide in staggered on open.

**Card hover (services + about):** subtle lift + accent glow. Implement glow as a **radial-gradient
overlay**, NOT a blurred circle under `overflow-hidden` (clips to a hard block — known bug).

---

## 3. KEY FEATURE — Contact form

Multi-field form with **live progress** ("Form Progress 3/5" filling as required fields complete)
+ **inline validation** (highlight invalid on submit, shake, scroll to first invalid). On valid
submit → success state. (Backend out of scope; local success is fine.)
Required for progress: name, email, services (≥1), timeline, challenge (≥20 chars).

---

## 4. Design direction (REINVENT — guidance, not a cage)

The current site is "warm + contrast": cream paper, ink-dark anchor sections, coral `#ff5b24`
accent, Playfair Display serif headlines + Manrope body. **For this prototype pick a DIFFERENT,
fresh aesthetic** — commit fully to ONE bold direction. Options (pick one, execute precisely):
refined dark luxury · brutalist editorial · soft premium light · retro-future terminal ·
glass + aurora · Swiss/grid minimal.

- **Typography:** distinctive display + clean body. **MUST include Cyrillic** (site is RU+EN) —
  e.g. Playfair Display / Cormorant / Unbounded / Manrope / Onest. No Inter/Roboto/Arial defaults.
- **Colour:** one dominant tone + 1–2 sharp accents (CSS vars). No timid even palettes, no purple-on-white.
- **Motion:** one orchestrated page-load reveal (staggered) + tasteful hover/scroll + per-service modal
  visuals above. Smooth, no jank. CSS-first; Framer for React.
- **Backgrounds:** atmosphere & depth (gradient mesh, grain, subtle grid, glass) — not flat fills.
  If animating hero bg, keep it **CSS/SVG, no heavy WebGL** (it lagged before).
- **Spatial:** asymmetry, overlap, grid-breaking hero visual welcome.

Distinctly NOT generic AI-slop. Premium, modern, memorable.

---

## 5. EXACT COPY — English (`en`)

### Banner
- label: `NEW · 2026 PLAYBOOK`
- text: `How modern teams ship AI in 30 days — not 9 months`
- cta: `Read the guide`

### Nav
`About` · `Services` · `Approach` · `Blog` · `Community` · `Contact us`

### Hero
- eyebrow: `AI AGENCY · ENGINEERING-FIRST`
- title (3 lines): `Turn AI Into` / `Your Unfair` / `Advantage.`
- subtitle: `Aqly builds custom AI agents, Telegram bots, websites, connected tools and growth systems that save your team 10+ hours per week. From concept to deployment, we handle everything.`
- primary CTA: `Book a consultation`
- secondary CTA: `See our services`
- pill: `Telegram · Web · Automation · RAG · Growth`

**Hero chat (optional decorative)** — agent `Aqly Agent`, status `online`, typing `typing`, placeholder `Message`. Turns:
1. user: `What services do you offer? 🤔`
2. agent: `Hey — great to meet you 👋`
3. agent: `We build AI agents, Telegram bots, websites & connected tools — fully end to end ⚡`
4. user: `Could you build me a Telegram sales bot? 🤖`
5. agent: `Absolutely. Let me put together a quick spec…`
6. agent (card): `Done — here's your service card:`
7. user: `Looks perfect — let's start 🚀`
8. agent: `On it — booking your kickoff call now ✅`
- card: title `Telegram Bot`, body `24/7 sales & support agent, wired to your CRM`, tag `Ready to deploy`
- success: `Request handled · client happy`

### Tech stack
- title: `The stack we build with`
- logos (marquee): `React`, `Next.js`, `Vue`, `TypeScript`, `Node.js`, `PHP`, `Claude`, `OpenAI Codex`, `Perplexity`, `MCP`, `API`

### About (`#about`)
- kicker: `WHO WE ARE`
- title (3 lines): `A young studio` / `with senior` / `engineering.`
- lead: `Aqly is a new engineering studio building AI end-to-end — agents, bots, sites and automations. We're small on purpose: no account managers, no hand-offs, just the people writing the code talking straight to you. From first call to live deployment, the same team owns it.`
- value cards (4):
  1. `Speed` — `We ship production AI in ~30 days, not 9 months. Tight loops, weekly demos, no bureaucracy.`
  2. `Engineering-first` — `Real systems wired into your stack — CRM, payments, data. Not a wrapped chatbot demo.`
  3. `Transparency` — `Clear roadmap, clear pricing, clear ROI model. You always know what you're paying for.`
  4. `Partnership` — `We build for the long run — monitoring, optimizing and scaling as you grow, not one-and-done.`

### Services (`#services`)
- kicker: `WHAT WE BUILD`
- title: `AI Solutions That Deliver Results`
- card affordance: `Learn more`
- modal labels: how `How it works`, includes `What's included`
- modal CTA: button `Book a consultation`, title `Ready to build this?`, sub `Free 30-min consultation — no obligation.`

**1 — Telegram Bots**
- tag/title: `Telegram Bots`
- body: `Conversational agents that qualify leads, sell, onboard and support — natively inside Telegram. Plugged into your CRM and payments.`
- overview: `A Telegram bot is an always-on conversational agent that lives inside the app your customers already use every day. It understands natural language, remembers context, and can sell, onboard, support and collect payments — without a human in the loop.`
- how: `A user messages your bot — it reads intent in plain language.` / `It pulls live context from your CRM, docs and payment provider.` / `It answers, books, sells or escalates to a human when needed.` / `Every conversation is logged and scored in one dashboard.`
- features: `CRM + payments wired in` / `Multi-language` / `Human handoff` / `Live analytics`

**2 — Websites**
- tag/title: `Websites`
- body: `Production-grade marketing sites and dashboards. Performance, SEO and design polished to enterprise standard.`
- overview: `We design and ship production-grade marketing sites and product dashboards — fast, accessible, search-optimised and pixel-polished to an enterprise standard your brand deserves.`
- how: `We map your positioning, audience and conversion goals.` / `Design a distinctive system — type, colour, motion, layout.` / `Build on a modern stack (Next.js) with 90+ Lighthouse scores.` / `Ship, measure and iterate with analytics wired from day one.`
- features: `Next.js + edge hosting` / `SEO + Core Web Vitals` / `CMS-ready` / `Analytics built in`

**3 — AI Voice Assistants**
- tag/title: `AI Voice Assistants`
- body: `A lifelike voice agent embedded right on your site. It picks up every visitor, answers, qualifies and books in real time — so real, callers can't tell it's AI.`
- overview: `A custom AI voice assistant lives as a widget directly on your website. A visitor clicks it and instantly talks to an agent whose voice is so natural it's indistinguishable from a real person. It answers questions, qualifies the lead, handles objections and books the call — 24/7, on every visitor most sites quietly lose.`
- how: `Visitor clicks the voice widget on your site — no app, no dialing.` / `The agent greets them in a warm, human-realistic voice.` / `It understands intent, answers and pulls live data from your stack.` / `It qualifies, books the meeting or routes to your team — instantly.`
- features: `Human-realistic voice` / `Embedded site widget` / `24/7 instant pickup` / `Books & routes calls`

**4 — Connected Tools**
- tag/title: `Connected Tools`
- body: `We link your apps into one chain — a lead comes in, it's logged to a sheet, the client gets a message and your team gets a ping. Nobody does it by hand.`
- overview: `Picture one event kicking off a chain across your apps: an order arrives → it's saved to a sheet → the client gets a message → your manager gets notified. We build these chains, host them and keep them running without a hitch.`
- how: `We look at what you do by hand every day.` / `We build the chain — one event, your apps do the rest.` / `We add checks so nothing slips through.` / `We launch it, watch it and keep improving.`
- features: `Multi-step chains` / `Connects any apps` / `Error protection` / `Hosting + monitoring`

**5 — AI Integration**
- tag/title: `AI Integration`
- body: `Embed advanced AI across your business and product — automated chat support, content generation and copilots on Claude & GPT-class models that lift revenue and reach more customers.`
- overview: `We integrate state-of-the-art AI directly into your business and product — not a generic chatbot, but automated chat support, content generation, copilots and decision tools running on the most advanced cloud models (Claude, GPT-class). The result: lower costs, higher conversion and customers reached 24/7.`
- how: `Automated chat support that answers and resolves around the clock.` / `Content generation — posts, emails and product copy on demand.` / `Copilots and assistants wired straight into your existing product.` / `Runs on advanced cloud models (Claude, GPT-class) — secure & scalable.`
- features: `Chat support automation` / `Content generation` / `Claude & GPT-class models` / `Revenue & reach uplift`

**6 — Growth Marketing**
- tag/title: `Growth Marketing`
- body: `Positioning, funnels, content systems and paid loops — instrumented from day one so growth compounds.`
- overview: `Positioning, funnels, content systems and paid acquisition loops — instrumented from day one so growth compounds instead of leaking. We treat marketing like an engineering system, not a guessing game.`
- how: `We nail positioning and the ideal-customer profile.` / `Design the funnel and the content engine that feeds it.` / `Launch paid loops with clean attribution end to end.` / `Optimise on real numbers, reinvest into what compounds.`
- features: `Positioning sprint` / `Content engine` / `Paid loops` / `Full-funnel analytics`

### Approach (`#approach`)
- kicker: `OUR APPROACH`
- title: `From Idea to Impact in 4 Steps`
- step label: `STEP` (e.g. "STEP 1 / 4")
- 01 `Discovery` — `We learn your business inside and out — your workflows, pain points and goals — to find the highest-impact AI opportunities.` — tag `TYPICAL: 2-3 CALLS + ASYNC AUDIT`
- 02 `Strategy` — `We design the right solution with a clear roadmap, timeline and ROI projection so you know exactly what to expect.` — tag `DELIVERABLE: TECHNICAL SPEC + ROI MODEL`
- 03 `Build` — `We implement and integrate your AI solution with your existing tools and workflows. No disruption, just results.` — tag `WEEKLY DEMOS + ITERATIVE DELIVERY`
- 04 `Support` — `Ongoing optimization, monitoring and scaling to make sure your AI keeps delivering as your business grows.` — tag `SLA-BACKED RESPONSE TIMES`

### Contact form (`#contact`)
- kicker: `GET STARTED`
- title: `Let's Talk About Your Project`
- lede: `Tell us what you're building and we'll show you how AI can accelerate it.`
- "What to expect" title + items: `Free 30-minute consultation` / `Response within 24 hours` / `No-obligation project scoping` / `Transparent pricing upfront`
- email prompt: `Prefer to email directly?`
- progress label: `Form Progress`
- fields:
  - Name (`Name`) — placeholder `Your full name`
  - Email (`Email`) — placeholder `you@company.com`
  - Website URL (optional) (`Website URL (optional)`) — placeholder `https://yourcompany.com`
  - Services of Interest (`Services of Interest`) — options: `Telegram Bots`, `Websites`, `AI Voice Assistants`, `Connected Tools`, `AI Integration`, `Growth Marketing`
  - Project Timeline (`Project Timeline`) — options: `ASAP`, `1-3 months`, `3-6 months`, `Exploring`
  - Primary Business Challenge (`Primary Business Challenge`) — placeholder `Tell us about the biggest challenge you'd like to solve...`
  - Estimated Budget (`Estimated Budget`) — options: `Under $5k`, `$5k - $15k`, `$15k - $30k`, `$30k+`
- submit: `Book Your Free Consultation`
- errorHint: `Please fill in the highlighted fields first.`
- required: `This field is required`

### Footer
- tagline: `Custom AI solutions that save your business 10+ hours per week.`
- email: `hello@aqly.io`
- col "Services": `Telegram Bots`, `Websites`, `AI Voice Assistants`, `Connected Tools`, `AI Integration`, `Growth Marketing` (all → `#services`)
- col "Company": `About` (→`#about`), `Our Approach` (→`#approach`), `Contact` (→`#contact`)
- social title "Connect": `Telegram` (https://t.me/aqly), `Telegram Bot` (https://t.me/aqly_bot), `YouTube` (https://youtube.com/@aqly), `Instagram` (https://instagram.com/aqly), `LinkedIn` (https://linkedin.com/company/aqly)
- rights: `© 2026 Aqly.io · All rights reserved`
- legal nav: `Privacy Policy`, `Terms of Service`

---

## 6. EXACT COPY — Russian (`ru`)

### Баннер
- label: `НОВОЕ · ПЛЕЙБУК 2026`
- text: `Как современные команды запускают AI за 30 дней — а не за 9 месяцев`
- cta: `Открыть гайд`

### Навигация
`О нас` · `Услуги` · `Подход` · `Блог` · `Сообщество` · `Связаться`

### Hero
- eyebrow: `AI-АГЕНТСТВО · ИНЖЕНЕРНЫЙ ПОДХОД`
- title (3 строки): `Превратите AI` / `в своё нечестное` / `преимущество.`
- subtitle: `Aqly строит AI-агентов, Telegram-ботов, сайты, связки программ и системы роста — экономим вашей команде 10+ часов в неделю. От концепта до деплоя — закрываем всё.`
- primary CTA: `Записаться на созвон`
- secondary CTA: `Наши услуги`
- pill: `Telegram · Веб · Связки · RAG · Маркетинг`

**Hero-чат (декоративный)** — агент `Aqly Агент`, статус `онлайн`, печатает `печатает`, плейсхолдер `Сообщение`. Реплики:
1. user: `Какие у вас услуги? 🤔`
2. agent: `Привет — рад знакомству 👋`
3. agent: `Мы строим AI-агентов, Telegram-ботов, сайты и связки программ — полностью под ключ ⚡`
4. user: `Сможете собрать Telegram-бота для продаж? 🤖`
5. agent: `Конечно. Сейчас набросаю краткую спеку…`
6. agent (card): `Готово — вот карточка услуги:`
7. user: `Отлично — давайте начнём 🚀`
8. agent: `Принято — записываю вас на стартовый созвон ✅`
- card: title `Telegram-бот`, body `Агент продаж и поддержки 24/7, подключён к CRM`, tag `Готов к запуску`
- success: `Заявка оформлена · клиент доволен`

### Стек
- title: `Стек, на котором мы строим`
- логотипы: те же (`React`, `Next.js`, `Vue`, `TypeScript`, `Node.js`, `PHP`, `Claude`, `OpenAI Codex`, `Perplexity`, `MCP`, `API`)

### О нас (`#about`)
- kicker: `КТО МЫ`
- title (3 строки): `Молодая студия` / `с сеньорной` / `инженерией.`
- lead: `Aqly — новая инженерная студия, которая строит AI под ключ: агентов, ботов, сайты и автоматизации. Мы намеренно небольшие: без аккаунт-менеджеров и передач между отделами — с вами напрямую общаются те, кто пишет код. От первого звонка до боевого деплоя проект ведёт одна команда.`
- карточки ценностей (4):
  1. `Скорость` — `Запускаем рабочий AI за ~30 дней, а не за 9 месяцев. Короткие итерации, еженедельные демо, без бюрократии.`
  2. `Инженерия` — `Реальные системы, вшитые в ваш стек — CRM, платежи, данные. Не обёрнутая демка-чатбот.`
  3. `Прозрачность` — `Понятный роадмап, понятные цены, понятная модель ROI. Вы всегда знаете, за что платите.`
  4. `Партнёрство` — `Строим вдолгую — мониторинг, оптимизация и масштабирование по мере роста, а не «сдал и забыл».`

### Услуги (`#services`)
- kicker: `ЧТО МЫ СТРОИМ`
- title: `AI-решения, которые дают результат`
- карточка: `Подробнее`
- модалка: how `Как это работает`, includes `Что входит`
- модалка CTA: кнопка `Записаться на созвон`, title `Готовы запустить?`, sub `Бесплатная консультация 30 минут, без обязательств.`

**1 — Telegram-боты**
- tag/title: `Telegram-боты`
- body: `Диалоговые агенты квалифицируют, продают, онбордят и поддерживают — нативно в Telegram. Подключены к CRM и платежам.`
- overview: `Telegram-бот — это всегда онлайн диалоговый агент внутри приложения, которым ваши клиенты пользуются каждый день. Он понимает естественный язык, помнит контекст, продаёт, онбордит, поддерживает и принимает платежи — без участия человека.`
- how: `Пользователь пишет боту — он понимает запрос на обычном языке.` / `Бот подтягивает контекст из CRM, документов и платёжной системы.` / `Отвечает, бронирует, продаёт или передаёт человеку при необходимости.` / `Каждый диалог логируется и оценивается в одном дашборде.`
- features: `CRM + платежи` / `Мультиязычность` / `Передача человеку` / `Аналитика онлайн`

**2 — Веб-сайты**
- tag/title: `Веб-сайты`
- body: `Production-grade сайты и дашборды. Производительность, SEO и дизайн уровня enterprise.`
- overview: `Проектируем и запускаем production-grade сайты и продуктовые дашборды — быстрые, доступные, SEO-оптимизированные и отполированные до пикселя на уровне enterprise.`
- how: `Разбираем позиционирование, аудиторию и цели по конверсии.` / `Создаём фирменную систему — шрифты, цвет, анимация, сетка.` / `Собираем на современном стеке (Next.js), Lighthouse 90+.` / `Запускаем и итерируем с аналитикой с первого дня.`
- features: `Next.js + edge` / `SEO + Core Web Vitals` / `Готов к CMS` / `Аналитика внутри`

**3 — AI-голосовые помощники**
- tag/title: `AI-голосовые помощники`
- body: `Реалистичный голосовой агент прямо на вашем сайте. Встречает каждого посетителя, отвечает, квалифицирует и записывает в реальном времени — голос не отличить от человека.`
- overview: `Кастомный AI-голосовой помощник живёт виджетом прямо на вашем сайте. Посетитель нажимает — и сразу говорит с агентом, чей голос настолько естественный, что его не отличить от живого человека. Он отвечает на вопросы, квалифицирует лида, отрабатывает возражения и записывает на звонок — 24/7, по каждому посетителю, которого большинство сайтов тихо теряет.`
- how: `Посетитель нажимает голосовой виджет на сайте — без приложений и звонков.` / `Агент приветствует тёплым, человечным голосом.` / `Понимает запрос, отвечает и подтягивает данные из вашего стека.` / `Квалифицирует, записывает встречу или передаёт команде — мгновенно.`
- features: `Реалистичный голос` / `Виджет на сайте` / `Ответ 24/7 мгновенно` / `Запись и маршрутизация`

**4 — Связка программ**
- tag/title: `Связка программ`
- body: `Соединяем ваши программы в одну цепочку: пришла заявка — она сама попадает в таблицу, клиенту уходит сообщение, а вам — уведомление. Руками никто ничего не делает.`
- overview: `Представьте: одно событие запускает цепочку действий между вашими программами. Пришёл заказ → записался в таблицу → клиент получил сообщение → менеджер увидел уведомление. Мы собираем такие цепочки, размещаем их и следим, чтобы всё работало без сбоев.`
- how: `Смотрим, что вы каждый день делаете руками.` / `Собираем цепочку — одно событие, и программы делают всё сами.` / `Добавляем проверки, чтобы ничего не терялось.` / `Запускаем, следим и улучшаем.`
- features: `Цепочки из нескольких шагов` / `Соединяем любые программы` / `Защита от ошибок` / `Размещение и присмотр`
- (визуализация: цепочка нод `Заявка → Таблица → Готово`, соединяются по очереди + импульс)

**5 — Интеграция AI**
- tag/title: `Интеграция AI`
- body: `Встраиваем продвинутый AI в ваш бизнес и продукт — автоматическая чат-поддержка, генерация контента и копайлоты на моделях Claude и уровня GPT, которые повышают доход и охватывают больше клиентов.`
- overview: `Интегрируем передовой AI прямо в ваш бизнес и продукт — не дежурный чат-бот, а автоматическая чат-поддержка, генерация контента, копайлоты и инструменты принятия решений на самых продвинутых клауд-моделях (Claude, уровень GPT). Итог: ниже издержки, выше конверсия, клиенты охвачены 24/7.`
- how: `Автоматическая чат-поддержка — отвечает и закрывает обращения круглосуточно.` / `Генерация контента — посты, письма и продуктовые тексты по запросу.` / `Копайлоты и ассистенты, встроенные прямо в ваш продукт.` / `Работает на продвинутых клауд-моделях (Claude, уровень GPT) — надёжно и масштабируемо.`
- features: `Автоматизация чат-поддержки` / `Генерация контента` / `Модели Claude и уровня GPT` / `Рост дохода и охвата`

**6 — Маркетинг**
- tag/title: `Маркетинг`
- body: `Позиционирование, воронки, контент-системы и платные циклы — измеряем с первого дня, рост компаундируется.`
- overview: `Позиционирование, воронки, контент-системы и платные циклы привлечения — измеряем с первого дня, чтобы рост компаундировался, а не утекал. Относимся к маркетингу как к инженерной системе, а не к угадайке.`
- how: `Фиксируем позиционирование и профиль идеального клиента.` / `Проектируем воронку и контент-движок, который её кормит.` / `Запускаем платные циклы с чистой сквозной атрибуцией.` / `Оптимизируем по реальным цифрам, реинвестируем в рост.`
- features: `Спринт позиционирования` / `Контент-движок` / `Платные циклы` / `Сквозная аналитика`

### Подход (`#approach`)
- kicker: `НАШ ПОДХОД`
- title: `От идеи до результата за 4 шага`
- step label: `ШАГ` (например «ШАГ 1 / 4»)
- 01 `Исследование` — `Изучаем ваш бизнес изнутри — процессы, боли и цели — чтобы найти AI-возможности с максимальным эффектом.` — tag `ТИПИЧНО: 2-3 СОЗВОНА + АУДИТ`
- 02 `Стратегия` — `Проектируем решение с роадмапом, таймлайном и ROI-проекцией — вы точно знаете, чего ждать.` — tag `ИТОГ: ТЕХНИЧЕСКАЯ СПЕКА + ROI-МОДЕЛЬ`
- 03 `Разработка` — `Внедряем и интегрируем AI-решение в текущие инструменты и процессы. Без сбоев, только результат.` — tag `ЕЖЕНЕДЕЛЬНЫЕ ДЕМО + ИТЕРАЦИИ`
- 04 `Поддержка` — `Оптимизация, мониторинг и масштабирование — AI продолжает работать пока бизнес растёт.` — tag `SLA-ГАРАНТИИ`

### Форма (`#contact`)
- kicker: `СТАРТУЕМ`
- title: `Расскажите о вашем проекте`
- lede: `Поделитесь, что строите — покажем, как AI ускорит это.`
- «Что получите» + пункты: `Бесплатная 30-минутная консультация` / `Ответ в течение 24 часов` / `Скоупинг проекта без обязательств` / `Прозрачные цены с порога`
- email prompt: `Хотите написать напрямую?`
- progress: `Прогресс формы`
- поля:
  - Имя (`Имя`) — placeholder `Ваше полное имя`
  - Email (`Email`) — placeholder `you@company.com`
  - Сайт (необязательно) (`Сайт (необязательно)`) — placeholder `https://yourcompany.com`
  - Интересующие услуги (`Интересующие услуги`) — опции: `Telegram-боты`, `Веб-сайты`, `AI-голосовые помощники`, `Связка программ`, `Интеграция AI`, `Маркетинг`
  - Сроки проекта (`Сроки проекта`) — опции: `ASAP`, `1-3 месяца`, `3-6 месяцев`, `Изучаю`
  - Главный бизнес-вызов (`Главный бизнес-вызов`) — placeholder `Опишите главный вызов, который хотите решить...`
  - Бюджет (`Бюджет`) — опции: `До $5k`, `$5k - $15k`, `$15k - $30k`, `$30k+`
- submit: `Записаться на бесплатную консультацию`
- errorHint: `Сначала заполните выделенные поля.`
- required: `Это поле обязательно`

### Футер
- tagline: `Кастомные AI-системы, экономящие команде 10+ часов в неделю.`
- email: `hello@aqly.io`
- кол «Услуги»: `Telegram-боты`, `Веб-сайты`, `AI-голосовые помощники`, `Связка программ`, `Интеграция AI`, `Маркетинг` (все → `#services`)
- кол «Компания»: `О нас` (→`#about`), `Подход` (→`#approach`), `Контакты` (→`#contact`)
- соцсети «Соцсети»: `Telegram` (https://t.me/aqly), `Telegram-бот` (https://t.me/aqly_bot), `YouTube` (https://youtube.com/@aqly), `Instagram` (https://instagram.com/aqly), `LinkedIn` (https://linkedin.com/company/aqly)
- rights: `© 2026 Aqly.io · Все права защищены`
- legal: `Политика приватности`, `Условия`

---

## 7. Acceptance checklist

- [ ] All 9 sections present, in order, with correct anchor IDs (`#about`/`#services`/`#approach`/`#contact`).
- [ ] EN/RU toggle swaps **every** string; both dictionaries identical in shape; default EN.
- [ ] All copy matches this file **exactly** (no paraphrasing, both languages).
- [ ] 6 service cards → centered bento modal: animated visual on top, info tiles below, dark CTA band.
- [ ] Connected Tools / Связка программ modal: node chain animates in sequence (1→2→3) + traveling pulse, loops.
- [ ] Contact form: live progress + inline validation + success state.
- [ ] Distinct, premium, NON-generic aesthetic; display font supports **Cyrillic**.
- [ ] Responsive (mobile + desktop), accessible, honors `prefers-reduced-motion`.
- [ ] No hydration mismatch; smooth motion, no jank; hero bg CSS/SVG (no heavy WebGL).
