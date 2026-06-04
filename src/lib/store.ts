// Local storage data layer. Username-only "auth". Family-scoped.
import { useEffect, useState, useSyncExternalStore } from "react";

export type Role = "student" | "supervisor";

export interface Profile {
  username: string;
  displayName: string;
  role: Role;
  avatar: string; // emoji
  createdAt: number;
}

export interface Subject {
  id: string;
  ownerUsername: string;
  name: string;
  totalChapters: number;
  doneChapters: number;
  color: string; // hex
  targetExamDate?: string; // YYYY-MM-DD
}

export interface Book {
  id: string;
  ownerUsername: string;
  subjectId: string;
  title: string;
  fileName: string;
  sizeKB: number;
  addedAt: number;
}

export interface StudySession {
  id: string;
  ownerUsername: string;
  subjectId: string;
  minutes: number;
  date: string; // YYYY-MM-DD
  note?: string;
}

export interface QuizResult {
  id: string;
  ownerUsername: string;
  subjectId: string;
  score: number;
  total: number;
  takenAt: number;
}

export interface Challenge {
  id: string;
  from: string;
  to: string;
  subjectId?: string;
  title: string;
  status: "pending" | "accepted" | "done";
  createdAt: number;
  winner?: string;
}

interface DB {
  profiles: Profile[];
  subjects: Subject[];
  books: Book[];
  sessions: StudySession[];
  quizzes: QuizResult[];
  challenges: Challenge[];
  currentUsername: string | null;
}

const KEY = "mozakara_db_v1";
const initial: DB = {
  profiles: [],
  subjects: [],
  books: [],
  sessions: [],
  quizzes: [],
  challenges: [],
  currentUsername: null,
};

const listeners = new Set<() => void>();

function read(): DB {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}
function write(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db));
  listeners.forEach((l) => l());
}

