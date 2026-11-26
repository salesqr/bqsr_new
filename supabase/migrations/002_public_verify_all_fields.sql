-- =====================================================================
--  Migration 002 — Check Certificate shows the full set of public fields
--
--  Public fields (11): Company name, Address, Scope, Standard,
--  Certificate no, Country, Registration date, Issue date,
--  Expiry date / Surveillance due date, Re-certification date,
--  Certification Status.
--  (Partner name and Contact details stay private.)
--
--  Run in: Supabase Dashboard -> SQL Editor -> New query -> Run
--  Requires migration 001 first. Safe to re-run.
-- =====================================================================

drop function if exists public.verify_certificate(text, text);

create function public.verify_certificate(
  p_name_prefix    text,
  p_certificate_no text
)
returns table (
  company_name             text,
  address                  text,
  scope                    text,
  standard                 text,
  certificate_no           text,
  country                  text,
  registration_date        date,
  issue_date               date,
  expiry_surveillance_date date,
  recertification_date     date,
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
    c.address,
    c.scope,
    c.standard,
    c.certificate_no,
    c.country,
    c.registration_date,
    c.issue_date,
    c.expiry_surveillance_date,
    c.recertification_date,
    c.status
  from public.certificates c
  where lower(left(btrim(c.company_name), 3)) = v_prefix
    and lower(btrim(c.certificate_no)) = v_no
  limit 5;
end;
$$;

revoke all     on function public.verify_certificate(text, text) from public;
grant  execute on function public.verify_certificate(text, text) to anon, authenticated;
