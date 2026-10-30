import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { queryClient } from "./queryClient";
import { setQuestionEdits, type QuestionEdit } from "./ai-content";

// ============== Types ==============
export type Role = "student" | "supervisor";

export interface Profile {
  username: string;
  displayName: string;
  role: Role;
  avatar: string;
  createdAt: number;
}

export interface Subject {
  id: string;
  ownerUsername: string;
  name: string;
  totalChapters: number;
  doneChapters: number;
  color: string;
  targetExamDate?: string;
  bookPath?: string;
}

export interface Book {
  id: string;
  ownerUsername: string;
  subjectId: string;
  title: string;
  fileName: string;
  filePath?: string;
  sizeKB: number;
  addedAt: number;
}

export interface StudySession {
  id: string;
  ownerUsername: string;
  subjectId: string;
  minutes: number;
  date: string;
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

/** One finished lesson (empty unit/lesson = "not started" marker for the subject). */
export interface LessonProgress {
  ownerUsername: string;
  subject: string;
  unit: string;
  lesson: string;
  updatedAt: number;
}

interface DB {
  profiles: Profile[];
  subjects: Subject[];
  books: Book[];
  sessions: StudySession[];
  quizzes: QuizResult[];
  challenges: Challenge[];
  progress: LessonProgress[];
  questionEdits: QuestionEdit[];
  currentUsername: string | null;
  /** false until the first fetch from Supabase finishes */
  loaded: boolean;
}

const initial: Omit<DB, "currentUsername" | "loaded"> = {
  profiles: [],
  subjects: [],
  books: [],
  sessions: [],
  quizzes: [],
  challenges: [],
  progress: [],
  questionEdits: [],
};

// ============== Session (localStorage — only the username string) ==============
const SESSION_KEY = "mozakara_user_v2";

export function getCurrentUsername(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function setCurrentUsername(u: string | null) {
  if (u) localStorage.setItem(SESSION_KEY, u);
  else localStorage.removeItem(SESSION_KEY);
}

// ============== Row mappers (DB snake_case → TS camelCase) ==============
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProfile(r: any): Profile {
  return {
    username: r.username,
    displayName: r.display_name,
    role: r.role as Role,
    avatar: r.avatar,
    createdAt: r.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSubject(r: any): Subject {
  return {
    id: r.id,
    ownerUsername: r.owner_username,
    name: r.name,
    totalChapters: r.total_chapters,
    doneChapters: r.done_chapters,
    color: r.color,
    targetExamDate: r.target_exam_date ?? undefined,
    bookPath: r.book_path ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBook(r: any): Book {
  return {
    id: r.id,
    ownerUsername: r.owner_username,
    subjectId: r.subject_id,
    title: r.title,
    fileName: r.file_name,
    filePath: r.file_path ?? undefined,
    sizeKB: r.size_kb,
    addedAt: r.added_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSession(r: any): StudySession {
  return {
    id: r.id,
    ownerUsername: r.owner_username,
    subjectId: r.subject_id,
    minutes: r.minutes,
    date: r.date,
    note: r.note ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapQuiz(r: any): QuizResult {
  return {
    id: r.id,
    ownerUsername: r.owner_username,
    subjectId: r.subject_id,
    score: r.score,
    total: r.total,
    takenAt: r.taken_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapChallenge(r: any): Challenge {
  return {
    id: r.id,
    from: r.from_username,
    to: r.to_username,
    subjectId: r.subject_id ?? undefined,
    title: r.title,
    status: r.status as Challenge["status"],
    createdAt: r.created_at,
    winner: r.winner ?? undefined,
  };
}

// ============== Data fetching ==============
export const DB_QUERY_KEY = ["db"] as const;

async function fetchAll() {
  const [profiles, subjects, books, sessions, quizzes, challenges, progress, customQs] = await Promise.all([
    supabase.from("profiles").select("*"),
    supabase.from("subjects").select("*"),
    supabase.from("books").select("*"),
    supabase.from("study_sessions").select("*"),
    supabase.from("quiz_results").select("*"),
    supabase.from("challenges").select("*"),
    supabase.from("student_progress").select("*"),
    supabase.from("custom_questions").select("*"),
  ]);
  // empty if the custom_questions migration hasn't been applied yet
  const questionEdits: QuestionEdit[] = (customQs.data ?? []).map((r) => ({
    id: r.id,
    subject: r.subject,
    unit: r.unit,
    lesson: r.lesson,
    q: r.q,
    options: Array.isArray(r.options) ? (r.options as string[]) : [],
    correct: r.correct,
    difficulty: (r.difficulty as QuestionEdit["difficulty"]) ?? "medium",
    hidden: r.hidden,
  }));
  setQuestionEdits(questionEdits);
  return {
    questionEdits,
    profiles: (profiles.data ?? []).map(mapProfile),
    subjects: (subjects.data ?? []).map(mapSubject),
    books: (books.data ?? []).map(mapBook),
    sessions: (sessions.data ?? []).map(mapSession),
    quizzes: (quizzes.data ?? []).map(mapQuiz),
    challenges: (challenges.data ?? []).map(mapChallenge),
    // empty if the student_progress migration hasn't been applied yet
    progress: (progress.data ?? []).map((r) => ({
      ownerUsername: r.owner_username,
      subject: r.subject,
      unit: r.unit,
      lesson: r.lesson,
      updatedAt: r.updated_at,
    })),
  };
}

async function invalidate() {
  await queryClient.invalidateQueries({ queryKey: DB_QUERY_KEY });
}

// ============== Hooks ==============
export function useDB(): DB {
  const currentUsername = getCurrentUsername();
  const { data } = useQuery({
    queryKey: DB_QUERY_KEY,
    queryFn: fetchAll,
  });
  return { ...(data ?? initial), currentUsername, loaded: !!data };
}

export function useCurrentProfile(): Profile | null {
  const db = useDB();
  return db.currentUsername
    ? (db.profiles.find((p) => p.username === db.currentUsername) ?? null)
    : null;
}

// Kept for compatibility — always null (use useCurrentProfile hook instead)
export function currentProfile(): Profile | null {
  return null;
}

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ============== Auth ==============
export async function loginOrCreate(
  username: string,
  role: Role,
  displayName?: string,
  avatar = "🦄",
) {
  const u = username.trim().toLowerCase();
  if (!u) throw new Error("اسم المستخدم مطلوب");

  const { data: existing } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", u)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase.from("profiles").insert({
      username: u,
      display_name: displayName?.trim() || username.trim(),
      role,
      avatar,
      created_at: Date.now(),
    });
    if (error) throw new Error(error.message);
    if (role === "student") await seedStudentSubjects(u);
  } else if (role === "student") {
    // seed for existing students who never got subjects (migration)
    await seedStudentSubjects(u);
  }

  setCurrentUsername(u);
  await invalidate();
}

export function logout() {
  setCurrentUsername(null);
  queryClient.removeQueries({ queryKey: DB_QUERY_KEY });
}

export async function updateAvatar(username: string, avatar: string) {
  const { error } = await supabase.from("profiles").update({ avatar }).eq("username", username);
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Subjects ==============

export const DEFAULT_SUBJECTS: { name: string; totalChapters: number; color: string }[] = [
  { name: "إنجليزي", totalChapters: 24, color: "#6366f1" },
  { name: "إحصاء",   totalChapters: 13, color: "#f59e0b" },
  { name: "عربي",    totalChapters: 16, color: "#10b981" },
  { name: "تاريخ",   totalChapters: 8,  color: "#ef4444" },
  { name: "جغرافيا", totalChapters: 14, color: "#3b82f6" },
];

export async function seedStudentSubjects(username: string): Promise<void> {
  const { data: existing } = await supabase
    .from("subjects")
    .select("id")
    .eq("owner_username", username);
  if (existing && existing.length > 0) return;
  const rows = DEFAULT_SUBJECTS.map((s) => ({
    id: uid(),
    owner_username: username,
    name: s.name,
    total_chapters: s.totalChapters,
    done_chapters: 0,
    color: s.color,
    target_exam_date: null,
    book_path: null,
  }));
  await supabase.from("subjects").insert(rows);
  await invalidate();
}

export async function addSubject(input: Omit<Subject, "id" | "doneChapters">) {
  const { error } = await supabase.from("subjects").insert({
    id: uid(),
    owner_username: input.ownerUsername,
    name: input.name,
    total_chapters: input.totalChapters,
    done_chapters: 0,
    color: input.color,
    target_exam_date: input.targetExamDate ?? null,
    book_path: input.bookPath ?? null,
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function uploadSubjectBook(file: File, subjectName: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "pdf";
  const path = `subjects/${subjectName.replace(/\s+/g, "_")}/${uid()}.${ext}`;
  const { error } = await supabase.storage.from("books").upload(path, file, { upsert: true });
  if (error) throw new Error(error.message);
  return path;
}

export async function setSubjectBook(subjectName: string, bookPath: string) {
  const { error } = await supabase
    .from("subjects")
    .update({ book_path: bookPath })
    .eq("name", subjectName);
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function updateSubject(id: string, patch: Partial<Subject>) {
  const { data: current } = await supabase
    .from("subjects")
    .select("name, total_chapters, done_chapters, color, target_exam_date")
    .eq("id", id)
    .single();
  if (!current) throw new Error("المادة غير موجودة");

  const dbPatch = {
    name: patch.name ?? current.name,
    total_chapters: patch.totalChapters ?? current.total_chapters,
    done_chapters: patch.doneChapters ?? current.done_chapters,
    color: patch.color ?? current.color,
    target_exam_date: patch.targetExamDate !== undefined ? patch.targetExamDate : current.target_exam_date,
  };

  const { error } = await supabase.from("subjects").update(dbPatch).eq("id", id);
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function deleteSubject(id: string) {
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Sessions ==============
export async function logSession(
  ownerUsername: string,
  subjectId: string,
  minutes: number,
  note?: string,
) {
  const date = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("study_sessions").insert({
    id: uid(),
    owner_username: ownerUsername,
    subject_id: subjectId,
    minutes,
    date,
    note: note ?? null,
  });
  if (error) throw new Error(error.message);

  // Auto-increment chapter progress every 25+ minutes
  if (minutes >= 25) {
    const { data: subj } = await supabase
      .from("subjects")
      .select("total_chapters, done_chapters")
      .eq("id", subjectId)
      .single();
    if (subj) {
      await supabase
        .from("subjects")
        .update({ done_chapters: Math.min(subj.total_chapters, subj.done_chapters + 1) })
        .eq("id", subjectId);
    }
  }

  await invalidate();
}

// ============== Quizzes ==============
export async function logQuiz(
  ownerUsername: string,
  subjectId: string,
  score: number,
  total: number,
) {
  const { error } = await supabase.from("quiz_results").insert({
    id: uid(),
    owner_username: ownerUsername,
    subject_id: subjectId,
    score,
    total,
    taken_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Books ==============
export async function addBook(b: Omit<Book, "id" | "addedAt">) {
  const { error } = await supabase.from("books").insert({
    id: uid(),
    owner_username: b.ownerUsername,
    subject_id: b.subjectId,
    title: b.title,
    file_name: b.fileName,
    file_path: b.filePath ?? null,
    size_kb: b.sizeKB,
    added_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function deleteBook(id: string) {
  const { data: book } = await supabase
    .from("books")
    .select("file_path")
    .eq("id", id)
    .single();

  if (book?.file_path) {
    await supabase.storage.from("books").remove([book.file_path]);
  }

  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function uploadBook(
  file: File,
  ownerUsername: string,
  subjectId: string,
  title: string,
) {
  const ext = file.name.split(".").pop() ?? "pdf";
  const path = `${ownerUsername}/${subjectId}/${uid()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("books")
    .upload(path, file, { upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  await addBook({
    ownerUsername,
    subjectId,
    title: title || file.name.replace(/\.pdf$/i, ""),
    fileName: file.name,
    filePath: path,
    sizeKB: Math.round(file.size / 1024),
  });
}

export async function getBookUrl(filePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from("books")
    .createSignedUrl(filePath, 60 * 60);
  if (error || !data) throw new Error(error?.message ?? "تعذر توليد رابط الكتاب");
  return data.signedUrl;
}

// ============== Points & Stats ==============
export function pointsFor(username: string, db: Pick<DB, "sessions" | "quizzes">) {
  const min = db.sessions
    .filter((s) => s.ownerUsername === username)
    .reduce((a, b) => a + b.minutes, 0);
  const quizPts = db.quizzes
    .filter((q) => q.ownerUsername === username)
    .reduce((a, q) => a + Math.round((q.score / Math.max(q.total, 1)) * 50), 0);
  return Math.round(min) + quizPts;
}

export function streakFor(username: string, db: Pick<DB, "sessions">) {
  const dates = new Set(
    db.sessions.filter((s) => s.ownerUsername === username).map((s) => s.date),
  );
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

export function minutesToday(username: string, db: Pick<DB, "sessions">) {
  const today = new Date().toISOString().slice(0, 10);
  return db.sessions
    .filter((s) => s.ownerUsername === username && s.date === today)
    .reduce((a, b) => a + b.minutes, 0);
}

// ============== Live Battles ==============

export function isLiveBattle(c: Challenge): boolean {
  return c.title.startsWith("[LIVE]");
}

export interface LiveBattleConfig {
  subject: string;
  /** Optional: limit questions to one unit / lesson. Missing = whole subject / unit. */
  unit?: string;
  lesson?: string;
  p1: string;
  p2: string;
  totalRounds: number;
}

export function parseLiveBattleConfig(c: Challenge): LiveBattleConfig | null {
  try {
    if (!c.title.startsWith("[LIVE]")) return null;
    return JSON.parse(c.title.slice(6));
  } catch {
    return null;
  }
}

export async function createLiveBattle(opts: {
  supervisorUsername: string;
  p1: string;
  p2: string;
  subject: string;
  unit?: string;
  lesson?: string;
  totalRounds: number;
}): Promise<string> {
  const cfg: LiveBattleConfig = {
    subject: opts.subject,
    ...(opts.unit ? { unit: opts.unit } : {}),
    ...(opts.lesson ? { lesson: opts.lesson } : {}),
    p1: opts.p1,
    p2: opts.p2,
    totalRounds: opts.totalRounds,
  };
  const id = uid();
  const { error } = await supabase.from("challenges").insert({
    id,
    from_username: opts.supervisorUsername,
    to_username: opts.p1,
    subject_id: null,
    title: "[LIVE]" + JSON.stringify(cfg),
    status: "pending",
    created_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
  return id;
}

// ============== Challenges ==============
export async function createChallenge(c: Omit<Challenge, "id" | "createdAt" | "status">) {
  const { error } = await supabase.from("challenges").insert({
    id: uid(),
    from_username: c.from,
    to_username: c.to,
    subject_id: c.subjectId ?? null,
    title: c.title,
    status: "pending",
    created_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

export async function setChallengeStatus(
  id: string,
  status: Challenge["status"],
  winner?: string,
) {
  const { error } = await supabase
    .from("challenges")
    .update({ status, ...(winner ? { winner } : {}) })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Lesson progress ==============
const P = "student_progress";

/** Tick or untick lessons as finished. Ticking removes the "not started" marker. */
export async function setLessonsDone(
  username: string,
  subject: string,
  lessons: { unit: string; lesson: string }[],
  done: boolean,
) {
  if (lessons.length === 0) return;
  if (done) {
    const { error } = await supabase.from(P).upsert(
      lessons.map((l) => ({
        owner_username: username,
        subject,
        unit: l.unit,
        lesson: l.lesson,
        updated_at: Date.now(),
      })),
      { onConflict: "owner_username,subject,unit,lesson", ignoreDuplicates: true },
    );
    if (error) throw new Error(error.message);
    await supabase
      .from(P)
      .delete()
      .eq("owner_username", username)
      .eq("subject", subject)
      .eq("lesson", "");
  } else {
    for (const l of lessons) {
      const { error } = await supabase
        .from(P)
        .delete()
        .eq("owner_username", username)
        .eq("subject", subject)
        .eq("unit", l.unit)
        .eq("lesson", l.lesson);
      if (error) throw new Error(error.message);
    }
  }
  await invalidate();
}

/** "I haven't started this subject": clears ticked lessons and saves an empty marker row. */
export async function setSubjectNotStarted(username: string, subject: string) {
  const del = await supabase.from(P).delete().eq("owner_username", username).eq("subject", subject);
  if (del.error) throw new Error(del.error.message);
  const { error } = await supabase.from(P).insert({
    owner_username: username,
    subject,
    unit: "",
    lesson: "",
    updated_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Question bank (supervisor edits) ==============
/** Add a new question, or save an edited version of an existing one (same id = replace). */
export async function saveQuestion(
  q: Omit<QuestionEdit, "hidden">,
  by: string,
): Promise<void> {
  const { error } = await supabase.from("custom_questions").upsert({
    id: q.id,
    subject: q.subject,
    unit: q.unit,
    lesson: q.lesson,
    q: q.q,
    options: q.options,
    correct: q.correct,
    difficulty: q.difficulty,
    hidden: false,
    updated_by: by,
    updated_at: Date.now(),
  });
  if (error) throw new Error(error.message);
  await invalidate();
}

/** Delete a question: built-in ones are hidden (restorable), added ones are removed. */
export async function deleteQuestion(q: Omit<QuestionEdit, "hidden">, builtIn: boolean, by: string) {
  const { error } = builtIn
    ? await supabase.from("custom_questions").upsert({
        id: q.id,
        subject: q.subject,
        unit: q.unit,
        lesson: q.lesson,
        q: q.q,
        options: q.options,
        correct: q.correct,
        difficulty: q.difficulty,
        hidden: true,
        updated_by: by,
        updated_at: Date.now(),
      })
    : await supabase.from("custom_questions").delete().eq("id", q.id);
  if (error) throw new Error(error.message);
  await invalidate();
}

/** Undo edits to a built-in question (restores it if hidden, reverts the text if edited). */
export async function restoreQuestion(id: string) {
  const { error } = await supabase.from("custom_questions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await invalidate();
}

// ============== Daily Plan ==============
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

export function dailyPlan(username: string, db: Pick<DB, "subjects">): PlanItem[] {
  const subs = db.subjects.filter((s) => s.ownerUsername === username);
  if (subs.length === 0) return [];
  const weighted = subs
    .map((s) => ({ s, remaining: Math.max(1, s.totalChapters - s.doneChapters) }))
    .sort((a, b) => b.remaining - a.remaining)
    .slice(0, 4);
  const totalW = weighted.reduce((a, b) => a + b.remaining, 0);
  const dayBudget = 150;
  const seed = new Date().toISOString().slice(0, 10).split("-").join("");
  return weighted.map((w, i) => ({
    subjectId: w.s.id,
    subjectName: w.s.name,
    color: w.s.color,
    minutes: Math.max(25, Math.round(((w.remaining / totalW) * dayBudget) / 5) * 5),
    focus: FOCUS_TIPS[(parseInt(seed, 10) + i) % FOCUS_TIPS.length],
  }));
}
