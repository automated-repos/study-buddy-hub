-- مهام جدول المذاكرة اليومي
create table if not exists public.study_tasks (
  id             text    primary key,
  owner_username text    not null references public.profiles(username) on delete cascade,
  date           text    not null,          -- YYYY-MM-DD (توقيت الجهاز)
  subject        text    not null,
  title          text    not null,
  minutes        int     not null default 30,
  done           boolean not null default false,
  created_at     bigint  not null default (extract(epoch from now()) * 1000)::bigint
);

-- نتائج الاختبارات الشاملة والمراجعة الشاملة كل أسبوعين
create table if not exists public.reviews (
  id             text   primary key,
  owner_username text   not null references public.profiles(username) on delete cascade,
  kind           text   not null check (kind in ('biweekly', 'comprehensive')),
  subject        text,                      -- null = كل المواد
  score          int    not null,
  total          int    not null,
  taken_at       bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- تعديلات المشرف على الملخصات والجداول والخرائط الذهنية
create table if not exists public.custom_summaries (
  id          text   primary key,           -- subject|lesson
  subject     text   not null,
  lesson      text   not null,
  data        jsonb  not null,
  updated_by  text,
  updated_at  bigint not null default (extract(epoch from now()) * 1000)::bigint
);

alter table public.study_tasks      enable row level security;
alter table public.reviews          enable row level security;
alter table public.custom_summaries enable row level security;
create policy "open access" on public.study_tasks      for all to anon using (true) with check (true);
create policy "open access" on public.reviews          for all to anon using (true) with check (true);
create policy "open access" on public.custom_summaries for all to anon using (true) with check (true);
grant all on public.study_tasks, public.reviews, public.custom_summaries to anon;
