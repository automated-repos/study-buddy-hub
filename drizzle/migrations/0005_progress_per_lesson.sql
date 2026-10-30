-- student_progress: من "آخر درس لكل مادة" إلى "صف لكل درس منتهٍ"
-- صف بوحدة ودرس فارغين = "لم أبدأ هذه المادة بعد"
delete from public.student_progress;
alter table public.student_progress drop constraint if exists student_progress_pkey;
alter table public.student_progress add primary key (owner_username, subject, unit, lesson);
