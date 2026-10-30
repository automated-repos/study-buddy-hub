import { useState } from "react";
import confetti from "canvas-confetti";
import { MapView } from "@/components/MapView";
import { logAnswers } from "@/lib/answers";
import { useCurrentProfile } from "@/lib/store";
import { MAP_QUESTIONS, contextRefs, type MapQuestion } from "@/lib/mapQuestions";

interface Shown extends MapQuestion {
  shuffled: string[];
  correctIndex: number;
}

function prepare(list: MapQuestion[], count: number): Shown[] {
  return [...list]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((q) => {
      const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
      return { ...q, shuffled: order.map((i) => q.options[i]), correctIndex: order.indexOf(0) };
    });
}

/** Map questions: a highlighted map, choose the answer, see the labelled map after answering. */
export function MapQuiz() {
  const profile = useCurrentProfile();
  const [subject, setSubject] = useState<"all" | "جغرافيا" | "تاريخ">("all");
  const [count, setCount] = useState(10);
  const [qs, setQs] = useState<Shown[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const pool = MAP_QUESTIONS.filter((m) => subject === "all" || m.subject === subject);

  const start = () => {
    setQs(prepare(pool, count));
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (!qs)
    return (
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto space-y-4">
        <div>
          <h3 className="text-xl font-bold">🗺️ أسئلة على الخرائط</h3>
          <p className="text-sm text-muted-foreground">
            خرائط حقيقية تُلوَّن عليها دولة أو تُحدَّد عليها نقطة — اختر الإجابة الصحيحة. (
            {MAP_QUESTIONS.length} سؤالاً في الجغرافيا والتاريخ)
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["all", "الكل"],
              ["جغرافيا", "جغرافيا"],
              ["تاريخ", "تاريخ"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setSubject(k)}
              className={`rounded-2xl py-2 text-sm font-semibold border ${subject === k ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[10, 20].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 rounded-2xl py-2 text-sm font-bold border ${count === n ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
            >
              {n} أسئلة
            </button>
          ))}
        </div>
        <button
          onClick={start}
          className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          ابدأ
        </button>
      </div>
    );

  if (done) {
    const ratio = score / qs.length;
    return (
      <div className="bg-card-gradient rounded-3xl p-8 border border-border shadow-soft max-w-xl mx-auto text-center space-y-3">
        <div className="text-6xl">{ratio === 1 ? "🏆" : ratio >= 0.6 ? "🎉" : "💪"}</div>
        <h3 className="text-2xl font-bold">
          {score} / {qs.length}
        </h3>
        <p className="text-muted-foreground">
          {ratio >= 0.8
            ? "ممتاز! خريطتك الذهنية قوية."
            : ratio >= 0.6
              ? "جيد — راجع الخرائط في تبويب الملخصات."
              : "راجع الخرائط في تبويب الملخصات ثم أعد المحاولة."}
        </p>
        <button
          onClick={() => setQs(null)}
          className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          اختبار جديد
        </button>
      </div>
    );
  }

  const q = qs[idx];
  const answered = picked !== null;
  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    // saved in the original option order (right answer = index 0)
    if (profile)
      logAnswers(profile.username, "map", [
        {
          questionId: q.id,
          subject: q.subject,
          lesson: q.lesson,
          q: q.q,
          options: [...q.options],
          correct: 0,
          chosen: q.options.indexOf(q.shuffled[i] as (typeof q.options)[number]),
        },
      ]);
    if (i === q.correctIndex) {
      setScore((s) => s + 1);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };
  const next = () => {
    if (idx + 1 < qs.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else setDone(true);
  };

  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          السؤال {idx + 1} من {qs.length} • {q.subject}
        </span>
        <span>✅ {score}</span>
      </div>
      <MapView
        fit={q.fit}
        highlight={q.highlight}
        points={q.points}
        refs={contextRefs(q)}
        showLabels={answered}
      />
      <h3 className="text-lg font-bold">{q.q}</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {q.shuffled.map((o, i) => {
          const state = !answered
            ? ""
            : i === q.correctIndex
              ? "bg-success/25 border-success"
              : i === picked
                ? "bg-destructive/20 border-destructive"
                : "opacity-60";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`text-right glass rounded-2xl p-3 border border-transparent font-semibold transition ${state}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm">
            {picked === q.correctIndex ? "✅ إجابة صحيحة!" : `❌ الإجابة الصحيحة: ${q.options[0]}`}
            <span className="block text-xs text-muted-foreground">الدرس: {q.lesson}</span>
          </p>
          <button
            onClick={next}
            className="bg-hero text-primary-foreground font-bold px-5 py-2.5 rounded-2xl shadow-glow shrink-0"
          >
            {idx + 1 < qs.length ? "التالي ←" : "النتيجة"}
          </button>
        </div>
      )}
    </div>
  );
}

/** Study mode: the lesson's maps with the answer shown. */
export function LessonMaps({ subject, lesson }: { subject: string; lesson: string }) {
  const maps = MAP_QUESTIONS.filter((m) => m.subject === subject && m.lesson === lesson);
  if (!maps.length) return <p className="text-muted-foreground">لا توجد خرائط لهذا الدرس.</p>;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {maps.map((m) => (
        <div
          key={m.id}
          className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft space-y-2"
        >
          <MapView
            fit={m.fit}
            highlight={m.highlight}
            points={m.points}
            refs={contextRefs(m)}
            showLabels
          />
          <p className="text-sm">{m.q}</p>
          <p className="font-bold text-success">← {m.options[0]}</p>
        </div>
      ))}
    </div>
  );
}
