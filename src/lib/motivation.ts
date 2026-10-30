// Motivation system: stars earned from all study activity, a 0–5 rating for recent
// performance, levels, and motivational messages.
import { ALL_QUESTIONS } from "./ai-content";
import { dateKey, isLiveBattle, streakFor, type DB } from "./store";

type Data = Pick<DB, "sessions" | "quizzes" | "tasks" | "reviews" | "progress" | "challenges">;

export interface StarLine {
  label: string;
  icon: string;
  stars: number;
  detail: string;
}

const pct = (score: number, total: number) => score / Math.max(total, 1);

/** Every way a student earns stars, with how many they earned from each. */
export function starBreakdown(username: string, db: Data): StarLine[] {
  const minutes = db.sessions
    .filter((s) => s.ownerUsername === username)
    .reduce((a, s) => a + s.minutes, 0);
  const tasksDone = db.tasks.filter((t) => t.ownerUsername === username && t.done).length;
  const quizzes = db.quizzes.filter((q) => q.ownerUsername === username);
  const quizStars = quizzes.reduce((a, q) => {
    const p = pct(q.score, q.total);
    return a + (p >= 0.9 ? 3 : p >= 0.6 ? 2 : 1);
  }, 0);
  const reviews = db.reviews.filter((r) => r.ownerUsername === username);
  const compStars = reviews
    .filter((r) => r.kind === "comprehensive")
    .reduce((a, r) => a + (pct(r.score, r.total) >= 0.6 ? 5 : 2), 0);
  const biweeklyStars = reviews
    .filter((r) => r.kind === "biweekly")
    .reduce((a, r) => a + (pct(r.score, r.total) >= 0.6 ? 8 : 3), 0);
  const lessons = db.progress.filter((p) => p.ownerUsername === username && p.lesson !== "").length;
  const wins = db.challenges.filter((c) => isLiveBattle(c) && c.winner === username).length;
  const streak = streakFor(username, db);

  return [
    {
      icon: "🍅",
      label: "وقت المذاكرة",
      stars: Math.floor(minutes / 25),
      detail: `${minutes} دقيقة (نجمة لكل 25 دقيقة)`,
    },
    { icon: "✅", label: "مهام الجدول المنجزة", stars: tasksDone, detail: `${tasksDone} مهمة` },
    {
      icon: "⚡",
      label: "الاختبارات السريعة",
      stars: quizStars,
      detail: `${quizzes.length} اختبار (1–3 نجوم حسب الدرجة)`,
    },
    {
      icon: "📝",
      label: "الاختبارات الشاملة",
      stars: compStars,
      detail: `${reviews.filter((r) => r.kind === "comprehensive").length} اختبار`,
    },
    {
      icon: "🔁",
      label: "المراجعة كل أسبوعين",
      stars: biweeklyStars,
      detail: `${reviews.filter((r) => r.kind === "biweekly").length} مراجعة`,
    },
    { icon: "📍", label: "الدروس المنتهية", stars: lessons, detail: `${lessons} درس` },
    {
      icon: "⚔️",
      label: "الفوز في المسابقات",
      stars: wins * 5,
      detail: `${wins} فوز (5 نجوم لكل فوز)`,
    },
    {
      icon: "🔥",
      label: "سلسلة الأيام المتتالية",
      stars: streak >= 3 ? streak : 0,
      detail: `${streak} يوم (تُحتسب من 3 أيام)`,
    },
  ];
}

export function starsFor(username: string, db: Data): number {
  return starBreakdown(username, db).reduce((a, l) => a + l.stars, 0);
}

export interface RatingPart {
  label: string;
  value: number; // 0..1
  weight: number;
}

/** 0–5 rating for the last 14 days: consistency, tasks, accuracy and curriculum progress. */
export function ratingFor(username: string, db: Data): { rating: number; parts: RatingPart[] } {
  const since = new Date();
  since.setDate(since.getDate() - 13);
  const sinceKey = dateKey(since);
  const sinceMs = new Date(since.getFullYear(), since.getMonth(), since.getDate()).getTime();

  const studyDays = new Set(
    db.sessions
      .filter((s) => s.ownerUsername === username && s.date >= sinceKey)
      .map((s) => s.date),
  ).size;
  const tasks = db.tasks.filter(
    (t) => t.ownerUsername === username && t.date >= sinceKey && t.date <= dateKey(),
  );
  const scores = [
    ...db.quizzes.filter((q) => q.ownerUsername === username && q.takenAt >= sinceMs),
    ...db.reviews.filter((r) => r.ownerUsername === username && r.takenAt >= sinceMs),
  ].map((r) => pct(r.score, r.total));
  const totalLessons = new Set(ALL_QUESTIONS.map((q) => `${q.subject}|${q.lesson}`)).size;
  const finished = db.progress.filter(
    (p) => p.ownerUsername === username && p.lesson !== "",
  ).length;

  const parts: RatingPart[] = [
    { label: "الانتظام (أيام المذاكرة في آخر 14 يوماً)", value: studyDays / 14, weight: 0.35 },
    {
      label: "إنجاز مهام الجدول",
      value: tasks.length ? tasks.filter((t) => t.done).length / tasks.length : 0,
      weight: 0.2,
    },
    {
      label: "دقة الإجابات في الاختبارات",
      value: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      weight: 0.3,
    },
    { label: "التقدم في المنهج", value: finished / totalLessons, weight: 0.15 },
  ];
  const raw = 5 * parts.reduce((a, p) => a + p.value * p.weight, 0);
  return { rating: Math.round(raw * 2) / 2, parts };
}

