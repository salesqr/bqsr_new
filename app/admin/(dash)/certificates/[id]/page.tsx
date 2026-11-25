import { notFound } from "next/navigation";
import CertificateForm from "@/components/CertificateForm";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Edit certificate" };

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const { supabase } = await requireAdmin();
  const [{ data: cert }, { data: partners }] = await Promise.all([
    supabase.from("certificates").select("*").eq("id", id).maybeSingle(),
    supabase.from("partners").select("id, name, is_active").order("name"),
  ]);
  if (!cert) notFound();

  // Keep the current partner selectable even if it was later deactivated.
  const list = (partners ?? []).filter((p) => p.is_active || p.id === cert.partner_id);

  const initial: Record<string, string> = {};
  for (const [k, v] of Object.entries(cert)) initial[k] = v == null ? "" : String(v);

  return (
    <>
      <div className="admin-title">
        <h1>Edit certificate</h1>
        <span style={{ color: "var(--muted)" }}>{cert.certificate_no}</span>
      </div>
      <CertificateForm partners={list} initial={initial} id={id} />
    </>
  );
}
