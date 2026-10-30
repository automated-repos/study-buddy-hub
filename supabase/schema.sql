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
