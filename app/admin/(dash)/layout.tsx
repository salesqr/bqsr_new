import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { signOut } from "../login/actions";
import AdminNav from "./AdminNav";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await requireAdmin();

  if (!isAdmin) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <Image src="/logo.png" alt="BQSR" width={313} height={360} />
          <h1>No admin access</h1>
          <p className="sub">
            {user.email} is signed in, but is not on the admins list. Add this user to the <b>admins</b> table in
            Supabase (see the end of <b>supabase/schema.sql</b>).
          </p>
          <form action={signOut}>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div className="container">
          <Link href="/admin" className="brand">
            <Image src="/logo.png" alt="" width={313} height={360} />
            <span className="brand-text">
              <strong>BQSR Admin</strong>
              <span>{user.email}</span>
            </span>
          </Link>
          <nav className="admin-nav" aria-label="Admin">
            <AdminNav />
            <Link href="/" target="_blank">
              View site ↗
            </Link>
            <form action={signOut} style={{ display: "inline" }}>
              <button className="linklike">Sign out</button>
            </form>
          </nav>
        </div>
      </header>
      <div className="admin-main">{children}</div>
    </div>
  );
}
