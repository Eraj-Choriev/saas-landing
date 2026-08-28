"use client"

import { useLang } from "@/lib/lang"

/**
 * Shell copy for the Reading trainer. Exam content — passages, prompts,
 * choices, explanations — stays in English, because the test itself is in
 * English and practising in translation would not prepare anyone for it.
 * Everything the learner needs to *navigate* is localized.
 */
export interface ToeflStrings {
  brand: string
  tagline: string
  nav: { overview: string; practice: string; answers: string }

  home: {
    eyebrow: string
    title: string
    lede: string
    startTest: string
    browseSets: string
    sourceNote: string
    demoCaption: string
    statQuestions: string
    statAnswered: string
    statAccuracy: string
    statSets: string
    resume: string
    resumeAction: string
    examsTitle: string
    examsLede: string
    sectionOrder: string
    minutes: string
    questions: string
    setsWord: string
    open: string
    done: string
    bestScore: string
    notStarted: string
    reset: string
    resetConfirm: string
  }

  sectionBlurb: Record<"complete-the-words" | "daily-life" | "academic", string>

  exam: {
    review: string
    back: string
    next: string
    continue: string
    markForReview: string
    marked: string
    exit: string
    exitConfirm: string
    finish: string
    finishConfirm: string
    hideTime: string
    showTime: string
    remaining: string
    elapsed: string
    questionOf: string
    reviewTitle: string
    reviewLede: string
    statusAnswered: string
    statusUnanswered: string
    statusMarked: string
    returnToQuestion: string
    goToFirstUnanswered: string
    timeUp: string
    typeLetters: string
    blankOf: string
  }

  results: {
    title: string
    retake: string
    backHome: string
    reviewAnswers: string
    correct: string
    incorrect: string
    skipped: string
    yourAnswer: string
    correctAnswer: string
    noAnswer: string
    explanation: string
    scoreLabel: string
    timeLabel: string
    breakdown: string
    perfect: string
    strong: string
    keepGoing: string
  }

  answers: {
    title: string
    lede: string
    filterAll: string
    search: string
    noMatches: string
    show: string
    hide: string
  }
}

