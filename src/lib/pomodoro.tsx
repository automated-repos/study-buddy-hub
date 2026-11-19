// Pomodoro timer + live study room (Supabase realtime presence).
// The provider lives at the student page level so the timer keeps running across tabs.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import confetti from "canvas-confetti";
import { supabase } from "./supabase";
import { dateKey, logSession, uid, useCurrentProfile, useDB } from "./store";
import { STUDY_QUOTES, randomFrom } from "./motivation";

export type Phase = "focus" | "break";

export interface PomoState {
  running: boolean;
  phase: Phase;
  subject: string;
  endsAt: number; // ms timestamp
  focusMin: number;
  breakMin: number;
  cycles: number; // focus blocks finished in this run
  /** Set while paused: ms left in the current phase (endsAt is ignored until resumed). */
  pausedLeft?: number;
}

/** What each studying person shares in the live room. */
export interface RoomMember {
  username: string;
  name: string;
  avatar: string;
  subject: string;
  phase: Phase;
  endsAt: number;
  paused?: boolean;
}

const ROOM = "study-room";
const storageKey = (u: string) => `mozakara_pomodoro_${u}`;
const pendingKey = (u: string) => `mozakara_pomodoro_pending_${u}`;

/** A finished focus block not yet saved to the database. */
interface PendingSession {
  id: string;
  subject: string;
  minutes: number;
  date: string;
}

function readPending(u: string): PendingSession[] {
  try {
    return JSON.parse(localStorage.getItem(pendingKey(u)) ?? "[]") as PendingSession[];
  } catch {
    return [];
  }
}

function writePending(u: string, list: PendingSession[]) {
  try {
    if (list.length) localStorage.setItem(pendingKey(u), JSON.stringify(list));
    else localStorage.removeItem(pendingKey(u));
  } catch {
    /* storage unavailable */
  }
}

function queueSession(u: string, p: PendingSession) {
  writePending(u, [...readPending(u), p]);
}

function removePending(u: string, id: string) {
  writePending(
    u,
    readPending(u).filter((p) => p.id !== id),
  );
}

interface Ctx {
  state: PomoState | null;
  remaining: number; // seconds
  quote: string;
  lastMessage: string | null;
  members: RoomMember[];
  start: (subject: string, focusMin: number, breakMin: number) => void;
  stop: () => void;
  skipBreak: () => void;
  pause: () => void;
  resume: () => void;
}

const PomodoroContext = createContext<Ctx | null>(null);

export function usePomodoro() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error("usePomodoro must be used inside PomodoroProvider");
  return ctx;
}

