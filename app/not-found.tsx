import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="login-wrap">
      <div className="login-card" style={{ textAlign: "center" }}>
        <Image src="/logo.png" alt="BQSR" width={313} height={360} />
        <h1>Page not found</h1>
        <p className="sub">The page you are looking for does not exist or may have moved.</p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
