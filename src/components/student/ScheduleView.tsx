import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { SUBJECTS } from "@/lib/ai-content";
import { finishedLessons, isFinished, lessonSequence } from "@/lib/progress";
import { dayMessage } from "@/lib/motivation";
import {
  addTasks,
  dateKey,
  deleteTask,
  updateTask,
  useCurrentProfile,
  useDB,
  type DB,
  type StudyTask,
} from "@/lib/store";
import { AchievementsCard } from "@/components/Motivation";

const WEEKDAYS = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

/** Suggested tasks: next unfinished lesson per subject, plus one review of a finished lesson. */
export function suggestTasks(db: Pick<DB, "progress">, username: string) {
  const out: { subject: string; title: string; minutes: number }[] = [];
  const reviews: { subject: string; title: string; minutes: number }[] = [];
  for (const subject of SUBJECTS) {
    const done = finishedLessons(db.progress, username, subject);
    const seq = lessonSequence(subject);
    const next = seq.find((l) => !isFinished(done, l));
    if (next) out.push({ subject, title: `ذاكر: ${next.lesson}`, minutes: 45 });
    const finished = seq.filter((l) => isFinished(done, l));
    if (finished.length) {
      const pick = finished[(new Date().getDate() + subject.length) % finished.length];
      reviews.push({ subject, title: `راجع: ${pick.lesson} + اختبار سريع`, minutes: 20 });
    }
  }
  return [...out.slice(0, 3), ...reviews.slice(0, 2)];
}

function dayStats(tasks: StudyTask[], minutes: number) {
  const done = tasks.filter((t) => t.done).length;
  const ratio = tasks.length ? done / tasks.length : minutes > 0 ? 1 : 0;
  return { done, total: tasks.length, ratio };
}

