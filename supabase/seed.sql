-- شغّل هذا في SQL Editor بعد schema.sql
insert into profiles (username, display_name, role, avatar, created_at) values
  ('marwa123',  'Marwa', 'supervisor', '', (extract(epoch from now()) * 1000)::bigint),
  ('soly123',   'Salma', 'student',    '', (extract(epoch from now()) * 1000)::bigint),
  ('ahmed123',  'Ahmed', 'student',    '', (extract(epoch from now()) * 1000)::bigint)
on conflict (username) do nothing;
