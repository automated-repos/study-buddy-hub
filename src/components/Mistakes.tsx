import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { MapView } from "@/components/MapView";
import {
  SOURCE_LABEL,
  currentMistakes,
  logAnswers,
  useAnswerLog,
  type Mistake,
} from "@/lib/answers";
import { MAP_QUESTIONS, contextRefs } from "@/lib/mapQuestions";

const fmtDate = (t: number) =>
  new Date(t).toLocaleDateString("ar-EG", { day: "numeric", month: "short" });

/**
 * Questions the student got wrong (latest answer wrong), grouped by subject and lesson.
 * Students can re-test themselves; the supervisor sees the same list read-only.
 */
export function Mistakes({ username, readOnly = false }: { username: string; readOnly?: boolean }) {
  const { rows, error, loading, reload } = useAnswerLog(username);
  const [subject, setSubject] = useState<string>("all");
  const [reviewing, setReviewing] = useState<Mistake[] | null>(null);

  const mistakes = useMemo(() => currentMistakes(rows), [rows]);
  const subjects = [...new Set(mistakes.map((m) => m.last.subject))];
  const shown = mistakes.filter((m) => subject === "all" || m.last.subject === subject);
  const answered = rows.length;
  const correct = rows.filter((r) => r.isCorrect).length;
  const fixed = new Set(
    rows.filter((r) => r.source === "review" && r.isCorrect).map((r) => r.questionId),
  ).size;

  if (reviewing)
    return (
      <ReviewRun
        items={reviewing}
        username={username}
        onExit={() => {
          setReviewing(null);
          void reload();
        }}
      />
    );

  // group by lesson
  const byLesson = new Map<string, Mistake[]>();
  for (const m of shown) {
    const k = `${m.last.subject} • ${m.last.lesson}`;
    byLesson.set(k, [...(byLesson.get(k) ?? []), m]);
  }

  return (
    <div className="space-y-4">
      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="text-xl font-bold">📕 {readOnly ? "أخطاء الطالب" : "مراجعة أخطائي"}</h3>
        <p className="text-sm text-muted-foreground">
          الأسئلة التي كانت آخر إجابة عنها خاطئة — من الاختبارات والمسابقات وأسئلة الخرائط. تختفي من
          القائمة عند الإجابة عنها صح.
        </p>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center">
          <Stat label="إجابات مسجلة" value={answered} />
          <Stat
            label="نسبة الصواب"
            value={answered ? `${Math.round((correct / answered) * 100)}%` : "—"}
          />
          <Stat label="أخطاء حالية" value={mistakes.length} />
          <Stat label="أخطاء تم تصحيحها" value={fixed} />
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">جارٍ التحميل…</p>}
      {!loading && !error && mistakes.length === 0 && (
        <p className="text-muted-foreground">
          🎉 لا توجد أخطاء حالية{answered ? " — أحسنت!" : "، ابدأ بحل الاختبارات."}
        </p>
      )}

      {mistakes.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {["all", ...subjects].map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`rounded-2xl px-3 py-1.5 text-sm font-semibold ${subject === s ? "bg-hero text-primary-foreground" : "glass"}`}
            >
              {s === "all"
                ? `الكل (${mistakes.length})`
                : `${s} (${mistakes.filter((m) => m.last.subject === s).length})`}
            </button>
          ))}
          {!readOnly && shown.length > 0 && (
            <button
              onClick={() => setReviewing([...shown].sort(() => Math.random() - 0.5).slice(0, 20))}
              className="mr-auto bg-hero text-primary-foreground font-bold px-4 py-2 rounded-2xl shadow-glow"
            >
              🔁 راجع هذه الأخطاء ({Math.min(shown.length, 20)})
            </button>
          )}
        </div>
      )}

      {[...byLesson.entries()].map(([lesson, list]) => (
        <details
          key={lesson}
          className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft"
        >
          <summary className="cursor-pointer font-semibold flex justify-between">
            <span>{lesson}</span>
            <span className="text-sm text-destructive">{list.length} خطأ</span>
          </summary>
          <div className="mt-3 space-y-2">
            {list.map(({ last, wrongCount }) => (
              <div key={last.questionId} className="glass rounded-2xl p-3 text-sm">
                <p className="font-semibold">{last.q}</p>
                <p className="mt-1">
                  <span className="text-destructive">
                    ✗ أجاب: {last.chosen === null ? "لم يُجب" : last.options[last.chosen]}
                  </span>
                  <span className="text-success mr-3">✓ الصحيحة: {last.options[last.correct]}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {SOURCE_LABEL[last.source]} • {fmtDate(last.createdAt)}
                  {wrongCount > 1 && ` • أخطأ فيه ${wrongCount} مرات`}
                </p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-2xl p-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
}

/** Re-test on past mistakes; each answer is saved as source "review". */
function ReviewRun({
  items,
  username,
  onExit,
}: {
  items: Mistake[];
  username: string;
  onExit: () => void;
}) {
  const qs = useMemo(
    () =>
      items.map(({ last }) => {
        const order = last.options.map((_, i) => i).sort(() => Math.random() - 0.5);
        return { last, order };
      }),
    [items],
  );
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="bg-card-gradient rounded-3xl p-8 border border-border shadow-soft max-w-xl mx-auto text-center space-y-3">
        <div className="text-6xl">{score === qs.length ? "🏆" : "💪"}</div>
        <h3 className="text-2xl font-bold">
          صححت {score} من {qs.length}
        </h3>
        <p className="text-muted-foreground">الأسئلة التي أجبت عنها صح خرجت من قائمة أخطائك.</p>
        <button
          onClick={onExit}
          className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          رجوع لقائمة الأخطاء
        </button>
      </div>
    );

  const { last, order } = qs[idx];
  const map =
    last.source === "map" ? MAP_QUESTIONS.find((m) => m.id === last.questionId) : undefined;
  const answered = picked !== null;
  const choose = (shownIdx: number) => {
    if (answered) return;
    const original = order[shownIdx];
    setPicked(shownIdx);
    const ok = original === last.correct;
    if (ok) {
      setScore((s) => s + 1);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
    logAnswers(username, "review", [
      {
        questionId: last.questionId,
        subject: last.subject,
        lesson: last.lesson,
        q: last.q,
        options: last.options,
        correct: last.correct,
        chosen: original,
      },
    ]);
  };

  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          مراجعة الأخطاء • {idx + 1} من {qs.length}
        </span>
        <span>
          {last.subject} • {last.lesson}
        </span>
      </div>
      {map && (
        <MapView
          fit={map.fit}
          highlight={map.highlight}
          points={map.points}
          refs={contextRefs(map)}
          showLabels={answered}
        />
      )}
      <h3 className="text-lg font-bold">{last.q}</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {order.map((orig, i) => {
          const state = !answered
            ? ""
            : orig === last.correct
              ? "bg-success/25 border-success"
              : i === picked
                ? "bg-destructive/20 border-destructive"
                : "opacity-60";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`text-right glass rounded-2xl p-3 border border-transparent font-semibold ${state}`}
            >
              {last.options[orig]}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <button onClick={onExit} className="text-xs text-muted-foreground hover:underline">
          إنهاء المراجعة
        </button>
        {answered && (
          <button
            onClick={() => {
              if (idx + 1 < qs.length) {
                setIdx(idx + 1);
                setPicked(null);
              } else setDone(true);
            }}
            className="bg-hero text-primary-foreground font-bold px-5 py-2.5 rounded-2xl shadow-glow"
          >
            {idx + 1 < qs.length ? "التالي ←" : "النتيجة"}
          </button>
        )}
      </div>
    </div>
  );
}
