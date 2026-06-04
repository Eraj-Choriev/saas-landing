"use client"

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react"

export type Lang = "ru" | "en" | "tj"

type Dict = typeof en

const en = {
  banner: {
    label: "NEW · 2026 PLAYBOOK",
    text: "How modern teams ship AI in 30 days — not 9 months",
    cta: "Read the guide",
  },
  nav: {
    about: "About",
    services: "Services",
    approach: "Approach",
    pricing: "Pricing",
    contact: "Contact us",
  },
  hero: {
    eyebrow: "AI AGENCY · ENGINEERING-FIRST",
    title: ["Turn AI Into", "Your Unfair", "Advantage."],
    subtitle:
      "Aqly builds custom AI agents, Telegram bots, websites, connected tools and growth systems that save your team 10+ hours per week. From concept to deployment, we handle everything.",
    primary: "Book a consultation",
    secondary: "See our services",
    pill: "Telegram · Web · Automation · RAG · Growth",
    trust: "47 projects · 12 countries · 10+ hours saved weekly",
    tags: [
      { label: "Telegram", href: "#services" },
      { label: "Web", href: "#services" },
      { label: "Automation", href: "#services" },
      { label: "RAG", href: "#services" },
      { label: "Growth", href: "#services" },
    ],
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
        { role: "agent", text: "Hey — great to meet you 👋", card: false },
        { role: "agent", text: "We build AI agents, Telegram bots, websites & connected tools — fully end to end ⚡", card: false },
        { role: "user", text: "Could you build me a Telegram sales bot? 🤖", card: false },
        { role: "agent", text: "Absolutely. Let me put together a quick spec…", card: false },
        { role: "agent", text: "Done — here's your service card:", card: true },
        { role: "user", text: "Looks perfect — let's start 🚀", card: false },
        { role: "agent", text: "On it — booking your kickoff call now ✅", card: false },
      ],
      cardTitle: "Telegram Bot",
      cardBody: "24/7 sales & support agent, wired to your CRM",
      cardTag: "Ready to deploy",
      success: "Request handled · client happy",
      counter: "Today the bot answered %n messages",
      quickReplies: ["How much does it cost?", "What do you do?", "Book a call"],
      replies: {
        price: "It depends on your project and goals. Leave a request — we'll get in touch and scope it with you ⚡",
        services: "We build AI agents, Telegram bots, websites and connected tools — fully end to end 🚀",
        booking: "Of course! Grab a slot here 👉 aqly.io/call",
        fallback: "Great question — easiest to cover it on a quick call. Tap “Book a call” 👇",
      },
    },
  },
  cases: {
    kicker: "CASE STUDIES",
    title: "Results, not promises.",
    lead: "A few systems we've shipped — and the numbers they moved.",
    readCase: "Read case",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    resultLabel: "Result",
    items: [
      {
        client: "Northwind",
        category: "Telegram bot",
        name: "Lead-qualification bot",
        problem: "Losing 40% of inbound leads at the qualification stage.",
        solution: "A Telegram bot wired into the CRM that qualifies and books calls 24/7.",
        results: [
          { value: "3.2×", label: "conversion" },
          { value: "6 wks", label: "to launch" },
          { value: "$120k", label: "ROI / yr" },
        ],
        stack: ["Next.js", "Claude", "Notion", "Stripe"],
      },
      {
        client: "Lumen",
        category: "AI integration",
        name: "Support copilot",
        problem: "Support team buried under repetitive tickets.",
        solution: "A Claude-powered copilot that drafts and resolves tickets inline.",
        results: [
          { value: "71%", label: "auto-resolved" },
          { value: "8 days", label: "to live" },
          { value: "−44%", label: "response time" },
        ],
        stack: ["Python", "Claude", "Zendesk", "Postgres"],
      },
      {
        client: "Voltage",
        category: "Website + growth",
        name: "Website rebuild",
        problem: "A slow, generic site converting under 1%.",
        solution: "A rebuilt Next.js site with funnels instrumented from day one.",
        results: [
          { value: "98", label: "Lighthouse" },
          { value: "2.6×", label: "sign-ups" },
          { value: "5 wks", label: "to launch" },
        ],
        stack: ["Next.js", "Vercel", "GA4", "Figma"],
      },
    ],
  },
  pricing: {
    kicker: "PRICING",
    title: "Simple pricing.",
    titleAccent: "Real impact.",
    lead: "Fixed scope. Fixed price. Production-grade.",
    popular: "MOST POPULAR",
    note: "Prices in TJS (Somoni). 50% prepayment to start. Domain & hosting for Start are billed separately.",
    secure: "No retainers — you pay per project, with a signed contract.",
    learnMore: "Learn more",
    modalOverview: "Overview",
    modalIncludes: "What's included",
    modalTech: "Technologies",
    modalForWhom: "Best for",
    modalCtaTitle: "Ready to start?",
    modalCtaSub: "Free consultation, fixed quote.",
    modalCta: "Discuss your project",
    plans: [
      {
        name: "Start",
        tagline: "Basic landing page",
        price: "1 500 TJS",
        time: "2–3 days",
        cta: "Get started",
        features: [
          "One-page site, up to 5 blocks",
          "Your texts & images integrated",
          "Fully responsive — phone & tablet",
          "1 contact form → Telegram alerts",
          "Tilda / WordPress or clean HTML5",
        ],
        modal: {
          overview:
            "A fast, single-page website to get you online and collecting leads. We build it from the text and images you already have, with a clean structure of up to 5 sections — perfect when you need a presence quickly, without a big budget.",
          forWhom:
            "Best when your content is ready and you want speed. Need a custom design, animations and a domain included? That is the Growth plan.",
          tech: [
            { name: "HTML5 / CSS3", desc: "Hand-coded pages — the lightest and fastest-loading option." },
            { name: "Tilda / WordPress + Elementor", desc: "Visual builders you can edit yourself later, no coding needed." },
            { name: "Telegram notifications", desc: "Every form submission pings your Telegram instantly." },
            { name: "Responsive layout", desc: "Looks right on phones, tablets and desktops automatically." },
          ],
        },
      },
      {
        name: "Growth",
        tagline: "Premium landing page",
        price: "4 500 TJS",
        time: "up to 6 days",
        cta: "Choose Growth",
        features: [
          "Interactive multi-block page (8–10)",
          "Custom conversion-focused UI/UX",
          "Advanced animation & parallax",
          "Domain + hosting included for 1 year",
          "Editing & optimization of your copy",
          "React / Next.js + Tailwind + Framer Motion",
        ],
        modal: {
          overview:
            "A premium, conversion-focused landing page — custom design, 8–10 interactive sections and smooth animations. Domain and hosting are included for a full year, so you launch with everything ready.",
          forWhom:
            "Choose this over Start when you want a unique look, motion and a site engineered to convert — not just to exist.",
          tech: [
            { name: "React / Next.js / Vue", desc: "Modern app frameworks — fast, reliable and future-proof." },
            { name: "Tailwind CSS", desc: "A precise styling system for a sharp, custom design." },
            { name: "Framer Motion / GSAP", desc: "Smooth, professional animations and parallax effects." },
            { name: "Domain + hosting (1 year)", desc: "Registration and reliable hosting included — no extra bills." },
          ],
        },
      },
      {
        name: "Telegram Bots",
        tagline: "Automation & assistants",
        price: "from 2 500 TJS",
        time: "5–6 days",
        cta: "Talk to us",
        features: [
          "FAQ assistant bot with menus",
          "Reply & inline keyboards",
          "Lead capture → admin chat",
          "Python (aiogram) + SQLite on VPS",
          "Add-ons: Mini App / payments / CRM",
        ],
        modal: {
          overview:
            "A support bot that answers your customers' common questions 24/7 and captures their contacts straight to your admin chat. The base bot starts at 2,500 TJS and ships in 5–6 days; richer features are scoped per project.",
          forWhom:
            "Start with the base FAQ + lead-capture bot. Need a shop, payments or CRM sync inside Telegram? Those add-ons are quoted after a short call and take 5–10 days.",
          tech: [
            { name: "Python (aiogram)", desc: "A robust, widely-used framework for stable Telegram bots." },
            { name: "SQLite database", desc: "Stores user sessions and collected contacts reliably." },
            { name: "VPS Linux hosting", desc: "Runs on a dedicated server so the bot is always online." },
            { name: "Add-ons: Mini App / payments / CRM", desc: "Shop & cart inside Telegram, local payments (Alif / Korti Milli), or sync with Bitrix24 / 1C / Google Sheets." },
          ],
        },
      },
      {
        name: "Enterprise",
        tagline: "Custom systems",
        price: "Custom quote",
        time: "",
        cta: "Contact sales",
        features: [
          "Multi-page portals, CRM / ERP",
          "Government & banking API integration",
          "Naming, SMM & website promotion",
          "Next.js / NestJS / FastAPI + Docker",
          "Dedicated delivery team",
        ],
        modal: {
          overview:
            "End-to-end custom systems for serious operations — multi-page portals, internal CRM/ERP and integrations with government and banking APIs. Scope, price and timeline are defined together after a discovery call.",
          forWhom:
            "This is the full package, beyond a website or a bot: complex builds plus go-to-market — brand naming, SMM promotion and website promotion — handled by a dedicated team.",
          tech: [
            { name: "Next.js / Node.js (NestJS) / FastAPI", desc: "Enterprise-grade architecture for large, secure systems." },
            { name: "PostgreSQL / MongoDB", desc: "Powerful databases for serious data volumes." },
            { name: "Docker", desc: "Containerized deployment — scalable and stable." },
            { name: "Naming · SMM · website promotion", desc: "Brand naming and full marketing growth, not just development." },
          ],
        },
      },
    ],
  },
  finalCta: {
    kicker: "READY?",
    title: ["Ready to turn AI into", "your advantage?"],
    sub: "Free consultation. No obligation.",
    button: "Book a call",
    orPrefix: "or email us:",
  },
  stack: {
    title: "Technologies & platforms",
  },
  stats: {
    kicker: "BY THE NUMBERS",
    title: "Proof in the numbers.",
    items: [
      { value: 47, suffix: "+", label: "Projects shipped" },
      { value: 12, suffix: "", label: "Countries served" },
      { value: 10, suffix: "+", label: "Hours saved / week" },
      { value: 30, suffix: "d", label: "Avg. time to launch" },
    ],
  },
  why: {
    kicker: "WHY IT MATTERS",
    title: "Clients go to whoever answers first.",
    lead: "While you think it over, your customer is already messaging a competitor. Here's what a business quietly loses without a site, a bot and automation — and what we do about it.",
    stats: [
      { value: 75, suffix: "%", label: "judge a company's credibility by its website alone", source: "Stanford" },
      { value: 10, suffix: "×", label: "lower odds of closing a lead if you reply later than 5 minutes", source: "HBR" },
      { value: 53, suffix: "%", label: "leave a site that takes longer than 3 seconds to load", source: "Google" },
      { value: 24, suffix: "/7", label: "customers message outside work hours — a bot answers for you", source: "" },
    ],
    cardsTitle: "What we put to work for you",
    cards: [
      { tag: "WEBSITE", title: "A site that sells", body: "Fast, mobile, with a funnel built in — turns a visitor into a lead instead of a bounce." },
      { tag: "TELEGRAM BOT", title: "24/7 assistant bot", body: "Answers questions, collects leads and books clients — even while you sleep." },
      { tag: "AI OUTREACH", title: "AI outreach assistant", body: "Writes, qualifies and warms up clients for your services — on autopilot." },
    ],
    note: "Figures from industry research (Stanford, Google, HBR) — not client claims.",
  },
  faq: {
    kicker: "FAQ",
    title: "Questions, answered.",
    lead: "The real things clients ask us before they start.",
    items: [
      { q: "How much will my project cost, and how do I pay?", a: "A landing page starts at 1 500 TJS, a Telegram bot at 2 500 TJS. After a free call we send a fixed quote — no surprises. Work begins on a 50% prepayment and a signed contract; the rest is due on delivery." },
      { q: "How long will it take?", a: "A landing page is 2–6 days, a Telegram bot 5–10 days depending on features. For larger custom systems we set the timeline together after the discovery call." },
      { q: "I don't have ready text or photos — can you help?", a: "Yes. We can work with whatever you have and write or polish the copy and source visuals as a small add-on. Just tell us on the call and we'll include it in the quote." },
      { q: "What if I don't like the result? How many revisions?", a: "You review the work before launch. The Start plan includes one round of edits; on larger projects we work in stages and refine together until you're happy." },
      { q: "Will the site, bot and data be mine?", a: "Completely. We hand over the code, accounts and access — no lock-in and no monthly rent for the product itself. You stay the owner." },
      { q: "Can you connect payments, a CRM or other tools?", a: "Yes — local payments (Alif Mobi, Korti Milli, Dushanbe City), CRMs and 1C, Google Sheets, and Telegram. We wire the bot or site into the systems you already use." },
      { q: "Do you help with promotion after launch?", a: "We do. Beyond support and maintenance, we offer naming, SMM and website promotion — so you don't just launch, you grow." },
    ],
  },
  build: {
    kicker: "WHAT WE BUILD",
    title: "AI Solutions That Deliver Results",
    learnMore: "Learn more",
    modalCta: "Book a consultation",
    modalCtaTitle: "Ready to build this?",
    modalCtaSub: "Free consultation — no obligation.",
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
        body: "Production-grade websites and dashboards. Performance, SEO and design polished to enterprise standard.",
        details: {
          overview:
            "We design and ship production-grade websites and product dashboards — fast, accessible, search-optimised and pixel-polished to an enterprise standard your brand deserves.",
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
        tag: "AI Voice Assistants",
        title: "AI Voice Assistants",
        body: "A lifelike voice agent embedded right on your site. It picks up every visitor, answers, qualifies and books in real time — so real, callers can't tell it's AI.",
        details: {
          overview:
            "A custom AI voice assistant lives as a widget directly on your website. A visitor clicks it and instantly talks to an agent whose voice is so natural it's indistinguishable from a real person. It answers questions, qualifies the lead, handles objections and books the call — 24/7, on every visitor most sites quietly lose.",
          how: [
            "Visitor clicks the voice widget on your site — no app, no dialing.",
            "The agent greets them in a warm, human-realistic voice.",
            "It understands intent, answers and pulls live data from your stack.",
            "It qualifies, books the meeting or routes to your team — instantly.",
          ],
          features: ["Human-realistic voice", "Embedded site widget", "24/7 instant pickup", "Books & routes calls"],
        },
      },
      {
        tag: "Connected Tools",
        title: "Connected Tools",
        body: "We link your apps into one chain — a lead comes in, it's logged to a sheet, the client gets a message and your team gets a ping. Nobody does it by hand.",
        details: {
          overview:
            "Picture one event kicking off a chain across your apps: an order arrives → it's saved to a sheet → the client gets a message → your manager gets notified. We build these chains, host them and keep them running without a hitch.",
          how: [
            "We look at what you do by hand every day.",
            "We build the chain — one event, your apps do the rest.",
            "We add checks so nothing slips through.",
            "We launch it, watch it and keep improving.",
          ],
          features: ["Multi-step chains", "Connects any apps", "Error protection", "Hosting + monitoring"],
        },
      },
      {
        tag: "AI Integration",
        title: "AI Integration",
        body: "Embed advanced AI across your business and product — automated chat support, content generation and copilots on Claude & GPT-class models that lift revenue and reach more customers.",
        details: {
          overview:
            "We integrate state-of-the-art AI directly into your business and product — not a generic chatbot, but automated chat support, content generation, copilots and decision tools running on the most advanced cloud models (Claude, GPT-class). The result: lower costs, higher conversion and customers reached 24/7.",
          how: [
            "Automated chat support that answers and resolves around the clock.",
            "Content generation — posts, emails and product copy on demand.",
            "Copilots and assistants wired straight into your existing product.",
            "Runs on advanced cloud models (Claude, GPT-class) — secure & scalable.",
          ],
          features: ["Chat support automation", "Content generation", "Claude & GPT-class models", "Revenue & reach uplift"],
        },
      },
      {
        tag: "Design",
        title: "Design",
        body: "Logos, brand identity, website and social-media visuals — a clean, recognisable look that makes your business feel trustworthy.",
        details: {
          overview:
            "Everything visual for your business — logo, brand identity, website and app design, social-media graphics and presentations. We make it look professional and consistent so customers trust you at first glance.",
          how: [
            "We study your business and who your customers are.",
            "Design a logo and a clear brand style — colours and fonts.",
            "Apply it everywhere — site, social media, presentations.",
            "Hand over ready-to-use files and simple guidelines.",
          ],
          features: ["Logo & identity", "Website / UI design", "Social-media visuals", "Brand guidelines"],
        },
      },
    ],
  },
  approach: {
    kicker: "OUR APPROACH",
    title: "From Idea to Impact in 4 Steps",
    stepLabel: "STEP",
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
  about: {
    kicker: "WHO WE ARE",
    title: ["We design,", "build & integrate", "into your business."],
    lead: "Aqly is an agency that designs, builds and integrates products into your business. Integration is the core of what we do: we wire AI, bots and automations into your existing systems — CRM, data and tools — so everything works as one. You talk straight to the team that owns the project from first call to live deployment.",
    values: [
      {
        title: "Speed",
        body: "We ship production AI in ~30 days, not 9 months. Tight loops, weekly demos, no bureaucracy.",
      },
      {
        title: "Engineering-first",
        body: "Real systems wired into your stack — CRM, data and tools. Not a wrapped chatbot demo.",
      },
      {
        title: "Transparency",
        body: "Clear roadmap, clear pricing, clear ROI model. You always know what you're paying for.",
      },
      {
        title: "Partnership",
        body: "We build for the long run — monitoring, optimizing and scaling as you grow, not one-and-done.",
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
        "Free consultation",
        "Response within 30 minutes",
        "No-obligation project scoping",
        "Transparent pricing upfront",
      ],
      email: "Prefer to email directly?",
    },
    progress: "Form Progress",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      phone: { label: "Phone", placeholder: "+992 90 123 45 67" },
      website: { label: "Website URL (optional)", placeholder: "https://yourcompany.com" },
      services: {
        label: "Services of Interest",
        options: ["Telegram Bots", "Websites", "AI Voice Assistants", "Connected Tools", "AI Integration", "Design"],
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
    sending: "Sending…",
    sent: "Sent — we'll reply within 30 min",
    sendError: "Couldn't send — please try again or email us.",
    successTitle: "Your request has been sent",
    successBody: "Thank you! We've received your message and will get back to you within 30 minutes.",
    successTag: "We'll be in touch shortly",
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
        { label: "AI Voice Assistants", href: "#services" },
        { label: "Connected Tools", href: "#services" },
        { label: "AI Integration", href: "#services" },
        { label: "Design", href: "#services" },
      ] },
      { title: "Company", links: [
        { label: "About", href: "#about" },
        { label: "Our Approach", href: "#approach" },
        { label: "Contact", href: "#contact" },
      ] },
    ],
    socialTitle: "Connect",
    social: [
      { label: "Telegram", href: "https://t.me/aqly", icon: "telegram" },
      { label: "WhatsApp", href: "https://wa.me/0000000000", icon: "whatsapp" },
      { label: "Instagram", href: "https://instagram.com/aqly", icon: "instagram" },
      { label: "Facebook", href: "https://facebook.com/aqly", icon: "facebook" },
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
    about: "О нас",
    services: "Услуги",
    approach: "Подход",
    pricing: "Тарифы",
    contact: "Связаться",
  },
  hero: {
    eyebrow: "AI-АГЕНТСТВО · ИНЖЕНЕРНЫЙ ПОДХОД",
    title: ["Превратите AI", "в своё нечестное", "преимущество."],
    subtitle:
      "Aqly строит AI-агентов, Telegram-ботов, сайты, связки программ и системы роста — экономим вашей команде 10+ часов в неделю. От концепта до деплоя — закрываем всё.",
    primary: "Записаться на созвон",
    secondary: "Наши услуги",
    pill: "Telegram · Веб · Связки · RAG · Дизайн",
    trust: "47 проектов · 12 стран · 10+ часов экономии в неделю",
    tags: [
      { label: "Telegram", href: "#services" },
      { label: "Веб", href: "#services" },
      { label: "Связки", href: "#services" },
      { label: "RAG", href: "#services" },
      { label: "Дизайн", href: "#services" },
    ],
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
        { role: "agent", text: "Привет — рад знакомству 👋", card: false },
        { role: "agent", text: "Мы строим AI-агентов, Telegram-ботов, сайты и связки программ — полностью под ключ ⚡", card: false },
        { role: "user", text: "Сможете собрать Telegram-бота для продаж? 🤖", card: false },
        { role: "agent", text: "Конечно. Сейчас набросаю краткую спеку…", card: false },
        { role: "agent", text: "Готово — вот карточка услуги:", card: true },
        { role: "user", text: "Отлично — давайте начнём 🚀", card: false },
        { role: "agent", text: "Принято — записываю вас на стартовый созвон ✅", card: false },
      ],
      cardTitle: "Telegram-бот",
      cardBody: "Агент продаж и поддержки 24/7, подключён к CRM",
      cardTag: "Готов к запуску",
      success: "Заявка оформлена · клиент доволен",
      counter: "Сегодня бот ответил на %n сообщений",
      quickReplies: ["Сколько стоит?", "Что вы делаете?", "Запишите на созвон"],
      replies: {
        price: "Зависит от вашего проекта и задач. Оставьте заявку — мы свяжемся и всё рассчитаем ⚡",
        services: "Строим AI-агентов, Telegram-ботов, сайты и связки программ — полностью под ключ 🚀",
        booking: "Конечно! Выберите слот здесь 👉 aqly.io/call",
        fallback: "Хороший вопрос — проще обсудить на коротком созвоне. Нажмите «Запишите на созвон» 👇",
      },
    },
  },
  cases: {
    kicker: "КЕЙСЫ",
    title: "Результаты, а не обещания.",
    lead: "Несколько систем, которые мы запустили — и цифры, которые они сдвинули.",
    readCase: "Читать кейс",
    problemLabel: "Проблема",
    solutionLabel: "Решение",
    resultLabel: "Результат",
    items: [
      {
        client: "Northwind",
        category: "Telegram-бот",
        name: "Бот квалификации лидов",
        problem: "Теряли 40% входящих лидов на этапе квалификации.",
        solution: "Telegram-бот с интеграцией в CRM — квалифицирует и записывает 24/7.",
        results: [
          { value: "3.2×", label: "конверсия" },
          { value: "6 нед", label: "до запуска" },
          { value: "$120k", label: "ROI / год" },
        ],
        stack: ["Next.js", "Claude", "Notion", "Stripe"],
      },
      {
        client: "Lumen",
        category: "Интеграция AI",
        name: "Копайлот поддержки",
        problem: "Команда поддержки тонула в однотипных тикетах.",
        solution: "Копайлот на Claude, который пишет и закрывает тикеты прямо в интерфейсе.",
        results: [
          { value: "71%", label: "авто-резолв" },
          { value: "8 дней", label: "до запуска" },
          { value: "−44%", label: "время ответа" },
        ],
        stack: ["Python", "Claude", "Zendesk", "Postgres"],
      },
      {
        client: "Voltage",
        category: "Сайт + рост",
        name: "Переделка сайта",
        problem: "Медленный шаблонный сайт с конверсией ниже 1%.",
        solution: "Сайт заново на Next.js с воронками, измеряемыми с первого дня.",
        results: [
          { value: "98", label: "Lighthouse" },
          { value: "2.6×", label: "регистрации" },
          { value: "5 нед", label: "до запуска" },
        ],
        stack: ["Next.js", "Vercel", "GA4", "Figma"],
      },
    ],
  },
  pricing: {
    kicker: "ТАРИФЫ",
    title: "Простые тарифы.",
    titleAccent: "Реальный эффект.",
    lead: "Фиксированный объём. Фиксированная цена. Продакшн-уровень.",
    popular: "ПОПУЛЯРНЫЙ",
    note: "Цены в TJS (Сомони). Предоплата 50%. Домен и хостинг для «Старт» оплачиваются отдельно.",
    secure: "Без абонплаты — оплата за проект по договору.",
    learnMore: "Подробнее",
    modalOverview: "Что это",
    modalIncludes: "Что входит",
    modalTech: "Технологии",
    modalForWhom: "Кому подходит",
    modalCtaTitle: "Готовы начать?",
    modalCtaSub: "Бесплатная консультация, фиксированная смета.",
    modalCta: "Обсудить проект",
    plans: [
      {
        name: "Старт",
        tagline: "Базовый лендинг",
        price: "1 500 TJS",
        time: "2–3 дня",
        cta: "Начать",
        features: [
          "Одностраничный сайт, до 5 блоков",
          "Ваши тексты и изображения",
          "Полная адаптивность — телефон и планшет",
          "1 форма заявки → уведомления в Telegram",
          "Tilda / WordPress или чистый HTML5",
        ],
        modal: {
          overview:
            "Быстрый одностраничный сайт, чтобы выйти в онлайн и собирать заявки. Собираем из ваших готовых текстов и фото, базовая структура до 5 блоков — идеально, когда присутствие нужно быстро и без большого бюджета.",
          forWhom:
            "Подходит, когда контент уже готов и нужна скорость. Нужен индивидуальный дизайн, анимации и домен в комплекте — это тариф «Рост».",
          tech: [
            { name: "HTML5 / CSS3", desc: "Ручная вёрстка — самый лёгкий и быстрый по загрузке вариант." },
            { name: "Tilda / WordPress + Elementor", desc: "Визуальные конструкторы, которые потом можно редактировать самому, без кода." },
            { name: "Уведомления в Telegram", desc: "Каждая заявка мгновенно приходит вам в Telegram." },
            { name: "Адаптивная вёрстка", desc: "Сайт автоматически выглядит правильно на телефоне, планшете и компьютере." },
          ],
        },
      },
      {
        name: "Рост",
        tagline: "Премиальный лендинг",
        price: "4 500 TJS",
        time: "до 6 дней",
        cta: "Выбрать Рост",
        features: [
          "Многоблочная интерактивная страница (8–10)",
          "Индивидуальный UI/UX под конверсию",
          "Сложные анимации и параллакс",
          "Домен и хостинг включены на 1 год",
          "Редактура и оптимизация ваших текстов",
          "React / Next.js + Tailwind + Framer Motion",
        ],
        modal: {
          overview:
            "Премиальный лендинг с упором на конверсию — индивидуальный дизайн, 8–10 интерактивных блоков, плавные анимации. Домен и хостинг включены на целый год, запускаетесь с готовой инфраструктурой.",
          forWhom:
            "Берите вместо «Старта», когда нужен уникальный вид, движение и сайт, спроектированный продавать, а не просто существовать.",
          tech: [
            { name: "React / Next.js / Vue", desc: "Современные фреймворки — быстро, надёжно, на годы вперёд." },
            { name: "Tailwind CSS", desc: "Точная система стилей для острого индивидуального дизайна." },
            { name: "Framer Motion / GSAP", desc: "Плавные профессиональные анимации и параллакс-эффекты." },
            { name: "Домен + хостинг (1 год)", desc: "Регистрация и надёжный хостинг включены — без доп. счетов." },
          ],
        },
      },
      {
        name: "Telegram-боты",
        tagline: "Автоматизация и ассистенты",
        price: "от 2 500 TJS",
        time: "5–6 дней",
        cta: "Обсудить проект",
        features: [
          "Бот-помощник с меню FAQ",
          "Кнопки Reply и Inline",
          "Сбор заявок → чат администратора",
          "Python (aiogram) + SQLite на VPS",
          "Доп.модули: Mini App / оплаты / CRM",
        ],
        modal: {
          overview:
            "Бот-поддержка, который 24/7 отвечает на частые вопросы клиентов и собирает их контакты прямо в ваш чат администратора. Базовый бот — от 2 500 TJS и готов за 5–6 дней; более сложные функции считаются под проект.",
          forWhom:
            "Начните с базового бота: FAQ и сбор заявок. Нужны магазин, оплаты или синхронизация с CRM внутри Telegram? Эти модули считаются после короткого созвона и занимают 5–10 дней.",
          tech: [
            { name: "Python (aiogram)", desc: "Надёжный популярный фреймворк для стабильных Telegram-ботов." },
            { name: "База данных SQLite", desc: "Надёжно хранит сессии пользователей и собранные контакты." },
            { name: "Хостинг VPS Linux", desc: "Работает на выделенном сервере — бот всегда онлайн." },
            { name: "Доп.модули: Mini App / оплаты / CRM", desc: "Магазин и корзина внутри Telegram, локальные оплаты (Alif / Корти Милли) или синхронизация с Bitrix24 / 1С / Google Таблицами." },
          ],
        },
      },
      {
        name: "Энтерпрайз",
        tagline: "Кастомные системы",
        price: "Индивидуально",
        time: "",
        cta: "Связаться с нами",
        features: [
          "Многостраничные порталы, CRM / ERP",
          "Интеграция с гос. и банковскими API",
          "Нейминг, SMM и продвижение сайта",
          "Next.js / NestJS / FastAPI + Docker",
          "Выделенная команда разработки",
        ],
        modal: {
          overview:
            "Кастомные системы под ключ для серьёзных задач — многостраничные порталы, внутренние CRM/ERP и интеграции с государственными и банковскими API. Объём, цену и сроки определяем вместе после созвона.",
          forWhom:
            "Это полный пакет, больше чем сайт или бот: сложная разработка плюс вывод на рынок — нейминг, продвижение в SMM и продвижение сайта — силами выделенной команды.",
          tech: [
            { name: "Next.js / Node.js (NestJS) / FastAPI", desc: "Архитектура корпоративного уровня для больших и защищённых систем." },
            { name: "PostgreSQL / MongoDB", desc: "Мощные базы данных для серьёзных объёмов данных." },
            { name: "Docker", desc: "Контейнеризованное развёртывание — масштабируемо и стабильно." },
            { name: "Нейминг · SMM · продвижение сайта", desc: "Нейминг бренда и полноценный маркетинговый рост, а не только разработка." },
          ],
        },
      },
    ],
  },
  finalCta: {
    kicker: "ГОТОВЫ?",
    title: ["Готовы превратить AI", "в преимущество?"],
    sub: "Бесплатная консультация, без обязательств.",
    button: "Записаться на созвон",
    orPrefix: "или напишите:",
  },
  stack: {
    title: "Технологии и платформы",
  },
  stats: {
    kicker: "В ЦИФРАХ",
    title: "Доказано цифрами.",
    items: [
      { value: 47, suffix: "+", label: "Проектов запущено" },
      { value: 12, suffix: "", label: "Стран" },
      { value: 10, suffix: "+", label: "Часов экономии / нед." },
      { value: 30, suffix: "д", label: "Срок запуска в среднем" },
    ],
  },
  why: {
    kicker: "ПОЧЕМУ ЭТО ВАЖНО",
    title: "Клиенты уходят к тем, кто отвечает первым.",
    lead: "Пока вы думаете, клиент уже пишет конкуренту. Вот что бизнес тихо теряет без сайта, бота и автоматизации — и что мы с этим делаем.",
    stats: [
      { value: 75, suffix: "%", label: "оценивают доверие к компании только по её сайту", source: "Stanford" },
      { value: 10, suffix: "×", label: "во столько ниже шанс закрыть лида, если ответить позже 5 минут", source: "HBR" },
      { value: 53, suffix: "%", label: "уходят, если сайт грузится дольше 3 секунд", source: "Google" },
      { value: 24, suffix: "/7", label: "клиенты пишут вне рабочих часов — бот отвечает за вас", source: "" },
    ],
    cardsTitle: "Что мы включаем в работу за вас",
    cards: [
      { tag: "САЙТ", title: "Сайт, который продаёт", body: "Быстрый, на телефоне, с воронкой — превращает посетителя в заявку, а не в отказ." },
      { tag: "TELEGRAM-БОТ", title: "Бот-ассистент 24/7", body: "Отвечает на вопросы, собирает заявки и записывает клиентов — пока вы спите." },
      { tag: "AI-ОХВАТ", title: "AI-ассистент охвата", body: "Сам пишет, квалифицирует и греет клиентов по вашим услугам — на потоке." },
    ],
    note: "Данные — отраслевые исследования (Stanford, Google, HBR), а не наши заявления.",
  },
  faq: {
    kicker: "ВОПРОСЫ",
    title: "Отвечаем на главное.",
    lead: "Реальные вопросы, которые клиенты задают перед стартом.",
    items: [
      { q: "Сколько будет стоить проект и как оплачивать?", a: "Лендинг — от 1 500 TJS, Telegram-бот — от 2 500 TJS. После бесплатного созвона присылаем фиксированную смету, без сюрпризов. Старт работ — предоплата 50% и договор, остаток — по факту сдачи." },
      { q: "Сколько времени займёт?", a: "Лендинг — 2–6 дней, Telegram-бот — 5–10 дней в зависимости от функций. Для крупных систем сроки определяем вместе на созвоне." },
      { q: "У меня нет готовых текстов и фото — поможете?", a: "Да. Работаем с тем, что есть, а написание и редактуру текстов и подбор изображений добавляем как небольшую доп. услугу. Скажите на созвоне — включим в смету." },
      { q: "Что если мне не понравится результат? Сколько правок?", a: "Вы принимаете работу до запуска. В тариф «Старт» входит один круг правок; на крупных проектах работаем поэтапно и дорабатываем, пока не будет идеально." },
      { q: "Сайт, бот и данные будут моими?", a: "Полностью. Передаём код, аккаунты и все доступы — никакой привязки и абонплаты за сам продукт. Владелец — вы." },
      { q: "Можно подключить оплату, CRM и другие сервисы?", a: "Да — локальные оплаты (Alif Mobi, Корти Милли, Dushanbe City), CRM и 1С, Google Таблицы и Telegram. Подключаем бота или сайт к системам, которыми вы уже пользуетесь." },
      { q: "Помогаете с продвижением после запуска?", a: "Да. Кроме поддержки и сопровождения предлагаем нейминг, SMM и продвижение сайта — чтобы вы не просто запустились, а росли." },
    ],
  },
  build: {
    kicker: "ЧТО МЫ СТРОИМ",
    title: "AI-решения, которые дают результат",
    learnMore: "Подробнее",
    modalCta: "Записаться на созвон",
    modalCtaTitle: "Готовы запустить?",
    modalCtaSub: "Бесплатная консультация, без обязательств.",
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
        tag: "AI-голосовые помощники",
        title: "AI-голосовые помощники",
        body: "Реалистичный голосовой агент прямо на вашем сайте. Встречает каждого посетителя, отвечает, квалифицирует и записывает в реальном времени — голос не отличить от человека.",
        details: {
          overview:
            "Кастомный AI-голосовой помощник живёт виджетом прямо на вашем сайте. Посетитель нажимает — и сразу говорит с агентом, чей голос настолько естественный, что его не отличить от живого человека. Он отвечает на вопросы, квалифицирует лида, отрабатывает возражения и записывает на звонок — 24/7, по каждому посетителю, которого большинство сайтов тихо теряет.",
          how: [
            "Посетитель нажимает голосовой виджет на сайте — без приложений и звонков.",
            "Агент приветствует тёплым, человечным голосом.",
            "Понимает запрос, отвечает и подтягивает данные из вашего стека.",
            "Квалифицирует, записывает встречу или передаёт команде — мгновенно.",
          ],
          features: ["Реалистичный голос", "Виджет на сайте", "Ответ 24/7 мгновенно", "Запись и маршрутизация"],
        },
      },
      {
        tag: "Связка программ",
        title: "Связка программ",
        body: "Соединяем ваши программы в одну цепочку: пришла заявка — она сама попадает в таблицу, клиенту уходит сообщение, а вам — уведомление. Руками никто ничего не делает.",
        details: {
          overview:
            "Представьте: одно событие запускает цепочку действий между вашими программами. Пришёл заказ → записался в таблицу → клиент получил сообщение → менеджер увидел уведомление. Мы собираем такие цепочки, размещаем их и следим, чтобы всё работало без сбоев.",
          how: [
            "Смотрим, что вы каждый день делаете руками.",
            "Собираем цепочку — одно событие, и программы делают всё сами.",
            "Добавляем проверки, чтобы ничего не терялось.",
            "Запускаем, следим и улучшаем.",
          ],
          features: ["Цепочки из нескольких шагов", "Соединяем любые программы", "Защита от ошибок", "Размещение и присмотр"],
        },
      },
      {
        tag: "Интеграция AI",
        title: "Интеграция AI",
        body: "Встраиваем продвинутый AI в ваш бизнес и продукт — автоматическая чат-поддержка, генерация контента и копайлоты на моделях Claude и уровня GPT, которые повышают доход и охватывают больше клиентов.",
        details: {
          overview:
            "Интегрируем передовой AI прямо в ваш бизнес и продукт — не дежурный чат-бот, а автоматическая чат-поддержка, генерация контента, копайлоты и инструменты принятия решений на самых продвинутых клауд-моделях (Claude, уровень GPT). Итог: ниже издержки, выше конверсия, клиенты охвачены 24/7.",
          how: [
            "Автоматическая чат-поддержка — отвечает и закрывает обращения круглосуточно.",
            "Генерация контента — посты, письма и продуктовые тексты по запросу.",
            "Копайлоты и ассистенты, встроенные прямо в ваш продукт.",
            "Работает на продвинутых клауд-моделях (Claude, уровень GPT) — надёжно и масштабируемо.",
          ],
          features: ["Автоматизация чат-поддержки", "Генерация контента", "Модели Claude и уровня GPT", "Рост дохода и охвата"],
        },
      },
      {
        tag: "Дизайн",
        title: "Дизайн",
        body: "Логотипы, фирменный стиль, дизайн сайтов и оформление соцсетей — понятный и узнаваемый образ, которому доверяют.",
        details: {
          overview:
            "Всё визуальное для вашего бизнеса — логотип, фирменный стиль, дизайн сайта и приложения, оформление соцсетей и презентаций. Делаем так, чтобы выглядело профессионально и единообразно, и клиенты доверяли вам с первого взгляда.",
          how: [
            "Изучаем ваш бизнес и кто ваши клиенты.",
            "Рисуем логотип и понятный фирменный стиль — цвета и шрифты.",
            "Применяем его везде — сайт, соцсети, презентации.",
            "Отдаём готовые файлы и простые правила использования.",
          ],
          features: ["Логотип и стиль", "Дизайн сайта / UI", "Оформление соцсетей", "Бренд-гайдлайны"],
        },
      },
    ],
  },
  approach: {
    kicker: "НАШ ПОДХОД",
    title: "От идеи до результата за 4 шага",
    stepLabel: "ШАГ",
    steps: [
      { n: "01", title: "Исследование", body: "Изучаем ваш бизнес изнутри — процессы, боли и цели — чтобы найти AI-возможности с максимальным эффектом.", tag: "ТИПИЧНО: 2-3 СОЗВОНА + АУДИТ" },
      { n: "02", title: "Стратегия", body: "Проектируем решение с роадмапом, таймлайном и ROI-проекцией — вы точно знаете, чего ждать.", tag: "ИТОГ: ТЕХНИЧЕСКАЯ СПЕКА + ROI-МОДЕЛЬ" },
      { n: "03", title: "Разработка", body: "Внедряем и интегрируем AI-решение в текущие инструменты и процессы. Без сбоев, только результат.", tag: "ЕЖЕНЕДЕЛЬНЫЕ ДЕМО + ИТЕРАЦИИ" },
      { n: "04", title: "Поддержка", body: "Оптимизация, мониторинг и масштабирование — AI продолжает работать пока бизнес растёт.", tag: "SLA-ГАРАНТИИ" },
    ],
  },
  about: {
    kicker: "КТО МЫ",
    title: ["Проектируем,", "разрабатываем и", "интегрируем в бизнес."],
    lead: "Aqly — агентство, которое проектирует, разрабатывает и интегрирует продукты в ваш бизнес. Главное для нас — интеграция: подключаем AI, ботов и автоматизации к вашим системам (CRM, данные, сервисы), чтобы всё работало вместе. С вами напрямую общается команда, которая ведёт проект от первого звонка до боевого деплоя.",
    values: [
      {
        title: "Скорость",
        body: "Запускаем рабочий AI за ~30 дней, а не за 9 месяцев. Короткие итерации, еженедельные демо, без бюрократии.",
      },
      {
        title: "Инженерия",
        body: "Реальные системы, вшитые в ваш стек — CRM, данные, сервисы. Не обёрнутая демка-чатбот.",
      },
      {
        title: "Прозрачность",
        body: "Понятный роадмап, понятные цены, понятная модель ROI. Вы всегда знаете, за что платите.",
      },
      {
        title: "Партнёрство",
        body: "Строим вдолгую — мониторинг, оптимизация и масштабирование по мере роста, а не «сдал и забыл».",
      },
    ],
  },
  form: {
    kicker: "СТАРТУЕМ",
    title: "Расскажите о вашем проекте",
    lede: "Поделитесь, что строите — покажем, как AI ускорит это.",
    expect: {
      title: "Что получите",
      items: [
        "Бесплатная консультация",
        "Ответ в течение 30 минут",
        "Оценим проект без обязательств",
        "Прозрачные цены с порога",
      ],
      email: "Хотите написать напрямую?",
    },
    progress: "Прогресс формы",
    fields: {
      name: { label: "Имя", placeholder: "Ваше полное имя" },
      phone: { label: "Телефон", placeholder: "+992 90 123 45 67" },
      website: { label: "Сайт (необязательно)", placeholder: "https://yourcompany.com" },
      services: {
        label: "Интересующие услуги",
        options: ["Telegram-боты", "Веб-сайты", "AI-голосовые помощники", "Связка программ", "Интеграция AI", "Дизайн"],
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
    sending: "Отправляем…",
    sent: "Отправлено — ответим в течение 30 минут",
    sendError: "Не удалось отправить — попробуйте ещё раз или напишите нам.",
    successTitle: "Ваше сообщение отправлено",
    successBody: "Спасибо! Мы получили вашу заявку и ответим вам в течение 30 минут.",
    successTag: "Скоро свяжемся с вами",
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
        { label: "AI-голосовые помощники", href: "#services" },
        { label: "Связка программ", href: "#services" },
        { label: "Интеграция AI", href: "#services" },
        { label: "Дизайн", href: "#services" },
      ] },
      { title: "Компания", links: [
        { label: "О нас", href: "#about" },
        { label: "Подход", href: "#approach" },
        { label: "Контакты", href: "#contact" },
      ] },
    ],
    socialTitle: "Мы в соцсетях",
    social: [
      { label: "Telegram", href: "https://t.me/aqly", icon: "telegram" },
      { label: "WhatsApp", href: "https://wa.me/0000000000", icon: "whatsapp" },
      { label: "Instagram", href: "https://instagram.com/aqly", icon: "instagram" },
      { label: "Facebook", href: "https://facebook.com/aqly", icon: "facebook" },
    ],
    rights: "© 2026 Aqly.io · Все права защищены",
    nav: ["Политика приватности", "Условия"],
  },
}

