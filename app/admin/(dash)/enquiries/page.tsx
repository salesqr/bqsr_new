import ConfirmButton from "@/components/ConfirmButton";
import { requireAdmin } from "@/lib/admin";
import { deleteEnquiry, setEnquiryRead } from "../actions";

export const metadata = { title: "Enquiries" };

export default async function EnquiriesPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("enquiries")
    .select("id, name, email, phone, company, service, message, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
      <div className="admin-title">
        <h1>Enquiries</h1>
        <span style={{ color: "var(--muted)" }}>{data?.filter((e) => !e.is_read).length ?? 0} unread</span>
      </div>

      {error && (
        <div className="notice error" style={{ marginBottom: 16 }}>
          <p>Could not load enquiries: {error.message}</p>
        </div>
      )}

      {!data?.length ? (
        <div className="table-wrap">
          <div className="empty">No enquiries yet. Messages from the Contact page will appear here.</div>
        </div>
      ) : (
        <div className="stack">
          {data.map((e) => (
            <article key={e.id} className="admin-form" style={{ padding: 24, borderLeft: e.is_read ? undefined : "5px solid var(--gold)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
                <div>
                  <b style={{ fontSize: "1.1rem" }}>{e.name}</b>
                  {e.company && <span style={{ color: "var(--muted)" }}> · {e.company}</span>}
                  <br />
                  <a href={`mailto:${e.email}`} style={{ color: "var(--navy-700)" }}>{e.email}</a>
                  {e.phone && <span style={{ color: "var(--muted)" }}> · {e.phone}</span>}
                </div>
                <div style={{ textAlign: "right", color: "var(--muted)", fontSize: ".85rem" }}>
                  {new Date(e.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  {e.service && (
                    <>
                      <br />
                      <span className="badge ok" style={{ marginTop: 6 }}>{e.service}</span>
                    </>
                  )}
                </div>
              </div>
              <p style={{ whiteSpace: "pre-wrap", margin: "0 0 16px" }}>{e.message}</p>
              <div className="actions">
                <form action={setEnquiryRead}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="read" value={String(!e.is_read)} />
                  <button className="btn btn-outline btn-sm">{e.is_read ? "Mark unread" : "Mark as read"}</button>
                </form>
                <form action={deleteEnquiry}>
                  <input type="hidden" name="id" value={e.id} />
                  <ConfirmButton message="Delete this enquiry?">Delete</ConfirmButton>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
