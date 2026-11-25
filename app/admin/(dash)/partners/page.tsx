import ConfirmButton from "@/components/ConfirmButton";
import { requireAdmin } from "@/lib/admin";
import { addPartner, deletePartner, togglePartner } from "../actions";

export const metadata = { title: "Partners" };

export default async function PartnersPage() {
  const { supabase } = await requireAdmin();
  const { data: partners, error } = await supabase.from("partners").select("id, name, is_active").order("name");

  return (
    <>
      <div className="admin-title">
        <h1>Partners</h1>
      </div>
      <p style={{ color: "var(--muted)", marginTop: -12, marginBottom: 24 }}>
        Partners appear in the “Partner name” dropdown when adding a certificate.
      </p>

      <form action={addPartner} className="toolbar">
        <input className="input" name="name" placeholder="New partner name" required maxLength={200} style={{ minWidth: 280 }} />
        <button className="btn btn-primary btn-sm">Add partner</button>
      </form>

      {error && (
        <div className="notice error" style={{ marginBottom: 16 }}>
          <p>Could not load partners: {error.message}</p>
        </div>
      )}

      <div className="table-wrap">
        {!partners?.length ? (
          <div className="empty">No partners yet.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id}>
                  <td>
                    <b>{p.name}</b>
                  </td>
                  <td>
                    <span className={`badge ${p.is_active ? "ok" : "warn"}`}>{p.is_active ? "Active" : "Inactive"}</span>
                  </td>
                  <td>
                    <div className="actions" style={{ justifyContent: "flex-end" }}>
                      <form action={togglePartner}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="next" value={String(!p.is_active)} />
                        <button className="btn btn-outline btn-sm">{p.is_active ? "Deactivate" : "Activate"}</button>
                      </form>
                      <form action={deletePartner}>
                        <input type="hidden" name="id" value={p.id} />
                        <ConfirmButton message={`Delete partner "${p.name}"? Certificates linked to it will keep their data but lose the partner.`}>
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
    </>
  );
}
