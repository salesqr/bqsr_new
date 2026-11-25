import CertificateForm from "@/components/CertificateForm";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Add certificate" };

export default async function NewCertificatePage() {
  const { supabase } = await requireAdmin();
  const { data: partners } = await supabase.from("partners").select("id, name").eq("is_active", true).order("name");

  return (
    <>
      <div className="admin-title">
        <h1>Add certificate</h1>
      </div>
      <CertificateForm partners={partners ?? []} />
    </>
  );
}
