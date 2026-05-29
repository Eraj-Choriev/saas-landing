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
  },
  build: {
    kicker: "WHAT WE BUILD",
    title: "AI Solutions That Deliver Results",
    items: [
      {
        tag: "Telegram Bots",
        title: "Telegram Bots",
        body: "Conversational agents that qualify leads, sell, onboard and support — natively inside Telegram. Plugged into your CRM and payments.",
      },
      {
        tag: "Websites",
        title: "Websites",
        body: "Production-grade marketing sites and dashboards. Performance, SEO and design polished to enterprise standard.",
      },
      {
        tag: "Landing Pages",
        title: "Landing Pages",
        body: "High-velocity landers for launches and campaigns. A/B-ready, analytics wired, copy that earns attention.",
      },
      {
        tag: "n8n Workflows",
        title: "n8n Workflows",
        body: "Automated workflows connecting 400+ apps that save 10+ hours per week. No more manual data entry or copy-pasting.",
      },
      {
        tag: "AI Features",
        title: "AI Features",
        body: "RAG systems, copilots, classifiers, voice. AI that actually knows your business data and integrates with your stack.",
      },
      {
        tag: "Growth Marketing",
        title: "Growth Marketing",
        body: "Positioning, funnels, content systems and paid loops — instrumented from day one so growth compounds.",
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
      { title: "Services", links: ["Telegram Bots", "Websites", "Landing Pages", "n8n Workflows", "AI Features", "Growth Marketing"] },
      { title: "Company", links: ["Our Approach", "Blog", "Community", "Contact"] },
      { title: "Connect", links: ["Aqly+", "Free Community", "YouTube", "Instagram", "TikTok", "LinkedIn", "X / Twitter"] },
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
  },
  build: {
    kicker: "ЧТО МЫ СТРОИМ",
    title: "AI-решения, которые дают результат",
    items: [
      { tag: "Telegram-боты", title: "Telegram-боты", body: "Диалоговые агенты квалифицируют, продают, онбордят и поддерживают — нативно в Telegram. Подключены к CRM и платежам." },
      { tag: "Веб-сайты", title: "Веб-сайты", body: "Production-grade сайты и дашборды. Производительность, SEO и дизайн уровня enterprise." },
      { tag: "Лендинги", title: "Лендинги", body: "Скоростные лендинги под запуски и кампании. A/B-готовы, аналитика подключена, копирайт работает." },
      { tag: "n8n Workflows", title: "n8n Workflows", body: "Автоматизация на 400+ приложениях. Экономия 10+ часов в неделю. Ручной ввод и копи-паст — в прошлом." },
      { tag: "AI-фичи", title: "AI-фичи", body: "RAG-системы, копайлоты, классификаторы, голос. AI, который знает ваши данные и интегрируется в стек." },
      { tag: "Маркетинг", title: "Маркетинг", body: "Позиционирование, воронки, контент-системы и платные циклы — измеряем с первого дня, рост компаундируется." },
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
      { title: "Услуги", links: ["Telegram-боты", "Веб-сайты", "Лендинги", "n8n Workflows", "AI-фичи", "Маркетинг"] },
      { title: "Компания", links: ["Подход", "Блог", "Сообщество", "Контакты"] },
      { title: "Соцсети", links: ["Aqly+", "Сообщество", "YouTube", "Instagram", "TikTok", "LinkedIn", "X / Twitter"] },
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
