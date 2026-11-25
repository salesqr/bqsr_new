import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/logo.png" alt="BQSR" width={313} height={360} />
            <p>
              An independent certification and training body helping organizations and professionals build trust,
              competence and operational excellence.
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/verify">Check Certificate</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li style={{ display: "flex", gap: 10 }}>
                <MapPin size={18} style={{ flex: "none", marginTop: 4, color: "var(--gold-light)" }} />
                <span>
                  {site.address.lines.map((l, i) => (
                    <span key={l}>
                      {l}
                      {i < site.address.lines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              {site.email && (
                <li style={{ display: "flex", gap: 10 }}>
                  <Mail size={18} style={{ color: "var(--gold-light)" }} />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              {site.phone && (
                <li style={{ display: "flex", gap: 10 }}>
                  <Phone size={18} style={{ color: "var(--gold-light)" }} />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Impartial · Competent · Trusted</span>
        </div>
      </div>
    </footer>
  );
}
