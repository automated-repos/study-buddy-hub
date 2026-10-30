-- =====================================================
-- مذاكرة — Supabase Schema
-- افتح SQL Editor في Supabase Dashboard وانسخ هذا الكود
-- =====================================================

-- جدول المستخدمين
create table if not exists profiles (
  username       text primary key,
  display_name   text not null,
  role           text not null check (role in ('student', 'supervisor')),
  avatar         text not null default '🦄',
  created_at     bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- جدول المواد الدراسية
create table if not exists subjects (
  id               text primary key,
  owner_username   text not null references profiles(username) on delete cascade,
  name             text not null,
  total_chapters   int  not null default 1,
  done_chapters    int  not null default 0,
  color            text not null default '#6366f1',
  target_exam_date text
);

-- جدول الكتب
create table if not exists books (
  id             text primary key,
  owner_username text not null references profiles(username) on delete cascade,
  subject_id     text not null references subjects(id) on delete cascade,
  title          text not null,
  file_name      text not null,
  file_path      text,
  size_kb        int  not null default 0,
  added_at       bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- جدول جلسات الدراسة
create table if not exists study_sessions (
  id             text primary key,
  owner_username text not null references profiles(username) on delete cascade,
  subject_id     text not null references subjects(id) on delete cascade,
  minutes        int  not null,
  date           text not null,
  note           text
);

-- جدول نتائج الاختبارات
create table if not exists quiz_results (
  id             text primary key,
  owner_username text not null references profiles(username) on delete cascade,
  subject_id     text not null references subjects(id) on delete cascade,
  score          int  not null,
  total          int  not null,
  taken_at       bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- جدول التحديات
create table if not exists challenges (
  id             text primary key,
  from_username  text not null references profiles(username) on delete cascade,
  to_username    text not null references profiles(username) on delete cascade,
  subject_id     text,
  title          text not null,
  status         text not null default 'pending' check (status in ('pending', 'accepted', 'done')),
  created_at     bigint not null default (extract(epoch from now()) * 1000)::bigint,
  winner         text
);

-- صلاحيات الوصول (anon key = التطبيق)
grant all on profiles      to anon;
grant all on subjects      to anon;
grant all on books         to anon;
grant all on study_sessions to anon;
grant all on quiz_results  to anon;
grant all on challenges    to anon;

-- الدروس التي أنهاها كل طالب (صف لكل درس؛ وحدة ودرس فارغان = "لم أبدأ المادة")
create table if not exists student_progress (
  owner_username text   not null references profiles(username) on delete cascade,
  subject        text   not null,
  unit           text   not null,
  lesson         text   not null,
  updated_at     bigint not null default (extract(epoch from now()) * 1000)::bigint,
  primary key (owner_username, subject, unit, lesson)
);
alter table student_progress enable row level security;
create policy "open access" on student_progress for all to anon using (true) with check (true);
grant all on student_progress to anon;

-- أسئلة يضيفها أو يعدّلها المشرف.
-- id يطابق سؤالاً أصلياً = تعديل له (أو حذف إذا hidden = true)، وأي id آخر = سؤال جديد.
create table if not exists custom_questions (
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

alter table custom_questions enable row level security;
create policy "open access" on custom_questions for all to anon using (true) with check (true);
grant all on custom_questions to anon;

-- مهام جدول المذاكرة اليومي
create table if not exists study_tasks (
  id             text    primary key,
  owner_username text    not null references profiles(username) on delete cascade,
  date           text    not null,          -- YYYY-MM-DD (توقيت الجهاز)
  subject        text    not null,
  title          text    not null,
  minutes        int     not null default 30,
  done           boolean not null default false,
  created_at     bigint  not null default (extract(epoch from now()) * 1000)::bigint
);

-- نتائج الاختبارات الشاملة والمراجعة الشاملة كل أسبوعين
create table if not exists reviews (
  id             text   primary key,
  owner_username text   not null references profiles(username) on delete cascade,
  kind           text   not null check (kind in ('biweekly', 'comprehensive')),
  subject        text,                      -- null = كل المواد
  score          int    not null,
  total          int    not null,
  taken_at       bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- تعديلات المشرف على الملخصات والجداول والخرائط الذهنية
create table if not exists custom_summaries (
  id          text   primary key,           -- subject|lesson
  subject     text   not null,
  lesson      text   not null,
  data        jsonb  not null,
  updated_by  text,
  updated_at  bigint not null default (extract(epoch from now()) * 1000)::bigint
);

alter table study_tasks      enable row level security;
alter table reviews          enable row level security;
alter table custom_summaries enable row level security;
create policy "open access" on study_tasks      for all to anon using (true) with check (true);
create policy "open access" on reviews          for all to anon using (true) with check (true);
create policy "open access" on custom_summaries for all to anon using (true) with check (true);
grant all on study_tasks, reviews, custom_summaries to anon;
