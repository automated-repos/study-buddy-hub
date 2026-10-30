import { useEffect, useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import { materialFor, type LessonMaterial, type MaterialEdit } from "@/lib/content";
import { lessonsOfUnit, unitsOf } from "@/lib/progress";
import { deleteCustomSummary, saveCustomSummary, useDB } from "@/lib/store";

// Text formats used by the editor
const SEP = " | ";
const toTableText = (m: LessonMaterial) =>
  [m.table.headers.join(SEP), ...m.table.rows.map((r) => r.join(SEP))].join("\n");
const toMapText = (m: LessonMaterial) =>
  m.map.map((b) => `${b.label}: ${b.items.join("، ")}`).join("\n");

function parseTable(title: string, text: string): MaterialEdit["table"] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const split = (l: string) => l.split("|").map((c) => c.trim());
  const headers = lines[0] ? split(lines[0]) : [];
  const rows = lines.slice(1).map((l) => {
    const cells = split(l);
    return headers.map((_, i) => cells[i] ?? "");
  });
  return { title, headers, rows };
}

function parseMap(text: string): MaterialEdit["map"] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, rest = ""] = l.split(/:(.*)/s);
      return {
        label: label.trim(),
        items: rest
          .split(/[،,]/)
          .map((x) => x.trim())
          .filter(Boolean),
      };
    });
}

/** Supervisor screen: edit summary, comparison table, mind map and essay questions of any lesson. */
export function SummaryEditor() {
  const db = useDB();
  const me = db.currentUsername ?? "";
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [unit, setUnit] = useState(unitsOf(SUBJECTS[0])[0]);
  const [lesson, setLesson] = useState(
    lessonsOfUnit(SUBJECTS[0], unitsOf(SUBJECTS[0])[0])[0].lesson,
  );
  const m = materialFor(subject, lesson, db.customSummaries);

  const [summary, setSummary] = useState("");
  const [points, setPoints] = useState("");
  const [tableTitle, setTableTitle] = useState("");
  const [table, setTable] = useState("");
  const [map, setMap] = useState("");
  const [essays, setEssays] = useState<[string, string][]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  // load the lesson into the form when it changes (or after saving/restoring)
  const signature = JSON.stringify(m);
  useEffect(() => {
    setSummary(m.summary);
    setPoints(m.keyPoints.join("\n"));
    setTableTitle(m.table.title);
    setTable(toTableText(m));
    setMap(toMapText(m));
    setEssays(m.essays.map((e) => [...e] as [string, string]));
    setMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const run = async (fn: () => Promise<void>, ok: string) => {
    setBusy(true);
    setMsg("");
    try {
      await fn();
      setMsg(ok);
    } catch (e) {
      setMsg("تعذّر الحفظ: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    const data: MaterialEdit = {
      summary: summary.trim(),
      keyPoints: points
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      table: parseTable(tableTitle.trim(), table),
      map: parseMap(map),
      essays: essays.filter(([q, a]) => q.trim() && a.trim()).map(([q, a]) => [q.trim(), a.trim()]),
    };
    void run(() => saveCustomSummary(subject, lesson, data, me), "✅ تم الحفظ — يظهر للطلاب الآن.");
  };

  const pickSubject = (s: string) => {
    const u = unitsOf(s)[0];
    setSubject(s);
    setUnit(u);
    setLesson(lessonsOfUnit(s, u)[0].lesson);
  };
  const box = "w-full bg-input rounded-2xl px-4 py-3 outline-none text-sm";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">الملخصات والأسئلة المقالية</h1>
        <p className="text-muted-foreground mt-1">
          عدّل ملخص أي درس وجدول المقارنة والخريطة الذهنية والأسئلة المقالية لتطابق كتاب المدرسة.
        </p>
      </div>

      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft grid md:grid-cols-3 gap-3">
        <select value={subject} onChange={(e) => pickSubject(e.target.value)} className={box}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
            setLesson(lessonsOfUnit(subject, e.target.value)[0].lesson);
          }}
          className={box}
        >
          {unitsOf(subject).map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
        <select value={lesson} onChange={(e) => setLesson(e.target.value)} className={box}>
          {lessonsOfUnit(subject, unit).map((l) => (
            <option key={l.lesson}>{l.lesson}</option>
          ))}
        </select>
      </div>

      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft space-y-4">
        {m.edited && <p className="text-xs text-warning">✏️ هذا الدرس معدّل من المشرف.</p>}

        <label className="block text-sm font-semibold">📋 الملخص</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className={box}
          dir="auto"
        />

        <label className="block text-sm font-semibold">النقاط الرئيسية (نقطة في كل سطر)</label>
        <textarea
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          rows={4}
          className={box}
          dir="auto"
        />

        <label className="block text-sm font-semibold">📊 جدول المقارنة</label>
        <input
          value={tableTitle}
          onChange={(e) => setTableTitle(e.target.value)}
          placeholder="عنوان الجدول"
          className={box}
          dir="auto"
        />
        <p className="text-xs text-muted-foreground">
          السطر الأول عناوين الأعمدة، وكل سطر بعده صف. افصل بين الخانات بالعلامة |{" "}
        </p>
        <textarea
          value={table}
          onChange={(e) => setTable(e.target.value)}
          rows={6}
          className={`${box} font-mono`}
          dir="auto"
        />

        <label className="block text-sm font-semibold">🧠 الخريطة الذهنية</label>
        <p className="text-xs text-muted-foreground">
          كل سطر فرع: اسم الفرع ثم «:» ثم العناصر مفصولة بفاصلة (،)
        </p>
        <textarea
          value={map}
          onChange={(e) => setMap(e.target.value)}
          rows={5}
          className={box}
          dir="auto"
        />

        <label className="block text-sm font-semibold">✍️ الأسئلة المقالية</label>
        {essays.map(([q, a], i) => (
          <div key={i} className="glass rounded-2xl p-3 space-y-2">
            <div className="flex gap-2">
              <input
                value={q}
                onChange={(e) =>
                  setEssays(essays.map((x, j) => (j === i ? [e.target.value, x[1]] : x)))
                }
                placeholder={`السؤال ${i + 1}`}
                className={box}
                dir="auto"
              />
              <button
                onClick={() => setEssays(essays.filter((_, j) => j !== i))}
                className="text-destructive text-sm px-2"
              >
                🗑️
              </button>
            </div>
            <textarea
              value={a}
              onChange={(e) =>
                setEssays(essays.map((x, j) => (j === i ? [x[0], e.target.value] : x)))
              }
              placeholder="الإجابة النموذجية"
              rows={3}
              className={box}
              dir="auto"
            />
          </div>
        ))}
        <button
          onClick={() => setEssays([...essays, ["", ""]])}
          className="glass rounded-2xl px-4 py-2 text-sm font-semibold"
        >
          ➕ إضافة سؤال مقالي
        </button>

        {msg && <p className="text-sm font-semibold">{msg}</p>}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={save}
            disabled={busy}
            className="bg-hero text-primary-foreground font-bold px-6 py-2.5 rounded-2xl shadow-glow disabled:opacity-50"
          >
            {busy ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
          {m.edited && (
            <button
              onClick={() =>
                confirm("استرجاع المحتوى الأصلي لهذا الدرس؟") &&
                void run(
                  () => deleteCustomSummary(subject, lesson),
                  "↩️ تم استرجاع المحتوى الأصلي.",
                )
              }
              disabled={busy}
              className="glass rounded-2xl px-5 py-2.5 font-semibold"
            >
              ↩️ استرجاع الأصل
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
