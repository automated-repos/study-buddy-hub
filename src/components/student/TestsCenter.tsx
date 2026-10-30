import { useState, type ReactNode } from "react";
import { SUBJECTS, getQuestionsFromLessons, type AIQuestion } from "@/lib/ai-content";
import { materialFor } from "@/lib/content";
import { finishedLessons, isFinished, lessonSequence, type LessonRef } from "@/lib/progress";
import { logReview, useCurrentProfile, useDB, type DB } from "@/lib/store";
import { QuizRunner } from "./QuizRunner";
import { MapQuiz } from "./MapQuiz";
import { Mistakes } from "@/components/Mistakes";

type Mode = "quick" | "comprehensive" | "biweekly" | "essay" | "maps" | "mistakes";

export function TestsCenter({ quick }: { quick: ReactNode }) {
  const me = useCurrentProfile()?.username ?? "";
  const [mode, setMode] = useState<Mode>("quick");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["quick", "⚡ اختبار سريع"],
            ["comprehensive", "📝 اختبار شامل"],
            ["biweekly", "🔁 مراجعة كل أسبوعين"],
            ["essay", "✍️ أسئلة مقالية"],
            ["maps", "🗺️ أسئلة الخرائط"],
            ["mistakes", "📕 أخطائي"],
          ] as [Mode, string][]
        ).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${mode === k ? "bg-hero text-primary-foreground shadow-glow" : "glass"}`}
          >
            {l}
          </button>
        ))}
      </div>
      {mode === "quick" && quick}
      {mode === "comprehensive" && <Comprehensive />}
      {mode === "biweekly" && <Biweekly />}
      {mode === "essay" && <EssayPractice />}
      {mode === "maps" && <MapQuiz />}
      {mode === "mistakes" && <Mistakes username={me} />}
    </div>
  );
}

/** Finished lessons per subject (all subjects when subject is null). */
function finishedBySubject(db: Pick<DB, "progress">, username: string, subject: string | null) {
  return (subject ? [subject] : SUBJECTS).map((s) => {
    const done = finishedLessons(db.progress, username, s);
    return { subject: s, lessons: lessonSequence(s).filter((l) => isFinished(done, l)) };
  });
}

/** Spread `count` questions across subjects in proportion to their lessons. */
function buildQuestions(
  groups: { subject: string; lessons: LessonRef[] }[],
  count: number,
): AIQuestion[] {
  const total = groups.reduce((a, g) => a + g.lessons.length, 0);
  if (!total) return [];
  const qs = groups.flatMap((g) =>
    g.lessons.length
      ? getQuestionsFromLessons(
          g.subject,
          g.lessons,
          Math.max(1, Math.round((count * g.lessons.length) / total)),
        )
      : [],
  );
  return qs.sort(() => Math.random() - 0.5).slice(0, count);
}

function Comprehensive() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [scope, setScope] = useState<"finished" | "all">("finished");
  const [count, setCount] = useState(20);
  const [timed, setTimed] = useState(true);
  const [qs, setQs] = useState<AIQuestion[] | null>(null);

  const groups =
    scope === "finished"
      ? finishedBySubject(db, profile.username, subject === "all" ? null : subject)
      : (subject === "all" ? SUBJECTS : [subject]).map((s) => ({
          subject: s,
          lessons: lessonSequence(s),
        }));
  const lessonCount = groups.reduce((a, g) => a + g.lessons.length, 0);

  if (qs)
    return (
      <QuizRunner
        questions={qs}
        title="اختبار شامل"
        logAs="comprehensive"
        secondsPerQuestion={timed ? 60 : undefined}
        onFinish={(score, total) =>
          void logReview(
            profile.username,
            "comprehensive",
            subject === "all" ? null : subject,
            score,
            total,
          ).catch(() => {})
        }
        onExit={() => setQs(null)}
      />
    );

  return (
    <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto space-y-4">
      <div>
        <h3 className="text-xl font-bold">📝 اختبار شامل</h3>
        <p className="text-sm text-muted-foreground">
          اختبار طويل يغطي مادة كاملة أو كل المواد — 5 نجوم عند النجاح (60%).
        </p>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">المادة</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-input rounded-2xl px-4 py-3 mt-1 outline-none"
        >
          <option value="all">كل المواد</option>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["finished", "الدروس التي أنهيتها"],
            ["all", "المنهج كاملاً"],
          ] as const
        ).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setScope(k)}
            className={`rounded-2xl py-2 text-sm font-semibold border ${scope === k ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {[20, 30, 40].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`flex-1 rounded-2xl py-2 text-sm font-bold border ${count === n ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
          >
            {n} سؤال
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4 accent-primary"
          checked={timed}
          onChange={(e) => setTimed(e.target.checked)}
        />
        بوقت محدد (دقيقة لكل سؤال) مثل الامتحان
      </label>
      <p className="text-xs text-muted-foreground">يشمل {lessonCount} درساً.</p>
      <button
        disabled={!lessonCount}
        onClick={() => setQs(buildQuestions(groups, count))}
        className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
      >
        {lessonCount ? "ابدأ الاختبار" : "لا توجد دروس منتهية — حدّدها من تبويب المواد"}
      </button>
    </div>
  );
}

function Biweekly() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const [qs, setQs] = useState<AIQuestion[] | null>(null);
  const history = db.reviews
    .filter((r) => r.ownerUsername === profile.username && r.kind === "biweekly")
    .sort((a, b) => b.takenAt - a.takenAt);
  const daysSince = history[0] ? Math.floor((Date.now() - history[0].takenAt) / 86_400_000) : null;
  const due = daysSince === null || daysSince >= 14;
  const groups = finishedBySubject(db, profile.username, null);
  const lessonCount = groups.reduce((a, g) => a + g.lessons.length, 0);

  if (qs)
    return (
      <QuizRunner
        questions={qs}
        title="المراجعة الشاملة"
        logAs="biweekly"
        secondsPerQuestion={60}
        onFinish={(score, total) =>
          void logReview(profile.username, "biweekly", null, score, total).catch(() => {})
        }
        onExit={() => setQs(null)}
      />
    );

  return (
    <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto space-y-4">
      <div>
        <h3 className="text-xl font-bold">🔁 المراجعة الشاملة كل أسبوعين</h3>
        <p className="text-sm text-muted-foreground">
          30 سؤالاً من كل الدروس التي أنهيتها في كل المواد، بوقت محدد. تمنحك 8 نجوم عند النجاح
          (60%).
        </p>
      </div>
      <div
        className={`rounded-2xl p-3 text-sm font-semibold ${due ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}
      >
        {due
          ? "⏰ المراجعة مستحقة الآن!"
          : `✅ أنجزت المراجعة — القادمة بعد ${14 - (daysSince ?? 0)} يوم`}
      </div>
      <div className="glass rounded-2xl p-3 text-sm">
        <p className="font-semibold mb-1">الدروس المشمولة ({lessonCount}):</p>
        {groups
          .filter((g) => g.lessons.length)
          .map((g) => (
            <p key={g.subject} className="text-muted-foreground">
              {g.subject}: {g.lessons.length} درس
            </p>
          ))}
      </div>
      <button
        disabled={!lessonCount}
        onClick={() => setQs(buildQuestions(groups, 30))}
        className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
      >
        {lessonCount
          ? due
            ? "ابدأ المراجعة"
            : "ابدأ مراجعة إضافية"
          : "حدّد الدروس المنتهية أولاً من تبويب المواد"}
      </button>
      {history.length > 0 && (
        <div>
          <p className="font-semibold text-sm mb-1">سجل المراجعات</p>
          <ul className="text-sm space-y-1">
            {history.slice(0, 6).map((r) => (
              <li key={r.id} className="flex justify-between glass rounded-xl px-3 py-1.5">
                <span>{new Date(r.takenAt).toLocaleDateString("ar-EG")}</span>
                <span className="font-bold">
                  {r.score} / {r.total} ({Math.round((r.score / Math.max(r.total, 1)) * 100)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const SELF_KEY = (u: string) => `mozakara_essay_self_${u}`;
type SelfRating = "good" | "partial" | "no";

function EssayPractice() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [lesson, setLesson] = useState(lessonSequence(SUBJECTS[0])[0].lesson);
  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState("");
  const [shown, setShown] = useState(false);
  const [ratings, setRatings] = useState<Record<string, SelfRating>>(() => {
    try {
      return JSON.parse(localStorage.getItem(SELF_KEY(profile.username)) ?? "{}");
    } catch {
      return {};
    }
  });

  const done = finishedLessons(db.progress, profile.username, subject);
  const essays = materialFor(subject, lesson, db.customSummaries).essays;
  const q = essays[qi];
  const key = `${subject}|${lesson}|${qi}`;

  const rate = (r: SelfRating) => {
    const next = { ...ratings, [key]: r };
    setRatings(next);
    localStorage.setItem(SELF_KEY(profile.username), JSON.stringify(next));
  };
  const go = (i: number) => {
    setQi(i);
    setAnswer("");
    setShown(false);
  };
  const counts = Object.values(ratings);

  return (
    <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-xl font-bold">✍️ أسئلة مقالية</h3>
        <p className="text-sm text-muted-foreground">
          اكتب إجابتك أولاً، ثم قارنها بالإجابة النموذجية وقيّم نفسك بصدق.
        </p>
        {counts.length > 0 && (
          <p className="text-xs mt-1">
            أجبت عن {counts.length} سؤالاً: ✅ {counts.filter((c) => c === "good").length} • 🟡{" "}
            {counts.filter((c) => c === "partial").length} • ❌{" "}
            {counts.filter((c) => c === "no").length}
          </p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setLesson(lessonSequence(e.target.value)[0].lesson);
            go(0);
          }}
          className="bg-input rounded-2xl px-4 py-3 outline-none"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={lesson}
          onChange={(e) => {
            setLesson(e.target.value);
            go(0);
          }}
          className="bg-input rounded-2xl px-4 py-3 outline-none"
        >
          {lessonSequence(subject).map((l) => (
            <option key={l.lesson} value={l.lesson}>
              {isFinished(done, l) ? "✓ " : ""}
              {l.lesson}
            </option>
          ))}
        </select>
      </div>

      {q ? (
        <>
          <div className="flex gap-1">
            {essays.map((_, i) => {
              const r = ratings[`${subject}|${lesson}|${i}`];
              return (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`size-8 rounded-full text-sm font-bold ${i === qi ? "bg-hero text-primary-foreground" : "glass"}`}
                >
                  {r === "good" ? "✅" : r === "partial" ? "🟡" : r === "no" ? "❌" : i + 1}
                </button>
              );
            })}
          </div>
          <p className="font-bold text-lg">{q[0]}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="اكتب إجابتك هنا..."
            className="w-full bg-input rounded-2xl px-4 py-3 outline-none"
            dir="auto"
          />
          {!shown ? (
            <button
              onClick={() => setShown(true)}
              className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
            >
              اعرض الإجابة النموذجية
            </button>
          ) : (
            <div className="space-y-3">
              <div
                className="rounded-2xl bg-success/10 border border-success/40 p-4 text-sm leading-relaxed"
                dir="auto"
              >
                <p className="font-bold text-success mb-1">الإجابة النموذجية:</p>
                {q[1]}
              </div>
              <p className="text-sm font-semibold">كيف كانت إجابتك؟</p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ["good", "✅ صحيحة"],
                    ["partial", "🟡 ناقصة"],
                    ["no", "❌ لم أعرف"],
                  ] as [SelfRating, string][]
                ).map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => {
                      rate(k);
                      if (qi + 1 < essays.length) go(qi + 1);
                    }}
                    className={`rounded-2xl py-2 text-sm font-semibold border ${ratings[key] === k ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground text-sm">لا توجد أسئلة مقالية لهذا الدرس.</p>
      )}
    </div>
  );
}
