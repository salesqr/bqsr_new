"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertTriangle } from "lucide-react";
import { saveCertificate, type CertState } from "@/app/admin/(dash)/actions";
import { commonStandards, countries, statuses } from "@/lib/countries";

export type CertValues = Partial<Record<string, string>>;
type Partner = { id: string; name: string };

export default function CertificateForm({
  partners,
  initial = {},
  id,
}: {
  partners: Partner[];
  initial?: CertValues;
  id?: string;
}) {
  const [state, action, pending] = useActionState<CertState, FormData>(saveCertificate, { error: "" });
  const v: CertValues = { ...initial, ...(state.values ?? {}) };

  return (
    <form action={action} className="admin-form">
      {id && <input type="hidden" name="id" value={id} />}

      <fieldset>
        <legend>Company</legend>
        <div className="form-grid">
          <div className="field full">
            <label htmlFor="company_name">Company name *</label>
            <input id="company_name" name="company_name" className="input" required defaultValue={v.company_name} />
          </div>
          <div className="field full">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" className="textarea" style={{ minHeight: 84 }} defaultValue={v.address} />
          </div>
          <div className="field">
            <label htmlFor="country">Country *</label>
            <input id="country" name="country" className="input" list="countries" required defaultValue={v.country} />
            <datalist id="countries">
              {countries.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="partner_id">Partner name</label>
            <select id="partner_id" name="partner_id" className="select" defaultValue={v.partner_id ?? ""}>
              <option value="">— None —</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <span className="hint">
              Manage the list under <Link href="/admin/partners" style={{ textDecoration: "underline" }}>Partners</Link>.
            </span>
          </div>
          <div className="field full">
            <label htmlFor="contact_details">Contact details</label>
            <textarea
              id="contact_details"
              name="contact_details"
              className="textarea"
              style={{ minHeight: 84 }}
              placeholder="Contact person, email, phone"
              defaultValue={v.contact_details}
            />
            <span className="hint">Internal only. Never shown on the public Check Certificate page.</span>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Certification</legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="standard">Standard *</label>
            <input id="standard" name="standard" className="input" list="standards" required defaultValue={v.standard} />
            <datalist id="standards">
              {commonStandards.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="certificate_no">Certificate no. *</label>
            <input id="certificate_no" name="certificate_no" className="input" required defaultValue={v.certificate_no} />
          </div>
          <div className="field full">
            <label htmlFor="scope">Scope *</label>
            <textarea id="scope" name="scope" className="textarea" style={{ minHeight: 100 }} required defaultValue={v.scope} />
          </div>
          <div className="field">
            <label htmlFor="status">Certification status *</label>
            <select id="status" name="status" className="select" defaultValue={v.status ?? "Active"}>
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Dates</legend>
        <div className="form-grid three">
          <div className="field">
            <label htmlFor="registration_date">Registration date</label>
            <input id="registration_date" name="registration_date" type="date" className="input" defaultValue={v.registration_date} />
          </div>
          <div className="field">
            <label htmlFor="issue_date">Issue date</label>
            <input id="issue_date" name="issue_date" type="date" className="input" defaultValue={v.issue_date} />
          </div>
          <div className="field">
            <label htmlFor="expiry_surveillance_date">Expiry date / Surveillance due date</label>
            <input id="expiry_surveillance_date" name="expiry_surveillance_date" type="date" className="input" defaultValue={v.expiry_surveillance_date} />
          </div>
          <div className="field">
            <label htmlFor="recertification_date">Re-certification date</label>
            <input id="recertification_date" name="recertification_date" type="date" className="input" defaultValue={v.recertification_date} />
          </div>
        </div>
      </fieldset>

      {state.error && (
        <div className="notice error" role="alert" style={{ marginBottom: 20 }}>
          <AlertTriangle size={20} />
          <p>{state.error}</p>
        </div>
      )}

      <div className="row-end">
        <Link href="/admin" className="btn btn-outline">
          Cancel
        </Link>
        <button className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : id ? "Save changes" : "Add certificate"}
        </button>
      </div>
    </form>
  );
}
