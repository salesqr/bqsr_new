import Image from "next/image";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <Image src="/logo.png" alt="BQSR" width={313} height={360} priority />
        <h1>Admin sign in</h1>
        <p className="sub">BQSR certificate management</p>
        {!isSupabaseConfigured() && (
          <div className="notice error" style={{ marginBottom: 18 }}>
            <p>
              Supabase is not configured yet. Copy <b>.env.local.example</b> to <b>.env.local</b> and add your project
              URL and anon key.
            </p>
          </div>
        )}
        <LoginForm />
        <p style={{ textAlign: "center", marginTop: 22, marginBottom: 0, fontSize: ".9rem" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
