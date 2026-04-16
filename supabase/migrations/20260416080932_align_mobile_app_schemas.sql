-- Align attendance / progress_reports / safety_signs schemas with the
-- payloads that employee_mobile_app_2.jsx already POSTs. Tables are empty
-- right now so renames are safe; otherwise we'd add columns alongside.

-- ── attendance ─────────────────────────────────────────────────────────────
alter table public.attendance rename column check_in_time  to check_in;
alter table public.attendance rename column check_out_time to check_out;
alter table public.attendance rename column gps_lat        to check_in_lat;
alter table public.attendance rename column gps_lng        to check_in_lng;

alter table public.attendance
  add column if not exists check_in_accuracy  integer,
  add column if not exists check_out_lat      double precision,
  add column if not exists check_out_lng      double precision,
  add column if not exists check_out_accuracy integer,
  add column if not exists status             text default 'present',
  add column if not exists site               text;

create index if not exists attendance_employee_date_idx on public.attendance(employee_id, date desc);
create index if not exists attendance_date_idx          on public.attendance(date desc);

-- ── progress_reports ───────────────────────────────────────────────────────
alter table public.progress_reports rename column notes       to note;
alter table public.progress_reports rename column reported_at to submitted_at;

-- mobile app writes site name as text; keep project_id for future FK linking
alter table public.progress_reports add column if not exists project text;

create index if not exists progress_reports_employee_idx     on public.progress_reports(employee_id);
create index if not exists progress_reports_submitted_at_idx on public.progress_reports(submitted_at desc);

-- ── safety_signs ───────────────────────────────────────────────────────────
-- Extend with the rich EMSD-format work order data the mobile app submits.
alter table public.safety_signs
  add column if not exists site            text,
  add column if not exists lift_no         text,
  add column if not exists tasks           text,
  add column if not exists work_category   text,
  add column if not exists safety_ppe      text,
  add column if not exists safety_measures text,
  add column if not exists components      text,
  add column if not exists workers         text,
  add column if not exists rlw             text,
  add column if not exists abnormal        boolean default false,
  add column if not exists abnormal_desc   text,
  add column if not exists remarks         text,
  add column if not exists work_date       date,
  add column if not exists work_time       text,
  add column if not exists submitted_at    timestamptz default now();

create index if not exists safety_signs_employee_idx     on public.safety_signs(employee_id);
create index if not exists safety_signs_submitted_at_idx on public.safety_signs(submitted_at desc);
create index if not exists safety_signs_abnormal_idx     on public.safety_signs(abnormal) where abnormal = true;