export const LEVELS = [
  { min: 0, title: "مبتدئ", icon: "🌱" },
  { min: 30, title: "مجتهد", icon: "📘" },
  { min: 100, title: "متميز", icon: "🌟" },
  { min: 250, title: "متفوق", icon: "🏅" },
  { min: 500, title: "بطل", icon: "🏆" },
  { min: 1000, title: "أسطورة", icon: "👑" },
];

export function levelFor(stars: number) {
  let i = 0;
  while (i + 1 < LEVELS.length && stars >= LEVELS[i + 1].min) i++;
  const next = LEVELS[i + 1];
  return {
    ...LEVELS[i],
    next,
    progress: next ? (stars - LEVELS[i].min) / (next.min - LEVELS[i].min) : 1,
  };
}

// ── Motivational messages ──
export const STUDY_QUOTES = [
  "كل دقيقة تذاكرها الآن تقرّبك من حلمك 🌟",
  "النجاح ليس صدفة، إنه مجهود يومي صغير يتكرر 💪",
  "ركّز الآن، واسترح بعد قليل — أنت تقدر 🍅",
  "من جدّ وجد، ومن زرع حصد 🌱",
  "لا تقارن نفسك بغيرك، قارن نفسك بنفسك أمس 📈",
  "الصعب اليوم سيصبح سهلاً غداً بالتكرار 🔁",
  "أنت أقوى من الكسل، أكمل الجلسة! 🔥",
  "خطوة صغيرة كل يوم تصنع فرقاً كبيراً 🚶",
  "العلم نور، وأنت الآن تضيء طريقك ✨",
  "تخيّل فرحتك يوم النتيجة، واستمر 🎓",
  "التركيز الحقيقي هو أن تنسى الهاتف لـ 25 دقيقة فقط 📵",
  "كل درس تنهيه نجمة جديدة في رصيدك ⭐",
];

export const WIN_QUOTES = [
  "بطل! مذاكرتك ظهرت في كل إجابة 🏆",
  "فوز مستحق — هذا ثمرة تعبك 👏",
  "أداء رائع! استمر وسيبقى المركز الأول لك 🥇",
  "السرعة والدقة معاً، إنجاز مبهر ⚡",
  "هكذا يكون المتفوقون، فخورون بك 🌟",
];

export const LOSE_QUOTES = [
  "خسارة اليوم درس لفوز الغد، راجع الأسئلة وعُد أقوى 💪",
  "كنت قريباً جداً! مراجعة صغيرة وتفوز المرة القادمة 🔁",
  "المهم أنك شاركت وتعلمت — المرة القادمة لك 🌱",
];

/** End-of-day message based on how much of today's plan was done. */
export function dayMessage(doneRatio: number, minutes: number): { icon: string; text: string } {
  if (minutes === 0 && doneRatio === 0)
    return {
      icon: "🌅",
      text: "لم تبدأ بعد اليوم — جلسة بومودورو واحدة (25 دقيقة) تكفي لتبدأ بقوة!",
    };
  if (doneRatio >= 1)
    return { icon: "🏆", text: "يوم مثالي! أنهيت كل مهام اليوم، تستحق الراحة والفخر 👏" };
  if (doneRatio >= 0.6)
    return { icon: "🚀", text: "يوم ممتاز! أنجزت معظم خطتك، أكمل الباقي وستكون في القمة." };
  if (doneRatio >= 0.3)
    return { icon: "💪", text: "بداية جيدة! خطوة إضافية الآن وتقترب من هدف اليوم." };
  return { icon: "🌱", text: "كل بداية صغيرة تُحسب — أنجز مهمة واحدة الآن واشعر بالفرق." };
}

/** Stable pick from a list (same seed → same message, so it doesn't change on re-render). */
export function pickBySeed<T>(list: T[], seed: string): T {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return list[Math.abs(h) % list.length];
}

export function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
