// Every answer a student gives is saved, so they can review the questions they got wrong.
// A question counts as a mistake while its most recent answer is wrong.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { uid } from "./store";

export type AnswerSource = "quiz" | "comprehensive" | "biweekly" | "battle" | "map" | "review";

export interface AnswerItem {
  questionId: string;
  subject: string;
  lesson: string;
  q: string;
  options: string[];
  correct: number;
  chosen: number | null;
}

export interface LoggedAnswer extends AnswerItem {
  id: string;
  username: string;
  source: AnswerSource;
  isCorrect: boolean;
  createdAt: number;
}

/** Save answers (fire-and-forget; failures don't interrupt the student). */
export function logAnswers(username: string, source: AnswerSource, items: AnswerItem[]) {
  if (!username || items.length === 0) return;
  const now = Date.now();
  void supabase
    .from("answer_log")
    .insert(
      items.map((a, i) => ({
        id: uid() + uid(),
        username,
        source,
        question_id: a.questionId,
        subject: a.subject,
        lesson: a.lesson,
        q: a.q,
        options: a.options,
        correct: a.correct,
        chosen: a.chosen,
        is_correct: a.chosen === a.correct,
        created_at: now + i, // keep order within one test
      })),
    )
    .then(
      () => {},
      () => {},
    );
}

/** Load a student's answer history (newest first). */
export function useAnswerLog(username: string | null) {
  const [rows, setRows] = useState<LoggedAnswer[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    const { data, error: e } = await supabase
      .from("answer_log")
      .select("*")
      .eq("username", username)
      .order("created_at", { ascending: false })
      .limit(3000);
    setLoading(false);
    if (e) return setError("سجل الإجابات غير متاح بعد (يحتاج إنشاء جدول answer_log).");
    setError("");
    setRows(
      (data ?? []).map((r) => ({
        id: r.id,
        username: r.username,
        source: r.source as AnswerSource,
        questionId: r.question_id,
        subject: r.subject,
        lesson: r.lesson,
        q: r.q,
        options: Array.isArray(r.options) ? (r.options as string[]) : [],
        correct: r.correct,
        chosen: r.chosen,
        isCorrect: r.is_correct,
        createdAt: r.created_at,
      })),
    );
  }, [username]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { rows, error, loading, reload };
}

export interface Mistake {
  last: LoggedAnswer;
  /** how many times this question was answered wrong in total */
  wrongCount: number;
}

/** Questions whose latest answer is wrong (rows must be newest first). */
export function currentMistakes(rows: LoggedAnswer[]): Mistake[] {
  const latest = new Map<string, LoggedAnswer>();
  const wrong = new Map<string, number>();
  for (const r of rows) {
    if (!latest.has(r.questionId)) latest.set(r.questionId, r);
    if (!r.isCorrect) wrong.set(r.questionId, (wrong.get(r.questionId) ?? 0) + 1);
  }
  return [...latest.values()]
    .filter((r) => !r.isCorrect)
    .map((r) => ({ last: r, wrongCount: wrong.get(r.questionId) ?? 1 }));
}

export const SOURCE_LABEL: Record<AnswerSource, string> = {
  quiz: "اختبار سريع",
  comprehensive: "اختبار شامل",
  biweekly: "مراجعة كل أسبوعين",
  battle: "مسابقة حية",
  map: "أسئلة الخرائط",
  review: "مراجعة الأخطاء",
};
