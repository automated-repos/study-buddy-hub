import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell, Tab } from "@/components/AppShell";
import { BookLink } from "@/components/BookLink";
import {
  addSubject,
  createLiveBattle,
  deleteSubject,
  isLiveBattle,
  minutesToday,
  parseLiveBattleConfig,
  pointsFor,
  setChallengeStatus,
  setSubjectBook,
  streakFor,
  uploadSubjectBook,
  useDB,
  type Challenge,
  type LiveBattleConfig,
} from "@/lib/store";
import { SUBJECTS, getQuestionsFromLessons } from "@/lib/ai-content";
import { LessonProgressEditor } from "@/components/LessonProgressEditor";
import { battleBlockers, battleLessons, commonFullUnits, commonLessons, unitsOf } from "@/lib/progress";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/supervisor")({
  head: () => ({ meta: [{ title: "لوحة المشرف — مذاكرة" }] }),
  component: SupervisorPage,
});

type TabKey = "overview" | "subjects" | "battles";

const COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#22d3ee", "#facc15"];

// ── Battle realtime types ─────────────────────────────────────────────────────
export interface WireQ {
  id: string;
  q: string;
  options: string[];
  correct: number;
  unit: string;
}
export type BMsg =
  | { t: "JOIN"; who: string }
  | { t: "START"; qs: WireQ[] }
  | { t: "BUZZ"; who: string; qi: number; ts: number }
  | { t: "BUZZED"; who: string; qi: number }
  | { t: "ANSWER"; who: string; opt: number; qi: number }
  | { t: "VERDICT"; ok: boolean; opt: number; p1: number; p2: number }
  | { t: "NEXT"; qi: number }
  | { t: "DONE"; winner: string | null; p1: number; p2: number };

function SupervisorPage() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <AppShell
      tabs={
        <>
          <Tab active={tab === "overview"} onClick={() => setTab("overview")}>📊 المتابعة</Tab>
          <Tab active={tab === "subjects"} onClick={() => setTab("subjects")}>📘 إدارة المواد</Tab>
          <Tab active={tab === "battles"} onClick={() => setTab("battles")}>⚔️ مسابقات حية</Tab>
        </>
      }
    >
      {tab === "overview" && <OverviewTab />}
      {tab === "subjects" && <SubjectsTab />}
      {tab === "battles" && <BattlesTab />}
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

