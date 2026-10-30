import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { STALE_MS } from "@/lib/siteSession";
import { dateKey, useDB } from "@/lib/store";

interface Row {
  id: string;
  username: string;
  startedAt: number;
  lastSeenAt: number;
  endedAt: number | null;
  endReason: "logout" | "closed" | null;
  device: string | null;
}

type Status = "online" | "logout" | "closed";

function statusOf(r: Row, now: number): { status: Status; end: number } {
  if (r.endedAt) return { status: r.endReason === "logout" ? "logout" : "closed", end: r.endedAt };
  if (now - r.lastSeenAt < STALE_MS) return { status: "online", end: now };
  // no close signal: the last heartbeat is the end time
  return { status: "closed", end: r.lastSeenAt };
}

const fmtDuration = (ms: number) => {
  const m = Math.max(0, Math.round(ms / 60_000));
  if (m < 60) return `${m} د`;
  return `${Math.floor(m / 60)} س ${m % 60} د`;
};
const fmtTime = (t: number) =>
  new Date(t).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
const fmtDay = (t: number) =>
  new Date(t).toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" });

const STATUS_UI: Record<Status, { label: string; cls: string }> = {
  online: { label: "🟢 متصل الآن", cls: "bg-success/20 text-success" },
  logout: { label: "🚪 سجّل خروج", cls: "bg-primary/20 text-primary" },
  closed: { label: "✖️ أغلق الموقع", cls: "bg-muted text-muted-foreground" },
};

/** Supervisor tab: when each student opened the site, how long they stayed, and how they left. */
export function SessionsView() {
  const db = useDB();
  const students = db.profiles.filter((p) => p.role === "student");
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");
  const [who, setWho] = useState<string>("all");
  const [days, setDays] = useState(7);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const since = Date.now() - days * 86_400_000;
      const { data, error: e } = await supabase
        .from("site_sessions")
        .select("*")
        .gte("started_at", since)
        .order("started_at", { ascending: false })
        .limit(2000);
      if (!alive) return;
      if (e) return setError("سجل الجلسات غير متاح بعد (يحتاج إنشاء جدول site_sessions).");
      setError("");
      setRows(
        (data ?? []).map((r) => ({
          id: r.id,
          username: r.username,
          startedAt: r.started_at,
          lastSeenAt: r.last_seen_at,
          endedAt: r.ended_at,
          endReason: r.end_reason as Row["endReason"],
          device: r.device,
        })),
      );
      setNow(Date.now());
    };
    void load();
    const t = setInterval(load, 30_000); // keep "online now" fresh
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [days]);

  const studentNames = new Set(students.map((s) => s.username));
  const visible = rows.filter(
    (r) => studentNames.has(r.username) && (who === "all" || r.username === who),
  );
  const nameOf = (u: string) => db.profiles.find((p) => p.username === u);

  // per-student summary
  const summary = students.map((s) => {
    const mine = rows.filter((r) => r.username === s.username);
    const today = dateKey();
    const total = mine.reduce((a, r) => a + (statusOf(r, now).end - r.startedAt), 0);
    const todayMs = mine
      .filter((r) => dateKey(new Date(r.startedAt)) === today)
      .reduce((a, r) => a + (statusOf(r, now).end - r.startedAt), 0);
    const online = mine.some((r) => statusOf(r, now).status === "online");
    const last = mine[0] ? statusOf(mine[0], now).end : null;
    return { s, total, todayMs, online, last, count: mine.length };
  });

  // group visible sessions by day
  const byDay = new Map<string, Row[]>();
  for (const r of visible) {
    const k = dateKey(new Date(r.startedAt));
    byDay.set(k, [...(byDay.get(k) ?? []), r]);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">جلسات الطلاب على الموقع</h1>
        <p className="text-muted-foreground mt-1">
          متى دخل كل طالب، وكم بقي، ومتى خرج أو أغلق الموقع — حتى لو لم يسجّل خروجاً. تتحدث كل 30
          ثانية.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summary.map(({ s, total, todayMs, online, last, count }) => (
          <div
            key={s.username}
            className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{s.avatar || "🎓"}</span>
              <div className="flex-1">
                <div className="font-bold">{s.displayName}</div>
                <div className="text-xs text-muted-foreground">
                  {online ? (
                    <span className="text-success font-semibold">🟢 متصل الآن</span>
                  ) : last ? (
                    `آخر ظهور: ${fmtDay(last)} ${fmtTime(last)}`
                  ) : (
                    "لم يدخل في هذه الفترة"
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="glass rounded-xl p-2">
                <div className="text-[10px] text-muted-foreground">اليوم</div>
                <div className="font-bold text-sm">{fmtDuration(todayMs)}</div>
              </div>
              <div className="glass rounded-xl p-2">
                <div className="text-[10px] text-muted-foreground">آخر {days} أيام</div>
                <div className="font-bold text-sm">{fmtDuration(total)}</div>
              </div>
              <div className="glass rounded-xl p-2">
                <div className="text-[10px] text-muted-foreground">عدد الجلسات</div>
                <div className="font-bold text-sm">{count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft flex flex-wrap gap-3 items-center">
        <select
          value={who}
          onChange={(e) => setWho(e.target.value)}
          className="bg-input rounded-2xl px-4 py-2 outline-none"
        >
          <option value="all">كل الطلاب</option>
          {students.map((s) => (
            <option key={s.username} value={s.username}>
              {s.displayName}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {[1, 7, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-2xl px-3 py-2 text-sm font-semibold ${days === d ? "bg-hero text-primary-foreground" : "glass"}`}
            >
              {d === 1 ? "اليوم" : `آخر ${d} يوم`}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 && !error && (
        <p className="text-muted-foreground">لا توجد جلسات في هذه الفترة.</p>
      )}

      {[...byDay.entries()].map(([day, list]) => (
        <div
          key={day}
          className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft overflow-x-auto"
        >
          <h3 className="font-bold mb-3">{fmtDay(list[0].startedAt)}</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-muted-foreground text-xs">
                <th className="text-right p-2">الطالب</th>
                <th className="text-right p-2">دخل</th>
                <th className="text-right p-2">خرج</th>
                <th className="text-right p-2">المدة</th>
                <th className="text-right p-2">الحالة</th>
                <th className="text-right p-2">الجهاز</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => {
                const { status, end } = statusOf(r, now);
                const p = nameOf(r.username);
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className="p-2 whitespace-nowrap">
                      {p?.avatar} {p?.displayName ?? r.username}
                    </td>
                    <td className="p-2 whitespace-nowrap">{fmtTime(r.startedAt)}</td>
                    <td className="p-2 whitespace-nowrap">
                      {status === "online" ? "—" : fmtTime(end)}
                    </td>
                    <td className="p-2 whitespace-nowrap font-semibold">
                      {fmtDuration(end - r.startedAt)}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_UI[status].cls}`}
                      >
                        {STATUS_UI[status].label}
                      </span>
                    </td>
                    <td className="p-2 whitespace-nowrap text-xs text-muted-foreground">
                      {r.device ?? "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
