"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Lang = "ru" | "en"

type Dict = typeof en

const en = {
  banner: {
    label: "NEW · 2026 PLAYBOOK",
    text: "How modern teams ship AI in 30 days — not 9 months",
    cta: "Read the guide",
  },
  nav: {
    services: "Services",
    approach: "Approach",
    blog: "Blog",
    community: "Community",
    contact: "Contact us",
  },
  hero: {
    eyebrow: "AI AGENCY · ENGINEERING-FIRST",
    title: ["Turn AI Into", "Your Unfair", "Advantage."],
    subtitle:
      "Aqly builds custom AI agents, Telegram bots, websites, n8n workflows and growth systems that save your team 10+ hours per week. From concept to deployment, we handle everything.",
    primary: "Book a consultation",
    secondary: "See our services",
    pill: "Telegram · Web · n8n · RAG · Growth",
    mockTitle: "Aqly Agent",
    mockStatus: "live",
    mockLog: [
      "12 new leads matched ICP",
      "Enriched, scored, synced to CRM",
      "Slack #sales notified · 3 meetings booked",
    ],
    mockReq: "Process 2,400 refund requests by EOD",
    mockMeta: "947 resolved · 1,453 in queue",
    mockBadge: "98% auto-resolved",
    mockProcessing: "Agent working",
    chat: {
      title: "Aqly Agent",
      status: "online",
      typing: "typing",
      placeholder: "Message",
      turns: [
        { role: "user", text: "What services do you offer? 🤔", card: false },
        { role: "agent", text: "AI agents, Telegram bots, websites & n8n automation — built end to end ⚡", card: false },
        { role: "user", text: "Generate a service card for me 🎨", card: false },
        { role: "agent", text: "Done — here's your card:", card: true },
      ],
      cardTitle: "Telegram Bot",
      cardBody: "24/7 sales & support agent, wired to your CRM",
      cardTag: "Ready to deploy",
      success: "Request handled · client happy",
    },
  },
  build: {
    kicker: "WHAT WE BUILD",
    title: "AI Solutions That Deliver Results",
    learnMore: "Learn more",
    modalCta: "Book a consultation",
    modalHow: "How it works",
    modalIncludes: "What's included",
    items: [
      {
        tag: "Telegram Bots",
        title: "Telegram Bots",
        body: "Conversational agents that qualify leads, sell, onboard and support — natively inside Telegram. Plugged into your CRM and payments.",
        details: {
          overview:
            "A Telegram bot is an always-on conversational agent that lives inside the app your customers already use every day. It understands natural language, remembers context, and can sell, onboard, support and collect payments — without a human in the loop.",
          how: [
            "A user messages your bot — it reads intent in plain language.",
            "It pulls live context from your CRM, docs and payment provider.",
            "It answers, books, sells or escalates to a human when needed.",
            "Every conversation is logged and scored in one dashboard.",
          ],
          features: ["CRM + payments wired in", "Multi-language", "Human handoff", "Live analytics"],
        },
      },
      {
        tag: "Websites",
        title: "Websites",
        body: "Production-grade marketing sites and dashboards. Performance, SEO and design polished to enterprise standard.",
        details: {
          overview:
            "We design and ship production-grade marketing sites and product dashboards — fast, accessible, search-optimised and pixel-polished to an enterprise standard your brand deserves.",
          how: [
            "We map your positioning, audience and conversion goals.",
            "Design a distinctive system — type, colour, motion, layout.",
            "Build on a modern stack (Next.js) with 90+ Lighthouse scores.",
            "Ship, measure and iterate with analytics wired from day one.",
          ],
          features: ["Next.js + edge hosting", "SEO + Core Web Vitals", "CMS-ready", "Analytics built in"],
        },
      },
      {
        tag: "Landing Pages",
        title: "Landing Pages",
        body: "High-velocity landers for launches and campaigns. A/B-ready, analytics wired, copy that earns attention.",
        details: {
          overview:
            "High-velocity landing pages purpose-built for launches and paid campaigns. Every section is engineered to convert — A/B-ready, instrumented, with copy that earns attention in the first three seconds.",
          how: [
            "We sharpen the offer and write the conversion narrative.",
            "Design a single-focus page with one clear action.",
            "Wire A/B variants, events and pixels before launch.",
            "Read the data, kill the losers, double down on winners.",
          ],
          features: ["A/B variants", "Event tracking", "Sub-second load", "Conversion copy"],
        },
      },
      {
        tag: "n8n Workflows",
        title: "n8n Workflows",
        body: "Automated workflows connecting 400+ apps that save 10+ hours per week. No more manual data entry or copy-pasting.",
        details: {
          overview:
            "Automated workflows that connect 400+ apps and quietly run your operations in the background. We replace the manual data entry, copy-pasting and tab-switching that eats 10+ hours of your team's week.",
          how: [
            "We audit the repetitive work draining your team's hours.",
            "Map each task into a visual, reliable n8n workflow.",
            "Connect your apps — CRM, email, sheets, Slack, AI models.",
            "Add monitoring and alerts so it never silently breaks.",
          ],
          features: ["400+ integrations", "AI steps inside flows", "Error alerting", "Self-hosted option"],
        },
      },
      {
        tag: "AI Features",
        title: "AI Features",
        body: "RAG systems, copilots, classifiers, voice. AI that actually knows your business data and integrates with your stack.",
        details: {
          overview:
            "RAG systems, copilots, classifiers and voice agents that actually know your business data. We embed AI directly into your product and stack — grounded in your knowledge, not generic answers.",
          how: [
            "We index your docs, data and knowledge into a vector store.",
            "Build retrieval so answers are grounded and cite sources.",
            "Wrap it in a copilot, classifier or voice interface.",
            "Guardrail, evaluate and ship behind your own auth.",
          ],
          features: ["RAG + citations", "Your own data", "Eval harness", "Any LLM provider"],
        },
      },
      {
        tag: "Growth Marketing",
        title: "Growth Marketing",
        body: "Positioning, funnels, content systems and paid loops — instrumented from day one so growth compounds.",
        details: {
          overview:
            "Positioning, funnels, content systems and paid acquisition loops — instrumented from day one so growth compounds instead of leaking. We treat marketing like an engineering system, not a guessing game.",
          how: [
            "We nail positioning and the ideal-customer profile.",
            "Design the funnel and the content engine that feeds it.",
            "Launch paid loops with clean attribution end to end.",
            "Optimise on real numbers, reinvest into what compounds.",
          ],
          features: ["Positioning sprint", "Content engine", "Paid loops", "Full-funnel analytics"],
        },
      },
    ],
  },
  approach: {
    kicker: "OUR APPROACH",
    title: "From Idea to Impact in 4 Steps",
    steps: [
      {
        n: "01",
        title: "Discovery",
        body: "We learn your business inside and out — your workflows, pain points and goals — to find the highest-impact AI opportunities.",
        tag: "TYPICAL: 2-3 CALLS + ASYNC AUDIT",
      },
      {
        n: "02",
        title: "Strategy",
        body: "We design the right solution with a clear roadmap, timeline and ROI projection so you know exactly what to expect.",
        tag: "DELIVERABLE: TECHNICAL SPEC + ROI MODEL",
      },
      {
        n: "03",
        title: "Build",
        body: "We implement and integrate your AI solution with your existing tools and workflows. No disruption, just results.",
        tag: "WEEKLY DEMOS + ITERATIVE DELIVERY",
      },
      {
        n: "04",
        title: "Support",
        body: "Ongoing optimization, monitoring and scaling to make sure your AI keeps delivering as your business grows.",
        tag: "SLA-BACKED RESPONSE TIMES",
      },
    ],
  },
  form: {
    kicker: "GET STARTED",
    title: "Let's Talk About Your Project",
    lede: "Tell us what you're building and we'll show you how AI can accelerate it.",
    expect: {
      title: "What to expect",
      items: [
        "Free 30-minute consultation",
        "Response within 24 hours",
        "No-obligation project scoping",
        "Transparent pricing upfront",
      ],
      email: "Prefer to email directly?",
    },
    progress: "Form Progress",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      email: { label: "Email", placeholder: "you@company.com" },
      website: { label: "Website URL (optional)", placeholder: "https://yourcompany.com" },
      services: {
        label: "Services of Interest",
        options: ["Telegram Bots", "Websites", "Landing Pages", "n8n Workflows", "AI Features", "Growth Marketing"],
      },
      timeline: {
        label: "Project Timeline",
        options: ["ASAP", "1-3 months", "3-6 months", "Exploring"],
      },
      challenge: {
        label: "Primary Business Challenge",
        placeholder: "Tell us about the biggest challenge you'd like to solve...",
      },
      budget: {
        label: "Estimated Budget",
        options: ["Under $5k", "$5k - $15k", "$15k - $30k", "$30k+"],
      },
    },
    submit: "Book Your Free Consultation",
    errorHint: "Please fill in the highlighted fields first.",
    required: "This field is required",
  },
  footer: {
    tagline: "Custom AI solutions that save your business 10+ hours per week.",
    email: "hello@aqly.io",
    cols: [
      { title: "Services", links: [
        { label: "Telegram Bots", href: "#services" },
        { label: "Websites", href: "#services" },
        { label: "Landing Pages", href: "#services" },
        { label: "n8n Workflows", href: "#services" },
        { label: "AI Features", href: "#services" },
        { label: "Growth Marketing", href: "#services" },
      ] },
      { title: "Company", links: [
        { label: "Our Approach", href: "#approach" },
        { label: "Contact", href: "#contact" },
      ] },
    ],
    socialTitle: "Connect",
    social: [
      { label: "Telegram", href: "https://t.me/aqly" },
      { label: "Telegram Bot", href: "https://t.me/aqly_bot" },
      { label: "Website", href: "https://aqly.io" },
      { label: "YouTube", href: "https://youtube.com/@aqly" },
      { label: "Instagram", href: "https://instagram.com/aqly" },
      { label: "LinkedIn", href: "https://linkedin.com/company/aqly" },
      { label: "X / Twitter", href: "https://x.com/aqly" },
    ],
    rights: "© 2026 Aqly.io · All rights reserved",
    nav: ["Privacy Policy", "Terms of Service"],
  },
}

