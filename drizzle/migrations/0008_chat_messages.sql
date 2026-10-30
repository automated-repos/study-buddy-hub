-- شات صفحة المذاكرة اللايف (مرئي للجميع: الطلاب والمشرف)
create table if not exists public.chat_messages (
  id         text   primary key,
  username   text   not null references public.profiles(username) on delete cascade,
  text       text   not null check (char_length(text) between 1 and 500),
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);
alter table public.chat_messages enable row level security;
create policy "open access" on public.chat_messages for all to anon using (true) with check (true);
grant all on public.chat_messages to anon;
