-- آخر درس أنهاه كل طالب في كل مادة (الدروس مرتبة حسب بنك الأسئلة)
create table if not exists public.student_progress (
  owner_username text   not null references public.profiles(username) on delete cascade,
  subject        text   not null,
  unit           text   not null,
  lesson         text   not null,
  updated_at     bigint not null default (extract(epoch from now()) * 1000)::bigint,
  primary key (owner_username, subject)
);

grant all on public.student_progress to anon;