const ru: Dict = {
  banner: {
    label: "НОВОЕ · ПЛЕЙБУК 2026",
    text: "Как современные команды запускают AI за 30 дней — а не за 9 месяцев",
    cta: "Открыть гайд",
  },
  nav: {
    services: "Услуги",
    approach: "Подход",
    blog: "Блог",
    community: "Сообщество",
    contact: "Связаться",
  },
  hero: {
    eyebrow: "AI-АГЕНТСТВО · ИНЖЕНЕРНЫЙ ПОДХОД",
    title: ["Превратите AI", "в своё нечестное", "преимущество."],
    subtitle:
      "Aqly строит AI-агентов, Telegram-ботов, сайты, n8n-воркфлоу и системы роста — экономим вашей команде 10+ часов в неделю. От концепта до деплоя — закрываем всё.",
    primary: "Записаться на созвон",
    secondary: "Наши услуги",
    pill: "Telegram · Веб · n8n · RAG · Маркетинг",
    mockTitle: "Aqly Агент",
    mockStatus: "онлайн",
    mockLog: [
      "12 новых лидов по вашему ICP",
      "Обогащены, оценены, в CRM",
      "Slack #sales уведомлён · 3 встречи",
    ],
    mockReq: "Обработать 2 400 возвратов к концу дня",
    mockMeta: "947 закрыто · 1 453 в очереди",
    mockBadge: "98% авто-резолв",
    mockProcessing: "Агент работает",
    chat: {
      title: "Aqly Агент",
      status: "онлайн",
      typing: "печатает",
      placeholder: "Сообщение",
      turns: [
        { role: "user", text: "Какие у вас услуги? 🤔", card: false },
        { role: "agent", text: "AI-агенты, Telegram-боты, сайты и автоматизация n8n — под ключ ⚡", card: false },
        { role: "user", text: "Сгенерируй мне карточку услуги 🎨", card: false },
        { role: "agent", text: "Готово — вот ваша карточка:", card: true },
      ],
      cardTitle: "Telegram-бот",
      cardBody: "Агент продаж и поддержки 24/7, подключён к CRM",
      cardTag: "Готов к запуску",
      success: "Заявка оформлена · клиент доволен",
    },
  },
  build: {
    kicker: "ЧТО МЫ СТРОИМ",
    title: "AI-решения, которые дают результат",
    learnMore: "Подробнее",
    modalCta: "Записаться на созвон",
    modalHow: "Как это работает",
    modalIncludes: "Что входит",
    items: [
      {
        tag: "Telegram-боты",
        title: "Telegram-боты",
        body: "Диалоговые агенты квалифицируют, продают, онбордят и поддерживают — нативно в Telegram. Подключены к CRM и платежам.",
        details: {
          overview:
            "Telegram-бот — это всегда онлайн диалоговый агент внутри приложения, которым ваши клиенты пользуются каждый день. Он понимает естественный язык, помнит контекст, продаёт, онбордит, поддерживает и принимает платежи — без участия человека.",
          how: [
            "Пользователь пишет боту — он понимает запрос на обычном языке.",
            "Бот подтягивает контекст из CRM, документов и платёжной системы.",
            "Отвечает, бронирует, продаёт или передаёт человеку при необходимости.",
            "Каждый диалог логируется и оценивается в одном дашборде.",
          ],
          features: ["CRM + платежи", "Мультиязычность", "Передача человеку", "Аналитика онлайн"],
        },
      },
      {
        tag: "Веб-сайты",
        title: "Веб-сайты",
        body: "Production-grade сайты и дашборды. Производительность, SEO и дизайн уровня enterprise.",
        details: {
          overview:
            "Проектируем и запускаем production-grade сайты и продуктовые дашборды — быстрые, доступные, SEO-оптимизированные и отполированные до пикселя на уровне enterprise.",
          how: [
            "Разбираем позиционирование, аудиторию и цели по конверсии.",
            "Создаём фирменную систему — шрифты, цвет, анимация, сетка.",
            "Собираем на современном стеке (Next.js), Lighthouse 90+.",
            "Запускаем и итерируем с аналитикой с первого дня.",
          ],
          features: ["Next.js + edge", "SEO + Core Web Vitals", "Готов к CMS", "Аналитика внутри"],
        },
      },
      {
        tag: "Лендинги",
        title: "Лендинги",
        body: "Скоростные лендинги под запуски и кампании. A/B-готовы, аналитика подключена, копирайт работает.",
        details: {
          overview:
            "Скоростные лендинги под запуски и платные кампании. Каждый блок спроектирован под конверсию — готов к A/B, с подключённой аналитикой и копирайтом, который цепляет за первые три секунды.",
          how: [
            "Затачиваем оффер и пишем конверсионный нарратив.",
            "Проектируем страницу с одним фокусом и одним действием.",
            "Подключаем A/B-варианты, события и пиксели до запуска.",
            "Читаем данные, убираем слабое, усиливаем сильное.",
          ],
          features: ["A/B-варианты", "Трекинг событий", "Загрузка < 1 c", "Конверсионный копирайт"],
        },
      },
      {
        tag: "n8n Workflows",
        title: "n8n Workflows",
        body: "Автоматизация на 400+ приложениях. Экономия 10+ часов в неделю. Ручной ввод и копи-паст — в прошлом.",
        details: {
          overview:
            "Автоматизированные воркфлоу, которые связывают 400+ приложений и тихо ведут вашу операционку в фоне. Убираем ручной ввод, копи-паст и переключение вкладок, которые съедают 10+ часов команды в неделю.",
          how: [
            "Аудитим рутину, которая забирает часы у команды.",
            "Переносим каждую задачу в визуальный надёжный n8n-воркфлоу.",
            "Подключаем приложения — CRM, почту, таблицы, Slack, AI-модели.",
            "Добавляем мониторинг и алерты — ничего не ломается молча.",
          ],
          features: ["400+ интеграций", "AI-шаги внутри", "Алерты об ошибках", "Self-hosted опция"],
        },
      },
      {
        tag: "AI-фичи",
        title: "AI-фичи",
        body: "RAG-системы, копайлоты, классификаторы, голос. AI, который знает ваши данные и интегрируется в стек.",
        details: {
          overview:
            "RAG-системы, копайлоты, классификаторы и голосовые агенты, которые реально знают данные вашего бизнеса. Встраиваем AI прямо в продукт и стек — на основе ваших знаний, а не общих ответов.",
          how: [
            "Индексируем ваши документы и данные в векторное хранилище.",
            "Строим retrieval — ответы обоснованы и ссылаются на источники.",
            "Заворачиваем в копайлот, классификатор или голосовой интерфейс.",
            "Ставим guardrails, прогоняем eval и запускаем за вашей авторизацией.",
          ],
          features: ["RAG + цитаты", "Ваши данные", "Eval-харнесс", "Любой LLM-провайдер"],
        },
      },
      {
        tag: "Маркетинг",
        title: "Маркетинг",
        body: "Позиционирование, воронки, контент-системы и платные циклы — измеряем с первого дня, рост компаундируется.",
        details: {
          overview:
            "Позиционирование, воронки, контент-системы и платные циклы привлечения — измеряем с первого дня, чтобы рост компаундировался, а не утекал. Относимся к маркетингу как к инженерной системе, а не к угадайке.",
          how: [
            "Фиксируем позиционирование и профиль идеального клиента.",
            "Проектируем воронку и контент-движок, который её кормит.",
            "Запускаем платные циклы с чистой сквозной атрибуцией.",
            "Оптимизируем по реальным цифрам, реинвестируем в рост.",
          ],
          features: ["Спринт позиционирования", "Контент-движок", "Платные циклы", "Сквозная аналитика"],
        },
      },
    ],
  },
  approach: {
    kicker: "НАШ ПОДХОД",
    title: "От идеи до результата за 4 шага",
    steps: [
      { n: "01", title: "Discovery", body: "Изучаем ваш бизнес изнутри — процессы, боли и цели — чтобы найти AI-возможности с максимальным эффектом.", tag: "ТИПИЧНО: 2-3 СОЗВОНА + АУДИТ" },
      { n: "02", title: "Стратегия", body: "Проектируем решение с роадмапом, таймлайном и ROI-проекцией — вы точно знаете, чего ждать.", tag: "ИТОГ: ТЕХНИЧЕСКАЯ СПЕКА + ROI-МОДЕЛЬ" },
      { n: "03", title: "Build", body: "Внедряем и интегрируем AI-решение в текущие инструменты и процессы. Без сбоев, только результат.", tag: "ЕЖЕНЕДЕЛЬНЫЕ ДЕМО + ИТЕРАЦИИ" },
      { n: "04", title: "Поддержка", body: "Оптимизация, мониторинг и масштабирование — AI продолжает работать пока бизнес растёт.", tag: "SLA-ГАРАНТИИ" },
    ],
  },
  form: {
    kicker: "СТАРТУЕМ",
    title: "Расскажите о вашем проекте",
    lede: "Поделитесь, что строите — покажем, как AI ускорит это.",
    expect: {
      title: "Что получите",
      items: [
        "Бесплатная 30-минутная консультация",
        "Ответ в течение 24 часов",
        "Скоупинг проекта без обязательств",
        "Прозрачные цены с порога",
      ],
      email: "Хотите написать напрямую?",
    },
    progress: "Прогресс формы",
    fields: {
      name: { label: "Имя", placeholder: "Ваше полное имя" },
      email: { label: "Email", placeholder: "you@company.com" },
      website: { label: "Сайт (необязательно)", placeholder: "https://yourcompany.com" },
      services: {
        label: "Интересующие услуги",
        options: ["Telegram-боты", "Веб-сайты", "Лендинги", "n8n Workflows", "AI-фичи", "Маркетинг"],
      },
      timeline: {
        label: "Сроки проекта",
        options: ["ASAP", "1-3 месяца", "3-6 месяцев", "Изучаю"],
      },
      challenge: {
        label: "Главный бизнес-вызов",
        placeholder: "Опишите главный вызов, который хотите решить...",
      },
      budget: {
        label: "Бюджет",
        options: ["До $5k", "$5k - $15k", "$15k - $30k", "$30k+"],
      },
    },
    submit: "Записаться на бесплатную консультацию",
    errorHint: "Сначала заполните выделенные поля.",
    required: "Это поле обязательно",
  },
  footer: {
    tagline: "Кастомные AI-системы, экономящие команде 10+ часов в неделю.",
    email: "hello@aqly.io",
    cols: [
      { title: "Услуги", links: [
        { label: "Telegram-боты", href: "#services" },
        { label: "Веб-сайты", href: "#services" },
        { label: "Лендинги", href: "#services" },
        { label: "n8n Workflows", href: "#services" },
        { label: "AI-фичи", href: "#services" },
        { label: "Маркетинг", href: "#services" },
      ] },
      { title: "Компания", links: [
        { label: "Подход", href: "#approach" },
        { label: "Контакты", href: "#contact" },
      ] },
    ],
    socialTitle: "Соцсети",
    social: [
      { label: "Telegram", href: "https://t.me/aqly" },
      { label: "Telegram-бот", href: "https://t.me/aqly_bot" },
      { label: "Сайт", href: "https://aqly.io" },
      { label: "YouTube", href: "https://youtube.com/@aqly" },
      { label: "Instagram", href: "https://instagram.com/aqly" },
      { label: "LinkedIn", href: "https://linkedin.com/company/aqly" },
      { label: "X / Twitter", href: "https://x.com/aqly" },
    ],
    rights: "© 2026 Aqly.io · Все права защищены",
    nav: ["Политика приватности", "Условия"],
  },
}

const dicts = { en, ru }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict }
const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: en })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  return (
    <I18nCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nCtx.Provider>
  )
}

export const useI18n = () => useContext(I18nCtx)
