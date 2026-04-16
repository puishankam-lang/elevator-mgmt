-- Two changes for the worker mobile app's document workflow:
--   • Add expiry_date so the home screen can warn 1-2 months before
--     a green card / EMSD licence lapses.
--   • Update doc_type constraint: drop 'medical' (no longer required
--     per ops), add 'other_cert' (catch-all for misc qualifications).

alter table public.employee_docs
  add column if not exists expiry_date date;

create index if not exists employee_docs_expiry_date_idx
  on public.employee_docs(expiry_date)
  where expiry_date is not null;

alter table public.employee_docs
  drop constraint if exists employee_docs_doc_type_check;

alter table public.employee_docs
  add constraint employee_docs_doc_type_check
  check (doc_type in ('greencard','id','address','license','other_cert'));
