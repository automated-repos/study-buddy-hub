import { levelFor, ratingFor, starBreakdown, starsFor } from "@/lib/motivation";
import { useDB } from "@/lib/store";

/** ★★★★☆ display for a 0–5 rating (supports halves). */
export function RatingStars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`التقييم ${rating} من 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
        return (
          <span key={i} className="relative inline-block w-[1em] text-center leading-none">
            <span className="text-muted-foreground/40">★</span>
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden text-warning"
                style={{ width: fill === 1 ? "100%" : "50%" }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
      <span className="mr-1 text-xs font-bold">{rating.toFixed(1)}</span>
    </span>
  );
}

/** Full achievements card: level, stars breakdown and how the rating is calculated. */
export function AchievementsCard({ username }: { username: string }) {
  const db = useDB();
  const stars = starsFor(username, db);
  const level = levelFor(stars);
  const { rating, parts } = ratingFor(username, db);
  const lines = starBreakdown(username, db);

  return (
    <div className="bg-card-gradient rounded-3xl p-5 border border-border shadow-soft space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{level.icon}</div>
          <div>
            <p className="text-xs text-muted-foreground">المستوى</p>
            <h3 className="text-xl font-bold">{level.title}</h3>
          </div>
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold">⭐ {stars}</div>
          <RatingStars rating={rating} className="text-lg" />
        </div>
      </div>

      {level.next && (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>
              باقي {level.next.min - stars} نجمة للوصول إلى «{level.next.title}» {level.next.icon}
            </span>
            <span>{Math.round(level.progress * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-hero transition-all"
              style={{ width: `${level.progress * 100}%` }}
            />
          </div>
        </div>
      )}

      <details>
        <summary className="cursor-pointer text-sm font-semibold">من أين جاءت نجومك؟</summary>
        <div className="mt-2 grid sm:grid-cols-2 gap-2">
          {lines.map((l) => (
            <div
              key={l.label}
              className="glass rounded-xl p-2 flex items-center justify-between text-sm"
            >
              <span>
                {l.icon} {l.label}
                <span className="block text-[11px] text-muted-foreground">{l.detail}</span>
              </span>
              <span className="font-bold">⭐ {l.stars}</span>
            </div>
          ))}
        </div>
      </details>

      <details>
        <summary className="cursor-pointer text-sm font-semibold">
          كيف يُحسب التقييم (آخر 14 يوماً)؟
        </summary>
        <div className="mt-2 space-y-2">
          {parts.map((p) => (
            <div key={p.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>
                  {p.label}{" "}
                  <span className="text-muted-foreground">({Math.round(p.weight * 100)}%)</span>
                </span>
                <span>{Math.round(p.value * 100)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success-gradient"
                  style={{ width: `${p.value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
