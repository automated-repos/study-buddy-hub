import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loginOrCreate, useCurrentProfile, useDB, useMounted, type Role } from "@/lib/store";

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

function Index() {
  const mounted = useMounted();
  const profile = useCurrentProfile();
  const db = useDB();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"new" | "existing">("existing");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [avatar, setAvatar] = useState("🦄");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mounted) return;
    if (profile) {
      navigate({ to: profile.role === "supervisor" ? "/supervisor" : "/student", replace: true });
    }
  }, [profile, mounted, navigate]);

  useEffect(() => {
    if (mounted && db.profiles.length === 0) setTab("new");
  }, [mounted, db.profiles.length]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (tab === "existing") {
        const exists = db.profiles.find((p) => p.username === username.trim().toLowerCase());
        if (!exists) {
          setError("لا يوجد حساب بهذا الاسم. أنشئ حساباً جديداً.");
          return;
        }
        loginOrCreate(exists.username, exists.role, exists.displayName, exists.avatar);
      } else {
        if (!username.trim()) return setError("اكتب اسم مستخدم");
        if (db.profiles.find((p) => p.username === username.trim().toLowerCase())) {
          return setError("هذا الاسم موجود مسبقاً. ادخل من قائمة الحسابات.");
        }
        loginOrCreate(username, role, displayName || username, avatar);
      }
    } catch (e2) {
      setError((e2 as Error).message);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* floating orbs */}
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
            خطة يومية تتولّد تلقائياً، اختبارات سريعة، تحديات بين الإخوة، ولوحة متابعة لوليّ الأمر — كل ذلك بدون أي تعقيد.
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
          <div className="flex gap-2 mb-6 bg-muted/40 rounded-2xl p-1">
            <button
              type="button"
              onClick={() => setTab("existing")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                tab === "existing" ? "bg-hero text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              دخول
            </button>
            <button
              type="button"
              onClick={() => setTab("new")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                tab === "new" ? "bg-hero text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {tab === "existing" && mounted && db.profiles.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                {db.profiles.map((p) => (
                  <button
                    key={p.username}
                    type="button"
                    onClick={() => setUsername(p.username)}
                    className={`text-right glass rounded-2xl p-3 hover:scale-[1.02] transition ${
                      username === p.username ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="text-2xl">{p.avatar}</div>
                    <div className="text-sm font-semibold mt-1">{p.displayName}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.role === "supervisor" ? "وليّ أمر" : "طالب"}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm mb-1.5 text-muted-foreground">اسم المستخدم</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثلاً: ahmed"
                className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                autoComplete="off"
              />
            </div>

            {tab === "new" && (
              <>
                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">الاسم الظاهر</label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="أحمد"
                    className="w-full bg-input rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">اختر أفاتار</label>
                  <div className="flex flex-wrap gap-2">
                    {AVATARS.map((a) => (
                      <button
                        type="button"
                        key={a}
                        onClick={() => setAvatar(a)}
                        className={`text-2xl w-12 h-12 rounded-2xl glass hover:scale-110 transition ${
                          avatar === a ? "ring-2 ring-accent bg-accent/20" : ""
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">نوع الحساب</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { id: "student", label: "طالب", icon: "🎓" },
                        { id: "supervisor", label: "وليّ أمر / مشرف", icon: "👨‍🏫" },
                      ] as { id: Role; label: string; icon: string }[]
                    ).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`rounded-2xl py-3 px-3 text-sm font-semibold transition ${
                          role === r.id
                            ? "bg-hero text-primary-foreground shadow-glow"
                            : "glass text-foreground"
                        }`}
                      >
                        <div className="text-xl mb-1">{r.icon}</div>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && <p className="text-destructive text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-hero text-primary-foreground font-bold py-3.5 rounded-2xl shadow-glow hover:opacity-95 active:scale-[0.99] transition"
            >
              {tab === "existing" ? "دخول" : "إنشاء الحساب والدخول"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              بدون كلمة مرور — اسم المستخدم فقط. البيانات محفوظة على هذا الجهاز.
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
