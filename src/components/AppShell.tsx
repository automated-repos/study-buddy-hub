import { Link, useNavigate } from "@tanstack/react-router";
import { logout, useCurrentProfile, streakFor, useDB } from "@/lib/store";
import { levelFor, ratingFor, starsFor } from "@/lib/motivation";
import { RatingStars } from "./Motivation";
import { useEffect } from "react";
import type { ReactNode } from "react";

export function AppShell({ children, tabs }: { children: ReactNode; tabs?: ReactNode }) {
  const profile = useCurrentProfile();
  const db = useDB();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile === null && typeof window !== "undefined") {
      navigate({ to: "/", replace: true });
    }
  }, [profile, navigate]);

  if (!profile) return null;
  const stars = starsFor(profile.username, db);
  const level = levelFor(stars);
  const { rating } = ratingFor(profile.username, db);
  const streak = streakFor(profile.username, db);

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 glass border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="bg-hero bg-clip-text text-transparent">مذاكرة</span>
          </Link>
          <div className="flex-1" />
          {profile.role === "student" && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="glass rounded-2xl px-3 py-1.5 text-sm">
                <span className="text-accent">🔥</span> {streak} يوم
              </div>
              <div className="glass rounded-2xl px-3 py-1.5 text-sm">
                {level.icon} {level.title} • ⭐ {stars}
              </div>
              <div className="glass rounded-2xl px-3 py-1.5 text-sm">
                <RatingStars rating={rating} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 bg-card-gradient rounded-2xl px-3 py-1.5 border border-border">
            <span className="text-xl">{profile.avatar}</span>
            <span className="text-sm font-semibold">{profile.displayName}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="text-xs text-muted-foreground hover:text-foreground px-2"
          >
            خروج
          </button>
        </div>
        {tabs && (
          <div className="max-w-6xl mx-auto px-4 pb-3 overflow-x-auto">
            <div className="flex gap-2">{tabs}</div>
          </div>
        )}
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-hero text-primary-foreground shadow-glow"
          : "glass text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
