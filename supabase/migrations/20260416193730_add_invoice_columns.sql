-- ProjectManager's CF invoice form (handleAddCF / handleUpdateCF) and the
-- auto-invoice from Progress have always been writing these four columns,
-- but they were never added to the invoices table — causing every UPDATE
-- to fail with PostgREST 400 ("column 'label' does not exist") and every
-- INSERT to silently lose the data.

alter table public.invoices
  add column if not exists label         text,
  add column if not exists start_date    date,
  add column if not exists end_date      date,
  add column if not exists contact_phone text;

create index if not exists invoices_end_date_idx
  on public.invoices(end_date)
  where end_date is not null;
