import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Ensures the current request belongs to a signed-in admin.
 * Redirects to the login page otherwise. RLS in the database enforces the same rule.
 */
export async function requireAdmin() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: row } = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  return { supabase, user: data.user, isAdmin: Boolean(row) };
}

export async function requireAdminStrict() {
  const ctx = await requireAdmin();
  if (!ctx.isAdmin) throw new Error("Not authorised");
  return ctx;
}
