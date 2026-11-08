import type { ExtraLesson } from "./questions/types";
import { EXTRA_EN } from "./questions/en";
import { EXTRA_HI } from "./questions/hi";
import { EXTRA_GEO } from "./questions/geo";
import { EXTRA_EN_2 } from "./questions/en2";
import { EXTRA_ST_ALL } from "./questions/st2";
import { EXTRA_AR_ALL } from "./questions/ar2";
import { EXTRA_HI_2 } from "./questions/hi2";
import { EXTRA_GEO_2 } from "./questions/geo2";
import { EXTRA_FR, SUMMARIES_FR } from "./questions/fr";
import { EXTRA_FR_2, SUMMARIES_FR_2 } from "./questions/fr2";
import { SUMMARIES_HI } from "./questions/hi-summaries";
import { SUMMARIES_GEO } from "./questions/geo-summaries";
import { SUMMARIES_ST } from "./questions/st-summaries";
import { SUMMARIES_EN } from "./questions/en-summaries";
import { SUMMARIES_AR } from "./questions/ar-summaries";

// Comprehensive tagged question bank — Egyptian 3rd-year secondary 2025-2026
// Each question carries subject/unit/lesson tags so it can be reused across:
// lesson quiz → unit test → subject exam → random review → competition

export interface AIQuestion {
  id: string;
  subject: string; // "إنجليزي" | "إحصاء" | "عربي" | "تاريخ" | "جغرافيا"
  unit: string;
  lesson: string;
  q: string;
  options: string[];
  correct: number; // 0-3
  difficulty: "easy" | "medium" | "hard";
}

