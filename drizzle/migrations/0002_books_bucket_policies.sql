-- Allow the app (anon key) to upload, read and delete study books in the private "books" bucket
create policy "app can read books"
on storage.objects for select to anon
using (bucket_id = 'books');

create policy "app can upload books"
on storage.objects for insert to anon
with check (bucket_id = 'books');

create policy "app can delete books"
on storage.objects for delete to anon
using (bucket_id = 'books');

create policy "app can update books"
on storage.objects for update to anon
using (bucket_id = 'books');