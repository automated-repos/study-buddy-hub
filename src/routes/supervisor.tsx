import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { minutesToday, pointsFor, streakFor, useDB } from "@/lib/store";

export const Route = createFileRoute("/supervisor")({
  head: () => ({ meta: [{ title: "لوحة المشرف — مذاكرة" }] }),
  component: SupervisorPage,
});

function SupervisorPage() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">متابعة الأبناء</h1>
          <p className="text-muted-foreground mt-1">
            نظرة شاملة على أداء كل طالب — نقاط، سلسلة أيام، تقدم في المواد، واختبارات.
          </p>
        </div>

        {students.length === 0 ? (
          <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border">
            <div className="text-6xl mb-3">👨‍🎓</div>
            <h3 className="text-xl font-bold">لا يوجد طلاب بعد</h3>
            <p className="text-muted-foreground mt-1">
              اخرج وأنشئ حسابات لأبنائك من شاشة البداية.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {students.map((s, i) => (
              <StudentCard key={s.username} username={s.username} index={i} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function StudentCard({ username, index }: { username: string; index: number }) {
  const db = useDB();
  const p = db.profiles.find((x) => x.username === username)!;
  const subjects = db.subjects.filter((s) => s.ownerUsername === username);
  const sessions = db.sessions.filter((s) => s.ownerUsername === username);
  const quizzes = db.quizzes.filter((q) => q.ownerUsername === username);
  const totalMin = sessions.reduce((a, b) => a + b.minutes, 0);
  const avgQuiz =
    quizzes.length === 0
      ? 0
      : Math.round(
          (quizzes.reduce((a, q) => a + q.score / Math.max(q.total, 1), 0) / quizzes.length) * 100,
        );

  // last 7 days bar chart
  const days: { d: string; min: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dt = new Date();
    dt.setDate(dt.getDate() - i);
    const k = dt.toISOString().slice(0, 10);
    const min = sessions.filter((s) => s.date === k).reduce((a, b) => a + b.minutes, 0);
    days.push({ d: dt.toLocaleDateString("ar-EG", { weekday: "short" }), min });
  }
  const maxMin = Math.max(60, ...days.map((d) => d.min));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft"
    >
      <div className="flex items-center gap-3">
        <div className="text-4xl">{p.avatar}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{p.displayName}</h3>
          <p className="text-xs text-muted-foreground">@{p.username}</p>
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold bg-hero bg-clip-text text-transparent">
            {pointsFor(username, db)}
          </div>
          <div className="text-xs text-muted-foreground">نقطة</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-5">
        <Stat label="السلسلة" value={`${streakFor(username, db)}`} sub="يوم 🔥" />
        <Stat label="اليوم" value={`${minutesToday(username, db)}`} sub="دقيقة" />
        <Stat label="الإجمالي" value={`${Math.round(totalMin / 60)}`} sub="ساعة" />
        <Stat label="معدل الاختبارات" value={`${avgQuiz}%`} sub={`${quizzes.length} اختبار`} />
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground mb-2">آخر 7 أيام</p>
        <div className="flex items-end justify-between gap-1.5 h-24">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-hero transition-all"
                style={{ height: `${(d.min / maxMin) * 100}%`, minHeight: 4, opacity: d.min ? 1 : 0.2 }}
              />
              <span className="text-[10px] text-muted-foreground">{d.d}</span>
            </div>
          ))}
        </div>
      </div>

      {subjects.length > 0 && (
        <div className="mt-5">
          <p className="text-xs text-muted-foreground mb-2">تقدّم المواد</p>
          <div className="space-y-2">
            {subjects.map((s) => {
              const pct = Math.round((s.doneChapters / Math.max(s.totalChapters, 1)) * 100);
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-muted-foreground">
                      {s.doneChapters}/{s.totalChapters} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${pct}%`, background: s.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-0.5">{value}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}
