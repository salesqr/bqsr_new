import Link from "next/link";
import { Plus } from "lucide-react";
import ConfirmButton from "@/components/ConfirmButton";
import { requireAdmin } from "@/lib/admin";
import { statuses } from "@/lib/countries";
import { deleteCertificate } from "./actions";

export const metadata = { title: "Certificates" };

const PAGE_SIZE = 25;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const iso = (d: Date) => d.toISOString().slice(0, 10);
const fmt = (d: string | null) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const badge = (s: string) => (s === "Active" ? "ok" : s === "Suspended" ? "warn" : "bad");

type Row = {
  id: string;
  company_name: string;
  certificate_no: string;
  standard: string;
  country: string;
  status: string;
  issue_date: string | null;
  expiry_surveillance_date: string | null;
  partners: { name: string } | null;
};

export default async function CertificatesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const q = first(sp.q).trim().replace(/[,()%*\\]/g, " ").slice(0, 80);
  const status = first(sp.status);
  const page = Math.max(1, parseInt(first(sp.page) || "1", 10) || 1);

  const today = new Date();
  const in60 = new Date(today.getTime() + 60 * 864e5);

  let query = supabase
    .from("certificates")
    .select("id, company_name, certificate_no, standard, country, status, issue_date, expiry_surveillance_date, partners(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (q) query = query.or(`company_name.ilike.%${q}%,certificate_no.ilike.%${q}%`);
  if ((statuses as readonly string[]).includes(status)) query = query.eq("status", status);

  const [list, total, active, dueSoon, overdue] = await Promise.all([
    query,
    supabase.from("certificates").select("id", { count: "exact", head: true }),
    supabase.from("certificates").select("id", { count: "exact", head: true }).eq("status", "Active"),
    supabase.from("certificates").select("id", { count: "exact", head: true }).eq("status", "Active")
      .gte("expiry_surveillance_date", iso(today)).lte("expiry_surveillance_date", iso(in60)),
    supabase.from("certificates").select("id", { count: "exact", head: true }).eq("status", "Active")
      .lt("expiry_surveillance_date", iso(today)),
  ]);

  const rows = (list.data ?? []) as unknown as Row[];
  const count = list.count ?? 0;
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const qs = (p: number) => {
    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (status) u.set("status", status);
    if (p > 1) u.set("page", String(p));
    const s = u.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <>
      <div className="admin-title">
        <h1>Certificates</h1>
        <Link href="/admin/certificates/new" className="btn btn-primary">
          <Plus size={18} /> Add certificate
        </Link>
      </div>

      <div className="stats">
        <div className="stat"><b>{total.count ?? 0}</b><span>Total certificates</span></div>
        <div className="stat"><b>{active.count ?? 0}</b><span>Active</span></div>
        <div className="stat warn"><b>{dueSoon.count ?? 0}</b><span>Expiry / surveillance due in next 60 days</span></div>
        <div className="stat bad"><b>{overdue.count ?? 0}</b><span>Active but date has passed (overdue)</span></div>
      </div>

      <form className="toolbar" method="get">
        <input className="input" name="q" placeholder="Search company or certificate no." defaultValue={q} />
        <select className="select" name="status" defaultValue={status}>
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-outline btn-sm">Filter</button>
        {(q || status) && (
          <Link href="/admin" className="btn btn-sm" style={{ color: "var(--muted)" }}>
            Clear
          </Link>
        )}
      </form>

      {list.error && (
        <div className="notice error" style={{ marginBottom: 16 }}>
          <p>Could not load certificates: {list.error.message}. Have you run supabase/schema.sql?</p>
        </div>
      )}

      <div className="table-wrap">
        {rows.length === 0 ? (
          <div className="empty">
            <p>{q || status ? "No certificates match your filters." : "No certificates yet."}</p>
            {!q && !status && (
              <Link href="/admin/certificates/new" className="btn btn-primary btn-sm">
                Add your first certificate
              </Link>
            )}
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Certificate no.</th>
                <th>Standard</th>
                <th>Partner</th>
                <th>Issued</th>
                <th>Expiry / Surveillance due</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{r.company_name}</b>
                    <br />
                    <small>{r.country}</small>
                  </td>
                  <td>{r.certificate_no}</td>
                  <td>{r.standard}</td>
                  <td>{r.partners?.name ?? "—"}</td>
                  <td>{fmt(r.issue_date)}</td>
                  <td>{fmt(r.expiry_surveillance_date)}</td>
                  <td>
                    <span className={`badge ${badge(r.status)}`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="actions">
                      <Link href={`/admin/certificates/${r.id}`} className="btn btn-outline btn-sm">
                        Edit
                      </Link>
                      <form action={deleteCertificate}>
                        <input type="hidden" name="id" value={r.id} />
                        <ConfirmButton message={`Delete certificate ${r.certificate_no}? This cannot be undone.`}>
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 && (
        <div className="pager">
          <span>
            Page {page} of {pages} · {count} certificates
          </span>
          <span style={{ display: "flex", gap: 8 }}>
            {page > 1 && (
              <Link href={qs(page - 1)} className="btn btn-outline btn-sm">
                ← Previous
              </Link>
            )}
            {page < pages && (
              <Link href={qs(page + 1)} className="btn btn-outline btn-sm">
                Next →
              </Link>
            )}
          </span>
        </div>
      )}
    </>
  );
}
