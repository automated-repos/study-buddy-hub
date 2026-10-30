import { useEffect, useRef, useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import {
  finishedLessons,
  hasAnswered,
  isFinished,
  lessonSequence,
  lessonsOfUnit,
  unitsOf,
} from "@/lib/progress";
import { setLessonsDone, setSubjectNotStarted, useDB } from "@/lib/store";

/** Per-subject checkboxes: tick each finished lesson, or a whole unit at once. */
export function LessonProgressEditor({ username }: { username: string }) {
  const db = useDB();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="space-y-3">
      {SUBJECTS.map((subject) => {
        const all = lessonSequence(subject);
        const done = finishedLessons(db.progress, username, subject);
        const answered = hasAnswered(db.progress, username, subject);
        const notStarted = answered && done.size === 0;
        return (
          <details
            key={subject}
            open={!answered}
            className={`glass rounded-2xl p-3 ${answered ? "" : "ring-2 ring-warning/60"}`}
          >
            <summary className="flex justify-between items-center cursor-pointer select-none">
              <span className="font-semibold">{subject}</span>
              <span className="text-xs text-muted-foreground">
                {!answered
                  ? "⚠️ لم يُحدَّد بعد"
                  : notStarted
                    ? "لم يبدأ بعد"
                    : `${done.size}/${all.length} درس`}
              </span>
            </summary>

            <div className="mt-3 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={notStarted}
                  disabled={busy || notStarted}
                  onChange={() => void run(() => setSubjectNotStarted(username, subject))}
                />
                لم أبدأ هذه المادة بعد
              </label>

              {unitsOf(subject).map((unit) => {
                const lessons = lessonsOfUnit(subject, unit);
                const count = lessons.filter((l) => isFinished(done, l)).length;
                return (
                  <div key={unit} className="border-t border-border pt-2">
                    <UnitCheckbox
                      label={unit}
                      checked={count === lessons.length}
                      partial={count > 0 && count < lessons.length}
                      disabled={busy}
                      onChange={(v) =>
                        void run(() => setLessonsDone(username, subject, lessons, v))
                      }
                    />
                    <div className="mr-6 mt-1 space-y-1">
                      {lessons.map((l) => (
                        <label key={l.lesson} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="size-4 accent-primary"
                            checked={isFinished(done, l)}
                            disabled={busy}
                            onChange={(e) =>
                              void run(() =>
                                setLessonsDone(username, subject, [l], e.target.checked),
                              )
                            }
                          />
                          {l.lesson}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        );
      })}
      {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
    </div>
  );
}

function UnitCheckbox({
  label,
  checked,
  partial,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  partial: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = partial;
  }, [partial]);
  return (
    <label className="flex items-center gap-2 text-sm font-bold">
      <input
        ref={ref}
        type="checkbox"
        className="size-4 accent-primary"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label} <span className="text-xs font-normal text-muted-foreground">(الوحدة كاملة)</span>
    </label>
  );
}