export interface AISummary {
  subject: string;
  unit: string;
  lesson: string;
  title: string;
  summary: string;
  keyPoints: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

const BASE_QUESTIONS: AIQuestion[] = [
  // English questions live in ./questions/en.ts and en2.ts (2026-27 curriculum).
  // Statistics questions live in ./questions/st.ts and st2.ts (2026-27 curriculum).
  // Arabic questions live in ./questions/ar.ts and ar2.ts (2026-27 curriculum).
  // أدب: مدرسة الإحياء
  // أدب: الديوان
  // أدب: أبوللو
  // أدب: الشعر الحر
  // نحو: المبتدأ والخبر
  // نحو: الفعل
  // نحو: المفعول به والمطلق
  // نحو: الحال والتمييز
  // نحو: الأساليب
  // نحو: البلاغة
  // نحو: الإعلال
  // History questions live in ./questions/hi.ts and hi2.ts (2026-27 curriculum).
  // Geography questions live in ./questions/geo.ts and geo2.ts (2026-27 curriculum).
];

// Extra questions live in ./questions/*.ts (10 more per lesson). Each is attached to an
// existing lesson by name; a typo in a lesson name fails loudly instead of silently vanishing.
const DIFFICULTY = { e: "easy", m: "medium", h: "hard" } as const;

function expandExtra(lessons: ExtraLesson[]): AIQuestion[] {
  const counter = new Map<string, number>(); // lesson → extra questions numbered so far
  return lessons.flatMap(({ subject, lesson, rows, newLesson }) => {
    const base = BASE_QUESTIONS.find((q) => q.subject === subject && q.lesson === lesson);
    if (!base && !newLesson)
      throw new Error(`Unknown lesson in extra questions: ${subject} / ${lesson}`);
    const prefix = base ? base.id.replace(/-\d+$/, "") : newLesson!.prefix;
    const unit = base ? base.unit : newLesson!.unit;
    const start = counter.get(prefix) ?? 0;
    counter.set(prefix, start + rows.length);
    return rows.map(([q, right, w1, w2, w3, d], i) => ({
      id: `${prefix}-x${String(start + i + 1).padStart(2, "0")}`,
      subject,
      unit,
      lesson,
      q,
      options: [right, w1, w2, w3],
      correct: 0,
      difficulty: DIFFICULTY[d],
    }));
  });
}

export const ALL_QUESTIONS: AIQuestion[] = [
  ...BASE_QUESTIONS,
  ...expandExtra([
    ...EXTRA_EN,
    ...EXTRA_ST_ALL,
    ...EXTRA_AR_ALL,
    ...EXTRA_HI,
    ...EXTRA_GEO,
    ...EXTRA_EN_2,
    ...EXTRA_HI_2,
    ...EXTRA_GEO_2,
    ...EXTRA_FR,
    ...EXTRA_FR_2,
  ]),
];

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARIES
// ─────────────────────────────────────────────────────────────────────────────

const BASE_SUMMARIES: AISummary[] = [];

export const ALL_SUMMARIES: AISummary[] = [
  ...BASE_SUMMARIES,
  ...SUMMARIES_EN,
  ...SUMMARIES_ST,
  ...SUMMARIES_AR,
  ...SUMMARIES_HI,
  ...SUMMARIES_GEO,
  ...SUMMARIES_FR,
  ...SUMMARIES_FR_2,
];

// ─────────────────────────────────────────────────────────────────────────────
// QUERY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

// ── Supervisor edits (custom_questions table) ──
// A row whose id matches a built-in question replaces it (or hides it when hidden = true);
// any other row is a new question added by the supervisor.
export interface QuestionEdit extends AIQuestion {
  hidden: boolean;
}

let edits: QuestionEdit[] = [];
let active: AIQuestion[] = ALL_QUESTIONS;

/** Called by the store whenever custom_questions is (re)loaded. */
export function setQuestionEdits(rows: QuestionEdit[]) {
  edits = rows;
  const byId = new Map(rows.map((r) => [r.id, r]));
  const builtIn = ALL_QUESTIONS.flatMap((q) => {
    const e = byId.get(q.id);
    if (!e) return [q];
    return e.hidden
      ? []
      : [{ ...q, q: e.q, options: e.options, correct: e.correct, difficulty: e.difficulty }];
  });
  const builtInIds = new Set(ALL_QUESTIONS.map((q) => q.id));
  const added = rows.filter((r) => !builtInIds.has(r.id) && !r.hidden);
  active = [...builtIn, ...added];
}

/** Questions currently in use: built-in ones with supervisor edits applied, plus added ones. */
export function activeQuestions(): AIQuestion[] {
  return active;
}

export function isBuiltInQuestion(id: string): boolean {
  return ALL_QUESTIONS.some((q) => q.id === id);
}

/** Built-in questions the supervisor deleted (so they can be restored). */
export function hiddenBuiltInQuestions(subject: string, lesson: string): AIQuestion[] {
  const hidden = new Set(edits.filter((e) => e.hidden).map((e) => e.id));
  return ALL_QUESTIONS.filter(
    (q) => hidden.has(q.id) && q.subject === subject && q.lesson === lesson,
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Same question with its answers in random order (the bank always stores the right answer first). */
function shuffleOptions(q: AIQuestion): AIQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
}

/** Pick `count` random questions, preferring ones not in `avoid` (e.g. used in earlier battles). */
function pick(pool: AIQuestion[], count: number, avoid?: Set<string>): AIQuestion[] {
  const fresh = avoid ? pool.filter((q) => !avoid.has(q.id)) : pool;
  const used = avoid ? pool.filter((q) => avoid.has(q.id)) : [];
  return [...shuffle(fresh), ...shuffle(used)].slice(0, count).map(shuffleOptions);
}

export function getQuestionsForLesson(
  subject: string,
  unit: string,
  lesson: string,
  count = 5,
): AIQuestion[] {
  const pool = active.filter(
    (q) => q.subject === subject && q.unit === unit && q.lesson === lesson,
  );
  return pick(pool, count);
}

export function getQuestionsForUnit(subject: string, unit: string, count = 10): AIQuestion[] {
  const pool = active.filter((q) => q.subject === subject && q.unit === unit);
  return pick(pool, count);
}

export function getQuestionsForSubject(subject: string, count = 20): AIQuestion[] {
  const pool = active.filter((q) => q.subject === subject);
  return pick(pool, count);
}

export function getRandomQuestions(count = 10, subjects?: string[]): AIQuestion[] {
  const pool = subjects ? active.filter((q) => subjects.includes(q.subject)) : active;
  return pick(pool, count);
}

/** All questions matching a subject, optionally narrowed to one unit and one lesson. */
export function getQuestionPool(subject: string, unit?: string, lesson?: string): AIQuestion[] {
  return active.filter(
    (q) => q.subject === subject && (!unit || q.unit === unit) && (!lesson || q.lesson === lesson),
  );
}

/** Random questions from the chosen subject / unit / lesson. */
export function getQuestionsByScope(
  subject: string,
  unit?: string,
  lesson?: string,
  count = 5,
  avoid?: Set<string>,
): AIQuestion[] {
  return pick(getQuestionPool(subject, unit, lesson), count, avoid);
}

/** Random questions from a specific list of lessons. */
export function getQuestionsFromLessons(
  subject: string,
  lessons: { unit: string; lesson: string }[],
  count = 5,
  avoid?: Set<string>,
): AIQuestion[] {
  const pool = active.filter(
    (q) => q.subject === subject && lessons.some((l) => l.unit === q.unit && l.lesson === q.lesson),
  );
  return pick(pool, count, avoid);
}

// backward-compatible wrapper
export function getQuestionsFor(subjectName: string, unit?: string, count = 5): AIQuestion[] {
  if (unit) return getQuestionsForUnit(subjectName, unit, count);
  return getQuestionsForSubject(subjectName, count);
}

export function getSummariesFor(subject: string): AISummary[] {
  return ALL_SUMMARIES.filter((s) => s.subject === subject);
}

export function getSummariesForUnit(subject: string, unit: string): AISummary[] {
  return ALL_SUMMARIES.filter((s) => s.subject === subject && s.unit === unit);
}

const SUBJECT_ORDER = ["إنجليزي", "إحصاء", "عربي", "تاريخ", "جغرافيا", "فرنسي"];
const subjectRank = (s: string) => SUBJECT_ORDER.indexOf(s) + 1 || 99;
export const SUBJECTS = [...new Set(ALL_QUESTIONS.map((q) => q.subject))].sort(
  (a, b) => subjectRank(a) - subjectRank(b),
);

export function getUnitsForSubject(subject: string): string[] {
  return [...new Set(ALL_QUESTIONS.filter((q) => q.subject === subject).map((q) => q.unit))];
}

export function getLessonsForUnit(subject: string, unit: string): string[] {
  return [
    ...new Set(
      ALL_QUESTIONS.filter((q) => q.subject === subject && q.unit === unit).map((q) => q.lesson),
    ),
  ];
}