const en: ToeflStrings = {
  brand: "Passage",
  tagline: "TOEFL® Reading trainer",
  nav: { overview: "Overview", practice: "Practice", answers: "Answer key" },
  home: {
    eyebrow: "TOEFL iBT® Reading",
    title: "Practise every question type, on the clock.",
    lede: "159 questions across the three passage types you meet on test day, in an interface built to match the real thing. Every answer comes with the explanation.",
    startTest: "Start a full test",
    browseSets: "Browse sets",
    sourceNote:
      "Questions from 100 Practice Questions for the TOEFL® Reading Section by TST Prep. TOEFL® is a registered trademark of ETS. This trainer is not endorsed by ETS.",
    demoCaption: "Complete the Words — question 1",
    statQuestions: "Questions",
    statAnswered: "Answered",
    statAccuracy: "Accuracy",
    statSets: "Sets finished",
    resume: "Pick up where you left off",
    resumeAction: "Resume",
    examsTitle: "Full tests",
    examsLede: "One set of each passage type, one clock — the shape of the real section.",
    sectionOrder: "Section",
    minutes: "min",
    questions: "questions",
    setsWord: "sets",
    open: "Open",
    done: "Done",
    bestScore: "Best",
    notStarted: "Not started",
    reset: "Clear all progress",
    resetConfirm: "Clear every saved answer and score? This cannot be undone.",
  },
  sectionBlurb: {
    "complete-the-words":
      "Ten short paragraphs with letters removed. Type what belongs in each gap — the test rewards reading speed, not guessing.",
    "daily-life":
      "Emails, announcements, and group chats of the kind universities and workplaces actually send. Purpose, detail, and inference questions.",
    academic:
      "Three-paragraph passages with the full academic question set: vocabulary, rhetorical purpose, insert text, and sentence selection.",
  },
  exam: {
    review: "Review",
    back: "Back",
    next: "Next",
    continue: "Continue",
    markForReview: "Mark for review",
    marked: "Marked",
    exit: "Exit",
    exitConfirm: "Leave this test? Your answers so far are saved.",
    finish: "Finish",
    finishConfirm: "Submit this test and see your score?",
    hideTime: "Hide time",
    showTime: "Show time",
    remaining: "Remaining",
    elapsed: "Elapsed",
    questionOf: "Question {n} of {total}",
    reviewTitle: "Review your answers",
    reviewLede: "Select a question to return to it.",
    statusAnswered: "Answered",
    statusUnanswered: "Not answered",
    statusMarked: "Marked",
    returnToQuestion: "Return to question",
    goToFirstUnanswered: "Go to first unanswered",
    timeUp: "Time is up. Your answers have been submitted.",
    typeLetters: "Type the missing letters",
    blankOf: "Blank {n} of {total}",
  },
  results: {
    title: "Your score",
    retake: "Take it again",
    backHome: "Back to overview",
    reviewAnswers: "Review every question",
    correct: "Correct",
    incorrect: "Incorrect",
    skipped: "Skipped",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer",
    noAnswer: "You left this blank",
    explanation: "Why",
    scoreLabel: "Score",
    timeLabel: "Time",
    breakdown: "Question by question",
    perfect: "Every question right. Move to a harder set.",
    strong: "Solid. Read the explanations for the ones you missed.",
    keepGoing: "Work through the explanations below, then take this set again.",
  },
  answers: {
    title: "Answer key",
    lede: "Every question, its answer, and the reasoning — searchable.",
    filterAll: "All sections",
    search: "Search questions and explanations",
    noMatches: "Nothing matches that search.",
    show: "Show explanation",
    hide: "Hide explanation",
  },
}

