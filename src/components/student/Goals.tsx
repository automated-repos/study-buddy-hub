import { useMemo, useState, type ReactNode } from "react";
import confetti from "canvas-confetti";
import { SUBJECTS } from "@/lib/ai-content";
import { finishedLessons, isFinished, lessonSequence } from "@/lib/progress";
import {
  addTasks,
  dateKey,
  setLessonsDone,
  updateTask,
  useCurrentProfile,
  useDB,
  type GoalKind,
  type StudyTask,
} from "@/lib/store";
import {
  KIND_LABEL,
  addDays,
  buildWeekPlan,
  dayName,
  goalTitle,
  parseKey,
  reportMessage,
  setShown,
  wasShown,
  weekKeys,
  weekReport,
  weekStart,
  weekTasks,
} from "@/lib/goals";

// ── shared bits ──────────────────────────────────────────────────────────────

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

const chip = (on: boolean) =>
  `rounded-2xl px-3 py-2 text-sm font-semibold border ${on ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`;

/**
 * Ticking goals. When a "new lesson" goal is done and that lesson isn't marked finished yet,
 * it asks to mark it in the finished lessons list (reviews and free goals don't ask).
 */
export function useGoalToggle(siblings: StudyTask[]) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const [ask, setAsk] = useState<StudyTask | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const toggle = async (t: StudyTask) => {
    setBusy(true);
    setError("");
    try {
      await updateTask(t.id, { done: !t.done });
      if (t.done) return;
      const nowDone = siblings.filter((x) => (x.id === t.id ? true : x.done)).length;
      if (nowDone === siblings.length)
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      if (t.kind === "study" && t.unit && t.lesson) {
        const done = finishedLessons(db.progress, profile.username, t.subject);
        if (!isFinished(done, { unit: t.unit, lesson: t.lesson })) setAsk(t);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const markFinished = async () => {
    if (!ask?.unit || !ask.lesson) return;
    setBusy(true);
    try {
      await setLessonsDone(
        profile.username,
        ask.subject,
        [{ unit: ask.unit, lesson: ask.lesson }],
        true,
      );
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setAsk(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const prompt = ask && (
    <Modal onClose={() => setAsk(null)}>
      <div className="text-center space-y-2">
        <div className="text-5xl">🎉</div>
        <h3 className="text-xl font-bold">أحسنت! أنهيت مذاكرة درس جديد</h3>
        <p className="text-muted-foreground">
          {ask.subject} • {ask.lesson}
        </p>
        <p className="text-sm">
          لقد انتهيت من هذا الدرس — حدّده في قائمة الدروس المنتهية حتى يدخل في الاختبارات والمراجعات
          والمسابقات.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          disabled={busy}
          onClick={() => void markFinished()}
          className="flex-1 bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
        >
          ✅ حدّده كدرس منتهٍ
        </button>
        <button onClick={() => setAsk(null)} className="glass rounded-2xl px-4 font-semibold">
          ليس بعد
        </button>
      </div>
    </Modal>
  );

  return { toggle, busy, error, prompt };
}

/** One goal row with its checkbox, type badge and delete button. */
export function GoalRow({
  t,
  busy,
  onToggle,
  onDelete,
}: {
  t: StudyTask;
  busy: boolean;
  onToggle: () => void;
  onDelete?: () => void;
}) {
  return (
    <li className={`glass rounded-2xl p-3 flex items-center gap-3 ${t.done ? "opacity-70" : ""}`}>
      <input
        type="checkbox"
        className="size-5 accent-primary"
        checked={t.done}
        disabled={busy}
        onChange={onToggle}
      />
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${t.done ? "line-through" : ""}`}>{t.title}</div>
        <div className="text-xs text-muted-foreground">
          {KIND_LABEL[t.kind]} • {t.subject}
          {t.minutes ? ` • ${t.minutes} دقيقة` : ""}
        </div>
      </div>
      {onDelete && (
        <button
          disabled={busy}
          onClick={onDelete}
          className="text-xs text-destructive"
          aria-label="حذف الهدف"
        >
          🗑️
        </button>
      )}
    </li>
  );
}

// ── add a goal ───────────────────────────────────────────────────────────────

/** Add a goal for `date` (day) or for its week: a new lesson, a review, or free text. */
export function GoalForm({ date }: { date: string }) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const me = profile.username;
  const [kind, setKind] = useState<GoalKind>("study");
  const [scope, setScope] = useState<"day" | "week">("day");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [lessonKey, setLessonKey] = useState("");
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState(45);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const options = useMemo(() => {
    const done = finishedLessons(db.progress, me, subject);
    return lessonSequence(subject).filter((l) =>
      kind === "review" ? isFinished(done, l) : !isFinished(done, l),
    );
  }, [db.progress, me, subject, kind]);
  const chosen = options.find((l) => `${l.unit}\u0001${l.lesson}` === lessonKey) ?? options[0];
  const ready = kind === "custom" ? !!title.trim() : !!chosen;

  const add = async () => {
    if (!ready) return;
    setBusy(true);
    setError("");
    try {
      await addTasks(me, [
        {
          date: scope === "week" ? dateKey(weekStart(parseKey(date))) : date,
          scope,
          subject,
          kind,
          minutes: scope === "week" ? 0 : minutes,
          ...(kind === "custom"
            ? { title: title.trim() }
            : {
                title: goalTitle(kind, chosen!.lesson),
                unit: chosen!.unit,
                lesson: chosen!.lesson,
              }),
        },
      ]);
      setTitle("");
      setLessonKey("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border-t border-border pt-3 space-y-2">
      <p className="text-xs text-muted-foreground">إضافة هدف</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(KIND_LABEL) as GoalKind[]).map((k) => (
          <button
            key={k}
            onClick={() => {
              setKind(k);
              setLessonKey("");
              setMinutes(k === "review" ? 25 : 45);
            }}
            className={chip(kind === k)}
          >
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {(
          [
            ["day", "لهذا اليوم"],
            ["week", "لهذا الأسبوع"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} onClick={() => setScope(k)} className={`flex-1 ${chip(scope === k)}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setLessonKey("");
          }}
          className="bg-input rounded-xl px-2 py-2 text-sm outline-none"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {kind === "custom" ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: حل امتحان سابق كامل"
            className="flex-1 min-w-0 bg-input rounded-xl px-3 py-2 text-sm outline-none"
          />
        ) : (
          <select
            value={chosen ? `${chosen.unit}\u0001${chosen.lesson}` : ""}
            onChange={(e) => setLessonKey(e.target.value)}
            disabled={!options.length}
            className="flex-1 min-w-0 bg-input rounded-xl px-2 py-2 text-sm outline-none disabled:opacity-50"
          >
            {!options.length && (
              <option value="">
                {kind === "review" ? "لا توجد دروس منتهية بعد" : "أنهيت كل دروس المادة 🎉"}
              </option>
            )}
            {options.map((l) => (
              <option key={`${l.unit}\u0001${l.lesson}`} value={`${l.unit}\u0001${l.lesson}`}>
                {l.lesson}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {scope === "day" && (
          <>
            <input
              type="number"
              min={5}
              max={240}
              step={5}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value) || 30)}
              className="w-24 bg-input rounded-xl px-3 py-2 text-sm outline-none"
            />
            <span className="text-xs text-muted-foreground">دقيقة</span>
          </>
        )}
        <button
          disabled={busy || !ready}
          onClick={() => void add()}
          className="mr-auto bg-hero text-primary-foreground font-bold px-4 py-2 rounded-xl disabled:opacity-50 text-sm"
        >
          ➕ إضافة الهدف
        </button>
      </div>
      {kind === "study" && (
        <p className="text-[11px] text-muted-foreground">
          عند إنجاز هدف «درس جديد» سنذكّرك بتحديد الدرس كمنتهٍ.
        </p>
      )}
      {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
    </div>
  );
}

// ── this week ────────────────────────────────────────────────────────────────

export function WeekCard({ onPlan, onReport }: { onPlan: () => void; onReport: () => void }) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const start = weekStart();
  const { day, week } = weekTasks(db.tasks, profile.username, start);
  const all = [...day, ...week];
  const done = all.filter((t) => t.done).length;
  const { toggle, busy, error, prompt } = useGoalToggle(week);
  const keys = weekKeys(start);
  const today = dateKey();

  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-bold text-lg">🗓️ أهداف هذا الأسبوع</h3>
          <p className="text-xs text-muted-foreground">
            من السبت {keys[0].slice(5)} إلى الجمعة {keys[6].slice(5)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPlan}
            className="text-xs bg-hero text-primary-foreground font-bold px-3 py-2 rounded-xl shadow-glow"
          >
            ✨ اصنع جدول الأسبوع
          </button>
          <button onClick={onReport} className="text-xs glass font-bold px-3 py-2 rounded-xl">
            📊 التقرير
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>إنجاز الأسبوع (الأهداف + مهام الأيام)</span>
          <span className="font-bold">
            {done} / {all.length}
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-hero transition-all"
            style={{ width: `${all.length ? (done / all.length) * 100 : 0}%` }}
          />
        </div>
        {/* day strip: done / planned per day */}
        <div className="grid grid-cols-7 gap-1 mt-2">
          {keys.map((k) => {
            const ts = day.filter((t) => t.date === k);
            const d = ts.filter((t) => t.done).length;
            return (
              <div
                key={k}
                className={`rounded-xl p-1 text-center text-[10px] ${k === today ? "ring-2 ring-primary" : ""} ${
                  !ts.length
                    ? "glass"
                    : d === ts.length
                      ? "bg-success/40"
                      : d
                        ? "bg-warning/30"
                        : "bg-muted"
                }`}
              >
                <div className="font-semibold">{dayName(k).replace("ال", "")}</div>
                <div>{ts.length ? `${d}/${ts.length}` : "—"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {week.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          لا توجد أهداف أسبوعية بعد. أضف هدفاً «لهذا الأسبوع» مثل: أنهِ درسين في التاريخ.
        </p>
      ) : (
        <ul className="space-y-2">
          {week
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((t) => (
              <GoalRow key={t.id} t={t} busy={busy} onToggle={() => void toggle(t)} />
            ))}
        </ul>
      )}
      {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
      {prompt}
    </div>
  );
}

// ── weekly planner ───────────────────────────────────────────────────────────

export function WeekPlanner({ onClose }: { onClose: () => void }) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const me = profile.username;
  const today = new Date();
  // from today to the end of this week; on Friday plan the next week
  const startFrom = today.getDay() === 5 ? addDays(today, 1) : today;
  const end = addDays(weekStart(startFrom), 6);
  const allDays: string[] = [];
  for (let d = new Date(startFrom); d <= end; d = addDays(d, 1)) allDays.push(dateKey(d));

  const [subjects, setSubjects] = useState<string[]>([...SUBJECTS]);
  const [days, setDays] = useState<string[]>(
    allDays.filter((k) => parseKey(k).getDay() !== 5 || allDays.length === 1),
  );
  const [perDay, setPerDay] = useState(3);
  const [minutes, setMinutes] = useState(45);
  const [dailyReview, setDailyReview] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const chosen = SUBJECTS.filter((s) => subjects.includes(s));
  const plan = buildWeekPlan(db, me, {
    subjects: chosen,
    days: allDays.filter((k) => days.includes(k)),
    perDay,
    minutes,
    dailyReview,
  });
  const existing = db.tasks.filter(
    (t) => t.ownerUsername === me && t.scope === "day" && days.includes(t.date),
  ).length;
  const byDay = allDays
    .filter((k) => days.includes(k))
    .map((k) => ({ k, items: plan.filter((p) => p.date === k) }));
  const totalMin = plan.reduce((a, p) => a + p.minutes, 0);

  const apply = async () => {
    setBusy(true);
    setError("");
    try {
      await addTasks(me, plan);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggleIn = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <Modal onClose={onClose}>
      <div>
        <h3 className="text-xl font-bold">✨ اصنع جدول الأسبوع</h3>
        <p className="text-sm text-muted-foreground">
          نوزّع موادك على الأيام بالتناوب، ولكل مادة الدرس التالي الذي لم تنهه بعد، مع مراجعة لدرس
          قديم كل يوم حتى لا تنساه.
        </p>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">المواد</p>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => toggleIn(subjects, setSubjects, s)}
              className={chip(subjects.includes(s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">أيام المذاكرة</p>
        <div className="flex flex-wrap gap-2">
          {allDays.map((k) => (
            <button
              key={k}
              onClick={() => toggleIn(days, setDays, k)}
              className={chip(days.includes(k))}
            >
              {dayName(k)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">عدد المواد يومياً</p>
          <div className="flex gap-1">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setPerDay(n)}
                className={`flex-1 ${chip(perDay === n)}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">مدة الدرس الجديد</p>
          <div className="flex gap-1">
            {[30, 45, 60].map((n) => (
              <button
                key={n}
                onClick={() => setMinutes(n)}
                className={`flex-1 ${chip(minutes === n)}`}
              >
                {n}د
              </button>
            ))}
          </div>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4 accent-primary"
          checked={dailyReview}
          onChange={(e) => setDailyReview(e.target.checked)}
        />
        مراجعة يومية لدرس قديم (20 دقيقة + اختبار سريع)
      </label>

      <div className="space-y-2">
        <p className="font-semibold text-sm">
          معاينة الجدول — {plan.length} مهمة • حوالي{" "}
          {Math.round(totalMin / Math.max(byDay.length, 1))} دقيقة يومياً
        </p>
        {byDay.map(({ k, items }) => (
          <div key={k} className="glass rounded-2xl p-3">
            <p className="text-xs font-bold mb-1">
              {dayName(k)} <span className="text-muted-foreground font-normal">{k.slice(5)}</span>
            </p>
            {items.length ? (
              <ul className="text-xs space-y-0.5">
                {items.map((p, i) => (
                  <li key={i}>
                    {p.kind === "review" ? "🔁" : "📖"} <b>{p.subject}</b>: {p.lesson} ({p.minutes}
                    د)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">لا شيء</p>
            )}
          </div>
        ))}
        {existing > 0 && (
          <p className="text-xs text-warning">
            لديك {existing} مهمة في هذه الأيام بالفعل — ستُضاف المهام الجديدة إليها.
          </p>
        )}
      </div>

      {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
      <div className="flex gap-2">
        <button
          disabled={busy || !plan.length}
          onClick={() => void apply()}
          className="flex-1 bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
        >
          اعتمد الجدول ✅
        </button>
        <button onClick={onClose} className="glass rounded-2xl px-4 font-semibold">
          إلغاء
        </button>
      </div>
    </Modal>
  );
}

// ── week report ──────────────────────────────────────────────────────────────

/** Report for the week that starts on `start`; can move unfinished goals to today. */
export function WeekReportModal({
  start,
  onClose,
  onPlan,
}: {
  start: Date;
  onClose: () => void;
  onPlan: () => void;
}) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const r = weekReport(db, profile.username, start);
  const msg = reportMessage(r);
  const pct = r.total ? Math.round((r.done / r.total) * 100) : 0;
  const isCurrent = dateKey(start) === dateKey(weekStart());
  const [busy, setBusy] = useState(false);
  const carry = r.undone.filter((t) => t.scope === "day" && t.date < dateKey());

  const moveToToday = async () => {
    setBusy(true);
    try {
      for (const t of carry) await updateTask(t.id, { date: dateKey() });
    } finally {
      setBusy(false);
    }
  };

  const stat = (icon: string, value: ReactNode, label: string) => (
    <div className="glass rounded-2xl p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="text-xl font-black">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-6xl">{msg.icon}</div>
        <h3 className="text-2xl font-bold mt-2">
          {isCurrent ? "تقرير الأسبوع حتى الآن" : "تقرير الأسبوع الماضي"}
        </h3>
        <p className="text-xs text-muted-foreground">
          {weekKeys(start)[0]} → {weekKeys(start)[6]}
        </p>
        <p className="font-semibold mt-2">{msg.text}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stat("🎯", `${pct}%`, `${r.done} من ${r.total} هدف`)}
        {stat("📖", r.lessonsFinished.length, "دروس أنهيتها")}
        {stat("⏱", Math.round(r.minutes / 6) / 10, "ساعة مذاكرة")}
        {stat("📚", r.studyDone, "مهام دروس جديدة")}
        {stat("🔁", r.reviewDone, "مراجعات")}
        {stat("🗓️", `${r.weekGoals.done}/${r.weekGoals.total}`, "أهداف أسبوعية")}
      </div>

      {r.bestDay && (
        <p className="text-sm">
          🌟 أفضل أيامك: <b>{dayName(r.bestDay.key)}</b> ({r.bestDay.minutes} دقيقة)
        </p>
      )}

      {r.bySubject.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-semibold">حسب المادة</p>
          {r.bySubject.map((s) => (
            <div key={s.subject} className="flex items-center gap-2 text-xs">
              <span className="w-16 shrink-0">{s.subject}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-hero" style={{ width: `${(s.done / s.total) * 100}%` }} />
              </div>
              <span className="w-10 text-left">
                {s.done}/{s.total}
              </span>
            </div>
          ))}
        </div>
      )}

      {r.lessonsFinished.length > 0 && (
        <div className="text-xs text-muted-foreground">
          <p className="font-semibold text-foreground text-sm mb-1">✅ دروس أنهيتها</p>
          {r.lessonsFinished.map((l) => `${l.subject}: ${l.lesson}`).join(" • ")}
        </div>
      )}

      {carry.length > 0 && (
        <button
          disabled={busy}
          onClick={() => void moveToToday()}
          className="w-full glass rounded-2xl py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          ↪️ انقل {carry.length} مهمة لم تُنجز إلى اليوم
        </button>
      )}
      <div className="flex gap-2">
        <button
          onClick={onPlan}
          className="flex-1 bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          ✨ اصنع جدول {isCurrent ? "باقي الأسبوع" : "الأسبوع الجديد"}
        </button>
        <button onClick={onClose} className="glass rounded-2xl px-4 font-semibold">
          إغلاق
        </button>
      </div>
    </Modal>
  );
}

// ── opening reminders ────────────────────────────────────────────────────────

/**
 * Shown when the student opens the app: last week's report on the first visit of a new week,
 * otherwise once a day a reminder of today's and this week's goals.
 */
export function GoalsReminder({ onOpenGoals }: { onOpenGoals: () => void }) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const me = profile.username;
  const thisWeek = weekStart();
  const lastWeek = addDays(thisWeek, -7);
  const reportKey = `mozakara_week_report_${me}_${dateKey(thisWeek)}`;
  const dayKey = `mozakara_goals_reminder_${me}_${dateKey()}`;
  const last = weekReport(db, me, lastWeek);
  const hadLastWeek = last.total > 0 || last.minutes > 0;
  const [mode, setMode] = useState<"report" | "day" | "plan" | null>(() =>
    hadLastWeek && !wasShown(reportKey) ? "report" : !wasShown(dayKey) ? "day" : null,
  );

  const close = () => {
    setShown(reportKey);
    setShown(dayKey);
    setMode(null);
  };

  if (mode === "plan") return <WeekPlanner onClose={close} />;
  if (mode === "report")
    return (
      <WeekReportModal
        start={lastWeek}
        onClose={() => {
          setShown(reportKey);
          setMode(wasShown(dayKey) ? null : "day");
        }}
        onPlan={() => {
          setShown(reportKey);
          setMode("plan");
        }}
      />
    );
  if (mode !== "day") return null;

  const { day, week } = weekTasks(db.tasks, me, thisWeek);
  const todays = day.filter((t) => t.date === dateKey());
  const left = todays.filter((t) => !t.done);
  const weekLeft = week.filter((t) => !t.done);
  const hour = new Date().getHours();
  const hello = hour < 12 ? "صباح الخير" : hour < 18 ? "مساء النور" : "مساء الخير";

  return (
    <Modal onClose={close}>
      <div className="text-center">
        <div className="text-5xl">🎯</div>
        <h3 className="text-xl font-bold mt-1">
          {hello} يا {profile.displayName}!
        </h3>
      </div>
      {todays.length ? (
        <div>
          <p className="font-semibold text-sm mb-1">
            أهداف اليوم ({todays.length - left.length}/{todays.length} منجزة)
          </p>
          <ul className="text-sm space-y-1">
            {todays.slice(0, 6).map((t) => (
              <li key={t.id} className={t.done ? "line-through text-muted-foreground" : ""}>
                {t.kind === "review" ? "🔁" : t.kind === "study" ? "📖" : "✍️"} {t.subject}:{" "}
                {t.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          لا توجد أهداف لليوم بعد — ضع هدفاً واحداً على الأقل أو اصنع جدول الأسبوع بضغطة.
        </p>
      )}
      {week.length > 0 && (
        <div>
          <p className="font-semibold text-sm mb-1">
            أهداف الأسبوع ({week.length - weekLeft.length}/{week.length})
          </p>
          <ul className="text-sm space-y-1">
            {weekLeft.slice(0, 4).map((t) => (
              <li key={t.id}>
                🗓️ {t.subject}: {t.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => {
            close();
            onOpenGoals();
          }}
          className="flex-1 bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
        >
          {todays.length ? "يلا نبدأ 💪" : "ضع أهدافي"}
        </button>
        {!todays.length && (
          <button onClick={() => setMode("plan")} className="glass rounded-2xl px-4 font-semibold">
            ✨ جدول الأسبوع
          </button>
        )}
      </div>
    </Modal>
  );
}
