import { useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import { materialFor, type LessonMaterial, type MapBranch } from "@/lib/content";
import { finishedLessons, isFinished, lessonSequence, unitsOf } from "@/lib/progress";
import { useCurrentProfile, useDB } from "@/lib/store";
import { mapQuestionsFor } from "@/lib/mapQuestions";
import { LessonMaps } from "./MapQuiz";

const BRANCH_COLORS = ["#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#a78bfa", "#fb7185"];

type View = "summary" | "table" | "map" | "geo";

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
                ["table", "📊 جداول ومقارنات"],
                ["map", "🧠 خريطة ذهنية"],
                ...(mapQuestionsFor(subject, lesson).length
                  ? ([["geo", "🗺️ خرائط"]] as [View, string][])
                  : []),
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
        {view === "geo" && <LessonMaps subject={subject} lesson={lesson} />}
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
  if (!m.tables.length) return <p className="text-muted-foreground">لا توجد جداول لهذا الدرس.</p>;
  return (
    <div className="space-y-4">
      {m.tables.map((t, ti) => (
        <div
          key={ti}
          className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft overflow-x-auto"
        >
          <h3 className="font-bold mb-3">
            {ti + 1}. {t.title}
          </h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {t.headers.map((h, i) => (
                  <th
                    key={i}
                    className="bg-primary/20 p-2 border border-border text-right whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-muted/30" : ""}>
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`p-2 border border-border align-top leading-relaxed ${j === 0 ? "font-semibold" : ""}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

/** Mind map: lesson in the centre, branches → points → details. */
function MindMap({ m }: { m: LessonMaterial }) {
  const half = Math.ceil(m.map.length / 2);
  const Branch = ({ b, i }: { b: MapBranch; i: number }) => {
    const color = BRANCH_COLORS[i % BRANCH_COLORS.length];
    return (
      <div className="rounded-2xl p-3 border-2 bg-card/60" style={{ borderColor: color }}>
        <div className="font-bold mb-2 flex items-center gap-2" style={{ color }}>
          <span className="inline-block size-2.5 rounded-full" style={{ background: color }} />
          {b.label}
        </div>
        <ul className="space-y-1.5 text-sm">
          {b.items.map((it, j) =>
            typeof it === "string" ? (
              <li key={j} className="rounded-xl px-2.5 py-1.5" style={{ background: color + "1a" }}>
                {it}
              </li>
            ) : (
              <li key={j} className="rounded-xl px-2.5 py-1.5" style={{ background: color + "1a" }}>
                <span className="font-semibold">{it.label}</span>
                <ul
                  className="mt-1 mr-3 space-y-0.5 border-r-2 pr-2"
                  style={{ borderColor: color + "66" }}
                >
                  {it.sub.map((x, k) => (
                    <li key={k} className="text-xs leading-relaxed">
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
      </div>
    );
  };
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <div className="space-y-3 order-2 lg:order-1">
          {m.map.slice(0, half).map((b, i) => (
            <Branch key={b.label} b={b} i={i} />
          ))}
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:sticky lg:top-40">
          <div className="bg-hero text-primary-foreground font-bold rounded-full px-6 py-8 text-center max-w-[13rem] shadow-glow">
            {m.lesson}
          </div>
        </div>
        <div className="space-y-3 order-3">
          {m.map.slice(half).map((b, i) => (
            <Branch key={b.label} b={b} i={i + half} />
          ))}
        </div>
      </div>
    </div>
  );
}
