import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with BQSR Quality Assurance Pvt Ltd for certification, training and cyber security audit enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s start a conversation"
        crumbs={
          <>
            <Link href="/">Home</Link> / <span>Contact Us</span>
          </>
        }
      >
        Tell us about your organization and what you are looking for. We will respond with the next steps.
      </PageHero>

      <section className="section">
        <div className="container contact-grid">
          <div className="info-card">
            <h3>Get in touch</h3>

            <div className="info-row">
              <MapPin size={22} />
              <div>
                <b>Office address</b>
                {site.address.lines.map((l, i) => (
                  <span key={l}>
                    {l}
                    {i < site.address.lines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>

            {site.email && (
              <div className="info-row">
                <Mail size={22} />
                <div>
                  <b>Email</b>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
            )}

            {site.phone && (
              <div className="info-row">
                <Phone size={22} />
                <div>
                  <b>Phone</b>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </div>
              </div>
            )}

            <div className="info-row">
              <ShieldCheck size={22} />
              <div>
                <b>Verify a certificate</b>
                <Link href="/verify" style={{ color: "var(--gold-light)", fontWeight: 600 }}>
                  Use our Check Certificate service →
                </Link>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2 style={{ fontSize: "1.8rem", marginBottom: 6 }}>Send us a message</h2>
            <p style={{ color: "var(--muted)", marginBottom: 26 }}>Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