const tj: Dict = {
  banner: {
    label: "НАВ · ПЛЕЙБУКИ 2026",
    text: "Чӣ тавр дастаҳои муосир AI-ро дар 30 рӯз ба кор меандозанд — на 9 моҳ",
    cta: "Хондани роҳнамо",
  },
  nav: {
    about: "Дар бораи мо",
    services: "Хидматҳо",
    approach: "Равиш",
    pricing: "Тарифҳо",
    contact: "Тамос",
  },
  hero: {
    eyebrow: "AI-АГЕНТӢ · АВВАЛ МУҲАНДИСӢ",
    title: ["AI-ро ба", "бартарии беҳамтои", "худ табдил диҳед."],
    subtitle:
      "Aqly агентҳои фармоишии AI, Telegram-ботҳо, сайтҳо, пайвасти барномаҳо ва системаҳои рушд месозад, ки ба дастаи шумо ҳафтае 10+ соат сарфа мекунад. Аз ғоя то ба кор андохтан — ҳама чизро ба ӯҳда мегирем.",
    primary: "Сабт ба машварат",
    secondary: "Хидматҳои мо",
    pill: "Telegram · Веб · Автоматика · RAG · Рушд",
    trust: "47 лоиҳа · 12 кишвар · ҳафтае 10+ соат сарфа",
    tags: [
      { label: "Telegram", href: "#services" },
      { label: "Веб", href: "#services" },
      { label: "Автоматика", href: "#services" },
      { label: "RAG", href: "#services" },
      { label: "Рушд", href: "#services" },
    ],
    mockTitle: "Aqly Агент",
    mockStatus: "фаъол",
    mockLog: [
      "12 лиди нав ба ICP мувофиқ",
      "Ғанӣ, баҳогузорӣ, ба CRM ҳамоҳанг",
      "Slack #sales огоҳ · 3 вохӯрӣ сабт",
    ],
    mockReq: "То охири рӯз 2 400 дархости баргардониро коркард кун",
    mockMeta: "947 ҳалшуда · 1 453 дар навбат",
    mockBadge: "98% худкор ҳал",
    mockProcessing: "Агент кор истода",
    chat: {
      title: "Aqly Агент",
      status: "онлайн",
      typing: "навишта истода",
      placeholder: "Паём",
      turns: [
        { role: "user", text: "Шумо кадом хидматҳо доред? 🤔", card: false },
        { role: "agent", text: "Салом — аз шиносоӣ шодам 👋", card: false },
        { role: "agent", text: "Мо агентҳои AI, Telegram-ботҳо, сайтҳо ва пайвасти барномаҳо месозем — пурра аз аввал то охир ⚡", card: false },
        { role: "user", text: "Метавонед ба ман боти фурӯши Telegram созед? 🤖", card: false },
        { role: "agent", text: "Албатта. Ҳозир спецификацияи кӯтоҳ омода мекунам…", card: false },
        { role: "agent", text: "Тайёр — ин карти хидмати шумо:", card: true },
        { role: "user", text: "Аъло — биёед оғоз кунем 🚀", card: false },
        { role: "agent", text: "Қабул — ҳозир занги оғозиро сабт мекунам ✅", card: false },
      ],
      cardTitle: "Telegram-бот",
      cardBody: "Агенти фурӯш ва дастгирии 24/7, ба CRM пайваст",
      cardTag: "Барои оғоз тайёр",
      success: "Дархост иҷро шуд · муштарӣ розӣ",
      counter: "Имрӯз бот ба %n паём ҷавоб дод",
      quickReplies: ["Нархаш чанд аст?", "Шумо чӣ кор мекунед?", "Ба занг сабт кунед"],
      replies: {
        price: "Вобаста ба лоиҳа ва вазифаҳои шумо. Дархост гузоред — мо тамос мегирем ва ҳисоб мекунем ⚡",
        services: "Мо агентҳои AI, Telegram-ботҳо, сайтҳо ва пайвасти барномаҳо месозем — пурра аз аввал то охир 🚀",
        booking: "Албатта! Вақтро ин ҷо интихоб кунед 👉 aqly.io/call",
        fallback: "Саволи хуб — беҳтараш дар занги кӯтоҳ муҳокима мекунем. «Ба занг сабт кунед»-ро пахш кунед 👇",
      },
    },
  },
  cases: {
    kicker: "КЕЙСҲО",
    title: "Натиҷаҳо, на ваъдаҳо.",
    lead: "Чанд системае, ки мо ба кор андохтем — ва рақамҳое, ки онҳо тағйир доданд.",
    readCase: "Хондани кейс",
    problemLabel: "Мушкил",
    solutionLabel: "Ҳал",
    resultLabel: "Натиҷа",
    items: [
      {
        client: "Northwind",
        category: "Telegram-бот",
        name: "Боти баҳодиҳии лидҳо",
        problem: "Аз даст додани 40% лидҳои воридотӣ дар марҳилаи баҳодиҳӣ.",
        solution: "Telegram-боти ба CRM пайваст, ки лидҳоро баҳо медиҳад ва 24/7 ба занг сабт мекунад.",
        results: [
          { value: "3.2×", label: "конверсия" },
          { value: "6 ҳафта", label: "то оғоз" },
          { value: "$120k", label: "ROI / сол" },
        ],
        stack: ["Next.js", "Claude", "Notion", "Stripe"],
      },
      {
        client: "Lumen",
        category: "Интегратсияи AI",
        name: "Копайлоти дастгирӣ",
        problem: "Дастаи дастгирӣ зери тикетҳои такрорӣ монда буд.",
        solution: "Копайлот дар асоси Claude, ки тикетҳоро дар ҷо менависад ва ҳал мекунад.",
        results: [
          { value: "71%", label: "худкор ҳал" },
          { value: "8 рӯз", label: "то оғоз" },
          { value: "−44%", label: "вақти ҷавоб" },
        ],
        stack: ["Python", "Claude", "Zendesk", "Postgres"],
      },
      {
        client: "Voltage",
        category: "Сайт + рушд",
        name: "Аз нав сохтани сайт",
        problem: "Сайти суст ва оддӣ бо конверсияи камтар аз 1%.",
        solution: "Сайти аз нав сохташуда дар Next.js бо воронкаҳое, ки аз рӯзи аввал чен мешаванд.",
        results: [
          { value: "98", label: "Lighthouse" },
          { value: "2.6×", label: "бақайдгирӣ" },
          { value: "5 ҳафта", label: "то оғоз" },
        ],
        stack: ["Next.js", "Vercel", "GA4", "Figma"],
      },
    ],
  },
  pricing: {
    kicker: "ТАРИФҲО",
    title: "Тарифҳои оддӣ.",
    titleAccent: "Натиҷаи воқеӣ.",
    lead: "Ҳаҷми муайян. Нархи муайян. Сатҳи продакшн.",
    popular: "МАШҲУР",
    note: "Нархҳо бо TJS (Сомонӣ). Пешпардохт 50%. Домен ва хостинг барои «Оғоз» алоҳида ҳисоб мешаванд.",
    secure: "Бе пардохти моҳона — пардохт барои лоиҳа бо шартнома.",
    learnMore: "Муфассал",
    modalOverview: "Ин чист",
    modalIncludes: "Чӣ дохил аст",
    modalTech: "Технологияҳо",
    modalForWhom: "Барои кӣ мувофиқ",
    modalCtaTitle: "Тайёред оғоз кунед?",
    modalCtaSub: "Машварати ройгон, ҳисоби муайян.",
    modalCta: "Лоиҳаро муҳокима кунем",
    plans: [
      {
        name: "Оғоз",
        tagline: "Лендинги пойа",
        price: "1 500 TJS",
        time: "2–3 рӯз",
        cta: "Оғоз кунед",
        features: [
          "Сайти яксаҳифа, то 5 блок",
          "Матн ва расмҳои шумо",
          "Мутобиқати пурра — телефон ва планшет",
          "1 формаи дархост → огоҳӣ дар Telegram",
          "Tilda / WordPress ё HTML5-и тоза",
        ],
        modal: {
          overview:
            "Сайти зуди яксаҳифа, то ки онлайн шавед ва дархостҳо ҷамъ кунед. Аз матн ва расмҳои тайёри шумо месозем, сохтори пойа то 5 блок — беҳтарин вақте ки ҳузур зуд ва бе буҷети калон лозим аст.",
          forWhom:
            "Мувофиқ вақте ки контент тайёр аст ва суръат лозим. Дизайни инфиродӣ, аниматсия ва домен дар комплект лозим — ин тарифи «Рушд» аст.",
          tech: [
            { name: "HTML5 / CSS3", desc: "Вёрсткаи дастӣ — сабуктарин ва зудтарин дар боркунӣ." },
            { name: "Tilda / WordPress + Elementor", desc: "Конструкторҳои визуалӣ, ки баъдан худатон таҳрир карда метавонед, бе код." },
            { name: "Огоҳӣ дар Telegram", desc: "Ҳар дархост фавран ба Telegram-и шумо меояд." },
            { name: "Вёрсткаи мутобиқ", desc: "Сайт худкор дар телефон, планшет ва компютер дуруст намоиш меёбад." },
          ],
        },
      },
      {
        name: "Рушд",
        tagline: "Лендинги премиалӣ",
        price: "4 500 TJS",
        time: "то 6 рӯз",
        cta: "Рушдро интихоб кунед",
        features: [
          "Саҳифаи бисёрблоки интерактивӣ (8–10)",
          "UI/UX-и инфиродӣ барои конверсия",
          "Аниматсия ва параллакси мураккаб",
          "Домен ва хостинг 1 сол дохил",
          "Таҳрир ва оптимизатсияи матни шумо",
          "React / Next.js + Tailwind + Framer Motion",
        ],
        modal: {
          overview:
            "Лендинги премиалӣ бо таваҷҷӯҳ ба конверсия — дизайни инфиродӣ, 8–10 блоки интерактивӣ, аниматсияҳои ҳамвор. Домен ва хостинг барои як соли пурра дохиланд, бо инфрасохтори тайёр оғоз мекунед.",
          forWhom:
            "Ба ҷои «Оғоз» интихоб кунед, вақте ки намуди беназир, ҳаракат ва сайте лозим аст, ки барои фурӯш сохта шудааст, на танҳо барои мавҷудият.",
          tech: [
            { name: "React / Next.js / Vue", desc: "Фреймворкҳои муосир — зуд, боэътимод, барои солҳои оянда." },
            { name: "Tailwind CSS", desc: "Системаи дақиқи стил барои дизайни тези инфиродӣ." },
            { name: "Framer Motion / GSAP", desc: "Аниматсия ва параллакси ҳамвори касбӣ." },
            { name: "Домен + хостинг (1 сол)", desc: "Бақайдгирӣ ва хостинги боэътимод дохил — бе ҳисобҳои иловагӣ." },
          ],
        },
      },
      {
        name: "Telegram-ботҳо",
        tagline: "Автоматизатсия ва ёрирасонҳо",
        price: "аз 2 500 TJS",
        time: "5–6 рӯз",
        cta: "Лоиҳаро муҳокима кунем",
        features: [
          "Боти ёрирасон бо менюи FAQ",
          "Тугмаҳои Reply ва Inline",
          "Ҷамъоварии дархост → чати админ",
          "Python (aiogram) + SQLite дар VPS",
          "Модулҳо: Mini App / пардохт / CRM",
        ],
        modal: {
          overview:
            "Боти дастгирӣ, ки 24/7 ба саволҳои зуд-зуди мизоҷон ҷавоб медиҳад ва тамосҳои онҳоро рост ба чати админ ҷамъ мекунад. Боти пойа — аз 2 500 TJS ва дар 5–6 рӯз тайёр; функсияҳои мураккабтар вобаста ба лоиҳа ҳисоб мешаванд.",
          forWhom:
            "Аз боти пойа оғоз кунед: FAQ ва ҷамъоварии дархост. Мағоза, пардохт ё синхронизатсия бо CRM дар дохили Telegram лозим? Ин модулҳо пас аз занги кӯтоҳ ҳисоб мешаванд ва 5–10 рӯз мегиранд.",
          tech: [
            { name: "Python (aiogram)", desc: "Фреймворки боэътимод ва маъмул барои ботҳои устувори Telegram." },
            { name: "Базаи додаҳои SQLite", desc: "Сессияҳои корбарон ва тамосҳои ҷамъшударо боэътимод нигоҳ медорад." },
            { name: "Хостинги VPS Linux", desc: "Дар сервери ҷудогона кор мекунад — бот ҳамеша онлайн." },
            { name: "Модулҳо: Mini App / пардохт / CRM", desc: "Мағоза ва сабад дар дохили Telegram, пардохтҳои маҳаллӣ (Alif / Корти Миллӣ) ё синхронизатсия бо Bitrix24 / 1С / Google Sheets." },
          ],
        },
      },
      {
        name: "Энтерпрайз",
        tagline: "Системаҳои фармоишӣ",
        price: "Фармоишӣ",
        time: "",
        cta: "Бо мо тамос гиред",
        features: [
          "Порталҳои бисёрсаҳифа, CRM / ERP",
          "Интегратсия бо API-и давлатӣ ва бонкӣ",
          "Нейминг, SMM ва пешбурди сайт",
          "Next.js / NestJS / FastAPI + Docker",
          "Дастаи ҷудогонаи таҳия",
        ],
        modal: {
          overview:
            "Системаҳои фармоишии калидӣ барои вазифаҳои ҷиддӣ — порталҳои бисёрсаҳифа, CRM/ERP-и дохилӣ ва интегратсия бо API-и давлатӣ ва бонкӣ. Ҳаҷм, нарх ва мӯҳлатро якҷоя пас аз занг муайян мекунем.",
          forWhom:
            "Ин бастаи пурра аст, бештар аз сайт ё бот: таҳияи мураккаб плюс баровардан ба бозор — нейминг, пешбурди SMM ва пешбурди сайт — бо дастаи ҷудогона.",
          tech: [
            { name: "Next.js / Node.js (NestJS) / FastAPI", desc: "Меъмории сатҳи корпоративӣ барои системаҳои калон ва бехатар." },
            { name: "PostgreSQL / MongoDB", desc: "Базаҳои пурқувват барои ҳаҷми ҷиддии додаҳо." },
            { name: "Docker", desc: "Ҷойгиркунии контейнерӣ — миқёспазир ва устувор." },
            { name: "Нейминг · SMM · пешбурди сайт", desc: "Неймингти бренд ва рушди пурраи маркетингӣ, на танҳо таҳия." },
          ],
        },
      },
    ],
  },
  finalCta: {
    kicker: "ТАЙЁРЕД?",
    title: ["Тайёред AI-ро ба", "бартарии худ табдил диҳед?"],
    sub: "Машварати ройгон, бе ӯҳдадорӣ.",
    button: "Ба занг сабт шавед",
    orPrefix: "ё ба мо нависед:",
  },
  stack: {
    title: "Технологияҳо ва платформаҳо",
  },
  stats: {
    kicker: "ДАР РАҚАМҲО",
    title: "Исбот дар рақамҳо.",
    items: [
      { value: 47, suffix: "+", label: "Лоиҳаҳои анҷомшуда" },
      { value: 12, suffix: "", label: "Кишварҳо" },
      { value: 10, suffix: "+", label: "Соат сарфа / ҳафта" },
      { value: 30, suffix: "р", label: "Мӯҳлати миёнаи оғоз" },
    ],
  },
  why: {
    kicker: "ЧАРО ИН МУҲИМ АСТ",
    title: "Мизоҷон ба касе мераванд, ки аввал ҷавоб медиҳад.",
    lead: "То шумо фикр мекунед, мизоҷ аллакай ба рақиб менависад. Ин аст он чизе, ки бизнес бе сайт, бот ва автоматизатсия оҳиста гум мекунад — ва мо чӣ кор мекунем.",
    stats: [
      { value: 75, suffix: "%", label: "эътимоди ширкатро танҳо аз рӯи сайташ баҳо медиҳанд", source: "Stanford" },
      { value: 10, suffix: "×", label: "агар дертар аз 5 дақиқа ҷавоб диҳед, имкони бастани лид ҳамин қадар кам", source: "HBR" },
      { value: 53, suffix: "%", label: "мераванд, агар сайт зиёда аз 3 сония бор шавад", source: "Google" },
      { value: 24, suffix: "/7", label: "мизоҷон берун аз соатҳои корӣ менависанд — бот ҷавоб медиҳад", source: "" },
    ],
    cardsTitle: "Он чи мо барои шумо ба кор медарорем",
    cards: [
      { tag: "САЙТ", title: "Сайте ки мефурӯшад", body: "Зуд, дар телефон, бо воронка — меҳмонро ба дархост табдил медиҳад, на ба рафтан." },
      { tag: "TELEGRAM-БОТ", title: "Боти ёрирасони 24/7", body: "Ба саволҳо ҷавоб медиҳад, дархост ҷамъ мекунад ва мизоҷонро сабт мекунад — ҳатто вақте ки шумо хобед." },
      { tag: "AI-ҶАЛБ", title: "AI-ёрирасони ҷалб", body: "Худаш менависад, тоза мекунад ва мизоҷонро барои хидматҳои шумо гарм мекунад — худкор." },
    ],
    note: "Маълумот — таҳқиқоти соҳавӣ (Stanford, Google, HBR), на изҳороти мо.",
  },
  faq: {
    kicker: "САВОЛҲО",
    title: "Ҷавоб ба саволҳои асосӣ.",
    lead: "Саволҳои воқеӣ, ки мизоҷон пеш аз оғоз медиҳанд.",
    items: [
      { q: "Лоиҳа чанд пул меарзад ва чӣ тавр пардохт мекунам?", a: "Лендинг — аз 1 500 TJS, боти Telegram — аз 2 500 TJS. Пас аз занги ройгон ҳисоби муайян мефиристем, бе ногаҳонӣ. Оғози кор — пешпардохти 50% ва шартнома, бақия — ҳангоми супоридан." },
      { q: "Чӣ қадар вақт мегирад?", a: "Лендинг — 2–6 рӯз, боти Telegram — 5–10 рӯз вобаста ба функсияҳо. Барои системаҳои калон мӯҳлатро якҷоя дар занг муайян мекунем." },
      { q: "Ман матн ва расми тайёр надорам — кӯмак мекунед?", a: "Бале. Бо он чи доред кор мекунем, навиштан ва таҳрири матн ва интихоби расмҳоро ҳамчун хидмати иловагии хурд илова мекунем. Дар занг бигӯед — ба ҳисоб дохил мекунем." },
      { q: "Агар натиҷа ба ман маъқул нашавад? Чанд маротиба ислоҳ?", a: "Шумо корро пеш аз оғоз қабул мекунед. Ба тарифи «Оғоз» як даври ислоҳ дохил аст; дар лоиҳаҳои калон марҳила ба марҳила кор карда, то идеал такмил медиҳем." },
      { q: "Сайт, бот ва маълумот аз они ман мешаванд?", a: "Пурра. Код, аккаунтҳо ва ҳамаи дастрасиҳоро месупорем — ҳеҷ вобастагӣ ва пардохти моҳона барои худи маҳсулот нест. Соҳиб шумоед." },
      { q: "Пардохт, CRM ва дигар хидматҳоро пайваст кардан мумкин аст?", a: "Бале — пардохтҳои маҳаллӣ (Alif Mobi, Корти Миллӣ, Dushanbe City), CRM ва 1С, Google Sheets ва Telegram. Бот ё сайтро ба системаҳое, ки аллакай истифода мебаред, пайваст мекунем." },
      { q: "Пас аз оғоз бо пешбурд кӯмак мекунед?", a: "Бале. Ғайр аз дастгирӣ нейминг, SMM ва пешбурди сайтро пешниҳод мекунем — то на танҳо оғоз кунед, балки рушд кунед." },
    ],
  },
  build: {
    kicker: "МО ЧӢ МЕСОЗЕМ",
    title: "Ҳалли AI, ки натиҷа медиҳад",
    learnMore: "Муфассал",
    modalCta: "Сабт ба машварат",
    modalCtaTitle: "Тайёред инро созед?",
    modalCtaSub: "Машварати ройгон — бе ӯҳдадорӣ.",
    modalHow: "Чӣ тавр кор мекунад",
    modalIncludes: "Чӣ дохил мешавад",
    items: [
      {
        tag: "Telegram-ботҳо",
        title: "Telegram-ботҳо",
        body: "Агентҳои муколамавӣ, ки лидҳоро баҳо медиҳанд, мефурӯшанд, ҷалб мекунанд ва дастгирӣ мекунанд — мустақиман дар Telegram. Ба CRM ва пардохтҳои шумо пайваст.",
        details: {
          overview:
            "Telegram-бот як агенти муколамавии ҳамеша фаъол аст, ки дар барномае зиндагӣ мекунад, ки муштариёни шумо аллакай ҳар рӯз истифода мебаранд. Ӯ забони табииро мефаҳмад, контекстро дар хотир мегирад ва метавонад бифурӯшад, ҷалб кунад, дастгирӣ кунад ва пардохтҳоро қабул кунад — бе иштироки инсон.",
          how: [
            "Корбар ба бот менависад — ӯ ниятро ба забони оддӣ мефаҳмад.",
            "Контекстро аз CRM, ҳуҷҷатҳо ва системаи пардохт мегирад.",
            "Ҷавоб медиҳад, сабт мекунад, мефурӯшад ё ҳангоми зарурат ба инсон мегузаронад.",
            "Ҳар муколама дар як дашборд сабт ва баҳогузорӣ мешавад.",
          ],
          features: ["CRM + пардохтҳо", "Бисёрзабонӣ", "Гузариш ба инсон", "Таҳлили зинда"],
        },
      },
      {
        tag: "Сайтҳо",
        title: "Сайтҳо",
        body: "Сайтҳо ва дашбордҳои сатҳи production. Маҳсулнокӣ, SEO ва дизайн то стандарти enterprise сайқалёфта.",
        details: {
          overview:
            "Мо сайтҳо ва дашбордҳои маҳсулоти сатҳи production тарроҳӣ ва ба кор медарорем — тез, дастрас, барои ҷустуҷӯ оптимизатсияшуда ва то пиксел сайқалёфта дар сатҳи enterprise, ки бренди шумо сазовори он аст.",
          how: [
            "Мавқеъ, аудитория ва ҳадафҳои конверсияи шуморо муайян мекунем.",
            "Системаи фарқкунанда тарроҳӣ мекунем — шрифт, ранг, ҳаракат, тарҳ.",
            "Дар стеки муосир (Next.js) бо холҳои Lighthouse 90+ месозем.",
            "Ба кор меандозем, чен мекунем ва такмил медиҳем — таҳлил аз рӯзи аввал пайваст.",
          ],
          features: ["Next.js + edge-ҳостинг", "SEO + Core Web Vitals", "Тайёр барои CMS", "Таҳлили дарунсохт"],
        },
      },
      {
        tag: "Ёрдамчиёни овозии AI",
        title: "Ёрдамчиёни овозии AI",
        body: "Агенти овозии ба инсон монанд, ки рост дар сайти шумо ҷойгир аст. Ҳар меҳмонро мегирад, ҷавоб медиҳад, баҳо медиҳад ва дар вақти воқеӣ сабт мекунад — он қадар воқеӣ, ки занадагон намефаҳманд, ки ин AI аст.",
        details: {
          overview:
            "Ёрдамчии овозии фармоишии AI ҳамчун виҷет рост дар сайти шумо зиндагӣ мекунад. Меҳмон онро пахш мекунад ва дарҳол бо агенте сӯҳбат мекунад, ки овозаш он қадар табиист, ки аз инсони воқеӣ фарқ намекунад. Ӯ ба саволҳо ҷавоб медиҳад, лидро баҳо медиҳад, эътирозҳоро бартараф мекунад ва ба занг сабт мекунад — 24/7, барои ҳар меҳмоне, ки аксари сайтҳо ором аз даст медиҳанд.",
          how: [
            "Меҳмон виҷети овозиро дар сайт пахш мекунад — бе барнома, бе занг задан.",
            "Агент ӯро бо овози гарм ва ба инсон монанд пешвоз мегирад.",
            "Ниятро мефаҳмад, ҷавоб медиҳад ва маълумоти зиндаро аз стеки шумо мегирад.",
            "Баҳо медиҳад, вохӯриро сабт мекунад ё ба дастаи шумо мегузаронад — дарҳол.",
          ],
          features: ["Овози ба инсон монанд", "Виҷети сайт", "Ҷавоби фаврии 24/7", "Сабт ва тақсими зангҳо"],
        },
      },
      {
        tag: "Пайвасти барномаҳо",
        title: "Пайвасти барномаҳо",
        body: "Мо барномаҳои шуморо ба як занҷир мепайвандем: лид меояд, ба ҷадвал сабт мешавад, ба муштарӣ паём меравад ва дастаи шумо огоҳ мешавад. Касе инро бо даст намекунад.",
        details: {
          overview:
            "Тасаввур кунед: як рӯйдод дар барномаҳои шумо занҷирро оғоз мекунад — фармоиш меояд → ба ҷадвал сабт мешавад → муштарӣ паём мегирад → менеҷери шумо огоҳ мешавад. Мо чунин занҷирҳоро месозем, ҷойгир мекунем ва бе халал нигоҳ медорем.",
          how: [
            "Менигарем, ки шумо ҳар рӯз чиро бо даст мекунед.",
            "Занҷирро месозем — як рӯйдод, боқиро барномаҳои шумо мекунанд.",
            "Санҷишҳо илова мекунем, то ҳеҷ чиз гум нашавад.",
            "Ба кор меандозем, назорат мекунем ва такмил медиҳем.",
          ],
          features: ["Занҷирҳои бисёрзина", "Пайванди ҳар барнома", "Ҳифз аз хатоҳо", "Ҷойгиркунӣ + назорат"],
        },
      },
      {
        tag: "Интегратсияи AI",
        title: "Интегратсияи AI",
        body: "AI-и пешрафтаро ба тиҷорат ва маҳсулоти худ ворид кунед — дастгирии чати худкор, тавлиди контент ва копайлотҳо дар моделҳои Claude ва сатҳи GPT, ки даромадро баланд мебардоранд ва муштариёни бештарро фаро мегиранд.",
        details: {
          overview:
            "Мо AI-и пешсафро рост ба тиҷорат ва маҳсулоти шумо муттаҳид мекунем — на чатботи оддӣ, балки дастгирии чати худкор, тавлиди контент, копайлотҳо ва воситаҳои қарорбарорӣ дар пешрафтатарин моделҳои абрӣ (Claude, сатҳи GPT). Натиҷа: хароҷоти камтар, конверсияи баландтар ва муштариён 24/7 фарогирифташуда.",
          how: [
            "Дастгирии чати худкор, ки шабонарӯзӣ ҷавоб медиҳад ва ҳал мекунад.",
            "Тавлиди контент — пост, мактуб ва матни маҳсулот аз рӯи дархост.",
            "Копайлотҳо ва ёрдамчиён рост ба маҳсулоти мавҷудаи шумо пайваст.",
            "Дар моделҳои пешрафтаи абрӣ (Claude, сатҳи GPT) кор мекунад — бехатар ва миқёспазир.",
          ],
          features: ["Худкоркунии дастгирии чат", "Тавлиди контент", "Моделҳои Claude ва сатҳи GPT", "Афзоиши даромад ва фарогирӣ"],
        },
      },
      {
        tag: "Дизайн",
        title: "Дизайн",
        body: "Логотип, услуби фирмавӣ, дизайни сайт ва оформлении шабакаҳои иҷтимоӣ — намуди фаҳмо ва шинохташаванда, ки ба он бовар мекунанд.",
        details: {
          overview:
            "Ҳама чизи намоёни бизнеси шумо — логотип, услуби фирмавӣ, дизайни сайт ва замима, оформлении шабакаҳои иҷтимоӣ ва презентатсияҳо. Тавре месозем, ки касбӣ ва якхела намоён шавад ва муштариён аз нигоҳи аввал ба шумо бовар кунанд.",
          how: [
            "Бизнеси шумо ва муштариёнатонро меомӯзем.",
            "Логотип ва услуби фаҳмои фирмавӣ — рангҳо ва шрифтҳо — мекашем.",
            "Онро дар ҳама ҷо татбиқ мекунем — сайт, шабакаҳо, презентатсия.",
            "Файлҳои тайёр ва қоидаҳои оддии истифодаро месупорем.",
          ],
          features: ["Логотип ва услуб", "Дизайни сайт / UI", "Оформлении шабакаҳо", "Бренд-гайдлайн"],
        },
      },
    ],
  },
  approach: {
    kicker: "РАВИШИ МО",
    title: "Аз ғоя то натиҷа дар 4 қадам",
    stepLabel: "ҚАДАМ",
    steps: [
      {
        n: "01",
        title: "Омӯзиш",
        body: "Тиҷорати шуморо аз дарун меомӯзем — равандҳо, мушкилот ва ҳадафҳоро — то имкониятҳои AI-и бонатиҷатаринро ёбем.",
        tag: "ОДАТАН: 2-3 ЗАНГ + АУДИТИ ASYNC",
      },
      {
        n: "02",
        title: "Стратегия",
        body: "Ҳалли дурустро бо роҳнамои равшан, ҷадвали вақт ва пешбинии ROI тарроҳӣ мекунем, то шумо дақиқ донед, чиро интизор шавед.",
        tag: "НАТИҶА: СПЕЦИФИКАТСИЯИ ТЕХНИКӢ + МОДЕЛИ ROI",
      },
      {
        n: "03",
        title: "Сохтан",
        body: "Ҳалли AI-и шуморо бо воситаҳо ва равандҳои мавҷуда татбиқ ва муттаҳид мекунем. Бе халал, танҳо натиҷа.",
        tag: "ДЕМОИ ҲАФТАГӢ + ТАҲВИЛИ ЗИНА БА ЗИНА",
      },
      {
        n: "04",
        title: "Дастгирӣ",
        body: "Оптимизатсия, назорат ва миқёскунии доимӣ, то AI-и шумо ҳамзамон бо рушди тиҷорат натиҷа диҳад.",
        tag: "ВАҚТИ ҶАВОБИ КАФОЛАТНОКИ SLA",
      },
    ],
  },
  about: {
    kicker: "МО КӢ ҲАСТЕМ",
    title: ["Тарроҳӣ,", "таҳия ва", "интегратсия ба бизнес."],
    lead: "Aqly агентиест, ки маҳсулотҳоро тарроҳӣ, таҳия ва ба бизнеси шумо интегратсия мекунад. Барои мо асосаш интегратсия аст: AI, ботҳо ва автоматизатсияҳоро ба системаҳои мавҷудаи шумо (CRM, маълумот, хидматҳо) пайваст мекунем, то ҳама якҷоя кор кунад. Шумо рост бо дастае сӯҳбат мекунед, ки лоиҳаро аз занги аввал то ба кор андохтан пеш мебарад.",
    values: [
      {
        title: "Суръат",
        body: "AI-и тайёрро дар ~30 рӯз ба кор меандозем, на 9 моҳ. Давраҳои кӯтоҳ, демои ҳафтагӣ, бе бюрократия.",
      },
      {
        title: "Аввал муҳандисӣ",
        body: "Системаҳои воқеӣ, ба стеки шумо пайваст — CRM, маълумот, хидматҳо. На демои чатботи печонидашуда.",
      },
      {
        title: "Шаффофият",
        body: "Роҳнамои равшан, нархи равшан, модели равшани ROI. Шумо ҳамеша медонед, ки барои чӣ пул медиҳед.",
      },
      {
        title: "Шарикӣ",
        body: "Мо барои дарозмуддат месозем — назорат, оптимизатсия ва миқёскунӣ ҳамзамон бо рушди шумо, на «сохтему фаромӯш кардем».",
      },
    ],
  },
  form: {
    kicker: "ОҒОЗ",
    title: "Дар бораи лоиҳаи шумо сӯҳбат кунем",
    lede: "Бигӯед, чӣ месозед — нишон медиҳем, ки AI чӣ тавр онро суръат мебахшад.",
    expect: {
      title: "Чиро интизор шавед",
      items: [
        "Машварати ройгон",
        "Ҷавоб дар давоми 30 дақиқа",
        "Баҳодиҳии лоиҳа бе ӯҳдадорӣ",
        "Нархи шаффоф аз аввал",
      ],
      email: "Мехоҳед рост нависед?",
    },
    progress: "Пешрафти форма",
    fields: {
      name: { label: "Ном", placeholder: "Номи пурраи шумо" },
      phone: { label: "Телефон", placeholder: "+992 90 123 45 67" },
      website: { label: "Суроғаи сайт (ихтиёрӣ)", placeholder: "https://yourcompany.com" },
      services: {
        label: "Хидматҳои мавриди таваҷҷӯҳ",
        options: ["Telegram-ботҳо", "Сайтҳо", "Ёрдамчиёни овозии AI", "Пайвасти барномаҳо", "Интегратсияи AI", "Дизайн"],
      },
      timeline: {
        label: "Мӯҳлати лоиҳа",
        options: ["Ҳарчи зудтар", "1-3 моҳ", "3-6 моҳ", "Меомӯзам"],
      },
      challenge: {
        label: "Мушкили асосии тиҷорат",
        placeholder: "Дар бораи мушкили асосие, ки ҳал кардан мехоҳед, нависед...",
      },
      budget: {
        label: "Буҷети тахминӣ",
        options: ["То $5k", "$5k - $15k", "$15k - $30k", "$30k+"],
      },
    },
    submit: "Ба машварати ройгон сабт шавед",
    sending: "Фиристода истодааст…",
    sent: "Фиристода шуд — дар давоми 30 дақиқа ҷавоб медиҳем",
    sendError: "Фиристода нашуд — лутфан боз кӯшиш кунед ё ба мо нависед.",
    successTitle: "Дархости шумо фиристода шуд",
    successBody: "Ташаккур! Паёми шуморо гирифтем ва дар давоми 30 дақиқа ҷавоб медиҳем.",
    successTag: "Ба зудӣ дар тамос мешавем",
    errorHint: "Аввал майдонҳои ҷудошударо пур кунед.",
    required: "Ин майдон ҳатмист",
  },
  footer: {
    tagline: "Ҳалли фармоишии AI, ки ба тиҷорати шумо ҳафтае 10+ соат сарфа мекунад.",
    email: "hello@aqly.io",
    cols: [
      { title: "Хидматҳо", links: [
        { label: "Telegram-ботҳо", href: "#services" },
        { label: "Сайтҳо", href: "#services" },
        { label: "Ёрдамчиёни овозии AI", href: "#services" },
        { label: "Пайвасти барномаҳо", href: "#services" },
        { label: "Интегратсияи AI", href: "#services" },
        { label: "Дизайн", href: "#services" },
      ] },
      { title: "Ширкат", links: [
        { label: "Дар бораи мо", href: "#about" },
        { label: "Равиши мо", href: "#approach" },
        { label: "Тамос", href: "#contact" },
      ] },
    ],
    socialTitle: "Дар шабакаҳо",
    social: [
      { label: "Telegram", href: "https://t.me/aqly", icon: "telegram" },
      { label: "WhatsApp", href: "https://wa.me/0000000000", icon: "whatsapp" },
      { label: "Instagram", href: "https://instagram.com/aqly", icon: "instagram" },
      { label: "Facebook", href: "https://facebook.com/aqly", icon: "facebook" },
    ],
    rights: "© 2026 Aqly.io · Ҳамаи ҳуқуқҳо ҳифз шудаанд",
    nav: ["Сиёсати махфият", "Шартҳои хидмат"],
  },
}

const dicts = { en, ru, tj }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict }
const I18nCtx = createContext<Ctx>({ lang: "ru", setLang: () => {}, t: ru })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru")
  const [pulse, setPulse] = useState(false)
  const langRef = useRef(lang)
  langRef.current = lang

  // Switching language gives the content a brief opacity dip, masking the
  // instant text swap so it reads as a graceful settle rather than a flicker.
  // Opacity only (no filter/transform) — those would re-contain the fixed navbar.
  const setLang = useCallback((l: Lang) => {
    if (l === langRef.current) return
    setPulse(true)
    setLangState(l)
  }, [])

  useEffect(() => {
    if (!pulse) return
    const id = setTimeout(() => setPulse(false), 150)
    return () => clearTimeout(id)
  }, [pulse, lang])

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>
      <div className="lang-pulse" data-pulse={pulse ? "" : undefined}>
        {children}
      </div>
    </I18nCtx.Provider>
  )
}

export const useI18n = () => useContext(I18nCtx)
