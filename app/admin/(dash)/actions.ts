"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminStrict } from "@/lib/admin";
import { statuses } from "@/lib/countries";

export type CertState = { error: string; values?: Record<string, string> };

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const orNull = (v: string) => (v === "" ? null : v);
const isDate = (v: string) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v);
const isUuid = (v: string) => /^[0-9a-f-]{36}$/i.test(v);

const dateFields = ["registration_date", "issue_date", "expiry_surveillance_date", "recertification_date"];
const fields = [
  "company_name", "address", "scope", "standard", "certificate_no", "country", "partner_id",
  ...dateFields, "status", "contact_details",
];

export async function saveCertificate(_prev: CertState, fd: FormData): Promise<CertState> {
  const { supabase } = await requireAdminStrict();

  const values: Record<string, string> = {};
  for (const f of fields) values[f] = text(fd, f);
  const id = text(fd, "id");

  if (!values.company_name || !values.scope || !values.standard || !values.certificate_no || !values.country) {
    return { error: "Company name, scope, standard, certificate no. and country are required.", values };
  }
  for (const d of dateFields) {
    if (!isDate(values[d])) return { error: "One of the dates is not valid.", values };
  }
  if (!(statuses as readonly string[]).includes(values.status)) {
    return { error: "Choose a valid certification status.", values };
  }
  if (values.partner_id && !isUuid(values.partner_id)) return { error: "Choose a valid partner.", values };

  const row = {
    company_name: values.company_name,
    address: orNull(values.address),
    scope: values.scope,
    standard: values.standard,
    certificate_no: values.certificate_no,
    country: values.country,
    partner_id: orNull(values.partner_id),
    registration_date: orNull(values.registration_date),
    issue_date: orNull(values.issue_date),
    expiry_surveillance_date: orNull(values.expiry_surveillance_date),
    recertification_date: orNull(values.recertification_date),
    status: values.status,
    contact_details: orNull(values.contact_details),
  };

  const { error } =
    id && isUuid(id)
      ? await supabase.from("certificates").update(row).eq("id", id)
      : await supabase.from("certificates").insert(row);

  if (error) {
    const dup = error.code === "23505";
    return { error: dup ? "A certificate with this number already exists." : `Could not save: ${error.message}`, values };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteCertificate(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const id = text(fd, "id");
  if (isUuid(id)) await supabase.from("certificates").delete().eq("id", id);
  revalidatePath("/admin");
}

/* ------------------------------- Partners ------------------------------- */

export async function addPartner(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const name = text(fd, "name").slice(0, 200);
  if (name) await supabase.from("partners").insert({ name });
  revalidatePath("/admin/partners");
}

export async function togglePartner(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const id = text(fd, "id");
  const next = text(fd, "next") === "true";
  if (isUuid(id)) await supabase.from("partners").update({ is_active: next }).eq("id", id);
  revalidatePath("/admin/partners");
}

export async function deletePartner(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const id = text(fd, "id");
  if (isUuid(id)) await supabase.from("partners").delete().eq("id", id);
  revalidatePath("/admin/partners");
}

/* ------------------------------- Enquiries ------------------------------ */

export async function setEnquiryRead(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const id = text(fd, "id");
  const read = text(fd, "read") === "true";
  if (isUuid(id)) await supabase.from("enquiries").update({ is_read: read }).eq("id", id);
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(fd: FormData) {
  const { supabase } = await requireAdminStrict();
  const id = text(fd, "id");
  if (isUuid(id)) await supabase.from("enquiries").delete().eq("id", id);
  revalidatePath("/admin/enquiries");
}
