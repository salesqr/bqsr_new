-- =====================================================================
--  BQSR Quality Assurance Pvt Ltd — Supabase schema
--  Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run
--  Safe to re-run: every statement is idempotent.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Admins (who may manage certificates from /admin)
--    Admins are created manually — see STEP 3 at the bottom of this file.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- 2. Partners (feeds the "Partner name" dropdown on the certificate form)
-- ---------------------------------------------------------------------
create table if not exists public.partners (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists partners_name_uidx on public.partners (lower(btrim(name)));

-- ---------------------------------------------------------------------
-- 3. Certificates
-- ---------------------------------------------------------------------
create table if not exists public.certificates (
  id                    uuid primary key default gen_random_uuid(),
  company_name          text not null,
  address               text,
  scope                 text not null,
  standard              text not null,
  certificate_no        text not null,
  country               text not null,
  partner_id            uuid references public.partners (id) on delete set null,
  registration_date     date,
  issue_date            date,
  expiry_surveillance_date date,          -- ONE field: "Expiry date / Surveillance due date"
  recertification_date  date,
  status                text not null default 'Active'
                        check (status in ('Active', 'Suspended', 'Withdrawn', 'Expired')),
  contact_details       text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create unique index if not exists certificates_certno_uidx
  on public.certificates (lower(btrim(certificate_no)));
create index if not exists certificates_company_idx
  on public.certificates (lower(left(btrim(company_name), 3)));
create index if not exists certificates_partner_idx
  on public.certificates (partner_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists certificates_set_updated_at on public.certificates;
create trigger certificates_set_updated_at
  before update on public.certificates
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 4. Contact enquiries (submitted from the public Contact page)
-- ---------------------------------------------------------------------
create table if not exists public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name)    between 1 and 120),
  email      text not null check (char_length(email)   between 3 and 200),
  phone      text          check (phone   is null or char_length(phone)   <= 40),
  company    text          check (company is null or char_length(company) <= 200),
  service    text          check (service is null or char_length(service) <= 80),
  message    text not null check (char_length(message) between 5 and 4000),
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 5. Row Level Security
--    The public can NEVER read the certificates table directly.
--    Public verification goes through verify_certificate() below, which
--    returns only non-sensitive fields and requires BOTH the first 3
--    letters of the company name AND the exact certificate number.
-- ---------------------------------------------------------------------
alter table public.admins       enable row level security;
alter table public.partners     enable row level security;
alter table public.certificates enable row level security;
alter table public.enquiries    enable row level security;

drop policy if exists "admins read own row"        on public.admins;
create policy "admins read own row"
  on public.admins for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "admins manage partners"     on public.partners;
create policy "admins manage partners"
  on public.partners for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage certificates" on public.certificates;
create policy "admins manage certificates"
  on public.certificates for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "anyone can submit an enquiry" on public.enquiries;
create policy "anyone can submit an enquiry"
  on public.enquiries for insert to anon, authenticated
  with check (true);

drop policy if exists "admins read enquiries"   on public.enquiries;
create policy "admins read enquiries"
  on public.enquiries for select to authenticated
  using (public.is_admin());

drop policy if exists "admins update enquiries" on public.enquiries;
create policy "admins update enquiries"
  on public.enquiries for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries"
  on public.enquiries for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- 6. Public "Check Certificate" function
--    Input : first 3 letters of company name + certificate number
--    Output: public-safe fields only (no address / contact details).
--    Status is shown exactly as set by the admin.
-- ---------------------------------------------------------------------
create or replace function public.verify_certificate(
  p_name_prefix    text,
  p_certificate_no text
)
returns table (
  company_name             text,
  scope                    text,
  standard                 text,
  certificate_no           text,
  country                  text,
  issue_date               date,
  expiry_surveillance_date date,
  status                   text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_prefix text := lower(left(btrim(coalesce(p_name_prefix, '')), 3));
  v_no     text := lower(btrim(coalesce(p_certificate_no, '')));
begin
  if char_length(v_prefix) < 3 or char_length(v_no) < 3 then
    return;
  end if;

  return query
  select
    c.company_name,
    c.scope,
    c.standard,
    c.certificate_no,
    c.country,
    c.issue_date,
    c.expiry_surveillance_date,
    c.status
  from public.certificates c
  where lower(left(btrim(c.company_name), 3)) = v_prefix
    and lower(btrim(c.certificate_no)) = v_no
  limit 5;
end;
$$;

revoke all     on function public.verify_certificate(text, text) from public;
grant  execute on function public.verify_certificate(text, text) to anon, authenticated;

-- =====================================================================
--  STEP 3 — Create your admin login (do this AFTER running the above)
-- =====================================================================
--  a) Supabase Dashboard → Authentication → Users → "Add user"
--     → "Create new user". Enter your email + a strong password and
--     tick "Auto Confirm User".
--  b) Then run this (replace the email with the one you just created):
--
--     insert into public.admins (user_id, email)
--     select id, email from auth.users where email = 'you@example.com'
--     on conflict (user_id) do nothing;
--
--  c) Also: Authentication → Sign In / Providers → Email → turn OFF
--     "Allow new users to sign up" so nobody else can create accounts.

-- =====================================================================
--  OPTIONAL — a demo record to test the Check Certificate page.
--  Remove it afterwards. (Uncomment to use.)
-- =====================================================================
--  insert into public.partners (name) values ('Demo Partner')
--    on conflict do nothing;
--
--  insert into public.certificates
--    (company_name, address, scope, standard, certificate_no, country,
--     issue_date, expiry_surveillance_date, status)
--  values
--    ('Demo Industries Pvt Ltd', 'Demo address, Mumbai',
--     'Manufacture of demo components', 'ISO 9001:2015', 'DEMO-0001', 'India',
--     current_date, current_date + interval '1 year', 'Active');
--  -- Test with:  company "Dem"  +  certificate no "DEMO-0001"
