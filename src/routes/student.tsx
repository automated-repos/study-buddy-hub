import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { AppShell, Tab } from "@/components/AppShell";
import { BookLink } from "@/components/BookLink";
import {
  dailyPlan,
  deleteBook,
  isLiveBattle,
  logQuiz,
  logSession,
  minutesToday,
  parseLiveBattleConfig,
  pointsFor,
  seedStudentSubjects,
  streakFor,
  updateSubject,
  uploadBook,
  useCurrentProfile,
  useDB,
  type Challenge,
  type LiveBattleConfig,
} from "@/lib/store";
import { getQuestionsByScope, getSummariesFor, SUBJECTS, type AIQuestion } from "@/lib/ai-content";
import { ScopePicker } from "@/components/ScopePicker";
import { supabase } from "@/lib/supabase";
import type { BMsg, WireQ } from "./supervisor";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "لوحة الطالب — مذاكرة" }] }),
  component: StudentPage,
});

type TabKey = "today" | "subjects" | "quiz" | "summaries" | "books" | "ranking" | "challenges";

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
              ["summaries", "📋 ملخصات"],
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
          {tab === "summaries" && <SummariesView />}
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
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    await seedStudentSubjects(profile.username);
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      {subjects.length === 0 ? (
        <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border">
          <div className="text-6xl mb-3">📘</div>
          <h3 className="text-xl font-bold">ابدأ بتهيئة مواد المنهج</h3>
          <p className="text-muted-foreground mt-1 mb-5">
            سيتم إضافة مواد الثانوية العامة الثالث (إنجليزي، إحصاء، عربي، تاريخ، جغرافيا) دفعةً واحدة.
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-hero text-primary-foreground font-bold px-6 py-3 rounded-2xl shadow-glow disabled:opacity-50"
          >
            {seeding ? "جارٍ الإضافة..." : "إضافة مواد المنهج ✦"}
          </button>
        </div>
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
                        {s.doneChapters} / {s.totalChapters} وحدة
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
                <p className="text-xs text-muted-foreground mt-1">{pct}% مكتمل</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      void updateSubject(s.id, {
                        doneChapters: Math.min(s.totalChapters, s.doneChapters + 1),
                      })
                    }
                    className="flex-1 glass rounded-2xl py-2 text-sm font-semibold"
                  >
                    + وحدة تمت
                  </button>
                  <button
                    onClick={() =>
                      void updateSubject(s.id, { doneChapters: Math.max(0, s.doneChapters - 1) })
                    }
                    className="flex-1 glass rounded-2xl py-2 text-sm font-semibold"
                  >
                    − وحدة
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
const difficultyLabel: Record<string, string> = { easy: "سهل", medium: "متوسط", hard: "صعب" };
const difficultyColor: Record<string, string> = {
  easy: "bg-success/20 text-success",
  medium: "bg-warning/20 text-warning",
  hard: "bg-destructive/20 text-destructive",
};

function QuizView() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const dbSubjects = db.subjects.filter((s) => s.ownerUsername === profile.username);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [unit, setUnit] = useState("");
  const [lesson, setLesson] = useState("");
  const [count, setCount] = useState<5 | 10>(5);
  const [qs, setQs] = useState<AIQuestion[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const start = () => {
    if (!selectedSubject) return;
    setQs(getQuestionsByScope(selectedSubject, unit || undefined, lesson || undefined, count));
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
      setDone(true);
      if (score / qs.length >= 0.6) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
      // log in background — don't block the result screen
      const dbSubj = dbSubjects.find((s) => s.name === selectedSubject);
      if (dbSubj) {
        logQuiz(profile.username, dbSubj.id, score, qs.length).catch(() => {});
      }
    }
  };

  if (!qs) {
    return (
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft max-w-xl mx-auto">
        <h3 className="text-xl font-bold mb-4">اختبار سريع</h3>
        <label className="text-sm text-muted-foreground">اختر المادة</label>
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setUnit("");
            setLesson("");
          }}
          className="w-full bg-input rounded-2xl px-4 py-3 mt-1 outline-none"
        >
          <option value="">— اختر —</option>
          {SUBJECTS.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        {selectedSubject && (
          <div className="mt-4">
            <ScopePicker
              subject={selectedSubject}
              unit={unit}
              lesson={lesson}
              onUnitChange={setUnit}
              onLessonChange={setLesson}
            />
          </div>
        )}
        <label className="text-sm text-muted-foreground mt-4 block">عدد الأسئلة</label>
        <div className="flex gap-3 mt-1">
          {([5, 10] as const).map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-2.5 rounded-2xl font-bold border transition ${count === n ? "bg-hero text-primary-foreground border-transparent shadow-glow" : "glass border-border"}`}
            >
              {n} أسئلة
            </button>
          ))}
        </div>
        <button
          onClick={start}
          disabled={!selectedSubject}
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
        <div className="text-6xl mb-3">{score === qs.length ? "🏆" : score >= qs.length * 0.6 ? "🎉" : "💪"}</div>
        <h3 className="text-2xl font-bold">نتيجتك: {score} / {qs.length}</h3>
        <p className="text-muted-foreground mt-2">
          {score === qs.length ? "ممتاز! أداء كامل." : score >= qs.length * 0.6 ? "أداء جيد — استمر." : "حاول مرة أخرى بعد مراجعة سريعة."}
        </p>
        <div className="mt-6 grid gap-2 text-right">
          {qs.map((q, i) => (
            <div key={i} className="glass rounded-2xl p-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <p className="font-semibold text-sm flex-1">{q.q}</p>
                <span className={`text-xs rounded-full px-2 py-0.5 font-bold shrink-0 ${difficultyColor[q.difficulty]}`}>
                  {difficultyLabel[q.difficulty]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{q.unit} • {q.lesson}</p>
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
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>السؤال {idx + 1} من {qs.length}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${difficultyColor[q.difficulty]}`}>
          {difficultyLabel[q.difficulty]}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{q.unit} • {q.lesson}</p>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
        <div className="h-full bg-hero" style={{ width: `${(idx / qs.length) * 100}%` }} />
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

// ============== SUMMARIES ==============
function SummariesView() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const summaries = selectedSubject ? getSummariesFor(selectedSubject) : [];

  return (
    <div className="space-y-5">
      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="font-bold mb-3">ملخصات الكتب المدرسية</h3>
        <label className="text-sm text-muted-foreground">اختر المادة</label>
        <select
          value={selectedSubject}
          onChange={(e) => { setSelectedSubject(e.target.value); setExpanded(null); }}
          className="w-full bg-input rounded-2xl px-4 py-3 mt-1 outline-none"
        >
          <option value="">— اختر المادة —</option>
          {SUBJECTS.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {!selectedSubject && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SUBJECTS.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedSubject(name)}
              className="bg-card-gradient rounded-2xl p-4 border border-border shadow-soft text-center font-bold hover:bg-primary/10 transition"
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {selectedSubject && summaries.length === 0 && (
        <EmptyState icon="📋" title="لا توجد ملخصات" desc="لا تتوفر ملخصات لهذه المادة بعد." />
      )}

      {summaries.map((s, i) => {
        const key = `${s.subject}-${i}`;
        const isOpen = expanded === key;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card-gradient rounded-3xl border border-border shadow-soft overflow-hidden"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : key)}
              className="w-full flex items-center justify-between gap-3 p-5 text-right"
            >
              <div>
                <p className="text-xs text-muted-foreground">{s.unit}</p>
                <h4 className="font-bold text-lg">{s.title}</h4>
              </div>
              <span className="text-xl shrink-0">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <div>
                  <p className="font-bold text-sm mb-2">النقاط الرئيسية</p>
                  <ul className="space-y-1.5">
                    {s.keyPoints.map((kp, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-0.5 shrink-0">✦</span>
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
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
  const username = profile.username;
  const [activeBattle, setActiveBattle] = useState<Challenge | null>(null);

  const liveBattles = db.challenges
    .filter((c) => {
      if (!isLiveBattle(c)) return false;
      const cfg = parseLiveBattleConfig(c);
      return cfg && (cfg.p1 === username || cfg.p2 === username) && c.status !== "done";
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  if (activeBattle) {
    const cfg = parseLiveBattleConfig(activeBattle);
    if (cfg) {
      return (
        <PlayerBattleRoom
          battle={activeBattle}
          cfg={cfg}
          username={username}
          db={db}
          onExit={() => setActiveBattle(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Live battles */}
      {liveBattles.length === 0 ? (
        <EmptyState
          icon="⚔️"
          title="لا توجد مسابقات حية"
          desc="اطلب من المشرف إنشاء مسابقة من لوحة المشرف تحت تبويب «مسابقات حية»."
        />
      ) : (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">مسابقاتي الحية 🎮</h3>
          {liveBattles.map((b) => {
            const cfg = parseLiveBattleConfig(b)!;
            const isP1 = cfg.p1 === username;
            const opponentUsername = isP1 ? cfg.p2 : cfg.p1;
            const opponent = db.profiles.find((p) => p.username === opponentUsername);
            const isActive = b.status === "accepted";
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs rounded-full px-2 py-0.5 font-bold ${isActive ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                        {isActive ? "● جارٍ" : "⏳ انتظار"}
                      </span>
                      <span className="font-bold text-lg">{cfg.subject}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ضد {opponent?.avatar ?? "🎓"} {opponent?.displayName ?? opponentUsername} • {cfg.totalRounds} جولات
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveBattle(b)}
                    className="bg-hero text-primary-foreground font-bold px-5 py-2.5 rounded-2xl shadow-glow shrink-0 animate-pulse"
                  >
                    {isActive ? "دخول ▶" : "انضم ▶"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Player Battle Room ────────────────────────────────────────────────────────
function PlayerBattleRoom({
  battle, cfg, username, db, onExit,
}: {
  battle: Challenge;
  cfg: LiveBattleConfig;
  username: string;
  db: ReturnType<typeof useDB>;
  onExit: () => void;
}) {
  type Phase = "lobby" | "question" | "i_buzzed" | "they_buzzed" | "waiting_verdict" | "round_result" | "done";
  const [phase, setPhase] = useState<Phase>("lobby");
  const [questions, setQuestions] = useState<WireQ[]>([]);
  const [qi, setQi] = useState(0);
  const [buzzer, setBuzzer] = useState<string | null>(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [lastVerdict, setLastVerdict] = useState<{ ok: boolean; opt: number } | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const send = useCallback((msg: BMsg) => {
    channelRef.current?.send({ type: "broadcast", event: "b", payload: msg });
  }, []);

  useEffect(() => {
    const ch = supabase.channel(`battle:${battle.id}`);

    ch.on("broadcast", { event: "b" }, ({ payload }) => {
      const msg = payload as BMsg;
      switch (msg.t) {
        case "START":
          setQuestions(msg.qs);
          setQi(0);
          setPhase("question");
          break;
        case "BUZZED":
          setBuzzer(msg.who);
          setPhase(msg.who === username ? "i_buzzed" : "they_buzzed");
          break;
        case "VERDICT":
          setScores({ p1: msg.p1, p2: msg.p2 });
          setLastVerdict({ ok: msg.ok, opt: msg.opt });
          setPhase("round_result");
          break;
        case "NEXT":
          setQi(msg.qi);
          setBuzzer(null);
          setLastVerdict(null);
          setPhase("question");
          break;
        case "DONE":
          setScores({ p1: msg.p1, p2: msg.p2 });
          setWinner(msg.winner);
          setPhase("done");
          break;
      }
    });

    ch.subscribe(() => {
      send({ t: "JOIN", who: username });
    });

    channelRef.current = ch;
    return () => { supabase.removeChannel(ch); };
  }, [battle.id, username, send]);

  const buzz = () => {
    if (phaseRef.current !== "question") return;
    send({ t: "BUZZ", who: username, qi, ts: Date.now() });
  };

  const answer = (opt: number) => {
    if (phaseRef.current !== "i_buzzed") return;
    setPhase("waiting_verdict");
    send({ t: "ANSWER", who: username, opt, qi });
  };

  const isP1 = cfg.p1 === username;
  const myScore = isP1 ? scores.p1 : scores.p2;
  const theirScore = isP1 ? scores.p2 : scores.p1;
  const opponentUsername = isP1 ? cfg.p2 : cfg.p1;
  const opponent = db.profiles.find((p) => p.username === opponentUsername);
  const q = questions[qi];

  // Lobby
  if (phase === "lobby") {
    return (
      <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border shadow-soft max-w-md mx-auto">
        <div className="text-6xl mb-4">⚔️</div>
        <h3 className="text-2xl font-bold">مسابقة {cfg.subject}</h3>
        <p className="text-muted-foreground mt-1">
          ضد {opponent?.avatar ?? "🎓"} {opponent?.displayName ?? opponentUsername}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: "300ms" }} />
          <span className="mr-2 text-sm">انتظار المشرف للبدء</span>
        </div>
        <button onClick={onExit} className="mt-8 text-xs text-muted-foreground hover:underline">
          خروج
        </button>
      </div>
    );
  }

  // Done
  if (phase === "done") {
    const iWon = winner === username;
    const isDraw = winner === null;
    return (
      <div className="bg-card-gradient rounded-3xl p-10 text-center border border-border shadow-soft max-w-md mx-auto">
        <div className="text-7xl mb-4">{iWon ? "🏆" : isDraw ? "🤝" : "💪"}</div>
        <h3 className="text-3xl font-bold">
          {iWon ? "فزت! 🎉" : isDraw ? "تعادل!" : "خسرت هذه المرة"}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          {iWon ? "أنت الأسرع والأذكى!" : isDraw ? "المباراة متكافئة" : "استمر في التدريب!"}
        </p>
        <div className="flex justify-center gap-12 mt-8">
          <div className="text-center">
            <div className="text-4xl font-black">{myScore}</div>
            <div className="text-xs text-muted-foreground mt-1">أنا</div>
          </div>
          <div className="text-xl text-muted-foreground self-center">vs</div>
          <div className="text-center">
            <div className="text-4xl font-black">{theirScore}</div>
            <div className="text-xs text-muted-foreground mt-1">{opponent?.displayName ?? opponentUsername}</div>
          </div>
        </div>
        <button onClick={onExit}
          className="mt-8 bg-hero text-primary-foreground font-bold px-8 py-3 rounded-2xl shadow-glow">
          خروج
        </button>
      </div>
    );
  }

  // Active game
  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* Score bar */}
      <div className="bg-card-gradient rounded-2xl p-4 border border-border flex items-center justify-between">
        <div className="text-center">
          <div className="text-3xl font-black">{myScore}</div>
          <div className="text-xs text-muted-foreground">أنا</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-muted-foreground">جولة</div>
          <div className="text-xl font-black">{qi + 1} / {cfg.totalRounds}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black">{theirScore}</div>
          <div className="text-xs text-muted-foreground">{opponent?.displayName ?? opponentUsername}</div>
        </div>
      </div>

      {q && (
        <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft">
          <p className="text-xs text-muted-foreground mb-2">{q.unit}</p>
          <h3 className="text-xl font-bold mb-6 leading-relaxed text-center">{q.q}</h3>

          {/* BUZZ button */}
          {phase === "question" && (
            <button
              onPointerDown={buzz}
              className="w-full h-36 bg-hero text-primary-foreground text-4xl font-black rounded-3xl shadow-glow transition-transform active:scale-95 select-none touch-none"
              style={{ WebkitUserSelect: "none" }}
            >
              🔔 اضغط أولاً!
            </button>
          )}

          {/* Answer options when I buzzed */}
          {phase === "i_buzzed" && (
            <div className="space-y-3">
              <p className="text-success font-bold text-sm text-center mb-3">✅ أنت الأول! اختر الإجابة:</p>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => answer(i)}
                  className="w-full text-right glass rounded-2xl p-4 hover:bg-primary/20 border border-transparent hover:border-primary transition font-semibold">
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Opponent buzzed */}
          {phase === "they_buzzed" && (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">⏳</div>
              <p className="text-lg font-bold">{buzzer} ضغط أولاً!</p>
              <p className="text-muted-foreground text-sm mt-1">ينتظر إجابته...</p>
            </div>
          )}

          {/* Waiting for server verdict after my answer */}
          {phase === "waiting_verdict" && (
            <div className="text-center py-8">
              <div className="text-5xl animate-spin mb-3">⚙️</div>
              <p className="text-muted-foreground">انتظار النتيجة...</p>
            </div>
          )}

          {/* Round result */}
          {phase === "round_result" && lastVerdict && (
            <div className={`text-center py-4 rounded-2xl border ${lastVerdict.ok ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
              <div className="text-6xl mb-2">{lastVerdict.ok ? "✅" : "❌"}</div>
              <p className="text-lg font-bold">
                {lastVerdict.ok
                  ? (buzzer === username ? "إجابة صحيحة! +1 نقطة 🎉" : `${buzzer} أجاب صح`)
                  : (buzzer === username ? "إجابة خاطئة!" : `${buzzer} أجاب خطأ`)}
              </p>
              {!lastVerdict.ok && (
                <p className="text-sm text-muted-foreground mt-1">
                  الصحيحة: {q.options[q.correct]}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-3 animate-pulse">السؤال التالي خلال ثانية...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