export function getDB() {
  return read();
}
export function update(mut: (db: DB) => void) {
  const db = read();
  mut(db);
  write(db);
}
export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useDB(): DB {
  return useSyncExternalStore(subscribe, read, () => initial);
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ============== Auth ==============
export function loginOrCreate(username: string, role: Role, displayName?: string, avatar = "🦄") {
  const u = username.trim().toLowerCase();
  if (!u) throw new Error("اسم المستخدم مطلوب");
  update((db) => {
    const existing = db.profiles.find((p) => p.username === u);
    if (!existing) {
      db.profiles.push({
        username: u,
        displayName: displayName?.trim() || username.trim(),
        role,
        avatar,
        createdAt: Date.now(),
      });
    }
    db.currentUsername = u;
  });
}
export function logout() {
  update((db) => {
    db.currentUsername = null;
  });
}
export function currentProfile(): Profile | null {
  const db = read();
  if (!db.currentUsername) return null;
  return db.profiles.find((p) => p.username === db.currentUsername) ?? null;
}
export function useCurrentProfile() {
  const db = useDB();
  return db.currentUsername
    ? db.profiles.find((p) => p.username === db.currentUsername) ?? null
    : null;
}

// ============== Subjects ==============
export function addSubject(input: Omit<Subject, "id" | "doneChapters">) {
  update((db) => {
    db.subjects.push({ ...input, id: uid(), doneChapters: 0 });
  });
}
export function updateSubject(id: string, patch: Partial<Subject>) {
  update((db) => {
    const s = db.subjects.find((x) => x.id === id);
    if (s) Object.assign(s, patch);
  });
}
export function deleteSubject(id: string) {
  update((db) => {
    db.subjects = db.subjects.filter((s) => s.id !== id);
    db.books = db.books.filter((b) => b.subjectId !== id);
    db.sessions = db.sessions.filter((s) => s.subjectId !== id);
    db.quizzes = db.quizzes.filter((q) => q.subjectId !== id);
  });
}

// ============== Sessions ==============
export function logSession(ownerUsername: string, subjectId: string, minutes: number, note?: string) {
  const date = new Date().toISOString().slice(0, 10);
  update((db) => {
    db.sessions.push({ id: uid(), ownerUsername, subjectId, minutes, date, note });
    const subj = db.subjects.find((s) => s.id === subjectId);
    // auto-increment chapter progress every 45 minutes (rough heuristic)
    if (subj && minutes >= 25) subj.doneChapters = Math.min(subj.totalChapters, subj.doneChapters + 1);
  });
}

// ============== Quizzes ==============
export function logQuiz(ownerUsername: string, subjectId: string, score: number, total: number) {
  update((db) => {
    db.quizzes.push({ id: uid(), ownerUsername, subjectId, score, total, takenAt: Date.now() });
  });
}

// ============== Books ==============
export function addBook(b: Omit<Book, "id" | "addedAt">) {
  update((db) => db.books.push({ ...b, id: uid(), addedAt: Date.now() }));
}
export function deleteBook(id: string) {
  update((db) => {
    db.books = db.books.filter((b) => b.id !== id);
  });
}

// ============== Points & Stats ==============
export function pointsFor(username: string, db = read()) {
  const min = db.sessions.filter((s) => s.ownerUsername === username).reduce((a, b) => a + b.minutes, 0);
  const quizPts = db.quizzes
    .filter((q) => q.ownerUsername === username)
    .reduce((a, q) => a + Math.round((q.score / Math.max(q.total, 1)) * 50), 0);
  return Math.round(min) + quizPts;
}
export function streakFor(username: string, db = read()) {
  const dates = new Set(db.sessions.filter((s) => s.ownerUsername === username).map((s) => s.date));
  let streak = 0;
  const d = new Date();
  for (;;) {
    const k = d.toISOString().slice(0, 10);
    if (dates.has(k)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}
export function minutesToday(username: string, db = read()) {
  const today = new Date().toISOString().slice(0, 10);
  return db.sessions
    .filter((s) => s.ownerUsername === username && s.date === today)
    .reduce((a, b) => a + b.minutes, 0);
}

// ============== Challenges ==============
export function createChallenge(c: Omit<Challenge, "id" | "createdAt" | "status">) {
  update((db) =>
    db.challenges.push({ ...c, id: uid(), createdAt: Date.now(), status: "pending" }),
  );
}
export function setChallengeStatus(id: string, status: Challenge["status"], winner?: string) {
  update((db) => {
    const c = db.challenges.find((x) => x.id === id);
    if (c) {
      c.status = status;
      if (winner) c.winner = winner;
    }
  });
}

// SSR-safe mount hook
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// ============== Auto-generated daily plan ==============
export interface PlanItem {
  subjectId: string;
  subjectName: string;
  color: string;
  minutes: number;
  focus: string;
}
const FOCUS_TIPS = [
  "راجع آخر فصل + حل 5 أسئلة",
  "ابدأ فصل جديد واكتب ملخص في 6 أسطر",
  "حل اختبار قصير 10 أسئلة",
  "اشرح الفصل بصوت عالٍ كأنك معلّم",
  "ركّز على الأمثلة المحلولة",
  "خرائط ذهنية للمفاهيم الأساسية",
];
export function dailyPlan(username: string, db = read()): PlanItem[] {
  const subs = db.subjects.filter((s) => s.ownerUsername === username);
  if (subs.length === 0) return [];
  // weight by remaining chapters; minimum 20 min/subject; cap 4 items/day
  const weighted = subs
    .map((s) => ({ s, remaining: Math.max(1, s.totalChapters - s.doneChapters) }))
    .sort((a, b) => b.remaining - a.remaining)
    .slice(0, 4);
  const totalW = weighted.reduce((a, b) => a + b.remaining, 0);
  const dayBudget = 150; // 2.5h target
  const seed = new Date().toISOString().slice(0, 10).split("-").join("");
  return weighted.map((w, i) => ({
    subjectId: w.s.id,
    subjectName: w.s.name,
    color: w.s.color,
    minutes: Math.max(25, Math.round((w.remaining / totalW) * dayBudget / 5) * 5),
    focus: FOCUS_TIPS[(parseInt(seed, 10) + i) % FOCUS_TIPS.length],
  }));
}
