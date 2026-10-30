-- جلسات استخدام الموقع: متى دخل المستخدم، آخر نشاط، ومتى خرج أو أغلق الصفحة
create table if not exists public.site_sessions (
  id           text   primary key,
  username     text   not null references public.profiles(username) on delete cascade,
  started_at   bigint not null,
  last_seen_at bigint not null,
  ended_at     bigint,
  end_reason   text   check (end_reason in ('logout', 'closed')),
  device       text
);
create index if not exists site_sessions_user_started on public.site_sessions (username, started_at desc);
alter table public.site_sessions enable row level security;
create policy "open access" on public.site_sessions for all to anon using (true) with check (true);
grant all on public.site_sessions to anon;
