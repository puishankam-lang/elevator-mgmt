-- employee_docs: stores worker compliance documents
-- (greencard, HKID, address proof, license) uploaded from the
-- mobile app and the management console. file_data is a base64
-- data URL so the console can render images inline and merge
-- everything into one PDF without round-tripping through Storage.

create table if not exists public.employee_docs (
  id           bigserial primary key,
  employee_id  bigint    not null references public.employees(id) on delete cascade,
  doc_type     text      not null check (doc_type in ('greencard','id','address','license')),
  file_name    text      not null,
  file_data    text      not null,
  file_size    bigint,
  uploaded_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists employee_docs_employee_id_idx on public.employee_docs(employee_id);
create index if not exists employee_docs_doc_type_idx    on public.employee_docs(doc_type);

-- Match the access pattern of the existing employees table:
-- the app uses the publishable (anon) key for all reads/writes,
-- so RLS is disabled. Tighten later by switching to per-employee
-- auth + a USING (employee_id = auth.uid()) policy.
alter table public.employee_docs disable row level security;