// ── Battles tab ───────────────────────────────────────────────────────────────
function BattlesTab() {
  const db = useDB();
  const supervisorUsername = db.currentUsername!;
  const students = db.profiles.filter((p) => p.role === "student");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [unit, setUnit] = useState("");
  const [lesson, setLesson] = useState("");
  const [rounds, setRounds] = useState(5);
  const [creating, setCreating] = useState(false);
  const [activeBattle, setActiveBattle] = useState<Challenge | null>(null);

  // What both students have finished: single lessons and complete units
  const pair = p1 && p2 ? [p1, p2] : [];
  const shared = pair.length ? commonLessons(db.progress, pair, subject) : [];
  const fullUnits = pair.length ? commonFullUnits(db.progress, pair, subject) : [];
  const scopeLessons = battleLessons(db.progress, pair, subject, unit || undefined, lesson || undefined);
  const blocked =
    pair.length > 0 &&
    battleBlockers(db.progress, pair, subject, unit || undefined, lesson || undefined).length > 0;
  const nameOf = (u: string) => students.find((s) => s.username === u)?.displayName ?? u;
  const scopeValue = lesson ? `l:${unit}\u0001${lesson}` : unit ? `u:${unit}` : "";
  const onScope = (v: string) => {
    if (v.startsWith("l:")) {
      const [u, l] = v.slice(2).split("\u0001");
      setUnit(u);
      setLesson(l);
    } else {
      setUnit(v.startsWith("u:") ? v.slice(2) : "");
      setLesson("");
    }
  };

  const myBattles = db.challenges
    .filter((c) => isLiveBattle(c) && c.from === supervisorUsername)
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleCreate = async () => {
    if (!p1 || !p2 || p1 === p2 || blocked) return;
    setCreating(true);
    try {
      await createLiveBattle({
        supervisorUsername, p1, p2, subject,
        unit: unit || undefined, lesson: lesson || undefined,
        // a single lesson may have fewer questions than the chosen rounds
        totalRounds: Math.min(rounds, getQuestionsFromLessons(subject, scopeLessons, 1000).length),
      });
    } finally {
      setCreating(false);
    }
  };

  if (activeBattle) {
    const cfg = parseLiveBattleConfig(activeBattle);
    if (cfg) {
      return (
        <SupervisorBattleRoom
          battle={activeBattle}
          cfg={cfg}
          supervisorUsername={supervisorUsername}
          db={db}
          onExit={() => setActiveBattle(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">مسابقات حية</h1>
        <p className="text-muted-foreground mt-1">
          أنشئ مسابقة سرعة بين طالبَين — من يضغط أولاً ويجيب صح يفوز.
        </p>
      </div>

      {/* Create battle */}
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft space-y-4">
        <h3 className="font-bold text-lg">إنشاء مسابقة جديدة</h3>
        {students.length < 2 ? (
          <p className="text-muted-foreground text-sm">تحتاج طالبَين على الأقل لإنشاء مسابقة.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">الطالب الأول</label>
                <select value={p1} onChange={(e) => setP1(e.target.value)}
                  className="w-full bg-input rounded-2xl px-4 py-3 outline-none">
                  <option value="">— اختر —</option>
                  {students.filter((s) => s.username !== p2).map((s) => (
                    <option key={s.username} value={s.username}>{s.avatar} {s.displayName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">الطالب الثاني</label>
                <select value={p2} onChange={(e) => setP2(e.target.value)}
                  className="w-full bg-input rounded-2xl px-4 py-3 outline-none">
                  <option value="">— اختر —</option>
                  {students.filter((s) => s.username !== p1).map((s) => (
                    <option key={s.username} value={s.username}>{s.avatar} {s.displayName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">المادة</label>
                <select value={subject}
                  onChange={(e) => { setSubject(e.target.value); setUnit(""); setLesson(""); }}
                  className="w-full bg-input rounded-2xl px-4 py-3 outline-none">
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <label className="block text-xs text-muted-foreground mb-1 mt-3">نطاق الأسئلة</label>
                <select value={scopeValue} onChange={(e) => onScope(e.target.value)}
                  disabled={pair.length === 0 || shared.length === 0}
                  className="w-full bg-input rounded-2xl px-4 py-3 outline-none disabled:opacity-50">
                  {pair.length === 0 ? (
                    <option value="">اختر الطالبين أولاً</option>
                  ) : shared.length === 0 ? (
                    <option value="">لا توجد دروس أنهاها الطالبان</option>
                  ) : (
                    <>
                      <option value="">كل الدروس المشتركة ({shared.length} درس)</option>
                      {unitsOf(subject)
                        .filter((u) => shared.some((l) => l.unit === u))
                        .map((u) => (
                          <optgroup key={u} label={u}>
                            {fullUnits.includes(u) && <option value={`u:${u}`}>✅ الوحدة كاملة</option>}
                            {shared.filter((l) => l.unit === u).map((l) => (
                              <option key={l.lesson} value={`l:${u}\u0001${l.lesson}`}>{l.lesson}</option>
                            ))}
                          </optgroup>
                        ))}
                    </>
                  )}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  تظهر فقط الدروس والوحدات الكاملة التي أنهاها الطالبان معاً.
                </p>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">عدد الجولات</label>
                <div className="flex gap-2">
                  {[3, 5, 7, 10].map((n) => (
                    <button key={n} onClick={() => setRounds(n)}
                      className={`flex-1 py-3 rounded-2xl font-bold border transition ${rounds === n ? "bg-hero text-primary-foreground border-transparent shadow-glow" : "glass border-border"}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {blocked && (
              <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm space-y-1">
                <p className="font-bold text-warning">⚠️ لا يمكن بدء مسابقة في {subject}</p>
                <p>
                  لا توجد دروس في هذه المادة أنهاها {nameOf(p1)} و{nameOf(p2)} معاً.
                </p>
                <p className="text-xs text-muted-foreground">
                  اختر مادة أخرى، أو حدّث الدروس المنتهية من تبويب المتابعة.
                </p>
              </div>
            )}
            <button
              onClick={handleCreate}
              disabled={!p1 || !p2 || creating || blocked}
              className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow disabled:opacity-50"
            >
              {creating ? "جارٍ الإنشاء..." : "إنشاء المسابقة ⚡"}
            </button>
          </>
        )}
      </div>

      {/* Battle list */}
      {myBattles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold">المسابقات السابقة</h3>
          {myBattles.map((b) => {
            const cfg = parseLiveBattleConfig(b);
            if (!cfg) return null;
            const p1P = db.profiles.find((p) => p.username === cfg.p1);
            const p2P = db.profiles.find((p) => p.username === cfg.p2);
            return (
              <div key={b.id}
                className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold">
                    {p1P?.avatar ?? "🎓"} {cfg.p1} <span className="text-muted-foreground">vs</span> {p2P?.avatar ?? "🎓"} {cfg.p2}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {cfg.subject}{cfg.unit ? ` • ${cfg.unit}` : ""}{cfg.lesson ? ` • ${cfg.lesson}` : ""} • {cfg.totalRounds} جولات
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs rounded-full px-3 py-1 font-bold ${
                    b.status === "pending" ? "bg-warning/20 text-warning" :
                    b.status === "accepted" ? "bg-primary/20 text-primary" :
                    "bg-success/20 text-success"
                  }`}>
                    {b.status === "pending" ? "انتظار" : b.status === "accepted" ? "جارٍ" : "انتهت"}
                  </span>
                  {b.status !== "done" && (
                    <button onClick={() => setActiveBattle(b)}
                      className="bg-hero text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl shadow-glow">
                      دخول
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Supervisor Battle Room ────────────────────────────────────────────────────
function SupervisorBattleRoom({
  battle, cfg, supervisorUsername, db, onExit,
}: {
  battle: Challenge;
  cfg: LiveBattleConfig;
  supervisorUsername: string;
  db: ReturnType<typeof useDB>;
  onExit: () => void;
}) {
  type Phase = "lobby" | "question" | "buzzed" | "verdict" | "done";
  const [phase, setPhase] = useState<Phase>("lobby");
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<WireQ[]>([]);
  const [qi, setQi] = useState(0);
  const [buzzer, setBuzzer] = useState<string | null>(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [lastVerdict, setLastVerdict] = useState<{ ok: boolean; opt: number } | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const pendingBuzzes = useRef<{ who: string; qi: number; ts: number }[]>([]);
  const scoresRef = useRef(scores);
  const qiRef = useRef(qi);
  const questionsRef = useRef(questions);
  scoresRef.current = scores;
  qiRef.current = qi;
  questionsRef.current = questions;

  const send = useCallback((msg: BMsg) => {
    channelRef.current?.send({ type: "broadcast", event: "b", payload: msg });
  }, []);

  const handleVerdict = useCallback((buzzerWho: string, opt: number, currentQi: number) => {
    const q = questionsRef.current[currentQi];
    if (!q) return;
    const ok = q.correct === opt;
    const s = { ...scoresRef.current };
    if (ok) { if (buzzerWho === cfg.p1) s.p1++; else s.p2++; }
    setScores(s);
    setLastVerdict({ ok, opt });
    setPhase("verdict");
    send({ t: "VERDICT", ok, opt, p1: s.p1, p2: s.p2 });

    setTimeout(() => {
      const nextQi = currentQi + 1;
      if (nextQi >= questionsRef.current.length) {
        const w = s.p1 > s.p2 ? cfg.p1 : s.p2 > s.p1 ? cfg.p2 : null;
        setWinner(w);
        setPhase("done");
        send({ t: "DONE", winner: w, p1: s.p1, p2: s.p2 });
        void setChallengeStatus(battle.id, "done", w ?? undefined);
      } else {
        setQi(nextQi);
        setBuzzer(null);
        setLastVerdict(null);
        setPhase("question");
        send({ t: "NEXT", qi: nextQi });
      }
    }, 2500);
  }, [cfg, battle.id, send]);

  useEffect(() => {
    const ch = supabase.channel(`battle:${battle.id}`);

    ch.on("broadcast", { event: "b" }, ({ payload }) => {
      const msg = payload as BMsg;
      if (msg.t === "JOIN") {
        setJoined((prev) => new Set([...prev, msg.who]));
      } else if (msg.t === "BUZZ") {
        pendingBuzzes.current.push(msg);
        // wait 80ms to collect near-simultaneous buzzes then pick earliest
        setTimeout(() => {
          const relevant = pendingBuzzes.current.filter((b) => b.qi === msg.qi);
          if (relevant.length === 0) return;
          pendingBuzzes.current = [];
          const first = relevant.reduce((a, b) => (a.ts <= b.ts ? a : b));
          setBuzzer(first.who);
          setPhase("buzzed");
          send({ t: "BUZZED", who: first.who, qi: first.qi });
        }, 80);
      } else if (msg.t === "ANSWER") {
        if (msg.qi !== qiRef.current) return;
        handleVerdict(msg.who, msg.opt, msg.qi);
      }
    });

    ch.subscribe();
    channelRef.current = ch;
    return () => { supabase.removeChannel(ch); };
  }, [battle.id, send, handleVerdict]);

  const players = [cfg.p1, cfg.p2];
  const startBlockers = battleBlockers(db.progress, players, cfg.subject, cfg.unit, cfg.lesson);

  const startBattle = () => {
    if (startBlockers.length > 0) return;
    const lessons = battleLessons(db.progress, players, cfg.subject, cfg.unit, cfg.lesson);
    const qs = getQuestionsFromLessons(cfg.subject, lessons, cfg.totalRounds).map((q) => ({
      id: q.id, q: q.q, options: q.options, correct: q.correct, unit: q.unit,
    }));
    setQuestions(qs);
    setQi(0);
    setPhase("question");
    send({ t: "START", qs });
    void setChallengeStatus(battle.id, "accepted");
  };

  const p1P = db.profiles.find((p) => p.username === cfg.p1);
  const p2P = db.profiles.find((p) => p.username === cfg.p2);
  const q = questions[qi];

  if (phase === "lobby") {
    const bothJoined = joined.has(cfg.p1) && joined.has(cfg.p2);
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <button onClick={onExit} className="text-xs text-muted-foreground hover:underline">← رجوع</button>
        <div className="bg-card-gradient rounded-3xl p-8 border border-border shadow-soft text-center">
          <div className="text-5xl mb-4">⚔️</div>
          <h2 className="text-2xl font-bold">مسابقة {cfg.subject}</h2>
          {(cfg.unit || cfg.lesson) && (
            <p className="text-sm text-muted-foreground mt-1">
              {[cfg.unit, cfg.lesson].filter(Boolean).join(" • ")}
            </p>
          )}
          <p className="text-muted-foreground mt-1">{cfg.totalRounds} جولات</p>

          <div className="flex justify-center gap-8 mt-8">
            {[{ username: cfg.p1, profile: p1P }, { username: cfg.p2, profile: p2P }].map(({ username, profile }) => (
              <div key={username} className="text-center">
                <div className={`text-4xl mb-2 transition-all ${joined.has(username) ? "opacity-100" : "opacity-30 grayscale"}`}>
                  {profile?.avatar ?? "🎓"}
                </div>
                <div className="font-bold text-sm">{profile?.displayName ?? username}</div>
                <div className={`text-xs mt-1 font-bold ${joined.has(username) ? "text-success" : "text-muted-foreground"}`}>
                  {joined.has(username) ? "✅ جاهز" : "⏳ انتظار..."}
                </div>
              </div>
            ))}
          </div>

          {startBlockers.length > 0 && (
            <div className="mt-6 rounded-2xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning font-semibold">
              ⚠️ لا يمكن البدء:{" "}
              {startBlockers
                .map((u) => db.profiles.find((x) => x.username === u)?.displayName ?? u)
                .join(" و ")}{" "}
              لم ينهِ دروس هذه المسابقة بعد.
            </div>
          )}

          <button
            onClick={startBattle}
            disabled={!bothJoined || startBlockers.length > 0}
            className="mt-8 w-full bg-hero text-primary-foreground font-bold py-4 rounded-2xl shadow-glow disabled:opacity-40 text-xl transition"
          >
            {startBlockers.length > 0
              ? "الدروس غير مكتملة"
              : bothJoined
                ? "ابدأ المسابقة ▶"
                : "انتظار الطلاب..."}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const p1Won = winner === cfg.p1;
    const p2Won = winner === cfg.p2;
    return (
      <div className="max-w-lg mx-auto bg-card-gradient rounded-3xl p-8 border border-border shadow-soft text-center">
        <div className="text-7xl mb-4">{winner ? "🏆" : "🤝"}</div>
        <h2 className="text-3xl font-bold">
          {winner ? `فاز ${winner === cfg.p1 ? p1P?.displayName ?? cfg.p1 : p2P?.displayName ?? cfg.p2}!` : "تعادل!"}
        </h2>
        <div className="flex justify-center gap-10 mt-8">
          <div className={`text-center ${p1Won ? "opacity-100" : "opacity-60"}`}>
            <div className="text-4xl">{p1P?.avatar ?? "🎓"}</div>
            <div className="text-3xl font-black mt-2">{scores.p1}</div>
            <div className="text-xs text-muted-foreground">{p1P?.displayName ?? cfg.p1}</div>
            {p1Won && <div className="text-warning text-sm font-bold mt-1">👑 فائز</div>}
          </div>
          <div className="text-2xl text-muted-foreground self-center">vs</div>
          <div className={`text-center ${p2Won ? "opacity-100" : "opacity-60"}`}>
            <div className="text-4xl">{p2P?.avatar ?? "🎓"}</div>
            <div className="text-3xl font-black mt-2">{scores.p2}</div>
            <div className="text-xs text-muted-foreground">{p2P?.displayName ?? cfg.p2}</div>
            {p2Won && <div className="text-warning text-sm font-bold mt-1">👑 فائز</div>}
          </div>
        </div>
        <button onClick={onExit}
          className="mt-8 bg-hero text-primary-foreground font-bold px-8 py-3 rounded-2xl shadow-glow">
          إنهاء
        </button>
      </div>
    );
  }

  // Active game
  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Score bar */}
      <div className="bg-card-gradient rounded-2xl p-4 border border-border flex items-center justify-between">
        <div className="text-center">
          <div className="text-3xl font-black">{scores.p1}</div>
          <div className="text-xs text-muted-foreground">{p1P?.avatar} {p1P?.displayName ?? cfg.p1}</div>
        </div>
        <div className="text-center text-muted-foreground">
          <div className="text-lg font-bold">{qi + 1} / {cfg.totalRounds}</div>
          <div className="text-xs">جولة</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black">{scores.p2}</div>
          <div className="text-xs text-muted-foreground">{p2P?.avatar} {p2P?.displayName ?? cfg.p2}</div>
        </div>
      </div>

      {q && (
        <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft">
          <p className="text-xs text-muted-foreground mb-2">{q.unit}</p>
          <h3 className="text-xl font-bold mb-6">{q.q}</h3>

          {/* Answer options (supervisor sees them always for verification) */}
          <div className="grid gap-2 mb-4">
            {q.options.map((opt, i) => (
              <div key={i} className={`rounded-2xl p-3 text-sm border text-right ${
                i === q.correct ? "border-success/50 bg-success/10 text-success font-bold" : "glass border-border"
              }`}>
                {opt}
              </div>
            ))}
          </div>

          {phase === "question" && (
            <div className="text-center py-3 animate-pulse text-muted-foreground">
              ⏳ انتظار الضغط...
            </div>
          )}
          {phase === "buzzed" && buzzer && (
            <div className="text-center py-3 bg-warning/10 rounded-2xl border border-warning/30">
              <div className="text-2xl font-bold text-warning">🔔 {buzzer} ضغط أولاً!</div>
              <div className="text-sm text-muted-foreground mt-1">انتظار إجابته...</div>
            </div>
          )}
          {phase === "verdict" && lastVerdict && (
            <div className={`text-center py-3 rounded-2xl border ${lastVerdict.ok ? "bg-success/10 border-success/30 text-success" : "bg-destructive/10 border-destructive/30 text-destructive"}`}>
              <div className="text-2xl font-bold">{lastVerdict.ok ? "✅ إجابة صحيحة!" : "❌ إجابة خاطئة"}</div>
              {!lastVerdict.ok && <div className="text-xs mt-1">الصحيحة: {q.options[q.correct]}</div>}
              <div className="text-xs text-muted-foreground mt-1 animate-pulse">السؤال التالي...</div>
            </div>
          )}
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

      <form onSubmit={add} className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft space-y-4">
        <h3 className="font-bold text-lg">إضافة مادة جديدة</h3>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">اسم المادة</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              placeholder="مثال: رياضيات"
              className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">عدد الفصول في الكتاب</label>
            <input type="number" min={1} max={50} value={chapters}
              onChange={(e) => setChapters(parseInt(e.target.value) || 1)}
              className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-center text-lg font-bold" />
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
                className="text-xs text-destructive hover:underline shrink-0">إزالة</button>
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

        {busy && (
          <div className="rounded-2xl bg-muted/40 px-4 py-3 space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>{status === "uploading" ? "⬆️ جارٍ رفع الكتاب..." : "💾 جارٍ الحفظ..."}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full bg-hero rounded-full ${status === "uploading" ? "w-2/3" : "w-full"} transition-all duration-500`} />
            </div>
          </div>
        )}
        {errorMsg && <div className="rounded-2xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive">❌ {errorMsg}</div>}
        {successMsg && <div className="rounded-2xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm font-semibold text-green-400">{successMsg}</div>}

        <button disabled={busy || !name.trim()}
          className="w-full bg-hero text-primary-foreground font-bold py-3.5 rounded-2xl shadow-glow disabled:opacity-60 transition">
          {busy ? (status === "uploading" ? "⬆️ يرفع الكتاب..." : "💾 يحفظ...") : "إضافة المادة لجميع الطلاب"}
        </button>
      </form>

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
                <button onClick={() => void removeSubject(s.name)} className="text-xs text-destructive hover:underline">
                  حذف من الكل
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                {s.bookPath ? (
                  <>
                    <BookLink path={s.bookPath} className="text-xs text-primary hover:underline">
                      📄 فتح الكتاب
                    </BookLink>
                    <label className={`text-xs text-muted-foreground hover:text-foreground cursor-pointer ${uploadingFor === s.name ? "opacity-50" : ""}`}>
                      {uploadingFor === s.name ? "جارٍ الرفع..." : "تغيير الكتاب"}
                      <input type="file" accept="application/pdf" className="hidden"
                        disabled={uploadingFor === s.name}
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) void replaceBook(s.name, f); }} />
                    </label>
                  </>
                ) : (
                  <label className={`text-xs text-muted-foreground hover:text-foreground cursor-pointer ${uploadingFor === s.name ? "opacity-50" : ""}`}>
                    {uploadingFor === s.name ? "جارٍ الرفع..." : "📎 رفع كتاب"}
                    <input type="file" accept="application/pdf" className="hidden"
                      disabled={uploadingFor === s.name}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) void replaceBook(s.name, f); }} />
                  </label>
                )}
              </div>

              <div className="mt-3 space-y-2">
                {students.map((st) => {
                  const sub = db.subjects.find((x) => x.ownerUsername === st.username && x.name === s.name);
                  const pct = sub ? Math.round((sub.doneChapters / Math.max(sub.totalChapters, 1)) * 100) : 0;
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
              <div className="w-full rounded-t-lg bg-hero transition-all"
                style={{ height: `${(d.min / maxMin) * 100}%`, minHeight: 4, opacity: d.min ? 1 : 0.2 }} />
              <span className="text-[10px] text-muted-foreground">{d.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground mb-2">📍 الدروس التي أنهاها (اضغط على المادة للتعديل)</p>
        <LessonProgressEditor username={username} />
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
