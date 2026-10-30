import { useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import { finishedIndex, lessonSequence } from "@/lib/progress";
import { setLessonProgress, useDB } from "@/lib/store";

/** Per-subject "last finished lesson" pickers for one student. */
export function LessonProgressEditor({
  username,
  compact = false,
}: {
  username: string;
  compact?: boolean;
}) {
  const db = useDB();
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");

  const save = async (subject: string, value: string) => {
    setSaving(subject);
    setError("");
    try {
      const seq = lessonSequence(subject);
      await setLessonProgress(username, subject, value === "" ? null : seq[Number(value)]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {SUBJECTS.map((subject) => {
        const seq = lessonSequence(subject);
        const idx = finishedIndex(db.progress, username, subject);
        const pct = Math.round(((idx + 1) / seq.length) * 100);
        const units = [...new Set(seq.map((l) => l.unit))];
        return (
          <div key={subject} className={compact ? "" : "glass rounded-2xl p-3"}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold">{subject}</span>
              <span className="text-muted-foreground">
                {idx + 1}/{seq.length} درس ({pct}%)
              </span>
            </div>
            <select
              value={idx >= 0 ? String(idx) : ""}
              disabled={saving === subject}
              onChange={(e) => void save(subject, e.target.value)}
              className="w-full bg-input rounded-xl px-3 py-2 text-sm outline-none disabled:opacity-50"
            >
              <option value="">لم يبدأ بعد</option>
              {units.map((u) => (
                <optgroup key={u} label={u}>
                  {seq.map((l, i) =>
                    l.unit === u ? (
                      <option key={i} value={i}>
                        {l.lesson}
                      </option>
                    ) : null,
                  )}
                </optgroup>
              ))}
            </select>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-success-gradient transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      {error && <p className="text-xs text-destructive">تعذّر الحفظ: {error}</p>}
    </div>
  );
}
