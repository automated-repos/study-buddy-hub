import { useState } from "react";
import { SUBJECTS } from "@/lib/ai-content";
import { formatClock, usePomodoro, useStudyRoomMembers, type RoomMember } from "@/lib/pomodoro";
import { minutesToday, useCurrentProfile, useDB } from "@/lib/store";

const PRESETS = [
  { focus: 25, brk: 5, label: "25 / 5 (كلاسيكي)" },
  { focus: 50, brk: 10, label: "50 / 10 (مذاكرة عميقة)" },
  { focus: 15, brk: 3, label: "15 / 3 (بداية خفيفة)" },
];

/** Student tab: Pomodoro timer + who else is studying right now. */
export function PomodoroRoom() {
  const profile = useCurrentProfile()!;
  const db = useDB();
  const { state, remaining, quote, lastMessage, members, start, stop, skipBreak } = usePomodoro();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [preset, setPreset] = useState(0);
  const running = !!state?.running;
  const total = state ? (state.phase === "focus" ? state.focusMin : state.breakMin) * 60 : 1;
  const pct = running ? 1 - remaining / total : 0;
  const others = members.filter((m) => m.username !== profile.username);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-card-gradient rounded-3xl p-6 border border-border shadow-soft text-center space-y-5">
        <h2 className="text-2xl font-bold">🍅 مذاكرة لايف بالبومودورو</h2>
        <p className="text-sm text-muted-foreground">
          ركّز وقتاً محدداً ثم استرح قليلاً. كل جلسة تركيز تُسجَّل تلقائياً في وقت مذاكرتك وتمنحك
          نجوماً.
        </p>

        {lastMessage && (
          <div className="rounded-2xl bg-success/15 text-success font-semibold p-3 text-sm">
            {lastMessage}
          </div>
        )}

        <div className="relative mx-auto size-56">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle cx="50" cy="50" r="45" className="fill-none stroke-muted" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className={`fill-none transition-all ${state?.phase === "break" ? "stroke-success" : "stroke-primary"}`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - pct)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-mono font-bold">
              {running ? formatClock(remaining) : formatClock(PRESETS[preset].focus * 60)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {running
                ? state!.phase === "focus"
                  ? `تركيز • ${state!.subject}`
                  : "استراحة ☕"
                : "جاهز"}
            </div>
            {running && <div className="text-xs mt-1">🍅 × {state!.cycles}</div>}
          </div>
        </div>

        {running ? (
          <>
            <p className="text-sm font-semibold text-accent">{quote}</p>
            <div className="flex gap-2 justify-center">
              {state!.phase === "break" && (
                <button
                  onClick={skipBreak}
                  className="bg-hero text-primary-foreground font-bold px-5 py-2.5 rounded-2xl shadow-glow"
                >
                  تخطي الاستراحة ▶
                </button>
              )}
              <button onClick={stop} className="glass rounded-2xl px-5 py-2.5 font-semibold">
                إيقاف ⏹
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              إيقاف الجلسة قبل نهايتها لا يسجّل وقتها. تستطيع التنقل بين التبويبات والمؤقت يعمل.
            </p>
          </>
        ) : (
          <div className="space-y-3 max-w-sm mx-auto text-right">
            <label className="block text-xs text-muted-foreground">المادة</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-input rounded-2xl px-4 py-3 outline-none"
            >
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <label className="block text-xs text-muted-foreground">
              نظام الجلسة (تركيز / استراحة بالدقائق)
            </label>
            <div className="grid gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPreset(i)}
                  className={`rounded-2xl py-2 text-sm font-semibold border ${preset === i ? "bg-hero text-primary-foreground border-transparent" : "glass border-border"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => start(subject, PRESETS[preset].focus, PRESETS[preset].brk)}
              className="w-full bg-hero text-primary-foreground font-bold py-3 rounded-2xl shadow-glow"
            >
              ابدأ التركيز 🍅
            </button>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          ذاكرت اليوم: {minutesToday(profile.username, db)} دقيقة
        </p>
      </div>

      <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
        <h3 className="font-bold mb-1">👥 يذاكرون الآن</h3>
        <p className="text-xs text-muted-foreground mb-3">
          يراك إخوتك والمشرف هنا أثناء جلسة التركيز.
        </p>
        <MemberList members={running ? members : others} me={profile.username} />
      </div>
    </div>
  );
}

function MemberList({ members, me }: { members: RoomMember[]; me?: string }) {
  if (members.length === 0)
    return (
      <p className="text-sm text-muted-foreground">لا أحد يذاكر الآن — ابدأ أنت وكن القدوة 💪</p>
    );
  return (
    <ul className="space-y-2">
      {members.map((m) => (
        <li key={m.username} className="glass rounded-2xl p-3 flex items-center gap-3">
          <span className="text-2xl">{m.avatar || "🎓"}</span>
          <div className="flex-1">
            <div className="font-semibold text-sm">
              {m.name}
              {m.username === me && " (أنت)"}
            </div>
            <div className="text-xs text-muted-foreground">
              {m.phase === "focus" ? `🍅 يركّز في ${m.subject}` : "☕ في استراحة"}
            </div>
          </div>
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full size-2.5 bg-success" />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Thin bar shown on every student tab while a session is running. */
export function StudyBar({ onOpen }: { onOpen: () => void }) {
  const { state, remaining, quote } = usePomodoro();
  if (!state?.running) return null;
  return (
    <button
      onClick={onOpen}
      className="w-full mb-4 rounded-2xl bg-hero text-primary-foreground px-4 py-2.5 shadow-glow flex items-center gap-3 text-sm text-right"
    >
      <span className="font-mono font-bold text-lg">{formatClock(remaining)}</span>
      <span className="font-semibold">
        {state.phase === "focus" ? `🍅 ${state.subject}` : "☕ استراحة"}
      </span>
      <span className="flex-1 truncate opacity-90">{quote}</span>
    </button>
  );
}

/** Supervisor view of the live study room. */
export function LiveRoomViewer() {
  const members = useStudyRoomMembers();
  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft">
      <h3 className="font-bold mb-3">🍅 يذاكرون الآن (لايف)</h3>
      <MemberList members={members} />
    </div>
  );
}
