-- أهداف يومية وأسبوعية: نوع الهدف (درس جديد / مراجعة / هدف حر) والدرس المرتبط به
alter table public.study_tasks add column if not exists kind   text not null default 'custom'
  check (kind in ('study', 'review', 'custom'));
alter table public.study_tasks add column if not exists scope  text not null default 'day'
  check (scope in ('day', 'week'));  -- week: date = أول يوم في الأسبوع (السبت)
alter table public.study_tasks add column if not exists unit   text;
alter table public.study_tasks add column if not exists lesson text;
