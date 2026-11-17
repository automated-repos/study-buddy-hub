// Daily / weekly study goals: week helpers, the weekly plan builder and the end-of-week report.
// Goals are rows of study_tasks (scope "day" or "week"); the week runs Saturday → Friday.
import { finishedLessons, isFinished, lessonSequence, type LessonRef } from "./progress";
import { dateKey, type DB, type NewTask, type StudyTask } from "./store";

export const DAY_NAMES = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

/** Saturday that starts the week containing `d`. */
export function weekStart(d: Date = new Date()): Date {
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  s.setDate(s.getDate() - ((s.getDay() + 1) % 7)); // Sat = 6 → 0 days back
  return s;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** The 7 date keys of the week that starts on `start`. */
export function weekKeys(start: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => dateKey(addDays(start, i)));
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const dayName = (key: string) => DAY_NAMES[parseKey(key).getDay()];

/** Goals and tasks that belong to a week: its day tasks plus its week goals. */
export function weekTasks(tasks: StudyTask[], username: string, start: Date) {
  const keys = new Set(weekKeys(start));
  const startKey = dateKey(start);
  const mine = tasks.filter((t) => t.ownerUsername === username);
  return {
    day: mine.filter((t) => t.scope === "day" && keys.has(t.date)),
    week: mine.filter((t) => t.scope === "week" && t.date === startKey),
  };
}

export const KIND_LABEL = {
  study: "📖 درس جديد",
  review: "🔁 مراجعة",
  custom: "✍️ هدف حر",
} as const;

export function goalTitle(kind: "study" | "review", lesson: string) {
  return kind === "study" ? `ذاكر: ${lesson}` : `راجع: ${lesson}`;
}

// ── Weekly plan ──────────────────────────────────────────────────────────────

export interface PlanOptions {
  subjects: string[];
  /** date keys to study on */
  days: string[];
  perDay: number;
  minutes: number;
  /** add one short review of a finished lesson each day */
  dailyReview: boolean;
}

/**
 * Builds a week of tasks: each day takes `perDay` subjects in turn, each gets the next lesson
 * the student hasn't finished (and hasn't already planned); subjects with nothing new left get a
 * review instead. Reviews start with the lessons finished longest ago.
 */
export function buildWeekPlan(
  db: Pick<DB, "progress" | "tasks">,
  username: string,
  o: PlanOptions,
): NewTask[] {
  const subjects = o.subjects;
  if (!subjects.length || !o.days.length) return [];
  const planned = new Set(
    db.tasks
      .filter((t) => t.ownerUsername === username && !t.done && t.kind === "study" && t.lesson)
      .map((t) => `${t.subject}|${t.lesson}`),
  );
  const fresh = new Map<string, LessonRef[]>();
  const reviewQueue = new Map<string, LessonRef[]>();
  for (const s of subjects) {
    const done = finishedLessons(db.progress, username, s);
    const seq = lessonSequence(s);
    fresh.set(
      s,
      seq.filter((l) => !isFinished(done, l) && !planned.has(`${s}|${l.lesson}`)),
    );
    // oldest finished first (spaced review)
    const when = new Map(
      db.progress
        .filter((p) => p.ownerUsername === username && p.subject === s && p.lesson)
        .map((p) => [p.lesson, p.updatedAt]),
    );
    reviewQueue.set(
      s,
      seq
        .filter((l) => isFinished(done, l))
        .sort((a, b) => (when.get(a.lesson) ?? 0) - (when.get(b.lesson) ?? 0)),
    );
  }
  const takeReview = (s: string): LessonRef | undefined => {
    const q = reviewQueue.get(s)!;
    const l = q.shift();
    if (l) q.push(l); // cycle
    return l;
  };

  const out: NewTask[] = [];
  const perDay = Math.min(o.perDay, subjects.length);
  let turn = 0;
  let reviewTurn = 0;
  for (const date of o.days) {
    const today: string[] = [];
    for (let k = 0; k < perDay; k++) today.push(subjects[(turn + k) % subjects.length]);
    turn = (turn + perDay) % subjects.length;
    for (const s of today) {
      const next = fresh.get(s)!.shift();
      if (next) {
        out.push({
          date,
          subject: s,
          title: goalTitle("study", next.lesson),
          minutes: o.minutes,
          kind: "study",
          ...next,
        });
      } else {
        const r = takeReview(s);
        if (r)
          out.push({
            date,
            subject: s,
            title: goalTitle("review", r.lesson),
            minutes: Math.round(o.minutes / 2),
            kind: "review",
            ...r,
          });
      }
    }
    if (o.dailyReview) {
      // a subject not studied today, so the day mixes subjects
      for (let k = 0; k < subjects.length; k++) {
        const s = subjects[(reviewTurn + k) % subjects.length];
        if (today.includes(s) && subjects.length > perDay) continue;
        const r = takeReview(s);
        if (!r) continue;
        out.push({
          date,
          subject: s,
          title: `${goalTitle("review", r.lesson)} + اختبار سريع`,
          minutes: 20,
          kind: "review",
          ...r,
        });
        reviewTurn = (reviewTurn + k + 1) % subjects.length;
        break;
      }
    }
  }
  return out;
}

// ── Week report ──────────────────────────────────────────────────────────────

export interface WeekReport {
  start: Date;
  total: number;
  done: number;
  studyDone: number;
  reviewDone: number;
  customDone: number;
  weekGoals: { total: number; done: number };
  minutes: number;
  lessonsFinished: { subject: string; lesson: string }[];
  bestDay: { key: string; minutes: number } | null;
  bySubject: { subject: string; done: number; total: number }[];
  undone: StudyTask[];
}

export function weekReport(
  db: Pick<DB, "tasks" | "sessions" | "progress">,
  username: string,
  start: Date,
): WeekReport {
  const { day, week } = weekTasks(db.tasks, username, start);
  const all = [...day, ...week];
  const keys = new Set(weekKeys(start));
  const perDay = new Map<string, number>();
  for (const s of db.sessions)
    if (s.ownerUsername === username && keys.has(s.date))
      perDay.set(s.date, (perDay.get(s.date) ?? 0) + s.minutes);
  const minutes = [...perDay.values()].reduce((a, b) => a + b, 0);
  const best = [...perDay.entries()].sort((a, b) => b[1] - a[1])[0];
  const from = start.getTime();
  const to = addDays(start, 7).getTime();
  const lessonsFinished = db.progress
    .filter(
      (p) => p.ownerUsername === username && p.lesson && p.updatedAt >= from && p.updatedAt < to,
    )
    .map((p) => ({ subject: p.subject, lesson: p.lesson }));
  const subj = new Map<string, { done: number; total: number }>();
  for (const t of all) {
    const e = subj.get(t.subject) ?? { done: 0, total: 0 };
    e.total++;
    if (t.done) e.done++;
    subj.set(t.subject, e);
  }
  const doneOf = (k: StudyTask["kind"]) => all.filter((t) => t.done && t.kind === k).length;
  return {
    start,
    total: all.length,
    done: all.filter((t) => t.done).length,
    studyDone: doneOf("study"),
    reviewDone: doneOf("review"),
    customDone: doneOf("custom"),
    weekGoals: { total: week.length, done: week.filter((t) => t.done).length },
    minutes,
    lessonsFinished,
    bestDay: best ? { key: best[0], minutes: best[1] } : null,
    bySubject: [...subj.entries()].map(([subject, v]) => ({ subject, ...v })),
    undone: all.filter((t) => !t.done),
  };
}

export function reportMessage(r: WeekReport): { icon: string; text: string } {
  if (!r.total)
    return r.minutes
      ? {
          icon: "📝",
          text: `ذاكرت ${r.minutes} دقيقة بدون أهداف — هذا الأسبوع ضع خطة لتعرف إلى أين تتجه.`,
        }
      : { icon: "🌱", text: "أسبوع جديد وبداية جديدة — ضع أهدافك واصنع جدولك الآن." };
  const ratio = r.done / r.total;
  if (ratio >= 0.9)
    return { icon: "🏆", text: "أسبوع أسطوري! حققت تقريباً كل أهدافك — استمر بهذا المستوى." };
  if (ratio >= 0.7)
    return {
      icon: "🚀",
      text: "أسبوع ممتاز! حققت معظم أهدافك، والقليل الباقي ننقله للأسبوع الجديد.",
    };
  if (ratio >= 0.4)
    return { icon: "💪", text: "أسبوع جيد — خفّف عدد المهام اليومية قليلاً لتلتزم بها كلها." };
  return {
    icon: "🌱",
    text: "الأسبوع كان صعباً، لا بأس. ابدأ بخطة أخف (مادتان يومياً) وزِد تدريجياً.",
  };
}

/** Per-viewer "already shown" flags for the daily reminder and the weekly report. */
export function wasShown(key: string): boolean {
  try {
    return !!localStorage.getItem(key);
  } catch {
    return true; // storage blocked: don't nag on every load
  }
}

export function setShown(key: string) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    /* ignore */
  }
}
