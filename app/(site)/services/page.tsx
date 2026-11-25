import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHead, ServiceGlyph } from "@/components/ui";
import { services, standards } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Certification services, training services and cyber security audits from BQSR Quality Assurance.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Certification, training and security assurance"
        crumbs={
          <>
            <Link href="/">Home</Link> / <span>Services</span>
          </>
        }
      >
        Independent assessment and practical skill development, delivered by qualified auditors and trainers.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gap: 32 }}>
            {services.map((s, i) => (
              <article
                key={s.slug}
                className="card service-row"
              >
                <div className="icon-hex">
                  <ServiceGlyph icon={s.icon} />
                </div>
                <div>
                  <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 8, fontSize: ".7rem" }}>
                    Service {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1.5rem" }}>{s.title}</h3>
                  <p style={{ margin: 0 }}>{s.short}</p>
                </div>
                <Link href={`/services/${s.slug}`} className="btn btn-outline">
                  View details <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <SectionHead eyebrow="Standards" title="Standards we work with">
            Our audits and courses are aligned to widely recognized international management system standards.
          </SectionHead>
          <div className="standards">
            {standards.map((s) => (
              <div className="standard" key={s.code}>
                <span className="dot" />
                <div>
                  <b>{s.code}</b>
                  <span>{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