/** Live list of who is studying right now (read-only, for the supervisor page). */
export function useStudyRoomMembers(): RoomMember[] {
  const [members, setMembers] = useState<RoomMember[]>([]);
  useEffect(() => {
    const ch = supabase.channel(ROOM);
    ch.on("presence", { event: "sync" }, () => setMembers(flatten(ch.presenceState())));
    ch.subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, []);
  return members;
}

function flatten(state: Record<string, unknown[]>): RoomMember[] {
  return Object.values(state)
    .flat()
    .filter((m): m is RoomMember => typeof (m as RoomMember)?.username === "string");
}

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const profile = useCurrentProfile();
  const db = useDB();
  const username = profile?.username ?? "";
  const [state, setState] = useState<PomoState | null>(null);
  const [now, setNow] = useState(Date.now());
  const [quote, setQuote] = useState(STUDY_QUOTES[0]);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const dbRef = useRef(db);
  dbRef.current = db;
  const flushing = useRef(false);

  /** Save finished focus blocks that are still waiting (e.g. the phone was offline). */
  const flushPending = useCallback(async () => {
    if (!username || flushing.current) return;
    const subjects = dbRef.current.subjects;
    if (!dbRef.current.loaded) return;
    flushing.current = true;
    try {
      for (const p of readPending(username)) {
        const subj = subjects.find((s) => s.ownerUsername === username && s.name === p.subject);
        try {
          if (subj) {
            await logSession(username, subj.id, p.minutes, "بومودورو", { id: p.id, date: p.date });
          }
          removePending(username, p.id); // saved (or its subject was deleted)
        } catch {
          break; // still offline: try again later
        }
      }
    } finally {
      flushing.current = false;
    }
  }, [username]);

  // Retry waiting saves on load, when the connection comes back, when the tab is shown again,
  // and every 30 seconds.
  useEffect(() => {
    if (!username || !db.loaded) return;
    void flushPending();
    const retry = () => void flushPending();
    const onVisible = () => document.visibilityState === "visible" && retry();
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", onVisible);
    const t = setInterval(retry, 30_000);
    return () => {
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(t);
    };
  }, [username, db.loaded, flushPending]);

  // Restore a running timer after reload
  useEffect(() => {
    if (!username) return;
    try {
      const saved = localStorage.getItem(storageKey(username));
      if (saved) setState(JSON.parse(saved) as PomoState);
    } catch {
      /* ignore */
    }
  }, [username]);

  const save = useCallback(
    (s: PomoState | null) => {
      setState(s);
      if (!username) return;
      if (s) localStorage.setItem(storageKey(username), JSON.stringify(s));
      else localStorage.removeItem(storageKey(username));
    },
    [username],
  );

  // Clock + phase changes
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // New motivational line every 5 minutes while studying
  useEffect(() => {
    if (!state?.running) return;
    setQuote(randomFrom(STUDY_QUOTES));
    const t = setInterval(() => setQuote(randomFrom(STUDY_QUOTES)), 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [state?.running]);

  useEffect(() => {
    if (!state?.running || state.pausedLeft !== undefined || now < state.endsAt) return;
    if (now - state.endsAt > 2 * 60 * 60_000) {
      // Timer from a long-closed tab: don't log stale time
      save(null);
      return;
    }
    if (state.phase === "focus") {
      // Focus block finished: log it and start the break
      queueSession(username, {
        id: uid(),
        subject: state.subject,
        minutes: state.focusMin,
        date: dateKey(),
      });
      void flushPending();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setLastMessage(
        `أحسنت! أنهيت ${state.focusMin} دقيقة تركيز في ${state.subject} وحصلت على نجوم جديدة ⭐ خذ استراحة.`,
      );
      save({
        ...state,
        phase: "break",
        endsAt: Date.now() + state.breakMin * 60_000,
        cycles: state.cycles + 1,
      });
    } else {
      setLastMessage("انتهت الاستراحة — جاهز لجلسة جديدة؟ 🍅");
      save({ ...state, running: false, phase: "focus" });
    }
  }, [now, state, username, save, flushPending]);

  // Live room presence
  useEffect(() => {
    if (!username) return;
    const ch = supabase.channel(ROOM, { config: { presence: { key: username } } });
    ch.on("presence", { event: "sync" }, () => setMembers(flatten(ch.presenceState())));
    ch.subscribe();
    channelRef.current = ch;
    return () => {
      void supabase.removeChannel(ch);
      channelRef.current = null;
    };
  }, [username]);

  useEffect(() => {
    const ch = channelRef.current;
    if (!ch || !profile) return;
    if (state?.running) {
      const me: RoomMember = {
        username: profile.username,
        name: profile.displayName,
        avatar: profile.avatar,
        subject: state.subject,
        phase: state.phase,
        endsAt: state.endsAt,
        ...(state.pausedLeft !== undefined ? { paused: true } : {}),
      };
      // retry once in case the channel was still joining
      void ch.track(me).catch(() => setTimeout(() => void ch.track(me), 1500));
    } else {
      void ch.untrack().catch(() => {});
    }
  }, [state?.running, state?.phase, state?.subject, state?.endsAt, state?.pausedLeft, profile]);

  const start = (subject: string, focusMin: number, breakMin: number) => {
    setLastMessage(null);
    save({
      running: true,
      phase: "focus",
      subject,
      focusMin,
      breakMin,
      endsAt: Date.now() + focusMin * 60_000,
      cycles: 0,
    });
  };
  const stop = () => save(null);
  const skipBreak = () => {
    if (!state) return;
    save({ ...state, running: true, phase: "focus", endsAt: Date.now() + state.focusMin * 60_000 });
  };
  /** Freeze the clock; the time left is kept (also across reloads) until resume. */
  const pause = () => {
    if (!state?.running || state.pausedLeft !== undefined) return;
    save({ ...state, pausedLeft: Math.max(0, state.endsAt - Date.now()) });
  };
  const resume = () => {
    if (!state || state.pausedLeft === undefined) return;
    const { pausedLeft, ...rest } = state;
    save({ ...rest, endsAt: Date.now() + pausedLeft });
  };

  const remaining = !state?.running
    ? 0
    : state.pausedLeft !== undefined
      ? Math.ceil(state.pausedLeft / 1000)
      : Math.max(0, Math.ceil((state.endsAt - now) / 1000));

  return (
    <PomodoroContext.Provider
      value={{
        state,
        remaining,
        quote,
        lastMessage,
        members,
        start,
        stop,
        skipBreak,
        pause,
        resume,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function formatClock(sec: number) {
  return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
}
