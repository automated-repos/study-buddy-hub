# Project decisions

- Lovable Cloud (Supabase) backend. Data access is anon-key based with username-only login (no Supabase Auth) — the family app intentionally keeps no-RLS open tables; do not add auth-based RLS policies without revisiting the whole auth design.
- The `books` storage bucket is private (public buckets are blocked on this workspace); book links are generated as 1-hour signed URLs via `getBookUrl`, consumed through the `BookLink` component.
- Schema migrations live in `drizzle/migrations/` (applied via the Lovable migration tool) mirroring `supabase/schema.sql` / `supabase/seed.sql` in the repo.
