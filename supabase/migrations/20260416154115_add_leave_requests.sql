-- leave_requests: worker-submitted leave applications (事假/病假/年假/無薪/補假/其他)
-- Mobile app inserts rows with status='pending'; the management console's
-- "請假審批" inbox flips status to 'approved' or 'rejected'. WhatsApp
-- notifications fire on submit (admin), approve/reject (employee) via the
-- Make.com webhook configured in Settings.

create table if not exists public.leave_requests (
  id           bigserial primary key,
  employee_id  bigint     not null references public.employees(id) on delete cascade,
  leave_type   text       not null check (leave_type in ('personal','sick','annual','unpaid','compensatory','other')),
  start_date   date       not null,
  end_date     date       not null,
  days         numeric(4,1) not null,  -- supports half-day: 0.5, 1.5, etc.
  reason       text,
  status       text       not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note   text,
  approved_by  bigint     references public.employees(id),
  approved_at  timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists leave_requests_employee_idx
  on public.leave_requests(employee_id, created_at desc);

create index if not exists leave_requests_pending_idx
  on public.leave_requests(created_at desc)
  where status = 'pending';

create index if not exists leave_requests_date_range_idx
  on public.leave_requests(start_date, end_date);

alter table public.leave_requests disable row level security;
