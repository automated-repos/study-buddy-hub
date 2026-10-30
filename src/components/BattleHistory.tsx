import { useDB, type BattleResult } from "@/lib/store";

const fmt = (t: number) =>
  new Date(t).toLocaleString("ar-EG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** History of finished live battles with scores and round-by-round details. */
export function BattleHistory({
  username,
  title = "⚔️ سجل المسابقات",
}: {
  username?: string;
  title?: string;
}) {
  const db = useDB();
  const list = db.battleResults.filter((b) => !username || b.p1 === username || b.p2 === username);
  const person = (u: string) => db.profiles.find((p) => p.username === u);

  const stats = username
    ? {
        wins: list.filter((b) => b.winner === username).length,
        losses: list.filter((b) => b.winner && b.winner !== username).length,
        draws: list.filter((b) => !b.winner).length,
        rounds: list.flatMap((b) => b.rounds).filter((r) => r.who === username),
      }
    : null;

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <Box label="فوز" value={stats.wins} cls="text-success" />
          <Box label="خسارة" value={stats.losses} cls="text-destructive" />
          <Box label="تعادل" value={stats.draws} />
          <Box
            label="دقة الإجابة بعد الضغط أولاً"
            value={
              stats.rounds.length
                ? `${Math.round((stats.rounds.filter((r) => r.ok).length / stats.rounds.length) * 100)}%`
                : "—"
            }
          />
        </div>
      )}
      {list.length === 0 && (
        <p className="text-muted-foreground text-sm">لا توجد مسابقات منتهية بعد.</p>
      )}
      {list.map((b) => (
        <Card key={b.battleId} b={b} me={username} person={person} />
      ))}
    </div>
  );
}

function Box({ label, value, cls = "" }: { label: string; value: string | number; cls?: string }) {
  return (
    <div className="glass rounded-2xl p-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={`font-bold text-xl ${cls}`}>{value}</div>
    </div>
  );
}

function Card({
  b,
  me,
  person,
}: {
  b: BattleResult;
  me?: string;
  person: (u: string) => { displayName: string; avatar: string } | undefined;
}) {
  const p1 = person(b.p1);
  const p2 = person(b.p2);
  const result = !me ? null : !b.winner ? "🤝 تعادل" : b.winner === me ? "🏆 فوز" : "💪 خسارة";
  const resultCls = !me
    ? ""
    : !b.winner
      ? "bg-muted"
      : b.winner === me
        ? "bg-success/20 text-success"
        : "bg-destructive/15 text-destructive";
  return (
    <details className="bg-card-gradient rounded-3xl p-4 border border-border shadow-soft">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className={b.winner === b.p1 ? "font-bold" : "opacity-80"}>
              {p1?.avatar} {p1?.displayName ?? b.p1}
            </span>
            <span className="text-2xl font-black">
              {b.p1Score} : {b.p2Score}
            </span>
            <span className={b.winner === b.p2 ? "font-bold" : "opacity-80"}>
              {p2?.avatar} {p2?.displayName ?? b.p2}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {result && (
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${resultCls}`}>
                {result}
              </span>
            )}
            {!me && b.winner && (
              <span className="rounded-full px-3 py-1 text-xs font-bold bg-success/20 text-success">
                🏆 {person(b.winner)?.displayName ?? b.winner}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {b.subject}
          {b.scope ? ` • ${b.scope}` : ""} • {b.rounds.length} جولات • {fmt(b.finishedAt)} — اضغط
          لعرض الجولات
        </p>
      </summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="text-right p-2">#</th>
              <th className="text-right p-2">السؤال</th>
              <th className="text-right p-2">ضغط أولاً</th>
              <th className="text-right p-2">إجابته</th>
              <th className="text-right p-2">الصحيحة</th>
            </tr>
          </thead>
          <tbody>
            {b.rounds.map((r, i) => (
              <tr key={i} className="border-t border-border align-top">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">
                  {r.q}
                  <div className="text-[11px] text-muted-foreground">{r.lesson}</div>
                </td>
                <td className="p-2 whitespace-nowrap">{person(r.who)?.displayName ?? r.who}</td>
                <td className={`p-2 ${r.ok ? "text-success" : "text-destructive"}`}>
                  {r.ok ? "✓ " : "✗ "}
                  {r.options[r.chosen]}
                </td>
                <td className="p-2 text-success">{r.options[r.correct]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
