import { useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import { materialFor, type LessonMaterial } from "@/lib/content";
import { finishedLessons, isFinished, lessonSequence, unitsOf } from "@/lib/progress";
import { useCurrentProfile, useDB } from "@/lib/store";

const BRANCH_COLORS = ["#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb7185"];

type View = "summary" | "table" | "map";

/** Summaries tab: per lesson summary, comparison table and mind map. */
export function StudyMaterial() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [lesson, setLesson] = useState<string | null>(null);
  const [view, setView] = useState<View>("summary");
  const done = finishedLessons(db.progress, profile.username, subject);

  if (lesson) {
    const m = materialFor(subject, lesson, db.customSummaries);
    return (
      <div className="space-y-4">
        <button
          onClick={() => setLesson(null)}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← رجوع لدروس {subject}
        </button>
        <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
          <p className="text-xs text-muted-foreground">{subject}</p>
          <h2 className="text-2xl font-bold">{m.title}</h2>
          {m.edited && <p className="text-xs text-warning mt-1">✏️ عدّل المشرف هذا الملخص</p>}
          <div className="flex gap-2 mt-4">
            {(
              [
                ["summary", "📋 الملخص"],
                ["table", "📊 جدول ومقارنة"],
                ["map", "🧠 خريطة ذهنية"],
              ] as [View, string][]
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setView(k)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold ${view === k ? "bg-hero text-primary-foreground shadow-glow" : "glass"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        {view === "summary" && <SummaryBlock m={m} />}
        {view === "table" && <TableBlock m={m} />}
        {view === "map" && <MindMap m={m} />}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="font-bold mb-1">📋 ملخصات وجداول وخرائط ذهنية</h3>
        <p className="text-sm text-muted-foreground mb-3">
          لكل درس: ملخص ونقاط رئيسية، جدول مقارنة، وخريطة ذهنية للمراجعة السريعة.
        </p>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold ${subject === s ? "bg-hero text-primary-foreground shadow-glow" : "glass"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {unitsOf(subject).map((u) => (
        <div key={u}>
          <h4 className="font-bold text-sm text-muted-foreground mb-2">{u}</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {lessonSequence(subject)
              .filter((l) => l.unit === u)
              .map((l) => (
                <button
                  key={l.lesson}
                  onClick={() => {
                    setLesson(l.lesson);
                    setView("summary");
                  }}
                  className="glass rounded-2xl p-3 text-right text-sm font-semibold hover:bg-primary/10 flex items-center justify-between gap-2"
                >
                  <span>{l.lesson}</span>
                  {isFinished(done, l) && (
                    <span className="text-success text-xs shrink-0">✓ أنهيته</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryBlock({ m }: { m: LessonMaterial }) {
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft space-y-4">
      <p className="leading-relaxed">{m.summary}</p>
      <div>
        <p className="font-bold text-sm mb-2">النقاط الرئيسية</p>
        <ul className="space-y-1.5">
          {m.keyPoints.map((kp, j) => (
            <li key={j} className="flex items-start gap-2 text-sm">
              <span className="text-accent mt-0.5 shrink-0">✦</span>
              <span>{kp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TableBlock({ m }: { m: LessonMaterial }) {
  if (!m.table.rows.length)
    return <p className="text-muted-foreground">لا يوجد جدول لهذا الدرس.</p>;
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft overflow-x-auto">
      <h3 className="font-bold mb-3">{m.table.title}</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {m.table.headers.map((h, i) => (
              <th key={i} className="bg-primary/20 p-2 border border-border text-right">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {m.table.rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-muted/30" : ""}>
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`p-2 border border-border align-top ${j === 0 ? "font-semibold" : ""}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Mind map: lesson in the centre, coloured branches around it (stacked on small screens). */
function MindMap({ m }: { m: LessonMaterial }) {
  const half = Math.ceil(m.map.length / 2);
  const left = m.map.slice(0, half);
  const right = m.map.slice(half);
  const Branch = ({ b, i }: { b: LessonMaterial["map"][number]; i: number }) => {
    const color = BRANCH_COLORS[i % BRANCH_COLORS.length];
    return (
      <div className="rounded-2xl p-3 border-2 bg-card/60" style={{ borderColor: color }}>
        <div className="font-bold text-sm mb-2" style={{ color }}>
          {b.label}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {b.items.map((it, j) => (
            <span
              key={j}
              className="text-xs rounded-full px-2.5 py-1"
              style={{ background: color + "22" }}
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="space-y-3 order-2 md:order-1">
          {left.map((b, i) => (
            <Branch key={b.label} b={b} i={i} />
          ))}
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-0.5 bg-border" />
            <div className="hidden md:block absolute top-1/2 -left-4 w-4 h-0.5 bg-border" />
            <div className="bg-hero text-primary-foreground font-bold rounded-full px-6 py-6 text-center max-w-[12rem] shadow-glow">
              {m.lesson}
            </div>
          </div>
        </div>
        <div className="space-y-3 order-3">
          {right.map((b, i) => (
            <Branch key={b.label} b={b} i={i + half} />
          ))}
        </div>
      </div>
    </div>
  );
}