export function ScheduleView({ onOpenTests }: { onOpenTests: () => void }) {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const me = profile.username;
  const today = dateKey();
  const [selected, setSelected] = useState(today);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ subject: SUBJECTS[0], title: "", minutes: 30 });

  const myTasks = useMemo(() => db.tasks.filter((t) => t.ownerUsername === me), [db.tasks, me]);
  const minutesByDay = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of db.sessions)
      if (s.ownerUsername === me) m.set(s.date, (m.get(s.date) ?? 0) + s.minutes);
    return m;
  }, [db.sessions, me]);

  const dayTasks = myTasks
    .filter((t) => t.date === selected)
    .sort((a, b) => a.createdAt - b.createdAt);
  const dayMin = minutesByDay.get(selected) ?? 0;
  const stats = dayStats(dayTasks, dayMin);
  const msg = dayMessage(stats.ratio, dayMin);
  const isPast = selected < today;

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggle = (t: StudyTask) =>
    run(async () => {
      await updateTask(t.id, { done: !t.done });
      const nowDone = dayTasks.filter((x) => (x.id === t.id ? !t.done : x.done)).length;
      if (!t.done && nowDone === dayTasks.length)
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    });

  // biweekly review status
  const lastReview = db.reviews
    .filter((r) => r.ownerUsername === me && r.kind === "biweekly")
    .sort((a, b) => b.takenAt - a.takenAt)[0];
  const daysSince = lastReview ? Math.floor((Date.now() - lastReview.takenAt) / 86_400_000) : null;
  const reviewDue = daysSince === null || daysSince >= 14;

  return (
    <div className="space-y-6">
      {/* Day summary + motivational line */}
      <div className="bg-card-gradient rounded-3xl p-6 shadow-soft border border-border">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-muted-foreground text-sm">
              {selected === today ? "إنجاز اليوم" : `إنجاز يوم ${selected}`}
            </p>
            <h2 className="text-3xl font-bold">
              {stats.done} / {stats.total}{" "}
              <span className="text-base text-muted-foreground">مهمة</span>
              <span className="text-base text-muted-foreground"> • {dayMin} دقيقة</span>
            </h2>
          </div>
          <div className="text-5xl">{msg.icon}</div>
        </div>
        <div className="h-3 mt-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-hero transition-all"
            style={{ width: `${stats.ratio * 100}%` }}
          />
        </div>
        <p className="mt-3 font-semibold">{msg.text}</p>
      </div>

      {reviewDue ? (
        <button
          onClick={onOpenTests}
          className="w-full text-right rounded-3xl p-4 border-2 border-warning/50 bg-warning/10"
        >
          <span className="font-bold">🔁 حان وقت المراجعة الشاملة (كل أسبوعين)</span>
          <span className="block text-sm text-muted-foreground">
            اختبار على كل الدروس التي أنهيتها — يمنحك 8 نجوم عند النجاح. اضغط للبدء.
          </span>
        </button>
      ) : (
        <p className="text-sm text-muted-foreground">
          🔁 المراجعة الشاملة القادمة بعد {14 - (daysSince ?? 0)} يوم.
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tasks of the selected day */}
        <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-lg">📋 جدول {selected === today ? "اليوم" : selected}</h3>
            {!isPast && (
              <button
                disabled={busy}
                onClick={() =>
                  run(() =>
                    addTasks(
                      me,
                      suggestTasks(db, me).map((t) => ({ ...t, date: selected })),
                    ),
                  )
                }
                className="text-xs bg-hero text-primary-foreground font-bold px-3 py-2 rounded-xl shadow-glow disabled:opacity-50"
              >
                ✨ اقترح لي خطة
              </button>
            )}
          </div>

          {dayTasks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              لا توجد مهام لهذا اليوم. {isPast ? "" : "اضغط «اقترح لي خطة» أو أضف مهامك بنفسك."}
            </p>
          )}

          <ul className="space-y-2">
            {dayTasks.map((t) => (
              <li
                key={t.id}
                className={`glass rounded-2xl p-3 flex items-center gap-3 ${t.done ? "opacity-70" : ""}`}
              >
                <input
                  type="checkbox"
                  className="size-5 accent-primary"
                  checked={t.done}
                  disabled={busy}
                  onChange={() => void toggle(t)}
                />
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${t.done ? "line-through" : ""}`}>
                    {t.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.subject} • {t.minutes} دقيقة
                  </div>
                </div>
                <button
                  disabled={busy}
                  onClick={() => void run(() => deleteTask(t.id))}
                  className="text-xs text-destructive"
                  aria-label="حذف المهمة"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          {!isPast && (
            <div className="border-t border-border pt-3 space-y-2">
              <p className="text-xs text-muted-foreground">إضافة مهمة</p>
              <div className="flex gap-2">
                <select
                  value={draft.subject}
                  onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                  className="bg-input rounded-xl px-2 py-2 text-sm outline-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="مثال: حل تمارين الدرس الثاني"
                  className="flex-1 bg-input rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={5}
                  max={240}
                  step={5}
                  value={draft.minutes}
                  onChange={(e) => setDraft({ ...draft, minutes: Number(e.target.value) || 30 })}
                  className="w-24 bg-input rounded-xl px-3 py-2 text-sm outline-none"
                />
                <span className="text-xs text-muted-foreground">دقيقة</span>
                <button
                  disabled={busy || !draft.title.trim()}
                  onClick={() =>
                    run(async () => {
                      await addTasks(me, [{ ...draft, title: draft.title.trim(), date: selected }]);
                      setDraft({ ...draft, title: "" });
                    })
                  }
                  className="mr-auto bg-hero text-primary-foreground font-bold px-4 py-2 rounded-xl disabled:opacity-50 text-sm"
                >
                  ➕ إضافة
                </button>
              </div>
            </div>
          )}
          {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
        </div>

        {/* Calendar */}
        <Calendar
          month={month}
          setMonth={setMonth}
          selected={selected}
          setSelected={setSelected}
          today={today}
          score={(key) => {
            const tasks = myTasks.filter((t) => t.date === key);
            const min = minutesByDay.get(key) ?? 0;
            if (!tasks.length && !min) return null;
            return dayStats(tasks, min).ratio;
          }}
        />
      </div>

      <AchievementsCard username={me} />
    </div>
  );
}

function Calendar({
  month,
  setMonth,
  selected,
  setSelected,
  today,
  score,
}: {
  month: Date;
  setMonth: (d: Date) => void;
  selected: string;
  setSelected: (k: string) => void;
  today: string;
  score: (key: string) => number | null;
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: first.getDay() }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ];
  const color = (s: number | null) =>
    s === null
      ? ""
      : s >= 1
        ? "bg-success/70"
        : s >= 0.6
          ? "bg-success/45"
          : s >= 0.3
            ? "bg-warning/40"
            : "bg-destructive/30";

  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="glass rounded-xl px-3 py-1"
        >
          ›
        </button>
        <h3 className="font-bold">
          📅 {MONTHS[month.getMonth()]} {month.getFullYear()}
        </h3>
        <button
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="glass rounded-xl px-3 py-1"
        >
          ‹
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = dateKey(d);
          const s = score(key);
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`aspect-square rounded-xl text-sm font-semibold border transition ${color(s)} ${
                key === selected ? "border-primary ring-2 ring-primary/50" : "border-transparent"
              } ${key === today ? "underline" : ""} ${s === null ? "glass" : ""}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-muted-foreground">
        <span>
          <span className="inline-block size-3 rounded bg-success/70 align-middle" /> أنجز كل شيء
        </span>
        <span>
          <span className="inline-block size-3 rounded bg-success/45 align-middle" /> معظم الخطة
        </span>
        <span>
          <span className="inline-block size-3 rounded bg-warning/40 align-middle" /> جزء
        </span>
        <span>
          <span className="inline-block size-3 rounded bg-destructive/30 align-middle" /> قليل
        </span>
      </div>
    </div>
  );
}
