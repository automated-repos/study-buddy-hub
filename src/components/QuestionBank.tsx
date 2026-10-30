import { useState } from "react";
import {
  SUBJECTS,
  activeQuestions,
  hiddenBuiltInQuestions,
  isBuiltInQuestion,
  type AIQuestion,
} from "@/lib/ai-content";
import { lessonsOfUnit, unitsOf } from "@/lib/progress";
import { deleteQuestion, restoreQuestion, saveQuestion, uid, useDB } from "@/lib/store";

type Difficulty = AIQuestion["difficulty"];
const DIFF_LABEL: Record<Difficulty, string> = { easy: "سهل", medium: "متوسط", hard: "صعب" };

interface Draft {
  id: string;
  q: string;
  options: string[];
  correct: number;
  difficulty: Difficulty;
}

/** Supervisor screen: browse questions per lesson, add new ones, edit or delete any question. */
export function QuestionBank() {
  const db = useDB(); // re-render when custom_questions reloads
  const me = db.currentUsername ?? "";
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [unit, setUnit] = useState(unitsOf(SUBJECTS[0])[0]);
  const [lesson, setLesson] = useState(
    lessonsOfUnit(SUBJECTS[0], unitsOf(SUBJECTS[0])[0])[0].lesson,
  );
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const questions = activeQuestions().filter((q) => q.subject === subject && q.lesson === lesson);
  const hidden = hiddenBuiltInQuestions(subject, lesson);
  const editedIds = new Set(db.questionEdits.filter((e) => !e.hidden).map((e) => e.id));

  const pickSubject = (s: string) => {
    const u = unitsOf(s)[0];
    setSubject(s);
    setUnit(u);
    setLesson(lessonsOfUnit(s, u)[0].lesson);
    setDraft(null);
  };
  const pickUnit = (u: string) => {
    setUnit(u);
    setLesson(lessonsOfUnit(subject, u)[0].lesson);
    setDraft(null);
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const draftProblem = (d: Draft): string | null => {
    if (!d.q.trim()) return "اكتب نص السؤال.";
    if (d.options.some((o) => !o.trim())) return "اكتب الاختيارات الأربعة.";
    if (new Set(d.options.map((o) => o.trim())).size < 4) return "يجب أن تكون الاختيارات مختلفة.";
    return null;
  };

  const save = async () => {
    if (!draft) return;
    const problem = draftProblem(draft);
    if (problem) return setError(problem);
    const ok = await run(() =>
      saveQuestion(
        {
          id: draft.id,
          subject,
          unit,
          lesson,
          q: draft.q.trim(),
          options: draft.options.map((o) => o.trim()),
          correct: draft.correct,
          difficulty: draft.difficulty,
        },
        me,
      ),
    );
    if (ok) setDraft(null);
  };

  const remove = (q: AIQuestion) => {
    if (!confirm("حذف هذا السؤال؟")) return;
    void run(() => deleteQuestion(q, isBuiltInQuestion(q.id), me));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">بنك الأسئلة</h1>
        <p className="text-muted-foreground mt-1">
          أضف أسئلة من كتاب المدرسة، أو عدّل واحذف أي سؤال غير صحيح. التغييرات تظهر فوراً في
          الاختبارات والمسابقات.
        </p>
      </div>

      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft grid md:grid-cols-3 gap-3">
        <Select label="المادة" value={subject} onChange={pickSubject} options={SUBJECTS} />
        <Select label="الوحدة" value={unit} onChange={pickUnit} options={unitsOf(subject)} />
        <Select
          label="الدرس"
          value={lesson}
          onChange={(l) => {
            setLesson(l);
            setDraft(null);
          }}
          options={lessonsOfUnit(subject, unit).map((l) => l.lesson)}
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          {questions.length} سؤال في «{lesson}»
        </h3>
        <button
          onClick={() =>
            setDraft({
              id: `c-${uid()}`,
              q: "",
              options: ["", "", "", ""],
              correct: 0,
              difficulty: "medium",
            })
          }
          className="bg-hero text-primary-foreground font-bold px-4 py-2 rounded-2xl shadow-glow"
        >
          ➕ إضافة سؤال
        </button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {draft && (
        <Editor
          draft={draft}
          isNew={!activeQuestions().some((q) => q.id === draft.id)}
          setDraft={setDraft}
          busy={busy}
          onSave={save}
          onCancel={() => setDraft(null)}
        />
      )}

      <div className="space-y-3">
        {questions.map((q, i) => {
          const builtIn = isBuiltInQuestion(q.id);
          const edited = builtIn && editedIds.has(q.id);
          return (
            <div key={q.id} className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">
                  {i + 1}. {q.q}
                </p>
                <div className="flex gap-1 shrink-0 text-xs">
                  {!builtIn && <Badge className="bg-success/20 text-success">مُضاف</Badge>}
                  {edited && <Badge className="bg-warning/20 text-warning">معدّل</Badge>}
                  <Badge className="bg-muted text-muted-foreground">
                    {DIFF_LABEL[q.difficulty]}
                  </Badge>
                </div>
              </div>
              <ul className="mt-2 grid sm:grid-cols-2 gap-1 text-sm">
                {q.options.map((o, j) => (
                  <li
                    key={j}
                    className={
                      j === q.correct ? "text-success font-semibold" : "text-muted-foreground"
                    }
                  >
                    {j === q.correct ? "✓ " : "• "}
                    {o}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-3 text-xs">
                <button
                  disabled={busy}
                  onClick={() =>
                    setDraft({
                      id: q.id,
                      q: q.q,
                      options: [...q.options],
                      correct: q.correct,
                      difficulty: q.difficulty,
                    })
                  }
                  className="text-primary hover:underline"
                >
                  ✏️ تعديل
                </button>
                <button
                  disabled={busy}
                  onClick={() => remove(q)}
                  className="text-destructive hover:underline"
                >
                  🗑️ حذف
                </button>
                {edited && (
                  <button
                    disabled={busy}
                    onClick={() => void run(() => restoreQuestion(q.id))}
                    className="text-muted-foreground hover:underline"
                  >
                    ↩️ استرجاع النص الأصلي
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hidden.length > 0 && (
        <details className="glass rounded-2xl p-4">
          <summary className="cursor-pointer font-semibold text-sm">
            أسئلة محذوفة من هذا الدرس ({hidden.length})
          </summary>
          <div className="mt-3 space-y-2">
            {hidden.map((q) => (
              <div key={q.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground line-through">{q.q}</span>
                <button
                  disabled={busy}
                  onClick={() => void run(() => restoreQuestion(q.id))}
                  className="text-primary text-xs hover:underline shrink-0"
                >
                  استعادة
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function Editor({
  draft,
  isNew,
  setDraft,
  busy,
  onSave,
  onCancel,
}: {
  draft: Draft;
  isNew: boolean;
  setDraft: (d: Draft) => void;
  busy: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border-2 border-primary/40 shadow-soft space-y-3">
      <h3 className="font-bold">{isNew ? "سؤال جديد" : "تعديل سؤال"}</h3>
      <textarea
        value={draft.q}
        onChange={(e) => setDraft({ ...draft, q: e.target.value })}
        placeholder="نص السؤال"
        rows={2}
        className="w-full bg-input rounded-2xl px-4 py-3 outline-none"
      />
      <p className="text-xs text-muted-foreground">
        اكتب الاختيارات الأربعة واختر الإجابة الصحيحة:
      </p>
      {draft.options.map((o, i) => (
        <label key={i} className="flex items-center gap-2">
          <input
            type="radio"
            name="correct"
            className="size-4 accent-primary"
            checked={draft.correct === i}
            onChange={() => setDraft({ ...draft, correct: i })}
          />
          <input
            value={o}
            onChange={(e) => {
              const options = [...draft.options];
              options[i] = e.target.value;
              setDraft({ ...draft, options });
            }}
            placeholder={`الاختيار ${i + 1}`}
            className={`flex-1 bg-input rounded-xl px-3 py-2 outline-none ${draft.correct === i ? "ring-2 ring-success/60" : ""}`}
          />
        </label>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">الصعوبة:</span>
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => setDraft({ ...draft, difficulty: d })}
            className={`text-xs px-3 py-1 rounded-xl border ${draft.difficulty === d ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
          >
            {DIFF_LABEL[d]}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={busy}
          className="flex-1 bg-hero text-primary-foreground font-bold py-2.5 rounded-2xl shadow-glow disabled:opacity-50"
        >
          {busy ? "جارٍ الحفظ..." : "حفظ السؤال"}
        </button>
        <button onClick={onCancel} className="glass rounded-2xl px-5 py-2.5 font-semibold">
          إلغاء
        </button>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-input rounded-2xl px-4 py-3 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`rounded-full px-2 py-0.5 font-bold ${className}`}>{children}</span>;
}
