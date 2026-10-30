// Tracks how long each user stays on the site.
// A session starts when the app opens, sends a heartbeat every minute, and ends on logout
// or when the page is closed. If the close signal never arrives (device off, no network),
// the last heartbeat is treated as the end time.
import { useEffect } from "react";
import { supabase } from "./supabase";
import { uid } from "./store";

const HEARTBEAT_MS = 60_000;
/** A session with no heartbeat for this long is considered closed. */
export const STALE_MS = 2.5 * 60_000;

let current: { id: string; username: string } | null = null;

function deviceLabel() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  const kind = /iPad|Tablet/i.test(ua)
    ? "تابلت"
    : /Mobi|Android|iPhone/i.test(ua)
      ? "موبايل"
      : "كمبيوتر";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua)
      ? "Chrome"
      : /Safari\//.test(ua)
        ? "Safari"
        : /Firefox\//.test(ua)
          ? "Firefox"
          : "متصفح";
  return `${kind} • ${browser}`;
}

async function start(username: string) {
  const now = Date.now();
  const id = uid() + uid();
  current = { id, username };
  await supabase
    .from("site_sessions")
    .insert({ id, username, started_at: now, last_seen_at: now, device: deviceLabel() })
    .then(
      () => {},
      () => {},
    );
}

function heartbeat() {
  if (!current) return;
  void supabase
    .from("site_sessions")
    .update({ last_seen_at: Date.now() })
    .eq("id", current.id)
    .then(
      () => {},
      () => {},
    );
}

/** End the session. Uses a keepalive request so it can finish while the page is closing. */
function end(reason: "logout" | "closed") {
  if (!current) return;
  const { id } = current;
  current = null;
  const now = Date.now();
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const body = JSON.stringify({ ended_at: now, last_seen_at: now, end_reason: reason });
  if (url && key) {
    try {
      void fetch(`${url}/rest/v1/site_sessions?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        keepalive: true,
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body,
      }).catch(() => {});
      return;
    } catch {
      /* fall through */
    }
  }
  void supabase
    .from("site_sessions")
    .update({ ended_at: now, last_seen_at: now, end_reason: reason })
    .eq("id", id)
    .then(
      () => {},
      () => {},
    );
}

/** Call before logging out so the session is recorded as a logout. */
export function endSessionForLogout() {
  end("logout");
}

/** Mount once in the app shell for the signed-in user. */
export function useSiteSession(username: string | null | undefined) {
  useEffect(() => {
    if (!username) return;
    if (current?.username !== username) {
      if (current) end("closed");
      void start(username);
    }

    const beat = setInterval(heartbeat, HEARTBEAT_MS);
    const onHide = () => end("closed");
    // Coming back to a page restored from the back/forward cache: open a new session
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted && !current) void start(username);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        if (!current) void start(username);
        else heartbeat();
      }
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("pageshow", onShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(beat);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [username]);
}
