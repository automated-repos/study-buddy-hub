import { getLessonsForUnit, getQuestionPool, getUnitsForSubject } from "@/lib/ai-content";

interface Props {
  subject: string;
  unit: string;
  lesson: string;
  onUnitChange: (unit: string) => void;
  onLessonChange: (lesson: string) => void;
}

/** Unit + lesson dropdowns for picking what a quiz or battle covers. Empty string = all. */
export function ScopePicker({ subject, unit, lesson, onUnitChange, onLessonChange }: Props) {
  if (!subject) return null;
  const units = getUnitsForSubject(subject);
  const lessons = unit ? getLessonsForUnit(subject, unit) : [];
  const available = getQuestionPool(subject, unit || undefined, lesson || undefined).length;

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">الوحدة / الفصل</label>
        <select
          value={unit}
          onChange={(e) => {
            onUnitChange(e.target.value);
            onLessonChange("");
          }}
          className="w-full bg-input rounded-2xl px-4 py-3 outline-none"
        >
          <option value="">كل الوحدات</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">الدرس</label>
        <select
          value={lesson}
          onChange={(e) => onLessonChange(e.target.value)}
          disabled={!unit}
          className="w-full bg-input rounded-2xl px-4 py-3 outline-none disabled:opacity-50"
        >
          <option value="">{unit ? "كل دروس الوحدة" : "اختر وحدة أولاً"}</option>
          {lessons.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-muted-foreground">الأسئلة المتاحة في هذا النطاق: {available}</p>
    </div>
  );
}
