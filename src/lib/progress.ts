import { ALL_QUESTIONS, SUBJECTS } from "./ai-content";
import type { LessonProgress } from "./store";

export interface LessonRef {
  unit: string;
  lesson: string;
}

/** Lessons of a subject in curriculum order (the order they appear in the question bank). */
export function lessonSequence(subject: string): LessonRef[] {
  const seen = new Set<string>();
  const out: LessonRef[] = [];
  for (const q of ALL_QUESTIONS) {
    if (q.subject !== subject) continue;
    const key = `${q.unit}\u0000${q.lesson}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ unit: q.unit, lesson: q.lesson });
  }
  return out;
}

/** Position of the last lesson the student finished in this subject, or -1 if none. */
export function finishedIndex(
  progress: LessonProgress[],
  username: string,
  subject: string,
): number {
  const p = progress.find((x) => x.ownerUsername === username && x.subject === subject);
  if (!p) return -1;
  return lessonSequence(subject).findIndex((l) => l.unit === p.unit && l.lesson === p.lesson);
}

/** Subjects where the student hasn't said yet how far they got (not even "not started"). */
export function subjectsMissingProgress(progress: LessonProgress[], username: string): string[] {
  return SUBJECTS.filter(
    (subject) => !progress.some((x) => x.ownerUsername === username && x.subject === subject),
  );
}

/** Lessons covered by a scope: whole subject, one unit, or one lesson. */
export function lessonsInScope(subject: string, unit?: string, lesson?: string): number[] {
  return lessonSequence(subject)
    .map((l, i) => ({ ...l, i }))
    .filter((l) => (!unit || l.unit === unit) && (!lesson || l.lesson === lesson))
    .map((l) => l.i);
}

/** Lessons in the scope this student hasn't finished yet (empty = allowed). */
export function unfinishedInScope(
  progress: LessonProgress[],
  username: string,
  subject: string,
  unit?: string,
  lesson?: string,
): LessonRef[] {
  const done = finishedIndex(progress, username, subject);
  const seq = lessonSequence(subject);
  return lessonsInScope(subject, unit, lesson)
    .filter((i) => i > done)
    .map((i) => seq[i]);
}
