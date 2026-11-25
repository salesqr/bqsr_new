import Link from "next/link";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <span className="loc">
            <MapPin size={15} /> {site.address.oneLine}
          </span>
          <Link href="/verify">Verify a certificate →</Link>
        </div>
      </div>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
