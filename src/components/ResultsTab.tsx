import { useState } from "react";
import { useDB } from "@/lib/store";
import { BattleHistory } from "./BattleHistory";
import { Mistakes } from "./Mistakes";

const fmt = (t: number) =>
  new Date(t).toLocaleString("ar-EG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Supervisor tab: one student's test results, battle history and current mistakes. */
export function ResultsTab() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");
  const [who, setWho] = useState(students[0]?.username ?? "");
  const student = students.find((s) => s.username === who);

  const subjectName = (id: string) => db.subjects.find((s) => s.id === id)?.name ?? "—";
  const tests = [
    ...db.quizzes
      .filter((q) => q.ownerUsername === who)
      .map((q) => ({
        id: q.id,
        kind: "⚡ اختبار سريع",
        subject: subjectName(q.subjectId),
        score: q.score,
        total: q.total,
        at: q.takenAt,
      })),
    ...db.reviews
      .filter((r) => r.ownerUsername === who)
      .map((r) => ({
        id: r.id,
        kind: r.kind === "biweekly" ? "🔁 مراجعة كل أسبوعين" : "📝 اختبار شامل",
        subject: r.subject ?? "كل المواد",
        score: r.score,
        total: r.total,
        at: r.takenAt,
      })),
  ].sort((a, b) => b.at - a.at);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">النتائج والأخطاء</h1>
        <p className="text-muted-foreground mt-1">
          تاريخ اختبارات كل طالب ونتائج مسابقاته والأسئلة التي ما زال يخطئ فيها.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {students.map((s) => (
          <button
            key={s.username}
            onClick={() => setWho(s.username)}
            className={`rounded-2xl px-4 py-2 font-semibold ${who === s.username ? "bg-hero text-primary-foreground shadow-glow" : "glass"}`}
          >
            {s.avatar} {s.displayName}
          </button>
        ))}
      </div>

      {student && (
        <>
          <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
            <h3 className="text-xl font-bold mb-3">📝 سجل الاختبارات</h3>
            {tests.length === 0 ? (
              <p className="text-sm text-muted-foreground">لم يحل اختبارات بعد.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-xs text-muted-foreground">
                      <th className="text-right p-2">النوع</th>
                      <th className="text-right p-2">المادة</th>
                      <th className="text-right p-2">الدرجة</th>
                      <th className="text-right p-2">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.slice(0, 50).map((t) => {
                      const pct = Math.round((t.score / Math.max(t.total, 1)) * 100);
                      return (
                        <tr key={t.id} className="border-t border-border">
                          <td className="p-2 whitespace-nowrap">{t.kind}</td>
                          <td className="p-2">{t.subject}</td>
                          <td
                            className={`p-2 font-bold whitespace-nowrap ${pct >= 60 ? "text-success" : "text-destructive"}`}
                          >
                            {t.score} / {t.total} ({pct}%)
                          </td>
                          <td className="p-2 whitespace-nowrap text-muted-foreground">
                            {fmt(t.at)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <BattleHistory username={who} title={`⚔️ مسابقات ${student.displayName}`} />

          <Mistakes key={who} username={who} readOnly />
        </>
      )}
    </div>
  );
}
