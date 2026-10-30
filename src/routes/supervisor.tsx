import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppShell, Tab } from "@/components/AppShell";
import { BookLink } from "@/components/BookLink";
import {
  addSubject,
  deleteSubject,
  minutesToday,
  pointsFor,
  setSubjectBook,
  streakFor,
  uploadSubjectBook,
  useDB,
} from "@/lib/store";

export const Route = createFileRoute("/supervisor")({
  head: () => ({ meta: [{ title: "لوحة المشرف — مذاكرة" }] }),
  component: SupervisorPage,
});

type TabKey = "overview" | "subjects";

const COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#22d3ee", "#facc15"];

function SupervisorPage() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <AppShell
      tabs={
        <>
          <Tab active={tab === "overview"} onClick={() => setTab("overview")}>📊 المتابعة</Tab>
          <Tab active={tab === "subjects"} onClick={() => setTab("subjects")}>📘 إدارة المواد</Tab>
        </>
      }
    >
      {tab === "overview" && <OverviewTab />}
      {tab === "subjects" && <SubjectsTab />}
    </AppShell>
  );
}

// ── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");

  return (
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
          <h3 className="text-xl font-bold">لا يوجد طلاب</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {students.map((s, i) => (
            <StudentCard key={s.username} username={s.username} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Subjects management tab ───────────────────────────────────────────────────
function SubjectsTab() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");
  const [name, setName] = useState("");
  const [chapters, setChapters] = useState(10);
  const [color, setColor] = useState(COLORS[0]);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done">("idle");
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const allNames = new Set(db.subjects.map((s) => s.name));
  const uniqueSubjects = [...allNames].map((n) => db.subjects.find((s) => s.name === n)!);

  const add = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim() || students.length === 0) return;
    setErrorMsg("");
    try {
      let bookPath: string | undefined;
      if (bookFile) {
        setStatus("uploading");
        bookPath = await uploadSubjectBook(bookFile, name.trim());
      }
      setStatus("saving");
      await Promise.all(
        students.map((st) =>
          addSubject({ ownerUsername: st.username, name: name.trim(), totalChapters: chapters, color, bookPath }),
        ),
      );
      setSuccessMsg(`✅ تمت إضافة "${name.trim()}" لجميع الطلاب`);
      setName("");
      setChapters(10);
      setBookFile(null);
      setColor(COLORS[0]);
      setStatus("done");
      setTimeout(() => { setStatus("idle"); setSuccessMsg(""); }, 3000);
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("idle");
    }
  };

  const removeSubject = async (subjectName: string) => {
    const toDelete = db.subjects.filter((s) => s.name === subjectName);
    await Promise.all(toDelete.map((s) => deleteSubject(s.id)));
  };

  const replaceBook = async (subjectName: string, file: File) => {
    setUploadingFor(subjectName);
    try {
      const path = await uploadSubjectBook(file, subjectName);
      await setSubjectBook(subjectName, path);
    } finally {
      setUploadingFor(null);
    }
  };

  const busy = status === "uploading" || status === "saving";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إدارة المواد</h1>
        <p className="text-muted-foreground mt-1">
          إضافة مادة تضيفها لجميع الطلاب تلقائياً — نفس المنهج.
        </p>
      </div>

      {/* Add subject form */}
      <form onSubmit={add} className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft space-y-4">
        <h3 className="font-bold text-lg">إضافة مادة جديدة</h3>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">اسم المادة</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: رياضيات"
              className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">عدد الفصول في الكتاب</label>
            <input
              type="number"
              min={1}
              max={50}
              value={chapters}
              onChange={(e) => setChapters(parseInt(e.target.value) || 1)}
              className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-center text-lg font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">كتاب المادة PDF</label>
          <div className="flex gap-3 items-center">
            <label className="flex-1 flex items-center gap-3 bg-input rounded-2xl px-4 py-3 cursor-pointer hover:bg-muted/40 transition">
              <span className="text-xl">📄</span>
              <span className="text-sm text-muted-foreground flex-1 truncate">
                {bookFile ? bookFile.name : "اختر ملف PDF (اختياري)"}
              </span>
              <input type="file" accept="application/pdf" className="hidden"
                onChange={(e) => setBookFile(e.target.files?.[0] ?? null)} />
            </label>
            {bookFile && (
              <button type="button" onClick={() => setBookFile(null)}
                className="text-xs text-destructive hover:underline shrink-0">
                إزالة
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-2">لون المادة</label>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button type="button" key={c} onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-full border-2 transition ${color === c ? "border-foreground scale-110 shadow-glow" : "border-transparent"}`}
                style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Progress feedback */}
        {busy && (
          <div className="rounded-2xl bg-muted/40 px-4 py-3 space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>{status === "uploading" ? "⬆️ جارٍ رفع الكتاب..." : "💾 جارٍ الحفظ..."}</span>
              <span className="text-muted-foreground text-xs">
                {status === "uploading" ? "قد يستغرق دقيقة للملفات الكبيرة" : "لحظة..."}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full bg-hero rounded-full ${status === "uploading" ? "w-2/3" : "w-full"} transition-all duration-500`} />
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-2xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive">
            ❌ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm font-semibold text-green-400">
            {successMsg}
          </div>
        )}

        <button
          disabled={busy || !name.trim()}
          className="w-full bg-hero text-primary-foreground font-bold py-3.5 rounded-2xl shadow-glow disabled:opacity-60 transition"
        >
          {busy ? (status === "uploading" ? "⬆️ يرفع الكتاب..." : "💾 يحفظ...") : "إضافة المادة لجميع الطلاب"}
        </button>
      </form>

      {/* Subject list */}
      {uniqueSubjects.length === 0 ? (
        <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border">
          <div className="text-5xl mb-3">📘</div>
          <p className="text-muted-foreground">لا توجد مواد بعد. أضف أول مادة.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {uniqueSubjects.map((s) => (
            <div key={s.name} className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-10 rounded-full" style={{ background: s.color }} />
                  <div>
                    <h4 className="font-bold text-lg">{s.name}</h4>
                    <p className="text-xs text-muted-foreground">{s.totalChapters} فصل</p>
                  </div>
                </div>
                <button
                  onClick={() => void removeSubject(s.name)}
                  className="text-xs text-destructive hover:underline"
                >
                  حذف من الكل
                </button>
              </div>

              {/* Book */}
              <div className="mt-3 flex items-center gap-3">
                {s.bookPath ? (
                  <>
                    <BookLink path={s.bookPath} className="text-xs text-primary hover:underline">
                      📄 فتح الكتاب
                    </BookLink>
                    <label className={`text-xs text-muted-foreground hover:text-foreground cursor-pointer ${uploadingFor === s.name ? "opacity-50" : ""}`}>
                      {uploadingFor === s.name ? "جارٍ الرفع..." : "تغيير الكتاب"}
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        disabled={uploadingFor === s.name}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) void replaceBook(s.name, f);
                        }}
                      />
                    </label>
                  </>
                ) : (
                  <label className={`text-xs text-muted-foreground hover:text-foreground cursor-pointer ${uploadingFor === s.name ? "opacity-50" : ""}`}>
                    {uploadingFor === s.name ? "جارٍ الرفع..." : "📎 رفع كتاب"}
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      disabled={uploadingFor === s.name}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void replaceBook(s.name, f);
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Progress per student */}
              <div className="mt-3 space-y-2">
                {students.map((st) => {
                  const sub = db.subjects.find(
                    (x) => x.ownerUsername === st.username && x.name === s.name,
                  );
                  const pct = sub
                    ? Math.round((sub.doneChapters / Math.max(sub.totalChapters, 1)) * 100)
                    : 0;
                  return (
                    <div key={st.username}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{st.avatar} {st.displayName}</span>
                        <span className="text-muted-foreground">{sub?.doneChapters ?? 0}/{s.totalChapters} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Student overview card ─────────────────────────────────────────────────────
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
                    <span className="text-muted-foreground">{s.doneChapters}/{s.totalChapters} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
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
