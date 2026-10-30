import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uid, useCurrentProfile, useDB } from "@/lib/store";

interface ChatMessage {
  id: string;
  username: string;
  text: string;
  createdAt: number;
}

type Wire = { t: "msg"; m: ChatMessage } | { t: "del"; id: string };

const CHANNEL = "study-chat";
const HISTORY = 100;

/**
 * Group chat on the live study page, visible to every student and the supervisor.
 * Messages are saved in chat_messages; new ones are pushed instantly over a broadcast channel.
 */
export function LiveChat({ className = "" }: { className?: string }) {
  const profile = useCurrentProfile();
  const db = useDB();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isSupervisor = profile?.role === "supervisor";

  const add = (m: ChatMessage) =>
    setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m].slice(-HISTORY)));

  useEffect(() => {
    let alive = true;
    void supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(HISTORY)
      .then(({ data, error: e }) => {
        if (!alive) return;
        if (e) setError("الشات غير متاح بعد (يحتاج إنشاء جدول chat_messages).");
        else
          setMessages(
            (data ?? [])
              .map((r) => ({
                id: r.id,
                username: r.username,
                text: r.text,
                createdAt: r.created_at,
              }))
              .reverse(),
          );
      });

    const ch = supabase.channel(CHANNEL);
    ch.on("broadcast", { event: "chat" }, ({ payload }) => {
      const w = payload as Wire;
      if (w.t === "msg") add(w.m);
      else setMessages((prev) => prev.filter((x) => x.id !== w.id));
    });
    ch.subscribe();
    channelRef.current = ch;
    return () => {
      alive = false;
      void supabase.removeChannel(ch);
    };
  }, []);

  // keep the newest message in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  const send = async () => {
    const body = text.trim().slice(0, 500);
    if (!body || !profile) return;
    setSending(true);
    setError("");
    const m: ChatMessage = {
      id: uid() + uid(),
      username: profile.username,
      text: body,
      createdAt: Date.now(),
    };
    const { error: e } = await supabase
      .from("chat_messages")
      .insert({ id: m.id, username: m.username, text: m.text, created_at: m.createdAt });
    setSending(false);
    if (e) {
      setError("تعذّر الإرسال: " + e.message);
      return;
    }
    add(m);
    setText("");
    void channelRef.current?.send({
      type: "broadcast",
      event: "chat",
      payload: { t: "msg", m } satisfies Wire,
    });
  };

  const remove = async (id: string) => {
    const { error: e } = await supabase.from("chat_messages").delete().eq("id", id);
    if (e) return setError("تعذّر الحذف: " + e.message);
    setMessages((prev) => prev.filter((x) => x.id !== id));
    void channelRef.current?.send({
      type: "broadcast",
      event: "chat",
      payload: { t: "del", id } satisfies Wire,
    });
  };

  const who = (u: string) => db.profiles.find((p) => p.username === u);

  return (
    <div
      className={`bg-card-gradient rounded-3xl p-4 border border-border shadow-soft flex flex-col ${className}`}
    >
      <h3 className="font-bold">💬 شات المذاكرة</h3>
      <p className="text-xs text-muted-foreground mb-2">
        مرئي للجميع — لتنظيم مواعيد التحديات والمذاكرة مع الإخوة والمشرف.
      </p>

      <div ref={listRef} className="flex-1 min-h-48 max-h-80 overflow-y-auto space-y-2 pl-1">
        {messages.length === 0 && !error && (
          <p className="text-sm text-muted-foreground">لا توجد رسائل بعد — ابدأ المحادثة 👋</p>
        )}
        {messages.map((m) => {
          const p = who(m.username);
          const mine = m.username === profile?.username;
          const boss = p?.role === "supervisor";
          return (
            <div key={m.id} className={`flex gap-2 ${mine ? "flex-row-reverse text-left" : ""}`}>
              <span className="text-xl shrink-0">{p?.avatar || "🎓"}</span>
              <div
                className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm ${
                  boss ? "bg-warning/20 border border-warning/40" : mine ? "bg-primary/25" : "glass"
                }`}
              >
                <div className="text-[11px] font-bold opacity-80">
                  {boss && "👑 "}
                  {p?.displayName ?? m.username}
                  <span className="font-normal opacity-70 mr-2">
                    {new Date(m.createdAt).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="whitespace-pre-wrap break-words" dir="auto">
                  {m.text}
                </div>
                {(isSupervisor || mine) && (
                  <button
                    onClick={() => void remove(m.id)}
                    className="text-[10px] text-destructive mt-0.5"
                  >
                    حذف
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          maxLength={500}
          placeholder="اكتب رسالة... مثلاً: مين جاهز لتحدي تاريخ الساعة 8؟"
          className="flex-1 bg-input rounded-2xl px-3 py-2 text-sm outline-none"
          dir="auto"
        />
        <button
          onClick={() => void send()}
          disabled={sending || !text.trim()}
          className="bg-hero text-primary-foreground font-bold px-4 rounded-2xl disabled:opacity-50"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
