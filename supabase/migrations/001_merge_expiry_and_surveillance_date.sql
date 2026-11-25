-- =====================================================================
--  Migration 001 — "Expiry date / Surveillance due date" is ONE field
--
--  Run ONCE in: Supabase Dashboard → SQL Editor → New query → Run
--  Safe to re-run. Only needed if you already ran the ORIGINAL schema.sql
--  (which had two separate columns). New installs: schema.sql already
--  contains this change, so do not run this file.
-- =====================================================================

-- 1. Merge the two columns into one: expiry_surveillance_date
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'certificates' and column_name = 'expiry_date'
  ) then
    alter table public.certificates rename column expiry_date to expiry_surveillance_date;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'certificates' and column_name = 'surveillance_due_date'
  ) then
    -- keep any date that was entered only as a surveillance date
    update public.certificates
       set expiry_surveillance_date = surveillance_due_date
     where expiry_surveillance_date is null
       and surveillance_due_date is not null;

    alter table public.certificates drop column surveillance_due_date;
  end if;
end;
$$;

-- 2. Rebuild the public Check Certificate function for the new column.
--    (Its return columns changed, so it has to be dropped and recreated.)
--    Note: it no longer turns "Active" into "Expired" automatically, because
--    the single date may be a surveillance date, which does not mean the
--    certificate has expired. Set the status manually in the admin.
drop function if exists public.verify_certificate(text, text);

create function public.verify_certificate(
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
