-- كل إجابة يجيبها الطالب (اختبارات، مسابقات، خرائط، مراجعة الأخطاء) لمراجعة الأخطاء لاحقاً
create table if not exists public.answer_log (
  id          text    primary key,
  username    text    not null references public.profiles(username) on delete cascade,
  source      text    not null check (source in ('quiz', 'comprehensive', 'biweekly', 'battle', 'map', 'review')),
  question_id text    not null,
  subject     text    not null,
  lesson      text    not null,
  q           text    not null,
  options     jsonb   not null,
  correct     int     not null,
  chosen      int,
  is_correct  boolean not null,
  created_at  bigint  not null default (extract(epoch from now()) * 1000)::bigint
);
create index if not exists answer_log_user_time on public.answer_log (username, created_at desc);

-- نتيجة كل مسابقة حية وتفاصيل جولاتها
create table if not exists public.battle_results (
  battle_id   text   primary key,
  supervisor  text,
  p1          text   not null,
  p2          text   not null,
  p1_score    int    not null,
  p2_score    int    not null,
  winner      text,
  subject     text   not null,
  scope       text,
  rounds      jsonb  not null,
  finished_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);

alter table public.answer_log     enable row level security;
alter table public.battle_results enable row level security;
create policy "open access" on public.answer_log     for all to anon using (true) with check (true);
create policy "open access" on public.battle_results for all to anon using (true) with check (true);
grant all on public.answer_log, public.battle_results to anon;
