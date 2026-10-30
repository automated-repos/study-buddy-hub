import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { AppShell, Tab } from "@/components/AppShell";
import {
  createChallenge,
  dailyPlan,
  deleteBook,
  getBookUrl,
  logQuiz,
  logSession,
  minutesToday,
  pointsFor,
  setChallengeStatus,
  streakFor,
  updateSubject,
  uploadBook,
  useCurrentProfile,
  useDB,
} from "@/lib/store";
import { getQuizFor, type QuizQ } from "@/lib/quiz-bank";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "لوحة الطالب — مذاكرة" }] }),
  component: StudentPage,
});

type TabKey = "today" | "subjects" | "quiz" | "books" | "ranking" | "challenges";

function StudentPage() {
  const [tab, setTab] = useState<TabKey>("today");
  return (
    <AppShell
      tabs={
        <>
          {(
            [
              ["today", "🎯 اليوم"],
              ["subjects", "📘 المواد"],
              ["quiz", "⚡ اختبار سريع"],
              ["books", "📚 الكتب"],
              ["ranking", "🏆 الترتيب"],
              ["challenges", "⚔️ تحديات"],
            ] as [TabKey, string][]
          ).map(([k, l]) => (
            <Tab key={k} active={tab === k} onClick={() => setTab(k)}>
              {l}
            </Tab>
          ))}
        </>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "today" && <TodayView />}
          {tab === "subjects" && <SubjectsView />}
          {tab === "quiz" && <QuizView />}
          {tab === "books" && <BooksView />}
          {tab === "ranking" && <RankingView />}
          {tab === "challenges" && <ChallengesView />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

// ============== TODAY ==============
function TodayView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const plan = useMemo(() => dailyPlan(profile.username, db), [profile.username, db]);
  const todayMin = minutesToday(profile.username, db);
  const goal = plan.reduce((a, p) => a + p.minutes, 0) || 120;
  const progress = Math.min(100, Math.round((todayMin / goal) * 100));

  return (
    <div className="space-y-6">
      <div className="bg-card-gradient rounded-3xl p-6 shadow-soft border border-border">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-muted-foreground text-sm">هدف اليوم</p>
            <h2 className="text-3xl font-bold">
              {todayMin} / {goal} <span className="text-base text-muted-foreground">دقيقة</span>
            </h2>
          </div>
          <div className="text-5xl">{progress >= 100 ? "🏆" : progress >= 50 ? "🚀" : "💪"}</div>
        </div>
        <div className="h-3 mt-4 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-hero"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {plan.length === 0 ? (
        <EmptyState
          icon="📘"
          title="ابدأ بإضافة موادك"
          desc="من تبويب «المواد» أضف مواد الثانوية العامة لتُولّد لك خطة يومية تلقائياً."
        />
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-3">خطة اليوم المقترحة</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {plan.map((p, i) => (
              <PlanCard key={i} item={p} index={i} username={profile.username} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanCard({
  item,
  index,
  username,
}: {
  item: ReturnType<typeof dailyPlan>[number];
  index: number;
  username: string;
}) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds

  const startTimer = () => {
    setRunning(true);
    setElapsed(0);
    const start = Date.now();
    const intv = setInterval(() => {
      const sec = Math.floor((Date.now() - start) / 1000);
      setElapsed(sec);
    }, 1000);
    (window as any).__planIntv = intv;
  };
  const stopAndLog = async () => {
    clearInterval((window as any).__planIntv);
    setRunning(false);
    const min = Math.max(1, Math.round(elapsed / 60));
    await logSession(username, item.subjectId, min);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft relative overflow-hidden"
    >
      <div
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-2xl"
        style={{ background: item.color }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold">{item.subjectName}</h4>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: item.color + "33", color: item.color }}
          >
            {item.minutes} د
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{item.focus}</p>

        {running ? (
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="text-2xl font-mono font-bold text-accent">
              {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
              {String(elapsed % 60).padStart(2, "0")}
            </div>
            <button
              onClick={stopAndLog}
              className="bg-success-gradient text-primary-foreground font-bold px-4 py-2 rounded-2xl"
            >
              إنهاء وتسجيل
            </button>
          </div>
        ) : (
          <button
            onClick={startTimer}
            className="mt-4 w-full bg-hero text-primary-foreground font-bold py-2.5 rounded-2xl shadow-glow"
          >
            ابدأ المذاكرة ▶
          </button>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border">
      <div className="text-6xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

// ============== SUBJECTS ==============
function SubjectsView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const subjects = db.subjects.filter((s) => s.ownerUsername === profile.username);

  return (
    <div className="space-y-6">
      {subjects.length === 0 ? (
        <EmptyState icon="📘" title="لا توجد مواد بعد" desc="تواصل مع وليّ الأمر لإضافة موادك." />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((s) => {
            const pct = Math.round((s.doneChapters / Math.max(s.totalChapters, 1)) * 100);
            return (
              <div
                key={s.id}
                className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-10 rounded-full" style={{ background: s.color }} />
                    <div>
                      <h4 className="font-bold text-lg">{s.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {s.doneChapters} / {s.totalChapters} فصل
                      </p>
                    </div>
                  </div>
                  {s.bookPath && (
                    <BookLink
                      path={s.bookPath}
                      className="text-xs bg-hero text-primary-foreground font-bold px-3 py-1.5 rounded-xl shadow-glow"
                    >
                      📄 الكتاب
                    </BookLink>
                  )}
                </div>
                <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-success-gradient transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      void updateSubject(s.id, {
                        doneChapters: Math.min(s.totalChapters, s.doneChapters + 1),
                      })
                    }
                    className="flex-1 glass rounded-2xl py-2 text-sm font-semibold"
                  >
                    + فصل تم
                  </button>
                  <button
                    onClick={() =>
                      void updateSubject(s.id, { doneChapters: Math.max(0, s.doneChapters - 1) })
                    }
                    className="flex-1 glass rounded-2xl py-2 text-sm font-semibold"
                  >
                    − فصل
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============== QUIZ ==============
function QuizView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const subjects = db.subjects.filter((s) => s.ownerUsername === profile.username);
  const [subjectId, setSubjectId] = useState<string>("");
  const [qs, setQs] = useState<QuizQ[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const start = () => {
    const subj = subjects.find((s) => s.id === subjectId);
    if (!subj) return;
    setQs(getQuizFor(subj.name, 5));
    setIdx(0);
    setAnswers([]);
    setDone(false);
  };

  const choose = async (i: number) => {
    if (!qs) return;
    const next = [...answers, i];
    setAnswers(next);
    if (idx + 1 < qs.length) {
      setIdx(idx + 1);
    } else {
      const score = next.reduce((a, ans, j) => a + (ans === qs[j].correct ? 1 : 0), 0);
      await logQuiz(profile.username, subjectId, score, qs.length);
      setDone(true);
      if (score / qs.length >= 0.6) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  if (subjects.length === 0)
    return <EmptyState icon="⚡" title="أضف مادة أولاً" desc="حتى نولّد لك أسئلة من نفس المادة." />;

  if (!qs) {
    return (
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto">
        <h3 className="text-xl font-bold mb-4">اختبار سريع — 5 أسئلة</h3>
        <label className="text-sm text-muted-foreground">اختر المادة</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full bg-input rounded-2xl px-4 py-3 mt-1 outline-none"
        >
          <option value="">— اختر —</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button
          onClick={start}
          disabled={!subjectId}
          className="mt-4 w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
        >
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  if (done) {
    const score = answers.reduce((a, ans, j) => a + (ans === qs[j].correct ? 1 : 0), 0);
    return (
      <div className="bg-card-gradient rounded-3xl p-8 border border-border shadow-soft max-w-xl mx-auto text-center">
        <div className="text-6xl mb-3">{score === qs.length ? "🏆" : score >= 3 ? "🎉" : "💪"}</div>
        <h3 className="text-2xl font-bold">
          نتيجتك: {score} / {qs.length}
        </h3>
        <p className="text-muted-foreground mt-2">
          {score === qs.length
            ? "ممتاز! أداء كامل."
            : score >= 3
            ? "أداء جيد — استمر."
            : "حاول مرة أخرى بعد مراجعة سريعة."}
        </p>
        <div className="mt-6 grid gap-2 text-right">
          {qs.map((q, i) => (
            <div key={i} className="glass rounded-2xl p-3">
              <p className="font-semibold text-sm">{q.q}</p>
              <p className="text-xs mt-1">
                <span className="text-muted-foreground">إجابتك: </span>
                <span className={answers[i] === q.correct ? "text-success" : "text-destructive"}>
                  {q.options[answers[i]]}
                </span>
                {answers[i] !== q.correct && (
                  <span className="text-success mr-3">الصحيحة: {q.options[q.correct]}</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setQs(null)}
          className="mt-6 bg-hero text-primary-foreground font-bold px-6 py-3 rounded-2xl shadow-glow"
        >
          اختبار جديد
        </button>
      </div>
    );
  }

  const q = qs[idx];
  return (
    <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>السؤال {idx + 1} من {qs.length}</span>
        <span>⚡</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
        <div className="h-full bg-hero" style={{ width: `${((idx) / qs.length) * 100}%` }} />
      </div>
      <h3 className="text-xl font-bold mb-5">{q.q}</h3>
      <div className="grid gap-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className="text-right glass rounded-2xl p-4 hover:bg-primary/20 hover:border-primary border border-transparent transition font-semibold"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============== BOOKS ==============
function BooksView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const subjects = db.subjects.filter((s) => s.ownerUsername === profile.username);
  const books = db.books.filter((b) => b.ownerUsername === profile.username);
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!subjectId) { setUploadError("اختر المادة أولاً"); return; }
    setUploadError("");
    setUploading(true);
    try {
      await uploadBook(f, profile.username, subjectId, title);
      setTitle("");
      e.target.value = "";
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  if (subjects.length === 0)
    return <EmptyState icon="📚" title="أضف مواد أولاً" desc="حتى ترفع كتبها." />;

  return (
    <div className="space-y-6">
      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="font-bold mb-3">رفع كتاب PDF</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="bg-input rounded-2xl px-4 py-3 outline-none"
          >
            <option value="">— اختر المادة —</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان الكتاب (اختياري)"
            className="bg-input rounded-2xl px-4 py-3 outline-none"
          />
          <label className={`bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow text-center cursor-pointer ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}>
            {uploading ? "جارٍ الرفع..." : "اختر ملف PDF"}
            <input type="file" accept="application/pdf" onChange={onFile} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="text-destructive text-xs mt-2">{uploadError}</p>}
        <p className="text-xs text-muted-foreground mt-3">
          الملفات ترفع مباشرة إلى التخزين السحابي وتبقى محفوظة من أي جهاز.
        </p>
      </div>

      {books.length === 0 ? (
        <EmptyState icon="📕" title="لا توجد كتب" desc="ارفع كتب موادك للبدء." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b) => {
            const subj = subjects.find((s) => s.id === b.subjectId);
            return (
              <div
                key={b.id}
                className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft"
              >
                <div className="text-4xl mb-2">📕</div>
                <h4 className="font-bold">{b.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {subj?.name} • {(b.sizeKB / 1024).toFixed(1)} ميجا
                </p>
                <div className="flex gap-3 mt-3">
                  {b.filePath && (
                    <BookLink path={b.filePath} className="text-xs text-primary hover:underline">
                      فتح الكتاب
                    </BookLink>
                  )}
                  <button
                    onClick={() => void deleteBook(b.id)}
                    className="text-xs text-destructive hover:underline"
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============== RANKING ==============
function RankingView() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");
  const rows = students
    .map((s) => ({
      ...s,
      pts: pointsFor(s.username, db),
      streak: streakFor(s.username, db),
      today: minutesToday(s.username, db),
    }))
    .sort((a, b) => b.pts - a.pts);

  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">لوحة ترتيب الإخوة</h3>
      {rows.length === 0 ? (
        <EmptyState icon="🏆" title="لا يوجد طلاب بعد" desc="أنشئ حسابات لإخوتك." />
      ) : (
        <div className="space-y-3">
          {rows.map((r, i) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              key={r.username}
              className={`flex items-center gap-4 p-4 rounded-3xl border ${
                i === 0
                  ? "bg-hero text-primary-foreground border-transparent shadow-glow"
                  : "bg-card-gradient border-border"
              }`}
            >
              <div className="text-3xl">{medals[i] || `#${i + 1}`}</div>
              <div className="text-3xl">{r.avatar}</div>
              <div className="flex-1">
                <div className="font-bold text-lg">{r.displayName}</div>
                <div className="text-xs opacity-80">
                  🔥 {r.streak} يوم • اليوم {r.today} د
                </div>
              </div>
              <div className="text-2xl font-bold">{r.pts}<span className="text-sm font-normal opacity-70 mr-1">نقطة</span></div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============== CHALLENGES ==============
function ChallengesView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const others = db.profiles.filter((p) => p.role === "student" && p.username !== profile.username);
  const subjects = db.subjects.filter((s) => s.ownerUsername === profile.username);
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const myChallenges = db.challenges.filter(
    (c) => c.from === profile.username || c.to === profile.username,
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !title.trim()) return;
    await createChallenge({ from: profile.username, to, title: title.trim() });
    setTitle("");
    setTo("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="font-bold mb-3">تحدي إخوتك ⚔️</h3>
        {others.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            لا يوجد طلاب آخرون لتحديهم. أضف حساب أخيك من شاشة البداية.
          </p>
        ) : (
          <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-input rounded-2xl px-4 py-3 outline-none"
            >
              <option value="">— اختر المنافس —</option>
              {others.map((p) => (
                <option key={p.username} value={p.username}>
                  {p.avatar} {p.displayName}
                </option>
              ))}
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: من ينهي فصل الجبر الأول الليلة"
              className="bg-input rounded-2xl px-4 py-3 outline-none"
            />
            <button className="bg-hero text-primary-foreground font-bold px-5 rounded-2xl shadow-glow">
              أرسل التحدي
            </button>
          </div>
        )}
        {subjects.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            اقتراح: حدد مادة ووقت محدد لجعل التحدي عادلاً.
          </p>
        )}
      </form>

      {myChallenges.length === 0 ? (
        <EmptyState icon="⚔️" title="لا توجد تحديات" desc="أنشئ أول تحدي." />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {myChallenges
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((c) => {
              const from = db.profiles.find((p) => p.username === c.from);
              const toP = db.profiles.find((p) => p.username === c.to);
              const isMyTurn = c.to === profile.username && c.status === "pending";
              return (
                <div
                  key={c.id}
                  className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft"
                >
                  <div className="text-xs text-muted-foreground">
                    {from?.avatar} {from?.displayName} → {toP?.avatar} {toP?.displayName}
                  </div>
                  <h4 className="font-bold mt-1">{c.title}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`text-xs rounded-full px-3 py-1 font-bold ${
                        c.status === "pending"
                          ? "bg-warning/20 text-warning"
                          : c.status === "accepted"
                          ? "bg-secondary/20 text-secondary"
                          : "bg-success/20 text-success"
                      }`}
                    >
                      {c.status === "pending"
                        ? "بانتظار"
                        : c.status === "accepted"
                        ? "جارٍ"
                        : `انتهى — الفائز: ${db.profiles.find((p) => p.username === c.winner)?.displayName ?? "—"}`}
                    </span>
                    <div className="flex gap-2">
                      {isMyTurn && (
                        <button
                          onClick={() => void setChallengeStatus(c.id, "accepted")}
                          className="text-xs bg-secondary text-secondary-foreground font-bold px-3 py-1.5 rounded-xl"
                        >
                          قبول
                        </button>
                      )}
                      {c.status === "accepted" && (
                        <>
                          <button
                            onClick={() => void setChallengeStatus(c.id, "done", c.from)}
                            className="text-xs glass px-3 py-1.5 rounded-xl"
                          >
                            فاز {from?.displayName}
                          </button>
                          <button
                            onClick={() => void setChallengeStatus(c.id, "done", c.to)}
                            className="text-xs glass px-3 py-1.5 rounded-xl"
                          >
                            فاز {toP?.displayName}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
