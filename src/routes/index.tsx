import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  loginOrCreate,
  updateAvatar,
  useCurrentProfile,
  useMounted,
  type Profile,
} from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مذاكرة — تطبيق المذاكرة العائلي" },
      { name: "description", content: "خطة دراسة ذكية، اختبارات، وتحديات بين الإخوة في الثانوية العامة." },
    ],
  }),
  component: Index,
});

const AVATARS = ["🦄", "🦊", "🐉", "🦁", "🐼", "🦅", "🌟", "🚀", "🧠", "📚"];

// ── Avatar picker shown on first login ──────────────────────────────────────
function AvatarPicker({ profile }: { profile: Profile }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("🦄");
  const [saving, setSaving] = useState(false);

  const confirm = async () => {
    setSaving(true);
    await updateAvatar(profile.username, selected);
    navigate({ to: profile.role === "supervisor" ? "/supervisor" : "/student", replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card-gradient rounded-3xl p-8 shadow-soft border border-border w-full max-w-sm text-center"
      >
        <div className="text-5xl mb-2">{selected}</div>
        <h2 className="text-2xl font-bold mb-1">أهلاً {profile.displayName}!</h2>
        <p className="text-muted-foreground text-sm mb-6">اختر أفاتارك</p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setSelected(a)}
              className={`text-3xl w-14 h-14 rounded-2xl glass hover:scale-110 transition ${
                selected === a ? "ring-2 ring-primary bg-primary/20 scale-110" : ""
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          onClick={confirm}
          disabled={saving}
          className="w-full bg-hero text-primary-foreground font-bold py-3.5 rounded-2xl shadow-glow disabled:opacity-60"
        >
          {saving ? "جارٍ الحفظ..." : "ابدأ المذاكرة ✨"}
        </button>
      </motion.div>
    </main>
  );
}

// ── Main login page ─────────────────────────────────────────────────────────
function Index() {
  const mounted = useMounted();
  const profile = useCurrentProfile();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mounted || !profile || !profile.avatar) return;
    navigate({ to: profile.role === "supervisor" ? "/supervisor" : "/student", replace: true });
  }, [profile, mounted, navigate]);

  if (mounted && profile && !profile.avatar) {
    return <AvatarPicker profile={profile} />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    if (!u) return;
    setError("");
    setLoading(true);
    try {
      const { data: existing, error: dbErr } = await import("@/lib/supabase").then(
        ({ supabase }) =>
          supabase.from("profiles").select("*").eq("username", u).maybeSingle(),
      );
      if (dbErr) throw new Error(dbErr.message);
      if (!existing) { setError("اسم المستخدم غير موجود"); return; }
      await loginOrCreate(existing.username, existing.role, existing.display_name, existing.avatar);
    } catch (e2) {
      setError((e2 as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full opacity-40 bg-hero blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-30 bg-accent-gradient blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-right space-y-6"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm">
            <span>✨</span> رفيق المذاكرة الذكي للثانوية العامة
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-glow">
            ذاكر بذكاء.
            <br />
            <span className="bg-hero bg-clip-text text-transparent">نافس إخوتك.</span>
            <br />
            اربح كل يوم.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0">
            خطة يومية تتولّد تلقائياً، اختبارات سريعة، تحديات بين الإخوة، ولوحة متابعة لوليّ الأمر.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {["🔥 سلسلة يومية", "🏆 لوحة الترتيب", "⚡ اختبارات سريعة", "📚 رفع كتب"].map((t) => (
              <span key={t} className="glass rounded-2xl px-4 py-2 text-sm">{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card-gradient rounded-3xl p-8 shadow-soft border border-border"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">تسجيل الدخول</h2>
          <p className="text-muted-foreground text-sm text-center mb-6">اكتب اسم المستخدم للدخول</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 text-muted-foreground">اسم المستخدم</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-left"
                autoComplete="off"
                autoFocus
                dir="ltr"
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="w-full bg-hero text-primary-foreground font-bold py-3.5 rounded-2xl shadow-glow hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
            >
              {loading ? "جارٍ الدخول..." : "دخول"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
