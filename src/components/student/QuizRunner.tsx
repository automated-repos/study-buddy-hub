import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { AIQuestion } from "@/lib/ai-content";
import { formatClock } from "@/lib/pomodoro";
import { logAnswers, type AnswerSource } from "@/lib/answers";
import { useCurrentProfile } from "@/lib/store";

/** Runs a list of multiple-choice questions, then shows the score and a review of mistakes. */
export function QuizRunner({
  questions,
  title,
  secondsPerQuestion,
  onFinish,
  onExit,
  logAs,
}: {
  questions: AIQuestion[];
  title: string;
  /** Optional time limit; the test ends automatically when it runs out. */
  secondsPerQuestion?: number;
  onFinish: (score: number, total: number) => void;
  onExit: () => void;
  /** save every answer under this source so mistakes can be reviewed later */
  logAs?: AnswerSource;
}) {
  const profile = useCurrentProfile();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(secondsPerQuestion ? secondsPerQuestion * questions.length : 0);

  const finish = (final: (number | null)[]) => {
    const score = final.reduce<number>(
      (a, ans, j) => a + (ans === questions[j].correct ? 1 : 0),
      0,
    );
    setAnswers(final);
    setDone(true);
    if (logAs && profile)
      logAnswers(
        profile.username,
        logAs,
        questions.map((q, j) => ({
          questionId: q.id,
          subject: q.subject,
          lesson: q.lesson,
          q: q.q,
          options: q.options,
          correct: q.correct,
          chosen: final[j] ?? null,
        })),
      );
    if (score / questions.length >= 0.6)
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
    onFinish(score, questions.length);
  };

  useEffect(() => {
    if (!secondsPerQuestion || done) return;
    if (left <= 0) {
      finish([...answers, ...Array(questions.length - answers.length).fill(null)]);
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, done]);

  const choose = (i: number) => {
    const next = [...answers, i];
    if (idx + 1 < questions.length) {
      setAnswers(next);
      setIdx(idx + 1);
    } else finish(next);
  };

  if (done) {
    const score = answers.reduce<number>(
      (a, ans, j) => a + (ans === questions[j].correct ? 1 : 0),
      0,
    );
    const ratio = score / questions.length;
    // lessons with mistakes, to guide revision
    const weak = [
      ...new Set(
        questions
          .filter((q, j) => answers[j] !== q.correct)
          .map((q) => `${q.subject} • ${q.lesson}`),
      ),
    ];
    return (
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-2xl mx-auto space-y-4">
        <div className="text-center">
          <div className="text-6xl mb-2">{ratio === 1 ? "🏆" : ratio >= 0.6 ? "🎉" : "💪"}</div>
          <h3 className="text-2xl font-bold">
            {title}: {score} / {questions.length} ({Math.round(ratio * 100)}%)
          </h3>
          <p className="text-muted-foreground mt-1">
            {ratio >= 0.85
              ? "ممتاز! مستواك قوي جداً."
              : ratio >= 0.6
                ? "جيد — راجع الدروس المذكورة بالأسفل لتصل للقمة."
                : "لا بأس، راجع الدروس المذكورة ثم أعد المحاولة."}
          </p>
        </div>
        {weak.length > 0 && (
          <div className="glass rounded-2xl p-3">
            <p className="font-bold text-sm mb-1">📌 دروس تحتاج مراجعة:</p>
            <ul className="text-sm list-disc pr-5 space-y-0.5">
              {weak.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}
        <details>
          <summary className="cursor-pointer text-sm font-semibold">مراجعة الإجابات</summary>
          <div className="mt-2 space-y-2">
            {questions.map((q, i) => (
              <div key={i} className="glass rounded-xl p-3 text-sm">
                <p className="font-semibold">{q.q}</p>
                <p className="text-xs text-muted-foreground">{q.lesson}</p>
                <p className="mt-1">
                  <span className={answers[i] === q.correct ? "text-success" : "text-destructive"}>
                    إجابتك: {answers[i] === null ? "لم تُجب" : q.options[answers[i]!]}
                  </span>
                  {answers[i] !== q.correct && (
                    <span className="text-success mr-3">الصحيحة: {q.options[q.correct]}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </details>
        <button
          onClick={onExit}
          className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          رجوع
        </button>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-2xl mx-auto">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>
          {title} • السؤال {idx + 1} من {questions.length}
        </span>
        {secondsPerQuestion ? (
          <span className={`font-mono ${left < 60 ? "text-destructive" : ""}`}>
            ⏱ {formatClock(left)}
          </span>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        {q.subject} • {q.lesson}
      </p>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
        <div className="h-full bg-hero" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <h3 className="text-xl font-bold mb-5">{q.q}</h3>
      <div className="grid gap-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className="text-right glass rounded-2xl p-4 hover:bg-primary/20 hover:border-primary border border-transparent transition font-semibold"
          >
            {o}
          </button>
        ))}
      </div>
      <button onClick={onExit} className="mt-4 text-xs text-muted-foreground hover:underline">
        إلغاء الاختبار
      </button>
    </div>
  );
}
