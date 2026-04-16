-- Add status to progress_reports so the worker mobile app can mark each
-- milestone submission as either "done" (此節點已完工) or "in_progress"
-- (此節點仍在進行中). Console and mobile both write this; the auto-invoice
-- trigger only fires when status='done'.

alter table public.progress_reports
  add column if not exists status text not null default 'done'
  check (status in ('done', 'in_progress'));

create index if not exists progress_reports_status_idx
  on public.progress_reports(status, submitted_at desc);
