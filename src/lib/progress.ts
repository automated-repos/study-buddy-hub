import { ALL_QUESTIONS, SUBJECTS } from "./ai-content";
import type { LessonProgress } from "./store";

// student_progress holds one row per finished lesson.
// A row with empty unit + lesson means "I haven't started this subject" — it only marks the subject as answered.

export interface LessonRef {
  unit: string;
  lesson: string;
}

const key = (unit: string, lesson: string) => `${unit}\u0000${lesson}`;

/** Lessons of a subject in curriculum order (the order they appear in the question bank). */
export function lessonSequence(subject: string): LessonRef[] {
  const seen = new Set<string>();
  const out: LessonRef[] = [];
  for (const q of ALL_QUESTIONS) {
    if (q.subject !== subject) continue;
    const k = key(q.unit, q.lesson);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ unit: q.unit, lesson: q.lesson });
  }
  return out;
}

export function unitsOf(subject: string): string[] {
  return [...new Set(lessonSequence(subject).map((l) => l.unit))];
}

export function lessonsOfUnit(subject: string, unit: string): LessonRef[] {
  return lessonSequence(subject).filter((l) => l.unit === unit);
}

/** Lesson keys of the current curriculum (rows for removed lessons are ignored). */
function currentKeys(subject: string): Set<string> {
  return new Set(lessonSequence(subject).map((l) => key(l.unit, l.lesson)));
}

/**
 * Has the student answered for this subject (lessons ticked or "not started")?
 * Rows pointing at lessons that no longer exist (e.g. after a curriculum change) don't count,
 * so the student is asked again.
 */
export function hasAnswered(progress: LessonProgress[], username: string, subject: string) {
  const valid = currentKeys(subject);
  return progress.some(
    (x) =>
      x.ownerUsername === username &&
      x.subject === subject &&
      (x.lesson === "" || valid.has(key(x.unit, x.lesson))),
  );
}

/** Subjects where the student hasn't said anything yet. */
export function subjectsMissingProgress(progress: LessonProgress[], username: string): string[] {
  return SUBJECTS.filter((subject) => !hasAnswered(progress, username, subject));
}

/** Lessons this student has ticked as finished in a subject. */
export function finishedLessons(
  progress: LessonProgress[],
  username: string,
  subject: string,
): Set<string> {
  const valid = currentKeys(subject);
  return new Set(
    progress
      .filter((x) => x.ownerUsername === username && x.subject === subject && x.lesson !== "")
      .map((x) => key(x.unit, x.lesson))
      .filter((k) => valid.has(k)),
  );
}

export function isFinished(done: Set<string>, l: LessonRef) {
  return done.has(key(l.unit, l.lesson));
}

/** Lessons every listed student has finished, in curriculum order. */
export function commonLessons(
  progress: LessonProgress[],
  usernames: string[],
  subject: string,
): LessonRef[] {
  const sets = usernames.map((u) => finishedLessons(progress, u, subject));
  return lessonSequence(subject).filter((l) => sets.every((s) => isFinished(s, l)));
}

/** Units every listed student has finished completely. */
export function commonFullUnits(
  progress: LessonProgress[],
  usernames: string[],
  subject: string,
): string[] {
  const common = new Set(
    commonLessons(progress, usernames, subject).map((l) => key(l.unit, l.lesson)),
  );
  return unitsOf(subject).filter((u) =>
    lessonsOfUnit(subject, u).every((l) => common.has(key(l.unit, l.lesson))),
  );
}

/**
 * Lessons a battle covers.
 * - lesson given → that lesson
 * - only unit given → the whole unit
 * - neither → every lesson both students have finished
 */
export function battleLessons(
  progress: LessonProgress[],
  usernames: string[],
  subject: string,
  unit?: string,
  lesson?: string,
): LessonRef[] {
  if (lesson && unit) return [{ unit, lesson }];
  if (unit) return lessonsOfUnit(subject, unit);
  return commonLessons(progress, usernames, subject);
}

/** What a battle covers: one subject (optionally a unit / lesson) or several whole subjects. */
export interface BattleScope {
  subject: string;
  /** Several subjects: every lesson both students finished in each of them. */
  subjects?: string[];
  unit?: string;
  lesson?: string;
}

/** Lessons of a battle grouped by subject. */
export function battleGroups(
  progress: LessonProgress[],
  usernames: string[],
  scope: BattleScope,
): { subject: string; lessons: LessonRef[] }[] {
  if (scope.subjects && scope.subjects.length > 1)
    return scope.subjects.map((s) => ({
      subject: s,
      lessons: commonLessons(progress, usernames, s),
    }));
  return [
    {
      subject: scope.subject,
      lessons: battleLessons(progress, usernames, scope.subject, scope.unit, scope.lesson),
    },
  ];
}

/** Subjects of a multi-subject battle where the students have no finished lesson in common. */
export function emptyBattleSubjects(
  progress: LessonProgress[],
  usernames: string[],
  scope: BattleScope,
): string[] {
  return battleGroups(progress, usernames, scope)
    .filter((g) => g.lessons.length === 0)
    .map((g) => g.subject);
}

/** Students who can't play this battle yet (see battleBlockers); works for several subjects. */
export function battleScopeBlockers(
  progress: LessonProgress[],
  usernames: string[],
  scope: BattleScope,
): string[] {
  if (scope.subjects && scope.subjects.length > 1)
    // common lessons are finished by both by definition; only an empty subject blocks
    return emptyBattleSubjects(progress, usernames, scope).length ? usernames : [];
  return battleBlockers(progress, usernames, scope.subject, scope.unit, scope.lesson);
}

/** Students (from the list) who haven't finished every lesson in the battle scope. */
export function battleBlockers(
  progress: LessonProgress[],
  usernames: string[],
  subject: string,
  unit?: string,
  lesson?: string,
): string[] {
  const scope = battleLessons(progress, usernames, subject, unit, lesson);
  if (scope.length === 0) return usernames; // nothing in common yet
  return usernames.filter((u) => {
    const done = finishedLessons(progress, u, subject);
    return !scope.every((l) => isFinished(done, l));
  });
}
