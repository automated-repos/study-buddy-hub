-- أسئلة يضيفها أو يعدّلها المشرف.
-- id يطابق سؤالاً أصلياً = تعديل له (أو حذف إذا hidden = true)، وأي id آخر = سؤال جديد.
create table if not exists public.custom_questions (
  id          text    primary key,
  subject     text    not null,
  unit        text    not null,
  lesson      text    not null,
  q           text    not null,
  options     jsonb   not null,
  correct     int     not null,
  difficulty  text    not null default 'medium',
  hidden      boolean not null default false,
  updated_by  text,
  updated_at  bigint  not null default (extract(epoch from now()) * 1000)::bigint
);

alter table public.custom_questions enable row level security;
create policy "open access" on public.custom_questions for all to anon using (true) with check (true);
grant all on public.custom_questions to anon;
