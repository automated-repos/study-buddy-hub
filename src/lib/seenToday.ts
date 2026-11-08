// Questions a student has already seen today, so quizzes and battles pick different ones.
// Two sources: answers saved in answer_log today (any device) and questions shown on this
// device today (covers quizzes left before the end, which are not saved).
import { supabase } from "./supabase";
import { dateKey } from "./store";

const key = (u: string) => `mozakara_seen_${u}_${dateKey()}`;

function readLocal(username: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key(username)) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/** Remember questions shown to these students today on this device. */
export function markShown(usernames: string[], ids: string[]) {
  for (const u of usernames) {
    try {
      const all = [...new Set([...readLocal(u), ...ids])];
      localStorage.setItem(key(u), JSON.stringify(all.slice(-2000)));
    } catch {
      /* storage unavailable: variety still works from answer_log */
    }
  }
}

/** Question ids these students already saw today. */
export async function seenToday(usernames: string[]): Promise<Set<string>> {
  const ids = new Set<string>();
  for (const u of usernames) readLocal(u).forEach((id) => ids.add(id));
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const { data } = await supabase
    .from("answer_log")
    .select("question_id")
    .in("username", usernames)
    .gte("created_at", startOfDay)
    .limit(5000);
  (data ?? []).forEach((r) => ids.add(r.question_id));
  return ids;
}