const ru: ToeflStrings = {
  brand: "Passage",
  tagline: "Тренажёр TOEFL® Reading",
  nav: { overview: "Обзор", practice: "Практика", answers: "Ответы" },
  home: {
    eyebrow: "TOEFL iBT® Reading",
    title: "Отрабатывайте каждый тип заданий — на время.",
    lede: "159 вопросов по трём типам текстов, которые встретятся на экзамене, в интерфейсе, повторяющем настоящий. К каждому ответу есть разбор.",
    startTest: "Начать полный тест",
    browseSets: "Все наборы",
    sourceNote:
      "Вопросы из книги 100 Practice Questions for the TOEFL® Reading Section (TST Prep). TOEFL® — зарегистрированный товарный знак ETS. Тренажёр не одобрен ETS.",
    demoCaption: "Complete the Words — вопрос 1",
    statQuestions: "Вопросов",
    statAnswered: "Отвечено",
    statAccuracy: "Точность",
    statSets: "Наборов пройдено",
    resume: "Продолжить с того же места",
    resumeAction: "Продолжить",
    examsTitle: "Полные тесты",
    examsLede: "По одному тексту каждого типа и один таймер — как на настоящем экзамене.",
    sectionOrder: "Раздел",
    minutes: "мин",
    questions: "вопросов",
    setsWord: "наборов",
    open: "Открыть",
    done: "Пройдено",
    bestScore: "Лучший",
    notStarted: "Не начато",
    reset: "Сбросить прогресс",
    resetConfirm: "Удалить все сохранённые ответы и результаты? Отменить будет нельзя.",
  },
  sectionBlurb: {
    "complete-the-words":
      "Десять коротких абзацев с пропущенными буквами. Впишите недостающее — здесь важна скорость чтения, а не угадывание.",
    "daily-life":
      "Письма, объявления и рабочие чаты — такие же, как в университете и офисе. Вопросы на цель, детали и выводы.",
    academic:
      "Тексты из трёх абзацев и полный набор академических вопросов: лексика, цель автора, вставка предложения, выбор предложения.",
  },
  exam: {
    review: "Обзор",
    back: "Назад",
    next: "Далее",
    continue: "Продолжить",
    markForReview: "Отметить",
    marked: "Отмечено",
    exit: "Выйти",
    exitConfirm: "Выйти из теста? Ответы сохранятся.",
    finish: "Завершить",
    finishConfirm: "Отправить тест и посмотреть результат?",
    hideTime: "Скрыть время",
    showTime: "Показать время",
    remaining: "Осталось",
    elapsed: "Прошло",
    questionOf: "Вопрос {n} из {total}",
    reviewTitle: "Проверьте ответы",
    reviewLede: "Выберите вопрос, чтобы вернуться к нему.",
    statusAnswered: "Отвечено",
    statusUnanswered: "Без ответа",
    statusMarked: "Отмечено",
    returnToQuestion: "Вернуться к вопросу",
    goToFirstUnanswered: "К первому без ответа",
    timeUp: "Время вышло. Ответы отправлены.",
    typeLetters: "Впишите недостающие буквы",
    blankOf: "Пропуск {n} из {total}",
  },
  results: {
    title: "Результат",
    retake: "Пройти заново",
    backHome: "К обзору",
    reviewAnswers: "Разобрать все вопросы",
    correct: "Верно",
    incorrect: "Неверно",
    skipped: "Пропущено",
    yourAnswer: "Ваш ответ",
    correctAnswer: "Правильный ответ",
    noAnswer: "Вы не ответили",
    explanation: "Почему",
    scoreLabel: "Балл",
    timeLabel: "Время",
    breakdown: "Разбор по вопросам",
    perfect: "Всё верно. Берите набор посложнее.",
    strong: "Хорошо. Прочитайте разборы там, где ошиблись.",
    keepGoing: "Разберите объяснения ниже и пройдите набор ещё раз.",
  },
  answers: {
    title: "Ключ с ответами",
    lede: "Все вопросы, ответы и разборы — с поиском.",
    filterAll: "Все разделы",
    search: "Поиск по вопросам и разборам",
    noMatches: "Ничего не найдено.",
    show: "Показать разбор",
    hide: "Скрыть разбор",
  },
}

const tj: ToeflStrings = {
  brand: "Passage",
  tagline: "Тренажёри TOEFL® Reading",
  nav: { overview: "Шарҳи умумӣ", practice: "Машқ", answers: "Ҷавобҳо" },
  home: {
    eyebrow: "TOEFL iBT® Reading",
    title: "Ҳар навъи саволро бо вақт машқ кунед.",
    lede: "159 савол аз рӯи се навъи матне, ки дар рӯзи имтиҳон вомехӯред, дар интерфейси ба аслӣ монанд. Ба ҳар ҷавоб шарҳ ҳаст.",
    startTest: "Оғози тести пурра",
    browseSets: "Ҳамаи маҷмӯаҳо",
    sourceNote:
      "Саволҳо аз китоби 100 Practice Questions for the TOEFL® Reading Section (TST Prep). TOEFL® тамғаи молии сабтшудаи ETS аст. Ин тренажёр аз ҷониби ETS тасдиқ нашудааст.",
    demoCaption: "Complete the Words — саволи 1",
    statQuestions: "Саволҳо",
    statAnswered: "Ҷавоб дода шуд",
    statAccuracy: "Дақиқӣ",
    statSets: "Маҷмӯаҳои иҷрошуда",
    resume: "Аз ҷои қатъшуда давом диҳед",
    resumeAction: "Давом додан",
    examsTitle: "Тестҳои пурра",
    examsLede: "Аз ҳар навъи матн як дона ва як соат — чун дар имтиҳони аслӣ.",
    sectionOrder: "Бахш",
    minutes: "дақ",
    questions: "савол",
    setsWord: "маҷмӯа",
    open: "Кушодан",
    done: "Иҷрошуда",
    bestScore: "Беҳтарин",
    notStarted: "Оғоз нашуда",
    reset: "Пок кардани пешрафт",
    resetConfirm: "Ҳамаи ҷавобҳо ва натиҷаҳои захирашуда нест карда шаванд? Барқарор кардан мумкин нест.",
  },
  sectionBlurb: {
    "complete-the-words":
      "Даҳ сархати кӯтоҳ бо ҳарфҳои партофташуда. Ҳарфҳои намерасидаро нависед — дар ин ҷо суръати хониш муҳим аст, на тахмин.",
    "daily-life":
      "Мактубҳо, эълонҳо ва чатҳои корӣ — ҳамон тавре ки донишгоҳ ва идора мефиристанд. Саволҳо оид ба мақсад, тафсилот ва хулоса.",
    academic:
      "Матнҳои сесархатӣ бо маҷмӯи пурраи саволҳои академӣ: луғат, мақсади муаллиф, ҷойгузории ҷумла ва интихоби ҷумла.",
  },
  exam: {
    review: "Аз назар гузаронидан",
    back: "Қафо",
    next: "Оянда",
    continue: "Давом",
    markForReview: "Нишона гузоштан",
    marked: "Нишонашуда",
    exit: "Баромадан",
    exitConfirm: "Аз тест мебароед? Ҷавобҳо захира мешаванд.",
    finish: "Анҷом",
    finishConfirm: "Тестро супорида, натиҷаро бинед?",
    hideTime: "Пинҳон кардани вақт",
    showTime: "Нишон додани вақт",
    remaining: "Боқӣ",
    elapsed: "Гузашт",
    questionOf: "Саволи {n} аз {total}",
    reviewTitle: "Ҷавобҳоро аз назар гузаронед",
    reviewLede: "Саволеро интихоб кунед, то ба он баргардед.",
    statusAnswered: "Ҷавобдодашуда",
    statusUnanswered: "Бе ҷавоб",
    statusMarked: "Нишонашуда",
    returnToQuestion: "Ба савол баргаштан",
    goToFirstUnanswered: "Ба аввалин бе ҷавоб",
    timeUp: "Вақт тамом шуд. Ҷавобҳо супорида шуданд.",
    typeLetters: "Ҳарфҳои намерасидаро нависед",
    blankOf: "Холигии {n} аз {total}",
  },
  results: {
    title: "Натиҷаи шумо",
    retake: "Аз нав гузаштан",
    backHome: "Ба шарҳи умумӣ",
    reviewAnswers: "Таҳлили ҳамаи саволҳо",
    correct: "Дуруст",
    incorrect: "Нодуруст",
    skipped: "Партофташуда",
    yourAnswer: "Ҷавоби шумо",
    correctAnswer: "Ҷавоби дуруст",
    noAnswer: "Шумо ҷавоб надодед",
    explanation: "Чаро",
    scoreLabel: "Балл",
    timeLabel: "Вақт",
    breakdown: "Таҳлил аз рӯи саволҳо",
    perfect: "Ҳама дуруст. Маҷмӯаи мураккабтарро гиред.",
    strong: "Хуб. Шарҳи саволҳои хатогиро хонед.",
    keepGoing: "Шарҳҳои поёнро хонед ва маҷмӯаро дубора гузаред.",
  },
  answers: {
    title: "Калиди ҷавобҳо",
    lede: "Ҳамаи саволҳо, ҷавобҳо ва шарҳҳо — бо ҷустуҷӯ.",
    filterAll: "Ҳамаи бахшҳо",
    search: "Ҷустуҷӯ дар саволҳо ва шарҳҳо",
    noMatches: "Чизе ёфт нашуд.",
    show: "Нишон додани шарҳ",
    hide: "Пинҳон кардани шарҳ",
  },
}

const dictionaries = { en, ru, tj } as const

export function useToeflStrings(): ToeflStrings {
  const { lang } = useLang()
  return dictionaries[lang] ?? en
}

/** Fills {n} / {total} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""))
}
